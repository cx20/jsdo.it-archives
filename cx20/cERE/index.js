// forked from cx20's "Babylon.js v2.0 を試してみるテスト（その２）" http://jsdo.it/cx20/oo0c
// forked from cx20's "Babylon.js v2.0 を試してみるテスト" http://jsdo.it/cx20/whLL
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Setup environment
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 1.2, 90, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 150;
    camera.attachControl(canvas, true);

    // light1
    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 40, 20);
    light.intensity = 0.5;

    // light2
	const light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(30, 40, 20), new BABYLON.Vector3(-1, -2, -1), Math.PI / 2, 10, scene);
    light2.intensity = 0.5;

    // Ground
    //const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "./heightMap.png", 100, 100, 100, 0, 10, scene, false);
    //const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/assets/n/a/T/S/naTSI.png", 100, 100, 100, 0, 10, scene, false);
    const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../../assets/c/C/N/m/cCNmz.png", 100, 100, 100, 0, 20, scene, false);
    const groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    const customProcTextmacadam = new BABYLON.GrassProceduralTexture("customtext", 512, scene); // 芝
    groundMaterial.diffuseTexture = customProcTextmacadam;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    ground.position.y = -2.05;
    ground.material = groundMaterial;

    // Animations
    scene.registerBeforeRender(function () {
        scene.activeCamera.alpha += 0.005 * scene.getAnimationRatio();
    });

    return scene;
}

const scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});
