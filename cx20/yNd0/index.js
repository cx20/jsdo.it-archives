// forked from cx20's "[簡易版] WebGL 2.0 を試してみるテスト" http://jsdo.it/cx20/tYEN
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c, gl;
var aLoc = [];

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("webgl2") || c.getContext("experimental-webgl2");
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
    var v = document.getElementById("vs").textContent;
    var f = document.getElementById("fs").textContent;
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);
    console.log(gl.getShaderInfoLog(vs));
    console.log(gl.getShaderInfoLog(fs));
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "color");
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
}

function draw() {
    var position = [ 
        0.0,  0.5, 0.0, 
       -0.5, -0.5, 0.0, 
        0.5, -0.5, 0.0 
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    var color = [ 
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.flush();
}

initWebGL();
initShaders();
draw();
