// forked from cx20's "[WebGL] WebGLU を試してみるテスト（その２）" http://jsdo.it/cx20/867h
// forked from cx20's "[WebGL] WebGLU を試してみるテスト" http://jsdo.it/cx20/mNEX
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var cube;

function init() {
    $W.initialize();
    $W.camera.setPosition(0, 0, 2.0);
}

function createObjects() {
    cube = new $W.createObject({
        type: $W.GL.TRIANGLES,
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
        data: [
            ["vertex", [
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
            ]],
            ["color",  [
                1.0, 0.0, 0.0, // Front face
                1.0, 0.0, 0.0, // Front face
                1.0, 0.0, 0.0, // Front face
                1.0, 0.0, 0.0, // Front face
                1.0, 1.0, 0.0, // Back face
                1.0, 1.0, 0.0, // Back face
                1.0, 1.0, 0.0, // Back face
                1.0, 1.0, 0.0, // Back face
                0.0, 1.0, 0.0, // Top face
                0.0, 1.0, 0.0, // Top face
                0.0, 1.0, 0.0, // Top face
                0.0, 1.0, 0.0, // Top face
                1.0, 0.5, 0.5, // Bottom face
                1.0, 0.5, 0.5, // Bottom face
                1.0, 0.5, 0.5, // Bottom face
                1.0, 0.5, 0.5, // Bottom face
                1.0, 0.0, 1.0, // Right face
                1.0, 0.0, 1.0, // Right face
                1.0, 0.0, 1.0, // Right face
                1.0, 0.0, 1.0, // Right face
                0.0, 0.0, 1.0, // Left face
                0.0, 0.0, 1.0, // Left face
                0.0, 0.0, 1.0, // Left face
                0.0, 0.0, 1.0  // Left face
            ]],
            ["wglu_elements",  [
                 0,  1,  2,    0,  2 , 3,  // Front face
                 4,  5,  6,    4,  6 , 7,  // Back face
                 8,  9, 10,    8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15,  // Bottom face
                16, 17, 18,   16, 18, 19,  // Right face
                20, 21, 22,   20, 22, 23   // Left face
            ]]
        ]
    });
}

function start() {
    init();
    createObjects();
    cube.animation._update = function() {
        this.setRotation(this.age / 30, this.age / 30, this.age / 30);
    }
    $W.start();
}

start();
