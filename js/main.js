const cubieLength = 0.1;
const n = 3;

let camera, scene, renderer;

//Materials
let white, yellow, green, blue, red, orange;

let cube;

function init() {
	//Initialie camera and scene
	camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		0.01,
		10
	);
	camera.position.z = 1;
	scene = new THREE.Scene();

	//Do stuff here
	//Initializing materials
	white = new THREE.MeshBasicMaterial({ color: 0xfff });
	yellow = new THREE.MeshBasicMaterial({ color: 0xf7eb00 });
	green = new THREE.MeshBasicMaterial({ color: 0x3cf02b });
	blue = new THREE.MeshBasicMaterial({ color: 0x0004f2 });
	red = new THREE.MeshBasicMaterial({ color: 0xc7170a });
	orange = new THREE.MeshBasicMaterial({ color: 0xde852c });

	let qb = new THREE.BoxGeometry(cubieLength, cubieLength, cubieLength);
	cube = new THREE.Group();

	for (let i = -1; i < n - 1; i++) {
		for (let j = -1; j < n - 1; j++) {
			for (let k = -1; k < n - 1; k++) {
				let cubie;
				if ((i+1) % 2 == 1) {
					if ((j+1) % 2 == 0) {
						cubie = new THREE.Mesh(qb, (k+1) % 2 == 0 ? green : red);
					} else {
						cubie = new THREE.Mesh(qb, (k+1) % 2 == 0 ? red : green);
					}
				} else {
					if ((j+1) % 2 == 0) {
						cubie = new THREE.Mesh(qb, (k+1) % 2 == 0 ? red : green);
					} else {
						cubie = new THREE.Mesh(qb, (k+1) % 2 == 0 ? green : red);
					}
				}
				cubie.position.set(i * cubieLength, j * cubieLength, k * cubieLength);
				cube.add(cubie);
			}
		}
	}

	scene.add(cube);
	cube.rotation.x += 1;

	//Apply settings to renderer and create canvas
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);
}

function animation(time) {
	//Apply all the changes to the scene and then render
	cube.rotation.y += 0.02;
	renderer.render(scene, camera);
}

init();

//returns a Group of planes that make up a cube with the correct colors
function createCubie() {
	let cubieMeshes = new THREE.Group();
	//Add planes here
	return cubieMeshes;
}
