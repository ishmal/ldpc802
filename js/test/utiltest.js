import { Util } from "../src/util";
import { Data } from "./testdata";


describe("Util", () => {

	it("should convert bytes to big endian bits and back correctly", () => {
		for (let i = 0; i < 256; i++) {
			const bits = Util.byteToBitsBE(i);
			const b = Util.bitsToByteBE(bits);
			expect(b).toEqual(i);
		}
	});

	it("should convert bytes to little endian bits and back correctly", () => {
		for (let i = 0; i < 256; i++) {
			const bits = Util.byteToBitsLE(i);
			const b = Util.bitsToByteLE(bits);
			expect(b).toEqual(i);
		}
	});

	it("should convert a byte to big endian bits", () => {
		let arr = [173,  89,  217,  135];
		let exp = [
			[1,0,1,0,1,1,0,1], 
			[0,1,0,1,1,0,0,1], 
			[1,1,0,1,1,0,0,1],
			[1,0,0,0,0,1,1,1]
		]
		for (let i = 0 ; i < arr.length ; i++) {
			const bits = Util.byteToBitsBE(arr[i]);
			expect(bits).toEqual(exp[i]);
		}
	});

	it("should convert an array of bytes to big endian bits", () => {
		let arr = [173,  89,  217,  135];
		let exp = [
			1,0,1,0,1,1,0,1, 
			0,1,0,1,1,0,0,1, 
			1,1,0,1,1,0,0,1,
			1,0,0,0,0,1,1,1
		]
		const bits = Util.bytesToBitsBE(arr);
		expect(bits).toEqual(exp);
	});

	it("should convert an array of bytes to big endian bits 2", () => {
		let arr = [0,  0,  4,  2];
		let exp = [
			0,0,0,0,0,0,0,0, 
			0,0,0,0,0,0,0,0, 
			0,0,0,0,0,1,0,0, 
			0,0,0,0,0,0,1,0 
		]
		const bits = Util.bytesToBitsBE(arr);
		expect(bits).toEqual(exp);
	});

	it("should convert an array of bytes to big endian bits", () => {
		let arr = [173,  89,  217,  135];
		let exp = [
			0b10101101, 0b01011001, 0b11011001, 0b10000111
		]
		const bits = Util.bytesToBitsBE(arr);
		const res = Util.bitsToBytesBE(bits);
		expect(res).toEqual(arr);
	});

	it("should convert an array of bytes to big endian bits and back", () => {
		let arr = [0, 1, 2, 3, 4, 5, 6];
		const bits = Util.bytesToBitsBE(arr);
		const res = Util.bitsToBytesBE(bits);
		expect(res).toEqual(arr);
	});

	it("should convert an array of bytes to little endian bits and back", () => {
		let arr = [0, 1, 2, 3, 4, 5, 6];
		const bits = Util.bytesToBitsLE(arr);
		const res = Util.bitsToBytesLE(bits);
		expect(res).toEqual(arr);
	});

	it("should pad bytes correctly", () => {
		let bytes = [1, 2, 3, 4, 5, 6];
		const exp = [1, 2, 3, 4, 5, 6, 0, 0, 0];
		const res = Util.zeroPadArray(bytes, 9);
		expect(res).toEqual(exp);
	});

	it("should pad bits correctly", () => {
		let bits = Util.bytesToBitsBE(Data.scrambled1);
		const obits = Util.zeroPadArray(bits, 1458);
		const res = Util.bitsToBytesBE(obits);
		expect(res).toEqual(Data.shortened1);
	});

	it("should multiply with a sparse matrix properly", () => {
		// a 4x4 matrix of 1's in sparse notation
		/**
		 * 1 0 1 1
		 * 0 1 0 1
		 * 1 1 0 0
		 * 1 1 1 1
		 */
		const matrix = [
			[0, 2, 3],
			[1, 3],
			[0, 1],
			[0, 1, 2, 3],
		]
		const v = [ 1, 0, 1, 0];
		const res = Util.multiplySparse(matrix, v);
		const exp = [ 0, 0, 1, 0];
		expect(res).toEqual(exp);
	});


	it("should back substitute with a sparse matrix properly", () => {
		// lower triangular matrix
		/**
		 * 1 0 0 0 0
		 * 0 1 0 0 0
		 * 1 1 1 0 0
		 * 1 0 1 1 0
		 * 0 1 1 0 1
		 */
		const matrix = [
			[0],
			[1],
			[0, 1, 2],
			[0, 2, 3],
			[1, 2, 4]
		]
		const v = [ 1, 0, 1, 0, 1];
		const x = Util.multiplySparse(matrix, v);
		const exp1 = [1, 0, 0, 0, 0];
		expect(x).toEqual(exp1);
		const y = Util.substituteSparse(matrix, x);
		expect(y).toEqual(v);
	});



});