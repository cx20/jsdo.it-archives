// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その２０）（調整中）" http://jsdo.it/cx20/gykb
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１９）（調整中）" http://jsdo.it/cx20/84wX
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１８）（調整中）" http://jsdo.it/cx20/CJd3
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１７）（調整中）" http://jsdo.it/cx20/YbBj
// forked from cx20's "[WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１６）（調整中）" http://jsdo.it/cx20/SdDr
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
    camera.position.set(0, 3, 10);

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
    dracoLoader.setDecoderPath( 'https://rawcdn.githack.com/mrdoob/three.js/r129/examples/js/libs/draco/gltf/' );
    loader.setDRACOLoader( dracoLoader );
    
    let scale = 0.01;
    //let url = "https://rawcdn.githack.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb";
    //let url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb";
    //let url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb";
    //let url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb";
    //let url = "https://rawcdn.githack.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_01.gltf";
    //let url = "https://rawcdn.githack.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_04.gltf";
    //let url = "https://rawcdn.githack.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_07.gltf";
    //let url = "https://rawcdn.githack.com/mrdoob/three.js/r97/examples/models/gltf/BotSkinned/glTF-MaterialsUnlit/Bot_Skinned.gltf";
    //let url = "https://rawcdn.githack.com/cx20/gltf-test/7af4f399/tutorialModels/SpecGlossVsMetalRough/glTF/SpecGlossVsMetalRough.gltf";
    //let url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/33ab7250/models/gltf/2.0/Itokawa/glTF-Draco/Itokawa.glb";
    var url = "https://rawcdn.githack.com/BabylonJS/Exporters/9bc140006be149687be045f60b4a25cdb45ce4fc/Maya/Samples/glTF 2.0/T-Rex/trex_running.gltf";
    
    loader.load(url, function (data) {
        gltf = data;
        let object = gltf.scene;
        object.scale.set(scale, scale, scale);
        //object.position.y = -5;
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
        var envMap = getEnvMap();
        object.traverse( function( node ) {
            if ( node.material ) {
                node.material.envMap = envMap;
                node.material.needsUpdate = true;
            }
        } );
        scene.background = envMap;

        scene.add(object);
    });

    let axis = new THREE.AxesHelper(1000);   
    scene.add(axis);

    renderer = new THREE.WebGLRenderer();
    //renderer.setClearColor( 0xbfe4ff );
    renderer.setClearColor( 0x000000 );
    renderer.shadowMap.enabled = true;
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;
    //controls.autoRotate = false;
    //controls.autoRotate = false;
    //controls.autoRotateSpeed = 2.0;
    controls.autoRotateSpeed = -2.0;

    renderer.setSize( width, height );
    //renderer.gammaOutput = true; // if >r88, models are dark unless you activate gammaOutput
    //renderer.gammaFactor = 2.2;
    document.body.appendChild( renderer.domElement );
}

// https://github.com/mrdoob/three.js/tree/dev/examples/textures/cube/skybox
function getEnvMap() {
    //var path = '../../textures/cube/skybox/';
    var path = 'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    var loader = new THREE.CubeTextureLoader();
    loader.setCrossOrigin( 'anonymous' );
    var envMap = loader.load( urls );
    envMap.format = THREE.RGBFormat;
    return envMap;
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