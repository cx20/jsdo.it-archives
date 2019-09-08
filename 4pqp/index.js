// forked from cx20's "[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その２）" http://jsdo.it/cx20/gydx
// forked from cx20's "[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その１）" http://jsdo.it/cx20/konT
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c, gl;
var startTime;
var time = 0.0;
var timeScale = 0.0;
var aLoc = [];
var uLoc = [];

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
}

function initShaders() {
    var p = gl.createProgram();
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    var v = document.getElementById("vs").textContent;
    var f = document.getElementById("fs").textContent;
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "color");
    uLoc[0] = gl.getUniformLocation(p, "time");
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
    startTime = new Date().getTime();
}

function initBuffers() {
    // 三角形の座標データを用意
    var data = [ 
         0.0,  0.5, 0.0, 
        -0.5, -0.5, 0.0, 
         0.5, -0.5, 0.0 
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    // 頂点毎の色データを用意
    var colors = [ 
         1.0, 0.0, 0.0, 1.0,
         0.0, 1.0, 0.0, 1.0, 
         0.0, 0.0, 1.0, 1.0
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

function render() {
    time = (new Date().getTime() - startTime) * 0.001;
    gl.uniform1f(uLoc[0], time);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.flush();
}

initWebGL();
initShaders();
initBuffers();
animate();