// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）（その３）" http://jsdo.it/cx20/gltS
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）（その２）" http://jsdo.it/cx20/ulYh
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）" http://jsdo.it/cx20/KVOj
// forked from cx20's "[WebGL] QTEK を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// 立方体の座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//         [7]------[6]
//        / |      / |
//      [3]------[2] |
//       |  |     |  |
//       | [4]----|-[5]
//       |/       |/
//      [0]------[1]
//
var positions = [
    // Front face
    [-0.5, -0.5,  0.5], // v0
    [ 0.5, -0.5,  0.5], // v1
    [ 0.5,  0.5,  0.5], // v2
    [-0.5,  0.5,  0.5], // v3
    // Back face
    [-0.5, -0.5, -0.5], // v4
    [ 0.5, -0.5, -0.5], // v5
    [ 0.5,  0.5, -0.5], // v6
    [-0.5,  0.5, -0.5], // v7
    // Top face
    [ 0.5,  0.5,  0.5], // v2
    [-0.5,  0.5,  0.5], // v3
    [-0.5,  0.5, -0.5], // v7
    [ 0.5,  0.5, -0.5], // v6
    // Bottom face
    [-0.5, -0.5,  0.5], // v0
    [ 0.5, -0.5,  0.5], // v1
    [ 0.5, -0.5, -0.5], // v5
    [-0.5, -0.5, -0.5], // v4
    // Right face
    [ 0.5, -0.5,  0.5], // v1
    [ 0.5,  0.5,  0.5], // v2
    [ 0.5,  0.5, -0.5], // v6
    [ 0.5, -0.5, -0.5], // v5
    // Left face
    [-0.5, -0.5,  0.5], // v0
    [-0.5,  0.5,  0.5], // v3
    [-0.5,  0.5, -0.5], // v7
    [-0.5, -0.5, -0.5]  // v4
];
var texcoords = [
    // Front face
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
    // Back face
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
    // Top face
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
    // Bottom face
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
    // Right face
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
    // Left face
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1]
];
var indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23   // Left face
];


var app = clay.application.create('#main', {
    init: function (app) {
        // Create a perspective camera
        var camera = app.createCamera(null, null, 'perspective');
        camera.position.set(0, 0, 2.5);
        // Create a empty geometry and set the triangle vertices
        var geometry = new clay.StaticGeometry();
        geometry.attributes.position.fromArray(positions);
        geometry.attributes.texcoord0.fromArray(texcoords);
        geometry.initIndicesFromArray(indices);

        var vs = document.getElementById('vs').textContent;
        var fs = document.getElementById('fs').textContent;
        var material= new clay.Material({
            shader: new clay.Shader(vs, fs)
        });
        var diffuse = new clay.Texture2D;
        diffuse.load("../../assets/A/k/w/j/AkwjW.jpg");
        material.set('texture', diffuse);
        this._mesh = app.createMesh(geometry, material);
        //this._mesh.frontFace = clay.Renderable.CW;
        this._mesh.culling = false;
    },

    loop: function () {
        this._mesh.rotation.rotateX(Math.PI/300);
        this._mesh.rotation.rotateY(Math.PI/300);
    }
});