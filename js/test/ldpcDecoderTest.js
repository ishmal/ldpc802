import { CodeTable, LdpcDecoder, LdpcEncoder } from "../dist/ldpc802.js";
import { expect } from 'chai';

import { variance } from "mathjs";

/*
0 1 0 1 1 0 0 1
1 1 1 0 0 1 0 0
0 0 1 0 0 1 1 1
1 0 0 1 1 0 1 0
*/

const code = {
	M: 4,
	N: 8,
	H: [
		[1, 3, 4, 7],
		[0, 1, 2, 5],
		[2, 5, 6, 7],
		[0, 3, 4, 6]
	]
};

describe("LDPC Decoder", () => {

	const makeMessage = (size) => {
		const msg = [];
		for (let i = 0; i < size; i++) {
			const toss = Math.random();
			msg[i] = toss > 0.5 ? 1 : 0;
		}
		return msg;
	};

	const makeSignal = (array) => {
		return array.map(x => x < 0.5 ? 1 : -1);
	};

	const addErrors = (message, nrBits) => {
		const arr = message.slice();
		const len = arr.length;
		for (let i = 0; i < nrBits; i++) {
			let index = (Math.random() * len) | 0; //make sure it is an int
			arr[i] = arr[index] ^ 1;
		}
		return arr;
	};

	const addNoise = (message, level) => {
		const out = [];
		const len = message.length;
		for (let i = 0; i < len; i++) {
			const noise = (Math.random() - 0.5) * level;
			out[i] = message[i] + noise;
		}
		return out;
	};

	it("should construct without exception", () => {
		expect(() => new LdpcDecoder(code)).to.not.throw;
	});

	it("should calculate variance properly", () => {
		const rawmsg = makeMessage(1000);
		const msg = addNoise(rawmsg, 0.1);
		const res = LdpcDecoder.calcVariance(msg);
		const exp = variance(msg);
		expect(res).to.be.closeTo(exp, 7);
	});

	it("should create tanner tables", () => {
		const dec = new LdpcDecoder(code);
		expect(dec.code).to.equal(code);
		expect(dec.checkNodes).to.exist;
		expect(dec.variableNodes).to.exist;
	});

	it("should have all unique check table references", () => {
		//checks that we have no duplicate references
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		const dec = new LdpcDecoder(code);
		const checkNodeSet = new Set(dec.checkNodes);
		expect(checkNodeSet.size).to.equal(code.M);
		const variableNodeSet = new Set(dec.variableNodes);
		expect(variableNodeSet.size).to.equal(code.N);
	});

	it("should decode what the encoder encodes", () => {
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		const msg = makeMessage(code.messageBits);
		const enc = new LdpcEncoder(code);
		const codeword = enc.encode(msg);
		expect(codeword.length).to.equal(code.N);
		const dec = new LdpcDecoder(code);
		const signal = makeSignal(codeword);
		const res = dec.decode(signal);
		expect(res).to.deep.equal(msg);
	});

	it("should decode with noise added", () => {
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		const msg = makeMessage(code.messageBits);
		const enc = new LdpcEncoder(code);
		const codeword = enc.encode(msg);
		expect(codeword.length).to.equal(code.N);
		const signal = makeSignal(codeword);
		const received = addNoise(signal, 0.1);
		const dec = new LdpcDecoder(code);
		const res = dec.decode(received);
		expect(res).to.deep.equal(msg);
	});

	it("should decode with errors added", () => {
		const table = new CodeTable();
		const code = table.codes["1/2"]["648"];
		const msg = makeMessage(code.messageBits);
		const enc = new LdpcEncoder(code);
		const codeword = enc.encode(msg);
		expect(codeword.length).to.equal(code.N);
		const withErrors = addErrors(codeword, 8);
		const signal = makeSignal(withErrors);
		const received = addNoise(signal, 0.1);
		const dec = new LdpcDecoder(code);
		const res = dec.decode(received);
		expect(res).to.deep.equal(msg);
	});
});