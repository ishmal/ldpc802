
import { CodeTable } from "./codetable";
import { Crc32 } from "./crc32";
import { LdpcDecoder } from "./ldpcDecoder";
import { LdpcEncoder } from "./ldpcEncoder";
import { Util } from "./util";


/**
 * Utility to make coding and decoding easy
 */
export class LdpcCodec {
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
			throw new Error(`setRate: rate '${rateStr}' not found`);
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
			throw new Error(`setLength: length '${lengthStr}' not found`);
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
		const padLength = this.code.messageBits - len;
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
		const N = this.code.N
		let pad = N - mlen;
		if (pad < 0) {
			throw new Error(`decode: message too long: ${mlen} > ${N}`);
		}
		const parityBits = N - this.code.messageBits;
		const actualBits = mlen - parityBits;
		const front = message.slice(0, actualBits);
		const back = message.slice(actualBits);
		const padBits = new Array(pad).fill(0);
		const padded = front.concat(padBits).concat(back);
		const decoded = this.decoder.decode(padded);
		if (decoded === null) {
			throw new Error("decode: decode failed");
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
				throw new Error("decode: crc failed");
			}
		}
		return bytes;
	}

	decodeText(message) {
		const bytes = this.decode(message);
		return Util.bytesToString(bytes);
	}

}
