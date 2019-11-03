// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

tdl.require('tdl.buffers');
tdl.require('tdl.models');
tdl.require('tdl.primitives');
tdl.require('tdl.programs');
tdl.require('tdl.webgl');

var c = document.getElementById("c");
var gl = c.getContext("webgl"); 
var program = tdl.programs.loadProgramFromScriptTags("vs", "fs");
var arrays = {
    position: new tdl.primitives.AttribBuffer(
        3, [
             0.0,  0.5, 0.0, // v0
            -0.5, -0.5, 0.0, // v1
             0.5, -0.5, 0.0  // v2
        ]
    ),
    indices: new tdl.primitives.AttribBuffer(1, [0, 1, 2], 'Uint16Array')
};

var model = new tdl.models.Model(program, arrays, {}, gl.TRIANGLES);

function render() {
    model.drawPrep();
    model.draw();
    requestAnimationFrame(render);
}

render();
