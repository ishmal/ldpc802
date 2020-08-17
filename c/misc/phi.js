
function phi(x) {
	if (x < -0.9999) {
		return -5.0;
	} else if (x > 0.9999) {
		return 5.0;
	} else {
		return Math.atanh(x);
	}
}

function atanh(x) {
	if (x <= -0.9951) {
		return (x + 0.9914) / 0.0012;
	} else if (x <= -0.9217) {
		return (x + 0.8378) / 0.0524;
	} else if (x <= -0.6640) {
		return (x + 0.4064) / 0.322;
	} else if (x <= 0.6640) {
		return x / 0.83;
	} else if (x <= 0.9217) {
		return (x - 0.4064) / 0.322;
	} else if (x <= 0.9951) {
		return (x - 0.8378) / 0.0524;
	} else {
		return (x - 0.9914) / 0.0012;
	}
}


for (let x = -1; x <= 1; x += 0.0001) {
	console.log(x, atanh(x));
}

