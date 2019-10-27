// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（その３）" http://jsdo.it/cx20/elUj
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト（その２）" http://jsdo.it/cx20/ejpI
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl = GL.create();
var mesh = GL.Mesh.cube({coords: true});
var texture = GL.Texture.fromURL('../../assets/A/k/w/j/AkwjW.jpg');    // frog.jpg

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

    texture.bind(0);
    shader.uniforms({
        texture: 0
    }).draw(mesh);
};

gl.enable(gl.DEPTH_TEST);
gl.fullscreen();
gl.animate();
