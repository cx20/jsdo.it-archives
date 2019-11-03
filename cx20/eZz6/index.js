// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("c");
var gl = canvas.getContext("experimental-tinygl");

gl.viewport(0, 0, canvas.width, canvas.height);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

gl.matrixMode(gl.PROJECTION);
gl.loadIdentity();
gl.frustum(-1.0, 1.0, -1.0, 1.0, 1, 100.0);
gl.matrixMode(gl.MODELVIEW);
gl.loadIdentity();
gl.translatef(0.0, 0.0, -1.0);

gl.color3f(0, 0, 1);
gl.begin(gl.TRIANGLES);
    gl.vertex3f( 0.0,  0.5, 0.0);
    gl.vertex3f(-0.5, -0.5, 0.0);
    gl.vertex3f( 0.5, -0.5, 0.0);
gl.end();

gl.flush();

gl.swapBuffers();