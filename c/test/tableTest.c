
#include <CUnit/Basic.h>
#include <stdlib.h>

#include "802-tables.h"


static void testQcToSparse(void) {

	int qc[6] = {
		1, 2, 3, 4, 5, 6 
	};

	int **mat = qcToSparse(qc, 3, 0, 0, 3, 2, 5);

	for (int i = 0; i < 10; i++) {
		int *row = mat[i];
		int len = row[0];
		printf("%3d:", len);
		for (int j = 1; j <= len; j++) {
			printf("%3d", row[j]);
		}
		printf("\n");
	}

	for (int i = 0; i < 10 ; i++) {
		free(mat[i]);
	}
	free(mat);
}

static void testTableCreation(void) {
	Table *table = tableCreate(&c12_648);
	
	tableDestroy(table);
}


int tablesSuiteSetup(void)
{
	CU_pSuite pSuite = CU_add_suite("802 tables Spec", NULL, NULL);
	if (NULL == pSuite) {
		return CU_FALSE;
	}

	if ((NULL == CU_add_test(pSuite, "test correct parsing", testQcToSparse))) {
		return CU_FALSE;
	}

	if ((NULL == CU_add_test(pSuite, "test table creation", testTableCreation))) {
		return CU_FALSE;
	}

	return CU_TRUE;
}