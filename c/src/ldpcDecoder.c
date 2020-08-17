
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "ldpcDecoder.h"
#include "util.h"


/*
static float calcVariance(float *samples, int n) {
	float m = 0;
	float s = 0;
	for (int k = 0; k < n; ) {
		float x = samples[k++];
		float oldM = m;
		m += (x - m) / k;
		s += (x - m) * (x - oldM);
	}
	return s / (n - 1);
}
*/	

static float atanhCalc(float x) {
	if (x < -0.9999) {
		return 5.0f;
	} else if (x > 0.9999) {
		return 5.0f;
	} else {
		return atanhf(x);
	}
}

/**
 * Check is the codeword passes check.  Fails early
 * for speed.
 * @param {int **} H sparse matrix
 * @param {int} len sparse matrix length
 * @param {array} codeword the word to check
 * @return {boolean} true if passes 
 */
static int checkFast(int **matrix, int len, uint8_t *codeword) {

	for (int i = 0; i < len; i++) {
		int *row = matrix[i];
		int rlen = row[0];
		int sum = 0;
		for (int j = 1; j <= rlen; j++) {
			sum ^= codeword[row[j]];
		}
		if (sum) {
			return 0;
		}
	}
	return 1;
}


/**
 * Create an empty Sum Product tanner graph
 */
static int createTanner(LdpcDecoder *dec) {
	Code *code = dec->code;
	Table *table = dec->table;

	int M = code->M;
	int N = code->N;
	int **H = table->H;

	/**
	 * First make a blank Variable Node table
	 */
	VariableNode *vnodes = (VariableNode *) 0;
	VariableNode *vnhead = (VariableNode *) 0;
	for (int i = 0; i < N; i++) {
		VariableNode *vn = (VariableNode *) malloc(sizeof(VariableNode));
		if (!vnodes) {
			vnodes = vn;
			vnhead = vn;
		} else {
			vnhead->next = vn;
			vnhead = vn;
		}
		vn->ci = 0.0;
		vn->links = (Link *) 0;
		vn->linkHead = (Link *) 0;
		vn->next = (VariableNode *) 0;
	}


	/**
	 * Set up QR records, and link to them from both sides
	 * using the sparse array information from H
	 */
	CheckNode *cnodes = (CheckNode *) 0;
	CheckNode *cnhead = (CheckNode *) 0;
	for (int i = 0 ; i < M; i++) {
		CheckNode *cn = (CheckNode *) malloc(sizeof(CheckNode));
		cn->next = (CheckNode *) 0;
		if (!cnodes) {
			cnodes = cn;
			cnhead = cn;
		} else {
			cnhead->next = cn;
			cnhead = cn;
		}
		QRNode *qrNodes = (QRNode *) 0;
		QRNode *qrHead = (QRNode *) 0;
		int *row = H[i];
		int rlen = row[0];
		for (int j = 1; j <= rlen; j++) {
			QRNode *qr = (QRNode *) malloc(sizeof(QRNode));
			qr->q = 0.0;
			qr->r = 0.0;
			qr->next = (QRNode *)0;
			if (!qrNodes) {
				qrNodes = qr;
				qrHead = qr;
			} else {
				qrHead->next = qr;
				qrHead = qr;
			}

			// find Nth variableNode
			int vnIndex = row[j];
			VariableNode *vn = vnodes;
			while (vnIndex--) {
				vn = vn->next;
			}
			Link *link = (Link *)malloc(sizeof(Link));
			if (!vn->links) {
				vn->links = link;
				vn->linkHead = link;
			} else {
				vn->linkHead->next = link;
				vn->linkHead = link;
			}
			link->next = (Link *)0;
			link->qr = qr;
		}
		cn->qrNodes = qrNodes;
	}
	// printf("M:%d max: %d\n", M, max);

	/**
	 * Attach to this instance
	 */
	dec->checkNodes = cnodes;
	dec->variableNodes = vnodes;
	return 1;
}



/**
 * Create a new decoder context
 * @param code the code around which to configure this decoder
 * @return a new decoder if successful, else null
 */
LdpcDecoder *ldpcDecoderCreate(Code *code) {
	LdpcDecoder *dec = (LdpcDecoder *) malloc(sizeof(LdpcDecoder));

	if (!dec) {
		return dec;
	}

	dec->code = code;

	Table *table = tableCreate(code);
	if (!table) {
		free(dec);
		return (LdpcDecoder *)0;
	}
	dec->table = table;

	if ( !createTanner(dec) ) {
		free(dec);
		tableDestroy(table);
		return (LdpcDecoder *)0;
	}
	return dec;
}

