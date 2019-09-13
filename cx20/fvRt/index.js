// forked from cx20's "[簡易版] WebGL で３次元関数にテクスチャを貼り付けてみるテスト" http://jsdo.it/cx20/2IDJ
// forked from cx20's "[簡易版] WebGL で３次元関数をプロットしてみるテスト（その２）（改2）" http://jsdo.it/cx20/fjNW
// forked from cx20's "[簡易版] WebGL で３次元関数をプロットしてみるテスト（その２）（改）" http://jsdo.it/cx20/wdgQ
// forked from cx20's "[簡易版] WebGL で３次元関数をプロットしてみるテスト（その２）（失敗）" http://jsdo.it/cx20/oKlQ
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
var textureCoord = [];

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
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "color");
    aLoc[2] = gl.getAttribLocation(p, "textureCoord");
    uLoc[0] = gl.getUniformLocation(p, 'matAxisX');
    uLoc[1] = gl.getUniformLocation(p, 'matAxisY');
    uLoc[2] = gl.getUniformLocation(p, 'texture');
    uLoc[3] = gl.getUniformLocation(p, 'time');
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
    gl.enableVertexAttribArray(aLoc[2]);
}

function initBuffers() {
    // ＜WebGL 座標系＞
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    // ＜テクスチャ座標系＞
    //    +1.0 t            (s, t)
    //      ^ 
    //      |
    //      |
    //      |
    //      |
    //      |                 s
    //      +-----------------> +1.0
    //  (0.0, 0.0)
    //
    // ＜座標インデックス＞
    //    [0]------[1]------[2]
    //     |     /  |     /  |
    //     |   /    |   /    |
    //     | /      | /      |
    //    [3]------[4]------[5]
    //     |     /  |     /  |
    //     |   /    |   /    |
    //     | /      | /      |
    //    [6]------[7]------[8]
    //
    var WIDTH_SEGMENT = 16;
    var HEIGHT_SEGMENT = 16;
    var WIDTH_SIZE = 0.5 * 2 / WIDTH_SEGMENT;
    var HEIGHT_SIZE = 0.5 * 2 / WIDTH_SEGMENT;
    var row, col;
    var x, y, z;
    var x2, y2, z2;
    for (row = 0; row < (HEIGHT_SEGMENT + 1); row++) {
        for (col = 0; col < (WIDTH_SEGMENT + 1); col++) {
            x = col * WIDTH_SIZE - WIDTH_SEGMENT * WIDTH_SIZE / 2;
            y = (HEIGHT_SEGMENT - row) * HEIGHT_SIZE - HEIGHT_SEGMENT * HEIGHT_SIZE / 2;
            x2 = x * 10;
            y2 = y * 10;
            z2 = Math.sin(Math.sqrt(x2*x2+y2*y2))/Math.sqrt(x2*x2+y2*y2);
            z2 = isNaN( z2 ) ? 1.0 : z2; // 0除算対策
            data = data.concat([x, y, z2/5]);
            colors = colors.concat([x, y, z2/5+0.5, 1.0]);
            // テクスチャ座標を設定する
            textureCoord = textureCoord.concat([x+0.5, y+0.5]); // 座標系を変換
       }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

    for (row = 0; row < HEIGHT_SEGMENT; row++) {
        for (col = 0; col < WIDTH_SEGMENT; col++) {
            //    [b]------[c]
            //     |     /  |
            //     |   /    |
            //     | /      |
            //    [a]------[d]
            //
            var a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
            var b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
            var c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
            var d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
            //indices = indices.concat([a, b, b, c, c, a, a, d, d, c, c, a]);
            indices = indices.concat([a, b, c, a, d, c]);
        }
    }    
    // 座標インデックスをバッファオブジェクトに書き込む
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // テクスチャ座標をバッファオブジェクトに書き込む
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoord), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[2], 2, gl.FLOAT, false, 0, 0);

    // 座標インデックスをバッファオブジェクトに書き込む
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // サンプラにテクスチャユニット0を設定する
    gl.uniform1i(uLoc[0], 0);
}

function draw() {
    // 画像データの読み込み
    var img = new Image();
    img.onload = function(){
        // テクスチャを用意
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 画像のY軸を反転する
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
       
        animate();
    };
    //img.src = "frog.jpg";
    img.src = "../assets/A/k/w/j/AkwjW.jpg";
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
    pos = pos % indices.length;

    rad += Math.PI * 1.0 / 180.0;

    var c = Math.cos(rad);
    var s = Math.sin(rad);

    // uniform float time 
    time = (+new Date - baseTime) / 1000;
    gl.uniform1f(uLoc[3], time);

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

    //gl.drawElements(gl.LINES, pos, gl.UNSIGNED_SHORT, 0);
    //gl.drawElements(gl.TRIANGLES, pos, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    //gl.drawElements(gl.POINTS, pos, gl.UNSIGNED_SHORT, 0);

    gl.flush();
    pos += 4;
}

initWebGL();
initShaders();
initBuffers();
draw();
