// forked from cx20's "Babylon.js で Cannon.js を使ってみるテスト" http://jsdo.it/cx20/2Pre
// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
/*
    var colorHash = {
        "無":0xDCAA6B,    // 段ボール色
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
*/
    var colorHash = {
        "無":[0xDC/0xFF, 0xAA/0xFF, 0x6B/0xFF],    // 段ボール色
        "白":[0xff/0xFF, 0xff/0xFF, 0xff/0xFF],
        "肌":[0xff/0xFF, 0xcc/0xFF, 0xcc/0xFF],
        "茶":[0x80/0xFF, 0x00/0xFF, 0x00/0xFF],
        "赤":[0xff/0xFF, 0x00/0xFF, 0x00/0xFF],
        "黄":[0xff/0xFF, 0xff/0xFF, 0x00/0xFF],
        "緑":[0x00/0xFF, 0xff/0xFF, 0x00/0xFF],
        "水":[0x00/0xFF, 0xff/0xFF, 0xff/0xFF],
        "青":[0x00/0xFF, 0x00/0xFF, 0xff/0xFF],
        "紫":[0x80/0xFF, 0x00/0xFF, 0x80/0xFF]
    };
    return colorHash[c];
}

window.onload = function () {

    var canvas = document.getElementById("renderCanvas");

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
    var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(20, 50, -80), scene);
    camera.checkCollisions = true;
    //camera.applyGravity = true;

    var light = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0.2, -1, 0), scene);
    light.position = new BABYLON.Vector3(0, 80, 0);

    // Physics
    //scene.enablePhysics();
    scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), new BABYLON.CannonJSPlugin());

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
        var compoud = createCompound(x, y, z);
        scene.createCompoundImpostor( compoud );
    }

    camera.setTarget(new BABYLON.Vector3(0, 40, 0));

    // Playground
    var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
    ground.scaling = new BABYLON.Vector3(250, 1, 250);
    ground.position.y = -5.0;
    ground.checkCollisions = true;

    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.8);
    groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.5);
    ground.material = groundMat;

    scene.gravity = new BABYLON.Vector3(0, -10, 0);

    // Physics
    ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 0, friction: 0.5, restitution: 0.7 });

    return scene;
};
