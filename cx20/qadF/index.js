// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("c");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var app = PicoGL.createApp(canvas)
.clearColor(1.0, 1.0, 1.0, 1.0);

var vsSource = document.getElementById("vs").textContent;
var fsSource = document.getElementById("fs").textContent;

var program = app.createProgram(vsSource, fsSource);

var positions = app.createArrayBuffer(PicoGL.FLOAT, 3, new Float32Array([
     0.0, 0.5, 0.0, 
    -0.5,-0.5, 0.0, 
     0.5,-0.5, 0.0
]));

var drawCall = app.createDrawCall(program)
.attribute("position", positions);

app.drawCalls([drawCall]);

window.onresize = function() {
    app.resize(window.innerWidth, window.innerHeight);
};

function draw() {
    app.clear().draw();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
