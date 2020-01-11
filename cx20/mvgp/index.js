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

let gltf = null;
let mixer = null;
let clock = new THREE.Clock();
let controls;
let camera;

init();
animate();
  
function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 10;
    scene = new THREE.Scene();
    
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1).normalize();
    scene.add( light );
    
    let manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    let loader = new THREE.GLTFLoader();
    loader.setCrossOrigin( 'anonymous' ); // r84 以降は明示的に setCrossOrigin() を指定する必要がある

    let scale = 1;
    let url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/05a21973/models/gltf/2.0/PbrSimpleTest/glTF-Binary/PbrSimpleTest.glb";
    
    loader.load(url, function (data) {
        gltf = data;
        let object = gltf.scene;
        object.scale.set(scale, scale, scale);

        let animations = gltf.animations;
        if ( animations && animations.length ) {
            mixer = new THREE.AnimationMixer( object );
            for ( let i = 0; i < animations.length; i ++ ) {
                let animation = animations[ i ];
                mixer.clipAction( animation ).play();
            }
        }
        scene.add(object);
    });

    let axis = new THREE.AxesHelper(1000);   
    //scene.add(axis);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    //controls.autoRotate = true;
    controls.autoRotate = false;
    //controls.autoRotate = false;
    //controls.autoRotateSpeed = 2.0;
    controls.autoRotateSpeed = -2.0;
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