const { CodeTable, LdpcEncoder, Util } = require("../dist/ldpc802");
const { expect } = require('chai');
const Data = require("./testdata");

describe("LDPC Encoder", () => {
	it("should construct without throwing", () => {
		expect(() => new CodeTable()).to.not.throw();
	})

	it("should encode properly", () => {
		const table = new CodeTable();
		const codes = table.codes;
		const code = codes["3/4"]["1944"];
		const enc = new LdpcEncoder(code);
		const outBits = enc.encodeBytes(Data.shortened1);
		const check = Util.multiplySparse(code.H, outBits);
		check.forEach(b => expect(b).to.equal(0));
		const res = Util.bitsToBytesBE(outBits);
		const exp = Data.encoded1;
		expect(res).to.deep.equal(exp);
	});
});