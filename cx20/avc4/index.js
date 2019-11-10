// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c = document.getElementById('c');
var gl = $gl.getGLContext(c);
resizeCanvas();
window.addEventListener("resize", function(){
    resizeCanvas();
});

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    gl.viewport(0, 0, c.width, c.height);
}

var prg = $gl.setupProgram({
    vertexShader: $gl.getShaderSourceFromDOM('vs'),
    fragmentShader: $gl.getShaderSourceFromDOM('fs') 
});

var position = [
     0.0,  0.5,  0.0,  // v0
    -0.5, -0.5,  0.0,  // v1
     0.5, -0.5,  0.0   // v2
];

var vbo = $gl.createBuffer($gl.ARRAY_BUFFER, position);

var attLoc = [
    gl.getAttribLocation(prg, 'position')
];

gl.enableVertexAttribArray(attLoc[0]);

(function loop() {
    $gl.setupBuffer({
        buffer: vbo,
        index: attLoc[0],
        size: 3
    }); 

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.flush();

    requestAnimationFrame(loop);
}());
