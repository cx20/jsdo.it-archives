// forked from cx20's "Three.js でイオの内部構造を表示させてみるテスト（改）" http://jsdo.it/cx20/KavT
// forked from cx20's "Three.js でイオの内部構造を表示させてみるテスト" http://jsdo.it/cx20/cj5m
// forked from cx20's "Three.js で木星の衛星イオを表示させてみるテスト" http://jsdo.it/cx20/G8Fl
// forked from cx20's "Three.js で木星を表示させてみるテスト" http://jsdo.it/cx20/k68D
// forked from cx20's "Three.js で火星を表示させてみるテスト" http://jsdo.it/cx20/AFvB
// forked from cx20's "Three.js で地球を表示させてみるテスト" http://jsdo.it/cx20/78Dn
// forked from cx20's "Three.js で月を表示させてみるテスト" http://jsdo.it/cx20/vcVy
// forked from cx20's "Three.js で冥王星を表示させてみるテスト" http://jsdo.it/cx20/tenj
// forked from cx20's "Three.js で地球を回してみるテスト" http://jsdo.it/cx20/tv0T

var parent;
var createScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor  = new BABYLON.Color3(0.0, 0.0, 0.0);
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 1.0, 110, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 50, -150));
    camera.attachControl(canvas, true);
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);

    parent = new BABYLON.Mesh.CreateBox("parent", 1, scene);
    var box1 = BABYLON.Mesh.CreateBox("box1", 50, scene);
    var box2 = BABYLON.Mesh.CreateBox("box2", 49.9, scene);
    var surface = BABYLON.Mesh.CreateSphere("surface", 16, 75, scene);
    var mantle = BABYLON.Mesh.CreateSphere("mantle", 16, 73, scene);
    var core = BABYLON.Mesh.CreateSphere("core", 16, 40, scene);

    box1.position.x += 25;
    box1.position.y += 25;
    box1.position.z += 25;

    box2.position.x += 25;
    box2.position.y += 25;
    box2.position.z += 25;

    box1.isVisible = false;
    box2.isVisible = false;
    surface.isVisible = false;
    mantle.isVisible = false;

    var box1CSG = BABYLON.CSG.FromMesh(box1);
    var box2CSG = BABYLON.CSG.FromMesh(box2);
    var surfaceCSG = BABYLON.CSG.FromMesh(surface);
    var mantleCSG = BABYLON.CSG.FromMesh(mantle);

    var surfaceMaterial = new BABYLON.StandardMaterial("mat_surface", scene);
    surfaceMaterial.diffuseTexture = new BABYLON.Texture("../../assets/u/r/e/y/ureyw.jpg", scene); // io_rgb_cyl.jpg
    surfaceMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);

    var mantleMaterial = new BABYLON.StandardMaterial("mat_mantle", scene);
    mantleMaterial.diffuseTexture = new BABYLON.Texture("../../assets/c/C/I/q/cCIqn.jpg", scene); // ava.jpg
    mantleMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    
    var subCSG = surfaceCSG.subtract(box1CSG);
    var surfaceMesh = subCSG.toMesh("csg1", surfaceMaterial, scene);
    surfaceMesh.parent = parent;

    var subCSG2 = mantleCSG.subtract(box2CSG);
    var mantleMesh = subCSG2.toMesh("csg2", mantleMaterial, scene);
    mantleMesh.parent = parent;

    var coreMaterial = new BABYLON.StandardMaterial("mat_core", scene);
    coreMaterial.diffuseTexture = new BABYLON.Texture("../../assets/g/I/9/t/gI9tJ.png", scene); // core.png
    coreMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    core.material = coreMaterial;
    core.parent = parent;

    return scene;
};

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

var rad = 0.0;
engine.runRenderLoop(function () {
    rad -= Math.PI * 0.5 / 180.0;
    parent.rotation.y = rad;
    scene.render();
});


window.addEventListener('resize', function(){
    engine.resize();
});
