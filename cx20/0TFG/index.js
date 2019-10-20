// forked from cx20's "Three.js + Cannon.js でドミノっぽくドット絵を作るテスト（その２）（改）" http://jsdo.it/cx20/QESy
// forked from cx20's "Three.js + Cannon.js でドミノっぽくドット絵を作るテスト（その２）（失敗）" http://jsdo.it/cx20/CeNf
// forked from cx20's "Three.js + Cannon.js でドミノっぽくドット絵を作るテスト" http://jsdo.it/cx20/qM1k
// forked from cx20's "Three.js + Cannon.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/59Ij
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

//var TIME_STEP = 1 / 60;
var TIME_STEP = 1 / 30;
var VIEW_ANGLE = 60;
var N = 256;
var world, scene, renderer, rendererElement;
var camera1, camera2;
var loader;
var controls;

//////////////////////////////////////////////
//./cannon.js-0.4.3/src/math/Vec3.js
//////////////////////////////////////////////
/**
 * @method tangents
 * @memberof CANNON.Vec3
 * @brief Compute two artificial tangents to the vector
 * @param CANNON.Vec3 t1 Vector object to save the first tangent in
 * @param CANNON.Vec3 t2 Vector object to save the second tangent in
 */
/*
CANNON.Vec3.prototype.tangents = function(t1,t2){
  var norm = this.norm();
  if(norm>0.0){
    var n = new CANNON.Vec3(this.x/norm,
                this.y/norm,
                this.z/norm);
    if(n.x<0.9){
      var rand = Math.random();
      n.cross(new CANNON.Vec3(rand,0.0000001,0).unit(),t1);
    } else
      n.cross(new CANNON.Vec3(0.0000001,rand,0).unit(),t1);
    n.cross(t1,t2);
  } else {
    // The normal length is zero, make something up
    t1.set(1,0,0).normalize();
    t2.set(0,1,0).normalize();
  }
};
*/


//////////////////////////////////////////////
//./cannon.js-0.6.2/src/math/Vec3.js + modified
//////////////////////////////////////////////
/**
 * @method tangents
 * @memberof CANNON.Vec3
 * @brief Compute two artificial tangents to the vector
 * @param CANNON.Vec3 t1 Vector object to save the first tangent in
 * @param CANNON.Vec3 t2 Vector object to save the second tangent in
 */
var Vec3_tangents_n = new CANNON.Vec3();
var Vec3_tangents_randVec = new CANNON.Vec3();
CANNON.Vec3.prototype.tangents = function(t1,t2){
    var norm = this.norm();
    if(norm>0.0){
        var n = Vec3_tangents_n;
        var inorm = 1/norm;
        n.set(this.x*inorm,this.y*inorm,this.z*inorm);
        var randVec = Vec3_tangents_randVec;
        if(Math.abs(n.x) < 0.9){
            randVec.set(1,0,0);
            n.cross(randVec,t1);
        } else {
            //randVec.set(0,1,0);
            randVec.set(0,0,0); // 1→0 に変更
            n.cross(randVec,t1);
        }
        n.cross(t1,t2);
    } else {
        // The normal length is zero, make something up
        t1.set(1, 0, 0);
        t2.set(0, 1, 0);
    }
};

