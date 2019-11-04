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
var canvas;
var glBoostContext;
var expression;

var wireframeCube;
var trackball;

var cubeSizeX = 16/16*5;
var cubeSizeY = 16/16*5;
var cubeSizeZ = 9/16*5;

function createWireframeCube(w, h, d) {
	var material = glBoostContext.createClassicMaterial();
	material.diffuseColor = new GLBoost.Vector4(0, 1, 0, 0.3);
	var shader = GLBoost.PhongShader;
	material.shaderClass = shader;
	var geometry = glBoostContext.createCube(new GLBoost.Vector3(w, h, d), new GLBoost.Vector4(1, 1, 1, 1));
	var mesh = glBoostContext.createMesh(geometry, material);
	mesh.opacity = 0.5;
	return mesh;
}

function loadDuck() {
	var gtime = 0;
	var glTFLoader = GLBoost.GLTFLoader.getInstance();
	var promise = glTFLoader.loadGLTF(glBoostContext, "../../assets/g/s/5/8/gs58O.gltf", 1, null); // glTF-Embedded/Duck.gltf
	//var promise = glTFLoader.loadGLTF(glBoostContext, "/assets/O/j/b/j/Ojbj1", 1, null); // glTF-MaterialsCommon/Duck.gltf

	promise.then(function(group) {
	    var scale = 5.0;
	    duck = group;
	    var mesh = group.searchElement("LOD3sp");  // glTF ファイル内のメッシュを名称キーに取得。
        mesh.translate = new GLBoost.Vector3(0, -1.0, 0);
	    duck.scale = new GLBoost.Vector3(scale, scale, scale);
	    scene.addChild(duck);
	    
	    expression = glBoostContext.createExpressionAndRenderPasses(1);
	    expression.renderPasses[0].scene = scene;
	    expression.prepareToRender();
	    
	    animate();
	});
}

function createPlane(w, h) {
    var material = glBoostContext.createClassicMaterial();
	var shader = GLBoost.PhongShader;
	material.shaderClass = shader;
    material.diffuseColor = new GLBoost.Vector4(0.7, 0.7, 0.7, 1.0);
    var geometry = glBoostContext.createPlane(w, h, 10, 10, null);
    var mesh = glBoostContext.createMesh(geometry, material);
    mesh.translate.y = -5;

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

function initGlboost() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas = document.getElementById("world");
    glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
    renderer = glBoostContext.createRenderer({
        clearColor: {red: 0.6, green: 0.6, blue: 0.6, alpha: 1}
    });
    
    scene = glBoostContext.createScene();
    camera = glBoostContext.createPerspectiveCamera({
        eye: new GLBoost.Vector3(20, 3, 20),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 30.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 10000.0
    });
    camera.cameraController = glBoostContext.createCameraController();
    scene.addChild(camera);
    

    loadDuck();
    plane = createPlane(300, 300);
    plane.rotate.x = -Math.PI / 2;

    wireframeCube = createWireframeCube(cubeSizeX*2, cubeSizeY*2, cubeSizeZ*2);
    
    var light = glBoostContext.createDirectionalLight(
        new GLBoost.Vector3(1, 1, 1), 
        new GLBoost.Vector3(-1, -1, -1));

    scene.addChild(light);

    scene.addChild(plane);
    scene.addChild(wireframeCube);
}

function animate() {
    requestAnimationFrame(animate);
    updatePhysics();
    render();
}

function updatePhysics() {
    world.step(timeStep);

    var p = body.position;
    var translate = new GLBoost.Vector3(p.x, p.y, p.z);
    var q = body.quaternion;
    var quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
    duck.translate = translate;
    duck.quaternion = quaternion;
    wireframeCube.translate = translate;
    wireframeCube.quaternion = quaternion;
}

function render() {
    renderer.clearCanvas();
    renderer.draw(expression);
}

initCannon();
initGlboost();

document.addEventListener('click', function () {
    body.applyImpulse(new CANNON.Vec3(0, 5, 0), body.position);
}, false);
