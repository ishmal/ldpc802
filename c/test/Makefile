
CC = gcc
CFLAGS = -g -Wall
INC=-I../include
LIB=-L../obj

OBJS = \
	main.o \
	crcTest.o \
	utilTest.o \
	ldpcDecoderTest.o \
	ldpcEncoderTest.o \
	tableTest.o

all: testme

testme: $(OBJS)
	$(CC) -o testme $(OBJS) -o testme $(LIB) -lldpc802 -lcunit -lm

.c.o:
	$(CC) $(CFLAGS) $(INC) -c $< -o $@

clean:
	$(RM) testme *.o

