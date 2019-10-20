// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/jwt0
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var cube;
var createScene = function(engine) {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    scene.activeCamera.beta += 0.8;
    
    // Enable VR
    var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
    
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    cube = new BABYLON.Mesh.CreateBox('cube', 1.0, scene);
    var material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseTexture = new BABYLON.Texture("../../assets/A/k/w/j/AkwjW.jpg", scene); // frog.jpg
    material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    cube.material = material;

    var rad = 0.0;
    engine.runRenderLoop(function () {
        rad += Math.PI * 1.0 / 180.0;
        cube.rotation.x = rad;
        cube.rotation.y = rad;
        cube.rotation.z = rad;
        scene.render();
    });

    return scene;
}

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
window.addEventListener('resize', function() {
    engine.resize();
});
var scene = createScene(engine);
