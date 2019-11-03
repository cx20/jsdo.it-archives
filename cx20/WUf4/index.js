// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/4TBY
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）（その３）（調整中）" http://jsdo.it/cx20/k6uv
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）（その２）（調整中）" http://jsdo.it/cx20/uOIG
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）" http://jsdo.it/cx20/uObL
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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
var geometryCube = new qtek.geometry.Cube();
var geometryGround = new qtek.geometry.Cube();
var shader = qtek.shader.library.get('qtek.standard', 'diffuseMap');
var material = new qtek.Material({
    shader: shader
})

var meshGround = new qtek.Mesh({
    geometry: geometryGround,
    material: material,
});
meshGround.scale.set(200, 4, 200);
meshGround.position.set(0, -50, 0);
var oimoGround = world.add({
    type: "box",
    size: [200*2, 4*2, 200*2],
    pos: [0, -50, 0],
    rot: [0, 0, 0],
    move: false,
    density: 1
});

var meshCube = new qtek.Mesh({
    geometry: geometryCube,
    material: material,
});
meshCube.scale.set(50, 50, 50);
meshCube.position.set(0, 100, 0);

var oimoCube = world.add({
    type: "box",
    size: [50*2, 50*2, 50*2],
    pos: [0, 100, 0],
    rot: [10, 0, 10],
    move: true,
    density: 1
});

var diffuse = new qtek.Texture2D;
diffuse.load("../../assets/A/k/w/j/AkwjW.jpg");
material.set('diffuseMap', diffuse);

scene.add(meshCube);
scene.add(meshGround);
scene.add(new qtek.light.Ambient({
    intensity: 1.0
}))

camera.position.set(0, 100, 400);

var animation = new qtek.animation.Animation;
animation.start();

var rad = 0;
animation.on('frame', function(deltaTime) {
    world.step();
    var drawInfo = renderer.render(scene, camera);

    var pos = oimoCube.getPosition();
    meshCube.position.set(pos.x, pos.y, pos.z);
    var rot = oimoCube.getQuaternion();
    meshCube.rotation.set(rot.x, rot.y, rot.z, rot.w);
    camera.lookAt( new qtek.math.Vector3(0,0,0), new qtek.math.Vector3(0, 1, 0));
    camera.position.set( 400 * Math.sin(rad), 0, 400 * Math.cos(rad));
    rad += Math.PI/180;

});
