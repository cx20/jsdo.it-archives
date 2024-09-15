// forked from cx20's "海に某未確認飛行物体を追加してみるテスト" https://cx20.github.io/jsdo.it-archives/cx20/d38T/
// forked from cx20's "Three.js の海のサンプルに飛行石を追加してみるテスト" http://jsdo.it/cx20/uikZ
// forked from cx20's "Three.js + Water Shader を試してみるテスト" http://jsdo.it/cx20/5hXN
// forked from Jérémy BOUNY's "Ocean" https://github.com/jbouny/ocean/tree/master/demo

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 500, new BABYLON.Vector3(0, 100, 0), scene);
    camera.attachControl(canvas, true);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Skybox
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:5000.0}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    const extensions = [
        "../../../../../assets/e/Y/8/U/eY8Uv.jpg", // "/../../skybox/skybox_px.jpg", 
        "../../../../../assets/l/e/M/D/leMDV.jpg", // "/../../skybox/skybox_py.jpg", 
        "../../../../../assets/x/o/v/B/xovBS.jpg", // "/../../skybox/skybox_pz.jpg", 
        "../../../../../assets/m/X/w/v/mXwvU.jpg", // "/../../skybox/skybox_nx.jpg", 
        "../../../../../assets/b/P/d/Y/bPdYb.jpg", // "/../../skybox/skybox_ny.jpg", 
        "../../../../../assets/h/z/U/B/hzUBa.jpg"  // "/../../skybox/skybox_nz.jpg"
    ];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene, extensions);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    
    // Water
    BABYLON.Engine.ShadersRepository = "";
    const water = BABYLON.MeshBuilder.CreateGround("waterMesh", {width: 5000, height: 5000}, scene);
    const waterMaterial = new BABYLON.WaterMaterial("water", scene);
    //waterMaterial.bumpTexture = new BABYLON.Texture("textures/waterbump.png", scene);
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
    waterMaterial.addToRenderList(skybox);

    water.material = waterMaterial;

    const SIZE = 10;
    const L_SIZE = 3;
    const M_SIZE = 2;
    const S_SIZE = 1;
    
    const cubes = [
        // 大サイズ
        { x: 3+L_SIZE/2  , y: 3+L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
        { x:-3-L_SIZE/2  , y: 3+L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
        { x:-3-L_SIZE/2  , y:-3-L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
        { x: 3+L_SIZE/2  , y:-3-L_SIZE/2  , z: 3+L_SIZE/2  , size:L_SIZE },
        { x: 3+L_SIZE/2  , y: 3+L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
        { x:-3-L_SIZE/2  , y: 3+L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
        { x:-3-L_SIZE/2  , y:-3-L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
        { x: 3+L_SIZE/2  , y:-3-L_SIZE/2  , z:-3-L_SIZE/2  , size:L_SIZE },
        // 中サイズ
        { x: 1+M_SIZE/2  , y: 4+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
        { x:-4-M_SIZE/2  , y: 1+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
        { x:-1-M_SIZE/2  , y:-4-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
        { x: 4+M_SIZE/2  , y:-1-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
        { x: 4+M_SIZE/2  , y: 1+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
        { x:-1-M_SIZE/2  , y: 4+M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
        { x:-4-M_SIZE/2  , y:-1-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
        { x: 1+M_SIZE/2  , y:-4-M_SIZE/2  , z: 4+M_SIZE/2  , size:M_SIZE },
        
        { x: 1+M_SIZE/2  , y: 4+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
        { x:-4-M_SIZE/2  , y: 1+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
        { x:-1-M_SIZE/2  , y:-4-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
        { x: 4+M_SIZE/2  , y:-1-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
        { x: 4+M_SIZE/2  , y: 1+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
        { x:-1-M_SIZE/2  , y: 4+M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
        { x:-4-M_SIZE/2  , y:-1-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },
        { x: 1+M_SIZE/2  , y:-4-M_SIZE/2  , z:-4-M_SIZE/2  , size:M_SIZE },

        { x: 4+M_SIZE/2  , y: 4+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
        { x:-4-M_SIZE/2  , y: 4+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
        { x:-4-M_SIZE/2  , y:-4-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
        { x: 4+M_SIZE/2  , y:-4-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
        { x: 4+M_SIZE/2  , y: 4+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
        { x:-4-M_SIZE/2  , y: 4+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
        { x:-4-M_SIZE/2  , y:-4-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
        { x: 4+M_SIZE/2  , y:-4-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
        
        // 内側の中サイズの立方体
        { x: 1+M_SIZE/2  , y: 1+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
        { x:-1-M_SIZE/2  , y: 1+M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
        { x:-1-M_SIZE/2  , y:-1-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
        { x: 1+M_SIZE/2  , y:-1-M_SIZE/2  , z: 1+M_SIZE/2  , size:M_SIZE },
        { x: 1+M_SIZE/2  , y: 1+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
        { x:-1-M_SIZE/2  , y: 1+M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
        { x:-1-M_SIZE/2  , y:-1-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
        { x: 1+M_SIZE/2  , y:-1-M_SIZE/2  , z:-1-M_SIZE/2  , size:M_SIZE },
        // 中央の中サイズの立方体
        { x: 0           , y: 0           , z: 0           , size:M_SIZE },

        // 小サイズ
        { x: 0+S_SIZE/2  , y: 5+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
        { x:-5-S_SIZE/2  , y: 0+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
        { x:-0-S_SIZE/2  , y:-5-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
        { x: 5+S_SIZE/2  , y:-0-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
        { x: 5+S_SIZE/2  , y: 0+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
        { x:-0-S_SIZE/2  , y: 5+S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
        { x:-5-S_SIZE/2  , y:-0-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },
        { x: 0+S_SIZE/2  , y:-5-S_SIZE/2  , z: 5+S_SIZE/2  , size:S_SIZE },

        { x: 0+S_SIZE/2  , y: 5+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
        { x:-5-S_SIZE/2  , y: 0+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
        { x:-0-S_SIZE/2  , y:-5-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
        { x: 5+S_SIZE/2  , y:-0-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
        { x: 5+S_SIZE/2  , y: 0+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
        { x:-0-S_SIZE/2  , y: 5+S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
        { x:-5-S_SIZE/2  , y:-0-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },
        { x: 0+S_SIZE/2  , y:-5-S_SIZE/2  , z:-5-S_SIZE/2  , size:S_SIZE },

        { x: 5+S_SIZE/2  , y: 5+S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
        { x:-5-S_SIZE/2  , y: 5+S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
        { x:-5-S_SIZE/2  , y:-5-S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
        { x: 5+S_SIZE/2  , y:-5-S_SIZE/2  , z: 0+S_SIZE/2  , size:S_SIZE },
        { x: 5+S_SIZE/2  , y: 5+S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
        { x:-5-S_SIZE/2  , y: 5+S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
        { x:-5-S_SIZE/2  , y:-5-S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE },
        { x: 5+S_SIZE/2  , y:-5-S_SIZE/2  , z:-0-S_SIZE/2  , size:S_SIZE }
    ];
    
    // Create a parent node for all cubes
    const cubeParent = new BABYLON.TransformNode("cubeParent", scene);
    
    const meshes = cubes.map(cube => {
        const box = BABYLON.MeshBuilder.CreateBox("box", {
            width: cube.size * SIZE,
            height: cube.size * SIZE,
            depth: cube.size * SIZE
        }, scene);
        box.position = new BABYLON.Vector3(
            cube.x * SIZE * 1.02,
            cube.y * SIZE * 1.02,
            cube.z * SIZE * 1.02
        );
        const material = new BABYLON.StandardMaterial("mat", scene);
        material.diffuseColor = BABYLON.Color3.Random();
        box.material = material;
        // Set the cube as a child of the parent node
        box.parent = cubeParent;
        return box;
    });

    // Add cubes to water material render list
    meshes.forEach(mesh => {
        waterMaterial.addToRenderList(mesh);
    });
    
    // Move the parent node up
    cubeParent.position.y = 100;

    // アニメーションの設定
    const animationSpeed = 1; // アニメーション速度（小さいほど速い）
    const rotationSpeed = 0.02; // 回転速度（大きいほど速い）
    
    let currentFormation = 0;
    const formations = [
        // Random formation
        () => meshes.forEach(mesh => {
            const targetPosition = new BABYLON.Vector3(
                Math.random() * 350 - 200,
                Math.random() * 350 - 200,
                Math.random() * 350 - 200
            );
            BABYLON.Animation.CreateAndStartAnimation("anim", mesh, "position", 60, animationSpeed * 60, mesh.position, targetPosition, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        }),
        // Cube formation
        () => meshes.forEach((mesh, i) => {
            const targetPosition = new BABYLON.Vector3(
                cubes[i].x * SIZE,
                cubes[i].y * SIZE,
                cubes[i].z * SIZE
            );
            BABYLON.Animation.CreateAndStartAnimation("anim", mesh, "position", 60, animationSpeed * 60, mesh.position, targetPosition, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        }),
        // Spiral formation
        () => meshes.forEach((mesh, i) => {
            const rot = 25 * i;
            const targetPosition = new BABYLON.Vector3(
                150 * Math.sin(rot * Math.PI / 180),
                10 * i - 250,
                150 * Math.cos(rot * Math.PI / 180)
            );
            BABYLON.Animation.CreateAndStartAnimation("anim", mesh, "position", 60, animationSpeed * 60, mesh.position, targetPosition, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        })
    ];
    
    // 親ノードを回転
    scene.onBeforeRenderObservable.add(() => {
        cubeParent.rotation.y += rotationSpeed;
    });
    
    // フォーメーション変更の間隔
    const formationChangeInterval = 3000; // ミリ秒単位

    setInterval(() => {
        formations[currentFormation]();
        currentFormation = (currentFormation + 1) % formations.length;
    }, formationChangeInterval);
    
    return scene;
};

const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});