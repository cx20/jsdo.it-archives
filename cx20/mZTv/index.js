// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
var c, gl;
var aLoc = [];
var fps = 1000 / 30;
var program;
var attribs = {
    position: 0
};

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("webgl") || c.getContext("experimental-webgl");
    resizeCanvas();
    window.addEventListener("resize", function(){
        resizeCanvas();
    });
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    gl.viewport(0, 0, c.width, c.height);
}

function initShaders() {
    program = new WGLUProgram(gl);
    var vsText = document.getElementById("vs").textContent;
    var fsText = document.getElementById("fs").textContent;
    program.attachShaderSource(vsText, gl.VERTEX_SHADER);
    program.attachShaderSource(fsText, gl.FRAGMENT_SHADER); 
    program.link();
    program.use();
    program.bindAttribLocation(attribs);
    gl.enableVertexAttribArray(attribs.position);
}

function initBuffers() {
    var positions = [ 
         0.0, 0.5, 0.0, // v0 
        -0.5,-0.5, 0.0, // v1
         0.5,-0.5, 0.0  // v2
    ];
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(attribs.position, 3, gl.FLOAT, false, 0, 0);
}

function render() {
    draw();
    requestAnimationFrame(render);
}

function draw() {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    gl.flush();
}

window.onload = function() {
    initWebGL();
    initShaders();
    initBuffers();
    render();
};
