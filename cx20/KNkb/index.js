// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その４）" http://jsdo.it/cx20/wf7T
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});

var scene = new GLBoost.Scene();

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

var colors = [
    new GLBoost.Vector3(1.0, 0.0, 0.0, 1.0), // Front face
    new GLBoost.Vector3(1.0, 0.0, 0.0, 1.0), // Front face
    new GLBoost.Vector3(1.0, 0.0, 0.0, 1.0), // Front face
    new GLBoost.Vector3(1.0, 0.0, 0.0, 1.0), // Front face
    
    new GLBoost.Vector3(1.0, 1.0, 0.0, 1.0), // Back face
    new GLBoost.Vector3(1.0, 1.0, 0.0, 1.0), // Back face
    new GLBoost.Vector3(1.0, 1.0, 0.0, 1.0), // Back face
    new GLBoost.Vector3(1.0, 1.0, 0.0, 1.0), // Back face
    
    new GLBoost.Vector3(0.0, 1.0, 0.0, 1.0), // Top face
    new GLBoost.Vector3(0.0, 1.0, 0.0, 1.0), // Top face
    new GLBoost.Vector3(0.0, 1.0, 0.0, 1.0), // Top face
    new GLBoost.Vector3(0.0, 1.0, 0.0, 1.0), // Top face
    
    new GLBoost.Vector3(1.0, 0.5, 0.5, 1.0), // Bottom face
    new GLBoost.Vector3(1.0, 0.5, 0.5, 1.0), // Bottom face
    new GLBoost.Vector3(1.0, 0.5, 0.5, 1.0), // Bottom face
    new GLBoost.Vector3(1.0, 0.5, 0.5, 1.0), // Bottom face
    
    new GLBoost.Vector3(1.0, 0.0, 1.0, 1.0), // Right face
    new GLBoost.Vector3(1.0, 0.0, 1.0, 1.0), // Right face
    new GLBoost.Vector3(1.0, 0.0, 1.0, 1.0), // Right face
    new GLBoost.Vector3(1.0, 0.0, 1.0, 1.0), // Right face
    
    new GLBoost.Vector3(0.0, 0.0, 1.0, 1.0),  // Left face
    new GLBoost.Vector3(0.0, 0.0, 1.0, 1.0),  // Left face
    new GLBoost.Vector3(0.0, 0.0, 1.0, 1.0),  // Left face
    new GLBoost.Vector3(0.0, 0.0, 1.0, 1.0)   // Left face
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
    new GLBoost.Vector2(0.5,  0.5), // v0
    new GLBoost.Vector2(0.75, 0.5), // v1
    new GLBoost.Vector2(0.75, 1.0), // v2
    new GLBoost.Vector2(0.5,  1.0), // v3

    // Back face
    new GLBoost.Vector2(0.25, 0.5), // v4
    new GLBoost.Vector2(0.5,  0.5), // v5
    new GLBoost.Vector2(0.5,  1.0), // v6
    new GLBoost.Vector2(0.25, 1.0), // v7

    // Top face
    new GLBoost.Vector2(0.75, 0.5), // v2
    new GLBoost.Vector2(0.5,  0.5), // v3
    new GLBoost.Vector2(0.5,  0.0), // v7
    new GLBoost.Vector2(0.75, 0.0), // v6

    // Bottom face
    new GLBoost.Vector2(0.0,  0.5), // v0
    new GLBoost.Vector2(0.25, 0.5), // v1
    new GLBoost.Vector2(0.25, 1.0), // v5
    new GLBoost.Vector2(0.0,  1.0), // v4

    // Right face
    new GLBoost.Vector2(0.0,  0.5), // v1
    new GLBoost.Vector2(0.0,  0.0), // v2
    new GLBoost.Vector2(0.25, 0.0), // v6
    new GLBoost.Vector2(0.25, 0.5), // v5

    // Left face
    new GLBoost.Vector2(0.5,  0.5), // v0
    new GLBoost.Vector2(0.5,  0.0), // v3
    new GLBoost.Vector2(0.25, 0.0), // v7
    new GLBoost.Vector2(0.25, 0.5)  // v4
];

var indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23   // Left face
];

var geometry = new GLBoost.Geometry(canvas);
//var texture = new GLBoost.Texture('/assets/A/k/w/j/AkwjW.jpg'); // frog.jpg
var texture = new GLBoost.Texture('../../assets/7/5/o/P/75oPt.png'); // 512x256.png
var material = new GLBoost.ClassicMaterial();
material.diffuseTexture = texture;
geometry.setVerticesData({
    position: positions,
    texcoord: texcoords
}, [indices], GLBoost.TRIANGLE);

var mesh = new GLBoost.Mesh(geometry, material);
mesh.scale = new GLBoost.Vector3(1.0, 0.2, 0.5);
scene.add( mesh );

var camera = new GLBoost.Camera({
    eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 10.0
});

scene.add( camera );

scene.prepareForRender();

(function(){
    renderer.clearCanvas();
    renderer.draw(scene);
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
