// forked from cx20's "[WebGL] GLBoost で消しゴムを表示させてみるテスト（standalone編）" http://jsdo.it/cx20/KNkb
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その４）" http://jsdo.it/cx20/wf7T
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

GLBoost['VALUE_CONSOLE_OUT_FOR_DEBUGGING'] = true;
GLBoost['VALUE_LOG_GENERAL'] = true;
GLBoost['VALUE_LOG_SHADER_CODE'] = true;

var canvas = document.getElementById("world");
var width = window.innerWidth;
var height = window.innerHeight;
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
var renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});
renderer.resize(width, height);
var expression;
var scene = glBoostContext.createScene();

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
var positions = [
    // Front face
    [-0.5,  -0.5,  0.7], // v0
    [ 0.5,  -0.5,  0.7], // v1
    [ 0.35,  0.5,  0.4], // v2
    [-0.35,  0.5,  0.4], // v3
    // Back face
    [-0.5,  -0.5, -0.7], // v4
    [ 0.5,  -0.5, -0.7], // v5
    [ 0.35,  0.5, -0.4], // v6
    [-0.35,  0.5, -0.4], // v7
    // Top face
    [ 0.35,  0.5,  0.4], // v2
    [-0.35,  0.5,  0.4], // v3
    [-0.35,  0.5, -0.4], // v7
    [ 0.35,  0.5, -0.4], // v6
    // Bottom face
    [-0.5,  -0.5,  0.7], // v0
    [ 0.5,  -0.5,  0.7], // v1
    [ 0.5,  -0.5, -0.7], // v5
    [-0.5,  -0.5, -0.7], // v4
    // Right face
    [ 0.5,  -0.5,  0.7], // v1
    [ 0.35,  0.5,  0.4], // v2
    [ 0.35,  0.5, -0.4], // v6
    [ 0.5,  -0.5, -0.7], // v5
    // Left face
    [-0.5,  -0.5,  0.7], // v0
    [-0.35,  0.5,  0.4], // v3
    [-0.35,  0.5, -0.4], // v7
    [-0.5,  -0.5, -0.7], // v4
    // Front2 face
    [-0.35,  0.5,  0.4],  // v3
    [ 0.35,  0.5,  0.4],  // v2
    [ 0.0,   0.6,  0.35], // v8
    // Back2 face
    [-0.35,  0.5, -0.4],  // v7
    [ 0.35,  0.5, -0.4],  // v6
    [ 0.0,   0.6, -0.35], // v9
    // Right2 Face
    [ 0.35,  0.5,  0.4],  // v2
    [ 0.35,  0.5, -0.4],  // v6
    [ 0.0,   0.6, -0.35], // v9
    [ 0.0,   0.6,  0.35], // v8
    // Left2 Face
    [-0.35,  0.5,  0.4],  // v3
    [-0.35,  0.5, -0.4],  // v7
    [ 0.0,   0.6, -0.35], // v9
    [ 0.0,   0.6,  0.35]  // v8
];

// テクスチャ座標データを用意
//  (0, 1)               (1, 1)
//   t +----+----+----+----+
//     | ① | ② | ③ |    |
//     +----+----+----+----+
//     | ④ | ⑤ | ⑥ |    |
//     +----+----+----+----+ -> s
//  (0, 0)               (1, 0)
//
var texcoords = [
    // Front face
    [0.5,  0.5], // v0
    [0.75, 0.5], // v1
    [0.75, 1.0], // v2
    [0.5,  1.0], // v3
    
    // Back face
    [0.25, 0.5], // v4
    [0.5,  0.5], // v5
    [0.5,  1.0], // v6
    [0.25, 1.0], // v7
    
    // Top face
    [0.75, 0.5], // v2
    [0.5,  0.5], // v3
    [0.5,  0.0], // v7
    [0.75, 0.0], // v6
    
    // Bottom face
    [0.0,  0.5], // v0
    [0.25, 0.5], // v1
    [0.25, 1.0], // v5
    [0.0,  1.0], // v4
    
    // Right face
    [0.0,  0.5], // v1
    [0.0,  0.0], // v2
    [0.25, 0.0], // v6
    [0.25, 0.5], // v5
    
    // Left face
    [0.5,  0.5], // v0
    [0.5,  0.0], // v3
    [0.25, 0.0], // v7
    [0.25, 0.5], // v4
    
    // Front2 face
    [0.75,  0.0], // v3
    [1.0,   0.0], // v2
    [1.0,   0.5], // v8
    // Back2 face
    [0.75,  0.0], // v7
    [1.0,   0.0], // v6
    [1.0,   0.5], // v9
    // Right2 Face
    [0.75,  0.0], // v2
    [1.0,   0.0], // v6
    [1.0,   0.5], // v9
    [0.75,  0.5], // v8
    // Left2 Face
    [0.75,  0.0], // v3
    [1.0,   0.0], // v7
    [1.0,   0.0], // v9
    [0.75,  0.5]  // v8
];

var indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23,  // Left face
    24, 25, 26,                // Front2 face
    27, 28, 29,                // Back2 face
    30, 31, 32,   30, 32, 33,  // Right2 face
    34, 35, 36,   34, 36, 37   // Left2 face
];

var geometry = glBoostContext.createGeometry(canvas);
var texture = glBoostContext.createTexture('../../assets/o/v/g/u/ovguM.png'); // 512x256.png
var material = glBoostContext.createClassicMaterial();
material.setTexture(texture);
geometry.setVerticesData({
    position: positions,
    texcoord: texcoords
}, [indices], GLBoost.TRIANGLE);

var mesh = glBoostContext.createMesh(geometry, material);
//mesh.scale = new GLBoost.Vector3(1.0, 0.2, 0.5);
mesh.scale = new GLBoost.Vector3(1.0, 1.0, 0.2);
scene.addChild( mesh );

var camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: width/height,
    zNear: 0.1,
    zFar: 10.0
});

scene.addChild( camera );

expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

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

function draw(canvas) {
    var domElement = canvas;
    canvas.context.drawImage(domElement, 0, 0, domElement.width, domElement.height);
}
