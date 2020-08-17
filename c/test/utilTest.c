
#include <CUnit/Basic.h>
#include <stdlib.h>
#include <math.h>

#include "util.h"

static float calcPhiSlow(float x) {
	float v = tanh(x);
	return v;
}


// Tests that the Foo::Bar() method does Abc.
static void testPhi(void) {

}


int utilSuiteSetup(void)
{
	CU_pSuite pSuite = CU_add_suite("Util Spec", NULL, NULL);
	if (NULL == pSuite) {
		return CU_FALSE;
	}

	if ((NULL == CU_add_test(pSuite, "test Phi function", testPhi))) {
		return CU_FALSE;
	}

	return CU_TRUE;
}