// forked from cx20's "[WebGL] WebGLU を試してみるテスト" http://jsdo.it/cx20/mNEX
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var square;

function init() {
    $W.initialize();
    $W.camera.setPosition(0, 0, 1.2);
}

function createObjects() {
    square = new $W.createObject({
        type: $W.GL.TRIANGLE_STRIP,
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
        data: [
            ["vertex", [
                -0.5,  0.5,  0.0, // v0
                 0.5,  0.5,  0.0, // v1 
                -0.5, -0.5,  0.0, // v2
                 0.5, -0.5,  0.0  // v3
            ]],
            ["color",  [
                 1.0,  0.0,  0.0, // v0
                 0.0,  1.0,  0.0, // v1
                 0.0,  0.0,  1.0, // v2
                 1.0,  1.0,  0.0  // v3
            ]],
            ["wglu_elements",  [0, 1, 2, 3]]
        ]
    });
}

function start() {
    init();
    createObjects();
    $W.start();
}

start();
