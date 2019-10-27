// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（VBO 編）（その３）" http://jsdo.it/cx20/eKUR
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（VBO 編）（その２）" http://jsdo.it/cx20/br0W
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（VBO 編）" http://jsdo.it/cx20/b5t6
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl = GL.create();
var mesh = new GL.Mesh({coords: true});
var texture = GL.Texture.fromURL('../../assets/A/k/w/j/AkwjW.jpg');    // frog.jpg

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
mesh.vertices = [
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

mesh.coords = [
    // Front face
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],

    // Back face
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
    [0.0, 0.0],

    // Top face
    [0.0, 1.0],
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],

    // Bottom face
    [1.0, 1.0],
    [0.0, 1.0],
    [0.0, 0.0],
    [1.0, 0.0],

    // Right face
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
    [0.0, 0.0],

    // Left face
    [0.0, 0.0],
    [1.0, 0.0],
    [1.0, 1.0],
    [0.0, 1.0],
];

mesh.triangles = [
    [ 0,  1,  2],  [ 0,  2 , 3],  // Front face
    [ 4,  5,  6],  [ 4,  6 , 7],  // Back face
    [ 8,  9, 10],  [ 8, 10, 11],  // Top face
    [12, 13, 14],  [12, 14, 15],  // Bottom face
    [16, 17, 18],  [16, 18, 19],  // Right face
    [20, 21, 22],  [20, 22, 23]   // Left face
];
mesh.compile();

var shader = new GL.Shader(
    document.getElementById("vs").textContent,
    document.getElementById("fs").textContent
);

var angle = 0;
gl.onupdate = function(seconds) {
    angle += 1.0;
};

gl.ondraw = function() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -3);
    gl.rotate(angle, angle, angle, 0);
    texture.bind(0);
    shader.uniforms({
        texture: 0
    }).draw(mesh);
}

gl.fullscreen();
gl.animate();
