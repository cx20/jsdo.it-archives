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
/*
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
*/
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","赤","赤","赤","×","×","×","赤","赤","赤","×","×","×","×",
    "×","×","赤","赤","赤","赤","赤","×","赤","赤","赤","赤","赤","×","×","×",
    "×","赤","赤","赤","赤","赤","赤","×","赤","赤","赤","赤","赤","赤","×","×",
    "×","赤","赤","赤","赤","赤","赤","×","赤","赤","赤","赤","赤","赤","×","×",
    "×","赤","赤","赤","赤","赤","赤","赤","赤","赤","赤","赤","赤","赤","×","×",
    "×","×","赤","赤","赤","赤","赤","赤","赤","赤","赤","赤","赤","×","×","×",
    "×","×","×","赤","赤","赤","赤","赤","赤","赤","赤","赤","×","×","×","×",
    "×","×","×","×","赤","赤","赤","赤","赤","赤","赤","×","×","×","×","×",
    "×","×","×","×","×","赤","赤","赤","赤","赤","×","×","×","×","×","×",
    "×","×","×","×","×","×","赤","赤","赤","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","赤","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×",
    "×","×","×","×","×","×","×","×","×","×","×","×","×","×","×","×"
];

function getRgbColor( c )
{
    var colorHash = {
        "×":[0xDC/0xFF, 0xAA/0xFF, 0x6B/0xFF],    // 段ボール色
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
    var boxMaterial1 = new CubicVR.Material({
        name: "boxMaterial1",
        textures: {
            color: new CubicVR.Texture("../../assets/3/p/O/e/3pOep.jpg") // 絵柄あり
        }
    });
    var boxMaterial2 = new CubicVR.Material({
        name: "boxMaterial2",
        textures: {
            color: new CubicVR.Texture("../../assets/b/l/b/M/blbMZ.jpg") // 絵柄なし
        }
    });


    // Add a box to mesh, size 1.0, apply material and UV parameters
    var boxMesh = CubicVR.primitives.box({
        size: 1.0,
        material: boxMaterial2,
        uvmapper: {
            projectionMode: CubicVR.enums.uv.projection.CUBIC,
            scale: [1, 1, 1]
        }
    });

    boxMesh.setFaceMaterial(boxMaterial1,0);
    boxMesh.setFaceMaterial(boxMaterial1,1);
    boxMesh.setFaceMaterial(boxMaterial1,2);
    boxMesh.setFaceMaterial(boxMaterial1,3);
    boxMesh.setFaceMaterial(boxMaterial1,4);
    boxMesh.setFaceMaterial(boxMaterial2,5);

    // triangulate and buffer object to GPU, remove unused data
    boxMesh.prepare();

    var boxMesh2 = CubicVR.primitives.box({
        size: 1.0,
        material: boxMaterial2,
        uvmapper: {
            projectionMode: CubicVR.enums.uv.projection.CUBIC,
            scale: [1, 1, 1]
        }
    });
    boxMesh2.prepare();
    

    // New scene with our canvas dimensions and default camera with FOV 80
    var scene = new CubicVR.Scene(canvas.width, canvas.height, 80);

    // set initial camera position and target
    scene.camera.position = [5, 5, -18];
    scene.camera.target = [3, 5, 0];

    // Add a simple directional light
    scene.bindLight(new CubicVR.Light({
        type: CubicVR.enums.light.type.DIRECTIONAL,
        specular: [1, 1, 1],
        direction: [0.5, -1, 0.5]
    }));

    var floorObject = new CubicVR.SceneObject({
        mesh: boxMesh2,
        scale: [100, 0.2, 100],
        position: [5, -5, 0]
    });

    scene.bindSceneObject(floorObject);

    var boxObjects = [];
    var rigidBoxs = [];

    // SceneObject container for the mesh

    for (var y = 0; y < 16; y++) {
        for (var x = 0; x < 16; x++) {
            var pos = (15 - x) + (15 - y) * 16;
            var boxObject = new CubicVR.SceneObject({
                mesh: boxMesh,
                scale: [1, 0.5, 1],
                position: [-10 + x * 1.5, y * 1.5, 0],
                rotation: [0, 0, 0]
            });

            boxObject.getInstanceMaterial("boxMaterial1").color = getRgbColor(dataSet[pos]);
            boxObject.getInstanceMaterial("boxMaterial2").color = getRgbColor(dataSet[pos]);

            boxObjects.push(boxObject);

            // Add SceneObject containing the mesh to the scene
            scene.bindSceneObject(boxObject);
        }

    }

    // initialize a mouse view controller
    mvc = new CubicVR.MouseViewController(canvas, scene.camera);

    // Add our scene to the window resize list
    CubicVR.addResizeable(scene);


    // init physics manager
    var physics = new CubicVR.ScenePhysics();

    for (var i = 0; i < 16 * 16; i++) {
        var rigidBox = new CubicVR.RigidBody(boxObjects[i], {
            type: CubicVR.enums.physics.body.DYNAMIC,
            collision: {
                type: CubicVR.enums.collision.shape.BOX,
                size: boxObjects[i].scale
            }
        });
        rigidBoxs.push(rigidBox);
        physics.bindRigidBody(rigidBox);
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