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
var data = [];

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");

    // Stats
    stats = new Stats();
    // 左上に設定
    stats.domElement.style.position = "fixed";
    stats.domElement.style.left     = "5px";
    stats.domElement.style.top      = "5px";
    document.body.appendChild(stats.domElement);
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
    uLoc[0] = gl.getUniformLocation(p, 'matPerspective');
    uLoc[1] = gl.getUniformLocation(p, 'time');
    gl.enableVertexAttribArray(aLoc[0]);
}

function initBuffers() {
    // 頂点座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 

    // 小惑星データ（頂点数:25350個）
    data = itokawa;

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var baseTime = +new Date;
var time = 0;
var rad = 0;

function render() {
    var aspect = 1.0;
    var fov = 80;
    var far = 1000;
    var near = 0.0;
    var f = 1.0 / Math.tan(fov / 2);
    var nf = nf = 1 / (near - far);
    var p1 = f / aspect;
    var p2 = f;
    var p3 = (far + near) * nf;
    var p4 = (2 * far * near) * nf;
    
    // 透視投影行列
    var matPerspective = [
        p1,  0.0, 0.0, 0.0,
        0.0, p2,  0.0, 0.0,
        0.0, 0.0, p3, -1.0,
        0.0, 0.0, p4,  0.0
    ];
    gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(matPerspective));

    // uniform float time 
    time = (+new Date - baseTime) / 1000;
    gl.uniform1f(uLoc[1], time);

    gl.drawArrays(gl.POINTS, 0, data.length / 3);
    gl.flush();

    // stats 更新
    stats.update();
}

initWebGL();
initShaders();
initBuffers();
animate();
