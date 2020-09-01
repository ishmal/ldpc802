#ifndef __802_TABLES_H__
#define __802_TABLES_H__

#include "802-codes.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
	int Alen;
	int **A;
	int Blen;
	int **B;
	int Clen;
	int **C;
	int Dlen;
	int **D;
	int Elen;
	int **E;
	int Tlen;
	int **T;
	int Hlen;
	int **H;
} Table;



Table *tableCreate(Code *code);

void tableDestroy(Table *);

int **qcToSparse(int *qc, int qcWidth, int xoff, int yoff, int rangeWidth, int rangeHeight, int z);


#ifdef __cplusplus
}
#endif

#endif
