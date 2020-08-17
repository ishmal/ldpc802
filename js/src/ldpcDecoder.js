import { calcPhi } from "./calcphi";
import { Util } from "./util";

const multiplySparse = Util.multiplySparse;


/**
 * Decoder for LDBC codewords
 * @see "Introduction to LDPC Codes" by William E Ryan
 */
export class LdpcDecoder {

	/**
	 * Constructor
	 * @param {object} code the current LDPC code for rate and length
	 */
	constructor(code) {
		this.code = code;
		this.createSPGraph();
		this.maxIter = 100;
	}

	static calcVariance(samples) {
		const n = samples.length;
		let m = 0;
		let s = 0;
		for (let k = 0; k < n; ) {
			const x = samples[k++];
			const oldM = m;
			m += (x - m) / k;
			s += (x - m) * (x - oldM);
		}
	  return s / (n - 1);
	}
	


	/**
	 * Check is the codeword passes check.
	 * @param {array} codeword the word to check
	 * @return {boolean} true if passes 
	 */
	check(codeword) {
		const code = this.code;
		const checkVal = multiplySparse(code.H, codeword);
		for (let i = 0, len = this.code.messageBits; i < len; i++) {
			if (checkVal[i]) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Check is the codeword passes check.  Fails early
	 * for speed.
	 * @param {array} codeword the word to check
	 * @return {boolean} true if passes 
	 */
	checkFast(codeword) {
		const H = this.code.H;
		for (let i = 0, hlen = H.length; i < hlen; i++) {
			const row = H[i];
			let sum = 0;
			for (let j = 0, rlen = row.length; j < rlen; j++) {
				const idx = row[j];
				sum ^= codeword[idx];
			}
			if (sum) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Set up the variable and check nodes,
	 * make the links between them.
	 */
	createTanner() {
		const code = this.code;
		const M = code.M;
		const N = code.N;
		const variableNodes = [];
		for (let i = 0; i < N; i++) {
			variableNodes[i] = {
				clinks: [],
				c: 0
			};
		}
		const checkNodes = [];
		const H = code.H;
		for (let i = 0; i < M; i++) {
			const row = H[i];
			const vlinks = row.map(idx => ({
					v: variableNodes[idx],
					r: 0
			}));
			const cnode = {
				vlinks
			};
			checkNodes[i] = cnode;
			for (let v = 0, len = vlinks.length; v < len; v++) {
				const vnode = vlinks[v].v;
				const clink = {
					c: cnode,
					q: 0
				};
				vnode.clinks.push(clink);
			}
		}
		this.checkNodes = checkNodes;
		this.variableNodes = variableNodes;
	}

	/**
	 * Create an empty
	 */
	createSPGraph() {
		const code = this.code;
		const M = code.M;
		const N = code.N;
		const H = code.H;
		const checkNodes = [];
		const variableNodes = [];

		/**
		 * First make two blank tables
		 */
		for (let i = 0; i < M; i++) {
			checkNodes[i] = {
				links: []
			};
		}
		for (let i = 0; i < N; i++) {
			variableNodes[i] = {
				links: [],
				ci: 0
			};
		}

		/**
		 * Then interconnect then with link records,
		 * using the sparse array information from H
		 */
		for (let i = 0 ; i < M; i++) {
			const row = H[i];
			const cnode = checkNodes[i];
			const rlen = row.length;
			for (let j = 0; j < rlen; j++) {
				const idx = row[j];
				const vnode = variableNodes[idx];
				const link = {
					c: cnode,
					v: vnode,
					q: 0,
					r: 0,
				};
				cnode.links.push(link);
				vnode.links.push(link);
			}
		}

		/**
		 * Attach to this instance
		 */
		this.checkNodes = checkNodes;
		this.variableNodes = variableNodes;
	}

	/**
	 * Decode codeword bits to message bits
	 * @param {array} inBits message array of data from -1 -> 1
	 * @return decoded array of real -1's and 1's
	 */
	decode(inBits) {
		const result = this.decodeSumProduct(inBits);
		return result;
	}

	/**
	 * Decode codeword bits to message bits
	 * @param {array} message array of data from -1 -> 1
	 * @return decoded array of message array of data from -1 -> 1
	 */
	/* eslint-disable max-lines-per-function */
	decodeSumProduct(inBits) {
		// localize some values
		const M = this.code.M;
		const N = this.code.N;
		const checkNodes = this.checkNodes;
		const variableNodes = this.variableNodes;

		/**
		 * Step 1.  Initialization of c(ij) and q(ij)
		 */
		const variance = LdpcDecoder.calcVariance(inBits);
		const weight = 2 / variance;
		for (let i = 0; i < N; i++) {
			const vnode = variableNodes[i];
			const Lci = inBits[i] * weight;
			vnode.ci = Lci;
			const links = vnode.links;
			const llen = links.length;
			for (let j = 0; j < llen ; j++) {
				const link = links[j];
				link.r = 0;				
				link.q = Lci;				
			}
		}


		for (let iter = 0; iter < this.maxIter; iter++) {

			/**
			 * Step 2. update r(ji)
			 */
			for (let m = 0; m < M; m++) {
				const checkNode = checkNodes[m];
				const links = checkNode.links;
				const llen = links.length;

				for (let i = 0; i < llen ; i++) {
					const rlink = links[i];
					/**
					 * Sum and product for links !== i
					 */
					let sum = 0;
					let prod = 1;
					for (let v = 0; v < llen; v++) {
						if (v === i) {
							continue;
						}
						const q = links[v].q;
						const beta = Math.abs(q);
						const phiBeta = calcPhi(beta);
						sum += phiBeta;
						const alpha = q < 0 ? -1 : 1;
						prod *= alpha;
					}
					const phiSum = calcPhi(sum);
					rlink.r = prod * phiSum;
				}
			}

			/**
			 * Step 3.  Update qij
			 */
			for (let i = 0; i < N; i++) {
				const vnode = variableNodes[i];
				const links = vnode.links;
				const llen = links.length;
				for (let k = 0; k < llen; k++) {
					const link = links[k];
					let sum = 0;
					for (let c = 0; c < llen; c++) {
						if (c !== k) {
							sum += links[c].r;
						}
					}
					link.q = vnode.ci + sum;
				}
			}

			/**
			 * Step 4.  Check syndrome
			 */
			const c = [];
			for (let i = 0; i < N ; i++) {
				const vnode = variableNodes[i];
				const links = vnode.links;
				const llen = links.length;
				let sum = 0;
				for (let v = 0 ; v < llen ; v++) {
					const link = links[v];
					sum += link.r;
				}
				const LQi = vnode.ci + sum;
				c[i] = LQi < 0 ? 1 : 0;
			}
			if (this.checkFast(c)) {
				return c.slice(0, this.code.messageBits);
			}


		} // for iter

		return null;
	}
	/* eslint-enable */

	/**
	 * Decode codeword bits to message bytes
	 * @param {array} bits message array of 1's and 0's
	 * @return decoded array of bytes if decoding works, else null.
	 */
	decodeToBytes(bits) {
		const outbits = this.decode(bits);
		if (!outbits) {
			return null;
		}
		const bytes = Util.bitsToBytesBE(outbits);
		return bytes;
	}
}
