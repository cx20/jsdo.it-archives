// forked from cx20's "[WebGL] WebGL Helper を試してみるテスト" http://jsdo.it/cx20/avc4
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c = document.getElementById('c');
var gl = $gl.getGLContext(c);

var prg = $gl.setupProgram({
    vertexShader: $gl.getShaderSourceFromDOM('vs'),
    fragmentShader: $gl.getShaderSourceFromDOM('fs') 
});

// 正方形の座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//        [0]------[1]
//         |        |
//         |        |
//         |        |
//        [2]------[3]
//
var position = [
    -0.5, 0.5, 0.0, // v0
     0.5, 0.5, 0.0, // v1 
    -0.5,-0.5, 0.0, // v2
     0.5,-0.5, 0.0  // v3
];

var colors = [
    1.0, 0.0, 0.0, 1.0, // v0
    0.0, 1.0, 0.0, 1.0, // v1
    0.0, 0.0, 1.0, 1.0, // v2
    1.0, 1.0, 0.0, 1.0  // v3
];

var vbo = $gl.createBuffer($gl.ARRAY_BUFFER, position);
var color_vbo = $gl.createBuffer($gl.ARRAY_BUFFER, colors);

var attLoc = [
    gl.getAttribLocation(prg, 'position'),
    gl.getAttribLocation(prg, 'color')
];

gl.enableVertexAttribArray(attLoc[0]);
gl.enableVertexAttribArray(attLoc[1]);

(function loop() {
    $gl.setupBuffer({
        buffer: vbo,
        index: attLoc[0],
        size: 3
    }); 

    $gl.setupBuffer({
        buffer: color_vbo,
        index: attLoc[1],
        size: 4
    });

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.flush();

    requestAnimationFrame(loop);
}());
