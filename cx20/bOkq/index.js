// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function buildMesh() {
    var shader = new CubicVR.CustomShader({
        vertex: "#vs",
        fragment: "#fs"
    });
    var mesh = new CubicVR.Mesh({
        material: {
            shader: shader
        },
        points: [
            [ 0.0,  0.5, 0.0], // v0
            [-0.5, -0.5, 0.0], // v1
            [ 0.5, -0.5, 0.0]  // v2
        ],
        faces: [
            [0, 1, 2]
        ],
    });

    mesh.prepare();

    return mesh;
}

function webGLStart(gl, canvas) {
    gl.clearColor(1.0, 1.0 ,1.0, 1.0);
    var scene = new CubicVR.Scene({
        camera: {
            width: canvas.width,
            height: canvas.height,
            fov: 30,
            position: [0, 0, 4],
            target: [0, 0, 0]
        },
        sceneObject: {
            name: "triangle",
            mesh: buildMesh
        }
    });

    var mvc = new CubicVR.MouseViewController(canvas, scene.camera);
    var mesh = scene.getSceneObject("triangle").getMesh();

    CubicVR.MainLoop(function(timer, gl) {
        scene.render();
    });
}
