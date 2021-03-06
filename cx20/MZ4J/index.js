// forked from cx20's "[WebGL] CZPG.js を試してみるテスト（組み込み関数編）（その４）（調整中）" http://jsdo.it/cx20/KvL5
// forked from cx20's "[WebGL] CZPG.js を試してみるテスト（組み込み関数編）（その３）（調整中）" http://jsdo.it/cx20/kgpcC
// forked from cx20's "[WebGL] CZPG.js を試してみるテスト（組み込み関数編）（その２）（調整中）" http://jsdo.it/cx20/6q6N
// forked from cx20's "[WebGL] CZPG.js を試してみるテスト（組み込み関数編）（調整中）" http://jsdo.it/cx20/2J8N
// forked from cx20's "[WebGL] CZPG.js を試してみるテスト" http://jsdo.it/cx20/eG4v
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var world;
var body;

function initOimo() {
    world = new OIMO.World({ 
        timestep: 1/30, 
        iterations: 8, 
        broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: [0,-9.8,0] 
    });

    var groundBody = world.add({
        type: "box",
        size: [200, 2, 200],
        pos: [0, -20, 0],
        rot: [0, 0, 0],
        move: false,
        density: 1,
        friction: 0.5,
        restitution: 0.1,
    });
    body = world.add({
        type: "box",
        size: [50, 50, 50],
        pos: [0, 100, 0],
        rot: [10, 0, 10],
        move: true,
        density: 1,
        friction: 0.5,
        restitution: 0.2
    });
}

var renderer;
var context;
var scene;
var camera;
var modelCube;
var modelGround;
var shader;
var controler;
var cameraControler

function initCzpg() {
    renderer = new CZPG.Renderer('c').setSize('100%', '100%').clear(1.0, 1.0, 1.0, 1.0);
    context = renderer.context;
    scene = new CZPG.Scene(renderer);
    controler = scene.controler;
    
    camera = new CZPG.PerspectiveCamera(45, context.canvas.width/context.canvas.height, 0.01, 2000);
    camera.position = [0, 50, 200];
    camera.updateViewMatrix(); // lookAt target is [0,0,0] by default
    // Is there need a orbit control? cause it rotate by default...
    cameraControler = new CZPG.OrbitControls(camera, context.canvas, controler);
    cameraControler.enableDamping = true;
    cameraControler.autoRotate = true;

    const textures = CZPG.createTextures(context, { 
        pic: {
            src : '../../assets/A/k/w/j/AkwjW.jpg',
            min : context.LINEAR_MIPMAP_LINEAR,
            mag : context.LINEAR,
        },
    });

    modelCube = CZPG.Cube.createModel();
    modelCube.scale = [50, 50, 50];
    shader = new CZPG.FlatTextureShader(context, camera, textures.pic);
    scene.add({shader: shader, model: modelCube});

    modelGround = CZPG.Cube.createModel();
    modelGround.position = [0, -20, 0];
    modelGround.scale = [200, 2, 200];
    scene.add({shader: shader, model: modelGround});

}

function animate() {
    let resized = false;
    let rad = 0;
    let loop = new CZPG.Render(function(timespan) {
        resized = renderer.clear(1.0, 1.0, 1.0, 1.0).fixCanvasToDisplay(window.devicePixelRatio);
        if(resized) camera.updateProjMatrix( context.canvas.width / context.canvas.height );
        updatePhysics();
        cameraControler.update();
        scene.render();
    }).start();
}    

function updatePhysics() {
    world.step();
    
    let p = body.position;
    let q = body.quaternion;

    modelCube.position = [p.x, p.y, p.z];
    modelCube.quaternion = [q.x, q.y, q.z, q.w];
}

initOimo();
initCzpg();
animate();
