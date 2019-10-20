// forked from cx20's "GLBoost + Oimo.js で雛(ひよこ)祭" http://jsdo.it/cx20/QkuW

// glboost var
var glBoostContext;
var canvas = document.getElementById("world");
var width = window.innerWidth;
var height = window.innerHeight;
var renderer;
var camera;
var scene;
var groupMeshs = [];
var wireMeshs = [];
var expression;

//oimo var
var world;
var G = -10, nG = -10;
var wakeup = false;
var bodys = [];

init();

function init() {
    glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
    renderer = glBoostContext.createRenderer({
        clearColor: {red: 0.6, green: 0.6, blue: 0.6, alpha: 1}
        //clearColor: {red: 0.0, green: 0.0, blue: 0.0, alpha: 1}
    });
    renderer.resize(width, height);
    scene = glBoostContext.createScene();
    
    camera = glBoostContext.createPerspectiveCamera({
        eye: new GLBoost.Vector3(0, 300, 400),
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

    var directionalLight1 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.2, 1.2, 1.2), new GLBoost.Vector3(-1, -1, -1));
    scene.addChild( directionalLight1 );
    var directionalLight2 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(0.5, 0.5, 0.5), new GLBoost.Vector3(1, 1, 1));
    scene.addChild( directionalLight2 );

    // oimo init
    world = new OIMO.World();
    populate();

}

function populate() {
    addStairs();
    //addCalender2017();
    
    var w;
    var h;
    var d;

    var index = 100;
    
    var glTFLoader = GLBoost.GLTFLoader.getInstance();
    var promise = glTFLoader.loadGLTF(glBoostContext,'../../assets/g/s/5/8/gs58O.gltf', GLBoost.HalfLambertAndWrapLightingShader); // duck.gltf
    
    promise.then(function(group) {
        var scale = 30;
        var mesh0 = group.searchElement("LOD3spShape-lib");
        
        while (index--){
            x = 250 + Math.random() * 20;
            y = 100 + index * 20;
            z = Math.random() * 20;

            w = 20 + Math.random()*10;
            h = 10 + Math.random()*10;
            d = 10 + Math.random()*10;
            w = 100;
            bodys[index] = new OIMO.Body({
                type: 'sphere',
                size: [w*0.3],
                pos: [x, y, z],
                move: true,
                world: world
            });
            var geometry = glBoostContext.createSphere(w*0.3, 12, 12);
            geometry._primitiveType = GLBoost.LINE_STRIP;
            wireMeshs[index] = glBoostContext.createMesh(geometry, mesh0.material);
            wireMeshs[index].opacity = 0.5;
            var mesh = glBoostContext.createMesh(mesh0.geometry, mesh0.material);
            mesh.translate = new GLBoost.Vector3(-w*0.06, -w*0.21, 0);
            mesh.scale = new GLBoost.Vector3(scale, scale, scale);
            groupMeshs[index] = glBoostContext.createGroup();
            groupMeshs[index].addChild(mesh);
            scene.addChild(groupMeshs[index]);
        }

        expression = glBoostContext.createExpressionAndRenderPasses(1);
        expression.renderPasses[0].scene = scene;
        expression.prepareToRender();
        
        loop();
    });
}

function addStairs() {
    // The Bit of a collision group
    var group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
    var group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
    var group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
    var all = 0xffffffff; // 11111111 11111111 11111111 11111111

    //var max = 256;
    var max = 100;

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
    
    var ground2 = new OIMO.Body({size:[400, 40, 400], pos:[0,-20,0], world:world, config:config});
    addStaticBox([400, 40, 400], [0,-20,0], [0,0,0]);
    
    for ( var i = 0; i < 20; i++ ) {
        var ground3 = new OIMO.Body({size:[40, 40, 400], pos:[i * 20,i * 10,0], world:world, config:config});
        addStaticBox([40, 40, 400], [i * 20,i * 10,0], [0,0,0]);
    }

}

function addStaticBox(size, position, rotation, spec) {
    //var geo1 = glBoostContext.createCube(new GLBoost.Vector3(size[0], size[1], size[2]), new GLBoost.Vector4(1, 0, 0, 1));
    var geo1 = glBoostContext.createCube(new GLBoost.Vector3(size[0], size[1], size[2]), new GLBoost.Vector4(1, 1, 1, 1));
    var material = glBoostContext.createClassicMaterial();
    var shader = GLBoost.LambertShader;    
    material.shaderClass = shader;
    var mground1 = glBoostContext.createMesh(geo1, material);
    mground1.translate = new GLBoost.Vector3(position[0], position[1], position[2]);
    if ( spec ) {
        mground1.opacity = 0.5;
    }
    mground1.dirty = true;
    scene.addChild( mground1 );
}

/*
function addCalender2017() {
    var uSpan = 128;
    var vSpan = 128;
    var material = glBoostContext.createClassicMaterial(canvas);
    var texture = glBoostContext.createTexture("http://jsrun.it/assets/u/d/Q/2/udQ2Y.png"); // 2017.png
    material.diffuseTexture = texture;
    var planeGeometry = glBoostContext.createPlane(20, 20, uSpan, vSpan, null);
    var plane = glBoostContext.createMesh(planeGeometry, material);
    scene.addChild( plane );
}
*/

function clearMesh(){
}

function loop() {
    renderer.clearCanvas();
    renderer.draw(expression);

    world.step();
    
    var r, m, x, y, z;
    var i = bodys.length;
    var mesh;
    var wireMesh;
    wakeup = false;

    if (G !== nG) {
        wakeup = true;
        G = nG;
    }

    while (i--) {
        var body = bodys[i].body;
        mesh = groupMeshs[i];
        wireMesh = wireMeshs[i];
        if (wakeup) bodys[i].body.awake();
        if (!body.sleeping) {
            var p = body.getPosition();
            mesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            wireMesh.translate = new GLBoost.Vector3(p.x, p.y, p.z);
            var q = body.getQuaternion();
            mesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
            wireMesh.quaternion = new GLBoost.Quaternion(q.x, q.y, q.z, q.w);
            if ( p.y < -300 ) {
                x = 250 + Math.random() * 20;
                y = 100 + i * 20;
                z = Math.random() * 20;
                bodys[i].resetPosition(x, y, z);
            }
        }
    }

    var rotateMatrixY = GLBoost.Matrix33.rotateY(0.5);
    var rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    camera.eye = rotatedVector;

    requestAnimationFrame(loop);
}