// forked from cx20's "GLBoost + Oimo.js で消しゴムを落下させてみるテスト" http://jsdo.it/cx20/c2K1
// forked from cx20's "GLBoost + Oimo.js で箱をランダムに落下させてみるテスト" http://jsdo.it/cx20/CLD6
// forked from cx20's "GLBoost + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/wUhx
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

var DOT_SIZE = 40;

//GLBoost.CONSOLE_OUT_FOR_DEBUGGING = true;

// glboost var
var canvas = document.getElementById("world");
var width = window.innerWidth;
var height = window.innerHeight;
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
var renderer;
var camera;
var scene;
var meshs = [];
var expression;

//oimo var
var world;
var G = -10, nG = -10;
var wakeup = false;
var bodys = [];
var stats;

init();

function init() {
    stats = new Stats();
    stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb
    stats.domElement.style.position = "fixed";
    stats.domElement.style.left     = "5px";
    stats.domElement.style.top      = "5px";
    document.body.appendChild(stats.domElement);

    scene = glBoostContext.createScene();
    renderer = glBoostContext.createRenderer({
        canvas: canvas,
        clearColor: {red: 0, green: 0, blue: 0, alpha: 1}
    });
    renderer.resize(width, height);
    camera = glBoostContext.createPerspectiveCamera({
        eye: new GLBoost.Vector3(0, 200, 100),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 70.0,
        aspect: width/height,
        zNear: 1,
        zFar: 1000.0
    });
    camera.cameraController = glBoostContext.createCameraController();
    scene.addChild(camera);

    var directionalLight1 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(1, -1, 1));
    scene.addChild( directionalLight1 );
    var directionalLight2 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-1, -1, -1));
    scene.addChild( directionalLight2 );
    
    var geo1 = glBoostContext.createCube(new GLBoost.Vector3(200, 20, 200), new GLBoost.Vector4(0.7, 0.7, 0.7, 1));
    var material = glBoostContext.createClassicMaterial();
    material.shaderClass = GLBoost.PhongShader;
    var mground1 = glBoostContext.createMesh(geo1, material);
    mground1.translate.y = -50;
    mground1.dirty = true;
    scene.addChild( mground1 );

    // oimo init
    world = new OIMO.World();
    populate();

    // loop
    //scene.prepareForRender();
    expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();
    loop();
}

function populate() {
    
    var max = 500;

    // reset old
    clearMesh();
    world.clear();

    var ground2 = new OIMO.Body({size:[200, 20, 200], pos:[0,-50,0], world:world});

    var w = DOT_SIZE * 0.8 * 1.0;
    var h = DOT_SIZE * 0.8 * 0.2;
    var d = DOT_SIZE * 0.8 * 0.5;

    var texture = glBoostContext.createTexture('../../assets/7/5/o/P/75oPt.png'); // 512x256.png
    var material = glBoostContext.createClassicMaterial();
    material.setTexture(texture);
    material.shaderClass = GLBoost.PhongShader;

    var texcoords = [
        // Top face
        [0.5,  0.0], // v0
        [0.75, 0.0], // v1
        [0.75, 0.5], // v2
        [0.5,  0.5], // v3

        // Bottom face
        [0.0,  1.0], // v4
        [0.25, 1.0], // v5
        [0.25, 0.5], // v6
        [0.0,  0.5], // v7

        // Front face
        [0.5,  0.5], // v7
        [0.75, 0.5], // v6
        [0.75, 1.0], // v2
        [0.5,  1.0], // v3

        // Back face
        [0.25, 0.5], // v4
        [0.5,  0.5], // v5
        [0.5,  1.0], // v1
        [0.25, 1.0], // v0

        // Right face
        [0.0,  0.5], // v1
        [0.0,  0.0], // v2
        [0.25, 0.0], // v6
        [0.25, 0.5], // v5

        // Left face
        [0.5,  0.5], // v0
        [0.5,  0.0], // v3
        [0.25, 0.0], // v7
        [0.25, 0.5]  // v4
    ];

    for (var i = 0; i < max; i++) {
        var x = (Math.random() * 8) - 4;
        var y = (Math.random() * 8*2) + 10;
        var z = (Math.random() * 8) - 4;
        bodys[i] = new OIMO.Body({
            type: 'box',
            size: [w, h, d],
            pos: [x * DOT_SIZE, y * DOT_SIZE, z * DOT_SIZE],
            move: true,
            world: world
        });

        var color = new GLBoost.Vector4(1, 1, 1, 1);
        var geoBox = glBoostContext.createCube(new GLBoost.Vector3(w, h, d), color);
        geoBox.updateVerticesData({
            texcoord: texcoords
        });
        meshs[i] = glBoostContext.createMesh(geoBox, material);
        meshs[i].translate = new GLBoost.Vector3(x * DOT_SIZE, y * DOT_SIZE, z * DOT_SIZE);
        scene.addChild(meshs[i]);
    }
}

function clearMesh(){
}

// MAIN LOOP

function loop() {
    renderer.clearCanvas();
    renderer.draw(expression);
    
    world.step();
    
    var p, r, m, x, y, z;
    var mesh;
    wakeup = false;

    if (G !== nG) {
        wakeup = true;
        G = nG;
    }

    for ( var i = 0; i < bodys.length; i++ ) {
        var body = bodys[i].body;
        mesh = meshs[i];
        if (wakeup) bodys[i].body.awake();
        if (!body.sleeping) {
            var p = body.getPosition();
            mesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            var q = body.getQuaternion();
            mesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
            if ( p.y < -300 ) {
                var x = (Math.random() * 8) - 4;
                var y = (Math.random() * 8*2) + 10;
                var z = (Math.random() * 8) - 4;
                bodys[i].resetPosition(x * DOT_SIZE, y * DOT_SIZE, z * DOT_SIZE);
            }
        }
    }

    var rotateMatrixY = GLBoost.Matrix33.rotateY(1);
    var rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    stats.update();

    requestAnimationFrame(loop);
}
