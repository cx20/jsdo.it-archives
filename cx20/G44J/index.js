// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その５改）" http://jsdo.it/cx20/qaHd
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その５）" http://jsdo.it/cx20/kjTG
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その４）" http://jsdo.it/cx20/j4hw
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その３）" http://jsdo.it/cx20/7FYO
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その２）" http://jsdo.it/cx20/fUMb
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト" http://jsdo.it/cx20/4Fzx
// forked from cx20's "Three.js でドット絵を回転するテスト（その３）" http://jsdo.it/cx20/eRDK
// forked from cx20's "Three.js でドット絵を回転するテスト（その１）" http://jsdo.it/cx20/r8Zv
// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N

var width  = 465;
var height = 465;
var fov    = 80;
var aspect = width / height;
var near   = 1;
var far    = 1000;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = width / 2;
var windowHalfY = height / 2;
var camera;
var scene;
var renderer;
var composer;
var theta = 0;

var mouse = new THREE.Vector2();
var selectedObjects = [];

var effectFXAA;
var outlinePass;
var obj3d = new THREE.Object3D();
var group = new THREE.Object3D();
var controls;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 20;

    scene = new THREE.Scene();

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    var texture = new THREE.Texture();

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    var imageLoader = new THREE.ImageLoader( manager );
    //imageLoader.load( 'mario.png', function ( image ) {
    imageLoader.load( '../../assets/9/9/W/G/99WGE.png', function ( image ) {
        texture.image = image;
        texture.needsUpdate = true;
    } );

    var objLoader = new THREE.OBJLoader();

    //objLoader.load( 'mario.obj', function ( object ) {
    objLoader.load( '../../assets/t/N/6/x/tN6xU.obj', function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.map = texture;
            }
        } );
        object.scale = new THREE.Vector3(30, 30, 30);
        object.position.y = - 7;
        scene.add( object );
        selectedObjects.push( object);

    }, onProgress, onError );

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-1, -1, -1).normalize();
    scene.add(light2);

    renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.5; // Math.PI * 0.4;
    controls.autoRotate = true; // true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 3.0; // 自動回転する時の速度

    // postprocessing
    composer = new THREE.EffectComposer(renderer);

    renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    outlinePass = new THREE.OutlinePass(new THREE.Vector2(465, 465), scene, camera);
    composer.addPass(outlinePass);

    effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / 465, 1 / 465);
    effectFXAA.renderToScreen = true;
    composer.addPass(effectFXAA);

    //selectedObjects.push(cube);
    outlinePass.selectedObjects = selectedObjects;

    outlinePass.edgeStrength = 10; // 0.01～10
    outlinePass.edgeGlow = 1; // 0.0～1
    outlinePass.edgeThickness = 1; // 1～4
    outlinePass.pulsePeriod = 0.5; // 0.0～5
    outlinePass.visibleEdgeColor = new THREE.Color(0xffff00);
    outlinePass.hiddenEdgeColor = new THREE.Color(0xffffff);
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    composer.render();
    controls.update();
}