// forked from cx20's "[WebGL] TDL を試してみるテスト" http://jsdo.it/cx20/xUPI
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

//tdl.require('tdl.buffers');
//tdl.require('tdl.models');
//tdl.require('tdl.primitives');
//tdl.require('tdl.programs');
//tdl.require('tdl.webgl');

var c = document.getElementById("c");
var gl = c.getContext("webgl"); 
var program = tdl.programs.loadProgramFromScriptTags("vs", "fs");
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
    position: new tdl.primitives.AttribBuffer(
        3, [
            -0.5, 0.5, 0.0, // v0
             0.5, 0.5, 0.0, // v1 
            -0.5,-0.5, 0.0, // v2
             0.5,-0.5, 0.0  // v3
        ]
    ),
    color: new tdl.primitives.AttribBuffer(
        4, [
            1.0, 0.0, 0.0, 1.0, // v0
            0.0, 1.0, 0.0, 1.0, // v1
            0.0, 0.0, 1.0, 1.0, // v2
            1.0, 1.0, 0.0, 1.0  // v3
        ]
    ),
    indices: new tdl.primitives.AttribBuffer(1, [0, 1, 2, 3], 'Uint16Array')
};

var model = new tdl.models.Model(program, arrays, {}, gl.TRIANGLE_STRIP);

function render() {
    model.drawPrep();
    model.draw();
    requestAnimationFrame(render);
}

render();
