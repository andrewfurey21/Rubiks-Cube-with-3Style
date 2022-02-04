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

let additions = [" ", "'", "2"];

function scramble(length) {
	let scramble = [];
	let pastMoves = [];
	let lastAxis;
	let lastSide;

	for (let i = 0; i < length; i++) {
		let axis = Math.floor(Math.random() * moves.length);
		let side = Math.floor(Math.random() * (moves[axis].length - 3));

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
		s += scramble[i] + (scramble[i] == "2" || scramble[i] == "'" ? " " : "");
	}
	console.log(s);
	return s;
}

function scrambleDirection(direction) {
	if (direction == additions[0]) {
		return { dir: 1, turns: 1 };
	} else if (direction == additions[1]) {
		return { dir: -1, turns: 1 };
	} else if (direction == additions[2]) {
		return { dir: 1, turns: 2 };
	}
}

function parseAlg(alg) {
	let finishedOutput = [];
	let setupArray = [];
	let first = [];
	let second = [];
	let setup = true;
	let comm = false;
	let twice = false;
	for (let i = 0; i < alg.length; i++) {
		if (alg.charAt(i) == ")" && alg.charAt(i + 1) == "2") {
			twice = true;
		} else if (alg.charAt(i) == ":") {
			setup = false;
		} else if (alg.charAt(i) == ",") {
			setup = false;
			comm = true;
		} else if (movesSet.has(alg.charAt(i))) {
			if (setup) {
				setupArray.push(alg.charAt(i));
				setupArray.push(
					alg.charAt(i + 1) == "'" || alg.charAt(i + 1) == "2"
						? alg.charAt(i + 1)
						: " "
				);
			} else if (!comm) {
				first.push(alg.charAt(i));
				first.push(
					alg.charAt(i + 1) == "'" || alg.charAt(i + 1) == "2"
						? alg.charAt(i + 1)
						: " "
				);
			} else {
				second.push(alg.charAt(i));
				second.push(
					alg.charAt(i + 1) == "'" || alg.charAt(i + 1) == "2"
						? alg.charAt(i + 1)
						: " "
				);
			}
		}
	}

	if (setup) {
		let m = 1;
		if (twice) m = 2;
		for (let i = 0; i < setupArray.length * m; i++) {
			finishedOutput.push(setupArray[i % setupArray.length]);
		}
	} else if (first.length==0) {
		//there were no setup moves
		for (let i = 0; i < setupArray.length; i++) {
			finishedOutput.push(setupArray[i]);
		}
		for (let i = 0; i < second.length; i++) {
			finishedOutput.push(second[i]);
		}
		for (let i = setupArray.length-2; i >= 0; i-=2) {
			finishedOutput.push(setupArray[i]);
			finishedOutput.push(oppositeTurn(setupArray[i+1]));
		}
		for (let i = second.length-2; i >= 0; i-=2) {
			finishedOutput.push(second[i]);
			finishedOutput.push(oppositeTurn(second[i+1]));
		}
	} else {
		//normal alg
		for (let i = 0; i < setupArray.length; i++) {
			finishedOutput.push(setupArray[i]);
		}
		for (let i = 0; i < first.length; i++) {
			finishedOutput.push(first[i]);
		}
		for (let i = 0; i < second.length; i++) {
			finishedOutput.push(second[i]);
		}
		for (let i = first.length-2; i >= 0; i-=2) {
			finishedOutput.push(first[i]);
			finishedOutput.push(oppositeTurn(first[i+1]));
		}
		for (let i = second.length-2; i >= 0; i-=2) {
			finishedOutput.push(second[i]);
			finishedOutput.push(oppositeTurn(second[i+1]));
		}
		for (let i = setupArray.length-2; i >= 0; i-=2) {
			finishedOutput.push(setupArray[i]);
			finishedOutput.push(oppositeTurn(setupArray[i+1]));
		}
	}
	return finishedOutput;
}

function oppositeTurn(direction) {
	if (direction=="'") return " ";
	else if (direction==" ") return "'";
	else return "2";
}
