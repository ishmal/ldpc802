
CC=gcc
CFLAGS=-Wall -g
INC=-Iinclude
LIB=-Lobj

OBJS=\
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

obj/libldpc802.a: $(OBJS)
	$(AR) vr $@ $(OBJS)

obj/%.o : src/%.c
	$(CC) $(CFLAGS) $(INC) -c -o $@ $<

clean:
	$(RM) obj/* testobj/*


testobj/%.o : testsrc/%.c
	$(CC) $(CFLAGS) $(INC) -c -o $@ $<

TESTOBJS = \
	testobj/main.o \
	testobj/crcTest.o \
	testobj/utilTest.o \
	testobj/ldpcDecoderTest.o \
	testobj/ldpcEncoderTest.o \
	testobj/tableTest.o

test: testobj/testme

testobj/testme: $(TESTOBJS) obj/libldpc802.a
	$(CC) $(TESTOBJS) -o testobj/testme $(LIB) -lldpc802 -lcunit -lm


