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
var cube;
var rome;

init();
animate();

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
        new THREE.BoxBufferGeometry( 6, 6, 6, 8, 8, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: true } )
    );
    room.position.y = 3;
    room.position.z = -3;
    scene.add( room );
    
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        map:THREE.ImageUtils.loadTexture('../../assets/A/k/w/j/AkwjW.jpg') // frog.jpg
    });
    cube = new THREE.Mesh(geometry, material);
    room.add(cube);
    
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
    
    for ( var i = 0; i < room.children.length; i++ ) {
        var cube = room.children[ i ];
        
        // quaternion
        var axis = new THREE.Vector3(1,1,1).normalize();
        angle += Math.PI / 180;
        var q = new THREE.Quaternion();
        q.setFromAxisAngle(axis,angle);
        cube.quaternion.copy(q);
    }
    
    renderer.render( scene, camera );
}