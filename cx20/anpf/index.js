// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var createScene = function(engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -2.4), scene);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    var square = new BABYLON.Mesh.CreatePlane('square', 1.0, scene);
    var colors = [
        0.0, 0.0, 1.0, 1.0,
        1.0, 1.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0
    ];
    square.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors, true);
    square.material = new BABYLON.StandardMaterial("material", scene);
    square.material.emissiveColor = new BABYLON.Color3(1, 1, 1);

    return scene;
}

var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

engine.runRenderLoop(function () {
    scene.render();
});
