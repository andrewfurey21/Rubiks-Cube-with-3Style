const n = 3;
const cubieLength = 0.4 / n;

let cube;

let camera, scene, renderer;

let turning = true;
let counter = 0;
let speed = 5; // in degrees

let sequence;

let currentAngle = 0;

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

	//Apply settings to renderer and create canvas
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);

	sequence = scramble(20);
}

function animation(time) {
	cube.rotation.y += 0.005;

	if (turning) {
		// currentAngle += speed;

		// I(-1); //L
		// I(0); //M
		// I(1, -1); //R

		// J(-1, -1); //D'
		// J(0); //E
		// J(1); //U'

		// K(-1, -1); // B'
		// K(0); // S'
		// K(1); // F'

		turning = false;
	}
	renderer.render(scene, camera);
}

init();

//L M R'
function I(slice, direction = 1) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2)) {
		console.error(`There is no ${slice} slice here.`);
	} else {
		for (let child of cube.children) {
			if (child.i == slice) {
				child.applyMatrix4(new THREE.Matrix4().makeRotationX(direction*Math.PI / 2));
			}
		}

		for (let child of cube.children) {
			if (child.i == slice) {
				if ((child.j == 0) ^ (child.k == 0)) {
					if (child.j == 0) {
						child.j = -child.k*direction;
						child.k = 0;
					} else {
						child.k = child.j*direction;
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

//U' E D
function J(slice, direction=1) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2)) {
		console.error(`There is no ${slice} slice here.`);
	} else {
		for (let child of cube.children) {
			if (child.j == slice) {
				child.applyMatrix4(new THREE.Matrix4().makeRotationY(direction*Math.PI / 2));
			}
		}

		for (let child of cube.children) {
			if (child.j == slice) {
				if ((child.k == 0) ^ (child.i == 0)) {
					if (child.k == 0) {
						child.k = -child.i*direction;
						child.i = 0;
					} else {
						child.i = child.k*direction;
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

//B S' F'
function K(slice, direction=1) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2)) {
		console.error(`There is no ${slice} slice here.`);
	} else {
		for (let child of cube.children) {
			if (child.k == slice) {
				child.applyMatrix4(new THREE.Matrix4().makeRotationZ(direction*Math.PI / 2));
			}
		}

		for (let child of cube.children) {
			if (child.k == slice) {
				if ((child.j == 0) ^ (child.i == 0)) {
					if (child.j == 0) {
						child.j = child.i*direction;
						child.i = 0;
					} else {
						child.i = -child.j*direction;
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
