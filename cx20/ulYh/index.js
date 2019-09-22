// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）" http://jsdo.it/cx20/KVOj
// forked from cx20's "[WebGL] QTEK を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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
//         |      / |
//         |    /   |
//         |  /     |
//        [2]------[3]
//
var positions = [
    [-0.5, 0.5, 0.0], // v0
    [ 0.5, 0.5, 0.0], // v1 
    [-0.5,-0.5, 0.0], // v2
    [ 0.5,-0.5, 0.0]  // v3
];
var colors = [
    [1.0, 0.0, 0.0, 1.0], // v0
    [0.0, 1.0, 0.0, 1.0], // v1
    [0.0, 0.0, 1.0, 1.0], // v2
    [1.0, 1.0, 0.0, 1.0]  // v3
];
var indices = [
    2, 0, 1, // v2-v0-v1
    2, 1, 3  // v2-v1-v3
];

var app = clay.application.create('#main', {
    init: function (app) {
        // Create a orthographic camera
        var camera = app.createCamera(null, null, 'orthographic');
        // Create a empty geometry and set the triangle vertices
        var geometry = new clay.StaticGeometry();
        geometry.attributes.position.fromArray(positions);
        geometry.attributes.color.fromArray(colors);
        geometry.initIndicesFromArray(indices);

        var vs = document.getElementById('vs').textContent;
        var fs = document.getElementById('fs').textContent;
        var mesh = app.createMesh(geometry, {
            shader: new clay.Shader(vs, fs)
        });
        mesh.frontFace = clay.Renderable.CW;
    },

    loop: function () {}
});