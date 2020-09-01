#include <stdlib.h>
#include <stdint.h>
#include <CUnit/Basic.h>

#include "ldpcEncoder.h"
#include "util.h"

#include "testdata.h"



/**
 * Test that encoding "shortened1" becomes "encoded1"
 */
static void testCorrectValue(void) {
	LdpcEncoder *enc = ldpcEncoderCreate(&c34_1944);
	uint8_t *x = ldpcEncodeBytes(enc, shortened1, 183);
	uint8_t *outBytes = (uint8_t *) malloc(243 * sizeof(uint8_t));
	bitsToBytesBE(outBytes, x, 1944);
	for (int i=0; i < 243; i++) {
		int exp = encoded1[i];
		int res = outBytes[i];
		printf("%d  res:%d exp:%d\n", i, res, exp);
		CU_ASSERT_EQUAL(res, exp);
	}
	ldpcEncoderDestroy(enc);
	free(outBytes);
}


int ldpcEncoderSuiteSetup(void)
{
	CU_pSuite pSuite = CU_add_suite("LDPC Encoder Spec", NULL, NULL);
	if (!pSuite) {
		return CU_FALSE;
	}

	if ((!CU_add_test(pSuite, "should have the correct value", testCorrectValue))) {
		return CU_FALSE;
	}

	return CU_TRUE;
}
