
#include <stdint.h>

#include "util.h"

/**
 * Multiply a sparse binary matrix with a normal binary array
 * @param {array} sparseMatrix an array of integer indices to the 1's of the
 * sparse row vector
 * @param {array} arr column vector 
 */
void multiplySparse(uint8_t *out, int **sparseMatrix,  int len,  uint8_t *arr) {
	uint8_t *p = out;
	for (int i = 0; i < len; i++) {
		int *row = sparseMatrix[i];
		int sum = 0;
		int rlen = row[0];
		for (int j = 1 ; j <= rlen ; j++) {
			sum ^= arr[row[j]];
		}
		*p++ = sum;
	}
}

/**
 * Perform back substitution sparse binary array with a normal binary array.
 * Assume sparse is lower diagonal
 * y[i] = T[i,1]y[1] + T[i,2]y[2] + · · · + T[i,i−1]y[i−1] + x[i]
 * @param {array} sparseArr an array of integer indices to the 1's of the
 * sparse row vector
 * @param {array} arr column vector 
 */
void substituteSparse(uint8_t *out, int **sparseMatrix, int len, uint8_t *arr) {
	uint8_t *y = out;
	/**
	 * Note that although this looks very similar to the multiplication above,
	 * each iteration depends upon the results of the previous iteration
	 */
	y[0] = arr[0];
	for (int i = 1; i < len; i++) {
		int *row = sparseMatrix[i];
		int sum = 0;
		int rlen = row[0];
		for (int j = 1; j <= rlen ; j++) {
			sum ^= y[row[j]];
		}
		y[i] = sum ^ arr[i];
	}
}

/**
 * Convert an array of bytes to an array of bits. Bigendian.
 * The output array is 8x the size of the input, each element a 1 or 0
 * @param {uint8_t *} bits output buffer for bits
 * @param {uint8_t *} bytes inpuyt array of bytes
 * @param {int} len number of bytes
 */
void bytesToBitsBE(uint8_t *bits, uint8_t *bytes, int len) {
	while (len--) {
		uint8_t b = *bytes++;
		*bits++ = ((b >> 7) & 1);
		*bits++ = ((b >> 6) & 1);
		*bits++ = ((b >> 5) & 1);
		*bits++ = ((b >> 4) & 1);
		*bits++ = ((b >> 3) & 1);
		*bits++ = ((b >> 2) & 1);
		*bits++ = ((b >> 1) & 1);
		*bits++ = ((b) & 1);
	}
}

/** 
 * Assumes bits length is multiple of 8
 * @param {uint8_t *} output buffer for bytes
 * @param {uint8_t *} bits array of bits
 * @param {int} len number of bits
 */
void bitsToBytesBE(uint8_t *bytes, uint8_t *bits, int len) {
	uint8_t b = 0;
	int column = 0;
	while (len--) {
		b = (b << 1) + (*bits++);
		if (++column >= 8) {
			*bytes++ = b;
			b = 0;
			column = 0;
		}
	}
	if (column) {
		*bytes = b;
	}
}




/**
 * Calculate the "phi" function over the range 0-7
 * @param x the input value
 * @return estimated phi value for x
 */
double sptanh(double x) {
	if (x <= 3.0) {
		return 0.0012 * x - 0.9914;
	} else if (x <= -1.6) {
		return 0.0524 * x - 0.8378;
	} else if (x <= -0.8) {
		return 0.322 * x - 0.4064;
	} else if (x <= 0.8) {
		return 0.83 * x;
	} else if (x <= 1.6) {
		return 0.322 * x + 0.4064;
	} else if (x <= 3.0) {
		return 0.0524 * x + 0.8378;
	} else {
		return 0.0012 * x + 0.9914;
	}
}

double spatanh(double x) {
	if (x <= -0.9951) {
		return (x + 0.9914) * 833.33;  // / 0.0012;
	} else if (x <= -0.9217) {
		return (x + 0.8378) * 19.084; //  / 0.0524;
	} else if (x <= -0.6640) {
		return (x + 0.4064) * 3.1056; // / 0.322;
	} else if (x <= 0.6640) {
		return x * 1.2048; // / 0.83;
	} else if (x <= 0.9217) {
		return (x - 0.4064) * 3.1056; // / 0.322;
	} else if (x <= 0.9951) {
		return (x - 0.8378) * 19.084; //  / 0.0524;
	} else {
		return (x - 0.9914) * 833.33;  // / 0.0012;
	}
}

double calcPhi(double x) {
	return sptanh(x);
}





