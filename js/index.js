(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Ldpc = {})));
}(this, (function (exports) { 'use strict';

	/**
	 * LDPC codes from IEEE Std 802.11™-2016
	 * 
	 * Notes:
	 *   1.  obviously nb, kb, and kb are trivial to calculate, but they
	 *     will never change, so why not just state their values?
	 *   2.  both the numerical and text forms of the tables are provided
	 *     so that they may be validated.
	 */
	const codes80211n = {
	    "1/2": {
			"648": {
				z: 27,
				M: 324,
				N: 648,
				messageBits: 324,
				nb: 24,
				mb: 12,
				kb: 12,
				Hb: [
					[  0, -1, -1, -1,  0,  0, -1, -1,  0, -1, -1,  0,  1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 22,  0, -1, -1, 17, -1,  0,  0, 12, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[  6, -1,  0, -1, 10, -1, -1, -1, 24, -1,  0, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[  2, -1, -1,  0, 20, -1, -1, -1, 25,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1 ],
					[ 23, -1, -1, -1,  3, -1, -1, -1,  0, -1,  9, 11, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1 ],
					[ 24, -1, 23,  1, 17, -1,  3, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 25, -1, -1, -1,  8, -1, -1, -1,  7, 18, -1, -1,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 13, 24, -1, -1,  0, -1,  8, -1,  6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[  7, 20, -1, 16, 22, 10, -1, -1, 23, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1 ],
					[ 11, -1, -1, -1, 19, -1, -1, -1, 13, -1,  3, 17, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[ 25, -1,  8, -1, 23, 18, -1, 14,  9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[  3, -1, -1, -1, 16, -1, -1,  2, 25,  5, -1, -1,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0 ]
				]
			},
			"1296": {
				z: 54,
				M: 648,
				N: 1296,
				messageBits: 648,
				nb: 24,
				mb: 12,
				kb: 12,
				Hb: [
					[ 40, -1, -1, -1, 22, -1, 49, 23, 43, -1, -1, -1,  1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 50,  1, -1, -1, 48, 35, -1, -1, 13, -1, 30, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 39, 50, -1, -1,  4, -1,  2, -1, -1, -1, -1, 49, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 33, -1, -1, 38, 37, -1, -1,  4,  1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1 ],
					[ 45, -1, -1, -1,  0, 22, -1, -1, 20, 42, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1 ],
					[ 51, -1, -1, 48, 35, -1, -1, -1, 44, -1, 18, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 47, 11, -1, -1, -1, 17, -1, -1, 51, -1, -1, -1,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[  5, -1, 25, -1,  6, -1, 45, -1, 13, 40, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 33, -1, -1, 34, 24, -1, -1, -1, 23, -1, -1, 46, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1 ],
					[  1, -1, 27, -1,  1, -1, -1, -1, 38, -1, 44, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[ -1, 18, -1, -1, 23, -1, -1,  8,  0, 35, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 49, -1, 17, -1, 30, -1, -1, -1, 34, -1, -1, 19,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0 ]
				]
			},
			"1944": {
				z: 81,
				M: 972,
				N: 1944,
				messageBits: 972,
				nb: 24,
				mb: 12,
				kb: 12,
				Hb: [
					[ 57, -1, -1, -1, 50, -1, 11, -1, 50, -1, 79, -1,  1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[  3, -1, 28, -1,  0, -1, -1, -1, 55,  7, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 30, -1, -1, -1, 24, 37, -1, -1, 56, 14, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1 ],
					[ 62, 53, -1, -1, 53, -1, -1,  3, 35, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1 ],
					[ 40, -1, -1, 20, 66, -1, -1, 22, 28, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1 ],
					[  0, -1, -1, -1,  8, -1, 42, -1, 50, -1, -1,  8, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 69, 79, 79, -1, -1, -1, 56, -1, 52, -1, -1, -1,  0, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 65, -1, -1, -1, 38, 57, -1, -1, 72, -1, 27, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 64, -1, -1, -1, 14, 52, -1, -1, 30, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1 ],
					[ -1, 45, -1, 70,  0, -1, -1, -1, 77,  9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[  2, 56, -1, 57, 35, -1, -1, -1, -1, -1, 12, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 24, -1, 61, -1, 60, -1, -1, 27, 51, -1, -1, 16,  1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0 ]
				]				
			}
	    },
	    "2/3": {
			"648": {
				z: 27,
				M: 216,
				N: 648,
				messageBits: 432,
				nb: 24,
				mb: 8,
				kb: 16,
				Hb: [
					[ 25, 26, 14, -1, 20, -1,  2, -1,  4, -1, -1,  8, -1, 16, -1, 18,  1,  0, -1, -1, -1, -1, -1, -1 ],
					[ 10,  9, 15, 11, -1,  0, -1,  1, -1, -1, 18, -1,  8, -1, 10, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 16,  2, 20, 26, 21, -1,  6, -1,  1, 26, -1,  7, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 10, 13,  5,  0, -1,  3, -1,  7, -1, -1, 26, -1, -1, 13, -1, 16, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 23, 14, 24, -1, 12, -1, 19, -1, 17, -1, -1, -1, 20, -1, 21, -1,  0, -1, -1, -1,  0,  0, -1, -1 ],
					[  6, 22,  9, 20, -1, 25, -1, 17, -1,  8, -1, 14, -1, 18, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[ 14, 23, 21, 11, 20, -1, 24, -1, 18, -1, 19, -1, -1, -1, -1, 22, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 17, 11, 11, 20, -1, 21, -1, 26, -1,  3, -1, -1, 18, -1, 26, -1,  1, -1, -1, -1, -1, -1, -1,  0 ]
				]				
			},
			"1296": {
				z: 54,
				M: 432,
				N: 1296,
				messageBits: 864,
				nb: 24,
				mb: 8,
				kb: 16,
				Hb: [
					[ 39, 31, 22, 43, -1, 40,  4, -1, 11, -1, -1, 50, -1, -1, -1,  6,  1,  0, -1, -1, -1, -1, -1, -1 ],
					[ 25, 52, 41,  2,  6, -1, 14, -1, 34, -1, -1, -1, 24, -1, 37, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 43, 31, 29,  0, 21, -1, 28, -1, -1,  2, -1, -1,  7, -1, 17, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 20, 33, 48, -1,  4, 13, -1, 26, -1, -1, 22, -1, -1, 46, 42, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 45,  7, 18, 51, 12, 25, -1, -1, -1, 50, -1, -1,  5, -1, -1, -1,  0, -1, -1, -1,  0,  0, -1, -1 ],
					[ 35, 40, 32, 16,  5, -1, -1, 18, -1, -1, 43, 51, -1, 32, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[  9, 24, 13, 22, 28, -1, -1, 37, -1, -1, 25, -1, -1, 52, -1, 13, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 32, 22,  4, 21, 16, -1, -1, -1, 27, 28, -1, 38, -1, -1, -1,  8,  1, -1, -1, -1, -1, -1, -1,  0 ]
				]				
			},
			"1944": {
				z: 81,
				M: 648,
				N: 1944,
				messageBits: 1296,
				nb: 24,
				mb: 8,
				kb: 16,
				Hb: [
					[ 61, 75,  4, 63, 56, -1, -1, -1, -1, -1, -1,  8, -1,  2, 17, 25,  1,  0, -1, -1, -1, -1, -1, -1 ],
					[ 56, 74, 77, 20, -1, -1, -1, 64, 24,  4, 67, -1,  7, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1 ],
					[ 28, 21, 68, 10,  7, 14, 65, -1, -1, -1, 23, -1, -1, -1, 75, -1, -1, -1,  0,  0, -1, -1, -1, -1 ],
					[ 48, 38, 43, 78, 76, -1, -1, -1, -1,  5, 36, -1, 15, 72, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 40,  2, 53, 25, -1, 52, 62, -1, 20, -1, -1, 44, -1, -1, -1, -1,  0, -1, -1, -1,  0,  0, -1, -1 ],
					[ 69, 23, 64, 10, 22, -1, 21, -1, -1, -1, -1, -1, 68, 23, 29, -1, -1, -1, -1, -1, -1,  0,  0, -1 ],
					[ 12,  0, 68, 20, 55, 61, -1, 40, -1, -1, -1, 52, -1, -1, -1, 44, -1, -1, -1, -1, -1, -1,  0,  0 ],
					[ 58,  8, 34, 64, 78, -1, -1, 11, 78, 24, -1, -1, -1, -1, -1, 58,  1, -1, -1, -1, -1, -1, -1,  0 ]
				]
			}
	    },
	    "3/4": {
			"648": {
				z: 27,
				M: 162,
				N: 648,
				messageBits: 486,
				nb: 24,
				mb: 6,
				kb: 18,
				Hb: [
					[ 16, 17, 22, 24,  9,  3, 14, -1,  4,  2,  7, -1, 26, -1,  2, -1, 21, -1,  1,  0, -1, -1, -1, -1 ],
					[ 25, 12, 12,  3,  3, 26,  6, 21, -1, 15, 22, -1, 15, -1,  4, -1, -1, 16, -1,  0,  0, -1, -1, -1 ],
					[ 25, 18, 26, 16, 22, 23,  9, -1,  0, -1,  4, -1,  4, -1,  8, 23, 11, -1, -1, -1,  0,  0, -1, -1 ],
					[  9,  7,  0,  1, 17, -1, -1,  7,  3, -1,  3, 23, -1, 16, -1, -1, 21, -1,  0, -1, -1,  0,  0, -1 ],
					[ 24,  5, 26,  7,  1, -1, -1, 15, 24, 15, -1,  8, -1, 13, -1, 13, -1, 11, -1, -1, -1, -1,  0,  0 ],
					[  2,  2, 19, 14, 24,  1, 15, 19, -1, 21, -1,  2, -1, 24, -1,  3, -1,  2,  1, -1, -1, -1, -1,  0 ]
				]				
			},
			"1296": {
				z: 54,
				M: 324,
				N: 1296,
				messageBits: 972,
				nb: 24,
				mb: 6,
				kb: 18,
				Hb: [
					[ 39, 40, 51, 41,  3, 29,  8, 36, -1, 14, -1,  6, -1, 33, -1, 11, -1,  4,  1,  0, -1, -1, -1, -1 ],
					[ 48, 21, 47,  9, 48, 35, 51, -1, 38, -1, 28, -1, 34, -1, 50, -1, 50, -1, -1,  0,  0, -1, -1, -1 ],
					[ 30, 39, 28, 42, 50, 39,  5, 17, -1,  6, -1, 18, -1, 20, -1, 15, -1, 40, -1, -1,  0,  0, -1, -1 ],
					[ 29,  0,  1, 43, 36, 30, 47, -1, 49, -1, 47, -1,  3, -1, 35, -1, 34, -1,  0, -1, -1,  0,  0, -1 ],
					[  1, 32, 11, 23, 10, 44, 12,  7, -1, 48, -1,  4, -1,  9, -1, 17, -1, 16, -1, -1, -1, -1,  0,  0 ],
					[ 13,  7, 15, 47, 23, 16, 47, -1, 43, -1, 29, -1, 52, -1,  2, -1, 53, -1,  1, -1, -1, -1, -1,  0 ]
				]				
			},
			"1944": {
				z: 81,
				M: 486,
				N: 1944,
				messageBits: 1458,
				nb: 24,
				mb: 6,
				kb: 18,
				Hb: [
					[ 48, 29, 28, 39,  9, 61, -1, -1, -1, 63, 45, 80, -1, -1, -1, 37, 32, 22,  1,  0, -1, -1, -1, -1 ],
					[  4, 49, 42, 48, 11, 30, -1, -1, -1, 49, 17, 41, 37, 15, -1, 54, -1, -1, -1,  0,  0, -1, -1, -1 ],
					[ 35, 76, 78, 51, 37, 35, 21, -1, 17, 64, -1, -1, -1, 59,  7, -1, -1, 32, -1, -1,  0,  0, -1, -1 ],
					[  9, 65, 44,  9, 54, 56, 73, 34, 42, -1, -1, -1, 35, -1, -1, -1, 46, 39,  0, -1, -1,  0,  0, -1 ],
					[  3, 62,  7, 80, 68, 26, -1, 80, 55, -1, 36, -1, 26, -1,  9, -1, 72, -1, -1, -1, -1, -1,  0,  0 ],
					[ 26, 75, 33, 21, 69, 59,  3, 38, -1, -1, -1, 35, -1, 62, 36, 26, -1, -1,  1, -1, -1, -1, -1,  0 ]
				],
			}
	    },
	    "5/6": {
			"648": {
				z: 27,
				M: 108,
				N: 648,
				messageBits: 540,
				nb: 24,
				mb: 4,
				kb: 20,
				Hb: [
					[ 17, 13,  8, 21,  9,  3, 18, 12, 10,  0,  4, 15, 19,  2,  5, 10, 26, 19, 13, 13,  1,  0, -1, -1 ],
					[  3, 12, 11, 14, 11, 25,  5, 18,  0,  9,  2, 26, 26, 10, 24,  7, 14, 20,  4,  2, -1,  0,  0, -1 ],
					[ 22, 16,  4,  3, 10, 21, 12,  5, 21, 14, 19,  5, -1,  8,  5, 18, 11,  5,  5, 15,  0, -1,  0,  0 ],
					[  7,  7, 14, 14,  4, 16, 16, 24, 24, 10,  1,  7, 15,  6, 10, 26,  8, 18, 21, 14,  1, -1, -1,  0 ]
				]
			},
			"1296": {
				z: 54,
				M: 216,
				N: 1296,
				messageBits: 1080,
				nb: 24,
				mb: 4,
				kb: 20,
				Hb: [
					[ 48, 29, 37, 52,  2, 16,  6, 14, 53, 31, 34,  5, 18, 42, 53, 31, 45, -1, 46, 52,  1,  0, -1, -1 ],
					[ 17,  4, 30,  7, 43, 11, 24,  6, 14, 21,  6, 39, 17, 40, 47,  7, 15, 41, 19, -1, -1,  0,  0, -1 ],
					[  7,  2, 51, 31, 46, 23, 16, 11, 53, 40, 10,  7, 46, 53, 33, 35, -1, 25, 35, 38,  0, -1,  0,  0 ],
					[ 19, 48, 41,  1, 10,  7, 36, 47,  5, 29, 52, 52, 31, 10, 26,  6,  3,  2, -1, 51,  1, -1, -1,  0 ]
				]
			},
			"1944": {
				z: 81,
				M: 324,
				N: 1944,
				messageBits: 1620,
				nb: 24,
				mb: 4,
				kb: 20,
				Hb: [
					[ 13, 48, 80, 66,  4, 74,  7, 30, 76, 52, 37, 60, -1, 49, 73, 31, 74, 73, 23, -1,  1,  0, -1, -1 ],
					[ 69, 63, 74, 56, 64, 77, 57, 65,  6, 16, 51, -1, 64, -1, 68,  9, 48, 62, 54, 27, -1,  0,  0, -1 ],
					[ 51, 15,  0, 80, 24, 25, 42, 54, 44, 71, 71,  9, 67, 35, -1, 58, -1, 29, -1, 53,  0, -1,  0,  0 ],
					[ 16, 29, 36, 41, 44, 56, 59, 37, 50, 24, -1, 65,  4, 65, 52, -1,  4, -1, 73, 52,  1, -1, -1,  0 ]
				]
			}
		}
	};

	/* jshint esversion: 6 */

	class CodeTable {
		constructor(codes = codes80211n) {
			this.codes = codes;
			this.makeTables();
		}
		
		makeTables() {
			Object.values(this.codes).forEach(rate => {
				Object.values(rate).forEach(code => {
					const z = code.z;
					const A = this.getA(code);
					code.A = this.qcMatrixToSparse(A, z);
					const B = this.getB(code);
					code.B = this.qcMatrixToSparse(B, z);
					const C = this.getC(code);
					code.C = this.qcMatrixToSparse(C, z);
					const D = this.getD(code);
					code.D = this.qcMatrixToSparse(D, z);
					const E = this.getE(code);
					code.E = this.qcMatrixToSparse(E, z);
					const T = this.getT(code);			
					code.T = this.qcMatrixToSparse(T, z);
					const H = code.Hb;			
					code.H = this.qcMatrixToSparse(H, z);
				});
			});
		}

		/**
		 * Convert a matrix of qc description integers into rows of indices
		 * of each 1.
		 * @param {array<array>} qcMatrix rows/columns of integers describing
		 * 		each square qc block's rotation
		 * @param {number} z the size of the square qc block
		 */
		qcMatrixToSparse(qcMatrix, z) {
			let allRows = [];
			const qcRows = qcMatrix.length;
			const qcCols = qcMatrix[0].length;
			for (let qcRowIdx = 0 ; qcRowIdx < qcRows ; qcRowIdx++) {
				const rows = [];
				for (let i = 0 ; i < z ; i++) {
					rows[i] = new Array();
				}
				const qcRow = qcMatrix[qcRowIdx];
				for (let qcColIdx = 0, colIdx = 0 ; qcColIdx < qcCols ; qcColIdx++, colIdx += z) {
					const qc = qcRow[qcColIdx];
					if (qc < 0) {
						continue;
					}
					for (let i = 0 ; i < z ; i++) {
						const bitIndex = colIdx + (qc + i) % z;
						rows[i].push(bitIndex);
					}
				}
				allRows = allRows.concat(rows);
			}
			return allRows;
		}

		
		/**
		 * Convert a matrix of qc description integers into rows of 1's and 0's.
		 * @param {array<array>} qcMatrix rows/columns of 1 and 0
		 * @param {number} z the size of the square qc block
		 */
		qcMatrixToDense(qcMatrix, z) {
			let allRows = [];
			const qcRows = qcMatrix.length;
			const qcCols = qcMatrix[0].length;
			// console.log(`qc: ${qcCols} z:${z}`);
			for (let qcRowIdx = 0 ; qcRowIdx < qcRows ; qcRowIdx++) {
				const rows = [];
				for (let i = 0 ; i < z ; i++) {
					rows[i] = new Array();
				}
				const qcRow = qcMatrix[qcRowIdx];
				for (let qcColIdx = 0, colIdx = 0 ; qcColIdx < qcCols ; qcColIdx++, colIdx += z) {
					const qc = qcRow[qcColIdx];
					if (qc < 0) {
						for (let i = 0 ; i < z ; i++) {
							for (let j = 0; j < z ; j++) {
								rows[i].push(0);
							}
						}
					} else {
						for (let i = 0 ; i < z ; i++) {
							const bitIndex = ((qc + i) % z);
							for (let j = 0 ; j < z ; j++) {
								const v = (j === bitIndex) ? 1 : 0;
								rows[i].push(v);
							}
						}
					}
				}
				allRows = allRows.concat(rows);
			}
			return allRows;
		}

		
		getA(code) {
			const A = [];
			for (let i = 0, len = code.mb - 1; i < len; i++) {
				const row = code.Hb[i];
				const val = row.slice(0, code.kb);
				A.push(val);
			}
			return A;
		}
		
		getB(code) {
			const pos = code.kb;
			const B = [];
			for (let i = 0, len = code.mb - 1; i < len; i++) {
				const val = code.Hb[i][pos];
				B.push([ val ]);
			}
			return B;
		}
		
		getC(code) {
			const C = [ code.Hb[code.mb - 1].slice(0, code.kb) ];
			return C;
		}
		
		getD(code) {
			const D = [ [ code.Hb[code.mb - 1][code.kb] ]];
			return D;
		}
		
		getE(code) {
			const E = [ code.Hb[code.mb - 1].slice(code.kb + 1) ];
			return E;
		}
		
		getT(code) {
			const pos = code.kb + 1;
			const T = [];
			for (let i = 0, len = code.mb - 1; i < len; i++) {
				const row = code.Hb[i];
				T.push(row.slice(pos));
			}
			return T;
		}
			
	}

	/* jshint node: true, esversion: 6 */

	const crcTable = [
		0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f,
		0xe963a535, 0x9e6495a3,	0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988,
		0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2,
		0xf3b97148, 0x84be41de,	0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7,
		0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec,	0x14015c4f, 0x63066cd9,
		0xfa0f3d63, 0x8d080df5,	0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172,
		0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b,	0x35b5a8fa, 0x42b2986c,
		0xdbbbc9d6, 0xacbcf940,	0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59,
		0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423,
		0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924,
		0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d,	0x76dc4190, 0x01db7106,
		0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433,
		0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d,
		0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e,
		0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950,
		0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65,
		0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7,
		0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0,
		0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa,
		0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
		0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81,
		0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a,
		0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 0xe3630b12, 0x94643b84,
		0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1,
		0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb,
		0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc,
		0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e,
		0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b,
		0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55,
		0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236,
		0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28,
		0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d,
		0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f,
		0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38,
		0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4, 0xf1d4e242,
		0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777,
		0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69,
		0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2,
		0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc,
		0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
		0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693,
		0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94,
		0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d
	];


	/**
	 * Calculates a 4-byte CRC32 of a string or byte array
	 */
	class Crc32 {

	    /**
	     * Convert a string to an array of UTF-8 bytes
	     * @param {string} str string to convert
	     * @return {array} of bytes
	     */
	    static stringToBytes(str) {
	        let bytes = [];
	        for (let i = 0, len = str.length; i < len; i++) {
	            let code = str.charCodeAt(i);
	            if (code < 0x80) {
	                bytes.push(code);
	            } else if (code < 0x800) {
	                bytes.push(0xc0 | (code >> 6),
	                    0x80 | (code & 0x3f));
	            } else if (code < 0xd800 || code >= 0xe000) {
	                bytes.push(0xe0 | (code >> 12),
	                    0x80 | ((code >> 6) & 0x3f),
	                    0x80 | (code & 0x3f));
	            } else { // surrogate pair
	                i++;
	                /**
	                 * UTF-16 encodes 0x10000-0x10FFFF by
	                 * subtracting 0x10000 and splitting the
	                 * 20 bits of 0x0-0xFFFFF into two halves
	                 */
	                code = 0x10000 + (((code & 0x3ff) << 10) |
	                    (str.codeAt(i) & 0x3ff));
	                bytes.push(0xf0 | (code >> 18),
	                    0x80 | ((code >> 12) & 0x3f),
	                    0x80 | ((code >> 6) & 0x3f),
	                    0x80 | (code & 0x3f));
	            }
	        }
	        return bytes;
	    }

	    /**
	     * Calculate the crc32 checksum for a string
	     * @param {string} str input string
	     * @return {number} the crc
	     */
	    static ofString(str) {
	        let bytes = this.stringToBytes(str);
	        return this.ofBytes(bytes);
	    }

	    /**
	     * Calculate the crc32 checksum for an array of bytes
	     * @param {array} bytes array of bytes
	     * @return {number} the crc
	     */
	    static ofBytes(bytes) {
	        let crc = 0 ^ (-1);
	        for (let byte of bytes) {
	            crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
	        }
	        return (crc ^ (-1)) >>> 0;
	    }

	    /**
	     * break a 32-bit crc into 4 bytes, so that they can be sent as payload.
	     * @param {number} the crc to break apart
	     * @return {array} the 4 bytes
	     */
	    static intToBytes(crc) {
	        let bytes = [
	            (crc >> 24) & 0xff,
	            (crc >> 16) & 0xff,
	            (crc >> 8) & 0xff,
	            (crc) & 0xff
	        ];
	        return bytes;
	    }

	    /**
	     * reconstitute the int from intoToBytes
	     * @param {array} bytes the 4 bytes to decode
	     * @return {number} the original int
	     */
	    static bytesToInt(bytes) {
			let v = bytes[0];
			v = v << 8 | bytes[1];
			v = v << 8 | bytes[2];
			v = v << 8 | bytes[3];
			return v >>> 0;
	    }

	    /**
	     * break a 32-bit crc into 4 bytes, so that they can be sent as payload.
	     * @param {number} the crc to break apart
	     * @return {array} the 4 bytes
	     */
	    static intToBytesLE(crc) {
	        let bytes = [
	            (crc) & 0xff,
	            (crc >> 8) & 0xff,
	            (crc >> 16) & 0xff,
	            (crc >> 24) & 0xff
	        ];
	        return bytes;
	    }

	}

	Crc32.table = crcTable;

	/**
	 * Calculates the 'phi' function:
	 * phi(x) = log((exp(x) + 1) / (exp(x) - 1))
	 */

	function calcPhiSlow(x) {
		x = Math.max(x, 1e-10);
		const expx = Math.exp(x);
		const v = Math.log((expx + 1) / (expx - 1));
		return v;
	}

	function makePhiTable(size) {
		const delta = 7 / size;
		const table = [];
		let x = delta; //avoid the asymptote
		for (let i = 0; i < size; i++, x+= delta) {
			const v = calcPhiSlow(x);
			table.push(v);
			//console.log(`${x}: ${v}`);
		}
		return table;
	}

	const phiTable = makePhiTable(1000);

	function calcPhiTable(x) {
		if (x >= 7) {
			return 0;
		}
		const idx = (x * 142.85714) | 0;
		return phiTable[idx];
	}

	const calcPhi = calcPhiTable;

	/* jshint esversion: 6 */


	/**
	 * Various common utilities we needs among several modules
	 */
	class Util {

	    /**
	     * Convert a string to an array of UTF-8 bytes
	     * @param {string} str input string
	     * @return {array} of bytes
	     */
	    static stringToBytes(str) {
	        const bytes = [];
	        for (let i = 0, len = str.length; i < len; i++) {
	            let code = str.charCodeAt(i);
	            if (code < 0x80) {
	                bytes.push(code);
	            } else if (code < 0x800) {
	                bytes.push(0xc0 | (code >> 6),
	                    0x80 | (code & 0x3f));
	            } else if (code < 0xd800 || code >= 0xe000) {
	                bytes.push(0xe0 | (code >> 12),
	                    0x80 | ((code >> 6) & 0x3f),
	                    0x80 | (code & 0x3f));
	            } else { // surrogate pair
	                i++;
	                /**
	                 * UTF-16 encodes 0x10000-0x10FFFF by
	                 * subtracting 0x10000 and splitting the
	                 * 20 bits of 0x0-0xFFFFF into two halves
	                 */
	                code = 0x10000 + (((code & 0x3ff) << 10) |
	                    (str.codeAt(i) & 0x3ff));
	                bytes.push(0xf0 | (code >> 18),
	                    0x80 | ((code >> 12) & 0x3f),
	                    0x80 | ((code >> 6) & 0x3f),
	                    0x80 | (code & 0x3f));
	            }
	        }
	        return bytes;
	    }

	    /**
	     * Convert an array of UTF-8 bytes to a string
	     * @param {array} byteArray array of bytes
	     * @return {string}
	     */
	    static bytesToString(byteArray) {
	        const encodedString = String.fromCharCode.apply(null, byteArray);
	        const decodedString = decodeURIComponent(escape(encodedString));
	        return decodedString;
	    }

	    //#########################################################
	    //# B I G   E N D I A N
	    //#########################################################
	    

	    /**
	     * Bigendian
	     * @param {array} bits array of bits 
	     * @return {number} byte
	     */
	    static bitsToByteBE(bits) {
	        const byte =
	            ((bits[0] << 7) & 128) +
	            ((bits[1] << 6) & 64) +
	            ((bits[2] << 5) & 32) +
	            ((bits[3] << 4) & 16) +
	            ((bits[4] << 3) & 8) +
	            ((bits[5] << 2) & 4) +
	            ((bits[6] << 1) & 2) +
	            ((bits[7]) & 1);
	        return byte;
	    }

	    /** 
	     * Assumes bits length is multiple of 8
	     * @param {array} bits array of bits
	     * @return {array} of bytes
	     */
	    static bitsToBytesBE(bits) {
	        const bytes = [];
	        for (let i = 0, len = bits.length; i < len; i += 8) {
	            const b = [
	                bits[i],
	                bits[i + 1],
	                bits[i + 2],
	                bits[i + 3],
	                bits[i + 4],
	                bits[i + 5],
	                bits[i + 6],
	                bits[i + 7]
	            ];
	            const byte = this.bitsToByteBE(b);
	            bytes.push(byte);
	        }
	        return bytes;
	    }

	    /**
	     * Bigendian
	     * @param {number} b byte
	     * @return {array} of bits 
	     */
	    static byteToBitsBE(b) {
	        const bits = [
				(b >> 7) & 1,
				(b >> 6) & 1,
				(b >> 5) & 1,
				(b >> 4) & 1,
				(b >> 3) & 1,
				(b >> 2) & 1,
				(b >> 1) & 1,
				(b) & 1
			];
	        return bits;
	    }

	    /**
	     * Convert an array of bytes to an array of bits. Bigendian.
	     * The output array is 8x the size of the input, each element a 1 or 0
	     * @param {array} bytes array of bytes
	     * @return {array} of bits
	     */
	    static bytesToBitsBE(bytes) {
	        const bits = [];
	        for (let i = 0, len = bytes.length; i < len; i++) {
	            const b = bytes[i];
	            bits.push((b >> 7) & 1);
	            bits.push((b >> 6) & 1);
	            bits.push((b >> 5) & 1);
	            bits.push((b >> 4) & 1);
	            bits.push((b >> 3) & 1);
	            bits.push((b >> 2) & 1);
	            bits.push((b >> 1) & 1);
	            bits.push((b) & 1);
	        }
	        return bits;
	    }

	    //#########################################################
	    //#  L I T T L E    E N D I A N
	    //#########################################################
	    

	    /**
	     * Bigendian
	     * @param {array} bits array of bits
	     * @return {number} byte
	     */
	    static bitsToByteLE(bits) {
	        const byte =
	            ((bits[7] << 7) & 128) +
	            ((bits[6] << 6) & 64) +
	            ((bits[5] << 5) & 32) +
	            ((bits[4] << 4) & 16) +
	            ((bits[3] << 3) & 8) +
	            ((bits[2] << 2) & 4) +
	            ((bits[1] << 1) & 2) +
	            ((bits[0]) & 1);
	        return byte & 0xff;
	    }

	    /** 
	     * Assumes bits length is multiple of 8
	     * @param {array} bits array of bits
	     * @param {array} of bytes
	     */
	    static bitsToBytesLE(bits) {
	        const bytes = [];
	        for (let i = 0, len = bits.length; i < len; i += 8) {
	            const b = [
	                bits[i],
	                bits[i + 1],
	                bits[i + 2],
	                bits[i + 3],
	                bits[i + 4],
	                bits[i + 5],
	                bits[i + 6],
	                bits[i + 7]
	            ];
	            const byte = this.bitsToByteLE(b);
	            bytes.push(byte);
	        }
	        return bytes;
	    }

	    /**
	     * Convert a byte to bits in little endian order
	     * @param {number} b byte
	     * @return {array} of bits 
	     */
	    static byteToBitsLE(b) {
	        b &= 0xff;
	        const bits = [
				(b) & 1,
				(b >> 1) & 1,
				(b >> 2) & 1,
				(b >> 3) & 1,
				(b >> 4) & 1,
				(b >> 5) & 1,
				(b >> 6) & 1,
				(b >> 7) & 1
			];
	        return bits;
	    }

	    /**
	     * Convert an array of bytes to an array of bits. Bigendian.
	     * The output array is 8x the size of the input, each element a 1 or 0
	     * @param {array} bytes array or bytes
	     * @return {array} of bits
	     */
	    static bytesToBitsLE(bytes) {
	        const bits = [];
	        for (let i = 0, len = bytes.length; i < len; i++) {
	            const b = bytes[i] & 255;
	            bits.push((b     ) & 1);
	            bits.push((b >> 1) & 1);
	            bits.push((b >> 2) & 1);
	            bits.push((b >> 3) & 1);
	            bits.push((b >> 4) & 1);
	            bits.push((b >> 5) & 1);
	            bits.push((b >> 6) & 1);
	            bits.push((b >> 7) & 1);
	        }
	        return bits;
	    }

		/**
		 * Pad an array with zeroes to that its length is a given size
		 * @param {array} inbits input array of bits
		 * @param {number} size the desired size,  >= the length of the array
	     * @return {array} of bits
		 */
		static zeroPadArray(inarr, size) {
			const arr = inarr.slice(0);
			let nrZeros = Math.max(size - arr.length, 0);
			while (nrZeros--) {
				arr.push(0);
			}
			return arr;
		}

		/**
		 * Multiply a sparse binary array with a normal binary array
		 * @param {array} sparseArr an array of integer indices to the 1's of the
		 * sparse row vector
		 * @param {array} arr column vector 
		 */
		static multiplySparseVector(sparseArr,  arr) {
			let sum = 0;
			for (let i = 0, len = sparseArr.length; i < len; i++) {
				const idx = sparseArr[i];
				sum ^= arr[idx];
			}
			return sum;
		}

		/**
		 * Multiply a sparse binary matrix with a normal binary array
		 * @param {array} sparseMatrix an array of integer indices to the 1's of the
		 * sparse row vector
		 * @param {array} arr column vector 
		 */
		static multiplySparse(sparseMatrix,  arr) {
			const out = [];
			for (let i = 0, slen = sparseMatrix.length ; i < slen ; i++) {
				const row = sparseMatrix[i];
				let sum = 0;
				for (let j = 0, rlen = row.length ; j < rlen ; j++) {
						const idx = row[j];
						sum ^= arr[idx];
					}
				out[i] = sum;
			}
			return out;
		}

		/**
		 * Perform back substitution sparse binary array with a normal binary array.
		 * Assume sparse is lower diagonal
		 * y[i] = T[i,1]y[1] + T[i,2]y[2] + · · · + T[i,i−1]y[i−1] + x[i]
		 * @param {array} sparseArr an array of integer indices to the 1's of the
		 * sparse row vector
		 * @param {array} arr column vector 
		 */
		static substituteSparse(sparseArr,  arr) {
			const y = [arr[0]];
			for (let i = 1, slen = sparseArr.length; i < slen; i++) {
				const row = sparseArr[i];
				let sum = 0;
				for (let j = 0, rlen = row.length ; j < rlen ; j++) {
					const idx = row[j];
					sum ^= y[idx];
				}
				y[i] = sum ^ arr[i];
			}
			return y;
		}

		static addMatrix(a, b) {
			const mat = [];
			for (let i=0, rows = a.length; i < rows; i++) {
				const row = [];
				const rowA = a[i];
				const rowB = b[i];
				for (let j=0, cols = rowA.length; j < cols ; j++) {
					row.push(rowA[i] ^ rowB[i]);
				}
				mat.push(row);
			}
			return mat;
		}
		

	}

	const multiplySparse = Util.multiplySparse;


	/**
	 * Decoder for LDBC codewords
	 * @see "Introduction to LDPC Codes" by William E Ryan
	 */
	class LdpcDecoder {

		/**
		 * Constructor
		 * @param {object} code the current LDPC code for rate and length
		 */
		constructor(code) {
			this.code = code;
			this.createSPGraph();
			this.maxIter = 100;
		}

		static calcVariance(samples) {
			const n = samples.length;
			let m = 0;
			let s = 0;
			for (let k = 0; k < n; ) {
				const x = samples[k++];
				const oldM = m;
				m += (x - m) / k;
				s += (x - m) * (x - oldM);
			}
		  return s / (n - 1);
		}
		


		/**
		 * Check is the codeword passes check.
		 * @param {array} codeword the word to check
		 * @return {boolean} true if passes 
		 */
		check(codeword) {
			const code = this.code;
			const checkVal = multiplySparse(code.H, codeword);
			for (let i = 0, len = this.code.messageBits; i < len; i++) {
				if (checkVal[i]) {
					return false;
				}
			}
			return true;
		}

		/**
		 * Check is the codeword passes check.  Fails early
		 * for speed.
		 * @param {array} codeword the word to check
		 * @return {boolean} true if passes 
		 */
		checkFast(codeword) {
			const H = this.code.H;
			for (let i = 0, hlen = H.length; i < hlen; i++) {
				const row = H[i];
				let sum = 0;
				for (let j = 0, rlen = row.length; j < rlen; j++) {
					const idx = row[j];
					sum ^= codeword[idx];
				}
				if (sum) {
					return false;
				}
			}
			return true;
		}

		/**
		 * Set up the variable and check nodes,
		 * make the links between them.
		 */
		createTanner() {
			const code = this.code;
			const M = code.M;
			const N = code.N;
			const variableNodes = [];
			for (let i = 0; i < N; i++) {
				variableNodes[i] = {
					clinks: [],
					c: 0
				};
			}
			const checkNodes = [];
			const H = code.H;
			for (let i = 0; i < M; i++) {
				const row = H[i];
				const vlinks = row.map(idx => ({
						v: variableNodes[idx],
						r: 0
				}));
				const cnode = {
					vlinks
				};
				checkNodes[i] = cnode;
				for (let v = 0, len = vlinks.length; v < len; v++) {
					const vnode = vlinks[v].v;
					const clink = {
						c: cnode,
						q: 0
					};
					vnode.clinks.push(clink);
				}
			}
			this.checkNodes = checkNodes;
			this.variableNodes = variableNodes;
		}

		/**
		 * Create an empty
		 */
		createSPGraph() {
			const code = this.code;
			const M = code.M;
			const N = code.N;
			const H = code.H;
			const checkNodes = [];
			const variableNodes = [];

			/**
			 * First make two blank tables
			 */
			for (let i = 0; i < M; i++) {
				checkNodes[i] = {
					links: []
				};
			}
			for (let i = 0; i < N; i++) {
				variableNodes[i] = {
					links: [],
					ci: 0
				};
			}

			/**
			 * Then interconnect then with link records,
			 * using the sparse array information from H
			 */
			for (let i = 0 ; i < M; i++) {
				const row = H[i];
				const cnode = checkNodes[i];
				const rlen = row.length;
				for (let j = 0; j < rlen; j++) {
					const idx = row[j];
					const vnode = variableNodes[idx];
					const link = {
						c: cnode,
						v: vnode,
						q: 0,
						r: 0,
					};
					cnode.links.push(link);
					vnode.links.push(link);
				}
			}

			/**
			 * Attach to this instance
			 */
			this.checkNodes = checkNodes;
			this.variableNodes = variableNodes;
		}

		/**
		 * Decode codeword bits to message bits
		 * @param {array} inBits message array of 1's and 0's
		 * @return decoded array of 1's and zeroes
		 */
		decode(inBits) {
			//if (this.checkFast(inBits)) {
			//	return inBits.slice(0, this.code.messageBits);
			//s}
			const result = this.decodeSumProduct(inBits);
			return result;
		}

		/**
		 * Decode codeword bits to message bits
		 * @param {array} inBits message array of 1's and 0's
		 * @return decoded array of 1's and zeroes
		 */
		/* eslint-disable max-lines-per-function */
		decodeSumProduct(inBits) {
			// localize some values
			const M = this.code.M;
			const N = this.code.N;
			const checkNodes = this.checkNodes;
			const variableNodes = this.variableNodes;

			/**
			 * Step 1.  Initialization of c(ij) and q(ij)
			 */
			const variance = LdpcDecoder.calcVariance(inBits);
			const weight = 2 / variance;
			for (let i = 0; i < N; i++) {
				const vnode = variableNodes[i];
				const Lci = inBits[i] * weight;
				vnode.ci = Lci;
				const links = vnode.links;
				const llen = links.length;
				for (let j = 0; j < llen ; j++) {
					const link = links[j];
					link.r = 0;				
					link.q = Lci;				
				}
			}


			for (let iter = 0; iter < this.maxIter; iter++) {

				/**
				 * Step 2. update r(ji)
				 */
				for (let m = 0; m < M; m++) {
					const checkNode = checkNodes[m];
					const links = checkNode.links;
					const llen = links.length;

					for (let i = 0; i < llen ; i++) {
						const rlink = links[i];
						/**
						 * Sum and product for links !== i
						 */
						let sum = 0;
						let prod = 1;
						for (let v = 0; v < llen; v++) {
							if (v === i) {
								continue;
							}
							const q = links[v].q;
							const beta = Math.abs(q);
							const phiBeta = calcPhi(beta);
							sum += phiBeta;
							const alpha = q < 0 ? -1 : 1;
							prod *= alpha;
						}
						const phiSum = calcPhi(sum);
						rlink.r = prod * phiSum;
					}
				}

				/**
				 * Step 3.  Update qij
				 */
				for (let i = 0; i < N; i++) {
					const vnode = variableNodes[i];
					const links = vnode.links;
					const llen = links.length;
					for (let k = 0; k < llen; k++) {
						const link = links[k];
						let sum = 0;
						for (let c = 0; c < llen; c++) {
							if (c !== k) {
								sum += links[c].r;
							}
						}
						link.q = vnode.ci + sum;
					}
				}

				/**
				 * Step 4.  Check syndrome
				 */
				const c = [];
				for (let i = 0; i < N ; i++) {
					const vnode = variableNodes[i];
					const links = vnode.links;
					const llen = links.length;
					let sum = 0;
					for (let v = 0 ; v < llen ; v++) {
						const link = links[v];
						sum += link.r;
					}
					const LQi = vnode.ci + sum;
					c[i] = LQi < 0 ? 1 : 0;
				}
				if (this.checkFast(c)) {
					return c.slice(0, this.code.messageBits);
				}


			} // for iter

			return null;
		}
		/* eslint-enable */

		/**
		 * Decode codeword bits to message bytes
		 * @param {array} bits message array of 1's and 0's
		 * @return decoded array of bytes if decoding works, else null.
		 */
		decodeToBytes(bits) {
			const outbits = this.decode(bits);
			if (!outbits) {
				return null;
			}
			const bytes = Util.bitsToBytesBE(outbits);
			return bytes;
		}
	}

	const multiplySparse$1 = Util.multiplySparse;
	const substituteSparse = Util.substituteSparse;

	function add(a, b) {
		const arr = [];
		for (let i=0, len = a.length; i < len ; i++) {
			arr[i] = a[i] ^ b[i];
		}
		return arr;
	}

	/**
	 * Encoder for 802.11n/ac QC codes
	 */
	class LdpcEncoder {

		/**
		 * Constructor
		 * @param {object} code the code to use for encoding
		 */
		constructor(code) {
			this.code = code;
		}

		encode(s) {
			// step 1
			const Ast = multiplySparse$1(this.code.A, s);
			const Cst = multiplySparse$1(this.code.C, s);
			// step 2
			const TinvAst = substituteSparse(this.code.T, Ast);
			const ETinvAst = multiplySparse$1(this.code.E, TinvAst);
			// step 3
			const p1 = add(ETinvAst, Cst);
			// step 4
			const Bp1 = multiplySparse$1(this.code.B, p1);
			const AstBp1 = add(Ast, Bp1);
			const p2 = substituteSparse(this.code.T, AstBp1);
			// step 5
			const x = s.concat(p1).concat(p2);
			return x;
		}

		/**
		 * Encode a message array of bytes
		 * @param {array} bytes an array of bytes to encode 
		 * @return encoded message bits
		 */
		encodeBytes(bytes) {
			let bits = Util.bytesToBitsBE(bytes);
			bits = bits.slice(0, this.code.messageBits); //just in case
			return this.encode(bits);
		}


	}

	/**
	 * Utility to make coding and decoding easy
	 */
	class LdpcCodec {
		constructor() {
			this.codes = new CodeTable().codes;
			this.setCode("1/2", "648");
			this.withCrc = true;
		}

		/**
		 * Set the rate of this codec: 1/2, 3/4, 5/6
		 * @param {string} rateStr 
		 */
		setRate(rateStr) {
			const rate = this.codes[rateStr];
			if (!rate) {
				throw new Error(`rate '${rateStr}' not found`);
			}
			this.rate = rate;
		}

		/**
		 * Set the length of this codec: 648, 1296, 1944
		 * @param {string} lengthStr the desired length
		 */
		setLength(lengthStr) {
			const code = this.rate[lengthStr];
			if (!code) {
				throw new Error(`length '${lengthStr}' not found`);
			}
			this.code = code;
			this.messageBytes = code.messageBits / 8;
			this.encoder = new LdpcEncoder(code);
			this.decoder = new LdpcDecoder(code);
		}

		/**
		 * Set the rate of this codec: 1/2, 3/4, 5/6
		 * 	and the length: 648, 1296, 1944
		 * @param {string} rateStr 
		 * @param {string} lengthStr 
		 */
		setCode(rateStr, lengthStr) {
			this.setRate(rateStr);
			this.setLength(lengthStr);
		}

		padForShortening(bits) {
			const len = bits.length;
			let padLength = this.code.messageBits - len;
			const pad = new Array(padLength).fill(0);
			const obits = bits.concat(pad);
			return obits;
		}

		shorten(bits, originalLength) {
			const front = bits.slice(0, originalLength);
			const back = bits.slice(this.code.messageBits);
			const ret = front.concat(back);
			return ret;
		}


		encode(bytes) {
			let chunkSize = Math.floor(this.code.messageBits / 8);
			if (this.withCrc) {
				chunkSize -= 4;
			}
			const messages = [];
			for (let i = 0, len = bytes.length ; i < len ; i  += chunkSize) {
				let chunk = bytes.slice(i, i + chunkSize);
				if (this.withCrc) {
					const crc = Crc32.ofBytes(chunk);
					const crcBytes = Crc32.intToBytes(crc);
					chunk = chunk.concat(crcBytes);
				}
				const bits = Util.bytesToBitsBE(chunk);
				const padded = this.padForShortening(bits);
				const encoded = this.encoder.encode(padded);
				const final = this.shorten(encoded, bits.length);
				messages.push(final);
			}
			return messages;
		}

		encodeText(text) {
			const bytes = Util.stringToBytes(text);
			const messages = this.encode(bytes);
			return messages;
		}

		decode(message) {
			const mlen = message.length;
			const N = this.code.N;
			let pad = N - mlen;
			if (pad < 0) {
				throw new Error(`message too long: ${mlen} > ${N}`);
			}
			const parityBits = N - this.code.messageBits;
			const actualBits = mlen - parityBits;
			const front = message.slice(0, actualBits);
			const back = message.slice(actualBits);
			const padBits = new Array(pad).fill(0);
			const padded = front.concat(padBits).concat(back);
			const decoded = this.decoder.decode(padded);
			if (decoded === null) {
				throw new Error("decode failed");
			}
			const final = decoded.slice(0, actualBits);
			let bytes = Util.bitsToBytesBE(final);
			if (this.withCrc) {
				const blen = bytes.length;
				const crcBytes = bytes.slice(blen - 4);
				const given = Crc32.bytesToInt(crcBytes);
				bytes = bytes.slice(0, blen - 4);
				const crc = Crc32.ofBytes(bytes);
				if (crc !== given) {
					throw new Error("crc failed");
				}
			}
			return bytes;
		}

		decodeText(message) {
			const bytes = this.decode(message);
			return Util.bytesToString(bytes);
		}

	}

	const Ldpc = {
		LdpcCodec,
		LdpcDecoder,
		LdpcEncoder,
		CodeTable
	};

	exports.Ldpc = Ldpc;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
