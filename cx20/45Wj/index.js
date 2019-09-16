// forked from cx20's "GLBoost + Oimo.js で坂道にボール転がしてみるテスト" http://jsdo.it/cx20/iegp
// forked from cx20's "GLBoost + Oimo.js で箱にボールを入れてみるテスト" http://jsdo.it/cx20/Y91w
// forked from cx20's "GLBoost + Oimo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/GIhN
// forked from cx20's "GLBoost + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/wUhx
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

let width = window.innerWidth;
let height = window.innerHeight;
var dataSet = [
    {imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
    {imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
    {imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
    {imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
    {imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
];

// glboost var
let canvas = document.getElementById("world");
let glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
let renderer;
let camera;
let scene;
let meshs = [];

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
    renderer  = glBoostContext.createRenderer({
      clearColor: {
        red: 0.0,
        green: 0.0,
        blue: 0.0,
        alpha: 1
      }
    });
    renderer.resize(width, height);
    camera = glBoostContext.createPerspectiveCamera({
        eye: new GLBoost.Vector3(0, 200, 400),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 70.0,
        aspect: width/height,
        zNear: 1,
        zFar: 1000.0
    });
    scene.addChild(camera);

    let directionalLight1 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-30, -30, -30));
    scene.addChild( directionalLight1 );
    let directionalLight2 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(30, 30, 30));
    scene.addChild( directionalLight2 );

    // oimo init
    world = new OIMO.World();
    populate();

    expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();
}

function populate() {
    
    // The Bit of a collision group
    let group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
    let group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
    let group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
    let all = 0xffffffff; // 11111111 11111111 11111111 11111111

    let max = 256;

    // reset old
    clearMesh();
    world.clear();

    // Is all the physics setting for rigidbody
    let config = [
        1,   // 密度
        0.4, // 摩擦係数
        0.6, // 反発係数
        1,   // 所属する衝突グループのビット
        all  // 衝突する衝突グループのビット
    ];
    
    let ground = new OIMO.Body({size:[400, 40, 400], pos:[0,-20,0], world:world, config:config});
    addStaticBox([400, 40, 400], [0,-20,0], [0,0,0]);
    
    for ( let i = 0; i < 20; i++ ) {
        let ground2 = new OIMO.Body({size:[40, 40, 400], pos:[i * 20,i * 10,0], world:world, config:config});
        addStaticBox([40, 40, 400], [i * 20,i * 10,0], [0,0,0]);
    }

    let w;
    let h;
    let d;
    let textures = [];
    let materials = [];
    for (let i = 0; i < dataSet.length; i++) {
        let imageFile = dataSet[i].imageFile;
        materials[i] = glBoostContext.createClassicMaterial();
        textures[i] = glBoostContext.createTexture(imageFile);
        materials[i].setTexture(textures[i]);
        materials[i].shaderClass = GLBoost.LambertShader;
    }

    let x, y, z;
    let i = max;
    while (i--){
        x = 200 + Math.random()*100;
        y = 300 + Math.random()*300;
        z = -100 + Math.random()*200;
        w = 30 + Math.random()*10;
        h = 30 + Math.random()*10;
        d = 30 + Math.random()*10;
        let pos = Math.floor(Math.random() * dataSet.length);
        let scale = dataSet[pos].scale;
        w *= scale;
        bodys[i] = new OIMO.Body({
            type: 'sphere',
            size: [w*0.5],
            pos: [x, y, z],
            move: true,
            world: world
        });
        let geoBox = glBoostContext.createSphere(w*0.5, 24, 24, null);
        meshs[i] = glBoostContext.createMesh(geoBox, materials[pos]);
        meshs[i].translate = new GLBoost.Vector3(w*0.5, w*0.5, w*0.5);
        scene.addChild(meshs[i]);
    }
}

function addStaticBox(size, position, rotation, spec) {
    let geo1 = glBoostContext.createCube(new GLBoost.Vector3(size[0], size[1], size[2]), new GLBoost.Vector4(0.5, 0.5, 0.5, 1.0));
    let material = glBoostContext.createClassicMaterial();
    material.shaderClass = GLBoost.PhongShader;
    //material.shaderClass = GLBoost.LambertShader;
    let mground1 = glBoostContext.createMesh(geo1, material);
    mground1.translate = new GLBoost.Vector3(position[0], position[1], position[2]);
    if ( spec ) {
        mground1.opacity = 0.5;
    }

    mground1.rotate = new GLBoost.Vector3(rotation[0], rotation[1], rotation[2]);
    
    mground1.dirty = true;
    scene.addChild( mground1 );
}

function clearMesh(){
/*
    let i=meshs.length;
    while (i--){scene.remove(meshs[ i ]);}
*/
}

// MAIN LOOP

renderer.doConvenientRenderLoop(expression, function() {
    world.step();
    
    let p, r, m, x, y, z;
    let i = bodys.length;
    let mesh;
    wakeup = false;

    if (G !== nG) {
        wakeup = true;
        G = nG;
    }

    while (i--) {
        let body = bodys[i].body;
        mesh = meshs[i];
        if (wakeup) bodys[i].body.awake();
        if (!body.sleeping) {
            let p = body.getPosition();
            mesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            let q = body.getQuaternion();
            mesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
            if ( p.y < -300 ) {
                x = 200 + Math.random()*100;
                y = 300 + Math.random()*300;
                z = -100 + Math.random()*200;
                bodys[i].resetPosition(x, y, z);
            }
        }
    }

    let rotateMatrixY = GLBoost.Matrix33.rotateY(0.5);
    let rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    stats.update();
});
