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
        "無":{r:0xDC,g:0xAA,b:0x6B},    // 段ボール色
        "白":{r:0xff,g:0xff,b:0xff},
        "肌":{r:0xff,g:0xcc,b:0xcc},
        "茶":{r:0x80,g:0x00,b:0x00},
        "赤":{r:0xff,g:0x00,b:0x00},
        "黄":{r:0xff,g:0xff,b:0x00},
        "緑":{r:0x00,g:0xff,b:0x00},
        "水":{r:0x00,g:0xff,b:0xff},
        "青":{r:0x00,g:0x00,b:0xff},
        "紫":{r:0x80,g:0x00,b:0x80}
    };
    return colorHash[ c ];
}

var TIME_STEP = 1 / 30;
var SCREEN_WIDTH = 465;
var SCREEN_HEIGHT = 465;
var VIEW_ANGLE = 60;
var N = 256;

// glboost var
var canvas;
var glBoostContext;
var renderer;
var camera;
var scene;
var meshs = [];
var expression;

// cannon.js var
var world;

function init() {
    // initialize cannon.js's world
    world = new CANNON.World();
    world.gravity.set(0, -10, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    canvas = document.getElementById("world");
    glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
    renderer = glBoostContext.createRenderer({
        clearColor: {
            red: 0.6,
            green: 0.6,
            blue: 0.6,
            alpha: 1
        }
    });
    
    scene = glBoostContext.createScene();

    initCamera();
    initLights();
    initGround();

    createShapes();

    expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();
}

// initialize Camera
function initCamera() {
    camera = glBoostContext.createPerspectiveCamera({
        eye: new GLBoost.Vector3(0.0, 30.0, 50.0),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 100.0
    });
    
    scene.addChild(camera);
}

// initialize lights
function initLights() {
    var pointLight = glBoostContext.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
    pointLight.translate = new GLBoost.Vector3(10, 10, 10);
    scene.addChild(pointLight);
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
    plane.rotate.x = -Math.PI / 2;
    plane.translate.y = 0;
    scene.addChild(plane);
}

function createPlane(w, h) {
    var material = glBoostContext.createClassicMaterial();
    var texture = glBoostContext.createTexture("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
    material.diffuseTexture = texture;
    var planeGeometry = glBoostContext.createPlane(w, h, 10, 10, null);
    var plane = glBoostContext.createMesh(planeGeometry, material);

    return plane;
}

// create a shape
function createShape(x, y, z, w, h, d, mass, color) {
    var shape, body;

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
    var material = glBoostContext.createClassicMaterial();
    var texture = glBoostContext.createTexture("../../assets/s/s/X/x/ssXxc.png");  // Football.png
    material.diffuseTexture = texture;
    var color2 = new GLBoost.Vector4(color.r / 0xff, color.g / 0xff, color.b / 0xff, 1.0);
    var sphere = glBoostContext.createSphere(w, 10, 10, color2);
    var mesh = glBoostContext.createMesh(sphere, material);

    mesh.rigidBody = body;
    scene.addChild(mesh);
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
    // render graphical object
    renderer.clearCanvas();
    renderer.draw(expression);

    // step physical simulation
    world.step(TIME_STEP);

    // position graphical object on physical object recursively
    (function updateObject3D(mesh) {
        if (mesh.rigidBody) {
            var body = mesh.rigidBody;
            var p = body.position;
            mesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            var q = body.quaternion;
            mesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
        }
        if (mesh.elements) {
            mesh.elements.map(updateObject3D);
        }
    })(scene);

    // request next frame
    requestAnimationFrame(animate);
}

init();
animate();