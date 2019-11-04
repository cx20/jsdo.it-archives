// forked from schteppe's "cannon.js Web Worker Example" https://github.com/schteppe/cannon.js/blob/master/examples/worker.html

// Parameters
var dt = 1/60, N=40;

// Data arrays. Contains all our kinematic data we need for rendering.
var positions = new Float32Array(N*3);
var quaternions = new Float32Array(N*4);

// Create a blob for the inline worker code
var blob = new Blob([document.querySelector('#worker1').textContent],{type:'text/javascript'});

// Create worker
var worker = new Worker(window.URL.createObjectURL(blob));
worker.postMessage = worker.webkitPostMessage || worker.postMessage;

var sendTime; // Time when we sent last message
worker.onmessage = function(e) {
    
    // Get fresh data from the worker
    positions = e.data.positions;
    quaternions = e.data.quaternions;
    
    // Update rendering meshes
    for(var i=0; i!==meshes.length; i++){
        meshes[i].position.set( positions[3*i+0],
                               positions[3*i+1],
                               positions[3*i+2] );
        meshes[i].quaternion.set(quaternions[4*i+0],
                                 quaternions[4*i+1],
                                 quaternions[4*i+2],
                                 quaternions[4*i+3]);
    }
    
    // If the worker was faster than the time step (dt seconds), we want to delay the next timestep
    var delay = dt * 1000 - (Date.now()-sendTime);
    if(delay < 0){
        delay = 0;
    }
    setTimeout(sendDataToWorker,delay);
}

function sendDataToWorker(){
    sendTime = Date.now();
    worker.postMessage({
        N : N,
        dt : dt,
        //cannonUrl : document.location.href.replace(/\/[^/]*$/,"/") + "../build/cannon.js",
        //cannonUrl : document.location.href.replace(/\/[^/]*$/,"/") + "./cannon.js",
        //cannonUrl : "http://jsrun.it/assets/d/x/k/j/dxkjH",
        cannonUrl : "https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js",
        positions : positions,
        quaternions : quaternions
    },[positions.buffer, quaternions.buffer]);
}


// Initialize Three.js
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, camera, scene, renderer;
var meshes=[];

init();
animate();

function init() {
    
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    
    // scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, 500, 10000 );
    
    // camera
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.5, 10000 );
    camera.position.set(Math.cos( Math.PI/5 ) * 30,
                        5,
                        Math.sin( Math.PI/5 ) * 30);
    scene.add( camera );
    
    // Controls
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    
    // lights
    var light, materials;
    scene.add( new THREE.AmbientLight( 0x666666 ) );
    
    light = new THREE.DirectionalLight( 0xffffff, 1.75 );
    var d = 20;
    
    light.position.set( d, d, d );
    
    light.castShadow = true;
    //light.shadowCameraVisible = true;
    
    light.shadowMapWidth = 1024;
    light.shadowMapHeight = 1024;
    
    light.shadowCameraLeft = -d;
    light.shadowCameraRight = d;
    light.shadowCameraTop = d;
    light.shadowCameraBottom = -d;
    
    light.shadowCameraFar = 3*d;
    light.shadowCameraNear = d;
    light.shadowDarkness = 0.5;
    
    scene.add( light );
    
    // floor
    geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
    //geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
    material = new THREE.MeshLambertMaterial( { color: 0x777777 } );
    //THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );
    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    meshes.push(mesh);
    scene.add( mesh );
    
    // cubes
    var cubeGeo = new THREE.BoxGeometry( 1, 1, 1, 10, 10 );
    var cubeMaterial = new THREE.MeshPhongMaterial( { color: 0x888888 } );
    for(var i=0; i<N; i++){
        cubeMesh = new THREE.Mesh( cubeGeo, cubeMaterial );
        cubeMesh.castShadow = true;
        meshes.push(cubeMesh);
        scene.add( cubeMesh );
    }
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( scene.fog.color );
    
    container.appendChild( renderer.domElement );
    
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMapEnabled = true;
    
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.handleResize();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}

function render() {
    renderer.render( scene, camera );
}

// Start the worker!
sendDataToWorker();
