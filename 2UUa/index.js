// forked from cx20's "[簡易版] WebGL で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/yoSK
// forked from cx20's "[簡易版] WebGL でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/9Dru
// forked from cx20's "[簡易版] WebGL で円を角度をつけて回転させてみるテスト" http://jsdo.it/cx20/5vCG
// forked from cx20's "[簡易版] WebGL で円を描いてみるテスト" http://jsdo.it/cx20/dz02
// forked from cx20's "[簡易版] WebGL でサインカーブを描いてみるテスト" http://jsdo.it/cx20/fPok
// forked from cx20's "[簡易版] WebGL で点をプロットしてみるテスト" http://jsdo.it/cx20/puXG
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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
    aLoc[1] = gl.getAttribLocation(p, "color");
    uLoc[0] = gl.getUniformLocation(p, 'matAxisX');
    uLoc[1] = gl.getUniformLocation(p, 'matAxisY');
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
}

function draw() {
    // 3次元リサージュの座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    var data = [];
    var colors = [];
    var MAX = 360;
    var A = 100.0;
    var B = 99.0;
    var C = 1.0;
    var alpha = Math.PI/4;
    var beta  = Math.PI/3;
    var theta = 0; // Math.PI/2;
    for ( var i = 0; i <= MAX; i += 0.1 ) {
        var x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
        var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
        data = data.concat([x, y, z]);
        //colors = colors.concat([x, y, z, 1.0]);
        colors = colors.concat([x+0.5, y+0.5, z+0.5, 1.0]);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

    var rad = 0;
    (function(){
        rad += Math.PI * 1.0 / 180.0;

        var c = Math.cos(rad);
        var s = Math.sin(rad);

        // 変換行列を用意
        // x軸で回転
        var matAxisX = [
            1.0, 0.0, 0.0, 0.0,
            0.0,   c,  -s, 0.0,
            0.0,   s,   c, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];
        // y軸で回転
        var matAxisY = [
              c, 0.0,   s, 0.0,
            0.0, 1.0, 0.0, 0.0,
             -s, 0.0,   c, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];
        gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(matAxisX));
        gl.uniformMatrix4fv(uLoc[1], false, new Float32Array(matAxisY));

        gl.drawArrays(gl.LINE_STRIP, 0, data.length / 3);
        //gl.drawArrays(gl.POINTS, 0, data.length / 3);
        gl.flush();
        requestAnimationFrame(arguments.callee);
    })();
}

initWebGL();
initShaders();
draw();