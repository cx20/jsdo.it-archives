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
    const sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);
    
    camera.setPosition(new BABYLON.Vector3(-40, 20, 50));
    
    // Skybox
    const skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene);
    
    const extensions = [
        "../../../../../assets/e/Y/8/U/eY8Uv.jpg", // "/../../skybox/skybox_px.jpg", 
        "../../../../../assets/l/e/M/D/leMDV.jpg", // "/../../skybox/skybox_py.jpg", 
        "../../../../../assets/x/o/v/B/xovBS.jpg", // "/../../skybox/skybox_pz.jpg", 
        "../../../../../assets/m/X/w/v/mXwvU.jpg", // "/../../skybox/skybox_nx.jpg", 
        "../../../../../assets/b/P/d/Y/bPdYb.jpg", // "/../../skybox/skybox_ny.jpg", 
        "../../../../../assets/h/z/U/B/hzUBa.jpg"  // "/../../skybox/skybox_nz.jpg"
    ];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene, extensions);
    
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    
    // Ground
    //const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap.png", 100, 100, 100, 0, 20, scene, false);
    const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../../assets/A/f/t/J/AftJw.png", 100, 100, 100, 0, 20, scene, false);
    const groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    //groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("../../assets/y/M/D/y/yMDyd.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -2.0;
    ground.material = groundMaterial;
    
    const extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
    const extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
    //extraGroundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
    extraGroundMaterial.diffuseTexture = new BABYLON.Texture("../../assets/y/M/D/y/yMDyd.jpg", scene);
    extraGroundMaterial.diffuseTexture.uScale = 60;
    extraGroundMaterial.diffuseTexture.vScale = 60;
    extraGround.position.y = -2.05;
    extraGround.material = extraGroundMaterial;
    
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

    water.material = waterMaterial;

    camera.attachControl(canvas);

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
