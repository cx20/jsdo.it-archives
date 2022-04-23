const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0, -10), scene);
    const box = BABYLON.Mesh.CreateBox("Box", 3.0, scene);
    const material = new BABYLON.StandardMaterial("default", scene);
    material.diffuseTexture = new BABYLON.Texture("../../assets/c/K/k/k/cKkkH.jpg", scene);
    material.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    material.backFaceCulling = false;
    box.material = material;

    let alpha = 0;
    engine.runRenderLoop(function () {
        box.rotation.x = alpha;
        box.rotation.y = alpha;
        
        alpha += 0.01;

        scene.render();
    });

    return scene;
};

const scene = createScene();

window.addEventListener("resize", function () {
        engine.resize();
});

