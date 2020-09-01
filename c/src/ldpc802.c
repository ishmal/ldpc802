
#include <stdlib.h>

#include <ldpc802.h>

LdpcCodec* ldpcCodecCreate() {
	LdpcCodec *codec = (LdpcCodec *) malloc(sizeof(LdpcCodec));
	//initialize
	return codec;
}

void ldpcCodecDestroy(LdpcCodec *codec) {
	if (codec) {
		free(codec);
	}
}