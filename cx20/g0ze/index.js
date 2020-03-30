// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その２１）（調整中）" http://jsdo.it/cx20/mEe2
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その２０）（調整中）" http://jsdo.it/cx20/OjW2A
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１９）（調整中）" http://jsdo.it/cx20/MGXb
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１８）（調整中）" http://jsdo.it/cx20/Ws8y
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１７）（調整中）" http://jsdo.it/cx20/eShM
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１６）（調整中）" http://jsdo.it/cx20/ebY5
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/oNe1
// forked from cx20's "[WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/ajqm
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
    var mesh;
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/", "rocks_trees_ao.glb", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/", "PrimaryIonDrive.glb", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/", "LittlestTokyo.glb", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://ft-lab.github.io/gltf/yunomi/", "Yunomi_normal_20.glb", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/", "Material_01.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/", "Material_04.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/", "Material_07.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/mrdoob/three.js/r97/examples/models/gltf/BotSkinned/glTF-MaterialsUnlit/", "Bot_Skinned.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/cx20/gltf-test/7af4f399/tutorialModels/SpecGlossVsMetalRough/glTF/", "SpecGlossVsMetalRough.gltf", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/cx20/jsdo-static-contents/33ab7250/models/gltf/2.0/Itokawa/glTF-Draco/", "Itokawa.glb", engine, function (newScene) {
    //BABYLON.SceneLoader.Load("https://rawcdn.githack.com/BabylonJS/Exporters/9bc140006be149687be045f60b4a25cdb45ce4fc/Maya/Samples/glTF 2.0/T-Rex/", "trex_running.gltf", engine, function (newScene) {
    BABYLON.SceneLoader.Load("https://rawcdn.githack.com/cx20/jsdo-static-contents/ef789b017e86ed960bd38df4617fadbbfbd245ec/models/gltf/2.0/Kaendoki/glTF-Binary/", "Kaendoki.glb", engine, function (newScene) {

        scene = newScene;
        mesh = scene.meshes[0];

        var scale = 0.02;
        var modelScaling = mesh.scaling;
        mesh.scaling = new BABYLON.Vector3(modelScaling.x * scale, modelScaling.y * scale, modelScaling.z * scale);
        mesh.position.y -= 2;

        var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
        camera.setPosition( new BABYLON.Vector3(0, 5, 15) );
        camera.attachControl(canvas, false, false);
        scene.activeCamera = camera;

        //scene.forceShowBoundingBoxes = true;
        
        //var light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, 0, 1), scene);
        //light1.groundColor = new BABYLON.Color3(1, 0, 0);
        //light1.position = new BABYLON.Vector3(20, 40, 20);

        var light2 = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0, 0, -1), scene);
        light2.groundColor = new BABYLON.Color3(1, 0, 0);
        
        // Skybox
/*
        var cubeTexture = new BABYLON.CubeTexture(
            "https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/", // "../../textures/cube/skybox/",
            scene,
            ["px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg"]
        );
*/
        var cubeTexture = new BABYLON.CubeTexture("https://cx20.github.io/gltf-test/textures/env/papermillSpecularHDR.env", scene);
        scene.createDefaultSkybox(cubeTexture, true, 10000);

        var rad = 0.0;
        engine.runRenderLoop(function () {
            scene.render();
            // quaternion
            mesh.rotate(BABYLON.Axis.Y, Math.PI * 0.5 / 180.0, BABYLON.Space.LOCAL);
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
