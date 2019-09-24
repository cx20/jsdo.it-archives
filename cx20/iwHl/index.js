// forked from cx20's "[WebGL] Hilo3d + Oimo.js でドット絵を落下させてみるテスト（調整中）" http://jsdo.it/cx20/SneJ
// forked from cx20's "[WebGL] Hilo3d+ Oimo.js を試してみるテスト（調整中）" http://jsdo.it/cx20/2UGp
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/aWAs
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/6Ujc
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/O7Hi
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/gKXr
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト" http://jsdo.it/cx20/gwMA
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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

// Hilo3d variable
var camera;
var stage;
var meshGround;
var meshSpheres = [];
var ticker;

// oimo variable
var world;
var oimoGround;
var oimoSpheres = [];
var rad = 0;

function initScene() {
    camera = new Hilo3d.PerspectiveCamera({
        aspect: innerWidth / innerHeight,
        far: 1000,
        near: 0.1,
        x: 0,
        y: 50,
        z: 200
    });

    stage = new Hilo3d.Stage({
        container: document.getElementById('container'),
        camera: camera,
        clearColor: new Hilo3d.Color(0.0, 0.0, 0.0),
        width: innerWidth,
        height: innerHeight
    });

    var directionLight = new Hilo3d.DirectionalLight({
        color:new Hilo3d.Color(1, 1, 1),
        direction:new Hilo3d.Vector3(0, -1, 0)
    }).addTo(stage);
    
    var ambientLight = new Hilo3d.AmbientLight({
        color:new Hilo3d.Color(1, 1, 1),
        amount: .5
    }).addTo(stage);
}

function initWorld() {
    world = new OIMO.World({ 
        timestep: 1/60 * 2, 
        iterations: 8, 
        broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: [0,-9.8,0] 
    });
}

function addGround() {
    var geometryGround = new Hilo3d.BoxGeometry();
    geometryGround.setAllRectUV([[0, 1], [1, 1], [1, 0], [0, 0]]);

    meshGround = new Hilo3d.Mesh({
        scaleX: 200,
        scaleY: 4,
        scaleZ: 200,
        x: 0,
        y: -50,
        z: 0,
        geometry: geometryGround,
        material: new Hilo3d.BasicMaterial({
            diffuse:new Hilo3d.LazyTexture({
                src:'../../assets/u/y/G/y/uyGy9.jpg' // grass.jpg
            }),
        }),
    });

    oimoGround = world.add({
        type: "box",
        size: [200, 4, 200],
        pos: [0, -50, 0],
        rot: [0, 0, 0],
        move: false,
        density: 1
    });
    stage.addChild(meshGround);
}

function addSphere() {
    var box_size = 8;
    var geometrySphere = new Hilo3d.SphereGeometry();

    for (var y = 0; y < 16; y++) {
        for (var x = 0; x < 16; x++) {
            i = (15 - x) + (15 - y) * 16;
            //i = x + (15 - y) * 16;
            var x1 = -80 + x * (box_size+1) + Math.random();
            var y1 = 30 + y * (box_size+1) + Math.random();
            var z1 = 0 + Math.random();
            var c = getRgbColor(dataSet[i]);

            meshSphere = new Hilo3d.Mesh({
                scaleX: box_size/2,
                scaleY: box_size/2,
                scaleZ: box_size/2,
                x: x1,
                y: y1,
                z: z1,
                geometry: geometrySphere,
                material: new Hilo3d.BasicMaterial({
/*
                    diffuse:new Hilo3d.LazyTexture({
                        src:'../../assets/s/s/X/x/ssXxc.png' // football.png
                    }),
*/
                    diffuse: new Hilo3d.Color(c[0], c[1], c[2]),
                })
            });
            meshSpheres.push(meshSphere);
            stage.addChild(meshSphere);
            
            var oimoSphere = world.add({
                type: "sphere",
                size: [box_size/2, box_size/2, box_size/2],
                pos: [x1, y1, z1],
                rot: [0, 0, 0],
                move: true,
                density: 1,
                friction: 0.2,
                restitution: 0.6
            });
            oimoSpheres.push(oimoSphere);
        }
    }
}

function animate() {
    meshGround.onUpdate = function() {
        world.step();
        for ( var i = 0; i < oimoSpheres.length; i++ ) {
            var oimoSphere = oimoSpheres[i];
            var meshSphere = meshSpheres[i];
            var pos = oimoSphere.getPosition();
            meshSphere.setPosition(pos.x, pos.y, pos.z);
            var rot = oimoSphere.getQuaternion();
            meshSphere.quaternion.set(rot.x, rot.y, rot.z, rot.w);
        }
        
        camera.lookAt( new Hilo3d.Vector3(0,0,0));
        camera.setPosition( 200 * Math.sin(rad), 50, 200 * Math.cos(rad));
        
        rad += Math.PI/180;
    };

    ticker = new Hilo3d.Ticker(60);
    ticker.addTick(stage);
    ticker.start(true);
}

initScene();
initWorld();
addGround();
addSphere();
animate();