function init() {
    loader = new THREE.TextureLoader();
    var parentElement = document.body;

    // initialize cannon.js's world
    world = new CANNON.World();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // initialize three.js's scene, camera and renderer
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false; // ２画面表示させる場合、これが必要
    
    parentElement.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    // camera1
    camera1 = new THREE.PerspectiveCamera(VIEW_ANGLE, (window.innerWidth/2) / window.innerHeight, 0.1, 1000);
    camera1.position.x = 4;
    camera1.position.y = 5;
    camera1.position.z = 20;
    camera1.lookAt(new THREE.Vector3(0, 0, 0));

    // camera2
    camera2 = new THREE.PerspectiveCamera(VIEW_ANGLE, (window.innerWidth/2) / window.innerHeight, 0.1, 1000);
    camera2.position.x = 0;
    camera2.position.y = 25;
    camera2.position.z = 0;
    camera2.lookAt(new THREE.Vector3(0, 0, 0));

    controls = new THREE.OrbitControls(camera1, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp = Math.PI * 0.38;
    controls.autoRotate = true; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0; //自動回転する時の速度

    initLights();
    initGround();

    //createShapes();
    createDominos();
    
    createShapes();
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
    var groundBody = new CANNON.Body({mass: 0});
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.add(groundBody);

    // initialize Object3D
    var plane = createPlane(100, 100);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    scene.add(plane);
}

function createPlane(w, h) {
    //var texture = loader.load("grass.jpg"); // grass.jpg
    var texture = loader.load("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
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
    shape = new CANNON.Sphere(w);
    body = new CANNON.Body({mass: mass});
    body.addShape(shape);
    body.position.x = x + Math.random()/10;
    body.position.y = y + Math.random()/10;
    body.position.z = z + Math.random()/10;
    body.quaternion.set(Math.random()/50, Math.random()/50, Math.random()/50, 0.2);
    world.add(body);

    // initialize Object3D
    //var texture = loader.load('Football.png')  // Football.png
    var texture = loader.load('../../assets/s/s/X/x/ssXxc.png')  // Football.png
    geometry = new THREE.SphereGeometry(w, 10, 10);
    material = new THREE.MeshLambertMaterial({
        color: Math.round(color),
        map: texture
    });
    mesh = new THREE.Mesh(geometry, material);
    //mesh.useQuaternion = true;
    mesh.rigidBody = body; // THREE.Object3D#rigidBody has a field of CANNON.RigidBody
    scene.add(mesh);
}

function createDomino(x, y, z, w, h, d, mass, color) {
    var geometry, material, mesh, shape, body;

    // initialize rigid body
    shape = new CANNON.Box(new CANNON.Vec3(w/2, h/2, d/2));
    body = new CANNON.Body({mass: mass});
    body.addShape(shape);
    body.position.x = x;
    body.position.y = y;
    body.position.z = z;
    world.add(body);

    // initialize Object3D
    geometry = new THREE.CubeGeometry(w, h, d);
    material = new THREE.MeshLambertMaterial({
        color: Math.round(color)
    });
    mesh = new THREE.Mesh(geometry, material);
    //mesh.useQuaternion = true;
    mesh.rigidBody = body; // THREE.Object3D#rigidBody has a field of CANNON.RigidBody
    scene.add(mesh);
}

function createDominos() {
    var box_size = 1;
    for ( var y = 0; y < 16; y++ ) {
        for ( var x = 0; x < 16; x++ ) {
            var x1 = -8 + x * box_size * 0.95;
            var y1 = box_size * 2;
            var z1 = -8 + y * box_size * 1.2;
            var color = getRgbColor( dataSet[y * 16 + x] );
            createDomino(x1, y1, z1, 0.2, 1, 1, 1, color);
        }
    }
}

function createShapes() {
    var box_size = 1;
    for ( var y = 0; y < 16; y++ ) {
        var x1 = -8.5;
        var y1 = 3;
        var z1 = -8 + (15 - y) * box_size * 1.2;
        var color = getRgbColor("白");
        createShape(x1, y1, z1, box_size/2, box_size/2, box_size/2, 1, color);
    }
}

function animate() {
    // step physical simulation
    world.step(TIME_STEP);

    // position graphical object on physical object recursively
    (function updateObject3D(mesh) {
        if (mesh.rigidBody) {
            mesh.position.x = mesh.rigidBody.position.x;
            mesh.position.y = mesh.rigidBody.position.y;
            mesh.position.z = mesh.rigidBody.position.z;
            mesh.quaternion.x = mesh.rigidBody.quaternion.x;
            mesh.quaternion.y = mesh.rigidBody.quaternion.y;
            mesh.quaternion.z = mesh.rigidBody.quaternion.z;
            mesh.quaternion.w = mesh.rigidBody.quaternion.w;
        }
        if (mesh.children) {
            mesh.children.map(updateObject3D);
        }
    })(scene);

    controls.update();

    // render graphical object
    renderer.setViewport(0, 0, window.innerWidth/2, window.innerHeight );
    renderer.render(scene, camera1);

    renderer.setViewport( window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight );
    renderer.render(scene, camera2);

    // request next frame
    requestAnimationFrame(animate);
}

init();
animate();
