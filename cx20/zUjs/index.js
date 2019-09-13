// forked from cx20's "[簡易版] WebGL で四角形を分割してみるテスト（その３）（改）" http://jsdo.it/cx20/v2D1
// forked from cx20's "[簡易版] WebGL で四角形を分割してみるテスト（その３）" http://jsdo.it/cx20/bYto
// forked from cx20's "[簡易版] WebGL で四角形を分割してみるテスト（その２）" http://jsdo.it/cx20/vtc5
// forked from cx20's "[簡易版] WebGL で四角形を分割してみるテスト" http://jsdo.it/cx20/fT6P
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c, gl;
var aLoc = [];
var uLoc = [];
var data = [];
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
    aLoc[1] = gl.getAttribLocation(p, "textureCoord");
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
    
    uLoc[0] = gl.getUniformLocation(p, 'texture');
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
    var WIDTH_SEGMENT = 5;
    var HEIGHT_SEGMENT = 5;
    var WIDTH_SIZE = 0.5 * 2 / WIDTH_SEGMENT;
    var HEIGHT_SIZE = 0.5 * 2 / WIDTH_SEGMENT;
    var row, col;
    var x, y, z;
    for (row = 0; row < (HEIGHT_SEGMENT + 1); row++) {
        for (col = 0; col < (WIDTH_SEGMENT + 1); col++) {
            x = col * WIDTH_SIZE - WIDTH_SEGMENT * WIDTH_SIZE / 2;
            y = (HEIGHT_SEGMENT - row) * HEIGHT_SIZE - HEIGHT_SEGMENT * HEIGHT_SIZE / 2;
            z = 0;
            // 頂点座標を設定する
            data = data.concat([x, y, z]);
            // テクスチャ座標を設定する
            textureCoord = textureCoord.concat([x+0.5, y+0.5]); // 座標系を変換
        }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    // 座標インデックスを設定する
    for (row = 0; row < HEIGHT_SEGMENT; row++) {
        for (col = 0; col < WIDTH_SEGMENT; col++) {
            var a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
            var b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
            var c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
            var d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
            indices = indices.concat([a, b, c, a, d, c]);
            // LINE_STRIP を使うと一筆書きとなる為、左端のポジションにセット
            var b0 = (row) * (WIDTH_SEGMENT + 1) + 0;
            if (col == (WIDTH_SEGMENT - 1)) {
                indices = indices.concat([b0, b0, b0]);
            }
        }
    }    
    // 座標インデックスをバッファオブジェクトに書き込む
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
    // テクスチャ座標をバッファオブジェクトに書き込む
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoord), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 2, gl.FLOAT, false, 0, 0);

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
function render() {
    pos = pos % indices.length;

    //gl.drawElements(gl.LINE_STRIP, pos, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.TRIANGLE_STRIP, pos, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.POINTS, pos, gl.UNSIGNED_SHORT, 0);

    gl.flush();
    pos++;
}

initWebGL();
initShaders();
initBuffers();
draw();
