// forked from lo-th's "Oimo.js worker example" http://lo-th.github.io/Oimo.js/test_worker.html

// Parameters
var dt = 1/60;
var N= 666;
var ToRad = Math.PI / 180;
var info = document.getElementById("info");

// navigation var 
//var camPos = { horizontal: 90, vertical: 30, distance: 100, automove: false };
var camPos = { horizontal: 90, vertical: 30, distance: 20, automove: false };
var mouse = { ox:0, oy:0, h:0, v:0, mx:0, my:0, down:false, over:false, moving:true };

var fps=0, time, time_prev=0, fpsint = 0;

var minfo = new Float32Array(N*8);
var oimoInfo = 0;

// Create a blob for the inline worker code
var blob = new Blob([document.querySelector('#worker1').textContent], {type : 'text/javascript'});

// Create worker
var worker = new Worker(window.URL.createObjectURL(blob));
worker.postMessage = worker.webkitPostMessage || worker.postMessage;

worker.postMessage({
    N: N,
    dt: dt,
    //oimoUrl: document.location.href.replace(/\/[^/]*$/, "/") + "build/Oimo.min.js",
    //oimoUrl: document.location.href.replace(/\/[^/]*$/, "/") + "Oimo.min.js",
    //oimoUrl: "http://jsrun.it/assets/5/W/l/h/5Wlhp",
    oimoUrl: "https://cx20.github.io/jsdo.it-archives/assets/z/1/s/T/z1sTt.js",
    minfo: minfo
}, [minfo.buffer]);

var sendTime; // Time when we sent last message
worker.onmessage = function(e) {

    oimoInfo = e.data.perf;

    // Get fresh data from the worker
    minfo = e.data.minfo;

    // Update rendering meshes
    i = meshes.length;
    var n = 0, mesh;
    while(i--){
        mesh = meshes[i];
        n = i*8;
        if(minfo[n+7]!==1){
            mesh.position.set( minfo[n+0], minfo[n+1], minfo[n+2]);
            mesh.quaternion.set( minfo[n+3], minfo[n+4], minfo[n+5], minfo[n+6] );
        }
    }

    // If the worker was faster than the time step (dt seconds), we want to delay the next timestep
    var delay = dt * 1000 - (Date.now()-sendTime);
    if(delay < 0){  delay = 0; }
    setTimeout(sendDataToWorker,delay);
}

function sendDataToWorker(){
    sendTime = Date.now();
    worker.postMessage({ minfo : minfo },[minfo.buffer]);
}


// Initialize Three.js
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, camera, scene, renderer;
var meshes=[];

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer( {precision: "mediump", antialias:true, alpha: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 0 );
    renderer.autoClear = false;

    container = document.getElementById("container");
    container.appendChild( renderer.domElement );

    //renderer.gammaInput = true;
    //renderer.gammaOutput = true;
    renderer.shadowMapEnabled = true;

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.5, 10000 );
    camera.position.set( 0, 30, 100 );
    center = new THREE.Vector3();
    moveCamera();

    scene.add( camera );

    // lights
    var light, materials;
    scene.add( new THREE.AmbientLight( 0x303030 ) );

    light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    var d = 40;

    light.position.set( d, d, d );

    light.castShadow = true;
    //light.shadowCameraVisible = true;

    light.shadowMapWidth = light.shadowMapHeight = 1024;

    light.shadowCameraLeft = -d;
    light.shadowCameraRight = d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;

    light.shadowCameraFar = 3*d;
    light.shadowCameraNear = d;
    //light.shadowDarkness = 1;
    light.shadowDarkness = 0.5;

    scene.add( light );

    var material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent:true, opacity:0.06 } );
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0xCC8888 } );
    var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0x8888CC } );

    //geometry = THREE.BufferGeometryUtils.fromGeometry( new THREE.PlaneGeometry( 400, 400, 1, 1 ) );
    geometry = new THREE.BufferGeometry();
    geometry.fromGeometry( new THREE.PlaneGeometry( 200, 200, 1, 1 ) );
    
    var mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.rotation.x = -90 * ToRad;
    scene.add( mesh );
       
    // cubes
    //var cubeGeo = THREE.BufferGeometryUtils.fromGeometry(new THREE.BoxGeometry( 0.5,  0.5,  0.5, 1, 1, 1));
    var cubeGeo = new THREE.BufferGeometry();
    cubeGeo.fromGeometry( new THREE.BoxGeometry( 0.5,  0.5,  0.5, 1, 1, 1) );
    

    for(var i=0; i<N*0.5; i++){
        mesh = new THREE.Mesh( cubeGeo, cubeMaterial );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        meshes.push(mesh);
        scene.add( mesh );
    }

    // sphere
    //var sphereGeo = THREE.BufferGeometryUtils.fromGeometry(new THREE.SphereGeometry( 0.25, 16, 8));
    var sphereGeo = new THREE.BufferGeometry();
    sphereGeo.fromGeometry( new THREE.SphereGeometry( 0.25, 10, 8) );
    
    for(var i=0; i<N*0.5; i++){
        mesh = new THREE.Mesh( sphereGeo, sphereMaterial );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        meshes.push(mesh);
        scene.add( mesh );
    }

    window.addEventListener( 'resize', onWindowResize, false );
    container.addEventListener( 'mousemove', onMouseMove, false );
    container.addEventListener( 'mousedown', onMouseDown, false );
    container.addEventListener( 'mouseout', onMouseUp, false );
    container.addEventListener( 'mouseup', onMouseUp, false );
    container.addEventListener( 'mousewheel', onMouseWheel, false );
    container.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
    displayInfo();
}

function displayInfo(){
    time = Date.now();
    if (time - 1000 > time_prev) {
        time_prev = time; fpsint = fps; fps = 0;
    } fps++;

    var info =[
        "Oimo.js DEV.1.1.1a<br><br>",
        "Physics: " + oimoInfo +" fps<br>",
        "Render: " + fpsint +" fps<br>"
    ].join("\n");
    document.getElementById("info").innerHTML = info;
}

function render() {
    renderer.render( scene, camera );
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

// Start the worker!
//sendDataToWorker();
