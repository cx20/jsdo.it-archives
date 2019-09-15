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

var material = glBoostContext.createClassicMaterial();
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

var colors = [
    new GLBoost.Vector4(1.0, 0.0, 0.0, 1.0), // Front face
    new GLBoost.Vector4(1.0, 0.0, 0.0, 1.0), // Front face
    new GLBoost.Vector4(1.0, 0.0, 0.0, 1.0), // Front face
    new GLBoost.Vector4(1.0, 0.0, 0.0, 1.0), // Front face
    
    new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0), // Back face
    new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0), // Back face
    new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0), // Back face
    new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0), // Back face
    
    new GLBoost.Vector4(0.0, 1.0, 0.0, 1.0), // Top face
    new GLBoost.Vector4(0.0, 1.0, 0.0, 1.0), // Top face
    new GLBoost.Vector4(0.0, 1.0, 0.0, 1.0), // Top face
    new GLBoost.Vector4(0.0, 1.0, 0.0, 1.0), // Top face
    
    new GLBoost.Vector4(1.0, 0.5, 0.5, 1.0), // Bottom face
    new GLBoost.Vector4(1.0, 0.5, 0.5, 1.0), // Bottom face
    new GLBoost.Vector4(1.0, 0.5, 0.5, 1.0), // Bottom face
    new GLBoost.Vector4(1.0, 0.5, 0.5, 1.0), // Bottom face
    
    new GLBoost.Vector4(1.0, 0.0, 1.0, 1.0), // Right face
    new GLBoost.Vector4(1.0, 0.0, 1.0, 1.0), // Right face
    new GLBoost.Vector4(1.0, 0.0, 1.0, 1.0), // Right face
    new GLBoost.Vector4(1.0, 0.0, 1.0, 1.0), // Right face
    
    new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),  // Left face
    new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),  // Left face
    new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),  // Left face
    new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0)   // Left face
];
var mesh = glBoostContext.createMesh(geometry, material);
scene.addChild(mesh);

var camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 0, 3),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 1000.0
});

scene.addChild(camera);

var expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

geometry.updateVerticesData({
    color: colors
});

var angle = 0;
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