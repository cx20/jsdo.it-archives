// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（VBO 編）" http://jsdo.it/cx20/b5t6
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl = GL.create();
var mesh = new GL.Mesh({colors:true});

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
mesh.vertices = [
    [-0.5, 0.5, 0.0], // v0
    [ 0.5, 0.5, 0.0], // v1 
    [-0.5,-0.5, 0.0], // v2
    [ 0.5,-0.5, 0.0]  // v3
];

mesh.colors = [
    [1.0, 0.0, 0.0, 1.0], // v0
    [0.0, 1.0, 0.0, 1.0], // v1
    [0.0, 0.0, 1.0, 1.0], // v2
    [1.0, 1.0, 0.0, 1.0]  // v3
];

mesh.triangles = [[2, 0, 1], [2, 3, 1]];
mesh.compile();

var shader = new GL.Shader(
    document.getElementById("vs").textContent,
    document.getElementById("fs").textContent
);

gl.ondraw = function() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    shader.draw(mesh);
}

gl.fullscreen();
gl.animate();
