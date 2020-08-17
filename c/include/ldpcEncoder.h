#ifndef __LDPCENCODER_H__
#define __LDPCENCODER_H__

#include "802-tables.h"

#define MAX_BITS 1944

typedef struct {
	int msgLen;
	Code *code;
	Table *table;
	// TODO: get the max sizes for these
	uint8_t Ast[MAX_BITS];
	uint8_t Cst[MAX_BITS];
	uint8_t TinvAst[MAX_BITS];
	uint8_t ETinvAst[MAX_BITS];
	uint8_t p1[MAX_BITS];
	uint8_t Bp1[MAX_BITS];
	uint8_t AstBp1[MAX_BITS];
	uint8_t p2[MAX_BITS];
	uint8_t x[MAX_BITS];
} LdpcEncoder;


#ifdef __cplusplus  
extern "C" {
#endif  
  

/**
 * Create a new encoder context configured for the given code
 */
LdpcEncoder *ldpcEncoderCreate(Code *code);

/**
 *
 */
void ldpcEncoderDestroy(LdpcEncoder *enc);

/**
 * @param {array} s array of bits, size code->messageBits
 * @return {array} array of encoded bits, size N
 */
uint8_t *ldpcEncode(LdpcEncoder *enc, uint8_t *s, int len);

/**
 * Encode a message array of bytes
 * @param {array} bytes an array of bytes to encode 
 */
uint8_t *ldpcEncodeBytes(LdpcEncoder *enc, uint8_t *bytes, int nrBytes);

#ifdef __cplusplus  
}  
#endif  



#endif