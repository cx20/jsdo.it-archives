// forked from cx20's "西之島の3Dデータを表示してみる（改）（Babylon.js）" http://jsdo.it/cx20/Anxe
// forked from cx20's "西之島の3Dデータを表示してみる（Babylon.js）" http://jsdo.it/cx20/uZ1S
// forked from cx20's "Babylon.js でカスタムシェーダを使用してみるテスト（その３）" http://jsdo.it/cx20/cMBM
// forked from cx20's "Babylon.js でカスタムシェーダを使用してみるテスト（その２）" http://jsdo.it/cx20/trns
// forked from cx20's "Babylon.js でカスタムシェーダを使用してみるテスト" http://jsdo.it/cx20/xBET
// forked from cx20's "Babylon.js で国土地理院のデータを表示してみるテスト" http://jsdo.it/cx20/cERE
// forked from cx20's "Babylon.js v2.0 を試してみるテスト（その２）" http://jsdo.it/cx20/oo0c
// forked from cx20's "Babylon.js v2.0 を試してみるテスト" http://jsdo.it/cx20/whLL
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    // Now create a basic Babylon Scene object 
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    //camera.setPosition(new BABYLON.Vector3(-40, 20, 50));
    //camera.setPosition(new BABYLON.Vector3(-40, 5, 50));
    camera.setPosition(new BABYLON.Vector3(-40, -5, 50));

    camera.lowerBetaLimit = 1.0;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 15;
    camera.attachControl(canvas, false, false);
    camera.panningSensibility = 50.0;
    camera.angularSensibility = 500;

    scene.activeCamera = camera;

    // box.gltf
    const GLTF_BASE_URL = "https://cx20.github.io/gltf-test/sampleModels/Duck/glTF/";
    const GLTF_FILE_NAME = "Duck.gltf";
    //BABYLON.SceneLoader.Load("https://cx20.github.io/gltf-test/sampleModels/Duck/glTF/", "Duck.gltf", engine, function (newScene) {

    const importPromise = BABYLON.SceneLoader.ImportMeshAsync(null, GLTF_BASE_URL, GLTF_FILE_NAME, scene);
    importPromise.then(function (result) {
        const mesh = result.meshes[1];
        //mesh.position.y += 10;
        //mesh.position.y += 2;
        mesh.position.y -= 0.3;
        mesh.scaling = new BABYLON.Vector3(2, 2, 2);

        const sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

        const light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0.5, 1.0, 0.0), scene);
        
        // Skybox
        const skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene);
        
        const extensions = [
        "../../../../../assets/x/s/Y/k/xsYk8.jpg", // "/../../skybox/dark-s_px.jpg", 
        "../../../../../assets/1/g/O/W/1gOWa.jpg", // "/../../skybox/dark-s_py.jpg", 
        "../../../../../assets/m/7/s/7/m7s7q.jpg", // "/../../skybox/dark-s_pz.jpg", 
        "../../../../../assets/4/x/e/H/4xeHN.jpg", // "/../../skybox/dark-s_nx.jpg", 
        "../../../../../assets/g/V/E/9/gVE9m.jpg", // "/../../skybox/dark-s_ny.jpg", 
        "../../../../../assets/f/D/1/C/fD1Cf.jpg"  // "/../../skybox/dark-s_nz.jpg"
        ];
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene, extensions);
        
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        
        // Ground
        //const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap.png", 100, 100, 100, 0, 20, scene, false);
        const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../../assets/5/u/z/c/5uzcQ.png", 100, 100, 100, 0, 10, scene, false);
        const groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        //groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("../../assets/o/c/f/m/ocfmb.jpg", scene);
        groundMaterial.diffuseTexture.uScale = 1;
        groundMaterial.diffuseTexture.vScale = 1;
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        //ground.position.y = -0.1;
        ground.position.y = -8;
        ground.material = groundMaterial;
        
        // Water
        BABYLON.Engine.ShadersRepository = "";
        const water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
        const waterMaterial = new BABYLON.WaterMaterial("water", scene);
        waterMaterial.bumpTexture = new BABYLON.Texture("../../assets/y/C/c/U/yCcU2.png", scene);
    
        // Water properties
        waterMaterial.waterColor = new BABYLON.Color3(0.0, 0.3, 0.1);
        waterMaterial.waterColorLevel = 0.2;
        waterMaterial.fresnelLevel = 1.0;
        waterMaterial.reflectionLevel = 0.6;
        waterMaterial.refractionLevel = 0.8;
        waterMaterial.waveLength = 0.1;
        waterMaterial.waveHeight = 0.15;
        waterMaterial.waterDirection = new BABYLON.Vector2(0, 1.0);
    
        waterMaterial.addToRenderList(ground);
        waterMaterial.addToRenderList(skybox);
        //waterMaterial.addToRenderList(mesh);
    
        water.material = waterMaterial;
        
        // Animations
        scene.registerBeforeRender(function () {
            scene.activeCamera.alpha += 0.02 * scene.getAnimationRatio();
        });
    });
    

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
