// forked from cx20's "[簡易版] WebGL で小惑星をプロットしてみるテスト（その２）" http://jsdo.it/cx20/cmlG
// forked from cx20's "[簡易版] WebGL で小惑星をプロットしてみるテスト" http://jsdo.it/cx20/qSiE
// forked from cx20's "[簡易版] WebGL で３次元関数をプロットしてみるテスト" http://jsdo.it/cx20/8H2X
// forked from cx20's "[簡易版] WebGL で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/yoSK
// forked from cx20's "[簡易版] WebGL でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/9Dru
// forked from cx20's "[簡易版] WebGL で円を角度をつけて回転させてみるテスト" http://jsdo.it/cx20/5vCG
// forked from cx20's "[簡易版] WebGL で円を描いてみるテスト" http://jsdo.it/cx20/dz02
// forked from cx20's "[簡易版] WebGL でサインカーブを描いてみるテスト" http://jsdo.it/cx20/fPok
// forked from cx20's "[簡易版] WebGL で点をプロットしてみるテスト" http://jsdo.it/cx20/puXG
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
// forked from cx20's "[簡易版] WebGL で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/yoSK
// forked from cx20's "[簡易版] WebGL でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/9Dru
// forked from cx20's "[簡易版] WebGL で円を角度をつけて回転させてみるテスト" http://jsdo.it/cx20/5vCG
// forked from cx20's "[簡易版] WebGL で円を描いてみるテスト" http://jsdo.it/cx20/dz02
// forked from cx20's "[簡易版] WebGL でサインカーブを描いてみるテスト" http://jsdo.it/cx20/fPok
// forked from cx20's "[簡易版] WebGL で点をプロットしてみるテスト" http://jsdo.it/cx20/puXG
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
var c, gl;
var stats;

var aLoc = [];
var uLoc = [];

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
    resize(gl);
    
    // Stats
    stats = new Stats();
    // 左上に設定
    stats.domElement.style.position = "fixed";
    stats.domElement.style.left     = "5px";
    stats.domElement.style.top      = "5px";
    document.body.appendChild(stats.domElement);
}

function resize(gl) {
    var realToCSSPixels = window.devicePixelRatio || 1;
    
    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
    var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);
    
    // Check if the canvas is not the same size.
    if (gl.canvas.width  != displayWidth ||
        gl.canvas.height != displayHeight) {
        
        // Make the canvas the same size
        gl.canvas.width  = displayWidth;
        gl.canvas.height = displayHeight;
        
        // Set the viewport to match
        gl.viewport(0, 0, gl.canvas.height, gl.canvas.height);
    }
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
    uLoc[0] = gl.getUniformLocation(p, 'matAxisX');
    uLoc[1] = gl.getUniformLocation(p, 'matAxisY');
    gl.enableVertexAttribArray(aLoc[0]);
}

function draw() {
    // 3次元関数の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    
    // 衛星フォボス（頂点数:25350個）
    var data = phobos;

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

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

        //gl.drawArrays(gl.LINE_STRIP, 0, data.length / 3);
        gl.drawArrays(gl.POINTS, 0, data.length / 3);
        gl.flush();

        // stats 更新
        stats.update();

        requestAnimationFrame(arguments.callee);
    })();
}

initWebGL();
initShaders();
draw();