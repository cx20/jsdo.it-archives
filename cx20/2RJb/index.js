// forked from cx20's "[WebVR] Babylon.js で WebVR を試してみるテスト（その９）（調整中）" http://jsdo.it/cx20/4nrS
// forked from cx20's "[WebVR] Babylon.js で WebVR を試してみるテスト（その８）（調整中）" http://jsdo.it/cx20/2F1m
// forked from cx20's "[WebVR] Babylon.js で WebVR を試してみるテスト（その７）（調整中）" http://jsdo.it/cx20/Gl5H
///// forked from cx20's "[WebVR] Babylon.js で WebVR を試してみるテスト（その６）（調整中）" http://jsdo.it/cx20/AJDq
// forked from cx20's "[WebVR] Babylon.js で WebVR を試してみるテスト（その５）（調整中）" http://jsdo.it/cx20/qXC9
// forked from cx20's "[WebGL] Babylon.js で WebVR を試してみるテスト（その４）（調整中）" http://jsdo.it/cx20/IVHj
// forked from cx20's "[WebGL] Babylon.js で WebVR を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/Om12
// forked from cx20's "[WebGL] Babylon.js で WebVR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/Ut6C
// forked from cx20's "[WebGL] Babylon.js で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/WPxV
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/jwt0
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

let createScene = function(engine) {
    let scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/cx20/gltf-test/e63efa65/tutorialModels/FlightHelmet/glTF/", "FlightHelmet.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/", "rocks_trees_ao.glb", engine, function (newScene) {
    BABYLON.SceneLoader.Load("https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/88eda8c5/models/FarmLandDiorama/glTF/", "FarmLandDiorama.gltf", engine, function (newScene) {

        let scene = newScene;
        //scene.clearColor = new BABYLON.Color3(191/255, 228/255, 255/255);

        mesh = scene.meshes[0];
        mesh.position.y = -0.1;
        mesh.position.x = 0;

        let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -1.5), scene);
        
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.groundColor = new BABYLON.Color3(1, 1, 1);
        light.intensity = 0.5;
    
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(2, 5, 5), scene);
        light2.intensity = 10.0;
                
        // Enable VR
        let vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
        
        let rad = 0.0;
        engine.runRenderLoop(function () {
            // quaternion
            mesh.rotate(BABYLON.Axis.Y, Math.PI * 0.2 / 180.0, BABYLON.Space.LOCAL);
            scene.render();
        });
    });
    return scene;
}

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
engine.enableOfflineSupport = false; // Suppress manifest reference
window.addEventListener('resize', function() {
    engine.resize();
});
let scene = createScene(engine);
