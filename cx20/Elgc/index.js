// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

let width = window.innerWidth;
let height = window.innerHeight;

let canvas = document.getElementById("world");
let glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
let renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});
renderer.resize(width, height);

let scene = glBoostContext.createScene();

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

// 頂点データを配列で指定する場合
let positions = [
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

let colors = [
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    
    [0.0, 0.0, 1.0, 1.0],  // Left face
    [0.0, 0.0, 1.0, 1.0],  // Left face
    [0.0, 0.0, 1.0, 1.0],  // Left face
    [0.0, 0.0, 1.0, 1.0]   // Left face
];

let indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23   // Left face
];

let geometry = glBoostContext.createGeometry();
geometry.setVerticesData({
    position: positions,
    color: colors
}, [indices], GLBoost.TRIANGLE);

let mesh = glBoostContext.createMesh(geometry);
scene.addChild(mesh);

let camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: width/height,
    zFar: 10.0
});

scene.addChild(camera);

let expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

(function(){
    renderer.clearCanvas();
    renderer.draw(expression);
    let rotateMatrixX = GLBoost.Matrix33.rotateX(1);
    let rotateMatrixY = GLBoost.Matrix33.rotateY(1);
    let rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
    rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
    camera.eye = rotatedVector;

    requestAnimationFrame(arguments.callee);
})();

function draw(canvas) {
    let domElement = canvas;
    canvas.context.drawImage(domElement, 0, 0, domElement.width, domElement.height);
}
