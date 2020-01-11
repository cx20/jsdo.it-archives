// forked from cx20's "[WebVR] three.js で WebVR を試してみるテスト（その７）（調整中）" http://jsdo.it/cx20/uYrb
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
        new THREE.BoxBufferGeometry( 6*50, 6*50, 6*50, 8, 8, 8 ),
        new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: true } )
    );
    room.position.y = 0*50;
    room.position.z = -3*50;
    scene.add( room );

    let loader = new THREE.GLTFLoader();
    loader.setCrossOrigin( 'anonymous' ); // r84 以降は明示的に setCrossOrigin() を指定する必要がある

    let scale = 20.0;
    let url = "https://rawcdn.githack.com/cx20/gltf-test/e63efa65/tutorialModels/FlightHelmet/glTF/FlightHelmet.gltf";
    
    loader.load(url, function (data) {
        gltf = data;
        let object = gltf.scene;
        object.scale.set(scale, scale, scale);
        object.position.y = 0;
        object.castShadow = true;
        object.receiveShadow = true;

        let animations = gltf.animations;
        if ( animations && animations.length ) {
            mixer = new THREE.AnimationMixer( object );
            for ( let i = 0; i < animations.length; i ++ ) {
                let animation = animations[ i ];
                mixer.clipAction( animation ).play();
            }
        }
        room.add(object);
    });

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
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
    
    renderer.render( scene, camera );
}