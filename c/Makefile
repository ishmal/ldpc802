
CC=gcc
CFLAGS=-Wall -g
INC=-Iinclude
LIB=-Lobj

OBJ=\
	obj/802-codes.o \
	obj/802-tables.o \
	obj/ldpc802.o \
	obj/ldpcEncoder.o \
	obj/ldpcDecoder.o \
	obj/crc32.o \
	obj/util.o

DEPS=\
	include/802-codes.h src/802-codes.c \
	include/802-tables.h src/802-tables.c \
	include/ldpc802.h src/ldpc802.c \
	include/ldpcEncoder.h src/ldpcEncoder.c \
	include/ldpcDecoder.h src/ldpcDecoder.c \
	include/crc32.h src/crc32.c \
	include/util.h src/util.c


ALL: obj/libldpc802.a

obj/libldpc802.a: $(OBJ)
	$(AR) vr $@ $(OBJ)

obj/%.o : src/%.c
	$(CC) $(CFLAGS) $(INC) -c -o $@ $<

clean:
	$(RM) obj/*

test:
	( cd test && make clean ; make ; ./testme )


