
/**
 * Calculates the 'phi' function:
 * phi(x) = log((exp(x) + 1) / (exp(x) - 1))
 */

function calcPhiSlow(x) {
	x = Math.max(x, 1e-10);
	const expx = Math.exp(x);
	const v = Math.log((expx + 1) / (expx - 1));
	return v;
}

const PHI_TABLE_SIZE = 1024;
const PHI_TABLE_RANGE = 7;
const PHI_TABLE_SCALE = PHI_TABLE_SIZE / PHI_TABLE_RANGE;

function makePhiTable() {
	const delta = PHI_TABLE_RANGE / PHI_TABLE_SIZE;
	const table = [];
	let x = delta; //avoid the asymptote
	for (let i = 0; i < PHI_TABLE_SIZE; i++, x+= delta) {
		const v = calcPhiSlow(x);
		table.push(v);
		//console.log(`${x}: ${v}`);
	}
	return table;
}

const phiTable = makePhiTable();

/*
function dumpPhiTable() {
	let buf = "";
	let len = phiTable.length;
	let col = 0;
	for (let i = 0; i < len; i++) {
		const v = phiTable[i];
		buf += " ";
		buf += v.toFixed(4);
		buf += ","
		if (++col >= 16) {
			col = 0;
			buf += "\n";
		}
	}
	console.log(buf);
}
*/

function calcPhiTable(x) {
	if (x >= 7) {
		return 0;
	}
	const idx = (x * PHI_TABLE_SCALE) | 0;
	return phiTable[idx];
}

export const calcPhi = calcPhiTable;



