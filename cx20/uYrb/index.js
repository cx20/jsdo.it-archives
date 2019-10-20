// forked from cx20's "[WebVR] three.js で WebVR を試してみるテスト（その６）（調整中）" http://jsdo.it/cx20/AJ0Q
// forked from cx20's "[WebVR] three.js で WebVR を試してみるテスト（その５）（調整中）" http://jsdo.it/cx20/0qa7

let clock = new THREE.Clock();
let container;
let camera, scene, renderer;
let controller;
let radius = 0.08;
let normal = new THREE.Vector3();
let relativeVelocity = new THREE.Vector3();
let earth;
let cloud;
let rome;

init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x505050 );
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //scene.position.y = -3;
    
    scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );
    let light = new THREE.PointLight( new THREE.Color(0x808080), 3);
    let light2 = new THREE.PointLight( new THREE.Color(0x101010), 2);
    light.position.set(0, -1, 10);
    light2.position.set(0.5, 0.5, 10);
    scene.add(light);
    scene.add(light2);
    
    room = new THREE.Mesh(
        new THREE.BoxBufferGeometry( 6, 6, 6, 8, 8, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: true } )
    );
    room.position.y = 3;
    room.position.z = -3;
    scene.add( room );
    
    let geometry = new THREE.SphereGeometry(1, 30, 30);
    let planetTexture = THREE.ImageUtils.loadTexture('../../assets/4/I/b/A/4IbAL.jpg'); // earth_atmos_1024.jpg
    let normalTexture = THREE.ImageUtils.loadTexture('../../assets/A/b/2/p/Ab2pP.jpg'); // earth_normal_1024.jpg
    let specularTexture = THREE.ImageUtils.loadTexture('../../assets/w/N/j/h/wNjh6.jpg'); // earth_specular_1024.jpg
    let material = new THREE.MeshPhongMaterial({
        map: planetTexture,
        normalMap: normalTexture,
        specularMap: specularTexture,
        color: 0xffffff,
        specular: 0x111111,
        shininess: 20
    });
    earth = new THREE.Mesh(geometry, material);
    room.add(earth);
    
    let cloudsTexture = THREE.ImageUtils.loadTexture('../../assets/n/l/9/m/nl9m8.png'); // earth_clouds_1024.png
    let materialClouds = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: cloudsTexture,
        transparent: true
    });
    cloud = new THREE.Mesh(geometry, materialClouds);
    cloud.scale.set(1.010, 1.010, 1.010);
    room.add(cloud);

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

let angle = 0;
function render() {
    controller.update();
    
    earth.rotation.y += 0.005;
    cloud.rotation.y += 0.006;
    
    renderer.render( scene, camera );
}