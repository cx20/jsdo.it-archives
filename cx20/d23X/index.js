// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c = document.getElementById("c");
var gl = getWebGLContext(c);
var programInfo = createProgramInfo(gl, ["vs", "fs"]);

var arrays = {
    position: {
        numComponents: 3,
        data: [ 
             0.0, 0.5, 0.0, // v0
            -0.5,-0.5, 0.0, // v1
             0.5,-0.5, 0.0  // v2
        ]
    }
};

var mapping = {
    position: "position"
};

var bufferInfo = createBufferInfoFromArrays(gl, arrays, mapping);

function render() {
    gl.useProgram(programInfo.program);
    setBuffersAndAttributes(gl, programInfo.attribSetters, bufferInfo);
    drawBufferInfo(gl, gl.TRIANGLES, bufferInfo);
    requestAnimationFrame(render);
}

render();
