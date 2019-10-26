// forked from cx20's "[簡易版] WebGL 2.0 を試してみるテスト" http://jsdo.it/cx20/tYEN
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

(function () {
    'use strict';

    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    var gl = canvas.getContext('webgl2', { antialias: false });
    var isWebGL2 = !!gl;
    if(!isWebGL2) {
        alert('WebGL 2 is not available.');
        return;
    }
    
    var program = createProgram(gl, getShaderSource('vs'), getShaderSource('fs'));
    gl.useProgram(program);
    
    var vertices = new Float32Array([
        -0.5, -0.5,
        0.5, -0.5,
        0.0,  0.5
    ]);
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    var vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);
    
    var vertexPosLocation = 0;
    gl.enableVertexAttribArray(vertexPosLocation);
    gl.vertexAttribPointer(vertexPosLocation, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindVertexArray(null);
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.bindVertexArray(vertexArray);
    
    var n = 10;
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, n);
    
    gl.deleteBuffer(vertexPosBuffer);
    gl.deleteProgram(program);
    gl.deleteVertexArray(vertexArray);

})();