/**
 * Clean up a decoder context
 */
void ldpcDecoderDestroy(LdpcDecoder *dec) {
	if (!dec) {
		return;
	}

	tableDestroy(dec->table);

	/**
	 * Check Nodes
	 */
	CheckNode *cn = dec->checkNodes;
	while (cn) {
		CheckNode *nextCn = cn->next;
		QRNode *qr = cn->qrNodes;
		while (qr) {
			QRNode *nextQr = qr->next;
			free(qr);
			qr = nextQr;
		}
		free(cn);
		cn = nextCn;
	}

	/**
	 * Variable Nodes
	 */
	VariableNode *vn = dec->variableNodes;
	while (vn) {
		VariableNode *nextVn = vn->next;
		Link *link = vn->links;
		while (link) {
			Link *nextLink = link->next;
			free(link);
			link = nextLink;
		}
		free(vn);
		vn = nextVn;
	}

	free(dec);
}


void makeLlr(float *inBits, int nrBits) {
	for (int i = 0 ; i < nrBits ; i++) {
		float b = inBits[i];
		float z = fabs(b);
		float llr = log(z / -z);
		inBits[i] = llr;
	}
}



/**
 * Decode codeword bits to message bits by the Sum-Product algorithm
 * @param {LdpcDecoder *} dec the decoder context
 * @param {float *} inBits message array of data from -1 -> 1
 * @param {int} nrBits the number of values in the array
 * @param {int} maxIter the maximum number of iterations before failing
 * @return decoded array of bits if successful, else null
 */
uint8_t *ldpcDecodeSP(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter) {
	// localize some values
	Code *code = dec->code;
	Table *table = dec->table;

	int M = code->M;
	int N = code->N;
	int **H = table->H;
	CheckNode *checkNodes = dec->checkNodes;
	VariableNode *variableNodes = dec->variableNodes;

	/**
	 * Step 1.  Initialization of c(ij) and q(ij)
	 */
	float variance = 1.0;
	float weight = 2.0 / variance;
	VariableNode *vnode = variableNodes;
	for (int i = 0 ; i < N ; i++) {
		float b = inBits[i];
		float Lci = b * weight;
		// printf("lci: %f\n", Lci);
		vnode->ci = Lci;
		for(Link *link = vnode->links; link; link = link->next) {
			QRNode *qr = link->qr;
			qr->r = 0.0;
			qr->q = Lci;
		}
		vnode = vnode->next;
	}


	for (int iter = 0; iter < maxIter; iter++) {

		/**
		 * Step 2. update r(ji)
		 */
		for (CheckNode *checkNode = checkNodes; checkNode; checkNode = checkNode->next) {
			QRNode *qrNodes = checkNode->qrNodes;
			for (QRNode *qr = qrNodes; qr; qr = qr->next) {
				/**
				 * Sum and product for qr != v
				 */
				float prod = 1.0;
				for (QRNode *v = qrNodes; v; v = v->next) {
					if (v == qr) {
						continue;
					}
					float q = v->q;
					q = q < -20.0 ? -20.0 : q > 20.0 ? 20.0 : q;
					// prod = prod * tanhf(0.5f * q);
					prod *= -atanhCalc(q);
				}
				qr->r = logf((1 + prod) / (1 - prod));
			}
		}

		/**
		 * Step 3.  Update qij
		 */
		for (VariableNode *vnode = variableNodes; vnode; vnode = vnode->next) {
			for (Link *link = vnode->links; link; link = link->next) {
				float sum = 0.0;
				for (Link *c = vnode->links; c; c = c->next) {
					if (c != link) {
						sum += c->qr->r;
					}
				}
				link->qr->q = vnode->ci + sum;
			}
		}

		/**
		 * Step 4.  Check syndrome
		 */
		uint8_t *c = dec->syndrome;
		int i = 0;
		for (VariableNode *vnode = variableNodes; vnode; vnode = vnode->next, i++) {
			float sum = 0.0;
			for (Link *link = vnode->links; link; link = link->next) {
				sum += link->qr->r;
			}
			float LQi = vnode->ci + sum;
			c[i] = LQi < 0.0 ? 1 : 0;
		}
		if (checkFast(H, M, c)) {
			printf("OK!! %d\n", iter);
			return c;
		} else {
			// printf("iter %d\n", iter);
		}

	} // for iter

	return (uint8_t *)0;
}


