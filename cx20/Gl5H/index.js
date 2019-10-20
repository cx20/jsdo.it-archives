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

let earth;
let cloud;
let createScene = function(engine) {
    let scene = new BABYLON.Scene(engine);

    let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -3), scene);
    
    let light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1.0, -1.0, 0.5), scene);
    light1.intensity = 1;
    
    // Enable VR
    let vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
    
    scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);

    earth = new BABYLON.Mesh.CreateSphere('earth', 30, 2.0, scene);
    let material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseTexture = new BABYLON.Texture("../../assets/g/H/m/v/gHmv8.jpg", scene, true, true); // earth.jpg
    material.bumpTexture = new BABYLON.Texture("../../assets/m/W/T/2/mWT2z.jpg", scene); // earth_normal_1024_rotate180.jpg
    material.specularTexture = new BABYLON.Texture("../../assets/A/4/c/L/A4cLX.jpg", scene); // earth_specular_1024_rotate180.jpg
    material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    earth.material = material;

    cloud = new BABYLON.Mesh.CreateSphere('cloud', 30, 2.0*1.01, scene);
    let material2 = new BABYLON.StandardMaterial("materialCloud", scene);
    material2.diffuseTexture = new BABYLON.Texture("../../assets/c/A/t/b/cAtbg.png", scene, true, true); // earth_clouds_1024_rotate180.png
    material2.diffuseTexture.hasAlpha = true;
    material2.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    cloud.material = material2;

    let rad1 = 0.0;
    let rad2 = 0.0;
    engine.runRenderLoop(function () {
        rad1 -= Math.PI * 0.2 / 180.0;
        rad2 -= Math.PI * 0.3 / 180.0;
        earth.rotation.y = rad1;
        cloud.rotation.y = rad2;
        scene.render();
    });

    return scene;
}

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
window.addEventListener('resize', function() {
    engine.resize();
});
let scene = createScene(engine);
