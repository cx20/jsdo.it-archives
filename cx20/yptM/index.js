// forked from cx20's "[WebGL] Babylon.js + objFileLoaderを試してみるテスト（失敗）" http://jsdo.it/cx20/eMAN
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/jwt0
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var createScene = function(engine) {

    var scene = new BABYLON.Scene(engine);
    var mesh;
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // box.gltf
    BABYLON.SceneLoader.Load("../../assets/w/b/X/7/", "wbX7Y.gltf", engine, function (newScene) {

        scene = newScene;
        mesh = scene.meshes[0];

        camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 5, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, false, false);
        camera.panningSensibility = 50.0;
        camera.angularSensibility = 500;
        scene.activeCamera = camera;

        var rad = 0.0;
        engine.runRenderLoop(function () {
            scene.render();
            rad += Math.PI * 1.0 / 180.0;
            // quaternion
            mesh.rotate(BABYLON.Axis.X, Math.PI * 1.0 / 180.0, BABYLON.Space.LOCAL);
            mesh.rotate(BABYLON.Axis.Y, Math.PI * 1.0 / 180.0, BABYLON.Space.LOCAL);
            mesh.rotate(BABYLON.Axis.Z, Math.PI * 1.0 / 180.0, BABYLON.Space.LOCAL);
            scene.render();
        });
    });
    return scene;
}

var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);
