// forked from cx20's "Three.js + cannon.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/7Zay
// forked from cx20's "Stats.js で cannon.js の FPS を計測してみるテスト" http://jsdo.it/cx20/nEVns
// forked from Kon's "俺のキャノン砲を試してみるかい？" http://jsdo.it/Kon/1ksj

"use strict";

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

var TIME_STEP = 1 / 30;
var SCREEN_WIDTH = 465;
var SCREEN_HEIGHT = 465;
var VIEW_ANGLE = 60;
var N = 256;
var world, camera, scene, renderer, rendererElement;
//var stats;
    

function init() {
    // Stats
/*
    stats = new Stats();

    // 左上に設定
    stats.getDomElement().style.position = "fixed";
    stats.getDomElement().style.left = "0px";
    stats.getDomElement().style.top = "0px";
    document.body.appendChild(stats.getDomElement());
*/
    var parentElement = document.body;

    // initialize cannon.js's world
    world = new CANNON.World();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // initialize three.js's scene, camera and renderer
    if (isWebgl()) {
        renderer = new THREE.WebGLRenderer();
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    parentElement.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 1000);
    camera.position.x = 8;
    camera.position.y = 20;
    camera.position.z = 25;
    camera.lookAt(new THREE.Vector3(0, 10, 0));

    initLights();
    initGround();

    createShapes();
}


function isWebgl() {
    try {
        return !!window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');
    } catch (e) {
        return false;
    }
}

// initialize lights
function initLights() {
    var directionalLight, ambientLight;
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0.4, 1, 0.3);
    scene.add(directionalLight);
    ambientLight = new THREE.AmbientLight(0x101020);
    scene.add(ambientLight);
}

// ground
function initGround() {
    var groundShape = new CANNON.Plane(new CANNON.Vec3(0, 1, 0));
    var groundBody = new CANNON.RigidBody(0, groundShape);
    world.add(groundBody);

    // initialize Object3D
    var plane = createPlane(100, 100);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    scene.add(plane);
}

function createPlane(w, h) {
    var texture = THREE.ImageUtils.loadTexture("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
    texture.wrapS   = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 10, 10 );  
    var material = new THREE.MeshLambertMaterial( { color: 0x777777, map: texture } );
    var geometry = new THREE.PlaneGeometry( w, h );
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

// create a shape
function createShape(x, y, z, w, h, d, mass, color) {
    var geometry, material, mesh, shape, body;

    // initialize rigid body
    //shape = new CANNON.Box(new CANNON.Vec3(w, h, d));
    shape = new CANNON.Sphere(w);
    body = new CANNON.RigidBody(mass, shape);
    //body.angularVelocity.set(0, 10, 0);
    body.position.x = x + Math.random()/10;
    body.position.y = y + Math.random()/10;
    body.position.z = z + Math.random()/10;
    body.quaternion.set(Math.random()/50, Math.random()/50, Math.random()/50, 0.2);
    world.add(body);

    // initialize Object3D
    var texture = THREE.ImageUtils.loadTexture('../../assets/s/s/X/x/ssXxc.png')  // Football.png
    geometry = new THREE.SphereGeometry(w, 10, 10);
    material = new THREE.MeshLambertMaterial({
        color: Math.round(color),
        map: texture
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.useQuaternion = true;
    mesh.rigidBody = body; // THREE.Object3D#rigidBody has a field of CANNON.RigidBody
    scene.add(mesh);
}


// sphere
function createShapes() {
    var box_size = 0.7;
    for ( var y = 0; y < 16; y++ ) {
        for ( var x = 0; x < 16; x++ ) {
            var x1 = -15 + x * box_size * 2.5;
            var y1 = (15 - y) * box_size * 3.0;
            var z1 = 0;
            var color = getRgbColor( dataSet[y * 16 + x] );
            createShape(x1, y1, z1, box_size, box_size, box_size, 1, color);
        }
    }
}

function animate() {
    // step physical simulation
    world.step(TIME_STEP);

    // position graphical object on physical object recursively
    (function updateObject3D(obj3d) {
        if (obj3d.rigidBody) {
            obj3d.rigidBody.position.copy(obj3d.position);
            obj3d.rigidBody.quaternion.copy(obj3d.quaternion);
        }
        if (obj3d.children) {
            obj3d.children.map(updateObject3D);
        }
    })(scene);

    // render graphical object
    renderer.render(scene, camera);

/*
    // stats 更新
    stats.update();
*/
    // request next frame
    requestAnimationFrame(animate);
}

init();
animate();
