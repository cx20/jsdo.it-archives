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

function initOimo() {
    world = new OIMO.World();
    world.gravity = new OIMO.Vec3(0, -9.80665, 0);
    
    var groundShapec = new OIMO.ShapeConfig();
    groundShapec.geometry = new OIMO.BoxGeometry(new OIMO.Vec3(100, 1, 100));
    var groundBodyc = new OIMO.RigidBodyConfig();
    groundBodyc.type = OIMO.RigidBodyType.STATIC;
    groundBodyc.position = new OIMO.Vec3(0, -20, 0);
    var groundBody = new OIMO.RigidBody(groundBodyc);
    groundBody.addShape(new OIMO.Shape(groundShapec));
    world.addRigidBody(groundBody);
    
    var shapec = new OIMO.ShapeConfig();
    shapec.geometry = new OIMO.BoxGeometry(new OIMO.Vec3(25, 25, 25));
    var bodyc = new OIMO.RigidBodyConfig();
    bodyc.type = OIMO.RigidBodyType.DYNAMIC;
    bodyc.position = new OIMO.Vec3(0, 100, 0);
    body = new OIMO.RigidBody(bodyc);
    body.setRotationXyz(new OIMO.Vec3(Math.PI*10/180, 0, Math.PI*10/180));
    body.addShape(new OIMO.Shape(shapec));
    world.addRigidBody(body);
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

    meshCube.position.x = body.getPosition().x;
    meshCube.position.y = body.getPosition().y;
    meshCube.position.z = body.getPosition().z;
    meshCube.quaternion.x = body.getOrientation().x;
    meshCube.quaternion.y = body.getOrientation().y;
    meshCube.quaternion.z = body.getOrientation().z;
    meshCube.quaternion.w = body.getOrientation().w;
}

function render() {
    renderer.render(scene, camera);
}

initOimo();
initThree();
animate();
