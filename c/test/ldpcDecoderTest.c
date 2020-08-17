#include <time.h>
#include <stdlib.h>
#include <stdint.h>
#include <CUnit/Basic.h>

#include "ldpcEncoder.h"
#include "ldpcDecoder.h"
#include "util.h"

#include "testdata.h"

static void seedRand() {
	srand((unsigned int)time(NULL));
}

static float frand() {
	float r = ((float)rand()) / RAND_MAX;
	return r;
}

// ######################################
// # Binary
// ######################################


static uint8_t *makeMessageBytes(int size) {
	seedRand();
	uint8_t *msg = (uint8_t *)malloc(size * sizeof(uint8_t));
	for (int i = 0; i < size; i++) {
		msg[i] = (uint8_t)(frand() * 255.0);
	}
	return msg;
}


static uint8_t *makeMessageBits(int len) {
	seedRand();
	uint8_t *msg = (uint8_t *)malloc(len * sizeof(uint8_t));
	for (int i = 0; i < len; i++) {
		float toss = frand();
		msg[i] = (toss > 0.5) ? 1 : 0;
	}
	return msg;
}


static void addErrors(uint8_t *msg, int len, int nrBitsToFlip) {
	for (int i = 0; i < nrBitsToFlip; i++) {
		int index = (int)(frand() * (float)len); //make sure it is an int
		printf("flipping bit %d\n", index);
		msg[index] = (msg[index]) ? 0 : 1;
	}
}

// ######################################
// # Float
// ######################################

static float *makeSignal(uint8_t *x, int len) {
	float *msg = (float *) malloc(len * sizeof(float));
	for (int i = 0; i < len; i++) {
		msg[i] = (x[i]) ? -1.0 : 1.0;
	}
	return msg;
}

static void addNoise(float *message, int len, float level) {
	for (int i = 0; i < len; i++) {
		float noise = (frand() - 0.5) * level;
		message[i] = message[i] + noise;
	}
}

static void testConstruct(void) {
	LdpcDecoder *dec = ldpcDecoderCreate(&c12_648);
	CU_ASSERT_EQUAL(648, dec->code->N);
	CU_ASSERT_EQUAL(324, dec->code->M);
	ldpcDecoderDestroy(dec);
}

/**
 * This doesn't prove much, since the message bits are plainly
 * in the codeword.  But it does show that things are working right
 */
static void testWithTables(void) {
	uint8_t *inBits = (uint8_t *) malloc(1944 * sizeof(uint8_t));
	bytesToBitsBE(inBits, encoded1, 243);
	float *signal = makeSignal(inBits, 1944);
	LdpcDecoder *dec = ldpcDecoderCreate(&c34_1944);
	uint8_t *decoded = ldpcDecodeBytes(dec, signal, 1944, 100);
	CU_ASSERT_PTR_NOT_NULL_FATAL(decoded);
	for (int i=0; i < 182; i++) { // 183
		int exp = shortened1[i];
		int res = decoded[i];
		// printf("%d res:%d exp:%d\n", i, res, exp);
		CU_ASSERT_EQUAL(res, exp);
	}
	ldpcDecoderDestroy(dec);
	free(inBits);
	free(signal);
}


static void testDecodeEncoder(void) {
	LdpcEncoder *enc = ldpcEncoderCreate(&c12_648);
	LdpcDecoder *dec = ldpcDecoderCreate(&c12_648);
	uint8_t *message = makeMessageBits(324);
	uint8_t *x = ldpcEncode(enc, message, 324);
	float *signalBits = makeSignal(x, 648);
	uint8_t *result = ldpcDecodeMS(dec, signalBits, 648, 100);
	CU_ASSERT_PTR_NOT_NULL_FATAL(result);
	for (int i = 0; i < 324; i++) {
		int exp = message[i];
		int res = result[i];
		// printf("%d res:%d exp:%d\n", i, res, exp);
		CU_ASSERT_EQUAL(res, exp);
	}
	ldpcEncoderDestroy(enc);
	ldpcDecoderDestroy(dec);
	free(signalBits);
	free(message);
}


static void testHandleErrors() {
	LdpcEncoder *enc = ldpcEncoderCreate(&c12_648);
	LdpcDecoder *dec = ldpcDecoderCreate(&c12_648);
	uint8_t *message = makeMessageBits(324);
	uint8_t *x = ldpcEncode(enc, message, 324);
	addErrors(x, 324, 2);
	float *signalBits = makeSignal(x, 648);
	uint8_t *result = ldpcDecodeMS(dec, signalBits, 648, 100);
	CU_ASSERT_PTR_NOT_NULL_FATAL(result);
	for (int i = 0; i < 324; i++) {
		int exp = message[i];
		int res = result[i];
		// printf("%d res:%d exp:%d\n", i, res, exp);
		CU_ASSERT_EQUAL(res, exp);
	}
	ldpcEncoderDestroy(enc);
	ldpcDecoderDestroy(dec);
	free(signalBits);
	free(message);
}

static void testHandleErrorsAndNoise() {
	LdpcEncoder *enc = ldpcEncoderCreate(&c12_648);
	LdpcDecoder *dec = ldpcDecoderCreate(&c12_648);
	uint8_t *message = makeMessageBits(324);
	uint8_t *x = ldpcEncode(enc, message, 324);
	addErrors(x, 324, 3);
	float *signalBits = makeSignal(x, 648);
	addNoise(signalBits, 648, 0.03);
	uint8_t *result = ldpcDecodeSP(dec, signalBits, 648, 100);
	CU_ASSERT_PTR_NOT_NULL_FATAL(result);
	for (int i = 0; i < 324; i++) {
		int exp = message[i];
		int res = result[i];
		// printf("%d res:%d exp:%d\n", i, res, exp);
		CU_ASSERT_EQUAL(res, exp);
	}
	ldpcEncoderDestroy(enc);
	ldpcDecoderDestroy(dec);
	free(signalBits);
	free(message);
}

int ldpcDecoderSuiteSetup(void)
{
	CU_pSuite pSuite = CU_add_suite("LDPC Decoder Spec", NULL, NULL);
	if (!pSuite) {
		return CU_FALSE;
	}

	if (
		(!CU_add_test(pSuite, "should construct properly", testConstruct)) ||
		(!CU_add_test(pSuite, "should decode test data", testWithTables)) ||
		(!CU_add_test(pSuite, "should decode what the encoder encodes", testDecodeEncoder)) ||
		(!CU_add_test(pSuite, "should handle errors", testHandleErrors))  ||
		(!CU_add_test(pSuite, "should handle errors and noise", testHandleErrorsAndNoise))
		) {
		return CU_FALSE;
	}

	return CU_TRUE;
}
