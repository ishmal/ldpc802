#include <stdlib.h>
#include <stdio.h>

#include "802-codes.h"
#include "802-tables.h"


/**
 * Initialize an already-allocated table
 * @param {Table *} the table to initialize
 * @param {Code *} the code frp, 802-codes.h
 */
static void tableInit(Table *table, Code *code) {
	int M = code->M;
	int nb = code->nb;
	int mb = code->mb;
	int kb = code->kb;
	int z = code->z;
	int *Hb = code->Hb;
	table->Alen = M - z;
	table->A = qcToSparse(Hb, nb, 0, 0, kb, mb - 1, z);
	table->Blen = M - z;
	table->B = qcToSparse(Hb, nb, kb, 0, 1, mb - 1, z);
	table->Clen = z;
	table->C = qcToSparse(Hb, nb, 0, mb - 1, kb, 1, z);
	table->Dlen = z;
	table->D = qcToSparse(Hb, nb, kb, mb - 1, 1, 1, z);
	table->Elen = z;
	table->E = qcToSparse(Hb, nb, kb + 1, mb - 1, nb - kb, 1, z);
	table->Tlen = M - z;
	table->T = qcToSparse(Hb, nb, kb + 1, 0, nb - kb, mb - 1, z);
	table->Hlen = M;
	table->H = qcToSparse(Hb, nb, 0, 0, nb, mb, z);
}

/**
 * Free the rows of the matris, then the matrix itself
 */
static void freeSparseMatrix(int **mat, int len) {
	for (int i = 0; i < len; i++) {
		free(mat[i]);
	}
	free(mat);
}

/**
 * Create a new sparse matrix table for the given code
 * @param {Code *} code the 802.11 code from 802-codes.h
 */
Table *tableCreate(Code *code) {
	Table *table = (Table *) malloc(sizeof(Table));
	tableInit(table, code);
	return table;
}

/**
 * Clean up and free a table made with tableCreate()
 * @param {Table *} tables the table structure to clear
 */
void tableDestroy(Table *table) {
	freeSparseMatrix(table->A, table->Alen);
	freeSparseMatrix(table->B, table->Blen);
	freeSparseMatrix(table->C, table->Clen);
	freeSparseMatrix(table->D, table->Dlen);
	freeSparseMatrix(table->E, table->Elen);
	freeSparseMatrix(table->T, table->Tlen);
	freeSparseMatrix(table->H, table->Hlen);
	free(table);
}


/**
 * @param {int *} qc the source quasi-cyclic matrices in a single array
 * @param {int} qcWidth the width of a qc row of the qc table
 * @param {int} xoff the x-offset of the subblock in the qc table
 * @param {int} yoff the y-offset of the subblock in the qc table
 * @param {int} width the width of the subblock in the qc table
 * @param {int} height the height of the subblock in the qc table
 * @param {int} z the size of a qc cell (for example, 27x27) in an expanded table
 */
int **qcToSparse(int *qc, int qcWidth, int xoff, int yoff, int width, int height, int z) {
	// each QC row makes 'z' actual rows
	int **mat = (int **) malloc(sizeof (int *) * height * z);
	// there is at most only 1 entry per QC row, so width QC's = max
	int maxRowIndices = width;
	int tmpRow[maxRowIndices + 1];
	int outRow = 0;
	// qc rows of the range
	for (int row = 0; row < height; row++) {
		// each qc row makes z actual rows
		for (int rowOfCell = 0; rowOfCell < z; rowOfCell++) {
			int entryCount = 0;
			// qc columns of the range
			for (int col = 0; col < width; col++) {
				int positionInQcArray = (row + yoff) * qcWidth + (col + xoff);
				int rot = qc[positionInQcArray];
				// printf("%d\n", rot);
				if (rot >= 0) {
					int idx = col * z + (rot + rowOfCell) % z;
					// printf("idx: %d\n", idx);
					tmpRow[++entryCount] = idx; // index at 1
				}
			}
			int *rdata = (int *) malloc(sizeof (int) * (entryCount + 1));
			mat[outRow++] = rdata;
			rdata[0] = entryCount;
			for (int i = 1; i <= entryCount; i++) {
				rdata[i] = tmpRow[i];
			}
		}
	}
	return mat;
}