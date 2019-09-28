// forked from cx20's "Three.js でエウロパの内部構造を表示させてみるテスト" http://jsdo.it/cx20/Aw5C
// forked from cx20's "Three.js で木星の第二衛星エウロパを表示させてみるテスト" http://jsdo.it/cx20/I10X
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

    parent = new BABYLON.Mesh.CreateBox("parent", 1, scene);
    var box1 = BABYLON.Mesh.CreateBox("box1", 50, scene);
    var box2 = BABYLON.Mesh.CreateBox("box2", 49.9, scene);
    var box3 = BABYLON.Mesh.CreateBox("box2", 49.8, scene);
    var surface = BABYLON.Mesh.CreateSphere("surface", 16, 75, scene);
    var sea = BABYLON.Mesh.CreateSphere("sea", 16, 74, scene);
    var mantle = BABYLON.Mesh.CreateSphere("mantle", 16, 65, scene);
    var core = BABYLON.Mesh.CreateSphere("core", 16, 35, scene);

    box1.position.x += 25;
    box1.position.y += 25;
    box1.position.z += 25;

    box2.position.x += 25;
    box2.position.y += 25;
    box2.position.z += 25;

    box3.position.x += 25;
    box3.position.y += 25;
    box3.position.z += 25;

    box1.isVisible = false;
    box2.isVisible = false;
    box3.isVisible = false;
    surface.isVisible = false;
    sea.isVisible = false;
    mantle.isVisible = false;

    var box1CSG = BABYLON.CSG.FromMesh(box1);
    var box2CSG = BABYLON.CSG.FromMesh(box2);
    var box3CSG = BABYLON.CSG.FromMesh(box3);
    var surfaceCSG = BABYLON.CSG.FromMesh(surface);
    var seaCSG = BABYLON.CSG.FromMesh(sea);
    var mantleCSG = BABYLON.CSG.FromMesh(mantle);

    var surfaceMaterial = new BABYLON.StandardMaterial("mat_surface", scene);
    surfaceMaterial.diffuseTexture = new BABYLON.Texture("../../assets/g/j/F/5/gjF5r.jpg", scene); // europa_1024x512_rotate.jpg
    surfaceMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);

    var seaMaterial = new BABYLON.StandardMaterial("mat_sea", scene);
    seaMaterial.diffuseTexture = new BABYLON.Texture("../../assets/c/j/W/7/cjW7w.png", scene); // sea.png
    seaMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);

    var mantleMaterial = new BABYLON.StandardMaterial("mat_mantle", scene);
    mantleMaterial.diffuseTexture = new BABYLON.Texture("../../assets/A/r/o/W/AroWN.jpg", scene); // lava.jpg
    mantleMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    
    var subCSG = surfaceCSG.subtract(box1CSG);
    var surfaceMesh = subCSG.toMesh("csg1", surfaceMaterial, scene);
    surfaceMesh.parent = parent;

    var subCSG2 = seaCSG.subtract(box2CSG);
    var seaMesh = subCSG2.toMesh("csg2", seaMaterial, scene);
    seaMesh.parent = parent;

    var subCSG3 = mantleCSG.subtract(box3CSG);
    var mantleMesh = subCSG3.toMesh("csg3", mantleMaterial, scene);
    mantleMesh.parent = parent;

    var coreMaterial = new BABYLON.StandardMaterial("mat_core", scene);
    coreMaterial.diffuseTexture = new BABYLON.Texture("../../assets/w/p/t/b/wptbw.png", scene); // core.png
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
