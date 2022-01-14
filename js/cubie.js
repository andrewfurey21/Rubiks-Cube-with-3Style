//Materials
const white = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const yellow = new THREE.MeshBasicMaterial({
    color: 0xf7eb00,
    side: THREE.DoubleSide,
});
const green = new THREE.MeshBasicMaterial({
    color: 0x3cf02b,
    side: THREE.DoubleSide,
});
const blue = new THREE.MeshBasicMaterial({
    color: 0x0004f2,
    side: THREE.DoubleSide,
});
const red = new THREE.MeshBasicMaterial({
    color: 0xc7170a,
    side: THREE.DoubleSide,
});
const orange = new THREE.MeshBasicMaterial({
    color: 0xde852c,
    side: THREE.DoubleSide,
});

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
	let border = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });

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

class Cubie {
    constructor(i, j, k, cubieLength) {
        this.mesh = new THREE.Group(i, j, k);
        this.i = i;
        this.j = j;
        this.k = k;

        //front
        this.mesh.add(
            createCubiePlane(0, 0, cubieLength / 2, 0, 0, 0, green)
        );
    
        // back
        this.mesh.add(
            createCubiePlane(0, 0, -cubieLength / 2, 0, 0, 0, blue)
        );
    
        //up
        this.mesh.add(
            createCubiePlane(0, cubieLength / 2, 0, Math.PI / 2, 0, 0, white)
        );
    
        //down
        this.mesh.add(
            createCubiePlane(0, -cubieLength / 2, 0, Math.PI / 2, 0, 0, yellow)
        );
    
        //left
        this.mesh.add(
            createCubiePlane(cubieLength / 2, 0, 0, 0, Math.PI / 2, 0, red)
        );
    
        //right
        this.mesh.add(
            createCubiePlane(-cubieLength / 2, 0, 0, 0, Math.PI / 2, 0, orange)
        );

        this.mesh.position.set(i * cubieLength, j * cubieLength, k * cubieLength);
    }
}

