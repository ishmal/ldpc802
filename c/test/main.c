#include <CUnit/Basic.h>
#include <stdio.h>

extern int tablesSuiteSetup(void);
extern int crcSuiteSetup(void);
extern int utilSuiteSetup(void);
extern int ldpcDecoderSuiteSetup(void);
extern int ldpcEncoderSuiteSetup(void);


int main(int argc, char **argv) {

   /* initialize the CUnit test registry */
   if (CUE_SUCCESS != CU_initialize_registry())
      return CU_get_error();

	if (
		tablesSuiteSetup() != CU_TRUE ||
		crcSuiteSetup() != CU_TRUE ||
		utilSuiteSetup() != CU_TRUE ||
		ldpcEncoderSuiteSetup() != CU_TRUE ||
		ldpcDecoderSuiteSetup() != CU_TRUE
	) {
		CU_cleanup_registry();
		return CU_get_error();
	}

   /* Run all tests using the CUnit Basic interface */
   CU_basic_set_mode(CU_BRM_VERBOSE);
   CU_basic_run_tests();
   CU_cleanup_registry();
   return CU_get_error();

}