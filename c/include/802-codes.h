#ifndef __802_CODES_H__
#define __802_CODES_H__

#ifdef __cplusplus  
extern "C" {
#endif  

typedef struct {
	int z;    // size of QC block.  ex:  27
	int M;    // height of unpacked matrix
	int N;    // width of unpacked matrix
	int messageBits;  // message bits per word (N * rate)
	int nb;   // width in qc blocks (N / z)
	int mb;   // height in qc blocks (M / z)
	int kb;   // parity blocks (N - messageBits) / z
	int Hb[]; // nb * mb array, in flattened list
} Code;


extern Code c12_648;
extern Code c12_1296;
extern Code c12_1944;
extern Code c23_648;
extern Code c23_1296;
extern Code c23_1944;
extern Code c34_648;
extern Code c34_1296;
extern Code c34_1944;
extern Code c56_648;
extern Code c56_1296;
extern Code c56_1944;

#ifdef __cplusplus
}
#endif

#endif


