
const n = 3	;
const cubieLength = 0.4/n;

let cube;
let camera, scene, renderer;


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
	cube.rotation.y = Math.PI/4;
	cube.rotation.x = Math.PI/4;
	
	//Apply settings to renderer and create canvas
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animation);
	document.body.appendChild(renderer.domElement);
}

init();

let turned = false;

//i == M
//j == E
//k == S

function animation(time) {
	//Apply all the changes to the scene and then render
	// cube.rotation.z += 0.02;
	// cube.rotation.y += 0.02;
	// cube.rotation.x += 0.02;
	
	if (!turned) {
		let cubiePositions = [];
		for (let child of cube.children) {
			if (child.i == -1) {
				child.applyMatrix4( new THREE.Matrix4().makeRotationX(Math.PI/2) );
			}
			cubiePositions.push({i:child.i, j:child.j})
			// if (child.i == 0) {
			// 	child.applyMatrix4( new THREE.Matrix4().makeRotationX(Math.PI) );	
			// }
			// if (child.j == 0) {
			// 	child.applyMatrix4( new THREE.Matrix4().makeRotationY(Math.PI) );
			// }
		}
		
		turned = true;
	} 
	renderer.render(scene, camera);
}


