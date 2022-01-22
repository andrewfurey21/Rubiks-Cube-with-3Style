//Can only use two sides per axis, scrambles will never include wide moves or slices

let moves = [
	["R", "L"],
	["U", "D"],
	["F", "B"],
];

let additions = [" ", "' ", "2 "];

function scramble(length) {
	let scramble = [];
	let pastMoves = [];
	let lastAxis;
	let lastSide;

	for (let i = 0; i < length; i++) {
		let axis = Math.floor(Math.random() * moves.length);
		let side = Math.floor(Math.random() * moves[axis].length);

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

