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
	logScramble(sequence)
	for (let i = 0; i < sequence.length; i += 2) {
		applyTurn(sequence[i], sequence[i + 1]);
	}
}

let turning = true;
let appliedTurn = false;
let currentMove = 0;

let currentAngle = 0;
let lastAngle = 0;
let speed = 3; // in degrees

function animation(time) {
	// cube.rotation.y += 0.005;

	renderer.render(scene, camera);
}

init();

function applyTurn(turn, direction) {
	let dir = scrambleDirection(direction).dir;
	let turns = scrambleDirection(direction).turns;
	switch (turn) {
		case "R":
			I(1, -dir, turns);
			break;
		case "M":
			I(0, dir, turns);
			break;
		case "L":
			I(-1, dir, turns);
			break;
		case "U":
			J(1, -dir, turns);
			break;
		case "E":
			J(0, dir, turns);
			break;
		case "D":
			J(-1, dir, turns);
			break;
		case "F":
			K(1, -dir, turns);
			break;
		case "S":
			K(0, -dir, turns);
			break;
		case "B":
			K(-1, dir, turns);
			break;
	}
}

//L M R'
function I(slice, direction = 1, turns = 1) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2) || turns < 0) {
		console.error(`There is no ${slice} slice here.`);
	} else {
		for (let child of cube.children) {
			if (child.i == slice) {
				child.applyMatrix4(
					new THREE.Matrix4().makeRotationX((turns * direction * Math.PI) / 2)
				);
			}
		}
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

//U' E D
function J(slice, direction = 1, turns = 1) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2) || turns < 0) {
		console.error(`Error: Invalid input`);
	} else {
		for (let child of cube.children) {
			if (child.j == slice) {
				child.applyMatrix4(
					new THREE.Matrix4().makeRotationY((turns * direction * Math.PI) / 2)
				);
			}
		}

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

//B S' F'
function K(slice, direction = 1, turns = 1) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2) || turns < 0) {
		console.error(`Error: Invalid ipnut`);
	} else {
		for (let child of cube.children) {
			if (child.k == slice) {
				child.applyMatrix4(
					new THREE.Matrix4().makeRotationZ((turns * direction * Math.PI) / 2)
				);
			}
		}
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
