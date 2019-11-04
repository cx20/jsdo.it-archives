// forked from cx20's "[WebGL] three.js + OimoPhysics.js でドット絵を落下させてみるテスト（調整中）" http://jsdo.it/cx20/qEmv
// forked from cx20's "[WebGL] three.js + OimoPhysics.js を試してみるテスト" http://jsdo.it/cx20/mJhp
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

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":0xDCAA6B,    // 段ボール色
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
    return colorHash[ c ];
}

function initOimo() {
    world = new OIMO.World();
    world.gravity = new OIMO.Vec3(0, -9.80665, 0);
    
    var groundShapec = new OIMO.ShapeConfig();
    groundShapec.geometry = new OIMO.BoxGeometry(new OIMO.Vec3(25, 1, 25));
    var groundBodyc = new OIMO.RigidBodyConfig();
    groundBodyc.type = OIMO.RigidBodyType.STATIC;
    groundBodyc.position = new OIMO.Vec3(0, -5, 0);
    var groundBody = new OIMO.RigidBody(groundBodyc);
    groundBody.addShape(new OIMO.Shape(groundShapec));
    world.addRigidBody(groundBody);
}

function initThree() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 50;
    scene = new THREE.Scene();

    var loader = new THREE.TextureLoader();
    var texture = loader.load('../../assets/u/y/G/y/uyGy9.jpg');  // grass.jpg

    var material = new THREE.MeshBasicMaterial({map: texture});
    var geometryGround = new THREE.BoxGeometry(50, 2, 50);
    meshGround = new THREE.Mesh(geometryGround, material);
    meshGround.position.y = -5; // -20;
    scene.add(meshGround);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    trackball = new THREE.TrackballControls(camera);
}

// initialize lights
function initLights() {
    var directionalLight, ambientLight;
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0.2, 0.5, 0.3);
    scene.add(directionalLight);
    ambientLight = new THREE.AmbientLight(0x101020);
    scene.add(ambientLight);
}

// create a shape
function createShape(x, y, z, w, h, d, mass, color) {
    var geometry, material, mesh, shape;
    // initialize rigid body
    var shapec = new OIMO.ShapeConfig();
    shapec.geometry = new OIMO.SphereGeometry(w/2);
    var bodyc = new OIMO.RigidBodyConfig();
    bodyc.type = OIMO.RigidBodyType.DYNAMIC;
    bodyc.position.x = x + Math.random()/10;
    bodyc.position.y = y + Math.random()/10;
    bodyc.position.z = z + Math.random()/10;
    var body = new OIMO.RigidBody(bodyc);
    //body.setRotationXyz(new OIMO.Vec3(Math.PI*Math.random()*10/180, Math.PI*Math.random()*10/180, Math.PI*Math.random()*10/180));
    body.addShape(new OIMO.Shape(shapec));
    world.addRigidBody(body);

    // initialize Object3D
 
    var loader = new THREE.TextureLoader();
    var texture = loader.load('../../assets/s/s/X/x/ssXxc.png');  // Football.png
    material = new THREE.MeshBasicMaterial({color: Math.round(color), map: texture});
    geometry = new THREE.SphereGeometry(w/2, 36, 36);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rigidBody = body;
    scene.add(mesh);
}


// sphere
function createShapes() {
    var box_size = 1.0;
    for ( var y = 0; y < 16; y++ ) {
        for ( var x = 0; x < 16; x++ ) {
            var x1 = -15 + x * box_size * 1.2 + 5;
            var y1 = (15 - y) * box_size * 1.2 + 10;
            var z1 = 0;
            var color = getRgbColor( dataSet[y * 16 + x] );
            createShape(x1, y1, z1, box_size, box_size, box_size, 1, color);
        }
    }
}

function animate() {
    trackball.update();
    requestAnimationFrame(animate);
    updatePhysics();
    render();
}

function updatePhysics() {
    world.step(1/30);

    // position graphical object on physical object recursively
    (function updateObject3D(mesh) {
        if (mesh.rigidBody) {
            mesh.position.x = mesh.rigidBody.getPosition().x;
            mesh.position.y = mesh.rigidBody.getPosition().y;
            mesh.position.z = mesh.rigidBody.getPosition().z;
            mesh.quaternion.x = mesh.rigidBody.getOrientation().x;
            mesh.quaternion.y = mesh.rigidBody.getOrientation().y;
            mesh.quaternion.z = mesh.rigidBody.getOrientation().z;
            mesh.quaternion.w = mesh.rigidBody.getOrientation().w;
        }
        if (mesh.children) {
            mesh.children.map(updateObject3D);
        }
    })(scene);
}

function render() {
    renderer.render(scene, camera);
}

initOimo();
initThree();
initLights();
createShapes();
animate();
