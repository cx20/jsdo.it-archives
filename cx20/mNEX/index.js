// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var triangle;

function init() {
    $W.initialize();
    $W.camera.setPosition(0, 0, 1.2);
}

function createObjects() {
    triangle = new $W.createObject({
        type: $W.GL.TRIANGLES,
        data: [
            ["vertex", [
                 0.0,  0.5, 0.0, // v0
                -0.5, -0.5, 0.0, // v1
                 0.5, -0.5, 0.0  // v2
            ]],
            ["color",  [
                0, 0, 1, 
                0, 0, 1, 
                0, 0, 1
            ]],
            ["wglu_elements",  [0, 1, 2]]
        ]
    });
}

function start() {
    init();
    createObjects();
    $W.start();
}

start();
