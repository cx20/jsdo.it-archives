// forked from cx20's "Three.js でイオの内部構造を表示させてみるテスト" http://jsdo.it/cx20/cj5m
// forked from cx20's "Three.js で木星の衛星イオを表示させてみるテスト" http://jsdo.it/cx20/G8Fl
// forked from cx20's "Three.js で木星を表示させてみるテスト" http://jsdo.it/cx20/k68D
// forked from cx20's "Three.js で火星を表示させてみるテスト" http://jsdo.it/cx20/AFvB
// forked from cx20's "Three.js で地球を表示させてみるテスト" http://jsdo.it/cx20/78Dn
// forked from cx20's "Three.js で月を表示させてみるテスト" http://jsdo.it/cx20/vcVy
// forked from cx20's "Three.js で冥王星を表示させてみるテスト" http://jsdo.it/cx20/tenj
// forked from cx20's "Three.js で地球を回してみるテスト" http://jsdo.it/cx20/tv0T

var container;
var camera;
var scene;
var io;
var surface;
var mantle;
var core;
var renderer;
var light;
var light2;
var controls;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 20;
    camera.position.z = 400;
    
    io = new THREE.Object3D();

    scene = new THREE.Scene();

    light = new THREE.PointLight(0xffffff, 1);
    light.position.set(100, 100, 500);
    light2 = new THREE.PointLight(0xffffff, 1);
    light2.position.set(-200, 200, -500);
    scene.add(light);
    scene.add(light2);
    var surfaceGeometry = new THREE.SphereGeometry(100, 30, 30);
    var mantleGeometry = new THREE.SphereGeometry(98, 30, 30);
    var coreGeometry = new THREE.SphereGeometry(50, 30, 30);

    var surfaceTexture = THREE.ImageUtils.loadTexture('../../assets/q/Y/Q/E/qYQEm.jpg'); // io_rgb_cyl.jpg
    var surfaceMaterial = new THREE.MeshPhongMaterial({
        map: surfaceTexture,
        shininess: 0
    });

    var mantleTexture = THREE.ImageUtils.loadTexture('../../assets/c/C/I/q/cCIqn.jpg'); // io.jpg
    var mantleMaterial = new THREE.MeshPhongMaterial({
        map: mantleTexture,
        shininess: 0
    });

    var coreTexture = THREE.ImageUtils.loadTexture("../../assets/g/I/9/t/gI9tJ.png"); // core.png
    var coreMaterial = new THREE.MeshPhongMaterial({
        map: coreTexture,
        shininess: 0,
        bumpMap: coreTexture,
        bumpScale: 2.0
    });

    var surfaceMesh = new THREE.Mesh( surfaceGeometry );
    var surfaceBSP = new ThreeBSP( surfaceMesh );
    var mantleMesh = new THREE.Mesh( mantleGeometry );
    var mantleBSP = new ThreeBSP( mantleMesh );
    var coreMesh = new THREE.Mesh( coreGeometry );
    var coreBSP = new ThreeBSP( coreMesh );

    var cubeGeometry = new THREE.CubeGeometry( 200, 200, 200 );
    var cubeMesh = new THREE.Mesh( cubeGeometry );
    cubeMesh.position.y += 100;
    cubeMesh.position.x += 100;
    cubeMesh.position.z += 100;
    var cubeBSP = new ThreeBSP( cubeMesh );

    var cube2Geometry = new THREE.CubeGeometry( 199.9, 199.9, 199.9 );
    var cube2Mesh = new THREE.Mesh( cube2Geometry );
    cube2Mesh.position.y += 100;
    cube2Mesh.position.x += 100;
    cube2Mesh.position.z += 100;
    var cube2BSP = new ThreeBSP( cube2Mesh );

    // 惑星表面 … ○ - □
    var newBSP = surfaceBSP.subtract( cubeBSP );
    surface = newBSP.toMesh( surfaceMaterial );

    // マントル … ○ - □
    var newBSP2 = mantleBSP.subtract( cube2BSP );
    mantle = newBSP2.toMesh( mantleMaterial );
    
    // 核       … o
    core = new THREE.Mesh(coreGeometry, coreMaterial);

    io.add(surface);
    io.add(mantle);
    io.add(core);
    scene.add(io);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.4;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 2.0;    //自動回転する時の速度

}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}
