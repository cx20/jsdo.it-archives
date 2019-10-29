// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var mesh;
var createScene = function(engine) {

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -15), scene);
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);

    var a = BABYLON.Mesh.CreateBox("box", 6, scene);
    var b = BABYLON.Mesh.CreateSphere("sphere", 16, 8, scene);
    a.position.y += 20.0;
    b.position.y += 20.0;

    var aCSG = BABYLON.CSG.FromMesh(a);
    var bCSG = BABYLON.CSG.FromMesh(b);

    var mat0 = new BABYLON.StandardMaterial("mat0", scene);
    mat0.diffuseColor.copyFromFloats(0.8, 0.2, 0.2);

    var subCSG = aCSG.subtract(bCSG);
    mesh = subCSG.toMesh("csg", mat0, scene);
    mesh.position = new BABYLON.Vector3(0, 0, 0);

    return scene;
}

var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

var rad = 0.0;
engine.runRenderLoop(function () {
    rad += Math.PI * 1.0 / 180.0;
    mesh.rotation.x = rad;
    mesh.rotation.y = rad;
    mesh.rotation.z = rad;
    scene.render();
});
