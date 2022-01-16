const n = 3;
const cubieLength = 0.4 / n;

let cube;
let camera, scene, renderer;

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

	for (let i = -Math.floor(n / 2); i < Math.ceil(n / 2); i++) {
		for (let j = -Math.floor(n / 2); j < Math.ceil(n / 2); j++) {
			for (let k = -Math.floor(n / 2); k < Math.ceil(n / 2); k++) {
				let cubie = new Cubie(i, j, k, cubieLength);
				cube.add(cubie.mesh);
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

init();

let turning = true;
let counter = 0;
let speed = 0.01;

let oldCube = [
	{ j: 1, k: -1 },
	{ j: 1, k: 0 },
	{ j: 1, k: 1 },
	{ j: 0, k: 1 },
	{ j: -1, k: 1 },
	{ j: -1, k: 0 },
	{ j: -1, k: -1 },
	{ j: 0, k: -1 },
];

function animation(time) {
	// cube.rotation.z += 0.01;
	cube.rotation.y += 0.01;
	// cube.rotation.x += 0.01;
	if (turning) {
		//L
		for (let child of cube.children) {
			if (child.i == -1) {
				child.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2));
			}
		}
		for (let child of cube.children) {
			if (child.i == -1) {
				if (child.j==0^child.k==0) {
					if (child.j==0) {
						child.j = child.k;
						child.k = 0;
					} else {
						child.k = -child.j;
						child.j = 0;
					}
				} if (child.j==0&&child.k==0) {
					continue;
				} else {
					if (child.j!=child.k) {
						child.k *= -1;
					} else {
						child.j *= -1;
					}
				}
			}
		}
		// //B
		// for (let child of cube.children) {
		// 	if (child.k == -1) {
		// 		child.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
		// 	}
		// }
		//F'
		for (let child of cube.children) {
			if (child.k == 1) {
				child.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
			}
		}

		//needs tuning
		for (let child of cube.children) {
			if (child.k == 1) {
				if (child.j==0^child.i==0) {
					if (child.j==0) {
						child.j = child.i;
						child.i = 0;
					} else {
						child.i = -child.j;
						child.j = 0;
					}
				} if (child.j==0&&child.i==0) {
					continue;
				} else {
					if (child.j!=child.i) {
						child.i *= -1;
					} else {
						child.j *= -1;
					}
				}
			}
		}

		// // D
		// for (let child of cube.children) {
		// 	if (child.j == -1) {
		// 		child.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2));
		// 	}
		// }

		/////////////////////////////////////////////////////////////////////////

		// for (let child of cube.children) {
		// 	if (child.k == 1) {
		// 		child.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 2));
		// 	}
		// }
		turning = false;
	}
	renderer.render(scene, camera);
}

function arrayRotate(arr, reverse) {
	if (reverse) {
		arr.unshift(arr.pop());
		arr.unshift(arr.pop());
	} else {
		arr.push(arr.shift());
		arr.push(arr.shift());
	}
	return arr;
}
