// forked from cx20's "[WebGL] three.js で WebVR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/21Bb
// forked from cx20's "[WebGL] three.js で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/WmiX
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/dutP
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/kwGs
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/d11S
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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
        "無":0xDCAA6B,    // 段ボール色
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
    return colorHash[ c ];
}


// three var
var camera, scene, light, renderer, container, center;
var meshs = [];
var geoBox, geoSphere;
var matBox, matSphere, matBoxSleep, matSphereSleep;

var camPos = { horizontal: 40, vertical: 60, distance: 400, automove: false };
var mouse = { ox:0, oy:0, h:0, v:0, mx:0, my:0, down:false, over:false, moving:true };

var controller;

//oimo var
var world;
var G = -10, nG = -10;
var wakeup = false;
var bodys = [];

var fps=0, time, time_prev=0, fpsint = 0;
var ToRad = Math.PI / 180;
var type=2;

init();
  
function init() {
    
    // three init
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false, clearColor: 0x000000, clearAlpha: 0});
    renderer.setClearColor( 0x000000, 1 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.vr.enabled = true;
    
    container = document.getElementById("container");
    container.appendChild( renderer.domElement );

    document.body.appendChild( WEBVR.createButton( renderer ) );
    controller = new THREE.GearVRController();
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    //camera.position.set( 100, 200, 200 );
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    center = new THREE.Vector3();
    
    scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x333333 ) );
    scene.position.x = 0;
    scene.position.y = 0;
    scene.position.z = -200;

    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );
    light = new THREE.DirectionalLight( 0xffffff, 2 );
    light.position.set( -50, 100, 0 );
    scene.add( light );

    
    //add ground mesh
    var texture = THREE.ImageUtils.loadTexture("../../assets/u/y/G/y/uyGy9.jpg"); // grass.jpg
    texture.wrapS   = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 10, 10 );  
    var mat = new THREE.MeshLambertMaterial( { color: 0x777777, map: texture } );
    var geo1 = new THREE.CubeGeometry( 2000, 40, 2000 );
        
    var mground1 = new THREE.Mesh( geo1, mat );
    mground1.position.y = -50;
    scene.add( mground1 );

    geoSphere = new THREE.SphereGeometry( 1 , 36, 36 );
    geoBox = new THREE.CubeGeometry( 1, 1, 1 );

    matSphere = new THREE.MeshLambertMaterial( { map: basicTexture(0), name:'sph' } );
    matBox = new THREE.MeshLambertMaterial( {    map: basicTexture(2), name:'box' } );
    matSphereSleep = new THREE.MeshLambertMaterial( { map: basicTexture(1), name:'ssph' } );
    matBoxSleep = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'sbox' } );

    // oimo init
    world = new OIMO.World();
    populate();
        
    // loop
    animate();

    // events

    window.addEventListener( 'resize', onWindowResize, false );
    container.addEventListener( 'mousemove', onMouseMove, false );
    container.addEventListener( 'mousedown', onMouseDown, false );
    container.addEventListener( 'mouseout', onMouseUp, false );
    container.addEventListener( 'mouseup', onMouseUp, false );
    container.addEventListener( 'mousewheel', onMouseWheel, false );
    container.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
        
}

function populate() {
    var max = 256;
    
    // reset old
    clearMesh();
    world.clear();

    //add ground
    var ground2 = new OIMO.Body({
        size: [2000, 40, 2000], 
        pos: [0, -50, 0], 
        world: world
    });

    //add object
    var w = 10;
    var h = 10;
    var d = 10;

    var color;
    var i;
    for ( var x = 0; x < 16; x++ ) {
        for ( var y = 0; y < 16; y ++ ) {
            i = x + (15-y) * 16;
            color = getRgbColor( dataSet[i] );
            z = 0;
            bodys[i] = new OIMO.Body({
                type:'sphere', 
                size:[w], 
                pos:[-150 + x * 20 + Math.random(), 100 + y * 20, z * 20 + Math.random()], 
                move:true, 
                world:world
            });
            var material = new THREE.MeshLambertMaterial({ 
                color: color, 
                map: THREE.ImageUtils.loadTexture('../../assets/s/s/X/x/ssXxc.png')  // Football.png
            });
            meshs[i] = new THREE.Mesh( geoSphere, material );

            meshs[i].scale.set( w, h, d );
            scene.add( meshs[i] );
        }
    }
}

