// forked from cx20's "Babylon.js v2.0 を試してみるテスト" http://jsdo.it/cx20/whLL
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Setup environment
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 150;
    camera.attachControl(canvas, true);

    // light1
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 40, 20);
    light.intensity = 0.5;

    // light2
    var light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(30, 40, 20), new BABYLON.Vector3(-1, -2, -1), 1.1, 1, scene);
    light2.intensity = 0.5;

    // Ground
    //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "./heightMap.png", 100, 100, 100, 0, 10, scene, false);
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../../assets/n/a/T/S/naTSI.png", 100, 100, 100, 0, 10, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    var customProcTextmacadam = new BABYLON.GrassProceduralTexture("customtext", 512, scene);
    groundMaterial.diffuseTexture = customProcTextmacadam;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    ground.position.y = -2.05;
    ground.material = groundMaterial;

    // Animations
    var alpha = 0;
    scene.registerBeforeRender(function () {
        alpha += 0.01;
    });

    return scene;
}

var scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});
