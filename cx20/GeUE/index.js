// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/akl7
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/2e3y
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/yy3I
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その３）（仮）" http://jsdo.it/cx20/WlZW
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その２）（仮）" http://jsdo.it/cx20/8PA0
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（仮）" http://jsdo.it/cx20/g9yj
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
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
        "無":{r:0xDC,g:0xAA,b:0x6B},    // 段ボール色
        "白":{r:0xff,g:0xff,b:0xff},
        "肌":{r:0xff,g:0xcc,b:0xcc},
        "茶":{r:0x80,g:0x00,b:0x00},
        "赤":{r:0xff,g:0x00,b:0x00},
        "黄":{r:0xff,g:0xff,b:0x00},
        "緑":{r:0x00,g:0xff,b:0x00},
        "水":{r:0x00,g:0xff,b:0xff},
        "青":{r:0x00,g:0x00,b:0xff},
        "紫":{r:0x80,g:0x00,b:0x80}
    };
    return colorHash[ c ];
}

var canvas;
var glBoostContext;
var scene;

var renderer;
var camera;
var expression;
var meshGround;
var meshSpheres = [];

var world;
var body;
var oimoGround;
var oimoSpheres = [];

function initOimo() {
    world = new OIMO.World({ 
        //timestep: 1/30, 
        timestep: 1/15, 
        iterations: 8, 
        broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: [0,-9.8,0] 
    });
}

function initBoost() {

    canvas = document.getElementById("world");
    glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
    renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});

    renderer.readyForWebVR(document.querySelector('.enter-web-vr'));

    document.querySelector('.enter-web-vr').addEventListener('click', ()=>{
        renderer.enterWebVR();
    });

    scene = glBoostContext.createScene();

    var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(0, 0, -1));
    scene.addChild( directionalLight );
    
    camera = glBoostContext.createPerspectiveCamera({
        eye: new GLBoost.Vector3(0.0, 50, 100),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 1000.0
    });
    camera.cameraController = glBoostContext.createCameraController();
    scene.addChild(camera);
    
    addGround();
    addSphere();

    expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

    renderer.doConvenientRenderLoop(expression, function() {
        world.step();
        for ( var i = 0; i < oimoSpheres.length; i++ ) {
            var oimoSphere = oimoSpheres[i];
            var meshSphere = meshSpheres[i];
            var pos = oimoSphere.getPosition();
            meshSphere.translate = new GLBoost.Vector3(pos.x, pos.y, pos.z);
            var rot = oimoSphere.getQuaternion();
            meshSphere.quaternion = new GLBoost.Quaternion(rot.x, rot.y, rot.z, rot.w);
        }
    });                                    
}

function addGround() {
    var texture = glBoostContext.createTexture('../../assets/u/y/G/y/uyGy9.jpg'); // grass.jpg
    var material = glBoostContext.createClassicMaterial();
    material.setTexture(texture);
    material.baseColor = new GLBoost.Vector4(1, 1, 1, 1);
    
    var geometryGround = glBoostContext.createCube(new GLBoost.Vector3(400, 40, 400), new GLBoost.Vector4(1, 1, 1, 1));
    meshGround = glBoostContext.createMesh(geometryGround, material);
    meshGround.translate = new GLBoost.Vector3(0, -50, 0);
    scene.addChild(meshGround);

    oimoGround = world.add({
        type: "box",
        size: [400, 40, 400],
        pos: [0, -50, 0],
        rot: [0, 0, 0],
        move: false,
        density: 1,
        friction: 0.5,
        restitution: 0.1,
    });
}

function addSphere() {
    var box_size = 8;

    var texture = glBoostContext.createTexture('../../assets/s/s/X/x/ssXxc.png'); // football.png
    var material = glBoostContext.createClassicMaterial();
    material.setTexture(texture);
    material.baseColor = new GLBoost.Vector4(1, 1, 1, 1);

    for (var y = 0; y < 16; y++) {
        for (var x = 0; x < 16; x++) {
            i = (15 - x) + (15 - y) * 16;
            var x1 = -60 + x * (box_size+1) + Math.random();
            var y1 = 30 + (16 - y) * (box_size+1) + Math.random();
            var z1 = -50 + Math.random();
            var c = getRgbColor(dataSet[i]);
            var color = new GLBoost.Vector4(c.r / 0xff, c.g / 0xff, c.b / 0xff, 1.0);
            var geoSphere = glBoostContext.createSphere(box_size/2, 24, 24, color);
            
            meshSpheres[i] = glBoostContext.createMesh(geoSphere, material);
            meshSpheres[i].translate = new GLBoost.Vector3(x1 * box_size, y1 * box_size, z1 * box_size);
            scene.addChild(meshSpheres[i]);
            
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

initOimo();
initBoost();
