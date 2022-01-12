const cubieLength = 0.1;
const n = 3;

let camera, scene, renderer;

//Materials
let white, yellow, green, blue, red, orange;
let border;

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
	white = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide,
	});
	yellow = new THREE.MeshBasicMaterial({
		color: 0xf7eb00,
		side: THREE.DoubleSide,
	});
	green = new THREE.MeshBasicMaterial({
		color: 0x3cf02b,
		side: THREE.DoubleSide,
	});
	blue = new THREE.MeshBasicMaterial({
		color: 0x0004f2,
		side: THREE.DoubleSide,
	});
	red = new THREE.MeshBasicMaterial({
		color: 0xc7170a,
		side: THREE.DoubleSide,
	});
	orange = new THREE.MeshBasicMaterial({
		color: 0xde852c,
		side: THREE.DoubleSide,
	});

	border = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });

	cube = new THREE.Group();

	for (let i = -1; i < n - 1; i++) {
		for (let j = -1; j < n - 1; j++) {
			for (let k = -1; k < n - 1; k++) {
				let cubie = createCubie();
				cubie.position.set(i * cubieLength, j * cubieLength, k * cubieLength);
				cube.add(cubie);
			}
		}
	}

	// cube.add(createCubie())

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
	cube.rotation.z += 0.02;
	renderer.render(scene, camera);
}

init();

function createCubiePlane(
	translateX,
	translateY,
	translateZ,
	rotateX,
	rotateY,
	rotateZ,
	color
) {
	let borderGeometry;
	let wireframe;
	let plane = new THREE.PlaneGeometry(cubieLength, cubieLength);
	plane.rotateX(rotateX);
	plane.rotateY(rotateY);
	plane.rotateZ(rotateZ);
	plane.translate(translateX, translateY, translateZ);

	let planeMesh = new THREE.Mesh(plane, color);
	borderGeometry = new THREE.EdgesGeometry(planeMesh.geometry);
	wireframe = new THREE.LineSegments(borderGeometry, border);
	wireframe.renderOrder = 1;
	planeMesh.add(wireframe);
	return planeMesh;
}

//returns a Group of planes that make up a cube with the correct colors
function createCubie() {
	let cubieMeshes = new THREE.Group();

	//front
	cubieMeshes.add(
		createCubiePlane(0, 0, cubieLength / 2, 0, 0, 0, green)
	);

	// back
	cubieMeshes.add(
		createCubiePlane(0, 0, -cubieLength / 2, 0, 0, 0, blue)
		);

	// //up
	cubieMeshes.add(
		createCubiePlane(0, cubieLength / 2, 0, Math.PI / 2, 0, 0, white)
	);

	// //down
	cubieMeshes.add(
		createCubiePlane(0, -cubieLength / 2, 0, Math.PI / 2, 0, 0, yellow)
	);

	//left
	cubieMeshes.add(
		createCubiePlane(cubieLength / 2, 0, 0, 0, Math.PI / 2, 0, orange)
	);

	//right
	cubieMeshes.add(
		createCubiePlane(-cubieLength / 2, 0, 0, 0, Math.PI / 2, 0, red)
	);

	return cubieMeshes;
}
