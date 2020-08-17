
import { Util } from "./util";

const multiplySparse = Util.multiplySparse;
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
export class LdpcEncoder {

	/**
	 * Constructor
	 * @param {object} code the code to use for encoding
	 */
	constructor(code) {
		this.code = code;
	}

	encode(s) {
		// step 1
		const Ast = multiplySparse(this.code.A, s);
		const Cst = multiplySparse(this.code.C, s);
		// step 2
		const TinvAst = substituteSparse(this.code.T, Ast);
		const ETinvAst = multiplySparse(this.code.E, TinvAst);
		// step 3
		const p1 = add(ETinvAst, Cst);
		// step 4
		const Bp1 = multiplySparse(this.code.B, p1);
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
