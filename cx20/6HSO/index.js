// forked from cx20's "[WebGL] Babylon.js + objFileLoaderを試してみるテスト（失敗）" http://jsdo.it/cx20/eMAN
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/jwt0
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var createScene = function(engine) {
    BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", 1, 1.2, 25, new BABYLON.Vector3(10, 0, 0), scene);

    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    var material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseTexture = new BABYLON.Texture("../../assets/9/9/W/G/99WGE.png", scene); // adobe.jpg
    material.emissiveColor = new BABYLON.Color3(1, 1, 1);

    var loader = new BABYLON.AssetsManager(scene);
    var position = -5;
    var pos = function(t) {
        t.loadedMeshes.forEach(function(m) {
            m.position.x -= position;
            m.material = material;
        });
        position += 5;
    };
    
    var adobe = loader.addMeshTask("adobe", "", "../../assets/m/y/v/n/", "myvnV.obj"); // adobe_modified.obj
    adobe.onSuccess = pos;

    var rad = 0.0;
    loader.onFinish = function() {
        engine.runRenderLoop(function () {
            scene.render();
        });
    };

    loader.load();

    scene.registerBeforeRender(function () {
        camera.alpha += 0.01 * scene.getAnimationRatio();
    });

    return scene;
}

var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);
