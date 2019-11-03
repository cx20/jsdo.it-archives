// forked from cx20's "[WebGL] TDL を試してみるテスト（その３）" http://jsdo.it/cx20/5Fo9
// forked from cx20's "[WebGL] TDL を試してみるテスト（その２）" http://jsdo.it/cx20/cKtv
// forked from cx20's "[WebGL] TDL を試してみるテスト" http://jsdo.it/cx20/xUPI
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

//tdl.require('tdl.buffers');
//tdl.require('tdl.models');
//tdl.require('tdl.primitives');
//tdl.require('tdl.programs');
//tdl.require('tdl.webgl');

var math = tdl.math;
var fast = tdl.fast;
var c = document.getElementById("c");
var gl = c.getContext("webgl"); 
var program = tdl.programs.loadProgramFromScriptTags("vs", "fs");

// 立方体の座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//         [7]------[6]
//        / |      / |
//      [3]------[2] |
//       |  |     |  |
//       | [4]----|-[5]
//       |/       |/
//      [0]------[1]
//
var arrays = {
    position: new tdl.primitives.AttribBuffer(
        3, [
            // Front face
            -0.5, -0.5,  0.5, // v0
             0.5, -0.5,  0.5, // v1
             0.5,  0.5,  0.5, // v2
            -0.5,  0.5,  0.5, // v3
            // Back face
            -0.5, -0.5, -0.5, // v4
             0.5, -0.5, -0.5, // v5
             0.5,  0.5, -0.5, // v6
            -0.5,  0.5, -0.5, // v7
            // Top face
             0.5,  0.5,  0.5, // v2
            -0.5,  0.5,  0.5, // v3
            -0.5,  0.5, -0.5, // v7
             0.5,  0.5, -0.5, // v6
            // Bottom face
            -0.5, -0.5,  0.5, // v0
             0.5, -0.5,  0.5, // v1
             0.5, -0.5, -0.5, // v5
            -0.5, -0.5, -0.5, // v4
             // Right face
             0.5, -0.5,  0.5, // v1
             0.5,  0.5,  0.5, // v2
             0.5,  0.5, -0.5, // v6
             0.5, -0.5, -0.5, // v5
             // Left face
            -0.5, -0.5,  0.5, // v0
            -0.5,  0.5,  0.5, // v3
            -0.5,  0.5, -0.5, // v7
            -0.5, -0.5, -0.5  // v4
        ]
    ),
    texcoord: new tdl.primitives.AttribBuffer(
        2, [
            // Front face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Back face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Top face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Bottom face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Right face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Left face
            1, 0,
            0, 0,
            0, 1,
            1, 1
        ]
    ),
    indices: new tdl.primitives.AttribBuffer(1, [
         0,  1,  2,    0,  2 , 3,  // Front face
         4,  5,  6,    4,  6 , 7,  // Back face
         8,  9, 10,    8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15,  // Bottom face
        16, 17, 18,   16, 18, 19,  // Right face
        20, 21, 22,   20, 22, 23   // Left face
    ], 'Uint16Array')
};

var textures = {
    u_texture: new tdl.textures.loadTexture("../../assets/A/k/w/j/AkwjW.jpg")  // frog.jpg
}
var model = new tdl.models.Model(program, arrays, textures, gl.TRIANGLES);

var projection = new Float32Array(16);
var view = new Float32Array(16);
var world = new Float32Array(16);
var viewProjection = new Float32Array(16);
var worldViewProjection = new Float32Array(16);

var eye = new Float32Array([0, 0, -4]);
var target = new Float32Array([0, 0, 0]);
var up = new Float32Array([0, 1, 0]);

var sharedUniforms = {
};

var perObjectUniforms = {
    world: world,
    worldViewProjection: worldViewProjection
};

model.drawPrep(sharedUniforms);
 
var rad = 0;
function render() {
    rad += Math.PI * 1.0 / 180.0;

    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    fast.matrix4.perspective(projection, math.degToRad(30), c.clientWidth / c.clientHeight, 1, 5000);
    fast.matrix4.lookAt(view, eye, target, up);
    fast.matrix4.mul(viewProjection, view, projection);

    tdl.fast.matrix4.identity(world);
    tdl.fast.matrix4.rotateX(world, rad);
    tdl.fast.matrix4.rotateY(world, rad);
    tdl.fast.matrix4.rotateZ(world, rad);
    fast.matrix4.mul(worldViewProjection, world, viewProjection);
    
    model.draw(perObjectUniforms);
    requestAnimationFrame(render);
}

render();
