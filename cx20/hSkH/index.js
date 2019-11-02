// forked from cx20's "[WebGL] webgl-utils.js を試してみるテスト" http://jsdo.it/cx20/d23X
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c = document.getElementById("c");
var gl = getWebGLContext(c);
var programInfo = createProgramInfo(gl, ["vs", "fs"]);

var arrays = {
    // 正方形の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //        [0]------[1]
    //         |        |
    //         |        |
    //         |        |
    //        [2]------[3]
    //
    position: { 
        numComponents: 3,
        data: [ 
           -0.5, 0.5, 0.0, // v0
            0.5, 0.5, 0.0, // v1 
           -0.5,-0.5, 0.0, // v2
            0.5,-0.5, 0.0  // v3
        ]
    },
    color: {
        numComponents: 4,
        data: [ 
            1.0, 0.0, 0.0, 1.0, // v0
            0.0, 1.0, 0.0, 1.0, // v1
            0.0, 0.0, 1.0, 1.0, // v2
            1.0, 1.0, 0.0, 1.0  // v3
        ]
    }
};

var mapping = {
    position: "position",
    color: "color"
};

var bufferInfo = createBufferInfoFromArrays(gl, arrays, mapping);

function render() {
    gl.useProgram(programInfo.program);
    setBuffersAndAttributes(gl, programInfo.attribSetters, bufferInfo);
    drawBufferInfo(gl, gl.TRIANGLE_STRIP, bufferInfo);
    requestAnimationFrame(render);
}

render();
