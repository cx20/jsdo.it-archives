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
var renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});
var scene = glBoostContext.createScene();

renderer.readyForWebVR(document.querySelector('.enter-web-vr'));

document.querySelector('.enter-web-vr').addEventListener('click', ()=>{
    renderer.enterWebVR();
});


var texture = glBoostContext.createTexture('../../assets/A/k/w/j/AkwjW.jpg'); // frog.jpg
var material = glBoostContext.createClassicMaterial();
material.setTexture(texture);
//material.shaderClass = GLBoost.PhongShader;
material.baseColor = new GLBoost.Vector4(1, 1, 1, 1);

// 立方体の座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//         [7]------[6]
//        / |      / |
//      [3]------[2] |
//       |  |     |  |
//       | [4]----|-[5]
//       |/       |/
//      [0]------[1]
//

//var geometry = glBoostContext.createCube(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(1, 1, 1));
var geometry = glBoostContext.createCube(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector4(1, 1, 1, 1));

var mesh = glBoostContext.createMesh(geometry, material);
scene.addChild(mesh);

var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(0, 0, -1));
scene.addChild( directionalLight );

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

/*
(function(){
    renderer.clearCanvas();
    renderer.draw(expression);
    var rotateMatrixX = GLBoost.Matrix33.rotateX(1);
    var rotateMatrixY = GLBoost.Matrix33.rotateY(1);
    var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
    rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
    camera.eye = rotatedVector;

    requestAnimationFrame(arguments.callee);
})();
*/

var angle = 0;
var axis = new GLBoost.Vector3(1,1,1);
renderer.doConvenientRenderLoop(expression, function() {
/*
    var rotateMatrixX = GLBoost.Matrix33.rotateX(1);
    var rotateMatrixY = GLBoost.Matrix33.rotateY(1);
    var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
    /rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
    camera.eye = rotatedVector;
*/    
    // VR中はVR専用のカメラに切り替わるので、カメラではなく物体を回転させる
    mesh.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
    angle += 0.02;
});
