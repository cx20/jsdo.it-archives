// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("world");
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
var renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});

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
/*
// 頂点データを Vector で指定する場合
var positions = [
    // Front face
    new GLBoost.Vector3(-0.5, -0.5,  0.5), // v0
    new GLBoost.Vector3( 0.5, -0.5,  0.5), // v1
    new GLBoost.Vector3( 0.5,  0.5,  0.5), // v2
    new GLBoost.Vector3(-0.5,  0.5,  0.5), // v3
    // Back face
    new GLBoost.Vector3(-0.5, -0.5, -0.5), // v4
    new GLBoost.Vector3( 0.5, -0.5, -0.5), // v5
    new GLBoost.Vector3( 0.5,  0.5, -0.5), // v6
    new GLBoost.Vector3(-0.5,  0.5, -0.5), // v7
    // Top face
    new GLBoost.Vector3( 0.5,  0.5,  0.5), // v2
    new GLBoost.Vector3(-0.5,  0.5,  0.5), // v3
    new GLBoost.Vector3(-0.5,  0.5, -0.5), // v7
    new GLBoost.Vector3( 0.5,  0.5, -0.5), // v6
    // Bottom face
    new GLBoost.Vector3(-0.5, -0.5,  0.5), // v0
    new GLBoost.Vector3( 0.5, -0.5,  0.5), // v1
    new GLBoost.Vector3( 0.5, -0.5, -0.5), // v5
    new GLBoost.Vector3(-0.5, -0.5, -0.5), // v4
    // Right face
    new GLBoost.Vector3( 0.5, -0.5,  0.5), // v1
    new GLBoost.Vector3( 0.5,  0.5,  0.5), // v2
    new GLBoost.Vector3( 0.5,  0.5, -0.5), // v6
    new GLBoost.Vector3( 0.5, -0.5, -0.5), // v5
    // Left face
    new GLBoost.Vector3(-0.5, -0.5,  0.5), // v0
    new GLBoost.Vector3(-0.5,  0.5,  0.5), // v3
    new GLBoost.Vector3(-0.5,  0.5, -0.5), // v7
    new GLBoost.Vector3(-0.5, -0.5, -0.5)  // v4
];

var texcoords = [
    // Front face
    new GLBoost.Vector2(0.0, 0.0),
    new GLBoost.Vector2(1.0, 0.0),
    new GLBoost.Vector2(1.0, 1.0),
    new GLBoost.Vector2(0.0, 1.0),
    
    // Back face
    new GLBoost.Vector2(1.0, 0.0),
    new GLBoost.Vector2(1.0, 1.0),
    new GLBoost.Vector2(0.0, 1.0),
    new GLBoost.Vector2(0.0, 0.0),
    
    // Top face
    new GLBoost.Vector2(0.0, 1.0),
    new GLBoost.Vector2(0.0, 0.0),
    new GLBoost.Vector2(1.0, 0.0),
    new GLBoost.Vector2(1.0, 1.0),
    
    // Bottom face
    new GLBoost.Vector2(1.0, 1.0),
    new GLBoost.Vector2(0.0, 1.0),
    new GLBoost.Vector2(0.0, 0.0),
    new GLBoost.Vector2(1.0, 0.0),
    
    // Right face
    new GLBoost.Vector2(1.0, 0.0),
    new GLBoost.Vector2(1.0, 1.0),
    new GLBoost.Vector2(0.0, 1.0),
    new GLBoost.Vector2(0.0, 0.0),
    
    // Left face
    new GLBoost.Vector2(0.0, 0.0),
    new GLBoost.Vector2(1.0, 0.0),
    new GLBoost.Vector2(1.0, 1.0),
    new GLBoost.Vector2(0.0, 1.0)
];
*/
// 頂点データを配列で指定する場合
var positions = [
    // Front face
    [-0.5, -0.5,  0.5], // v0
    [ 0.5, -0.5,  0.5], // v1
    [ 0.5,  0.5,  0.5], // v2
    [-0.5,  0.5,  0.5], // v3
    // Back face
    [-0.5, -0.5, -0.5], // v4
    [ 0.5, -0.5, -0.5], // v5
    [ 0.5,  0.5, -0.5], // v6
    [-0.5,  0.5, -0.5], // v7
    // Top face
    [ 0.5,  0.5,  0.5], // v2
    [-0.5,  0.5,  0.5], // v3
    [-0.5,  0.5, -0.5], // v7
    [ 0.5,  0.5, -0.5], // v6
    // Bottom face
    [-0.5, -0.5,  0.5], // v0
    [ 0.5, -0.5,  0.5], // v1
    [ 0.5, -0.5, -0.5], // v5
    [-0.5, -0.5, -0.5], // v4
    // Right face
    [ 0.5, -0.5,  0.5], // v1
    [ 0.5,  0.5,  0.5], // v2
    [ 0.5,  0.5, -0.5], // v6
    [ 0.5, -0.5, -0.5], // v5
    // Left face
    [-0.5, -0.5,  0.5], // v0
    [-0.5,  0.5,  0.5], // v3
    [-0.5,  0.5, -0.5], // v7
    [-0.5, -0.5, -0.5]  // v4
];

var texcoords = [
    // Front face
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
    
    // Back face
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
    [0.0, 0.0],
    
    // Top face
    [0.0, 1.0],
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    
    // Bottom face
    [1.0, 1.0],
    [0.0, 1.0],
    [0.0, 0.0],
    [1.0, 0.0],
    
    // Right face
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
    [0.0, 0.0],
    
    // Left face
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0]
];

var indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23   // Left face
];

var geometry = glBoostContext.createGeometry();
var texture = glBoostContext.createTexture('../../assets/A/k/w/j/AkwjW.jpg'); // frog.jpg
var material = glBoostContext.createClassicMaterial();
material.setTexture(texture);
geometry.setVerticesData({
    position: positions,
    texcoord: texcoords
}, [indices], GLBoost.TRIANGLE);

var mesh = glBoostContext.createMesh(geometry, material);
scene.addChild(mesh);

var camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 10.0
});

scene.addChild(camera);

var expression = glBoostContext.createExpressionAndRenderPasses(1);
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
