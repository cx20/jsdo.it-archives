// forked from cx20's "GLBoost + Oimo.js で箱をランダムに落下させてみるテスト" http://jsdo.it/cx20/CLD6
// forked from cx20's "GLBoost + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/wUhx
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

var DOT_SIZE = 16;

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

var types, sizes, positions
	
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
        eye: new GLBoost.Vector3(0, 50, 300),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 70.0,
        aspect: 1.0,
        zNear: 1,
        zFar: 1000.0
    });
    scene.add(camera);

    var directionalLight1 = new GLBoost.DirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(-1, -1, -1));
    scene.add( directionalLight1 );
    var directionalLight2 = new GLBoost.DirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(1, 1, 1));
    scene.add( directionalLight2 );

    var geo1 = new GLBoost.Cube(new GLBoost.Vector3(400, 40, 400), new GLBoost.Vector3(0.7, 0.7, 0.7));
    var material = new GLBoost.ClassicMaterial();
    var shader = new GLBoost.PhongShader();
    material.shader = shader;
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
    
    //var max = 256;
    var max = 512;

    // reset old
    clearMesh();
    world.clear();

    var ground2 = new OIMO.Body({size:[400, 40, 400], pos:[0,-50,0], world:world});

    var w = DOT_SIZE * 0.8;
    var h = DOT_SIZE * 0.8;
    var d = DOT_SIZE * 0.8;

    // ゴゴゴ
    types = [ 'box', 'box', 'box', 'box', 'box' ];
    sizes = [ 30,5,5,  5,30,5, 30,5,5, 5,10,5, 5,10,5 ];
    positions = [ 0,-15,0, 15,0,0, 0,15,0, 21,15,0, 27,15,0 ];

    var material0 = new GLBoost.ClassicMaterial();
    var geometry0 = new GLBoost.Cube(new GLBoost.Vector3(0, 0, 0), new GLBoost.Vector3(0.5, 0.5, 0.5));
    var mesh0 = new GLBoost.Mesh(geometry0, material0);
    var bar, n, m;
    var bars = [];
    for (var i = 0; i < types.length; i++) {
        n = i * 3;
        var color = new GLBoost.Vector3(1, 1, 1);
        var material = new GLBoost.ClassicMaterial();
        var geoBox = new GLBoost.Cube(new GLBoost.Vector3(sizes[n + 0], sizes[n + 1], sizes[n + 2]), color);
        var bar = new GLBoost.Mesh(geoBox, material);
        bar.translate = new GLBoost.Vector3(positions[n + 0], positions[n + 1], positions[n + 2]);
        bars.push(bar);
    }
    mesh0.mergeHarder(bars);

    for (var i = 0; i < max; i++) {
        var material = new GLBoost.ClassicMaterial();
        material.baseColor = new GLBoost.Vector4(Math.random(), Math.random(), Math.random(), 1);
        var shader = new GLBoost.PhongShader();
        material.shader = shader;
        meshs[i] = new GLBoost.Mesh(mesh0.geometry, material);
        scene.add(meshs[i]);

        positions[1] = 100 + (i * 10);
        positions[0] = Math.random() * 200 - 100;
        positions[2] = Math.random() * 200 - 100;
        var b = new OIMO.Body({
            type: types,
            size: sizes,
            pos: positions,
            move: true,
            world: world,
            name: 'box' + i,
            config: [0.2, 0.4, 0.1]
        });

        bodys[i] = b.body;
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
        var body = bodys[i];
        mesh = meshs[i];
        if (wakeup) bodys[i].body.awake();
        if (!body.sleeping) {
            var p = body.getPosition();
            mesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            var q = body.getQuaternion();
            mesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
            if ( p.y < -100 ) {
                var x = (Math.random() * 50);
                var y = (Math.random() * 50) + 300;
                var z = (Math.random() * 50);
                bodys[i].resetPosition(x, y, z);
            }
        }
    }

    var rotateMatrixY = GLBoost.Matrix33.rotateY(1);
    var rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    stats.update();

    requestAnimationFrame(loop);
}
