var c, gl;
var v = "attribute vec3 position; void main() { gl_Position = vec4(position, 1.0); }";
var f = "precision mediump float; void main() { gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); }";

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
    resizeCanvas();
    window.addEventListener("resize", function(){
        resizeCanvas();
    });
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    //gl.viewport(0, 0, c.width, c.heihgt);
    gl.viewport(window.innerWidth/2 - c.height/2, 0, c.height, c.height); // TODO: Temporarily adjusted to square for full screen display
}

function initShaders() {
    var p = gl.createProgram();
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    gl.bindAttribLocation(p, 0, "position");
    gl.enableVertexAttribArray(0);
}

function draw() {
    var data = [ 0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0 ];
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.flush();
}

initWebGL();
initShaders();
draw();