// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c = document.getElementById("c");
var gl = twgl.getWebGLContext(c);
var programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

var arrays = {
    position: [ 
         0.0, 0.5, 0.0, // v0
        -0.5,-0.5, 0.0, // v1
         0.5,-0.5, 0.0  // v2
    ]
};

var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

function render() {
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.drawBufferInfo(gl, gl.TRIANGLES, bufferInfo);
    requestAnimationFrame(render);
}

render();
