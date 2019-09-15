// forked from cx20's "GLBoost + Oimo.js で箱をランダムに落下させてみるテスト" http://jsdo.it/cx20/CLD6
// forked from cx20's "GLBoost + Oimo.js でドット絵を落下させてみるテスト" http://jsdo.it/cx20/wUhx
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo

var DOT_SIZE = 40;

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
        eye: new GLBoost.Vector3(0, 100, 400),
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
    
    var geo1 = new GLBoost.Cube(new GLBoost.Vector3(200, 20, 200), new GLBoost.Vector3(0.7, 0.7, 0.7), "#world");
    var material = new GLBoost.ClassicMaterial('#world');
    var shader = new GLBoost.PhongShader('#world');
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
    
    var max = 500;

    // reset old
    clearMesh();
    world.clear();

    var ground2 = new OIMO.Body({size:[200, 20, 200], pos:[0,-50,0], world:world});

    var w = DOT_SIZE * 0.8 * 1.0;
    var h = DOT_SIZE * 0.8 * 0.2;
    var d = DOT_SIZE * 0.8 * 0.5;

    var texture = new GLBoost.Texture('../../assets/7/5/o/P/75oPt.png', '#world'); // 512x256.png
    //var texture = new GLBoost.Texture('512x256.png', '#world'); // 512x256.png
    var material = new GLBoost.ClassicMaterial('#world');
    material.diffuseTexture = texture;

    var texcoords = [
        // Top face
        new GLBoost.Vector2(0.5,  0.0), // v0
        new GLBoost.Vector2(0.75, 0.0), // v1
        new GLBoost.Vector2(0.75, 0.5), // v2
        new GLBoost.Vector2(0.5,  0.5), // v3

        // Bottom face
        new GLBoost.Vector2(0.0,  1.0), // v4
        new GLBoost.Vector2(0.25, 1.0), // v5
        new GLBoost.Vector2(0.25, 0.5), // v6
        new GLBoost.Vector2(0.0,  0.5), // v7

        // Front face
        new GLBoost.Vector2(0.5,  0.5), // v7
        new GLBoost.Vector2(0.75, 0.5), // v6
        new GLBoost.Vector2(0.75, 1.0), // v2
        new GLBoost.Vector2(0.5,  1.0), // v3

        // Back face
        new GLBoost.Vector2(0.25, 0.5), // v4
        new GLBoost.Vector2(0.5,  0.5), // v5
        new GLBoost.Vector2(0.5,  1.0), // v1
        new GLBoost.Vector2(0.25, 1.0), // v0

        // Right face
        new GLBoost.Vector2(0.0,  0.5), // v1
        new GLBoost.Vector2(0.0,  0.0), // v2
        new GLBoost.Vector2(0.25, 0.0), // v6
        new GLBoost.Vector2(0.25, 0.5), // v5

        // Left face
        new GLBoost.Vector2(0.5,  0.5), // v0
        new GLBoost.Vector2(0.5,  0.0), // v3
        new GLBoost.Vector2(0.25, 0.0), // v7
        new GLBoost.Vector2(0.25, 0.5)  // v4
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
        //var material = new GLBoost.ClassicMaterial('#world');
        //var shader = new GLBoost.PhongShader('#world');
        //material.shader = shader;

        //var color = new GLBoost.Vector3(Math.random(), Math.random(), Math.random());
        var color = new GLBoost.Vector3(1, 1, 1);
        var geoBox = new GLBoost.Cube(new GLBoost.Vector3(w, h, d), color, "#world");
        geoBox.updateVerticesData({
            texcoord: texcoords
        });
        meshs[i] = new GLBoost.Mesh(geoBox, material);
        meshs[i].translate = new GLBoost.Vector3(x * DOT_SIZE, y * DOT_SIZE, z * DOT_SIZE);
        scene.add(meshs[i]);
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
