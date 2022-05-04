// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function (engine) {
    const createFontain = function (name, x, y, z, scene, shadowGenerator, fireMaterial) {
        const fountainSculptur = BABYLON.Mesh.CreateSphere("fountainSculptur", 7, 10, scene);
        fountainSculptur.position = new BABYLON.Vector3(x, y, z);
        fountainSculptur.material = fireMaterial;
        fountainSculptur.rotate(new BABYLON.Vector3(1.0, 0.0, 0.0), Math.PI / 2.0, BABYLON.Space.Local);
        shadowGenerator.getShadowMap().renderList.push(fountainSculptur);
    }
    
    //Ok, enough helpers, let the building start 
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("Camera", 1, 1.2, 25, new BABYLON.Vector3(10, 0, 0), scene);
    camera.upperBetaLimit = 1.2;
    camera.attachControl(canvas, true);

    const fireMaterial = new BABYLON.StandardMaterial("fountainSculptur", scene);
    const fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
    fireMaterial.diffuseTexture = fireTexture;
    fireMaterial.opacityTexture = fireTexture;

    //light
    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-0.5, -1, -0.5), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.groundColor = new BABYLON.Color3(0, 0, 0);
    light.position = new BABYLON.Vector3(20, 40, 20);

    //Creating macadam using a road procedural texture
    const macadam = BABYLON.Mesh.CreateGround("square", 20, 20, 2, scene);
    macadam.position = new BABYLON.Vector3(10, 0, 0);
    const customMaterialmacadam = new BABYLON.StandardMaterial("macadam", scene);
    const customProcTextmacadam = new BABYLON.RoadProceduralTexture("customtext", 512, scene);
    customMaterialmacadam.diffuseTexture = customProcTextmacadam;
    macadam.material = customMaterialmacadam;
    macadam.receiveShadows = true;

    //Applying some shadows
    const shadowGenerator = new BABYLON.ShadowGenerator(512, light);

    //Creating a fountain
    createFontain("fountain", 10, 0.25, 0, scene, shadowGenerator, fireMaterial);

    scene.registerBeforeRender(function () {
        camera.alpha += 0.001 * scene.getAnimationRatio();
    });
    return scene;
};

const scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});
