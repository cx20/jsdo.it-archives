// forked from cx20's "Three.js + Oimo.js で箱にお菓子を入れてみるテスト（その２）" http://jsdo.it/cx20/AXMY
// forked from cx20's "Three.js + Oimo.js で箱にお菓子を入れてみるテスト" http://jsdo.it/cx20/8Z2O
// forked from cx20's "Three.js + Oimo.js で箱にボールを入れてみるテスト" http://jsdo.it/cx20/sOaG
// forked from cx20's "Three.js + Oimo.js で坂道にボールを転がしてみるテスト" http://jsdo.it/cx20/8ECT
// forked from Lo-Th's "Oimo.js Moving" http://lo-th.github.io/Oimo.js/test_moving.html

// three var
var camera, scene, light, renderer, container, content;
var meshs = [];
var grounds = [];
var paddel;
var matBox, matSphere, matBoxSleep, matSphereSleep, matGround, matGroundTrans;
var matPocky = [];
var buffgeoCylinder;
var buffgeoSphere, buffgeoBox;
var raycaster, projector;
var ToRad = Math.PI / 180;
var ToDeg = 180 / Math.PI;
var rotTest;

//oimo var
var world = null;
var bodys = null;

var fps = [0,0,0,0];
var type=1;

init();
loop();

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
    //light.position.set( 300, 1000, 500 );
    light.position.set( -300, 1000, 500 );
    light.target.position.set( 0, 0, 0 );
    light.castShadow = true;
    light.shadowCameraNear = 500;
    light.shadowCameraFar = 1600;
    light.shadowCameraFov = 70;
    light.shadowBias = 0.0001;
    light.shadowDarkness = 0.7;
    light.shadowMapWidth = light.shadowMapHeight = 1024;
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
    
    buffgeoCylinder= new THREE.BufferGeometry();
    buffgeoCylinder.fromGeometry( new THREE.CylinderGeometry( 0.5, 0.5, 1, 6 ) );

    matSphere = new THREE.MeshLambertMaterial( { map: basicTexture(0), name:'sph' } );
    matBox = new THREE.MeshLambertMaterial( {  map: basicTexture(0), name:'box' } );
    matPocky[0] = new THREE.MeshLambertMaterial( {  map: basicTexture(1), name:'pky1' } );
    matPocky[1] = new THREE.MeshLambertMaterial( {  map: basicTexture(2), name:'pky2' } );
    matPocky[2] = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'pky3' } );
    matSphereSleep = new THREE.MeshLambertMaterial( { map: basicTexture(1), name:'ssph' } );
    matBoxSleep = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'sbox' } );
    matGround = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0x3D4143, transparent:true, opacity:0.1 } );
    
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    
    paddel = new THREE.Object3D();
    
    rotTest = new THREE.Vector3();
    
    container = document.getElementById("container");
    container.appendChild( renderer.domElement );
    
    initEvents();
    initOimoPhysics();
}

function loop() {
    requestAnimationFrame( loop );
    renderer.clear();
    renderer.render( scene, camera );
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
    mesh.castShadow = true;
    mesh.receiveShadow = true;
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
    setInterval(updateOimoPhysics, 1000/60);
    
}

