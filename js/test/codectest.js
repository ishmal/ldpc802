/* jshint node: true, esversion: 6 */
/* globals
describe: false,
expect: false,
it: false
*/

import { Codec } from "../src/codec";
import { Util } from "../src/util";
import { Data } from "./testdata";



describe("Codec", () => {

	it("should initialize properly", () => {
		let codec;
		expect(() => codec = new Codec()).not.toThrow();
		expect(codec).toBeDefined();
	});

	it("should wrap in a crc-32", () => {
		const codec = new Codec();
		const inBytes = [
			0x01, 0x02, 0x03, 0x04, 0x05
		];
		const exp = [
			0x01, 0x02, 0x03, 0x04, 0x05,
			0xF4, 0x99, 0x0B, 0x47 
		];
		const res = codec.wrapBytes(inBytes);
		expect(res).toEqual(exp);
	});

	it("should generate scrambling bits correctly", () => {
		const codec = new Codec();
		const scrambleBits = Data.scrambleBits;
		codec.generateScrambler(0xff);
		expect(codec.scrambleBits.length).toEqual(scrambleBits.length);
		expect(codec.scrambleBits).toEqual(scrambleBits);
	});

	it("should scramble correctly", () => {
		const codec = new Codec();
		codec.generateScrambler(0x5d);
		const inbits = Util.bytesToBitsBE(Data.servicePrepended1);
		const scrambled = codec.scramble(inbits);
		const res = Util.bitsToBytesBE(scrambled);
		expect(res).toEqual(Data.scrambled1);
	});

	it("should convert inputMessage1 to inputBytes1", () => {
		const codec = new Codec();
		const messageBytes = Data.inputMessage1;
		const inputMacBytes = Data.inputMac1.slice();
		const inbytes = inputMacBytes.concat(messageBytes);
		const inputBytes1Short = Data.inputBytes1.slice(0, 96);
		expect(inbytes).toEqual(inputBytes1Short);
		const res = codec.wrapBytes(inbytes);
		expect(res).toEqual(Data.inputBytes1);
	});

	it("should pad for shortening properly", () => {
		const codec = new Codec();
		codec.selectCode("3/4", "1944");
		const bits = Util.bytesToBitsBE(Data.scrambled1);
		const shortened = codec.padForShortening(bits);
		const res = Util.bitsToBytesBE(shortened);
		expect(res).toEqual(Data.shortened1);

	})

	it("should shorten properly", () => {
		const codec = new Codec();
		codec.selectCode("3/4", "1944");
		const bits = Util.bytesToBitsBE(Data.encoded1);
		const shortened = codec.shorten(bits, 816); //from above
		// we need to think the next step
		const punctured = shortened.slice(0, shortened.length - 54);
		const res = Util.bitsToBytesBE(punctured);
		expect(res).toEqual(Data.final1);

	})

	it("should encode correctly", () => {
		const codec = new Codec();
		codec.selectCode("3/4", "1944");
		const bits = codec.encode(Data.inputMessage1);
		// again, we need to know more about puncturing the check bits
		const punctured = bits.slice(0, bits.length - 54);
		const bytes = Util.bitsToBytesBE(punctured);
		expect(bytes).toEqual(Data.final1);
	});

	xit("should encode a string without exceptions", () => {
		const codec = new Codec();
		codec.selectCode("1/2", "648");
		const plain = "quick brown fox";
		expect(() => codec.encodeString(plain)).not.toThrow();
	});

});