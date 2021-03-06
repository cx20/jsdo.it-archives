// forked from cx20's "GLBoost で地球に雲を表示してみるテスト" http://jsdo.it/cx20/kmx9
// forked from cx20's "GLBoost で地球を回してみるテスト（改3）" http://jsdo.it/cx20/SerT
// forked from cx20's "GLBoost で地球を回してみるテスト（改2）（失敗）" http://jsdo.it/cx20/OqXi
// forked from cx20's "GLBoost で地球を回してみるテスト（改）" http://jsdo.it/cx20/6WTV
// forked from cx20's "GLBoost で地球を回してみるテスト" http://jsdo.it/cx20/Chqk
// forked from cx20's "WebGL で地球を回してみるテスト" http://jsdo.it/cx20/cI8t

let width = window.innerWidth;
let height = window.innerHeight;
let canvas = document.getElementById("world");
let glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
let renderer = glBoostContext.createRenderer({
    clearColor: {red: 0.0, green: 0.0, blue: 0.0, alpha: 1}
});
renderer.resize(width, height);

let scene = glBoostContext.createScene();

let directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(0.4, 0.4, 0.4), new GLBoost.Vector3(-10, -1, -10));
scene.addChild( directionalLight );
let pointLight1 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(0.6, 0.6, 0.6), new GLBoost.Vector3(0, 100, -100));
scene.addChild( pointLight1 );
let pointLight2 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), new GLBoost.Vector3(50, -50, -100));
scene.addChild( pointLight2 );

let material1 = glBoostContext.createClassicMaterial();
let texture1 = glBoostContext.createTexture('../../assets/4/I/b/A/4IbAL.jpg'); // earth_atmos_1024.jpg
material1.setTexture(texture1);
material1.shaderClass = GLBoost.PhongShader;
let geometry1 = glBoostContext.createSphere(20, 24, 24);
let earth = glBoostContext.createMesh(geometry1, material1);
scene.addChild(earth);

let material2 = glBoostContext.createClassicMaterial();
let texture2 = glBoostContext.createTexture('../../assets/n/l/9/m/nl9m8.png'); // earth_clouds_1024.png
material2.setTexture(texture2);
material2.shaderClass = GLBoost.LambertShader;
let geometry2 = glBoostContext.createSphere(20*1.01, 24, 24);
let cloud = glBoostContext.createMesh(geometry2, material2);
scene.addChild(cloud);

var camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 0.0, 60.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: width/height,
    zNear: 0.1,
    zFar: 1000.0
});

scene.addChild(camera);

// create an expression (which is composed of several rendering passes)
let expression = glBoostContext.createExpressionAndRenderPasses(1);

// set scene to render pass of expression
expression.renderPasses[0].scene = scene;

// call this method before rendering
expression.prepareToRender();

let angle = 1;
let angle2 = 1;
let axis = new GLBoost.Vector3(0,1,0);

// rendering loop
renderer.doConvenientRenderLoop(expression, function(){

    // quaternion による回転
    earth.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
    angle += 0.005;

    cloud.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle2));
    angle2 += 0.0075;
});
