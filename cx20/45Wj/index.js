// forked from cx20's "GLBoost + Oimo.js で坂道にボール転がしてみるテスト" http://jsdo.it/cx20/iegp
// forked from cx20's "GLBoost + Oimo.js で箱にボールを入れてみるテスト" http://jsdo.it/cx20/Y91w
// forked from cx20's "GLBoost + Oimo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/GIhN
// forked from cx20's "GLBoost + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/wUhx
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

var dataSet = [
    {imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
    {imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
    {imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
    {imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
    {imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
];

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
        //eye: new GLBoost.Vector3(0, 100, 400),
        eye: new GLBoost.Vector3(0, 200, 500),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 70.0,
        aspect: 1.0,
        zNear: 1,
        zFar: 1000.0
    });
    scene.add(camera);

    //var directionalLight = new GLBoost.DirectionalLight(new GLBoost.Vector3(1.2, 1.2, 1.2), new GLBoost.Vector3(-3, -10, -5));
    var directionalLight1 = new GLBoost.DirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-1, -10, -1));
    scene.add( directionalLight1 );
    var directionalLight2 = new GLBoost.DirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(1, 1, 1));
    scene.add( directionalLight2 );

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
    
    var ground = new OIMO.Body({size:[400, 40, 400], pos:[0,-20,0], world:world, config:config});
    addStaticBox([400, 40, 400], [0,-20,0], [0,0,0]);
    
    for ( var i = 0; i < 20; i++ ) {
        var ground2 = new OIMO.Body({size:[40, 40, 400], pos:[i * 20,i * 10,0], world:world, config:config});
        addStaticBox([40, 40, 400], [i * 20,i * 10,0], [0,0,0]);
    }

    var w;
    var h;
    var d;
    var shader = new GLBoost.LambertShader();    
    var textures = [];
    var materials = [];
    for (var i = 0; i < dataSet.length; i++) {
        var imageFile = dataSet[i].imageFile;
        materials[i] = new GLBoost.ClassicMaterial();
        textures[i] = new GLBoost.Texture(imageFile);
        materials[i].diffuseTexture = textures[i];
        materials[i].shader = shader;
    }

    var x, y, z;
    var i = max;
    while (i--){
        x = 200 + Math.random()*100;
        y = 300 + Math.random()*300;
        z = -100 + Math.random()*200;
        w = 30 + Math.random()*10;
        h = 30 + Math.random()*10;
        d = 30 + Math.random()*10;
        var pos = Math.floor(Math.random() * dataSet.length);
        var scale = dataSet[pos].scale;
        w *= scale;
        bodys[i] = new OIMO.Body({
            type: 'sphere',
            size: [w*0.5],
            pos: [x, y, z],
            move: true,
            world: world
        });
        var geoBox = new GLBoost.Sphere(w*0.5, 24, 24, null);
        meshs[i] = new GLBoost.Mesh(geoBox, materials[pos]);
        meshs[i].translate = new GLBoost.Vector3(w*0.5, w*0.5, w*0.5);
        scene.add(meshs[i]);
    }
}

function addStaticBox(size, position, rotation, spec) {
    var geo1 = new GLBoost.Cube(new GLBoost.Vector3(size[0], size[1], size[2]), new GLBoost.Vector3(0.5, 0.5, 0.5));
    //var shader = new GLBoost.LambertShader();
    var shader = new GLBoost.PhongShader();
    var material = new GLBoost.ClassicMaterial();
    material.shader = shader;
    var mground1 = new GLBoost.Mesh(geo1, material);
    mground1.translate = new GLBoost.Vector3(position[0], position[1], position[2]);
    if ( spec ) {
        mground1.opacity = 0.5;
    }

    mground1.rotate = new GLBoost.Vector3(rotation[0], rotation[1], rotation[2]);
    
    mground1.dirty = true;
    scene.add( mground1 );
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
            if ( p.y < -300 ) {
                x = 200 + Math.random()*100;
                y = 300 + Math.random()*300;
                z = -100 + Math.random()*200;
                bodys[i].resetPosition(x, y, z);
            }
        }
    }

    var rotateMatrixY = GLBoost.Matrix33.rotateY(0.5);
    var rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    stats.update();

    requestAnimationFrame(loop);
}
