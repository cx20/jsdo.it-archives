// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/2e3y
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/yy3I
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その３）（仮）" http://jsdo.it/cx20/WlZW
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その２）（仮）" http://jsdo.it/cx20/8PA0
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（仮）" http://jsdo.it/cx20/g9yj
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var renderer;
var camera;
var expression;
var meshGround;
var meshCube;

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
        pos: [0, 100, -50],
        rot: [10, 0, 10],
        move: true,
        density: 1,
        friction: 0.5,
        restitution: 0.2
    });
}

function initBoost() {

    var canvas = document.getElementById("world");
    var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
    renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});

    renderer.readyForWebVR(document.querySelector('.enter-web-vr'));

    document.querySelector('.enter-web-vr').addEventListener('click', ()=>{
        renderer.enterWebVR();
    });

    var scene = glBoostContext.createScene();
    
    var texture = glBoostContext.createTexture('../../assets/A/k/w/j/AkwjW.jpg'); // frog.jpg
    var material = glBoostContext.createClassicMaterial();
    material.setTexture(texture);
    material.baseColor = new GLBoost.Vector4(1, 1, 1, 1);
    
    var geometryGround = glBoostContext.createCube(new GLBoost.Vector3(200, 2, 200), new GLBoost.Vector4(1, 1, 1, 1));
    meshGround = glBoostContext.createMesh(geometryGround, material);
    //meshGround.translate.y = -20; // 最近の GLBoost ではこの指定は NG らしい。。
    meshGround.translate = new GLBoost.Vector3(0, -20, 0);
    scene.addChild(meshGround);

    var geometryCube = glBoostContext.createCube(new GLBoost.Vector3(50, 50, 50), new GLBoost.Vector4(1, 1, 1, 1));
    meshCube = glBoostContext.createMesh(geometryCube, material);
    scene.addChild(meshCube);
    
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
    
    expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

    renderer.doConvenientRenderLoop(expression, function() {
        world.step();
        var p = body.getPosition();
        var q = body.getQuaternion();
        meshCube.translate = new GLBoost.Vector3(p.x, p.y, p.z);
        meshCube.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
    });                                    
}

initOimo();
initBoost();
