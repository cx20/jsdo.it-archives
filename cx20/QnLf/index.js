// forked from cx20's "vox.js を試してみるテスト（その１１）" http://jsdo.it/cx20/04WG
// forked from cx20's "vox.js を試してみるテスト（その１０）" http://jsdo.it/cx20/q67O
// forked from cx20's "vox.js を試してみるテスト（その９）" http://jsdo.it/cx20/4LYl
// forked from cx20's "vox.js を試してみるテスト（その８）" http://jsdo.it/cx20/iEi8
// forked from cx20's "vox.js を試してみるテスト（その７）" http://jsdo.it/cx20/K6wm
// forked from cx20's "vox.js を試してみるテスト（その６）" http://jsdo.it/cx20/oZg0
// forked from cx20's "vox.js を試してみるテスト（その５）" http://jsdo.it/cx20/af9L
// forked from cx20's "vox.js を試してみるテスト（その４）" http://jsdo.it/cx20/qL0R
// forked from cx20's "vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ymYt
// forked from cx20's "vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/adwz
// forked from cx20's "vox.js を試してみるテスト" http://jsdo.it/cx20/u80n
// forked from ohisama1's "vox.js test 0" http://jsdo.it/ohisama1/e9dm

var DOT_SIZE = 16;

// three var
var camera, scene, light, renderer, container, content;
var meshs = [];
var grounds = [];
var paddel;
var matBox, matSphere, matBoxSleep, matSphereSleep, matGround, matGroundTrans;
var buffgeoSphere, buffgeoBox;
var raycaster, projector;
var ToRad = Math.PI / 180;
var ToDeg = 180 / Math.PI;
var rotTest;
var controls;

// oimo var
var world = null;
var bodys = null;

var type = 1;

init();
loop();

function init() {
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    //initCamera(180,60,400);
    initCamera(-60,60,400);
    
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
    
    matSphere = new THREE.MeshLambertMaterial( { map: basicTexture(0), name:'sph' } );
    matBox = new THREE.MeshLambertMaterial( {  map: basicTexture(2), name:'box' } );
    matSphereSleep = new THREE.MeshLambertMaterial( { map: basicTexture(1), name:'ssph' } );
    matBoxSleep = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'sbox' } );
    matGround = new THREE.MeshLambertMaterial( { color: 0xc57b37 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0xc57b37, transparent:true, opacity:0.1 } );
    
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.4;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -5.0;    //自動回転する時の速度

    paddel = new THREE.Object3D();
    
    rotTest = new THREE.Vector3();
    
    container = document.getElementById("container");
    container.appendChild( renderer.domElement );
    
    initEvents();
    initOimoPhysics();
}

function loop() {
    requestAnimationFrame( loop );
    controls.update();
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
    
    //var max = 100; // document.getElementById("MaxNumber").value;
    var max = 1000;
    
    // reset old
    clearMesh();
    world.clear();
    bodys = [];
    
    // Is all the physics setting for rigidbody
    var config = [
        1,   // 密度
        0.4, // 摩擦係数
        0.6, // 反発係数
        1,   // 所属する衝突グループのビット
        all  // 衝突する衝突グループのビット
    ];
    
    //add ground
    var ground = new OIMO.Body({size:[400, 40, 400], pos:[0,-20,0], world:world, config:config});
    addStaticBox([400, 40, 400], [0,-20,0], [0,0,0]);

    // now add object
    var w = DOT_SIZE * 0.8;
    var h = DOT_SIZE * 0.8;
    var d = DOT_SIZE * 0.8;
    
    type = 1;
    
    var parser = new vox.Parser();
    // mario.vox
    parser.parse("../../assets/m/S/B/J/mSBJ6.vox").then(function(voxelData) {
        max = voxelData.voxels.length;
        for ( var i = max - 1; i >= 0; i-- ) {
            var voxel = voxelData.voxels[i];
            
            var x = Math.random() + voxel.x * DOT_SIZE - voxelData.size.x * DOT_SIZE / 2;
            var y = Math.random() + voxel.z * DOT_SIZE - voxelData.size.z * DOT_SIZE / 2 + 250;
            var z = Math.random() + voxel.y * DOT_SIZE - voxelData.size.y * DOT_SIZE / 2;
            
            var c = voxelData.palette[voxel.colorIndex];
            var color = new THREE.Color(c.r / 255, c.g / 255, c.b / 255);
            var material = new THREE.MeshLambertMaterial({color: color});
            
            if ( type == 1 ) {
                var geometry = new THREE.SphereGeometry(0.5);

                bodys[i] = new OIMO.Body({type:'sphere', size:[w*0.5], pos:[x,y,z], move:true, world:world, config:config});
                meshs[i] = new THREE.Mesh( geometry, material );
                meshs[i].scale.set( w, h, d );

            } else if ( type == 2 ) {
                var geometry = new THREE.BoxGeometry(1, 1, 1);

                bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world, config:config});
                meshs[i] = new THREE.Mesh( geometry, material );
                meshs[i].scale.set( w, h, d );
            }
            scene.add( meshs[i] );
        }

        config[3] = 1;
        config[4] = all;
        bodys[max] = new OIMO.Body({size:[20, 40, 60], pos:[-150,20,0], rot:[0,0,0], move:true, noSleep:true, world:world, config:config});
        meshs[max] = new THREE.Mesh( buffgeoBox, matBox );
        meshs[max].scale.set( 20, 40, 60 );
        scene.add( meshs[max] );
    });
    
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
            
            // change material
            if(mesh.material.name === 'sbox') mesh.material = matBox;
            if(mesh.material.name === 'ssph') mesh.material = matSphere; 
            
            // reset position
            if(mesh.position.y<-100){
                x = -50 + Math.random()*100;
                y = 250 + Math.random()*100;
                z = -50 + Math.random()*100;
                body.resetPosition(x,y,z);
            }
        } else {
            if(mesh.material.name === 'box') mesh.material = matBoxSleep;
            if(mesh.material.name === 'sph') mesh.material = matSphereSleep;
        }
    }

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
