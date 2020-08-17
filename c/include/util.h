#ifndef __UTIL_H__
#define __UTIL_H__


#include <stdint.h>

#ifdef __cplusplus  
extern "C" {
#endif  

/**
 * Multiply a sparse binary matrix with a normal binary array
 * @param {array} sparseMatrix an array of integer indices to the 1's of the
 * sparse row vector
 * @param {array} arr column vector 
 */
void multiplySparse(uint8_t *out, int *sparseMatrix[],  int len,  uint8_t *arr);

/**
 * Perform back substitution sparse binary array with a normal binary array.
 * Assume sparse is lower diagonal
 * y[i] = T[i,1]y[1] + T[i,2]y[2] + · · · + T[i,i−1]y[i−1] + x[i]
 * @param {array} sparseArr an array of integer indices to the 1's of the
 * sparse row vector
 * @param {array} arr column vector 
 */
void substituteSparse(uint8_t y[], int *sparseArr[],  int slen, uint8_t *arr);

/**
 * Convert an array of bytes to an array of bits. Bigendian.
 * The output array is 8x the size of the input, each element a 1 or 0
 * @param {uint8_t *} bits output buffer for bits
 * @param {uint8_t *} bytes array of bytes
 * @param {int} len number of bytes
 */
void bytesToBitsBE(uint8_t *bits, uint8_t *bytes, int len);

/** 
 * Assumes bits length is multiple of 8
 * @param {uint8_t *} output buffer for bytes
 * @param {uint8_t *} bits array of bits
 * @param {int} len number of bits
 */
void bitsToBytesBE(uint8_t *bytes, uint8_t *bits, int len);

/**
 * Calculate the "phi" function over the range 0-7
 * @param x the input value
 * @return estimated phi value for x
 */
double calcPhi(double x);

/**
 * Calculate the tanh function.  This might vary from
 * a real tanh() function
 * @param x the input value
 * @return estimated tanh value for x
 */
double sptanh(double x);

/**
 * Calculate the atanh function.  This might vary from
 * a real atanh() function 
 * @param x the input value
 * @return estimated atanh() value for x
 */
double spatanh(double x);

#ifdef __cplusplus  
}  
#endif  


#endif
