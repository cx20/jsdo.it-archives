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
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // box.gltf
    //BABYLON.SceneLoader.Load("https://cdn.rawgit.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/", "CesiumMilkTruck.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://cdn.rawgit.com/cx20/jsdo-static-contents/762acc8f/models/gltf/2.0/GrimoireLogo/glTF/", "GrimoireLogo.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/", "MetalRoughSpheres.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/", "scene.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/2bdcb263/polly/", "project_polly.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/", "project_polly.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://cdn.rawgit.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/", "scene.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://cdn.rawgit.com/mrdoob/rome-gltf/784089b4/files/models/life_soup/", "quadruped_fox.gltf", engine, function (newScene) {
    BABYLON.SceneLoader.Load("https://cdn.rawgit.com/pissang/claygl/c4f45119/example/assets/models/SambaDancing/", "SambaDancing.gltf", engine, function (newScene) {

        scene = newScene;
        mesh = scene.meshes[0];

        var camera = new BABYLON.ArcRotateCamera("camera", 0, 1, 5, BABYLON.Vector3.Zero(), scene);
        camera.setPosition( new BABYLON.Vector3(-1, 1, 500) );
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
            //mesh.rotate(BABYLON.Axis.Y, Math.PI * 1.0 / 180.0, BABYLON.Space.LOCAL);
            scene.render();
        });
    });
    return scene;
}

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
window.addEventListener('resize', function() {
    engine.resize();
});
var scene = createScene(engine);
