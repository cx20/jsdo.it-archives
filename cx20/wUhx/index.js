// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

let DOT_SIZE = 16;
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
let dataSet = [
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
    let colorHash = {
        "無":{r:0xDC,g:0xAA,b:0x6B},    // 段ボール色
        "白":{r:0xff,g:0xff,b:0xff},
        "肌":{r:0xff,g:0xcc,b:0xcc},
        "茶":{r:0x80,g:0x00,b:0x00},
        "赤":{r:0xff,g:0x00,b:0x00},
        "黄":{r:0xff,g:0xff,b:0x00},
        "緑":{r:0x00,g:0xff,b:0x00},
        "水":{r:0x00,g:0xff,b:0xff},
        "青":{r:0x00,g:0x00,b:0xff},
        "紫":{r:0x80,g:0x00,b:0x80}
    };
    return colorHash[ c ];
}

let width = window.innerWidth;
let height = window.innerHeight;
// glboost var
let canvas = document.getElementById("world");
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

    scene = new GLBoost.Scene();
    renderer = new GLBoost.Renderer({
        canvas: canvas,
        clearColor: {red: 0, green: 0, blue: 0, alpha: 1}
    });
    renderer.resize(width, height);
    camera = new GLBoost.Camera({
        eye: new GLBoost.Vector3(0, 100, 400),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 70.0,
        aspect: width/height,
        zNear: 1,
        zFar: 1000.0
    });
    scene.add(camera);

    let directionalLight = new GLBoost.DirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-1, -1, -1), '#world');
    scene.add( directionalLight );

    let geo1 = new GLBoost.Cube(new GLBoost.Vector3(400, 40, 400), new GLBoost.Vector3(0.7, 0.7, 0.7), "#world");
    let material = new GLBoost.ClassicMaterial('#world');
    let shader = new GLBoost.PhongShader('#world');
    material.shader = shader;
    let mground1 = new GLBoost.Mesh(geo1, material);
    mground1.translate.y = -50;
    mground1.dirty = true;
    scene.add( mground1 );

    // oimo init
    world = new OIMO.World();
    populate();

    // loop
    scene.prepareForRender();
    loop();
}

function populate() {
    
    let max = 256;

    // reset old
    clearMesh();
    world.clear();

    let ground2 = new OIMO.Body({size:[400, 40, 400], pos:[0,-50,0], world:world});

    let w = DOT_SIZE * 0.8;
    let h = DOT_SIZE * 0.8;
    let d = DOT_SIZE * 0.8;

    for (let i = 0; i < dataSet.length; i++) {
        let x = i % 16 - 6;
        let y = 16 - Math.floor(i / 16);
        let z = 2;
        let c = getRgbColor(dataSet[i]);
        bodys[i] = new OIMO.Body({
            type: 'box',
            size: [w, h, d],
            pos: [x * DOT_SIZE, y * DOT_SIZE, z * DOT_SIZE],
            move: true,
            world: world
        });
        let material = new GLBoost.ClassicMaterial('#world');
        let shader = new GLBoost.PhongShader('#world');
        material.shader = shader;
        let color = new GLBoost.Vector3(c.r / 0xff, c.g / 0xff, c.b / 0xff);
        let geoBox = new GLBoost.Cube(new GLBoost.Vector3(w, h, d), color, "#world");
        meshs[i] = new GLBoost.Mesh(geoBox, material);
        meshs[i].translate = new GLBoost.Vector3(x * DOT_SIZE, y * DOT_SIZE, z * DOT_SIZE);
        scene.add(meshs[i]);
    }
}

function clearMesh(){
/*
    let i=meshs.length;
    while (i--){scene.remove(meshs[ i ]);}
*/
}

// MAIN LOOP

function loop() {
    renderer.clearCanvas();
    renderer.draw(scene);
    
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
        }
    }

    let rotateMatrixY = GLBoost.Matrix33.rotateY(1);
    let rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    stats.update();

    requestAnimationFrame(loop);
}
