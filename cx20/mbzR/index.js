// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl = GL.create({width: 465, height:465});
document.body.appendChild(gl.canvas);

var vertices = [
     0.0, 0.5, 0.0, 
    -0.5,-0.5, 0.0, 
     0.5,-0.5, 0.0
];

var mesh = GL.Mesh.load({vertices: vertices});

var shader = new GL.Shader(
    document.getElementById("vs").textContent,
    document.getElementById("fs").textContent
);

var mode = gl.TRIANGLES;

gl.ondraw = function() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    shader.draw(mesh, mode);
}

gl.animate();
