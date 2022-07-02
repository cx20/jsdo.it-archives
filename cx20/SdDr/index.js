// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/IviI
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/0kU1
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１３）（調整中）" http://jsdo.it/cx20/Wrcg
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１２）（調整中）" http://jsdo.it/cx20/abdM
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１１）（調整中）" http://jsdo.it/cx20/UqP9
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/mrOD
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/6MMO
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その８）" http://jsdo.it/cx20/qugw
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その７）" http://jsdo.it/cx20/4r5U
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
    
    scene = new THREE.Scene();
    
    //let ambient = new THREE.AmbientLight( 0x101030 );
    let ambient = new THREE.AmbientLight( 0xdddddd );
    scene.add( ambient );

    const light = new THREE.SpotLight(0xFFFFFF, 2, 100, Math.PI / 4, 8);
    light.position.set( 10, 25, 25 );
    light.castShadow = true;
    scene.add(light);
    
    camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 10000 );
    camera.position.set(0, 2, 4);

    let geometry = new THREE.BoxGeometry(100, 5, 100);
    let material = new THREE.MeshLambertMaterial({
        color: "#707070"
    });
    
    //let ground = new THREE.Mesh(geometry, material);
    //ground.position.y -= 15;
    //ground.receiveShadow = true;
    //scene.add(ground);

    let manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    let loader = new THREE.GLTFLoader();
    loader.setCrossOrigin( 'anonymous' ); // r84 以降は明示的に setCrossOrigin() を指定する必要がある

    var dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath( 'https://rawcdn.githack.com/mrdoob/three.js/r142/examples/js/libs/draco/gltf/' );
    loader.setDRACOLoader( dracoLoader );
    
    let scale = 20;
    //let url = "https://rawcdn.githack.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb";
    //let url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb";
    //let url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb";
    //let url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_05.glb";
    //let url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_10.glb";
    let url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb";
    
    loader.load(url, function (data) {
        gltf = data;
        let object = gltf.scene;
        object.scale.set(scale, scale, scale);
        object.position.y = -1;
        //object.position.x = 4;
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
        scene.add(object);
    });

    let axis = new THREE.AxesHelper(1000);   
    scene.add(axis);

    renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding; // if >r112, specify outputEncoding instead of gammaOutput
    //renderer.setClearColor( 0xbfe4ff );
    renderer.setClearColor( 0x000000 );
    renderer.shadowMap.enabled = true;
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    //controls.autoRotate = true;
    controls.autoRotate = false;
    //controls.autoRotateSpeed = 2.0;
    controls.autoRotateSpeed = -2.0;

    renderer.setSize( width, height );
    //renderer.gammaOutput = true;
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