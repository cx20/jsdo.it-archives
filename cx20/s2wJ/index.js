// forked from cx20's "[WebGL] qtek.js + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/6viZ
// forked from cx20's "[WebGL] qtek.js + oimo.js を試してみるテスト" http://jsdo.it/cx20/WUf4
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/4TBY
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）（その３）（調整中）" http://jsdo.it/cx20/k6uv
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）（その２）（調整中）" http://jsdo.it/cx20/uOIG
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）" http://jsdo.it/cx20/uObL
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
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

// oimo init
var world = new OIMO.World({ 
    timestep: 1/60 * 2, 
    iterations: 8, 
    broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
    worldscale: 1, // scale full world 
    random: true,  // randomize sample
    info: false,   // calculate statistic or not
    gravity: [0,-9.8,0] 
});

var renderer = new qtek.Renderer({
    canvas: document.getElementById("main")
});
renderer.resize(465, 465);
var scene = new qtek.Scene();
var camera = new qtek.camera.Perspective();
var geometrySphere = new qtek.geometry.Sphere();
var geometryGround = new qtek.geometry.Cube();
var shader = qtek.shader.library.get('qtek.standard', 'diffuseMap');
//var shader = qtek.shader.library.get('qtek.basic');
var materialGround = new qtek.Material({
    shader: shader
});
var diffuseGround = new qtek.Texture2D();
//diffuse.load("/assets/A/k/w/j/AkwjW.jpg");
//diffuse.load("/assets/8/Y/F/W/8YFWD.png"); // white.png
diffuseGround.load("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
materialGround.set('diffuseMap', diffuseGround);
materialGround.set('color', [0x70/0xFF, 0x70/0xFF, 0x70/0xFF]);

var diffuseFootball = new qtek.Texture2D();
diffuseFootball.load("../../assets/s/s/X/x/ssXxc.png"); // Football.png


var meshGround = new qtek.Mesh({
    geometry: geometryGround,
    material: materialGround,
});
meshGround.scale.set(400, 4, 400);
meshGround.position.set(0, -80, 0);
var oimoGround = world.add({
    type: "box",
    size: [400*2, 4*2, 400*2],
    pos: [0, -80, 0],
    rot: [0, 0, 0],
    move: false,
    density: 1
});

var meshSpheres = [];
var oimoSpheres = [];
var box_size = 8;
var i = 0;
for (var y = 0; y < 16; y++) {
    for (var x = 0; x < 16; x++) {
        i = (15 - x) + (15 - y) * 16;
        //i = x + (15 - y) * 16;
        var x1 = -130 + x * (box_size+1)*2 + Math.random();
        var y1 = 30 + y * (box_size+1)*2 + Math.random();
        var z1 = 0 + Math.random();
        var rgbColor = getRgbColor(dataSet[i]);
        var materialSphere = new qtek.Material({
            shader: shader
        });
        materialSphere.set('diffuseMap', diffuseFootball);
        materialSphere.set('color', rgbColor);

        var meshSphere = new qtek.Mesh({
            geometry: geometrySphere,
            material: materialSphere,
        });
        meshSphere.scale.set(box_size, box_size, box_size);
        meshSphere.position.set(x1*2, y1*2, z1*2);
        meshSpheres.push(meshSphere);
        scene.add(meshSphere);
        var oimoSphere = world.add({
            type: "sphere",
            size: [box_size, box_size, box_size],
            pos: [x1, y1, z1],
            rot: [0, 0, 0],
            move: true,
            density: 1
        });
        oimoSpheres.push(oimoSphere);
    }
}

scene.add(meshGround);
scene.add(new qtek.light.Ambient({
    intensity: 1.0
}));

var light = new qtek.light.Directional({
    shadowResolution : 1024,
    shadowBias: 0.005,
    intensity: 0.7
});
light.position.set(0, 30, 30);
light.lookAt(scene.position);
scene.add(light);

camera.position.set(0, 100, 400);

var animation = new qtek.animation.Animation();
animation.start();

var rad = 0;
animation.on('frame', function(deltaTime) {
    world.step();
    var drawInfo = renderer.render(scene, camera);
    for ( var i = 0; i < oimoSpheres.length; i++ ) {
        var oimoSphere = oimoSpheres[i];
        var meshSphere = meshSpheres[i];
        var pos = oimoSphere.getPosition();
        meshSphere.position.set(pos.x, pos.y, pos.z);
        var rot = oimoSphere.getQuaternion();
        meshSphere.rotation.set(rot.x, rot.y, rot.z, rot.w);
    }
    camera.lookAt( new qtek.math.Vector3(0,0,0), new qtek.math.Vector3(0, 1, 0));
    camera.position.set( 400 * Math.sin(rad), 0, 400 * Math.cos(rad));
    rad += Math.PI/180;

});
