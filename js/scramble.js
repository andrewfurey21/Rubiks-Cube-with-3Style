//Can only use two sides per axis, scrambles will never include wide moves or slices
function scramble(length) {
	let moves = [
		["R", "L"],
		["U", "D"],
		["F", "B"],
	];

	let additions = [" ", "' ", "2 "];

	let scramble = "";
	let pastMoves = [];
	let lastAxis;
    let lastSide;
    //lastSide is for later, to fix the scramble program for allowing two sides of the same axis to appear next to each other
    //without making the scrambles redundant.
	for (let i = 0; i < length; i++) {
		let axis = Math.floor(Math.random() * moves.length);
        let side = Math.floor(Math.random() * moves[axis].length);

        if (i > 0) {
			if (lastAxis != axis) {
				scramble += moves[axis][side] + additions[Math.floor(Math.random() * additions.length)];
				pastMoves.push(moves[side]);
                lastSide = side;
			} else i--;
		} else {
			scramble += moves[axis][side] + additions[Math.floor(Math.random() * additions.length)];
			pastMoves.push(moves[side]);
            lastSide = side;
		}
		lastAxis = axis;

	}
	return scramble;
}

