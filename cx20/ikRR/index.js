// forked from cx20's "[WebGL] PicoGL.js を試してみるテスト" http://jsdo.it/cx20/qadF
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("c");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var app = PicoGL.createApp(canvas)
.clearColor(1.0, 1.0, 1.0, 1.0);

var vsSource = document.getElementById("vs").textContent;
var fsSource = document.getElementById("fs").textContent;

var program = app.createProgram(vsSource, fsSource);

// 正方形の座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//        [0]------[1]
//         |        |
//         |        |
//         |        |
//        [2]------[3]
//
var positions = app.createArrayBuffer(PicoGL.FLOAT, 3, new Float32Array([
    -0.5, 0.5, 0.0, // v0
     0.5, 0.5, 0.0, // v1 
    -0.5,-0.5, 0.0, // v2
     0.5,-0.5, 0.0  // v3
]));
var colors = app.createArrayBuffer(PicoGL.FLOAT, 4, new Float32Array([
     1.0, 0.0, 0.0, 1.0, // v0
     0.0, 1.0, 0.0, 1.0, // v1
     0.0, 0.0, 1.0, 1.0, // v2
     1.0, 1.0, 0.0, 1.0  // v3
]));
var indices = app.createIndexBuffer(PicoGL.UNSIGNED_BYTE, 3, new Uint8Array([
    2, 0, 1, // v2-v0-v1
    2, 1, 3  // v2-v1-v3
]));

var drawCall = app.createDrawCall(program)
.attribute("position", positions)
.attribute("color", colors)
.indices(indices);

app.drawCalls([drawCall]);

window.onresize = function() {
    app.resize(window.innerWidth, window.innerHeight);
};

function draw() {
    app.clear().draw();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