function clearMesh(){
    var i=meshs.length;
    while (i--){scene.remove(meshs[ i ]);}
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// MAIN LOOP
function animate() {
    renderer.setAnimationLoop( render );
}

function render() {
    controller.update();
    
    world.step();
    
    var p, r, m, x, y, z;
    var mtx = new THREE.Matrix4();
    var i = bodys.length;
    var mesh;
    wakeup = false;
    
    if(G !== nG){ wakeup = true; G=nG;}
    
    while (i--){
        var body = bodys[i].body;
        mesh = meshs[i];
        if(wakeup)bodys[i].body.awake();
        if(!body.sleeping){
            m = body.getMatrix();
            mtx.fromArray(m);
            mesh.position.setFromMatrixPosition( mtx );
            mesh.rotation.setFromRotationMatrix( mtx );
            
            // change material
            if(mesh.material.name === 'sbox') mesh.material = matBox;
            if(mesh.material.name === 'ssph') mesh.material = matSphere;
            
        } else {
            if(mesh.material.name === 'box') mesh.material = matBoxSleep;
            if(mesh.material.name === 'sph') mesh.material = matSphereSleep;
        }
    }

    renderer.render( scene, camera );
}

function moveCamera() {
    camera.position.copy(Orbit(center, camPos.horizontal, camPos.vertical, camPos.distance));
    camera.lookAt(center);
}

function gravity(g){
    nG = document.getElementById("gravity").value;
    world.gravity = new OIMO.Vec3(0, nG, 0);
}

// TEXTURE

function basicTexture(n){
   var canvas = document.createElement( 'canvas' );
   canvas.width = canvas.height = 64;
   var ctx = canvas.getContext( '2d' );
   var colors = [];
   if(n===0){ // sphere
        colors[0] = "#58AA80";
        colors[1] = "#58FFAA";
    }
    if(n===1){ // sphere sleep
        colors[0] = "#383838";
        colors[1] = "#38AA80";
    }
    if(n===2){ // box
        colors[0] = "#AA8058";
        colors[1] = "#FFAA58";
    }
    if(n===3){ // box sleep
        colors[0] = "#383838";
        colors[1] = "#AA8038";
    }
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = colors[1];
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillRect(32, 32, 32, 32);

    var tx = new THREE.Texture(canvas);
    tx.needsUpdate = true;
    return tx;
}

// MATH

function Orbit(origine, horizontal, vertical, distance) {
    var p = new THREE.Vector3();
    var phi = vertical*ToRad;
    var theta = horizontal*ToRad;
    p.x = (distance * Math.sin(phi) * Math.cos(theta)) + origine.x;
    p.z = (distance * Math.sin(phi) * Math.sin(theta)) + origine.z;
    p.y = (distance * Math.cos(phi)) + origine.y;
    return p;
}

// MOUSE 

function onMouseDown(e) {
    e.preventDefault();
    mouse.ox = e.clientX;
    mouse.oy = e.clientY;
    mouse.h = camPos.horizontal;
    mouse.v = camPos.vertical;
    mouse.down = true;
}

function onMouseUp(e) {
    mouse.down = false;
    document.body.style.cursor = 'auto';
}

function onMouseMove(e) {
    e.preventDefault();
    if (mouse.down ) {
        document.body.style.cursor = 'move';
        camPos.horizontal = ((e.clientX - mouse.ox) * 0.3) + mouse.h;
        camPos.vertical = (-(e.clientY - mouse.oy) * 0.3) + mouse.v;
        moveCamera();
    }
}

function onMouseWheel(e) {
    var delta = 0;
    if(e.wheelDeltaY){delta=e.wheelDeltaY*0.01;}
    else if(e.wheelDelta){delta=e.wheelDelta*0.05;}
    else if(e.detail){delta=-e.detail*1.0;}
    camPos.distance-=(delta*10);
    moveCamera();
    
}
