
#include <CUnit/Basic.h>
#include <stdlib.h>

#include "crc32.h"


// Tests that the Foo::Bar() method does Abc.
static void testCorrectValue(void) {
	const char *str = "The quick brown fox jumps over the lazy dog";
	int len = strlen(str);
	uint8_t * bytes = (uint8_t *) str;
    uint32_t res = Crc32ofBytes(bytes, len);
	CU_ASSERT(res == 0x414fa339);
}


int crcSuiteSetup(void)
{
	CU_pSuite pSuite = CU_add_suite("CRC Spec", NULL, NULL);
	if (NULL == pSuite) {
		return CU_FALSE;
	}

	if ((NULL == CU_add_test(pSuite, "test of correct value", testCorrectValue))) {
		return CU_FALSE;
	}

	return CU_TRUE;
}