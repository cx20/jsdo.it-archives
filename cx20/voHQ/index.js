// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo
// three var

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
		"無":0xDCAA6B,	// 段ボール色
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
    renderer = new THREE.WebGLRenderer({precision: "mediump", antialias:false, clearColor: 0x585858, clearAlpha: 0});
    renderer.setClearColor( 0x585858, 1 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    container = document.getElementById("container");
    container.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 100, 400 );
    center = new THREE.Vector3();
    
    scene = new THREE.Scene();

    scene.add( new THREE.AmbientLight( 0x383838 ) );

    light = new THREE.DirectionalLight( 0xffffff , 1.3);
    light.position.set( 0.3, 1, 0.5 );
    scene.add( light );
        
    //add ground mesh
    var mat = new THREE.MeshLambertMaterial( { color: 0x151515 } );
    var geo0 = new THREE.CubeGeometry( 100, 40, 400 );
    var geo1 = new THREE.CubeGeometry( 400, 40, 400 );
        
/*
    var mground0 = new THREE.Mesh( geo0, mat );
    mground0.position.y = -20;
    scene.add( mground0 );
*/
    var mground1 = new THREE.Mesh( geo1, mat );
    mground1.position.y = -50;
    scene.add( mground1 );

    geoSphere = new THREE.SphereGeometry( 1 , 20, 10 );
    geoBox = new THREE.CubeGeometry( 1, 1, 1 );

    matSphere = new THREE.MeshLambertMaterial( { map: basicTexture(0), name:'sph' } );
    matBox = new THREE.MeshLambertMaterial( {    map: basicTexture(2), name:'box' } );
    matSphereSleep = new THREE.MeshLambertMaterial( { map: basicTexture(1), name:'ssph' } );
    matBoxSleep = new THREE.MeshLambertMaterial( {  map: basicTexture(3), name:'sbox' } );

    // oimo init
    world = new OIMO.World();
    populate(1);
        
    // loop
        
    setInterval(loop, 1000 / 60);

    // events

    window.addEventListener( 'resize', onWindowResize, false );
    container.addEventListener( 'mousemove', onMouseMove, false );
    container.addEventListener( 'mousedown', onMouseDown, false );
    container.addEventListener( 'mouseout', onMouseUp, false );
    container.addEventListener( 'mouseup', onMouseUp, false );
    container.addEventListener( 'mousewheel', onMouseWheel, false );
    container.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
        
}

function populate(n) {
    
    //var max = document.getElementById("MaxNumber").value;
    var max = 256;
    
    if(n===1){ type = 1;}
    else if(n===2){ type = 2;}
    else if(n===3){ type = 3;}

    // reset old
    clearMesh();
    world.clear();

    //add ground
//    var ground = new OIMO.Body({size:[100, 40, 400], pos:[0,-20,0], world:world});
    var ground2 = new OIMO.Body({size:[400, 40, 400], pos:[0,-50,0], world:world});

    //add object
    //var x, y, z, w, h, d;
    //var i = max;
    var w = 10;
    var h = 10;
    var d = 10;

    var color;
    var i;
    for ( var x = 0; x < 16; x++ ) {
        for ( var y = 0; y < 16; y ++ ) {
            //createCuboid(Math.random() * 2, 2 + i * 4, Math.random() * 2, 1, 1, 1, 1);
            i = x + (15-y) * 16;
            color = getRgbColor( dataSet[i] );
//            console.log( i + ", " + dataSet[i] + ", " + color );
//            createCuboid(x*2.5, y*3, 10, 1, 1, 1, 1, color);
            z = 0;
            bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[-150+x*20,100+y*20,z*20], move:true, world:world});
            var material = new THREE.MeshLambertMaterial( { color: color } );
            //meshs[i] = new THREE.Mesh( geoBox, matBox );
            meshs[i] = new THREE.Mesh( geoBox, material );
            meshs[i].scale.set( w, h, d );
            scene.add( meshs[i] );
        }
    }
/*
    while (i--){
        if(type===3){ t = Math.floor(Math.random()*2)+1;}
        else{ t = type;}
        x = -100 + Math.random()*200;
        z = -100 + Math.random()*200;
        y = 100 + Math.random()*1000;
        w = 10 + Math.random()*10;
        h = 10 + Math.random()*10;
        d = 10 + Math.random()*10;

        if(t===1){
            bodys[i] = new OIMO.Body({type:'sphere', size:[w*0.5], pos:[x,y,z], move:true, world:world});
            meshs[i] = new THREE.Mesh( geoSphere, matSphere );
            meshs[i].scale.set( w*0.5, w*0.5, w*0.5 );
        } else if(t===2){
            bodys[i] = new OIMO.Body({type:'box', size:[w,h,d], pos:[x,y,z], move:true, world:world});
            meshs[i] = new THREE.Mesh( geoBox, matBox );
            meshs[i].scale.set( w, h, d );
        }
        scene.add( meshs[i] );
    }
*/
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

function loop() {
    
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
            
/*
            // reset position
            if(m[13]<-100){
                x = -100 + Math.random()*200;
                z = -100 + Math.random()*200;
                y = 100 + Math.random()*1000;
                bodys[i].setPosition(x,y,z);
            }
*/
        } else {
            if(mesh.material.name === 'box') mesh.material = matBoxSleep;
            if(mesh.material.name === 'sph') mesh.material = matSphereSleep;
        }
    }

    renderer.render( scene, camera );
    displayInfo();
}

function moveCamera() {
	camera.position.copy(Orbit(center, camPos.horizontal, camPos.vertical, camPos.distance));
	camera.lookAt(center);
}

function gravity(g){
    nG = document.getElementById("gravity").value;
    world.gravity = new OIMO.Vec3(0, nG, 0);
}

// ENGINE INFO

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
        "Broad-Phase: " + world.performance.broadPhaseTime + " ms<br>",
        "Narrow-Phase: " + world.performance.narrowPhaseTime + " ms<br>",
        "Solving: " + world.performance.solvingTime + " ms<br>",
        "Updating: " + world.performance.updatingTime + " ms<br>",
        "Total: " + world.performance.totalTime + " ms "
*/
     ].join("\n");
    document.getElementById("info").innerHTML = info;
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
