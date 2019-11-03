// forked from cx20's "[WebGL] CubicVR.js を試してみるテスト（その３）" http://jsdo.it/cx20/yGJm
// forked from cx20's "[WebGL] CubicVR.js を試してみるテスト（その２）" http://jsdo.it/cx20/rhim
// forked from cx20's "[WebGL] CubicVR.js を試してみるテスト" http://jsdo.it/cx20/bOkq
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function buildMesh() {


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
    //         [6]------[5]
    //        / |      / |
    //      [2]------[1] |
    //       |  |     |  |
    //       | [7]----|-[4]
    //       |/       |/
    //      [3]------[0]
    //
    var mesh = new CubicVR.Mesh({
        material: {
            textures: {
                color: new CubicVR.Texture("../../assets/A/k/w/j/AkwjW.jpg")  // frog.jpg
            },
            colorMap: false
        },
        points: [
            [ 0.5,-0.5, 0.5], // v0
            [ 0.5, 0.5, 0.5], // v1
            [-0.5, 0.5, 0.5], // v2
            [-0.5,-0.5, 0.5], // v3
            [ 0.5,-0.5,-0.5], // v4
            [ 0.5, 0.5,-0.5], // v5
            [-0.5, 0.5,-0.5], // v6
            [-0.5,-0.5,-0.5]  // v7
        ],
        faces: [
            [0, 1, 2, 3], // Front face
            [7, 6, 5, 4], // Back face
            [4, 5, 1, 0], // Right face
            [5, 6, 2, 1], // Top face
            [6, 7, 3, 2], // Left face
            [7, 4, 0, 3]  // Buttom face
        ],
        uv: [
            [[0, 1],[1, 1],[1, 0],[0, 0]], // Front face
            [[0, 1],[1, 1],[1, 0],[0, 0]], // Back face
            [[0, 1],[1, 1],[1, 0],[0, 0]], // Right face
            [[0, 1],[1, 1],[1, 0],[0, 0]], // Top face
            [[0, 1],[1, 1],[1, 0],[0, 0]], // Left face
            [[0, 1],[1, 1],[1, 0],[0, 0]]  // Buttom face
        ],
        color: [
            [[1, 0, 0],[1, 0, 0],[1, 0, 0],[1, 0, 0]],         // Front face
            [[1, 1, 0],[1, 1, 0],[1, 1, 0],[1, 1, 0]],         // Back face
            [[0, 1, 0],[0, 1, 0],[0, 1, 0],[0, 1, 0]],         // Right face
            [[1,0.5,0.5],[1,0.5,0.5],[1,0.5,0.5],[1,0.5,0.5]], // Top face
            [[1, 0, 1],[1, 0, 1],[1, 0, 1],[1, 0, 1]],         // Left face
            [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1]]          // Buttom face
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
            name: "cube",
            mesh: buildMesh
        }
    });

    var mvc = new CubicVR.MouseViewController(canvas, scene.camera);
    var sphereObject = scene.getSceneObject("cube");
    var angle = 0;

    CubicVR.MainLoop(function(timer, gl) {
        angle += 1.0;
        sphereObject.rotation[0] = angle;
        sphereObject.rotation[1] = angle;
        sphereObject.rotation[2] = angle;
        scene.render();
    });
}
