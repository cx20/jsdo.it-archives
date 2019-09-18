if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0, -10), scene);
    var sphere = BABYLON.Mesh.CreateSphere("sphere", 30, 1, scene);
    var material = new BABYLON.StandardMaterial("default", scene);
    material.diffuseTexture = new BABYLON.Texture("/assets/e/N/O/A/eNOAX.jpg", scene); // "earth.jpg"
    material.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
    sphere.material = material;
    scene.clearColor  = new BABYLON.Color3(0.0, 0.0, 0.0);
    
    var renderLoop = function () {
        engine.beginFrame();
        scene.render();
        engine.endFrame();
        BABYLON.Tools.QueueNewFrame(renderLoop);
    };
    
    BABYLON.Tools.QueueNewFrame(renderLoop);
    
    var alpha = 0;
    sphere.scaling.x = 7.0;
    sphere.scaling.y = 7.0;
    sphere.scaling.z = 7.0;
    scene.beforeRender = function() {
        sphere.rotation.y = alpha;
        alpha -= 0.01;
    };
}
