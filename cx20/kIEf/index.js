// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/jwt0
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var cube;
var createScene = function(engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -3), scene);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    cube = new BABYLON.Mesh.CreateBox('cube', 1.0, scene);
    var material = new BABYLON.StandardMaterial("material", scene);
    material.reflectionTexture = new BABYLON.CubeTexture(
        "../../assets",
        scene,
        [
        "/k/J/E/L/kJELT.png", // "/eraser_px.png",
        "/A/n/c/O/AncOu.png", // "/eraser_py.png",
        "/4/5/e/g/45egw.png", // "/eraser_pz.png",
        "/i/I/K/q/iIKql.png", // "/eraser_nx.png",
        "/8/y/P/B/8yPB2.png", // "/eraser_ny.png",
        "/2/m/0/f/2m0fo.png", // "/eraser_nz.png"
        ]
    );
    material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    
    cube.material = material;
    cube.material.backFaceCulling = false;

    // 消しゴムのサイズとなるよう調整
    cube.scaling.x = 1.0;
    cube.scaling.y = 0.2;
    cube.scaling.z = 0.5;

    return scene;
}

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

var rad = 0.0;
engine.runRenderLoop(function () {
    rad += Math.PI * 1.0 / 180.0;
    cube.rotation.x = rad;
    //cube.rotation.y = rad;
    cube.rotation.z = rad;
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});

