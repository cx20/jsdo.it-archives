// forked from cx20's "[簡易版] WebGL で四角形を分割してみるテスト（その３）" http://jsdo.it/cx20/bYto
// forked from cx20's "[簡易版] WebGL で四角形を分割してみるテスト（その２）" http://jsdo.it/cx20/vtc5
// forked from cx20's "[簡易版] WebGL で四角形を分割してみるテスト" http://jsdo.it/cx20/fT6P
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
var c, gl;
var aLoc = [];
var data = [];
var indices = [];

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
    gl.enableVertexAttribArray(aLoc[0]);
}

function initBuffers() {
    // グリッドのデータを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
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
/*
    var data = [ 
        -0.5,  0.5,  0.0, // v0
         0.0,  0.5,  0.0, // v1
         0.5,  0.5,  0.0, // v2
        -0.5,  0.0,  0.0, // v3
         0.0,  0.0,  0.0, // v4
         0.5,  0.0,  0.0, // v5
        -0.5, -0.5,  0.0, // v6
         0.0, -0.5,  0.0, // v7
         0.5, -0.5,  0.0, // v8
    ];
*/
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
            data = data.concat([x, y, z]);
        }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
/*
    var indices = [
        3, 0, 1, 3, 4, 1,  // v3,0,1 v3,4,1
        4, 1, 2, 4, 5, 2,  // v4,1,2 v4,5,2
        6, 3, 4, 6, 7, 4,  // v6,3,4 v6,7,4
        7, 4, 5, 7, 8, 5   // v7,4,5 v7,8,5
    ];
*/
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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var pos = 0;
function render() {
    pos = pos % indices.length;

    gl.drawElements(gl.LINE_STRIP, pos, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.POINTS, pos, gl.UNSIGNED_SHORT, 0);

    gl.flush();
    pos++;
}

initWebGL();
initShaders();
initBuffers();
animate();
