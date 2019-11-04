// forked from cx20's "ダンボールを落下させてみるテスト" http://jsdo.it/cx20/7bHz
// forked from cx20's "CubicVR.js + ammo.jsでドット絵を落下させるテスト" http://jsdo.it/cx20/cjyn
// forked from cx20's "CubicVR.js + ammo.jsで立方体を落下させるテスト" http://jsdo.it/cx20/eubW
// forked from cx20's "CubicVR.js で立方体を表示するテスト" http://jsdo.it/cx20/kKwJ

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
    return colorHash[ c ];
}

function webGLStart() {
    // by default generate a full screen canvas with automatic resize
    var gl = CubicVR.init();
    var canvas = CubicVR.getCanvas();

    if (!gl) {
        alert("Sorry, no WebGL support.");
        return;
    }

    // Create a material for the mesh
    var ballMaterial = new CubicVR.Material({
        name: "ballMaterial",
        textures: {
            //color: new CubicVR.Texture("../../assets/a/S/K/g/aSKga.png") // Football.png
            color: new CubicVR.Texture("../../assets/s/s/X/x/ssXxc.png") // Football.png
        }
    });

    // Add a ball to mesh, size 1.0, apply material and UV parameters
    var ballMesh = CubicVR.primitives.sphere({
        material: ballMaterial,
        radius: 1.0,
        lat: 24,
        lon: 24,
        uv: {
            projectionMode: "spherical"
        }
    });

    // triangulate and buffer object to GPU, remove unused data
    ballMesh.prepare();
    
    var floorMaterial= new CubicVR.Material({
        name: "floorMaterial",
        textures: {
            //color: new CubicVR.Texture("//jsrun.it/assets/H/A/6/O/HA6OK.jpg") // grass.jpg
            color: new CubicVR.Texture("../../assets/u/y/G/y/uyGy9.jpg") // grass.jpg
        }
    });

    // Add a floor to mesh, size 1.0, apply material and UV parameters
    var floorMesh = CubicVR.primitives.box({
        size: 1.0,
        material: floorMaterial,
        uvmapper: {
            projectionMode: CubicVR.enums.uv.projection.CUBIC,
            scale: [0.01, 0.01, 0.01]
        }
    });

    floorMesh.prepare();

    // New scene with our canvas dimensions and default camera with FOV 80
    var scene = new CubicVR.Scene(canvas.width, canvas.height, 80);

    // set initial camera position and target
    scene.camera.position = [2, 10, -15];
    scene.camera.target = [0, 0, -5];

    // Add a simple directional light
    scene.bindLight(new CubicVR.Light({
        type: CubicVR.enums.light.type.DIRECTIONAL,
        specular: [1, 1, 1],
        direction: [0.5, -1, 0.5]
    }));

    var floorObject = new CubicVR.SceneObject({
        mesh: floorMesh,
        scale: [1000, 0.2, 1000],
        position: [5, -5, 0]
    });

    scene.bindSceneObject(floorObject);

    var ballObjects = [];
    var rigidBalls = [];

    // SceneObject container for the mesh

    for (var y = 0; y < 16; y++) {
        for (var x = 0; x < 16; x++) {
            var pos = (15 - x) + (15 - y) * 16;
            var ballObject = new CubicVR.SceneObject({
                mesh: ballMesh,
                scale: [1, 1, 1],
                position: [
                     -20 + x * 3.0 + Math.random()/10.0,
                      10 + y * 3.0,
                     Math.random()/10.0
                ],
                rotation: [0, 0, 0]
            });

            ballObject.getInstanceMaterial("ballMaterial").color = getRgbColor(dataSet[pos]);
            ballObjects.push(ballObject);

            // Add SceneObject containing the mesh to the scene
            scene.bindSceneObject(ballObject);
        }

    }

    // initialize a mouse view controller
    mvc = new CubicVR.MouseViewController(canvas, scene.camera);

    // Add our scene to the window resize list
    CubicVR.addResizeable(scene);


    // init physics manager
    var physics = new CubicVR.ScenePhysics();

    for (var i = 0; i < 16 * 16; i++) {
        var rigidBall = new CubicVR.RigidBody(ballObjects[i], {
            type: CubicVR.enums.physics.body.DYNAMIC,
            collision: {
                type: CubicVR.enums.collision.shape.SPHERE,
                size: ballObjects[i].scale
            }
        });
        rigidBalls.push(rigidBall);
        physics.bindRigidBody(rigidBall);
    }

    var rigidFloor = new CubicVR.RigidBody(floorObject, {
        type: CubicVR.enums.physics.body.STATIC,
        mass: 0,
        collision: {
            type: CubicVR.enums.collision.shape.BOX,
            size: floorObject.scale
        }
    });
    physics.bindRigidBody(rigidFloor);

    // Start our main drawing loop, it provides a timer and the gl context as parameters
    CubicVR.MainLoop(function (timer, gl) {
        var seconds = timer.getSeconds();
        physics.stepSimulation(timer.getLastUpdateSeconds());
        scene.render();
    });
}