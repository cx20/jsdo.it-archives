// forked from cx20's "Three.js + Oimo.js でアーモンドポッキーを落下させてみるテスト" http://jsdo.it/cx20/wvI8
// forked from cx20's "Three.js + Oimo.js でポッキーを落下させてみるテスト" http://jsdo.it/cx20/nS6J
// forked from cx20's "Three.js + Oimo.js で坂道にボールを転がしてみるテスト" http://jsdo.it/cx20/8ECT
// forked from Lo-Th's "Oimo.js Moving" http://lo-th.github.io/Oimo.js/test_moving.html

// three var
var camera, scene, light, renderer, container, content;
var meshs = [];
var grounds = [];
var paddel;
var matBox, matSphere, matBoxSleep, matSphereSleep, matGround, matGroundTrans;
var matPocky, matPockySleep;
var buffgeoSphere, buffgeoBox;
var buffgeoPocky;
var geometryCompound;
var materialCompound;
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
    initCamera(180,60,250);
    
    raycaster = new THREE.Raycaster();
    projector = new THREE.Projector();
    
    scene = new THREE.Scene();
    
    content = new THREE.Object3D();
    scene.add(content);
    
    scene.add( new THREE.AmbientLight( 0x3D4143 ) );
    
    light = new THREE.DirectionalLight( 0xffffff , 1);
    light.position.set( 300, 1000, 500 );
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

    geometryCompound = new THREE.Geometry();
    var cube = new THREE.CubeGeometry(2, 2, 2);
    //var cube2 = new THREE.CubeGeometry(1.5, 70, 1.5);
    for (var j = 0; j < 30; j++) {
        var x = Math.random() * 2 - 1;
        var y = j * 1 + Math.random() * 2 - 15;
        var z = Math.random() * 2 - 1;

        var material = new THREE.MeshLambertMaterial({
            color: "#fff"
        });
        var mesh = new THREE.Mesh(cube, material);
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.x = Math.PI * Math.random();
        mesh.rotation.y = Math.PI * Math.random();
        mesh.rotation.z = Math.PI * Math.random();
        THREE.GeometryUtils.merge(geometryCompound, mesh); 
    }
    //var mesh2 = new THREE.Mesh(cube2, material);
    //THREE.GeometryUtils.merge(geometryCompound, mesh2); 
    materialCompound = new THREE.MeshLambertMaterial({
        color: "#840"
    });
    
    matSphere = new THREE.MeshLambertMaterial( { map: basicTexture(0), name:'sph' } );
    matBox = new THREE.MeshLambertMaterial( {  map: basicTexture(2), name:'box' } );
    matPocky = new THREE.MeshLambertMaterial( {  map: basicTexture(4), name:'pky' } );
    matSphereSleep = new THREE.MeshLambertMaterial( { map: basicTexture(1), name:'ssph' } );
    matBoxSleep = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'sbox' } );
    matPockySleep = new THREE.MeshLambertMaterial( {  map: basicTexture(4), name:'spky' } );
    //matGround = new THREE.MeshLambertMaterial( { color: 0x3D4143 } );
    matGround = new THREE.MeshLambertMaterial( { color: 0xDDD1D3 } );
    matGroundTrans = new THREE.MeshLambertMaterial( { color: 0x3D4143, transparent:true, opacity:0.6 } );
    
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    //renderer.gammaInput = true;
    //renderer.gammaOutput = true;
    
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
    
    //var max = 100; // document.getElementById("MaxNumber").value;
    var max = 440;
    
    //type = 3;
    //type = 1;
    type = 2;
    
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
    
    var ground2 = new OIMO.Body({size:[200, 30, 390], pos:[130,40,0], rot:[0,0,32], world:world, config:config});
    addStaticBox([200, 30, 390], [130,40,0], [0,0,32]);
    
    /*config[3] = group1;
        config[4] = all & ~group2;
        var ground3 = new OIMO.Body({size:[5, 100, 390], pos:[0,40,0], rot:[0,0,0], world:world, config:config});
        addStaticBox([5, 100, 390], [0,40,0], [0,0,0], true);*/
        
        // now add object
        var x, y, z, w, h, d;
        var i = max;
        
        
        
        while (i--){
            //if(type===3) t = Math.floor(Math.random()*2)+1;
            //else t = type;
            t = type;
            x = 150;
            z = -100 + Math.random()*200;
            y = 100 + Math.random()*1000;
            w = 3;
            h = 50;
            d = 3;
            
            config[4] = all;
            
            if(t===1){
                config[3] = group2;
                bodys[i] = new OIMO.Body({type:'sphere', size:[w*0.5], pos:[x,y,z], move:true, world:world, config:config});
                var material = new THREE.MeshLambertMaterial( { color: Math.floor(Math.random() * 0xffffff) } );
                meshs[i] = new THREE.Mesh( buffgeoSphere, material );
                //meshs[i] = new THREE.Mesh( buffgeoSphere, matSphere );
                meshs[i].scale.set( w*0.5, w*0.5, w*0.5 );
            } else if(t===2){
                config[3] = group3;
                bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world, config:config});
/*
                //meshs[i] = new THREE.Mesh( buffgeoBox, matBox );
                meshs[i] = new THREE.Mesh( buffgeoBox, matPocky );
                meshs[i].scale.set( w, h, d );
*/
                var meshCompound = new THREE.Mesh(geometryCompound, materialCompound);
                meshs[i] = meshCompound;
                //var axis = new THREE.AxisHelper( 100 );
                //meshs[i].add( axis );
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
            
            
            // change material
            if(mesh.material.name === 'sbox') mesh.material = matBox;
            if(mesh.material.name === 'ssph') mesh.material = matSphere; 
            if(mesh.material.name === 'spky') mesh.material = matPocky; 
            
            // reset position
            if(mesh.position.y<-100){
                x = 150;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                body.resetPosition(x,y,z);
            }
        } else {
            if(mesh.material.name === 'box') mesh.material = matBoxSleep;
            if(mesh.material.name === 'sph') mesh.material = matSphereSleep;
            if(mesh.material.name === 'pky') mesh.material = matPockySleep;
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
    if(n===4){ // pocky
        colors[0] = "#FFC14D";
        colors[1] = "#684B48";
    }
    
    if(n===4){
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
