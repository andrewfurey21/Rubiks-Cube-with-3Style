const n = 3;
const cubieLength = 0.4 / n;

let cube;

let camera, scene, renderer;

let counter = 0;

let sequence;

function init() {
	camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		0.01,
		10
	);

	camera.position.z = 1;
	scene = new THREE.Scene();
	cube = new THREE.Group();

	loop1: for (let i = -Math.floor(n / 2); i < Math.ceil(n / 2); i++) {
		for (let j = -Math.floor(n / 2); j < Math.ceil(n / 2); j++) {
			for (let k = -Math.floor(n / 2); k < Math.ceil(n / 2); k++) {
				let cubie = createCubie(i, j, k, cubieLength);
				cube.add(cubie);
			}
		}
	}

	scene.add(cube);
	cube.rotation.y = Math.PI / 4;
	cube.rotation.x = Math.PI / 4;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);

	sequence = scramble(20);
	logScramble(sequence);
}

//Related to turning and animating cube
let turning = true;
let appliedTurn = false;
let currentMove = 0;

let currentAngle = 0;
let lastAngle = 0;
let speed = 4.5; // in degrees

function animation(time) {
	cube.rotation.y += .01;


	if (currentMove >= sequence.length) {
		turning = false;
	}
	if (turning) {

		if (!appliedTurn) {
			appliedTurn = true;
			applyTurn(
				sequence[currentMove],
				sequence[currentMove + 1],
				currentAngle,
				true
			);
			currentAngle = 0;
		} else if (currentAngle >= Math.PI / 2) {
			appliedTurn = false;
			currentAngle = 0;

			currentMove += 2;
		} else {
			applyTurn(
				sequence[currentMove],
				sequence[currentMove + 1],
				currentAngle,
				false
			);
		}
		currentAngle += (speed * Math.PI) / 180;
	}

	renderer.render(scene, camera);
}

init();

function applyTurn(turn, direction, currentAngle, turning) {
	let dir = scrambleDirection(direction).dir;
	let turns = scrambleDirection(direction).turns;
	switch (turn) {
		case "R":
			I(1, -dir, turns, -dir * currentAngle, turning);
			break;
		case "M":
			I(0, dir, turns, dir * currentAngle, turning);
			break;
		case "L":
			I(-1, dir, turns, dir * currentAngle, turning);
			break;
		case "U":
			J(1, -dir, turns, -dir * currentAngle, turning);
			break;
		case "E":
			J(0, dir, turns, dir * currentAngle, turning);
			break;
		case "D":
			J(-1, dir, turns, dir * currentAngle, turning);
			break;
		case "F":
			K(1, -dir, turns, -dir * currentAngle, turning);
			break;
		case "S":
			K(0, -dir, turns, -dir * currentAngle, turning);
			break;
		case "B":
			K(-1, dir, turns, dir * currentAngle, turning);
			break;
	}
}

//L M R'
function I(slice, direction, turns, currentAngle, turning) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2) || turns < 0) {
		console.error(`There is no ${slice} slice here.`);
	} else {
		let goal = (turns * direction * Math.PI) / 2;
		if (Math.abs(goal) >= Math.abs(turns * direction * currentAngle)) {
			for (let child of cube.children) {
				if (child.i == slice) {
					child.applyMatrix4(
						new THREE.Matrix4().makeRotationX(
							(turns * direction * speed * Math.PI) / 180
						)
					);
				}
			}
		}
		if (turning) {
			for (let i = 1; i <= turns; i++) {
				for (let child of cube.children) {
					if (child.i == slice) {
						if ((child.j == 0) ^ (child.k == 0)) {
							if (child.j == 0) {
								child.j = -child.k * direction;
								child.k = 0;
							} else {
								child.k = child.j * direction;
								child.j = 0;
							}
						} else if (child.j == 0 && child.k == 0) {
							continue;
						} else {
							if (child.j != child.k) {
								child.k *= -direction;
								child.j *= direction;
							} else {
								child.j *= -direction;
								child.k *= direction;
							}
						}
					}
				}
			}
		}
	}
}

//U' E D
function J(slice, direction = 1, turns = 1, currentAngle, turning) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2) || turns < 0) {
		console.error(`Error: Invalid input`);
	} else {
		let goal = (turns * direction * Math.PI) / 2;
		if (Math.abs(goal) > Math.abs(turns * direction * currentAngle)) {
			for (let child of cube.children) {
				if (child.j == slice) {
					child.applyMatrix4(
						new THREE.Matrix4().makeRotationY(
							(turns * direction * speed * Math.PI) / 180
						)
					);
				}
			}
		}
		if (turning) {
			for (let i = 1; i <= turns; i++) {
				for (let child of cube.children) {
					if (child.j == slice) {
						if ((child.k == 0) ^ (child.i == 0)) {
							if (child.k == 0) {
								child.k = -child.i * direction;
								child.i = 0;
							} else {
								child.i = child.k * direction;
								child.k = 0;
							}
						} else if (child.k == 0 && child.i == 0) {
							continue;
						} else {
							if (child.k != child.i) {
								child.i *= -direction;
								child.k *= direction;
							} else {
								child.k *= -direction;
								child.i *= direction;
							}
						}
					}
				}
			}
		}
	}
}

//B S' F'
function K(slice, direction = 1, turns = 1, currentAngle, turning) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2) || turns < 0) {
		console.error(`Error: Invalid ipnut`);
	} else {
		let goal = (turns * direction * Math.PI) / 2;
		if (Math.abs(goal) >= Math.abs(turns * direction * currentAngle)) {
			for (let child of cube.children) {
				if (child.k == slice) {
					child.applyMatrix4(
						new THREE.Matrix4().makeRotationZ(
							(turns * direction * speed * Math.PI) / 180
						)
					);
				}
			}
		}
		if (turning) {
			for (let i = 1; i <= turns; i++) {
				for (let child of cube.children) {
					if (child.k == slice) {
						if ((child.j == 0) ^ (child.i == 0)) {
							if (child.j == 0) {
								child.j = child.i * direction;
								child.i = 0;
							} else {
								child.i = -child.j * direction;
								child.j = 0;
							}
						} else if (child.j == 0 && child.i == 0) {
							continue;
						} else {
							if (child.j != child.i) {
								child.j *= -direction;
								child.i *= direction;
							} else {
								child.i *= -direction;
								child.j *= direction;
							}
						}
					}
				}
			}
		}
	}
}
