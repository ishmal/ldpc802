/* jshint esversion: 6 */
import { codes80211n } from "./ldpc802.11";

export class CodeTable {
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


