// forked from cx20's "[WebGL] three.js で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/WmiX
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/dutP
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/kwGs
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/d11S
// forked from cx20's "[WebGL] three.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/vvCa
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var clock = new THREE.Clock();
var container;
var camera, scene, renderer;
var controller;
var radius = 0.08;
var normal = new THREE.Vector3();
var relativeVelocity = new THREE.Vector3();
var meshCube;
var rome;

var world;
var body;

initOimo();
init();
animate();

function initOimo() {
    world = new OIMO.World({ 
        timestep: 1/30, 
        iterations: 8, 
        broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: [0,-9.8,0] 
    });

    var groundBody = world.add({
        type: "box",
        size: [200, 2, 200],
        pos: [0, -20, 0],
        rot: [0, 0, 0],
        move: false,
        density: 1,
        friction: 0.5,
        restitution: 0.1,
    });
    body = world.add({
        type: "box",
        size: [50, 50, 50],
        pos: [0, 100, 0],
        rot: [10, 0, 10],
        move: true,
        density: 1,
        friction: 0.5,
        restitution: 0.2
    });
}

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x505050 );
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );
    
    room = new THREE.Mesh(
        new THREE.BoxBufferGeometry( 6*50, 6*50, 6*50, 8, 8, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: true } )
    );
    room.position.y = 0*50;
    room.position.z = -3*50;
    scene.add( room );
    
    var geometry = new THREE.BoxGeometry(1*50, 1*50, 1*50);
    var material = new THREE.MeshBasicMaterial({
        map:THREE.ImageUtils.loadTexture('../../assets/A/k/w/j/AkwjW.jpg') // frog.jpg
    });
    meshCube = new THREE.Mesh(geometry, material);
    room.add(meshCube);
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.vr.enabled = true;
    
    container.appendChild( renderer.domElement );
    
    document.body.appendChild( WEBVR.createButton( renderer ) );
    
    controller = new THREE.GearVRController();
    controller.position.set( 0.25, 0.75, 0 );
    scene.add( controller );
    
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    renderer.setAnimationLoop( render );
}

var angle = 0;
function render() {
    var delta = clock.getDelta() * 60;
    controller.update();
    
    updatePhysics();
    
    renderer.render( scene, camera );
}
function updatePhysics() {
    world.step();

    meshCube.position.x = body.position.x;
    meshCube.position.y = body.position.y;
    meshCube.position.z = body.position.z;
    meshCube.quaternion.x = body.quaternion.x;
    meshCube.quaternion.y = body.quaternion.y;
    meshCube.quaternion.z = body.quaternion.z;
    meshCube.quaternion.w = body.quaternion.w;

    console.log("p.x,y,z = [" + body.position.x + "," + body.position.y + "," + body.position.z);
    //console.log("q.x,y,z.w = [" + body.quaternion.x + "," + body.quaternion.y + "," + body.quaternion.z + "," + body.quaternion.w);
}
