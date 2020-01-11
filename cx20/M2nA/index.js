// forked from cx20's "Three.js + GLTFLoader v2 + 物理演算を試してみるテスト（改）" http://jsdo.it/cx20/M7WC
// forked from cx20's "Three.js + GLTFLoader v2 + 物理演算を試してみるテスト（失敗）" http://jsdo.it/cx20/QwSL
// forked from cx20's "立方体をドット絵に変えて物理演算してみるテスト（その４改）" http://jsdo.it/cx20/ix0o
// forked from cx20's "立方体をドット絵に変えて物理演算してみるテスト（その４）（失敗）" http://jsdo.it/cx20/ndqP
// forked from cx20's "立方体をドット絵に変えて物理演算してみるテスト（その３）" http://jsdo.it/cx20/ytCS
// forked from cx20's "立方体をドット絵に変えて物理演算してみるテスト（その２）" http://jsdo.it/cx20/5zhB
// forked from cx20's "立方体をドット絵に変えて物理演算してみるテスト" http://jsdo.it/cx20/8PIy
// forked from edo_m18's "CANNON.jsを使って3Dに物理演算を持ち込む" http://jsdo.it/edo_m18/7aIg

'use strict';

var gltf = null;
var world, shape, body, ground, timeStep = 1 / 60,
    camera, scene, renderer, duck, plane,
    cubeSize = 1;

var wireframeCube;
var trackball;

var cubeSizeX = 16/16*5;
var cubeSizeY = 16/16*5;
var cubeSizeZ = 9/16*5;

function createCube(w, h, d) {
    var geometry = new THREE.CubeGeometry(w, h, d, 10, 10);
    var material = new THREE.MeshLambertMaterial({
        color: 0x666666
    });
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

function createWireframeCube(w, h, d) {
    var materialColor = 0x00ff00;
    var geometry = new THREE.CubeGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial({
        color: materialColor,
        wireframe:true
    });
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

function loadDuck() {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    var texture = new THREE.Texture();
    
    var objLoader = new THREE.GLTFLoader();
    objLoader.setCrossOrigin( 'anonymous' );
    var url =  'https://rawcdn.githack.com/cx20/gltf-test/5465cc37/sampleModels/Duck/glTF/Duck.gltf';
    objLoader.load(url, function ( data ) {
        gltf = data;
        var object = gltf.scene;
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
		        child.translateY(child.position.y - 100);
            }
        } );
        object.scale.set( 5, 5, 5 );
        duck = object;

        var axis = new THREE.AxisHelper(1000);   
        duck.add(axis);
        duck.castShadow = true;
        duck.receiveShadow = true;
        scene.add(duck);

        animate();
    });
}

function createPlane(w, h) {
    var geometry = new THREE.PlaneGeometry(w, h);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xeeeeee,
        shininess: 50
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -5;

    return mesh;
}

function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    world.solver.tolerance = 0.1;

    var plane = new CANNON.Plane();

    var groundShape = new CANNON.Plane(new CANNON.Vec3(0, 1, 0));
    var groundBody = new CANNON.Body({mass: 0});
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    groundBody.position.y = -5;
    world.add(groundBody);

    shape = new CANNON.Box(new CANNON.Vec3(cubeSizeX, cubeSizeY, cubeSizeZ));
    var mass = 1;
    body = new CANNON.Body({mass: mass});
    body.position.y = 20;
    body.angularVelocity.set(0, 0, 3.5);
    body.angularDamping = 0.1;
    body.addShape(shape);
    world.add(body);
}

function initThree() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    camera = new THREE.PerspectiveCamera(30, w / h, 1, 10000);
    camera.position.set(20, 3, 20 );

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 200);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 1);

    var light = new THREE.DirectionalLight(0xffffff, 2);
    var amb   = new THREE.AmbientLight(0x404040);
    var d = 10;

    light.position.set(d, d, -d);

    loadDuck();
    plane = createPlane(300, 300);
    plane.rotation.x = -Math.PI / 2;

    wireframeCube = createWireframeCube(cubeSizeX*2, cubeSizeY*2, cubeSizeZ*2);
    
    scene.add(camera);
    scene.add(light);
    scene.add(amb);

    scene.add(plane);
    scene.add(wireframeCube);

    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    trackball = new THREE.TrackballControls(camera);
}

function animate() {
    trackball.update();
    requestAnimationFrame(animate);
    updatePhysics();
    render();
}

function updatePhysics() {
    world.step(timeStep);

    duck.position.x = body.position.x;
    duck.position.y = body.position.y;
    duck.position.z = body.position.z;
    duck.quaternion.x = body.quaternion.x;
    duck.quaternion.y = body.quaternion.y;
    duck.quaternion.z = body.quaternion.z;
    duck.quaternion.w = body.quaternion.w;
    wireframeCube.position.x = body.position.x;
    wireframeCube.position.y = body.position.y;
    wireframeCube.position.z = body.position.z;
    wireframeCube.quaternion.x = body.quaternion.x;
    wireframeCube.quaternion.y = body.quaternion.y;
    wireframeCube.quaternion.z = body.quaternion.z;
    wireframeCube.quaternion.w = body.quaternion.w;
}

function render() {
    renderer.render(scene, camera);
}

initCannon();
initThree();

document.addEventListener('click', function () {
    body.applyImpulse(new CANNON.Vec3(0, 5, 0), body.position);
}, false);
