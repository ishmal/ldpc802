
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#include "ldpcEncoder.h"
#include "802-tables.h"
#include "util.h"


void add(uint8_t *out, uint8_t *a, uint8_t *b, int len) {
	while (len--) {
		*out++ = *a++ ^ *b++;
	}
}


/**
 * Create a new encoder context configured for the given code
 */
LdpcEncoder *ldpcEncoderCreate(Code *code) {

	LdpcEncoder *enc = (LdpcEncoder *) malloc(sizeof(LdpcEncoder));
	if (!enc) {
		return (LdpcEncoder *)0;
	}

	Table *table = tableCreate(code);
	if (!table) {
		free(enc);
		return (LdpcEncoder *)0;
	}

	enc->code = code;
	enc->table = table;
	enc->msgLen = 0;
	return enc;
}

void ldpcEncoderDestroy(LdpcEncoder *enc) {
	if (!enc) {
		return;
	}
	tableDestroy(enc->table);
	free(enc);
}


static uint8_t *doEncode(LdpcEncoder *enc) {
	Table *table = enc->table;
	Code *code = enc->code;

	// step 1
	multiplySparse(enc->Ast, table->A, table->Alen, enc->x);
	multiplySparse(enc->Cst, table->C, table->Clen, enc->x);
	// step 2
	substituteSparse(enc->TinvAst, table->T, table->Tlen, enc->Ast);
	multiplySparse(enc->ETinvAst, table->E, table->Elen, enc->TinvAst);
	// step 3
	add(enc->p1, enc->ETinvAst, enc->Cst, table->Elen);
	// step 4
	multiplySparse(enc->Bp1, table->B, table->Blen, enc->p1);
	add(enc->AstBp1, enc->Ast, enc->Bp1, table->Alen);
	substituteSparse(enc->p2, table->T, table->Tlen, enc->AstBp1);
	// step 5
	uint8_t *dest = enc->x + code->messageBits;
	int len = table->Elen;
	uint8_t *src = enc->p1;
	while (len--) {
		*dest++ = *src++;
	}
	len = table->Tlen;
	src = enc->p2;
	while (len--) {
		*dest++ = *src++;
	}
	return enc->x;
}

/**
 * @param {array} s array of bits, size code->messageBits
 * @return {array} array of encoded bits, size N
 */
uint8_t *ldpcEncode(LdpcEncoder *enc, uint8_t *s, int len) {
	int messageBits = enc->code->messageBits;;
	if (len > messageBits) {
		printf("message size too large: %d > %d", len, messageBits);
		return (uint8_t *)0;
	}
	uint8_t *dest = enc->x;
	while (len--) {
		*dest++ = *s++;
	}
	return doEncode(enc);
}

/**
 * Encode a message array of bytes
 * @param {array} bytes an array of bytes to encode 
 */
uint8_t *ldpcEncodeBytes(LdpcEncoder *enc, uint8_t *bytes, int nrBytes) {
	int messageBits = enc->code->messageBits;;
	int len = nrBytes * 8;
	if (len > messageBits + 8) {
		printf("message size too large: %d > %d", len, messageBits);
		return (uint8_t *)0;
	}
	bytesToBitsBE(enc->x, bytes, nrBytes);
	return doEncode(enc);
}


