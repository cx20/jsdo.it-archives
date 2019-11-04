// forked from cx20's "Babylon.js + Cannon.js でゴゴゴを落下させてみるテスト" http://jsdo.it/cx20/kUd3
// forked from cx20's "Babylon.js で Cannon.js を使ってみるテスト" http://jsdo.it/cx20/2Pre

var canvas;

window.onload = function () {

    canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        var engine = new BABYLON.Engine(canvas, true);
        
        //Load the physics demo
        // --------------------
        scene = CreatePhysicsScene(engine);
        // --------------------

        //Attach the camera to the scene
        scene.activeCamera.attachControl(canvas);


        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            scene.render();
        });


        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    }

};


var CreatePhysicsScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", -1.0, 1.37, 200, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.maxZ = 5000;
    camera.lowerRadiusLimit = 120;
    camera.upperRadiusLimit = 430;
    camera.lowerBetaLimit =0.75;
    camera.upperBetaLimit =1.58 ;

    var light = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0.2, -1, 0), scene);
    light.position = new BABYLON.Vector3(0, 80, 0);

    // Physics
    //scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
    scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
    
    function createCompound( x, y, z) {
        var center = new BABYLON.Mesh.CreateBox("center", 1.0, scene);
        center.position = new BABYLON.Vector3(x, y, z);
        var part0 = BABYLON.Mesh.CreateBox("part0", 1, scene);
        part0.scaling = { x:10, y:2, z: 2 };
        part0.position = new BABYLON.Vector3(0, 10, 0);
        part0.parent = center;
        
        var part1 = BABYLON.Mesh.CreateBox("part1", 1, scene);
        part1.scaling = { x:2, y:10, z: 2};
        part1.position = new BABYLON.Vector3(5, 5, 0);
        part1.parent = center;
        
        var part2 = BABYLON.Mesh.CreateBox("part2", 1, scene);
        part2.scaling = { x:10, y:2, z:2 };
        part2.position = new BABYLON.Vector3(0,0, 0);
        part2.parent = center;
        
        var part3 = BABYLON.Mesh.CreateBox("part3", 1, scene);
        part3.scaling = { x:2, y:4, z: 2};
        part3.position = new BABYLON.Vector3(8, 10, 0);
        part3.parent = center;
        
        var part4 = BABYLON.Mesh.CreateBox("part4", 1, scene);
        part4.scaling = { x:2, y:4, z: 2};
        part4.position = new BABYLON.Vector3(11, 10, 0);
        part4.parent = center;
        
        return {
            mass: 10, friction: 0.4, restitution: 0.3, parts: [
                { mesh: center, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                { mesh: part0, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                { mesh: part1, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                { mesh: part2, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                { mesh: part3, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                { mesh: part4, impostor: BABYLON.PhysicsEngine.BoxImpostor }]
        };
    }
    
    for ( var i = 0; i < 50; i++ ) {
        var x = Math.random() * 10;
        var y = 50 + i * 20;
        var z = Math.random();
        var compound = createCompound(x, y, z);
        //scene.createCompoundImpostor( compoud );
        compound.parts[0].mesh.physicsImpostor = new BABYLON.PhysicsImpostor(compound.parts[0].mesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, friction:0.4, restitution:0.8 }, scene);
    }

    // Playground
    var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
    ground.scaling = new BABYLON.Vector3(250, 10, 250);
    ground.position.y = -5.0;
    ground.checkCollisions = true;

    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.8);
    groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.5);
    ground.material = groundMat;

    scene.gravity = new BABYLON.Vector3(0, -10, 0);

    // Physics
    //ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction:0.5, restitution:0.7 }, scene);

    return scene;
};
