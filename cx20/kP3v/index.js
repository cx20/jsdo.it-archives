// forked from cx20's "Three.js でイオの内部構造を表示させてみるテスト（改）" http://jsdo.it/cx20/KavT
// forked from cx20's "Three.js でイオの内部構造を表示させてみるテスト" http://jsdo.it/cx20/cj5m
// forked from cx20's "Three.js で木星の衛星イオを表示させてみるテスト" http://jsdo.it/cx20/G8Fl
// forked from cx20's "Three.js で木星を表示させてみるテスト" http://jsdo.it/cx20/k68D
// forked from cx20's "Three.js で火星を表示させてみるテスト" http://jsdo.it/cx20/AFvB
// forked from cx20's "Three.js で地球を表示させてみるテスト" http://jsdo.it/cx20/78Dn
// forked from cx20's "Three.js で月を表示させてみるテスト" http://jsdo.it/cx20/vcVy
// forked from cx20's "Three.js で冥王星を表示させてみるテスト" http://jsdo.it/cx20/tenj
// forked from cx20's "Three.js で地球を回してみるテスト" http://jsdo.it/cx20/tv0T

const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function (engine) {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor  = new BABYLON.Color3(0.0, 0.0, 0.0);
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 1.0, 110, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 50, -150));
    camera.attachControl(canvas, true);
    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);

    const parent = new BABYLON.Mesh.CreateBox("parent", 1, scene);
    const box1 = BABYLON.Mesh.CreateBox("box1", 50, scene);
    const box2 = BABYLON.Mesh.CreateBox("box2", 49.9, scene);
    const surface = BABYLON.Mesh.CreateSphere("surface", 16, 75, scene);
    const mantle = BABYLON.Mesh.CreateSphere("mantle", 16, 73, scene);
    const core = BABYLON.Mesh.CreateSphere("core", 16, 40, scene);

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

    const box1CSG = BABYLON.CSG.FromMesh(box1);
    const box2CSG = BABYLON.CSG.FromMesh(box2);
    const surfaceCSG = BABYLON.CSG.FromMesh(surface);
    const mantleCSG = BABYLON.CSG.FromMesh(mantle);

    const surfaceMaterial = new BABYLON.StandardMaterial("mat_surface", scene);
    //surfaceMaterial.diffuseTexture = new BABYLON.Texture("../../assets/u/r/e/y/ureyw.jpg", scene); // io_rgb_cyl.jpg
    surfaceMaterial.diffuseTexture = new BABYLON.Texture("../../assets/q/Y/Q/E/qYQEm.jpg", scene); // io_rgb_cyl.jpg
    surfaceMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);

    const mantleMaterial = new BABYLON.StandardMaterial("mat_mantle", scene);
    mantleMaterial.diffuseTexture = new BABYLON.Texture("../../assets/c/C/I/q/cCIqn.jpg", scene); // lava.jpg
    mantleMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);

    const subCSG = surfaceCSG.subtract(box1CSG);
    const surfaceMesh = subCSG.toMesh("csg1", surfaceMaterial, scene);
    surfaceMesh.parent = parent;

    const subCSG2 = mantleCSG.subtract(box2CSG);
    const mantleMesh = subCSG2.toMesh("csg2", mantleMaterial, scene);
    mantleMesh.parent = parent;
    
    const coreMaterial = new BABYLON.StandardMaterial("mat_core", scene);
    coreMaterial.diffuseTexture = new BABYLON.Texture("../../assets/g/I/9/t/gI9tJ.png", scene); // core.png
    coreMaterial.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    core.material = coreMaterial;
    core.parent = parent;

    let rad = 0.0;
    scene.registerBeforeRender(function () {
        rad -= Math.PI * 0.5 / 180.0;
        parent.rotation.y = rad;
        scene.activeCamera.alpha += 0.001 * scene.getAnimationRatio();
    });

    return scene;
};

const scene = createScene(engine);

engine.runRenderLoop(function(){
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});
