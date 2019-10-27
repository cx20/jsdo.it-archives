// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（VBO 編）（その３）" http://jsdo.it/cx20/eKUR
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（VBO 編）（その２）" http://jsdo.it/cx20/br0W
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（VBO 編）" http://jsdo.it/cx20/b5t6
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl = GL.create();

var a = CSG.cube();
var b = CSG.sphere({radius: 1.3});
a.setColor(0.5, 1, 0);
b.setColor(0, 0.5, 1);
var c = a.subtract(b); // c = a - b
var mesh = c.toMesh();

var shader = new GL.Shader(
    document.getElementById("vs").textContent,
    document.getElementById("fs").textContent
);

var angle = 1;
gl.onupdate = function(seconds) {
    //angle += 0.05;
};

gl.translate(0, 0, -5);
gl.ondraw = function() {
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.rotate(angle, angle, angle, 0);
    shader.draw(mesh);
};

gl.fullscreen();
gl.animate();
