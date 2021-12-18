// forked from cx20's "Three.js で月食っぽいものを表示してみるテスト（調整中）" http://jsdo.it/cx20/QoZL
// forked from cx20's "Three.js で月を表示させてみるテスト（改）（バンプマップのみ）" http://jsdo.it/cx20/d5T7
// forked from cx20's "Three.js で月を表示させてみるテスト" http://jsdo.it/cx20/vcVy
// forked from cx20's "Three.js で冥王星を表示させてみるテスト" http://jsdo.it/cx20/tenj
// forked from cx20's "Three.js で地球を回してみるテスト" http://jsdo.it/cx20/tv0T

var container;
var camera, scene, renderer, controls;
var mesh, decal;
var raycaster = new THREE.Raycaster();
var lihght1;
var lihght2;

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

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.x = 800;
    camera.position.z = 0;

    scene = new THREE.Scene();

    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.noPan = true;
    controls.minDistance = 200;
    controls.maxDistance = 1000;

    scene.add(group);

    var textureLoader = new THREE.TextureLoader();
    texture = textureLoader.load("../../assets/A/u/M/t/AuMt1.jpg"); // moon.jpg

    light1 = new THREE.AmbientLight(0x8090a0, 1.0);
    scene.add(light1);

    //light2 = new THREE.PointLight( new THREE.Color(0x89462e), 2.0);
    light2 = new THREE.PointLight( new THREE.Color(0x2070d0), -2.0);
    scene.add(light2);
    
    var geometry = new THREE.SphereGeometry(200, 30, 20);
    material = new THREE.MeshLambertMaterial({
        map: texture
    });
    var moon = new THREE.Mesh(geometry, material);
    moon.rotation.x = (23.5/180)*Math.PI;
    group.add(moon);
    
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

    selectedObjects.push(moon);
    outlinePass.selectedObjects = selectedObjects;

    outlinePass.edgeStrength = 1.0; // 0.01～10
    outlinePass.edgeGlow = 1; // 0.0～1
    outlinePass.edgeThickness = 0.1; // 1～4
    outlinePass.pulsePeriod = 10; // 0.0～5
    outlinePass.visibleEdgeColor = new THREE.Color(0xa08080);
    outlinePass.hiddenEdgeColor = new THREE.Color(0xffffff);
}

function animate(timestamp) {

    render(timestamp);

    requestAnimationFrame(animate);
}

var angle = 0;
function render(timestamp) {
    controls.update();

    //angle += Math.PI * 0.5/ 180;
    angle = timestamp / 1000 * 0.5; // Seconds since the first requestAnimationFrame (ms)
    var timer = performance.now();
    renderer.autoClear = true;
    renderer.setClearColor(0xffffff);
    renderer.setClearAlpha(0.0);

    var x = 1000 * Math.sin(angle);
    var z = 1000 * Math.cos(angle);
    light2.position.set(x, -100, z);

    composer.render();
}
