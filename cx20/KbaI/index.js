// forked from cx20's "[WebGL] PicoGL.js を試してみるテスト（その２）" http://jsdo.it/cx20/ikRR
// forked from cx20's "[WebGL] PicoGL.js を試してみるテスト" http://jsdo.it/cx20/qadF
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("c");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var app = PicoGL.createApp(canvas)
.clearColor(1.0, 1.0, 1.0, 1.0)
.depthTest();

var vsSource = document.getElementById("vs").textContent;
var fsSource = document.getElementById("fs").textContent;

var program = app.createProgram(vsSource, fsSource);

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
var positions = app.createArrayBuffer(PicoGL.FLOAT, 3, new Float32Array([
    // Front face
    -0.5, -0.5,  0.5, // v0
     0.5, -0.5,  0.5, // v1
     0.5,  0.5,  0.5, // v2
    -0.5,  0.5,  0.5, // v3
    // Back face
    -0.5, -0.5, -0.5, // v4
    -0.5,  0.5, -0.5, // v7
     0.5,  0.5, -0.5, // v6
     0.5, -0.5, -0.5, // v5
    // Top face
    -0.5,  0.5, -0.5, // v7
    -0.5,  0.5,  0.5, // v3
     0.5,  0.5,  0.5, // v2
     0.5,  0.5, -0.5, // v6
    // Bottom face
    -0.5, -0.5, -0.5, // v4
     0.5, -0.5, -0.5, // v5
     0.5, -0.5,  0.5, // v1
    -0.5, -0.5,  0.5, // v0
    // Right face
     0.5, -0.5, -0.5, // v5
     0.5,  0.5, -0.5, // v6
     0.5,  0.5,  0.5, // v2
     0.5, -0.5,  0.5, // v1
    // Left face
    -0.5, -0.5, -0.5, // v4
    -0.5, -0.5,  0.5, // v0
    -0.5,  0.5,  0.5, // v3
    -0.5,  0.5, -0.5  // v7
]));

var colors = app.createArrayBuffer(PicoGL.FLOAT, 4, new Float32Array([
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    0.0, 0.0, 1.0, 1.0, // Left face
    0.0, 0.0, 1.0, 1.0, // Left face
    0.0, 0.0, 1.0, 1.0, // Left face
    0.0, 0.0, 1.0, 1.0  // Left face
]));

var indices = app.createIndexBuffer(PicoGL.UNSIGNED_BYTE, 3, new Uint8Array([
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23   // Left face
]));

var drawCall = app.createDrawCall(program)
.attribute("position", positions)
.attribute("color", colors)
.indices(indices);

app.drawCalls([drawCall]);

window.onresize = function() {
    app.resize(window.innerWidth, window.innerHeight);
};

var matAxisX = new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var matAxisY = new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var rad = 0;
function draw() {
    rad += Math.PI * 1.0 / 180.0;
    
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    matAxisX[5]  = c;
    matAxisX[6]  = -s;
    matAxisX[9]  = s;
    matAxisX[10] = c;

    matAxisY[0]  = c;
    matAxisY[2]  = s;
    matAxisY[8]  = -s;
    matAxisY[10] = c;

    drawCall.uniform("matAxisX", matAxisX);
    drawCall.uniform("matAxisY", matAxisY);
    app.clear().draw();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
