import { CodeTable } from "./codetable";
import { Crc32 } from "./crc32";
import { LdpcDecoder } from "./ldpcDecoder";
import { LdpcEncoder } from "./ldpcEncoder";
import { Util } from "./util";

/**
 * Methods supporting the 802.11 data packet
 */
export class Codec {

	constructor() {
		this.codes = new CodeTable().codes;
		this.code = null;
		this.ldpcEncoder = null;
		this.ldpcDecoder = null;
		this.scrambleBits = [];
		this.scrambleIdx = 0;
		this.generateScrambler(0x5d);
		this.selectCode("1/2", "648");
	}

	/**
	 * Select rate and length of code
	 * @param {string} rateStr the rate from the tables
	 * @param {string} lenStr the length from the tables
	 */
	selectCode(rateStr, lengthStr) {
		const rate = this.codes[rateStr];
		const code = rate ? rate[lengthStr] : undefined;
		if (!code) {
			throw new Error(`encoder: code ${rateStr}/${lengthStr} not found`);
		}
		this.code = code;
		this.ldpcEncoder = new LdpcEncoder(code);
		this.ldpcDecoder = new LdpcDecoder(code);
	}

	generateScrambler(initial) {
		const x = Util.byteToBitsBE(initial).slice(1).reverse();
		const arr = [];
		for (let i = 0; i < 127; i++) {
			const x7 = x[0];
			const x4 = x[3];
			const out = x7 ^ x4;
			x.shift();
			x.push(out);
			arr.push(out);
		}
		this.scrambleBits = arr;
		this.scrambleIdx = 0;
		return arr;
	}


	/**
	 * Take an array of integers calculate their CRC32 checksum, and append
	 * the result to the end.
	 * @param {array} bytes the array of bytes to seal with a checksum
	 * @return {array} array 'wrapped' with a crc on the end as 4 bytes
	 */
	wrapBytes(bytes) {
		const checksum = Crc32.ofBytes(bytes);
		const checksumBytes = Crc32.intToBytesLE(checksum);
		const obytes = bytes.concat(checksumBytes);
		return obytes;
	}

	/**
	 * Assume array length is multiple of 8
	 * @param {array} bits 
	 */
	scramble(bits) {
		const scrambleBits = this.scrambleBits;
		let idx = this.scrambleIdx;
		const out = [];
		for (let i = 0, len = bits.length; i < len; i += 8) {
			out[i] = bits[i + 7] ^ scrambleBits[idx];
			idx = (idx + 1) % 127;
			out[i + 1] = bits[i + 6] ^ scrambleBits[idx];
			idx = (idx + 1) % 127;
			out[i + 2] = bits[i + 5] ^ scrambleBits[idx];
			idx = (idx + 1) % 127;
			out[i + 3] = bits[i + 4] ^ scrambleBits[idx];
			idx = (idx + 1) % 127;
			out[i + 4] = bits[i + 3] ^ scrambleBits[idx];
			idx = (idx + 1) % 127;
			out[i + 5] = bits[i + 2] ^ scrambleBits[idx];
			idx = (idx + 1) % 127;
			out[i + 6] = bits[i + 1] ^ scrambleBits[idx];
			idx = (idx + 1) % 127;
			out[i + 7] = bits[i] ^ scrambleBits[idx];
			idx = (idx + 1) % 127;
		}
		this.scrambleIdx = idx;
		return out;
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

	/**
	 * Encode an array of bytes with the current LDPC code
	 * TODO: select a length according to the length of the byte array
	 * @param {array} bytes the bytes to encode
	 * @return {array} the encoded bits
	 */
	encode(bytes) {
		if (!this.ldpcEncoder) {
			throw new Error(`ldpcEncoder code has not been selected`);
		}
		/**
		 * Bytes
		 */
		const macHeader = [
			0x04, 0x02, 0x00, 0x2e, 0x00,
			0x60, 0x08, 0xcd, 0x37, 0xa6,
			0x00, 0x20, 0xd6, 0x01, 0x3c,
			0xf1, 0x00, 0x60, 0x08, 0xad,
			0x3b, 0xaf, 0x00, 0x00
		];
		const inputBytes = macHeader.concat(bytes);
		const wrapped = this.wrapBytes(inputBytes);
		const serviceBits = [0, 0];
		const servicePrepended = serviceBits.concat(wrapped);
		/**
		 * Bits
		 */
		const bits = Util.bytesToBitsBE(servicePrepended);
		//assert.deepEqual(bits, Util.bytesToBitsBE(Data.servicePrepended1) );
		//so ar so good.
		this.scrambleIdx = 0;
		const scrambled = this.scramble(bits);
		//assert.deepEqual(scrambled, Util.bytesToBitsBE(Data.scrambled1));
		const shortened = this.padForShortening(scrambled);
		//assert.deepEqual(shortened, Util.bytesToBitsBE(Data.shortened1));
		const encoded = this.ldpcEncoder.encode(shortened);
		let final = this.shorten(encoded, scrambled.length);
		//final = final.slice(0, final.length-54);
		return final;
	}

	/**
	 * Encode a string with the given LDPC code
	 * @param {string} str the string to encode
	 * @return {array} the encoded bits
	 */
	encodeString(str) {
		const bytes = Util.stringToBytes(str);
		return this.encode(bytes);
	}

	/**
	 * Decode an array of LDPC-encoded bits with the given LDPC code
	 * @param {array} inbits array of bits
	 * @return {array} the output bytes
	 */
	decode(inbits) {
		if (!this.ldpcDecoder) {
			throw new Error(`ldpcDecoder code has not been selected`);
		}
		return this.ldpcDecoder.decode(inbits);
	}

	/** 
	 * Decode an array of LDPC-encoded bits with the given LDPC code
	 * @param {array} inbits array of bits
	 * @param {string} the output string
	 */
	decodeString(inbits) {
		const outbytes = this.decode(inbits);
		const str = Util.bytesToString(outbytes);
		return str;
	}

}

