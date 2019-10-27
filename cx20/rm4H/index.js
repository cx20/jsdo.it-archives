// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl = GL.create();

gl.ondraw = function() {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.translate(0, 0, -2.5);
    gl.color(0.0, 0.0, 1.0);
    gl.begin(gl.TRIANGLES);
    gl.vertex( 0.0, 0.5, 0.0);
    gl.vertex(-0.5,-0.5, 0.0);
    gl.vertex( 0.5,-0.5, 0.0);
    gl.end();
};

gl.fullscreen();
