// forked from cx20's "[WebGl] TinyGL.js を試してみるテスト（その３）" http://jsdo.it/cx20/SpWX
// forked from cx20's "[WebGl] TinyGL.js を試してみるテスト（その２）" http://jsdo.it/cx20/c200
// forked from cx20's "[WebGl] TinyGL.js を試してみるテスト" http://jsdo.it/cx20/eZz6
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("c");
//var gl = canvas.getContext("experimental-tinygl");
var gl = canvas.getContext('experimental-tinygl', { flipTextureY: true /* texture data should be flipped along the vertical axis */});

var Angle = 0.0;
var texture_ids;

function init() {
    gl.enable(gl.DEPTH_TEST);
    /* Setup texturing */
    gl.texEnvi(gl.TEXTURE_ENV, gl.TEXTURE_ENV_MODE, gl.DECAL);
    gl.hint(gl.PERSPECTIVE_CORRECTION_HINT, gl.FASTEST);
    
    /* generate texture object IDs */
    texture_ids = gl.genTextures(1);
    
    bind_texture(texture_ids[0], "/assets/A/k/w/j/AkwjW.jpg"); // frog.jpg
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
    gl.bindTexture(gl.TEXTURE_2D, texture_ids[0]);

    // https://www.ntu.edu.sg/home/ehchua/programming/opengl/CG_Examples.html
    gl.enable(gl.TEXTURE_2D);
    gl.begin(gl.QUADS);
        // Define vertices in counter-clockwise (CCW) order with normal pointing out
        gl.texCoord2f(0.0, 0.0);
        gl.vertex3f( 1.0, 1.0, -1.0);
        gl.texCoord2f(1.0, 0.0);
        gl.vertex3f(-1.0, 1.0, -1.0);
        gl.texCoord2f(1.0, 1.0);
        gl.vertex3f(-1.0, 1.0,  1.0);
        gl.texCoord2f(0.0, 1.0);
        gl.vertex3f( 1.0, 1.0,  1.0);
        
        // Bottom face (y = -1.0)
        gl.texCoord2f(0.0, 0.0);
        gl.vertex3f( 1.0, -1.0,  1.0);
        gl.texCoord2f(1.0, 0.0);
        gl.vertex3f(-1.0, -1.0,  1.0);
        gl.texCoord2f(1.0, 1.0);
        gl.vertex3f(-1.0, -1.0, -1.0);
        gl.texCoord2f(0.0, 1.0);
        gl.vertex3f( 1.0, -1.0, -1.0);
        
        // Front face  (z = 1.0)
        gl.texCoord2f(0.0, 0.0);
        gl.vertex3f( 1.0,  1.0, 1.0);
        gl.texCoord2f(1.0, 0.0);
        gl.vertex3f(-1.0,  1.0, 1.0);
        gl.texCoord2f(1.0, 1.0);
        gl.vertex3f(-1.0, -1.0, 1.0);
        gl.texCoord2f(0.0, 1.0);
        gl.vertex3f( 1.0, -1.0, 1.0);
        
        // Back face (z = -1.0)
        gl.texCoord2f(0.0, 0.0);
        gl.vertex3f( 1.0, -1.0, -1.0);
        gl.texCoord2f(1.0, 0.0);
        gl.vertex3f(-1.0, -1.0, -1.0);
        gl.texCoord2f(1.0, 1.0);
        gl.vertex3f(-1.0,  1.0, -1.0);
        gl.texCoord2f(0.0, 1.0);
        gl.vertex3f( 1.0,  1.0, -1.0);
        
        // Left face (x = -1.0)
        gl.texCoord2f(0.0, 0.0);
        gl.vertex3f(-1.0,  1.0,  1.0);
        gl.texCoord2f(1.0, 0.0);
        gl.vertex3f(-1.0,  1.0, -1.0);
        gl.texCoord2f(1.0, 1.0);
        gl.vertex3f(-1.0, -1.0, -1.0);
        gl.texCoord2f(0.0, 1.0);
        gl.vertex3f(-1.0, -1.0,  1.0);
        
        // Right face (x = 1.0)
        gl.texCoord2f(0.0, 0.0);
        gl.vertex3f(1.0,  1.0, -1.0);
        gl.texCoord2f(1.0, 0.0);
        gl.vertex3f(1.0,  1.0,  1.0);
        gl.texCoord2f(1.0, 1.0);
        gl.vertex3f(1.0, -1.0,  1.0);
        gl.texCoord2f(0.0, 1.0);
        gl.vertex3f(1.0, -1.0, -1.0);
    gl.end();
    gl.disable(gl.TEXTURE_2D);

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

function bind_texture(id, url) {
    var img = new Image;
    img.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, id);
        gl.texImage2D(gl.TEXTURE_2D, 0, 4, gl.RGBA, gl.UNSIGNED_BYTE, this);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    };
    img.src = url;
}

function main() {
    init();
    reshape(canvas.width, canvas.height);
    loop();
}

main();
