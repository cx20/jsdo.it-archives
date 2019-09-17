if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    
    var scene = new BABYLON.Scene(engine);
    
    var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0, -10), scene);
    var box = BABYLON.Mesh.CreateBox("Box", 3.0, scene);
    
    // Material
    var material = new BABYLON.StandardMaterial("default", scene);
    material.diffuseTexture = new BABYLON.Texture("../../assets/c/K/k/k/cKkkH.jpg", scene);
    material.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    material.backFaceCulling = false;
    box.material = material;
    
    // Render loop
    var renderLoop = function () {
        // Start new frame
        engine.beginFrame();
        
        scene.render();
        
        // Present
        engine.endFrame();
        
        // Register new frame
        BABYLON.Tools.QueueNewFrame(renderLoop);
    };
    
    BABYLON.Tools.QueueNewFrame(renderLoop);
    
    var alpha = 0;
    box.scaling.x = 1.0;
    box.scaling.y = 1.0;
    box.scaling.z = 1.0;
    scene.beforeRender = function() {
        box.rotation.x = alpha;
        box.rotation.y = alpha;
        
        alpha += 0.01;
    };
}
