// forked from cx20's "[WebVR] GLBoost で WebVR を試してみるテスト（その６）（調整中）" http://jsdo.it/cx20/ygHt
// forked from cx20's "[WebVR] GLBoost で WebVR を試してみるテスト（その５）（調整中）" http://jsdo.it/cx20/0iRm
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（その４）（調整中）" http://jsdo.it/cx20/SePJ
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/GeUE
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/akl7
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/2e3y
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/yy3I
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その３）（仮）" http://jsdo.it/cx20/WlZW
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その２）（仮）" http://jsdo.it/cx20/8PA0
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（仮）" http://jsdo.it/cx20/g9yj
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("world");
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
var renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:0, green:0, blue:0, alpha:1}});
var scene = glBoostContext.createScene();
//scene.translate = new GLBoost.Vector3(0, 0, -2);

renderer.readyForWebVR(document.querySelector('.enter-web-vr'));

document.querySelector('.enter-web-vr').addEventListener('click', ()=>{
    renderer.enterWebVR();
});


var texture = glBoostContext.createTexture('../../assets/4/I/b/A/4IbAL.jpg'); // earth_atmos_1024.jpg
var material = glBoostContext.createClassicMaterial();
material.setTexture(texture);
material.shaderClass = GLBoost.PhongShader;
var geometry = glBoostContext.createSphere(1, 30, 30, null);
var earth = glBoostContext.createMesh(geometry, material);
scene.addChild(earth);

var textureCloud = glBoostContext.createTexture('../../assets/n/l/9/m/nl9m8.png'); // earth_clouds_1024.png
var materialCloud = glBoostContext.createClassicMaterial();
materialCloud.setTexture(textureCloud);
//materialCloud.shaderClass = GLBoost.PhongShader;
var geometryCloud = glBoostContext.createSphere(1.01, 30, 30, null);
var cloud = glBoostContext.createMesh(geometryCloud, materialCloud);
scene.addChild(cloud);

let directionalLight1 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.5, 1.5, 1.5), new GLBoost.Vector3(-45, -45, 0));
scene.addChild( directionalLight1 );

var camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 0, 1.5),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 1000.0
});
camera.cameraController = glBoostContext.createCameraController();
scene.addChild(camera);

var expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

var angle1 = 0;
var angle2 = 0;
var axis = new GLBoost.Vector3(0, 1, 0);
renderer.doConvenientRenderLoop(expression, function() {
    earth.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle1));
    cloud.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle2));
    angle1 += 0.01;
    angle2 += 0.015;
});
