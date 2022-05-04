// forked from cx20's "Babylon.js で国土地理院のデータを表示してみるテスト" http://jsdo.it/cx20/cERE
// forked from cx20's "Babylon.js v2.0 を試してみるテスト（その２）" http://jsdo.it/cx20/oo0c
// forked from cx20's "Babylon.js v2.0 を試してみるテスト" http://jsdo.it/cx20/whLL
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

// Canvas 取得
const canvas = document.querySelector("#renderCanvas");

// Babylon 3D Engine のロード
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    // シーンオブジェクトの作成
    const scene = new BABYLON.Scene(engine);
    
    // 背景色
    scene.clearColor = new BABYLON.Color3(0.5, 0.7, 0.9);

    // カメラ
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 1.2, 90, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 150;
    camera.attachControl(canvas, true);

    // 平行光源
    // DirectionalLight(name, direction, scene)
    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 40, 20);
    light.intensity = 1.0;  // 光の強さ

    // スポットライト
    // SpotLight(name, position, direction, angle, exponent, scene)
	const light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(30, 40, 20), new BABYLON.Vector3(-1, -2, -1), Math.PI / 2, 10, scene);
    light2.intensity = 1.0;  // 光の強さ

    // 地面
    const ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../../assets/c/C/N/m/cCNmz.png", 100, 100, 100, 0, 20, scene, false); // heightMap.png
    const material = new BABYLON.StandardMaterial("ground", scene);
    const texture = new BABYLON.Texture("../../assets/y/x/R/f/yxRfY.png", scene); // fujimap.png
    material.diffuseTexture = texture;
    material.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = material;

    // アニメーション
    scene.registerBeforeRender(function () {
        scene.activeCamera.alpha += 0.005 * scene.getAnimationRatio();
    });

    return scene;
}

// シーンの作成
const scene = createScene();
// 描画ループ
engine.runRenderLoop(function () {
    scene.render();
});
