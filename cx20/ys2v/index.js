// forked from cx20's "Three.js で立方体にエフェクトをかけてみるテスト（その４）" http://jsdo.it/cx20/QdU1
// forked from cx20's "Three.js で立方体にエフェクトをかけてみるテスト（その３）" http://jsdo.it/cx20/2gFD
// forked from cx20's "Three.js で立方体にエフェクトをかけてみるテスト（その２）" http://jsdo.it/cx20/wS7E
// forked from cx20's "Three.js で立方体にエフェクトをかけてみるテスト" http://jsdo.it/cx20/GxUV
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その５）" http://jsdo.it/cx20/kjTG
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その４）" http://jsdo.it/cx20/j4hw
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その３）" http://jsdo.it/cx20/7FYO
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト（その２）" http://jsdo.it/cx20/fUMb
// forked from cx20's "Three.js でポストプロセス・エフェクトを試してみるテスト" http://jsdo.it/cx20/4Fzx
// forked from cx20's "Three.js でドット絵を回転するテスト（その３）" http://jsdo.it/cx20/eRDK
// forked from cx20's "Three.js でドット絵を回転するテスト（その１）" http://jsdo.it/cx20/r8Zv
// forked from cx20's "Three.js でドット絵を表示するテスト" http://jsdo.it/cx20/3U7N

var container;
var camera, scene, renderer, controls;
var mesh, decal;
var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();
var selectedObjects = [];

var composer, effectFXAA, outlinePass;
var obj3d = new THREE.Object3D();

var group = new THREE.Object3D();

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    var width = window.innerWidth || 1;
    var height = window.innerHeight || 1;
    var devicePixelRatio = window.devicePixelRatio || 1;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 0;

    scene = new THREE.Scene();

    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.5; // Math.PI * 0.4;
    controls.autoRotate = true; // true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 2.0; // 自動回転する時の速度

    scene.add(group);

    var light = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(light);

    var textureLoader = new THREE.TextureLoader();
    texture = textureLoader.load("../../assets/A/k/w/j/AkwjW.jpg"); // frog.jpg

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({
        map: texture,
        color: 0xffffff
    });
    var cube = new THREE.Mesh(geometry, material);
    //cube.position.z = -4;
    group.add(cube);
    //cube.receiveShadow = true;
    //cube.castShadow = true;
    
    // postprocessing
    composer = new THREE.EffectComposer(renderer);

    renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    composer.addPass(outlinePass);

    effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    effectFXAA.renderToScreen = true;
    composer.addPass(effectFXAA);

    selectedObjects.push(cube);
    outlinePass.selectedObjects = selectedObjects;

    outlinePass.edgeStrength = 10; // 0.01～10
    outlinePass.edgeGlow = 1; // 0.0～1
    outlinePass.edgeThickness = 1; // 1～4
    outlinePass.pulsePeriod = 5; // 0.0～5
    outlinePass.visibleEdgeColor = new THREE.Color(0x00ff80);
    outlinePass.hiddenEdgeColor = new THREE.Color(0xffffff);
}

function animate() {

    requestAnimationFrame(animate);

    var timer = performance.now();
    renderer.autoClear = true;
    renderer.setClearColor(0xffffff);
    renderer.setClearAlpha(0.0);

    composer.render();
    controls.update();
}