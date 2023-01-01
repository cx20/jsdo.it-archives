// forked from cx20's "Happy New Year 2018" http://jsdo.it/cx20/HappyNewYear2018
// forked from cx20's "Happy New Year 2017" http://jsdo.it/cx20/HappyNewYear2017
// forked from cx20's "GLBoost + Oimo.js で雛(ひよこ)祭" http://jsdo.it/cx20/QkuW

const createScene = function(engine) {

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    BABYLON.SceneLoader.Load("https://rawcdn.githack.com/cx20/jsdo-static-contents/8622ac8912e25caa6ce49dc17e24be15541929b9/models/gltf/2.0/StanfordBunny/", "StanfordBunny.glb", engine, function (newScene) {
        const scene = newScene;
        const mesh = scene.meshes[0];
        const bunny = scene.getMeshByName("Object_2");
        bunny.material.wireframe = true;

        const scale = 50;
        const modelScaling = mesh.scaling;
        mesh.scaling = new BABYLON.Vector3(modelScaling.x * scale, modelScaling.y * scale, modelScaling.z * scale);
        mesh.position.y = -5;

        const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
        camera.setPosition( new BABYLON.Vector3(0, 0, 15) );
        camera.attachControl(canvas, false, false);
        scene.activeCamera = camera;

        // Skybox
        const cubeTexture = new BABYLON.CubeTexture(
            "https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/",
            scene,
            ["px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg"]
        );
        scene.createDefaultSkybox(cubeTexture, true, 10000);

        engine.runRenderLoop(function () {
            scene.activeCamera.alpha -= 0.005 * scene.getAnimationRatio();
            scene.render();
        });
    });
    return scene;
}

const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
engine.enableOfflineSupport = false; // Suppress manifest reference
window.addEventListener('resize', function() {
    engine.resize();
});
const scene = createScene(engine);
