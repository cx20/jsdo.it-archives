// forked from cx20's "[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その２）" http://jsdo.it/cx20/gydx
// forked from cx20's "[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その１）" http://jsdo.it/cx20/konT
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
var c, gl;
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
    uLoc[0] = gl.getUniformLocation(p, 'mvpMatrix');
    gl.enableVertexAttribArray(aLoc[0]);
}

function draw() {
    // ピラミッドの座標データを用意
    var data = [ 
        // Front face
         0.0,  0.5,  0.0,
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,

        // Right face
         0.0,  0.5,  0.0,
         0.5, -0.5,  0.5,
         0.5, -0.5, -0.5,

        // Back face
         0.0,  0.5,  0.0,
         0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,

        // Left face
         0.0,  0.5,  0.0,
        -0.5, -0.5, -0.5,
        -0.5, -0.5,  0.5
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    // 変換行列を用意
    var mvpMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.5,
        0.0, 0.0, 0.0, 1.0
    ];
    gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(mvpMatrix));

    gl.drawArrays(gl.LINE_STRIP, 0, 12);
    gl.drawArrays(gl.POINTS, 0, 12);
    gl.flush();
}

initWebGL();
initShaders();
draw();