/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

import { Crc32 } from "../src/crc32";

describe("CRC32 tests", function () {

	it("should produce a correct value for a string", () => {
		const str = "The quick brown fox jumps over the lazy dog";
		const res = Crc32.ofString(str)
		expect(res).toEqual(0x414fa339);
	});

	it("should produce a correct value for an array of bytes", () => {
		const arr = [0x01, 0x02, 0x03, 0x04, 0x05];
		const res = Crc32.ofBytes(arr)
		expect(res).toEqual(0x470B99F4);
	});

	it("should convert int to bytes properly", () => {
		const val = 0xcafebabe;
		const bytes = Crc32.intToBytes(val);
		const exp = [0xca, 0xfe, 0xba, 0xbe];
		expect(bytes).toEqual(exp);
	});

	it("should convert bytes to int properly", () => {
		const exp = 0x80808080;
		const bytes = [0x80, 0x80, 0x80, 0x80];
		const val = Crc32.bytesToInt(bytes);
		expect(val).toEqual(exp);
	});


});