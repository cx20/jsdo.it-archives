// forked from cx20's "Three.js + Oimo.js で箱に色々入れてみるテスト" http://jsdo.it/cx20/olho
// forked from cx20's "Three.js + Oimo.js で箱にボールを入れてみるテスト（その２）" http://jsdo.it/cx20/7cp5
// forked from cx20's "Three.js + Oimo.js で箱にボールを入れてみるテスト" http://jsdo.it/cx20/sOaG
// forked from cx20's "Three.js + Oimo.js で坂道にボールを転がしてみるテスト" http://jsdo.it/cx20/8ECT
// forked from Lo-Th's "Oimo.js Moving" http://lo-th.github.io/Oimo.js/test_moving.html

// three var
var camera, scene, light, renderer, container, content;
var meshs = [];
var grounds = [];
var matGround, matGroundTrans;
var buffgeoSphere, buffgeoBox;
var raycaster, projector;
var ToRad = Math.PI / 180;
var ToDeg = 180 / Math.PI;
var rotTest;

var controls;

//oimo var
var world = null;
var bodys = null;

var fps = [0,0,0,0];
var type=1;

var mario = [];

var boxSizeX = 16/16*20;
var boxSizeY = 16/16*20;
var boxSizeZ = 9/16*20;

var dataSet = [
{
    image: "../../assets/9/9/W/G/99WGE.png", // mario.png
    model: "../../assets/t/N/6/x/tN6xU.obj",     // mario.obj
    type: 'box', 
    size: [16/16*20, 16/16*20, 9/16*20]
},{
    image: "../../assets/7/F/G/d/7FGdo.png", // sheep.png
    model: "../../assets/o/U/g/q/oUgqI.obj",     // sheep.obj
    type: 'box', 
    size: [8/16*20, 11/16*20, 16/16*20]
}, {
    image: "../../assets/k/q/7/I/kq7Is.png", // halloween.png
    model: "../../assets/j/M/p/1/jMp1l.obj",     // halloween.obj
    type: 'sphere', 
    size: [16/16*20]
}];

init();
//loop();

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    initCamera(180,60,400);
    
    raycaster = new THREE.Raycaster();
    projector = new THREE.Projector();
    
    scene = new THREE.Scene();
    
    content = new THREE.Object3D();
    scene.add(content);
    
    scene.add( new THREE.AmbientLight( 0x3D4143 ) );
    
    light = new THREE.DirectionalLight( 0xffffff , 1);
    light.position.set( 300, 1000, 500 );
    light.target.position.set( 0, 0, 0 );
    scene.add( light );
    
    // background
    var buffgeoBack = new THREE.BufferGeometry();
    buffgeoBack.fromGeometry( new THREE.IcosahedronGeometry(8000,1) );
    var back = new THREE.Mesh( buffgeoBack, new THREE.MeshBasicMaterial( { map:gradTexture([[1,0.75,0.5,0.25], ['#1B1D1E','#3D4143','#72797D', '#b0babf']]), side:THREE.BackSide, depthWrite: false }  ));
    back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15*ToRad));
    scene.add( back );
    
    buffgeoSphere = new THREE.BufferGeometry();
    buffgeoSphere.fromGeometry( new THREE.SphereGeometry( 1, 20, 10 ) );
    
    buffgeoBox = new THREE.BufferGeometry();
    buffgeoBox.fromGeometry( new THREE.BoxGeometry( 1, 1, 1 ) );
    
    matGround = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0x3D4143, transparent:true, opacity:0.6 } );
    
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 5.0;    //自動回転する時の速度

    rotTest = new THREE.Vector3();
    
    container = document.getElementById("container");
    container.appendChild( renderer.domElement );
    
    initEvents();
    initOimoPhysics();
}

function addStaticBox(size, position, rotation, spec) {
    var mesh;
    if(spec) mesh = new THREE.Mesh( buffgeoBox, matGroundTrans );
    else mesh = new THREE.Mesh( buffgeoBox, matGround );
    mesh.scale.set( size[0], size[1], size[2] );
    mesh.position.set( position[0], position[1], position[2] );
    mesh.rotation.set( rotation[0]*ToRad, rotation[1]*ToRad, rotation[2]*ToRad );
    if(!grounds.length) content.add( mesh );
    else scene.add( mesh );
    grounds.push(mesh);
}

function clearMesh(){
    var i=meshs.length;
    while (i--) scene.remove(meshs[ i ]);
    i = grounds.length;
    while (i--) scene.remove(grounds[ i ]);
    grounds = [];
    meshs = [];
}

//----------------------------------
//  OIMO PHYSICS
//----------------------------------

