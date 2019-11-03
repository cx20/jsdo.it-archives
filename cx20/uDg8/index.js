// forked from cx20's "GLBoost + Oimo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/GIhN
// forked from cx20's "GLBoost + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/wUhx
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

var DOT_SIZE = 16;
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

// glboost var
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
var stats;

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
    camera = new GLBoost.Camera({
        eye: new GLBoost.Vector3(0, 200, 300),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 70.0,
        aspect: 1.0,
        zNear: 1,
        zFar: 1000.0
    });
    scene.add(camera);

    var directionalLight1 = new GLBoost.DirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(1, 1, 1), '#world');
    scene.add( directionalLight1 );
    var directionalLight2 = new GLBoost.DirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-1, -1, -1), '#world');
    scene.add( directionalLight2 );

    var geo1 = new GLBoost.Cube(new GLBoost.Vector3(400, 40, 400), new GLBoost.Vector3(1, 1, 1), "#world");
    var material = new GLBoost.ClassicMaterial('#world');
    //var texture = new GLBoost.Texture('grass.jpg', '#world'); // grass.jpg
    var texture = new GLBoost.Texture('/assets/u/y/G/y/uyGy9.jpg', '#world'); // grass.jpg
    material.diffuseTexture = texture;

    var mground1 = new GLBoost.Mesh(geo1, material);
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
    
    // The Bit of a collision group
    var group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
    var group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
    var group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
    var all = 0xffffffff; // 11111111 11111111 11111111 11111111

    var max = 256;

    // reset old
    clearMesh();
    world.clear();

    // Is all the physics setting for rigidbody
    var config = [
        1,   // 密度
        0.4, // 摩擦係数
        0.6, // 反発係数
        1,   // 所属する衝突グループのビット
        all  // 衝突する衝突グループのビット
    ];
    
    var ground2 = new OIMO.Body({size:[400, 40, 400], pos:[0,-50,0], world:world, config:config});

    var w = DOT_SIZE*0.2;
    var h = DOT_SIZE*1.5;
    var d = DOT_SIZE;

    var i;
    var y;
    for ( var x = 0; x < 16; x++ ) {
        for ( var z = 0; z < 16; z ++ ) {
            i = x + (z) * 16;
            var c = getRgbColor(dataSet[i]);
            y = 0;
            bodys[i] = new OIMO.Body({
                type: 'box',
                size: [w, h, d],
                pos:[-120+x*DOT_SIZE,y*DOT_SIZE,-120+z*DOT_SIZE*1.2], 
                move: true,
                world: world
            });
            var material = new GLBoost.ClassicMaterial('#world');
            var shader = new GLBoost.PhongShader('#world');
            material.shader = shader;
            var color = new GLBoost.Vector4(c.r / 0xff, c.g / 0xff, c.b / 0xff, 1.0);
            var geoBox = new GLBoost.Cube(new GLBoost.Vector3(w, h, d), color, "#world");
            meshs[i] = new GLBoost.Mesh(geoBox, material);
            meshs[i].translate = new GLBoost.Vector3(w, h, d);
            scene.add(meshs[i]);
        }
    }

    var size = bodys.length;
    for ( i = 0; i < 16; i++ ) 
    {
        w = DOT_SIZE;
        h = DOT_SIZE;
        d = DOT_SIZE;
        x = 0;
        y = 2;
        z = i;
        bodys[size+i] = new OIMO.Body({
                type:'box', 
                size:[w,h,d], 
                pos:[-125+x*DOT_SIZE,y*DOT_SIZE,-120+z*DOT_SIZE*1.2], 
                move:true, 
                world:world
            });
        var material = new GLBoost.ClassicMaterial('#world');
        var shader = new GLBoost.PhongShader('#world');
        material.shader = shader;
        var color = new GLBoost.Vector4(1, 0, 0, 1);
        var geoBox = new GLBoost.Cube(new GLBoost.Vector3(w, h, d), color, "#world");
        meshs[size+i] = new GLBoost.Mesh(geoBox, material);
        meshs[size+i].translate = new GLBoost.Vector3(w, h, d);
        scene.add( meshs[size+i] );
    }
}

function clearMesh(){
/*
    var i=meshs.length;
    while (i--){scene.remove(meshs[ i ]);}
*/
}

// MAIN LOOP

function loop() {
    renderer.clearCanvas();
    renderer.draw(scene);
    
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
        var body = bodys[i].body;
        mesh = meshs[i];
        if (wakeup) bodys[i].body.awake();
        if (!body.sleeping) {
            var p = body.getPosition();
            mesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            var q = body.getQuaternion();
            mesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
        }
    }

    //var rotateMatrixY = GLBoost.Matrix33.rotateY(1);
    //var rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    //camera.eye = rotatedVector;

    stats.update();

    requestAnimationFrame(loop);
}
