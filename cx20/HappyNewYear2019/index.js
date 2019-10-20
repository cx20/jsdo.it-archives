// forked from cx20's "Happy New Year 2018" http://jsdo.it/cx20/HappyNewYear2018
// forked from cx20's "Happy New Year 2017" http://jsdo.it/cx20/HappyNewYear2017
// forked from cx20's "GLBoost + Oimo.js で雛(ひよこ)祭" http://jsdo.it/cx20/QkuW

var createScene = function(engine) {

    var scene = new BABYLON.Scene(engine);
    var mesh;
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    BABYLON.SceneLoader.Load("https://rawcdn.githack.com/cx20/jsdo-static-contents/474496ebb2c82ce14f8fb97e48d3ac577b289798/models/gltf/2.0/VoxelBoar/glTF_merge/", "VoxelBoar.glb", engine, function (newScene) {
        scene = newScene;
        mesh = scene.meshes[0];

        var scale = 0.2;
        var modelScaling = mesh.scaling;
        mesh.scaling = new BABYLON.Vector3(modelScaling.x * scale, modelScaling.y * scale, modelScaling.z * scale);

        var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
        camera.setPosition( new BABYLON.Vector3(0, 0, 15) );
        camera.attachControl(canvas, false, false);
        scene.activeCamera = camera;

        // Skybox
        var cubeTexture = new BABYLON.CubeTexture(
            "https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/",
            scene,
            ["px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg"]
        );
        scene.createDefaultSkybox(cubeTexture, true, 10000);

        engine.runRenderLoop(function () {
            scene.activeCamera.alpha -= 0.005;
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
