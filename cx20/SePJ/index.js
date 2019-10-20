// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/GeUE
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

// forked from cx20's "GLBoost + Oimo.js で箱にボールを入れてみるテスト（改）" http://jsdo.it/cx20/AndF
// forked from cx20's "GLBoost + Oimo.js で箱にボールを入れてみるテスト（調整中）" http://jsdo.it/cx20/Y91w
// forked from cx20's "GLBoost + Oimo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/GIhN
// forked from cx20's "GLBoost + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/wUhx
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

var OFFSET_Y = -100;
var OFFSET_Z = -300;

var dataSet = [
    {imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
    {imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
    {imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
    {imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
    {imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
];

// glboost var
var glBoostContext;
var canvas = document.getElementById("world");
var renderer;
var camera;
var scene;
var meshs = [];

//oimo var
var world;
var G = -10, nG = -10;
var wakeup = false;
var bodys = [];

init();

function init() {
    canvas = document.getElementById("world");
    glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
    renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});

    renderer.readyForWebVR(document.querySelector('.enter-web-vr'));

    document.querySelector('.enter-web-vr').addEventListener('click', ()=>{
        renderer.enterWebVR();
    });

    scene = glBoostContext.createScene();

    var directionalLight1 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.5, 1.5, 1.5), new GLBoost.Vector3(-45, -45, 0));
    scene.addChild( directionalLight1 );

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

    // oimo init
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

    populate();

    expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

    renderer.doConvenientRenderLoop(expression, function() {
        world.step();
        
        var p, r, m, x, y, z;
        var i = bodys.length;
        var mesh;
        wakeup = false;
    
        if (G !== nG) {
            wakeup = true;
            G = nG;
        }
    
        while (i--) {
            var body = bodys[i];
            mesh = meshs[i];
            var p = body.getPosition();
            mesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            var q = body.getQuaternion();
            mesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
            if ( p.y < -300 ) {
                x = -50 + Math.random()*100;
                y = 200 + Math.random()*100 + OFFSET_Y;
                z = -50 + Math.random()*100 + OFFSET_Z;
                bodys[i].resetPosition(x, y, z);
            }
        }

    });                                    
}

function populate() {
    
    var max = 256;

    // reset old
    clearMesh();

    oimoGround = world.add({
        type: "box",
        size: [400, 40, 400],
        pos: [0, -20 + OFFSET_Y, 0 + OFFSET_Z],
        rot: [0, 0, 0],
        move: false,
        density: 1,
        friction: 0.4, // 摩擦係数
        restitution: 0.6, // 反発係数
    });

    addStaticBox([400, 40, 400], [0,-20 + OFFSET_Y,0 + OFFSET_Z], [0,0,0]);
    
    var boxDataSet = [
        { size:[100, 100,  10], pos:[  0, 50 + OFFSET_Y,-50 + OFFSET_Z], rot:[0,0,0] },
        { size:[100, 100,  10], pos:[  0, 50 + OFFSET_Y, 50 + OFFSET_Z], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[-50, 50 + OFFSET_Y,  0 + OFFSET_Z], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[ 50, 50 + OFFSET_Y,  0 + OFFSET_Z], rot:[0,0,0] } 
    ];
    
    var surfaces = [];
    for ( var i = 0; i < boxDataSet.length; i++ ) {
        var size = boxDataSet[i].size
        var pos  = boxDataSet[i].pos;
        var rot  = boxDataSet[i].rot;
        surfaces[i] = world.add({
            type: "box",
            size: size,
            pos: pos,
            rot: rot,
            move: false,
            density: 1,
            friction: 0.2,
            restitution: 0.6
        });

        addStaticBox(size, pos, rot, true);
    }

    var w;
    var h;
    var d;
    var textures = [];
    var materials = [];
    for (var i = 0; i < dataSet.length; i++) {
        var imageFile = dataSet[i].imageFile;
        materials[i] = glBoostContext.createClassicMaterial();
        textures[i] = glBoostContext.createTexture(imageFile);
        materials[i].setTexture(textures[i]);
        materials[i].shaderClass = GLBoost.LambertShader;
    }

    var x, y, z;
    var i = max;
    while (i--){
        x = -50 + Math.random()*100;
        y = 200 + Math.random()*100 + OFFSET_Y;
        z = -50 + Math.random()*100 + OFFSET_Z;
        w = 20 + Math.random()*10;
        h = 10 + Math.random()*10;
        d = 10 + Math.random()*10;
        var pos = Math.floor(Math.random() * dataSet.length);
        var scale = dataSet[pos].scale;
        w *= scale;
        bodys[i] = world.add({
            type: 'sphere',
            size: [w*0.5],
            pos: [x, y, z],
            move: true,
            friction: 0.4, // 摩擦係数
            restitution: 0.6 // 反発係数
        });
        var geoBox = glBoostContext.createSphere(w*0.5, 24, 24, null);
        meshs[i] = glBoostContext.createMesh(geoBox, materials[pos]);
        meshs[i].translate = new GLBoost.Vector3(w*0.5, w*0.5, w*0.5);
        scene.addChild(meshs[i]);
    }
}

function addStaticBox(size, position, rotation, spec) {

    var geo1 = glBoostContext.createCube(new GLBoost.Vector3(size[0], size[1], size[2]), new GLBoost.Vector4(0.5, 0.5, 0.5, 1));
    var material = glBoostContext.createClassicMaterial();
    material.baseColor = new GLBoost.Vector4(1, 1, 1, 1);

    material.shaderClass = GLBoost.LambertShader;
    var mground1 = glBoostContext.createMesh(geo1, material);


    mground1.translate = new GLBoost.Vector3(position[0], position[1], position[2]);
    if ( spec ) {
        mground1.opacity = 0.5;
    }
    mground1.dirty = true;
    scene.addChild( mground1 );
}

function clearMesh(){
}

