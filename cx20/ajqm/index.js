// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１３）（調整中）" http://jsdo.it/cx20/eFaZ
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１２）（調整中）" http://jsdo.it/cx20/4D3s
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１１）（調整中）" http://jsdo.it/cx20/Kxcp
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/Wij6
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その９）（調整中）" http://jsdo.it/cx20/gu06
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その８）（調整中）" http://jsdo.it/cx20/aGqk
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その７）" http://jsdo.it/cx20/eqP2
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その６）" http://jsdo.it/cx20/8tlG
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その５）（調整中）" http://jsdo.it/cx20/On4X
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その４）" http://jsdo.it/cx20/4ELKC
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/U1kH
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
    var gl = engine._gl;
    
    var mesh;
    scene.clearColor = new BABYLON.Color3(1, 0, 0);

    //BABYLON.SceneLoader.Load("https://cdn.rawgit.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/", "rocks_trees_ao.glb", engine, function (newScene) {
    BABYLON.SceneLoader.Load("https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/gltf/", "PrimaryIonDrive.glb", engine, function (newScene) {

        scene = newScene;
        //scene.clearColor = new BABYLON.Color3(191/255, 228/255, 255/255);
        scene.clearColor = new BABYLON.Color3(0, 0, 0);
        mesh = scene.meshes[0];
        mesh.position.y = -2
        mesh.position.x = 0;
        
        var scale = 10.0;
        var modelScaling = mesh.scaling;
        mesh.scaling = new BABYLON.Vector3(modelScaling.x * scale, modelScaling.y * scale, modelScaling.z * scale);
        
        var camera = new BABYLON.ArcRotateCamera("camera", 0, 1, 5, BABYLON.Vector3.Zero(), scene);
        //camera.setPosition( new BABYLON.Vector3(-1, 1, 10) );
        camera.setPosition( new BABYLON.Vector3(40, 10, -30) );
        camera.attachControl(canvas, false, false);
        scene.activeCamera = camera;


        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.groundColor = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.5;
    
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(2, 5, 5), scene);
        light2.intensity = 10.0;
        
        var rad = 0.0;
        engine.runRenderLoop(function () {
            scene.render();
            // quaternion
            //mesh.rotate(BABYLON.Axis.Y, Math.PI * 0.2 / 180.0, BABYLON.Space.LOCAL);
            scene.render();
        });
    });
    return scene;
}

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
engine.enableOfflineSupport = false; // Suppress manifest reference

window.addEventListener('resize', function() {
    engine.resize();
});
var scene = createScene(engine);
