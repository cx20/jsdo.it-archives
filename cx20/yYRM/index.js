// forked from cx20's "Three.js + Oimo.js で椅子を落下させてみるテスト" http://jsdo.it/cx20/ylW8
// forked from cx20's "Three.js + Oimo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/3FAB
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo
// three var

// three var
var camera, scene, light, renderer, container, center;
var meshs = [];
var grounds = [];
var geoBox, geoSphere;
var matBox, matSphere, matBoxSleep, matSphereSleep, matGround;

// navigation var 
var camPos = { horizontal: 90, vertical: 60, distance: 400, automove: false };
var mouse = { ox:0, oy:0, h:0, v:0, mx:0, my:0, down:false, over:false, moving:true };
var ToRad = Math.PI / 180;

//oimo var
var world;
var bodys = [];

var fps=0, time, time_prev=0, fpsint = 0;
var ToRad = Math.PI / 180;

var type=1;

init();
loop();

function init() {
    
    // three init
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false, clearColor: 0x585858, clearAlpha: 0});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x585858, 1 );
    
    container = document.getElementById("container");
    container.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 100, 400 );
    center = new THREE.Vector3();
    moveCamera();
    
    scene = new THREE.Scene();
    
    scene.add( new THREE.AmbientLight( 0x383838 ) );
    
    light = new THREE.DirectionalLight( 0xffffff , 1.3);
    light.position.set( 0.3, 1, 0.5 ).normalize();
    scene.add( light );
    
    geoSphere = new THREE.SphereGeometry( 1 , 20, 10 );
    geoBox = new THREE.BoxGeometry( 1, 1, 1 );
    
    matSphere = new THREE.MeshLambertMaterial( { map: basicTexture(0), name:'sph' } );
    matBox = new THREE.MeshLambertMaterial( {  map: basicTexture(2), name:'box' } );
    matSphereSleep = new THREE.MeshLambertMaterial( { map: basicTexture(1), name:'ssph' } );
    matBoxSleep = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'sbox' } );
    matGround = new THREE.MeshLambertMaterial( { color: 0x151515 } );
    
    // oimo init
    world = new OIMO.World();
    
    initChairGeometry();
    populate(1);
    
    //
    
    window.addEventListener( 'resize', onWindowResize, false );
    container.addEventListener( 'mousemove', onMouseMove, false );
    container.addEventListener( 'mousedown', onMouseDown, false );
    container.addEventListener( 'mouseout', onMouseUp, false );
    container.addEventListener( 'mouseup', onMouseUp, false );
    container.addEventListener( 'mousewheel', onMouseWheel, false );
    container.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
}

var types, sizes, positions, chairGeometry;

function addStaticBox(size, position, rotation) {
    var mesh = new THREE.Mesh( geoBox, matGround );
    mesh.scale.set( size[0], size[1], size[2] );
    mesh.position.set( position[0], position[1], position[2] );
    mesh.rotation.set( rotation[0]*ToRad, rotation[1]*ToRad, rotation[2]*ToRad );
    scene.add( mesh );
    grounds.push(mesh);
}

function initChairGeometry() {
/*
    // 椅子
    types = [ 'box', 'box', 'box', 'box', 'box', 'box', 'box', 'box' ];
    sizes = [ 30,5,30,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  4,30,4,  23,10,3 ];
    positions = [ 0,0,0,  12,-16,12,  -12,-16,12,  12,-16,-12,  -12,-16,-12,  12,16,-12,  -12,16,-12,  0,25,-12 ];
*/
    // ゴゴゴ
    types = [ 'box', 'box', 'box', 'box', 'box' ];
    sizes = [ 30,5,5,  5,30,5, 30,5,5, 5,10,5, 5,10,5 ];
    positions = [ 0,-15,0, 15,0,0, 0,15,0, 21,15,0, 27,15,0 ];
    
    var g = new THREE.Geometry();
    var mesh, n, m;
    for(var i=0; i<types.length; i++){
        n = i*3;
        m = new THREE.Matrix4().makeTranslation(positions[n+0], positions[n+1], positions[n+2]);
        m.scale(new THREE.Vector3(sizes[n+0], sizes[n+1], sizes[n+2]));
        g.merge(geoBox,m);
    }
    chairGeometry = THREE.BufferGeometryUtils.fromGeometry(g);
}

