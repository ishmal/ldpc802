/* jshint esversion: 6 */


/**
 * Various common utilities we needs among several modules
 */
export class Util {

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
