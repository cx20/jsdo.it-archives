// forked from cx20's "[WebGL] three.js + Oimo.js を試してみるテスト" http://jsdo.it/cx20/ugwW
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/dutP
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/kwGs
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/d11S
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;
var meshGround;
var meshCube;
var world;
var body;
var trackball;

function initCannon() {
    // Setup our world
    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // Materials
    var groundMaterial = new CANNON.Material("groundMaterial");
    
    // Adjust constraint equation parameters for ground/ground contact
    var ground_ground_cm = new CANNON.ContactMaterial(groundMaterial, groundMaterial, {
        friction: 0.5,
        restitution: 0.1,
    });
    
    world.addContactMaterial(ground_ground_cm);
    
    // Create a plane
    var groundBody = new CANNON.Body({
        mass: 0, // mass == 0 makes the body static
        position: new CANNON.Vec3(0, -40-5, 0),
        material: groundMaterial
    });
    var groundShape = new CANNON.Box(new CANNON.Vec3(100, 1, 100));
    groundBody.addShape(groundShape);
    world.addBody(groundBody);

    // Create a box
    shape = new CANNON.Box(new CANNON.Vec3(50, 50, 50));
    body = new CANNON.Body({
        mass: 100, // kg
        position: new CANNON.Vec3(0, 100, 0), // m
        shape: shape,
        material: groundMaterial
    });
    //body.angularVelocity.set(0, 0.1, 0.2); 
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 1), Math.PI * 10/180);
    world.addBody(body);
}

function initThree() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 50;
    camera.position.z = 200;
    scene = new THREE.Scene();

    var loader = new THREE.TextureLoader();
    var texture = loader.load('../../assets/A/k/w/j/AkwjW.jpg');  // frog.jpg

    var material = new THREE.MeshBasicMaterial({map: texture});
    var geometryGround = new THREE.BoxGeometry(200, 2, 200);
    meshGround = new THREE.Mesh(geometryGround, material);
    meshGround.position.y = -20;
    scene.add(meshGround);

    var geometryCube = new THREE.BoxGeometry(50, 50, 50);
    meshCube = new THREE.Mesh(geometryCube, material);
    meshCube.rigidBody = body; // THREE.Object3D#rigidBody has a field of CANNON.RigidBody
    scene.add(meshCube);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    trackball = new THREE.TrackballControls(camera);
}

function animate() {
    trackball.update();
    requestAnimationFrame(animate);
    updatePhysics();
    render();
}

function updatePhysics() {
    world.step(1/30);

    meshCube.position.x = body.position.x;
    meshCube.position.y = body.position.y;
    meshCube.position.z = body.position.z;
    meshCube.quaternion.x = body.quaternion.x;
    meshCube.quaternion.y = body.quaternion.y;
    meshCube.quaternion.z = body.quaternion.z;
    meshCube.quaternion.w = body.quaternion.w;
}

function render() {
    renderer.render(scene, camera);
}

initCannon();
initThree();
animate();
