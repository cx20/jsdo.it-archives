// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その６）" http://jsdo.it/cx20/SMjx
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その５）" http://jsdo.it/cx20/ahsW
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その４）" http://jsdo.it/cx20/waIx
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/q0cx
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その２）" http://jsdo.it/cx20/K0k6
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト" http://jsdo.it/cx20/gMdU
// forked from cx20's "three.js で glTF 形式のデータを表示してみるテスト（その１）" http://jsdo.it/cx20/2qm8N
// forked from cx20's "three.js で OBJ 形式のデータを表示してみるテスト（その１）" http://jsdo.it/cx20/wGMY
// forked from cx20's "three.js で Blender のデータを表示してみるテスト" http://jsdo.it/cx20/2CXI
// forked from 【WebGL特集】第4回：Blenderでモデル出力 http://mox-motion.com/blog/webgl04-2/

var gltf = null;
var mixer = null;
var clock = new THREE.Clock();
var controls;
var camera;

init();
animate();
  
function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    
    scene = new THREE.Scene();
    
    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    scene.add( directionalLight );

    var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
    directionalLight2.position.set( 0, 5, -5 );
    scene.add( directionalLight2 );
    
    camera = new THREE.PerspectiveCamera( 75, width / height, 1, 2000 );
    //camera.position.set(2, 2, 3);
    camera.position.set(0, 0, 2);

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    var loader = new THREE.GLTFLoader();
    loader.setCrossOrigin( 'anonymous' ); // r84 以降は明示的に setCrossOrigin() を指定する必要がある

    var scale = 1.0;
    //var url = "https://rawcdn.githack.com/cx20/gltf-test/e5c46e508942f1686ed84fcb1e2e1132de80490a/tutorialModels/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
    //var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
    var url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
    
    loader.load(url, function (data) {
        gltf = data;
        var object = gltf.scene;
        object.scale.set(scale, scale, scale);
        //object.position.y -= 10;

        var animations = gltf.animations;
        if ( animations && animations.length ) {
            mixer = new THREE.AnimationMixer( object );
            for ( var i = 0; i < animations.length; i ++ ) {
                var animation = animations[ i ];
                mixer.clipAction( animation ).play();
            }
        }
        scene.add(object);
    });

    var axis = new THREE.AxesHelper(1000);   
    scene.add(axis);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xaaaaaa );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;
    controls.autoRotateSpeed = -2.0;

    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
    if (mixer) mixer.update(clock.getDelta());
    controls.update();
    render();
}

function render() {
    renderer.render( scene, camera );
}