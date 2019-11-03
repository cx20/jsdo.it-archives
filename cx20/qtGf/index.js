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
    timestep: 1/60 * 5, 
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
var geometryCube = new qtek.geometry.Cube();
var geometryGround = new qtek.geometry.Cube();
var shader = qtek.shader.library.get('qtek.standard', 'diffuseMap');
//var shader = qtek.shader.library.get('qtek.basic');
var materialGround = new qtek.Material({
    shader: shader
});
var diffuse = new qtek.Texture2D();
//diffuse.load("/assets/A/k/w/j/AkwjW.jpg");
diffuse.load("../../assets/8/Y/F/W/8YFWD.png"); // white.png
materialGround.set('diffuseMap', diffuse);
materialGround.set('color', [0x70/0xFF, 0x70/0xFF, 0x70/0xFF]);

var meshGround = new qtek.Mesh({
    geometry: geometryGround,
    material: materialGround,
});
meshGround.scale.set(200, 4, 200);
meshGround.position.set(0, -80, 0);
var oimoGround = world.add({
    type: "box",
    size: [200*2, 4*2, 200*2],
    pos: [0, -80, 0],
    rot: [0, 0, 0],
    move: false,
    density: 1
});

var meshCubes = [];
var oimoCubes = [];
var DOT_SIZE = 8;
var w = DOT_SIZE*0.2;
var h = DOT_SIZE*1.5;
var d = DOT_SIZE;
var i = 0;
var y = -2;
for (var x = 0; x < 16; x++) {
    for (var z = 0; z < 16; z++) {
        i = x + z * 16;
        var x1 = -110+x*(DOT_SIZE*2);
        var y1 = y*(DOT_SIZE*2);
        var z1 = -120+z*(DOT_SIZE*2)*1.2;
        var rgbColor = getRgbColor(dataSet[i]);
        var materialCube = new qtek.Material({
            shader: shader
        });
        materialCube.set('diffuseMap', diffuse);
        materialCube.set('color', rgbColor);

        var meshCube = new qtek.Mesh({
            geometry: geometryCube,
            material: materialCube,
        });
        meshCube.scale.set(w, h, d);
        meshCube.position.set(x1*2, y1*2, z1*2);
        meshCubes.push(meshCube);
        scene.add(meshCube);
        var oimoCube = world.add({
            type: "box",
            size: [w*2, h*2, d*2],
            pos: [x1, y1, z1],
            rot: [0, 0, 0],
            move: true,
            density: 1
        });
        oimoCubes.push(oimoCube);
    }
}
for ( i = 0; i < 16; i++ ) 
{
    w = DOT_SIZE;
    h = DOT_SIZE;
    d = DOT_SIZE;
    x = 0;
    y = 1;
    z = i;
    var x1 = -115+x*(DOT_SIZE*2);
    var y1 = y*(DOT_SIZE*2);
    var z1 = -120+z*(DOT_SIZE*2)*1.2;
    var materialCube = new qtek.Material({
        shader: shader
    });
    materialCube.set('diffuseMap', diffuse);
    materialCube.set('color', getRgbColor("赤"));
    
    var meshCube = new qtek.Mesh({
        geometry: geometryCube,
        material: materialCube,
    });
    meshCube.scale.set(w, h, d);
    meshCube.position.set(x1*2, y1*2, z1*2);
    meshCubes.push(meshCube);
    scene.add(meshCube);
    var oimoCube = world.add({
        type: "box",
        size: [w*2, h*2, d*2],
        pos: [x1, y1, z1],
        rot: [0, 0, 0],
        move: true,
        density: 1
    });
    oimoCubes.push(oimoCube);
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
light.position.set(0, 30, -30);
light.lookAt(scene.position);
scene.add(light);

camera.position.set(0, 100, 400);

var animation = new qtek.animation.Animation();
animation.start();

var rad = 0;
animation.on('frame', function(deltaTime) {
    world.step();
    var drawInfo = renderer.render(scene, camera);
    for ( var i = 0; i < oimoCubes.length; i++ ) {
        var oimoCube = oimoCubes[i];
        var meshCube = meshCubes[i];
        var pos = oimoCube.getPosition();
        meshCube.position.set(pos.x, pos.y, pos.z);
        var rot = oimoCube.getQuaternion();
        meshCube.rotation.set(rot.x, rot.y, rot.z, rot.w);
    }
    camera.lookAt( new qtek.math.Vector3(0,0,0), new qtek.math.Vector3(0, 1, 0));
    //camera.position.set( 400 * Math.sin(rad), 0, 400 * Math.cos(rad));
    rad += Math.PI/180;

});
