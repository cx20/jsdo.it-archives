// forked from cx20's "[WebGL] QTEK + Oimo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/s2wJ
// forked from cx20's "[WebGL] qtek.js + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/6viZ
// forked from cx20's "[WebGL] qtek.js + oimo.js を試してみるテスト" http://jsdo.it/cx20/WUf4
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/4TBY
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）（その３）（調整中）" http://jsdo.it/cx20/k6uv
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）（その２）（調整中）" http://jsdo.it/cx20/uOIG
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（組み込みシェーダ編）" http://jsdo.it/cx20/uObL
// forked from cx20's "[WebGL] qtek.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var dataSet = [
    {imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
    {imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
    {imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
    {imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
    {imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
];

var world;
var renderer;
var shadowMapPass;
var scene;
var camera;
var geometrySphere;
var geometryGround;
var shader;
var meshSpheres = [];
var oimoSpheres = [];

function initScene() {
    renderer = new qtek.Renderer({
        canvas: document.getElementById("main")
    });
    //renderer.resize(465, 465);
    renderer.resize(window.innerWidth, window.innerHeight);
    shadowMapPass = new qtek.prePass.ShadowMap();
    scene = new qtek.Scene();
    camera = new qtek.camera.Perspective();
    camera.aspect = window.innerWidth / window.innerHeight;
    geometrySphere = new qtek.geometry.Sphere();
    geometryGround = new qtek.geometry.Cube();
    shader = qtek.shader.library.get('qtek.standard', 'diffuseMap');
    camera.position.set(0, 100, 400);
}

function initWorld() {
    // oimo init
    world = new OIMO.World({ 
        timestep: 1/60 * 5, 
        iterations: 8, 
        broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: [0,-9.8,0] 
    });
}

function addGround() {
    var materialGround = new qtek.Material({
        shader: shader
    });
    var diffuseGround = new qtek.Texture2D();
    diffuseGround.load("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
    materialGround.set('diffuseMap', diffuseGround);
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
    scene.add(meshGround);
}

function addBox() {
    var materialSurface = new qtek.Material({
        shader: shader
    });
    var diffuseSurface = new qtek.Texture2D();
    diffuseSurface.load("../../assets/8/Y/F/W/8YFWD.png"); // white.png
    materialSurface.set('diffuseMap', diffuseSurface);
    materialSurface.set('color', [0x70/0xFF, 0x70/0xFF, 0x70/0xFF]);
    materialSurface.depthMask = false;
    materialSurface.transparent = true;
    materialSurface.set('alpha', 0.5);

    var boxDataSet = [
        { size:[100, 100,  10], pos:[  0, 50,-50], rot:[0,0,0] },
        { size:[100, 100,  10], pos:[  0, 50, 50], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[-50, 50,  0], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[ 50, 50,  0], rot:[0,0,0] } 
    ];

    var geometrySurface = new qtek.geometry.Cube();
    var surfaces = [];
    for ( var i = 0; i < boxDataSet.length; i++ ) {
        var size = boxDataSet[i].size;
        var pos  = boxDataSet[i].pos;
        var rot  = boxDataSet[i].rot;
        var meshSurface = new qtek.Mesh({
            geometry: geometrySurface,
            material: materialSurface,
        });
        meshSurface.position.set(pos[0], pos[1] - 80, pos[2]);
        meshSurface.scale.set(size[0]/2, size[1]/2, size[2]/2);
        scene.add(meshSurface);
        var oimoGround = world.add({
            type: "box",
            size: [size[0], size[1], size[2]],
            pos: [pos[0], pos[1] - 80, pos[2]],
            rot: [0, 0, 0],
            move: false,
            density: 1
        });
    }
}

function addBall() {
    var materialSpheres = [];
    for (var i = 0; i < dataSet.length; i++ ) {
        var diffuseSphere = new qtek.Texture2D();
        diffuseSphere.load(dataSet[i].imageFile);
        var materialSphere = new qtek.Material({
            shader: shader
        });
        materialSphere.set('diffuseMap', diffuseSphere);
        materialSpheres.push(materialSphere);
    }

    var n = 400;
    while (n--){
        var x = -50 + Math.random()*100;
        var y = 200 + Math.random()*100;
        var z = -50 + Math.random()*100;
        var w = 10;
        var h = 10;
        var d = 10;
        var pos = Math.floor(Math.random() * dataSet.length);
        var scale = dataSet[pos].scale;
        
        var meshSphere = new qtek.Mesh({
            geometry: geometrySphere,
            material: materialSpheres[pos],
        });
        meshSphere.scale.set(w*scale, h*scale, d*scale);
        meshSphere.position.set(x, y, z);
        meshSpheres.push(meshSphere);
        scene.add(meshSphere);
        var oimoSphere = world.add({
            type: "sphere",
            size: [w*scale, h*scale, d*scale],
            pos: [x, y, z],
            rot: [0, 0, 0],
            move: true,
            density: 1,
            friction: 0.2,
            restitution: 0.6
        });
        oimoSpheres.push(oimoSphere);
    }
}

function addLight() {
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
}

function animate() {
    var animation = new qtek.animation.Animation();
    animation.start();

    var rad = 0;
    animation.on('frame', function(deltaTime) {
        world.step();
        shadowMapPass.render(renderer, scene, camera);
        var drawInfo = renderer.render(scene, camera);
        for ( var i = 0; i < oimoSpheres.length; i++ ) {
            var oimoSphere = oimoSpheres[i];
            var meshSphere = meshSpheres[i];
            var pos = oimoSphere.getPosition();
            meshSphere.position.set(pos.x, pos.y, pos.z);
            var rot = oimoSphere.getQuaternion();
            meshSphere.rotation.set(rot.x, rot.y, rot.z, rot.w);
            if ( meshSphere.position.y < -100 ) {
                var x = -50 + Math.random()*100;
                var y = 200 + Math.random()*100;
                var z = -50 + Math.random()*100;
                oimoSphere.resetPosition(x, y, z);
            }
        }
        camera.lookAt( new qtek.math.Vector3(0,0,0), new qtek.math.Vector3(0, 1, 0));
        //camera.position.set( 400 * Math.sin(rad), 0, 400 * Math.cos(rad));
        rad += Math.PI/180;

    });
}

initScene();
initWorld();
addGround();
addBox();
addBall();
addLight();
animate();
