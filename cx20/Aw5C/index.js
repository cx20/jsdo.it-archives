// forked from cx20's "Three.js で木星の第二衛星エウロパを表示させてみるテスト" http://jsdo.it/cx20/I10X
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
    var seaGeometry = new THREE.SphereGeometry(98, 30, 30);
    var mantleGeometry = new THREE.SphereGeometry(85, 30, 30);
    var coreGeometry = new THREE.SphereGeometry(40, 30, 30);

    var textureLoader = new THREE.TextureLoader();
    var surfaceTexture = textureLoader.load('../../assets/y/D/5/I/yD5Is.jpg'); // nasa_europa_1024x512.jpg
    var seaTexture = textureLoader.load('../../assets/c/j/W/7/cjW7w.png'); // sea.jpg
    var mantleTexture = textureLoader.load('../../assets/A/r/o/W/AroWN.jpg'); // lava.jpg
    var coreTexture = textureLoader.load('../../assets/w/p/t/b/wptbw.png'); // core.png

    var surfaceMaterial = new THREE.MeshPhongMaterial({
        //shading: THREE.FlatShading
        shading: THREE.SmoothShading,
        map: surfaceTexture,
        shininess: 0
    });

    var seaMaterial = new THREE.MeshPhongMaterial({
        //shading: THREE.FlatShading
        shading: THREE.SmoothShading,
        map: seaTexture,
        shininess: 0
    });

    var mantleMaterial = new THREE.MeshPhongMaterial({
        //shading: THREE.FlatShading
        shading: THREE.SmoothShading,
        map: mantleTexture,
        shininess: 0
    });

    var coreMaterial = new THREE.MeshPhongMaterial({
        //shading: THREE.FlatShading
        shading: THREE.SmoothShading,
        map: coreTexture,
        shininess: 0,
        bumpMap: coreTexture,
        bumpScale: 2.0
    });

    var surfaceMesh = new THREE.Mesh( surfaceGeometry );
    var surfaceBSP = new ThreeBSP( surfaceMesh );
    var seaMesh = new THREE.Mesh( seaGeometry );
    var seaBSP = new ThreeBSP( seaMesh );
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

    var cube3Geometry = new THREE.CubeGeometry( 199.8, 199.8, 199.8 );
    var cube3Mesh = new THREE.Mesh( cube3Geometry );
    cube3Mesh.position.y += 100;
    cube3Mesh.position.x += 100;
    cube3Mesh.position.z += 100;
    var cube3BSP = new ThreeBSP( cube3Mesh );

    // 惑星表面 … ○ - □
    var newBSP = surfaceBSP.subtract( cubeBSP );
    surface = newBSP.toMesh( surfaceMaterial );

    // 内部海 … ○ - □
    var newBSP2 = seaBSP.subtract( cube2BSP );
    sea = newBSP2.toMesh( seaMaterial );
    
    // マントル … ○ - □
    var newBSP3 = mantleBSP.subtract( cube3BSP );
    mantle = newBSP3.toMesh( mantleMaterial );
    
    // 核       … o
    core = new THREE.Mesh(coreGeometry, coreMaterial);

    io.add(surface);
    io.add(sea);
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