function initOimoPhysics(){
    world = new OIMO.World(1/60, 2);
    populate(1);
}

function populate(n) {
    // The Bit of a collision group
    var group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
    var group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
    var group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
    var all = 0xffffffff; // 11111111 11111111 11111111 11111111
    
    var max = 200; // document.getElementById("MaxNumber").value;
    
    //type = 3;
    type = 1;
    
    // reset old
    clearMesh();
    world.clear();
    bodys = [];
    
    // Is all the physics setting for rigidbody
    var config = [
        1, // The density of the shape.
        0.4, // The coefficient of friction of the shape.
        5.0, // The coefficient of restitution of the shape.
        1, // The bits of the collision groups to which the shape belongs.
        all // The bits of the collision groups with which the shape collides.
    ];
    
    //add ground
    var ground = new OIMO.Body({size:[400, 40, 400], pos:[0,-20,0], world:world, config:config});
    addStaticBox([400, 40, 400], [0,-20,0], [0,0,0]);

    var boxDataSet = [
        { size:[100, 100,  10], pos:[  0, 50,-50], rot:[0,0,0] },
        { size:[100, 100,  10], pos:[  0, 50, 50], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[-50, 50,  0], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[ 50, 50,  0], rot:[0,0,0] } 
    ];
    
    var surfaces = [];
    for ( var i = 0; i < boxDataSet.length; i++ ) {
        var size = boxDataSet[i].size;
        var pos  = boxDataSet[i].pos;
        var rot  = boxDataSet[i].rot;
        surfaces[i] = new OIMO.Body({size:size, pos:pos, rot:rot, world:world, config:config});
        addStaticBox(size, pos, rot, true);
    }
    
    // now add object
    for ( var i = 0; i < max; i++ ) {
        loadMario();
    }
        
    loop();
}

function loadMario() {
    var texture = new THREE.Texture();
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {};
    var onProgress = function ( xhr ) {};
    var onError = function ( xhr ) {};

    var pos = Math.floor( Math.random() * dataSet.length );
    var imageFile = dataSet[pos].image;
    var modelFile = dataSet[pos].model;
    var type = dataSet[pos].type;
    var size = dataSet[pos].size;

    var imageLoader = new THREE.ImageLoader( manager );
    imageLoader.load( imageFile, function ( image ) {
        texture.image = image;
        texture.needsUpdate = true;
    } );

    var objLoader = new THREE.OBJLoader();
    objLoader.load( modelFile, function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.map = texture;
                child.material.wireframe = false;
                
                // モデルの座標を調節
                for ( var i = 0; i < child.geometry.vertices.length; i++ ) {
                    child.geometry.vertices[i].y -= 8.5;
                }
            }
        } );
        object.scale.set( 2, 2, 2 );
        var i = mario.length;
        mario[i] = object;

        meshs[i] = object;
        scene.add( meshs[i] );
        
        var x = Math.random() * 20;
        var y = 100 + i * 20;
        var z = Math.random() * 20;

        bodys[i] = new OIMO.Body({
            type:type, 
            size:size, 
            pos:[x, y, z], 
            move:true, 
            world:world
        });
    }, onProgress, onError );
}

function loop() {
    requestAnimationFrame( loop );
    controls.update();
    updateOimoPhysics();
    renderer.clear();
    renderer.render( scene, camera );
}

function updateOimoPhysics() {
    world.step();
    
    var p, r, m, x, y, z;
    var mtx = new THREE.Matrix4();
    var i = bodys.length;
    var mesh;
    var body;
    
    while (i--){
        body = bodys[i].body;
        mesh = meshs[i];
        
        if(!body.sleeping){
            
            mesh.position.copy(body.getPosition());
            mesh.quaternion.copy(body.getQuaternion());
            
            // reset position
            if(mesh.position.y<-100){
                x = 0;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                body.resetPosition(x,y,z);
            }
        } else {
        }
    }
    
}

function gravity(g){
    nG = document.getElementById("gravity").value;
    world.gravity = new OIMO.Vec3(0, nG, 0);
}

//----------------------------------
//  TEXTURES
//----------------------------------

function gradTexture(color) {
    var c = document.createElement("canvas");
    var ct = c.getContext("2d");
    c.width = 16; c.height = 256;
    var gradient = ct.createLinearGradient(0,0,0,256);
    var i = color[0].length;
    while(i--){ gradient.addColorStop(color[0][i],color[1][i]); }
    ct.fillStyle = gradient;
    ct.fillRect(0,0,16,256);
    var texture = new THREE.Texture(c);
    texture.needsUpdate = true;
    return texture;
}
