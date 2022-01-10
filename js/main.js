const cubieLength = 0.1;
const n = 3;

let camera, scene, renderer;

//Materials
let white, yellow, green, blue, red, orange;

let meshes = [];

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
	white = new THREE.MeshBasicMaterial({ color: 0xfff, vertexColors: true,});
	yellow = new THREE.MeshBasicMaterial({ color: 0xf7eb00, vertexColors: true,});
	green = new THREE.MeshBasicMaterial({ color: 0x3cf02b, vertexColors: true, });
	blue = new THREE.MeshBasicMaterial({ color: 0x0004f2, vertexColors: true, });
	red = new THREE.MeshBasicMaterial({ color: 0xc7170a, vertexColors: true, });
	orange = new THREE.MeshBasicMaterial({ color: 0xde852c, vertexColors: true, });


	//Apply settings to renderer and create canvas
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);
}

function animation(time) {
	//Apply all the changes to the scene and then render
	renderer.render(scene, camera);
}

init();

//returns meshes of the cubie as an array of planes
function createCubie() {
	let cubieMeshes = [];
	let yellowPlane = new THREE.PlaneGeometry(cubieLength, cubieLength);
	cubieMeshes.push(new THREE.Mesh(yellowPlane, yellow));
	return cubieMeshes;
}
