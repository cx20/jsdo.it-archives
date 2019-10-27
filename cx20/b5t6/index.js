// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl = GL.create();
var mesh = new GL.Mesh();
mesh.vertices = [
    [ 0.0, 0.5, 0.0], 
    [-0.5,-0.5, 0.0], 
    [ 0.5,-0.5, 0.0]
];

mesh.triangles = [[0, 1, 2]];
mesh.compile();

var shader = new GL.Shader(
    document.getElementById("vs").textContent,
    document.getElementById("fs").textContent
);

gl.ondraw = function() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    shader.draw(mesh);
}

gl.fullscreen();
gl.animate();