function populate(n) {
    
    // The Bit of a collision group
    var group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
    var group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
    var group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
    var all = 0xffffffff; // 11111111 11111111 11111111 11111111
    
    //var max = 200;
    var max = 200;
    
    type = 1;
    
    // reset old
    clearMesh();
    world.clear();
    bodys = [];
    
    // Is all the physics setting for rigidbody
    var config = [
        1, // The density of the shape.
        0.4, // The coefficient of friction of the shape.
        0.2, // The coefficient of restitution of the shape.
        1, // The bits of the collision groups to which the shape belongs.
        all // The bits of the collision groups with which the shape collides.
    ];
    
    //add ground
    var ground = new OIMO.Body({size:[400, 40, 400], pos:[0,-20,0], world:world, config:config});
    addStaticBox([400, 40, 400], [0,-20,0], [0,0,0]);

    var dataSet = [
        { size:[100, 100,  10], pos:[  0, 50,-50], rot:[0,0,0] },
        { size:[100, 100,  10], pos:[  0, 50, 50], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[-50, 50,  0], rot:[0,0,0] },
        { size:[ 10, 100, 100], pos:[ 50, 50,  0], rot:[0,0,0] } 
    ];
    
    var surfaces = [];
    for ( var i = 0; i < dataSet.length; i++ ) {
        var size = dataSet[i].size
        var pos  = dataSet[i].pos;
        var rot  = dataSet[i].rot;
        surfaces[i] = new OIMO.Body({size:size, pos:pos, rot:rot, world:world, config:config});
        addStaticBox(size, pos, rot, true);
    }
    
    // now add object
    var x, y, z, w, h, d;
    var i = max;
    
    while (i--){
        t = type;
        x = -50 + Math.random()*100;
        y = 100 + Math.random()*1000;
        z = -50 + Math.random()*100;

        w = 3 * 1.5;
        h = 100 * 1.5;
        d = 3 * 1.5;
        
        config[4] = all;
        
        if(t===1){
            config[3] = group3;
            //bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world, config:config});
            bodys[i] = new OIMO.Body({type:'cylinder', size:[w,h,w], pos:[x,y,z], rot:[180 + Math.random() * 10,Math.random() * 10,Math.random() * 10], move:true, world:world, config:config});
            var pos = Math.floor(Math.random() * matPocky.length );
            console.log( pos );
            //meshs[i] = new THREE.Mesh( buffgeoBox, matPocky[pos] );
            meshs[i] = new THREE.Mesh( buffgeoCylinder, matPocky[pos] );
            meshs[i].scale.set( w, h, d );
        } else if(t===2){
            config[3] = group3;
            bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world, config:config});
            meshs[i] = new THREE.Mesh( buffgeoBox, matBox );
            meshs[i].scale.set( w, h, d );
        }
        
        meshs[i].castShadow = true;
        meshs[i].receiveShadow = true;
        
        scene.add( meshs[i] );
    }
    
    config[3] = 1;
    config[4] = all;
    bodys[max] = new OIMO.Body({size:[20, 40, 60], pos:[-150,20,0], rot:[0,0,0], move:true, noSleep:true, world:world, config:config});
    meshs[max] = new THREE.Mesh( buffgeoBox, matBox );
    meshs[max].scale.set( 20, 40, 60 );
    scene.add( meshs[max] );
}


function updateOimoPhysics() {
    
    world.step();
    
    // apply new position on last rigidbody
    bodys[bodys.length-1].setPosition(paddel.position);
    
    paddel.lookAt(new THREE.Vector3(100,paddel.position.y, 0));
    paddel.rotation.y+=90*ToRad;
    
    // apply new rotation on last rigidbody
    bodys[bodys.length-1].setQuaternion(paddel.quaternion);
    
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
                x = -50 + Math.random()*100;
                y = 100 + Math.random()*1000;
                z = -50 + Math.random()*100;
                body.resetPosition(x,y,z);
            }
        }
    }
    
    displayInfo();
}

function gravity(g){
    nG = document.getElementById("gravity").value
    world.gravity = new OIMO.Vec3(0, nG, 0);
}

var unwrapDegrees = function (r) {
    r = r % 360;
    if (r > 180) r -= 360;
    if (r < -180) r += 360;
    return r;
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

function basicTexture(n){
    var canvas = document.createElement( 'canvas' );
    canvas.width = canvas.height = 64;
    var ctx = canvas.getContext( '2d' );
    var colors = [];

    if(n===0){ // box
        colors[0] = "#AA8058";
        colors[1] = "#FFAA58";
    }
    if(n===1){ // pocky1(normal)
        colors[0] = "#FFC14D";
        colors[1] = "#684B48";
    }
    if(n===2){ // pocky2(strawberry)
        colors[0] = "#FFC14D";
        colors[1] = "#D36FC0";
    }
    if(n===3){ // pocky3(pretz)
        colors[0] = "#FFC14D";
        colors[1] = "#FFC14D";
    }
    
    if(n!==0){
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = colors[1];
        ctx.fillRect(0, 0, 64, 52);
    }else{
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = colors[1];
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
    }

    var tx = new THREE.Texture(canvas);
    tx.needsUpdate = true;
    return tx;
}

//----------------------------------
//  RAY TEST
//----------------------------------

var rayTest = function () {
    var vector = new THREE.Vector3( mouse.mx, mouse.my, 1 );
    projector.unprojectVector( vector, camera );
    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
    var intersects = raycaster.intersectObjects( content.children, true );
    if ( intersects.length) {
        paddel.position.copy( intersects[0].point.add(new THREE.Vector3( 0, 20, 0 )) );
    }
}
