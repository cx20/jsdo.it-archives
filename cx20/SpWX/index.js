// forked from cx20's "[WebGl] TinyGL.js を試してみるテスト（その２）" http://jsdo.it/cx20/c200
// forked from cx20's "[WebGl] TinyGL.js を試してみるテスト" http://jsdo.it/cx20/eZz6
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("c");
var gl = canvas.getContext("experimental-tinygl");

var Angle = 0.0;

function init() {
    gl.enable(gl.DEPTH_TEST);
    gl.hint(gl.PERSPECTIVE_CORRECTION_HINT, gl.FASTEST);
}

function reshape(w, h) {
    gl.viewport(0, 0, w, h);
    gl.matrixMode(gl.PROJECTION);
    gl.loadIdentity();
    gl.frustum(-1.0, 1.0, -1.0, 1.0, 1, 1000.0);
    gl.matrixMode(gl.MODELVIEW);
    gl.loadIdentity();
    gl.translatef(0.0, 0.0, -3.0);
}

function draw() {
    gl.clearColor(1, 1, 1, 1);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    gl.pushMatrix();
    gl.translatef(0.0, 0.0, 0.0);
    gl.rotatef(Angle, 1.0, 0.0, -1.0);

    // https://www.ntu.edu.sg/home/ehchua/programming/opengl/CG_Examples.html
    gl.begin(gl.QUADS);
        // Define vertices in counter-clockwise (CCW) order with normal pointing out
        gl.color3f(0.0, 1.0, 0.0);     // Green
        gl.vertex3f( 1.0, 1.0, -1.0);
        gl.vertex3f(-1.0, 1.0, -1.0);
        gl.vertex3f(-1.0, 1.0,  1.0);
        gl.vertex3f( 1.0, 1.0,  1.0);
        
        // Bottom face (y = -1.0)
        gl.color3f(1.0, 0.5, 0.0);     // Orange
        gl.vertex3f( 1.0, -1.0,  1.0);
        gl.vertex3f(-1.0, -1.0,  1.0);
        gl.vertex3f(-1.0, -1.0, -1.0);
        gl.vertex3f( 1.0, -1.0, -1.0);
        
        // Front face  (z = 1.0)
        gl.color3f(1.0, 0.0, 0.0);     // Red
        gl.vertex3f( 1.0,  1.0, 1.0);
        gl.vertex3f(-1.0,  1.0, 1.0);
        gl.vertex3f(-1.0, -1.0, 1.0);
        gl.vertex3f( 1.0, -1.0, 1.0);
        
        // Back face (z = -1.0)
        gl.color3f(1.0, 1.0, 0.0);     // Yellow
        gl.vertex3f( 1.0, -1.0, -1.0);
        gl.vertex3f(-1.0, -1.0, -1.0);
        gl.vertex3f(-1.0,  1.0, -1.0);
        gl.vertex3f( 1.0,  1.0, -1.0);
        
        // Left face (x = -1.0)
        gl.color3f(0.0, 0.0, 1.0);     // Blue
        gl.vertex3f(-1.0,  1.0,  1.0);
        gl.vertex3f(-1.0,  1.0, -1.0);
        gl.vertex3f(-1.0, -1.0, -1.0);
        gl.vertex3f(-1.0, -1.0,  1.0);
        
        // Right face (x = 1.0)
        gl.color3f(1.0, 0.0, 1.0);     // Magenta
        gl.vertex3f(1.0,  1.0, -1.0);
        gl.vertex3f(1.0,  1.0,  1.0);
        gl.vertex3f(1.0, -1.0,  1.0);
        gl.vertex3f(1.0, -1.0, -1.0);
    gl.end();

    gl.popMatrix();

    gl.swapBuffers();
}

function loop() {
    tick();
}

function tick() {
    Angle += 2.0;
    draw();
    setTimeout(tick, 33/* 30 fps is required */);
}

function main() {
    init();
    reshape(canvas.width, canvas.height);
    loop();
}

main();
