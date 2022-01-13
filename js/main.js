
const n = 3	;
const cubieLength = 0.4/n;

let camera, scene, renderer;

let cube;

//Turns (excluding anticlockwise) UDRLFBudrlfbMSE

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

	cube = new THREE.Group();

	for (let i = -Math.floor(n/2); i < Math.ceil(n/2); i++) {
		for (let j = -Math.floor(n/2); j < Math.ceil(n/2); j++) {
			for (let k = -Math.floor(n/2); k < Math.ceil(n/2); k++) {
				let cubie = new Cubie(i, j, k, cubieLength);
				cube.add(cubie.mesh);
			}
		}
	}

	scene.add(cube);
	cube.rotation.x = 0;
	cube.rotation.y = Math.PI/4;

	//Apply settings to renderer and create canvas
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);
}

function animation(time) {
	//Apply all the changes to the scene and then render
	cube.rotation.y += 0.02;
	cube.rotation.z += 0.02;
	renderer.render(scene, camera);
}

init();

