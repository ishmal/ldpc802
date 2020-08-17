
import { CodeTable } from "../src/codeTable";
import { LdpcEncoder } from "../src/ldpcEncoder";
import { Util } from "../src/util";
import { Data } from "./testdata";

describe("LDPC Encoder", () => {
	it("should construct without throwing", () => {
		expect(() => new CodeTable()).not.toThrow();
	})

	it("should encode properly", () => {
		const table = new CodeTable();
		const codes = table.codes;
		const code = codes["3/4"]["1944"];
		const enc = new LdpcEncoder(code);
		const outBits = enc.encodeBytes(Data.shortened1);
		const check = Util.multiplySparse(code.H, outBits);
		check.forEach(b => expect(b).toEqual(0));
		const res = Util.bitsToBytesBE(outBits);
		const exp = Data.encoded1;
		expect(res).toEqual(exp);
	});
});