// forked from cx20's "[WebGL] glCubic.js を試してみるテスト" http://jsdo.it/cx20/lRsw
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var prg;
var VBO;
var IBO;

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
var position = [ 
    -0.5, 0.5, 0.0, // v0
     0.5, 0.5, 0.0, // v1 
    -0.5,-0.5, 0.0, // v2
     0.5,-0.5, 0.0  // v3
];

var color = [ 
     1.0, 0.0, 0.0, 1.0, // v0
     0.0, 1.0, 0.0, 1.0, // v1
     0.0, 0.0, 1.0, 1.0, // v2
     1.0, 1.0, 0.0, 1.0  // v3
];

var indices = [0, 1, 2, 3];

function init() {
    gl3.init('c');
    prg = gl3.createProgramFromId(
        'vs',
        'fs',
        ['position' ,'color'],
        [3, 4],
        [],
        []
    );
    
    VBO = [
        gl3.createVbo(position), 
        gl3.createVbo(color)
    ];
    IBO = gl3.createIbo(indices);
}

function render(){
    prg.useProgram();
    prg.setAttribute(VBO, IBO);

    gl3.drawElements(gl3.gl.TRIANGLE_STRIP, indices.length);
}

init();
render();
