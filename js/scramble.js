//Can only use two sides per axis, scrambles will never include wide moves or slices

let moves = [
	["R", "L", "M", "r", "l"],
	["U", "D", "E", "u", "d"],
	["F", "B", "S", "f", "b"],
];


let movesSet = new Set();
for (let i = 0; i < moves.length; i++) {
	for (let j = 0; j < moves[i].length; j++) {
		movesSet.add(moves[i][j]);
	}
}

let additions = [" ", "' ", "2 "];

function scramble(length) {
	let scramble = [];
	let pastMoves = [];
	let lastAxis;
	let lastSide;

	for (let i = 0; i < length; i++) {
		let axis = Math.floor(Math.random() * moves.length);
		let side = Math.floor(Math.random() * (moves[axis].length-3));

		if (i > 0) {
			if (lastAxis != axis) {
				scramble.push(moves[axis][side]);
				scramble.push(additions[Math.floor(Math.random() * additions.length)]);
			} else i--;
		} else {
			scramble.push(moves[axis][side]);
			scramble.push(additions[Math.floor(Math.random() * additions.length)]);
		}
		lastAxis = axis;
	}
	return scramble;
}

function logScramble(scramble) {
	let s = "";
	for (let i = 0; i < scramble.length; i++) {
		s += scramble[i];
	}
	console.log(s);
	return s;
}

function scrambleDirection(direction) {
	if (direction==additions[0]) {
		return {dir:1, turns:1};
	} else if (direction==additions[1]) {
		return {dir:-1, turns:1};
	} else if (direction==additions[2]) {
		return {dir:1, turns:2};
	}
}

//input a string from comm sheets, output array with correct notation
function parseAlg(alg) {
	let output = [];
	for (let i = 0; i < alg.length; i++) {
		if (movesSet.has(alg.charAt(i))) {
			output.push(alg.charAt(i));
			output.push((alg.charAt(i+1)=="'" || alg.charAt(i+1)=="2"?alg.charAt(i+1):" "));
		} else if (alg.charAt(i)==":") {
			let current= []
			for (let j = 0; j < output.length; j++) {
				current.push(output[j]);
			}
			let first = [];
			let second = [];
			for (let j = i+1; j < alg.length; j++) {
				if (movesSet.has(alg.charAt(j))) {
					first.push(alg.charAt(j));
					first.push((alg.charAt(j+1)=="'" || alg.charAt(j+1)=="2"?alg.charAt(j+1):" "));
				} else if (alg.charAt(j)==",") {
					for (let k = j+1; k < alg.length; k++) {
						if (movesSet.has(alg.charAt(k))) {
							second.push(alg.charAt(k));
							second.push((alg.charAt(k+1)=="'" || alg.charAt(k+1)=="2"?alg.charAt(k+1):" "));
						}  else if (alg.charAt(k)=="]") {

							i = alg.length;
							k = alg.length;
							j = alg.length;
						}
					}
				}
			}
		}
	}
	return output;
}

