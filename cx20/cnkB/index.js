// forked from cx20's "[簡易版] WebGL で写真を HeightMap に使ってみるテスト" http://jsdo.it/cx20/bvIU
// forked from cx20's "[簡易版] WebGL で地理院地図3Dデータをプロットしてみるテスト（HeightMap 編）" http://jsdo.it/cx20/qtgW
// forked from cx20's "[簡易版] WebGL で地理院地図3Dデータをプロットしてみるテスト" http://jsdo.it/cx20/dglF
// forked from cx20's "[簡易版] WebGL で３次元関数をプロットしてみるテスト" http://jsdo.it/cx20/8H2X
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
var data = [];
var colors = [];
var indices = [];

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
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "color");
    uLoc[0] = gl.getUniformLocation(p, "matAxisX");
    uLoc[1] = gl.getUniformLocation(p, "matAxisY");
    uLoc[2] = gl.getUniformLocation(p, "time");
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
}

function loadData() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var image = new Image();
    //image.src = "fuji.png";
    //image.src = "/assets/c/C/N/m/cCNmz.png";
    //image.src = "frog.jpg";
    image.src = "../assets/A/k/w/j/AkwjW.jpg";
    image.onload = function() {
        var WIDTH = this.width;
        var HEIGHT = this.height;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx.drawImage(image, 0, 0);
        var img = ctx.getImageData(0, 0, WIDTH, HEIGHT);
        var buffer = img.data;
        var x, y, z;
        var r, g, b, a;
        for (var row = 0; row < HEIGHT; row++) {
            for (var col = 0; col < WIDTH; col++) {
                var pos = (row * HEIGHT + col) * 4;
                x = (col / WIDTH - 0.5) * 2.0;
                y = (row / HEIGHT - 0.5) * 2.0;
                z = (buffer[pos] / 255.0 - 0.5) * 0.2;
                data.push(x);
                data.push(y);
                data.push(z);
                r = buffer[pos+0] / 255.0;
                g = buffer[pos+1] / 255.0;
                b = buffer[pos+2] / 255.0;
                a = 1.0;
                colors.push(r);
                colors.push(g);
                colors.push(b);
                colors.push(a);
            }
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

        animate();

    }
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var pos = 0;
var rad = 0;
var baseTime = +new Date;
var time = 0;

function render() {
    rad += Math.PI * 1.0 / 180.0;

    var c = Math.cos(rad);
    var s = Math.sin(rad);

    // uniform float time 
    time = (+new Date - baseTime) / 1000;
    gl.uniform1f(uLoc[2], time);

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

    gl.drawArrays(gl.POINTS, 0, data.length / 3);

    gl.flush();

    // stats 更新
    stats.update();
}

initWebGL();
initShaders();
loadData();
