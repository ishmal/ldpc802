#ifndef __LDPC_DECODER_H__
#define __LDPC_DECODER_H__

#include <stdint.h>

#include "802-tables.h"


#ifdef __cplusplus  
extern "C" {
#endif  

struct QRNodeDef {
	float q;
	float r;
	struct QRNodeDef *next;
};
typedef struct QRNodeDef QRNode;

struct CheckNodeDef {
	QRNode *qrNodes;
	struct CheckNodeDef *next;
};
typedef struct CheckNodeDef CheckNode;

struct LinkDef {
	QRNode *qr;
	struct LinkDef *next;
};
typedef struct LinkDef Link;

struct VariableNodeDef {
	float ci;
	Link *links;
	Link *linkHead;
	struct VariableNodeDef *next;
};
typedef struct VariableNodeDef VariableNode;

//max M is 972
//max N is 1944
typedef struct {
	Code *code;
	Table *table;
	CheckNode *checkNodes;
	VariableNode *variableNodes;
	uint8_t syndrome[1944];
	uint8_t outBytes[243]; // 1944/8
} LdpcDecoder;


/**
 * Create a new decoder context
 * @param {Code *} code the code around which to configure this decoder
 * @return {LdpcDecoder *} a new decoder if successful, else null
 */
LdpcDecoder *ldpcDecoderCreate(Code *code);

/**
 * Clean up a decoder context
 * @param {LdpcDecoder *} dec the decoder context
 */
void ldpcDecoderDestroy(LdpcDecoder *dec);

/**
 * Decode codeword bits to message bits by sum-product algorithm
 * @param {LdpcDecoder *} dec the decoder context
 * @param {float *} inBits message array of data from -1 -> 1
 * @param {int} nrBits the number of values in the array
 * @param {int} maxIter the maximum number of iterations before failing
 * @return decoded array of bits if successful, else null
 */
uint8_t *ldpcDecodeSP(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter);

/**
 * Decode codeword bits to message bits by min-sum algorithm
 * @param {LdpcDecoder *} dec the decoder context
 * @param {float *} inBits message array of data from -1 -> 1
 * @param {int} nrBits the number of values in the array
 * @param {int} maxIter the maximum number of iterations before failing
 * @return decoded array of bits if successful, else null
 */
uint8_t *ldpcDecodeMS(LdpcDecoder *dec, float *inBits, int nrBits, int maxIter);

/**
 * Decode codeword bits into bytes. Assumes that codeword length is a multiple of 8
 * @param {LdpcDecoder} dec the decoder context
 * @param {float *} bits pointer to an array of codeword bits, -1 to 1
 * @param {int} nrBits the length of the bits array
 * @param {int} maxiter the maximum number of iterations before failing
 * @return pointer to bytes if successful, else null
 */
uint8_t *ldpcDecodeBytes(LdpcDecoder *dec, float *bits, int nrBits, int maxIter);



#ifdef __cplusplus  
}  
#endif  

#endif
