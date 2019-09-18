// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その２）" http://jsdo.it/cx20/cL80
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト" http://jsdo.it/cx20/KKp9
// forked from cx20's "[WebGL] Babylon.js + glTFFileLoader を試してみるテスト" http://jsdo.it/cx20/yptM
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
    BABYLON.SceneLoader.Load("https://cdn.rawgit.com/cx20/jsdo-static-contents/5635d7da/models/gltf/2.0/EmaSimpleSkin/glTF/", "EmaSimpleSkin.gltf", engine, function (newScene) {

        scene = newScene;
        mesh = scene.meshes[0];

        var camera = new BABYLON.ArcRotateCamera("camera", 0, 1, 5, BABYLON.Vector3.Zero(), scene);
        camera.setPosition( new BABYLON.Vector3(0, 3, -20) );
        camera.attachControl(canvas, false, false);
        scene.activeCamera = camera;

        var light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, 0, 1), scene);
        light1.groundColor = new BABYLON.Color3(1, 0, 0);
        light1.position = new BABYLON.Vector3(20, 40, 20);

        var light2 = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0, 0, -1), scene);
        light2.groundColor = new BABYLON.Color3(1, 0, 0);
        
        var rad = 0.0;
        engine.runRenderLoop(function () {
            scene.render();
            rad += Math.PI * 1.0 / 180.0;
            // quaternion
            //mesh.rotate(BABYLON.Axis.Z, Math.PI * 1.0 / 180.0, BABYLON.Space.LOCAL);
            scene.render();
        });
    });
    return scene;
}

var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);
