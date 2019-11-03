// forked from cx20's "[WebGL] CubicVR.js を試してみるテスト" http://jsdo.it/cx20/bOkq
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function buildMesh() {
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
    //        [2]------[1]
    //         |        |
    //         |        |
    //         |        |
    //        [3]------[0]
    //
    var mesh = new CubicVR.Mesh({
        material: {
            textures: {
            },
            colorMap: true
        },
        points: [
            [ 0.5, -0.5, 0.0],  // v0
            [ 0.5,  0.5, 0.0],  // v1
            [-0.5,  0.5, 0.0],  // v2
            [-0.5, -0.5, 0.0],  // v3
        ],
        faces: [
            [0, 1, 2, 3]  // v0-v1-v2-v3
        ],
        color: [
            [
                [1, 0, 0], // v0
                [0, 1, 0], // v1
                [0, 0, 1], // v2
                [1, 1, 1]  // v3
            ],
        ],
        compile: true
    });

    return mesh;
}
function webGLStart(gl, canvas) {
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    
    var scene = new CubicVR.Scene({
        camera: {
            width: canvas.width,
            height: canvas.height,
            fov: 30,
            position: [0, 0, 4],
            target: [0, 0, 0]
        },
        sceneObject: {
            name: "square",
            mesh: buildMesh
        }
    });

    var mvc = new CubicVR.MouseViewController(canvas, scene.camera);
    var mesh = scene.getSceneObject("square").getMesh();

    CubicVR.MainLoop(function(timer, gl) {
        scene.render();
    });
}