function populate(n) {
    
    //var max = document.getElementById("MaxNumber").value;
    var max = 200;
    
    if(n===1) type = 1
    else if(n===2) type = 2;
    //else if(n===3) type = 3;
    
    // reset old
    clearMesh();
    world.clear();
    
    var b;
    
    if(type===1){// DEMO 1
        //var ground = new OIMO.Body({size:[100, 40, 400], pos:[0,-20,0], world:world});
        var ground2 = new OIMO.Body({size:[400, 40, 400], pos:[0,-50,0], world:world});
        
        //addStaticBox([100, 40, 400], [0,-20,0], [0,0,0]);
        addStaticBox([400, 40, 400], [0,-50,0], [0,0,0]);
        
        var i = max;
        var j;
        
        while (i--){
            positions[1] = 300+(i*160);
            positions[0] = 0;
            positions[2] = 0;
            
            b = new OIMO.Body({
                type:types,
                size:sizes,
                pos:positions,
                move:true, 
                world:world, 
                name:'box'+i, 
                config:[0.2, 0.4,0.1]
            });
            
            bodys[i] = b.body;
            
            j = Math.round(Math.random()*2);
            
            if(j===1)meshs[i] = new THREE.Mesh( chairGeometry, matBox );
            else meshs[i] = new THREE.Mesh( chairGeometry, matSphere );
            
            scene.add(meshs[i]);
        }
    } else if(type===2){// DEMO 2
        var ground = new OIMO.Body({size:[1000, 40, 1000], pos:[0,-20,0], world:world});
        addStaticBox([1000, 40, 1000], [0,-20,0], [0,0,0]);
        var ground2 = new OIMO.Body({size:[400, 40, 400], pos:[0,130,-600], rot:[45,0,0], world:world});
        addStaticBox([400, 40, 400], [0,130,-600], [45,0,0]);
        
        var i = max;
        var j, k=0, l=0;
        
        
        while (i--){
            positions[1] = 50;
            positions[0] = -400+(50*l);
            positions[2] = -400+(50*k);
            
            l++;
            if(l>16){k++; l=0}
            
            b = new OIMO.Body({
                type:types,
                size:sizes,
                pos:positions,
                move:true, 
                world:world, 
                name:'box'+i, 
                config:[0.2, 0.4,0.1]
            });
            
            bodys[i] = b.body;
            
            j = Math.round(Math.random()*2);
            
            if(j===1)meshs[i] = new THREE.Mesh( chairGeometry, matBox );
            else meshs[i] = new THREE.Mesh( chairGeometry, matSphere );
            
            scene.add(meshs[i]);
        }
        
        b = new OIMO.Body({type:'sphere', size:[80], pos:[0,1000,-600], move:true, world:world});
        bodys[max] = b.body;
        meshs[max] = new THREE.Mesh( geoSphere, matSphere );
        meshs[max].scale.set( 80, 80, 80 );
        scene.add(meshs[max]);
        
    } 
}

function clearMesh(){
    
    var i = meshs.length;
    while (i--){
        scene.remove(meshs[ i ]);
    }
    
    i = grounds.length;
    while (i--){
        scene.remove(grounds[ i ]);
    }
    
    grounds = [];
    meshs = [];
    bodys=[];
    
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
}

function loop() {
    
    requestAnimationFrame( loop );
    
    world.step();
    
    var p, r, m, x, y, z;
    var mtx = new THREE.Matrix4();
    var i = bodys.length;
    var mesh;
    
    while (i--){
        
        mesh = meshs[i];
        
        if(!bodys[i].sleeping){
            m = bodys[i].getMatrix();
            mtx.fromArray(m);
            mesh.position.setFromMatrixPosition( mtx );
            mesh.rotation.setFromRotationMatrix( mtx );
            
            // change material
            if(mesh.material.name === 'sbox') mesh.material = matBox;
            if(mesh.material.name === 'ssph') mesh.material = matSphere; 
            
            // reset position
            if(m[13]<-100){
                x = -100 + Math.random()*200;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                bodys[i].setPosition(x,y,z);
            }
        } else {
            if(mesh.material.name === 'box') mesh.material = matBoxSleep;
            if(mesh.material.name === 'sph') mesh.material = matSphereSleep;
        }
    }
    
    renderer.render( scene, camera );
    
    displayInfo();
    
}

function gravity(g){
    nG = document.getElementById("gravity").value
    world.gravity = new OIMO.Vec3(0, nG, 0);
}

function displayInfo(){
    
    time = Date.now();
    if (time - 1000 > time_prev) {
        time_prev = time; fpsint = fps; fps = 0;
    } fps++;
    
    var info =[
        "Oimo.js DEV.1.1.0a<br><br>",
        "FPS: " + fpsint +" fps<br><br>"
/*
        "Rigidbody: "+world.numRigidBodies+"<br>",
        "Contact: "+world.numContacts+"<br>",
        "Pair Check: "+world.broadPhase.numPairChecks+"<br>",
        "Contact Point: "+world.numContactPoints+"<br>",
        "Island: " + world.numIslands +"<br><br>",
        "Broad-Phase Time: " + world.performance.broadPhaseTime + " ms<br>",
        "Narrow-Phase Time: " + world.performance.narrowPhaseTime + " ms<br>",
        "Solving Time: " + world.performance.solvingTime + " ms<br>",
        "Updating Time: " + world.performance.updatingTime + " ms<br>",
        "Total Time: " + world.performance.totalTime + " ms "
*/
    ].join("\n");
    document.getElementById("info").innerHTML = info;
    
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
/*
    ctx.fillStyle = colors[1];
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillRect(32, 32, 32, 32);
*/    
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

// MOUSE & NAVIGATION
function moveCamera() {
    camera.position.copy(Orbit(center, camPos.horizontal, camPos.vertical, camPos.distance));
    camera.lookAt(center);
}

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
