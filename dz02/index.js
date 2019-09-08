// forked from cx20's "[簡易版] WebGL でサインカーブを描いてみるテスト" http://jsdo.it/cx20/fPok
// forked from cx20's "[簡易版] WebGL で点をプロットしてみるテスト" http://jsdo.it/cx20/puXG
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
var c, gl;

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
}

function initShaders() {
    var p = gl.createProgram();
    var v = document.getElementById("vs").textContent;
    var f = document.getElementById("fs").textContent;
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    gl.bindAttribLocation(p, 0, "position");
    gl.enableVertexAttribArray(0);
}

function draw() {
    // 正弦波×余弦波の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //             [3]
    //         [4]     [2]
    //      [5]            [1]
    //      *                *
    //     [6]              [0]
    //      *                *
    //      [7]            [11]
    //         [8]     [10]
    //             [9]
    //
    var data = [];
    var MAX = 12;
    for ( var i = 0; i <= MAX; i++ ) {
        var x = 0.5 * Math.cos(2 * Math.PI * i / MAX);
        var y = 0.5 * Math.sin(2 * Math.PI * i / MAX);
        data = data.concat([x, y, 0.0]);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINE_STRIP, 0, data.length / 3);
    gl.drawArrays(gl.POINTS, 0, data.length / 3);
    gl.flush();
}

initWebGL();
initShaders();
draw();