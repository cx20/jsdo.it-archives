// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（その２）" http://jsdo.it/cx20/ejpI
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl = GL.create();
var mesh = GL.Mesh.cube({colors: true});
mesh.colors = [
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [0.0, 0.0, 1.0, 1.0], // Left face
    [0.0, 0.0, 1.0, 1.0], // Left face
    [0.0, 0.0, 1.0, 1.0], // Left face
    [0.0, 0.0, 1.0, 1.0]  // Left face
];
mesh.compile();

var vs = document.getElementById("vs").textContent;
var fs = document.getElementById("fs").textContent;
var shader = new GL.Shader(vs, fs);

var angle = 0;
gl.onupdate = function(seconds) {
    angle += 1.0;
};

gl.ondraw = function() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -5);
    gl.rotate(angle, angle, angle, 0);

    shader.draw(mesh);
};

gl.enable(gl.DEPTH_TEST);
gl.fullscreen();
gl.animate();
