const n = 3;
const cubieLength = 0.4 / n;

let cube;

let camera, scene, renderer;

let turning = true;
let counter = 0;
let speed = 0.01;

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
}

function animation(time) {
	cube.rotation.y += 0.005;

	if (turning) {

		// I(-1); //L
		// I(0); //M
		// I(1); //R'

		// J(-1); //D
		// J(0); //E
		// J(1); //U'

		// K(-1); // B
		// K(0); // S'
		// K(1); //F'

		turning = false;
	}
	renderer.render(scene, camera);
}

init();

//LMR
function I(slice) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2)) {
		console.error(`There is no ${slice} slice here.`);
	} else {
		//R'
		for (let child of cube.children) {
			if (child.i == slice) {
				child.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2));
			}
		}

		for (let child of cube.children) {
			if (child.i == slice) {
				if ((child.j == 0) ^ (child.k == 0)) {
					if (child.j == 0) {
						child.j = -child.k;
						child.k = 0;
					} else {
						child.k = child.j;
						child.j = 0;
					}
				} else if (child.j == 0 && child.k == 0) {
					continue;
				} else {
					if (child.j != child.k) {
						child.k *= -1;
					} else {
						child.j *= -1;
					}
				}
			}
		}
	}
}

//UED
function J(slice) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2)) {
		console.error(`There is no ${slice} slice here.`);
	} else {
		for (let child of cube.children) {
			if (child.j == slice) {
				child.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
			}
		}

		for (let child of cube.children) {
			if (child.j == slice) {
				if ((child.k == 0) ^ (child.i == 0)) {
					if (child.k == 0) {
						child.k = -child.i;
						child.i = 0;
					} else {
						child.i = child.k;
						child.k = 0;
					}
				} else if (child.k == 0 && child.i == 0) {
					continue;
				} else {
					if (child.k != child.i) {
						child.i *= -1;
					} else {
						child.k *= -1;
					}
				}
			}
		}
	}
}

//BSF
function K(slice) {
	if (slice > Math.floor(n / 2) || slice < Math.floor(-n / 2)) {
		console.error(`There is no ${slice} slice here.`);
	} else {
		for (let child of cube.children) {
			if (child.k == slice) {
				child.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
			}
		}

		for (let child of cube.children) {
			if (child.k == slice) {
				if ((child.j == 0) ^ (child.i == 0)) {
					if (child.j == 0) {
						child.j = child.i;
						child.i = 0;
					} else {
						child.i = -child.j;
						child.j = 0;
					}
				} else if (child.j == 0 && child.i == 0) {
					continue;
				} else {
					if (child.j != child.i) {
						child.j *= -1;
					} else {
						child.i *= -1;
					}
				}
			}
		}
	}
}
