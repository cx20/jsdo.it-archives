// forked from cx20's "GLBoost + Oimo.js で消しゴムを落下させてみるテスト（改）" http://jsdo.it/cx20/GflU
// forked from cx20's "GLBoost + Oimo.js で消しゴムを落下させてみるテスト" http://jsdo.it/cx20/c2K1
// forked from cx20's "GLBoost + Oimo.js で箱をランダムに落下させてみるテスト" http://jsdo.it/cx20/CLD6
// forked from cx20's "GLBoost + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/wUhx
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

let DOT_SIZE = 30;

GLBoost.CONSOLE_OUT_FOR_DEBUGGING = true;

// glboost var
let canvas = document.getElementById("world");
let width = window.innerWidth;
let height = window.innerHeight;
let glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
let renderer;
let camera;
let scene;
let meshs = [];
let expression;

//oimo var
let world;
let G = -10, nG = -10;
let wakeup = false;
let bodys = [];
let stats;

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
        eye: new GLBoost.Vector3(0, 100, 200),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 70.0,
        aspect: width/height,
        zNear: 0.1,
        zFar: 10000.0
    });
    camera.cameraController = glBoostContext.createCameraController();
    scene.addChild(camera);

    let directionalLight1 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(0.5, 0.5, 0.5), new GLBoost.Vector3(30, 30, 30));
    scene.addChild( directionalLight1 );
    let directionalLight2 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-30, -30, -30));
    scene.addChild( directionalLight2 );
    
    let geo1 = glBoostContext.createCube(new GLBoost.Vector3(200, 20, 200), new GLBoost.Vector4(0.7, 0.7, 0.7, 1));
    let material = glBoostContext.createClassicMaterial();
    //material.shaderClass = GLBoost.PhongShader;
    material.shaderClass = GLBoost.HalfLambertShader;
    let mground1 = glBoostContext.createMesh(geo1, material);
    //mground1.translate.y = -50;
    let tmpVector3 = mground1.translate;
    mground1.translate = new GLBoost.Vector3(tmpVector3.x, tmpVector3.y - 50, tmpVector3.z);
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
    
    let max = 500;

    // reset old
    clearMesh();
    world.clear();

    let ground2 = new OIMO.Body({size:[200, 20, 200], pos:[0,-50,0], world:world});

    let w = DOT_SIZE * 0.8 * 1.0;
    let h = DOT_SIZE * 0.8 * 1.0;
    let d = DOT_SIZE * 0.8 * 0.2;

    let positions = [
        // Front face
        [-0.5 * w,  -0.5 * h,  0.7 * d], // v0
        [ 0.5 * w,  -0.5 * h,  0.7 * d], // v1
        [ 0.35 * w,  0.5 * h,  0.4 * d], // v2
        [-0.35 * w,  0.5 * h,  0.4 * d], // v3
        // Back face
        [-0.5 * w,  -0.5 * h, -0.7 * d], // v4
        [ 0.5 * w,  -0.5 * h, -0.7 * d], // v5
        [ 0.35 * w,  0.5 * h, -0.4 * d], // v6
        [-0.35 * w,  0.5 * h, -0.4 * d], // v7
        // Top face
        [ 0.35 * w,  0.5 * h,  0.4 * d], // v2
        [-0.35 * w,  0.5 * h,  0.4 * d], // v3
        [-0.35 * w,  0.5 * h, -0.4 * d], // v7
        [ 0.35 * w,  0.5 * h, -0.4 * d], // v6
        // Bottom face
        [-0.5 * w,  -0.5 * h,  0.7 * d], // v0
        [ 0.5 * w,  -0.5 * h,  0.7 * d], // v1
        [ 0.5 * w,  -0.5 * h, -0.7 * d], // v5
        [-0.5 * w,  -0.5 * h, -0.7 * d], // v4
        // Right face
        [ 0.5 * w,  -0.5 * h,  0.7 * d], // v1
        [ 0.35 * w,  0.5 * h,  0.4 * d], // v2
        [ 0.35 * w,  0.5 * h, -0.4 * d], // v6
        [ 0.5 * w,  -0.5 * h, -0.7 * d], // v5
        // Left face
        [-0.5 * w,  -0.5 * h,  0.7 * d], // v0
        [-0.35 * w,  0.5 * h,  0.4 * d], // v3
        [-0.35 * w,  0.5 * h, -0.4 * d], // v7
        [-0.5 * w,  -0.5 * h, -0.7 * d], // v4
        // Front2 face
        [-0.35 * w,  0.5 * h,  0.4 * d],  // v3
        [ 0.35 * w,  0.5 * h,  0.4 * d],  // v2
        [ 0.0 * w,   0.6 * h,  0.35 * d], // v8
        // Back2 face
        [-0.35 * w,  0.5 * h, -0.4 * d],  // v7
        [ 0.35 * w,  0.5 * h, -0.4 * d],  // v6
        [ 0.0 * w,   0.6 * h, -0.35 * d], // v9
        // Right2 Face
        [ 0.35 * w,  0.5 * h,  0.4 * d],  // v2
        [ 0.35 * w,  0.5 * h, -0.4 * d],  // v6
        [ 0.0 * w,   0.6 * h, -0.35 * d], // v9
        [ 0.0 * w,   0.6 * h,  0.35 * d], // v8
        // Left2 Face
        [-0.35 * w,  0.5 * h,  0.4 * d],  // v3
        [-0.35 * w,  0.5 * h, -0.4 * d],  // v7
        [ 0.0 * w,   0.6 * h, -0.35 * d], // v9
        [ 0.0 * w,   0.6 * h,  0.35 * d]  // v8
    ];
    
    let texcoords = [
        // Front face
        [0.5,  0.5], // v0
        [0.75, 0.5], // v1
        [0.75, 1.0], // v2
        [0.5,  1.0], // v3
        
        // Back face
        [0.25, 0.5], // v4
        [0.5,  0.5], // v5
        [0.5,  1.0], // v6
        [0.25, 1.0], // v7
        
        // Top face
        [0.75, 0.5], // v2
        [0.5,  0.5], // v3
        [0.5,  0.0], // v7
        [0.75, 0.0], // v6
        
        // Bottom face
        [0.0,  0.5], // v0
        [0.25, 0.5], // v1
        [0.25, 1.0], // v5
        [0.0,  1.0], // v4
        
        // Right face
        [0.0,  0.5], // v1
        [0.0,  0.0], // v2
        [0.25, 0.0], // v6
        [0.25, 0.5], // v5
        
        // Left face
        [0.5,  0.5], // v0
        [0.5,  0.0], // v3
        [0.25, 0.0], // v7
        [0.25, 0.5], // v4
        
        // Front2 face
        [0.75,  0.0], // v3
        [1.0,   0.0], // v2
        [1.0,   0.5], // v8
        // Back2 face
        [0.75,  0.0], // v7
        [1.0,   0.0], // v6
        [1.0,   0.5], // v9
        // Right2 Face
        [0.75,  0.0], // v2
        [1.0,   0.0], // v6
        [1.0,   0.5], // v9
        [0.75,  0.5], // v8
        // Left2 Face
        [0.75,  0.0], // v3
        [1.0,   0.0], // v7
        [1.0,   0.0], // v9
        [0.75,  0.5]  // v8
    ];

    let indices = [
         0,  1,  2,    0,  2 , 3,  // Front face
         4,  5,  6,    4,  6 , 7,  // Back face
         8,  9, 10,    8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15,  // Bottom face
        16, 17, 18,   16, 18, 19,  // Right face
        20, 21, 22,   20, 22, 23,  // Left face
        24, 25, 26,                // Front2 face
        27, 28, 29,                // Back2 face
        30, 31, 32,   30, 32, 33,  // Right2 face
        34, 35, 36,   34, 36, 37   // Left2 face
    ];

    let geometry = glBoostContext.createGeometry();
    let texture = glBoostContext.createTexture('../../assets/o/v/g/u/ovguM.png');
    let material = glBoostContext.createClassicMaterial();
    material.setTexture(texture);
    //material.shaderClass = GLBoost.PhongShader;
    material.shaderClass = GLBoost.HalfLambertShader;
    geometry.setVerticesData({
        position: positions,
        texcoord: texcoords
    }, [indices], GLBoost.TRIANGLE);

    for (let i = 0; i < max; i++) {
        let x = (Math.random() * 8) - 4;
        let y = (Math.random() * 8*2) + 10;
        let z = (Math.random() * 8) - 4;
        bodys[i] = new OIMO.Body({
            type: 'box',
            size: [w, h, d],
            pos: [x * DOT_SIZE, y * DOT_SIZE, z * DOT_SIZE],
            move: true,
            world: world
        });
/*
        let color = new GLBoost.Vector4(1, 1, 1, 1);
        let geoBox = glBoostContext.createCube(new GLBoost.Vector3(w, h, d), color);
        geoBox.updateVerticesData({
            texcoord: texcoords
        });
*/
        let mesh = glBoostContext.createMesh(geometry, material);
        meshs[i] = mesh;
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
    
    let p, r, m, x, y, z;
    let mesh;
    wakeup = false;

    if (G !== nG) {
        wakeup = true;
        G = nG;
    }

    for ( let i = 0; i < bodys.length; i++ ) {
        let body = bodys[i].body;
        mesh = meshs[i];
        if (wakeup) bodys[i].body.awake();
        if (!body.sleeping) {
            let p = body.getPosition();
            mesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            let q = body.getQuaternion();
            mesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
            if ( p.y < -300 ) {
                let x = (Math.random() * 8) - 4;
                let y = (Math.random() * 8*2) + 10;
                let z = (Math.random() * 8) - 4;
                bodys[i].resetPosition(x * DOT_SIZE, y * DOT_SIZE, z * DOT_SIZE);
            }
        }
    }

    let rotateMatrixY = GLBoost.Matrix33.rotateY(1);
    let rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    stats.update();

    requestAnimationFrame(loop);
}
