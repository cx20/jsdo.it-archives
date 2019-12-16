// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
var c, gl;
var v = "attribute vec3 position; void main() { gl_Position = vec4(position, 1.0); }";
var f = "precision mediump float; void main() { gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); }";
var gl_debug;

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
    gl_debug = WebGLDebugUtils.makeDebugContext(gl, undefined, logGLCall);
}

function logGLCall(functionName, args) {
   console.log("gl." + functionName + "(" +
      WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}

function initShaders() {
    var p = gl_debug.createProgram();
    var vs = gl_debug.createShader(gl_debug.VERTEX_SHADER);
    var fs = gl_debug.createShader(gl_debug.FRAGMENT_SHADER);
    gl_debug.shaderSource(vs, v);
    gl_debug.shaderSource(fs, f);
    gl_debug.compileShader(vs);
    gl_debug.compileShader(fs);
    gl_debug.attachShader(p, vs);
    gl_debug.attachShader(p, fs);
    gl_debug.linkProgram(p);
    gl_debug.useProgram(p);
    gl_debug.bindAttribLocation(p, 0, "position");
    gl_debug.enableVertexAttribArray(0);
}

function draw() {
    var data = [ 0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0 ];
    gl_debug.bindBuffer(gl_debug.ARRAY_BUFFER, gl_debug.createBuffer());
    gl_debug.bufferData(gl_debug.ARRAY_BUFFER, new Float32Array(data), gl_debug.STATIC_DRAW);
    gl_debug.vertexAttribPointer(0, 3, gl_debug.FLOAT, false, 0, 0);
    gl_debug.drawArrays(gl_debug.TRIANGLES, 0, 3);
    gl_debug.flush();
}

initWebGL();
initShaders();
draw();

/* 
// 実行結果
gl.createProgram()
gl.createShader(gl.VERTEX_SHADER)
gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource([object WebGLShader], attribute vec3 position; void main() { gl_Position = vec4(position, 1.0); })
gl.shaderSource([object WebGLShader], precision mediump float; void main() { gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); })
gl.compileShader([object WebGLShader])
gl.compileShader([object WebGLShader])
gl.attachShader([object WebGLProgram], [object WebGLShader])
gl.attachShader([object WebGLProgram], [object WebGLShader])
gl.linkProgram([object WebGLProgram])
gl.useProgram([object WebGLProgram])
gl.bindAttribLocation([object WebGLProgram], 0, position)
gl.enableVertexAttribArray(0)
gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, [object WebGLBuffer])
gl.bufferData(gl.ARRAY_BUFFER, 0,0.5,0,-0.5,-0.5,0,0.5,-0.5,0, gl.STATIC_DRAW)
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
gl.drawArrays(gl.TRIANGLES, 0, 3)
gl.flush()
*/