/**
 * Decode codeword bits to message bits by the Min-Sum algorithm
 * @param {LdpcDecoder *} dec the decoder context
 * @param {float *} inBits message array of data from -1 -> 1
 * @param {int} nrBits the number of values in the array
 * @param {int} maxIter the maximum number of iterations before failing
 * @return decoded array of bits if successful, else null
 */
uint8_t *ldpcDecodeMS(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter) {
	// localize some values
	Code *code = dec->code;
	Table *table = dec->table;
	int M = code->M;
	int N = code->N;
	int **H = table->H;
	CheckNode *checkNodes = dec->checkNodes;
	VariableNode *variableNodes = dec->variableNodes;

	/**
	 * Step 1.  Initialization of c(ij) and q(ij)
	 */
	VariableNode *vnode = variableNodes;
	for (int i = 0 ; i < N ; i++) {
		float b = inBits[i];
		float Lci = b;
		// printf("lci: %f\n", Lci);
		vnode->ci = Lci;
		for (Link *link = vnode->links; link; link = link->next) {
			QRNode *qr = link->qr;
			qr->r = 0.0;
			qr->q = Lci;
		}
		vnode = vnode->next;
	}


	for (int iter = 0; iter < maxIter; iter++) {

		/**
		 * Step 2. update r(ji)
		 */
		for (CheckNode *checkNode = checkNodes; checkNode; checkNode = checkNode->next) {
			QRNode *qrNodes = checkNode->qrNodes;
			for (QRNode *qr = qrNodes; qr; qr = qr->next) {
				/**
				 * Sum and product for qr != v
				 */
				float prod = 1000.0;
				for (QRNode *v = qrNodes; v; v = v->next) {
					if (v == qr) {
						continue;
					}
					float q = v->q;
					q = q < -20.0 ? -20.0 : q > 20.0 ? 20.0 : q;
					float absProd = fabs(prod);
					float absQ = fabs(q);
					float sgnQ = q < 0.0 ? -1.0 : 1.0;
					float sgnProd = prod < 0 ? -1.0 : 1.0;
					float min = absQ < absProd ? absQ : absProd;
					prod = sgnQ * sgnProd * min;
				}
				qr->r = prod;
			}
		}

		/**
		 * Step 3.  Update qij
		 */
		for (VariableNode *vnode = variableNodes; vnode; vnode = vnode->next) {
			for (Link *link = vnode->links; link; link = link->next) {
				float sum = 0.0;
				for (Link *c = vnode->links; c; c = c->next) {
					if (c != link) {
						sum += c->qr->r;
					}
				}
				link->qr->q = vnode->ci + sum;
			}
		}

		/**
		 * Step 4.  Check syndrome
		 */
		uint8_t *c = dec->syndrome;
		int i = 0;
		for (VariableNode *vnode = variableNodes; vnode; vnode = vnode->next, i++) {
			float sum = 0.0;
			for (Link *link = vnode->links; link; link = link->next) {
				sum += link->qr->r;
			}
			float LQi = vnode->ci + sum;
			c[i] = LQi < 0.0 ? 1 : 0;
		}
		if (checkFast(H, M, c)) {
			printf("OK!! %d\n", iter);
			return c;
		} else {
			// printf("ms iter %d\n", iter);
		}

	} // for iter

	return (uint8_t *)0;
}

/**
 * Decode codeword bits into bytes. Assumes that codeword length is a multiple of 8
 * @param {LdpcDecoder} dec the decoder context
 * @param {float *} inBits pointer to an array of codeword bits, -1 to 1
 * @param {int} nrBits the length of the bits array
 * @param {int} maxiter the maximum number of iterations before failing
 * @return pointer to bytes if successful, else null
 */
uint8_t *ldpcDecodeBytes(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter) {
	uint8_t *bits = ldpcDecodeSP(dec, inBits, nrBits, maxIter);
	if (!bits) {
		return (uint8_t *)0;
	}
	bitsToBytesBE(dec->outBytes, bits, dec->code->N);
	return dec->outBytes;
}

