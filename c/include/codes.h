
#ifndef __CODES_H__
#define __CODES_H__

/**
 * Tables of sparse arrays for encoding
 * with LDPC
 */
typedef struct
{
	int M;
	int N;
	int messageBits;
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
} Code;

Code c12_648;
Code R12_1296;
Code R12_1944;
Code R23_648;
Code R23_1296;
Code R23_1944;
Code R34_648;
Code R34_1296;
Code R34_1944;
Code R56_648;
Code R56_1296;
Code R56_1944;

#endif

