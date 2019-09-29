// forked from cx20's "Three.js で木星を表示させてみるテスト" http://jsdo.it/cx20/k68D
// forked from cx20's "Three.js で火星を表示させてみるテスト" http://jsdo.it/cx20/AFvB
// forked from cx20's "Three.js で地球を表示させてみるテスト" http://jsdo.it/cx20/78Dn
// forked from cx20's "Three.js で月を表示させてみるテスト" http://jsdo.it/cx20/vcVy
// forked from cx20's "Three.js で冥王星を表示させてみるテスト" http://jsdo.it/cx20/tenj
// forked from cx20's "Three.js で地球を回してみるテスト" http://jsdo.it/cx20/tv0T

var container;
var camera;
var scene;
var geometry;
var material;
var sun;
var cloud;
var renderer;
var light;
var light2;
var clock = new THREE.Clock();

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    light = new THREE.PointLight( new THREE.Color(0xffffff), 1);
    light2 = new THREE.PointLight( new THREE.Color(0x101010), 1);
    light.position.set(0, -100, 1000);
    light2.position.set(50, 50, 1000);
    scene.add(light);
    scene.add(light2);
    geometry = new THREE.SphereGeometry(140, 30, 30);

    ////////////
    // CUSTOM //
    ////////////
    
    // base image texture for mesh
    var lavaTexture = new THREE.ImageUtils.loadTexture("../../assets/c/C/I/q/cCIqn.jpg"); // lava.jpg
    lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping; 
    // multiplier for distortion speed         
    var baseSpeed = 0.02;
    // number of times to repeat texture in each direction
    var repeatS = repeatT = 4.0;
    
    // texture used to generate "randomness", distort all other textures
    var noiseTexture = new THREE.ImageUtils.loadTexture("../../assets/y/8/i/H/y8iHs.png"); // cloud.png
    noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping; 
    // magnitude of noise effect
    var noiseScale = 0.5;
    
    // texture to additively blend with base image texture
    var blendTexture = new THREE.ImageUtils.loadTexture("../../assets/c/C/I/q/cCIqn.jpg"); // lava.jpg
    blendTexture.wrapS = blendTexture.wrapT = THREE.RepeatWrapping; 
    // multiplier for distortion speed 
    var blendSpeed = 0.01;
    // adjust lightness/darkness of blended texture
    var blendOffset = 0.25;

    // texture to determine normal displacement
    var bumpTexture = noiseTexture;
    bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping; 
    // multiplier for distortion speed         
    var bumpSpeed   = 0.15;
    // magnitude of normal displacement
    var bumpScale   = 40.0;
    
    // use "this." to create global object
    this.customUniforms = {
        baseTexture:    { type: "t", value: lavaTexture },
        baseSpeed:      { type: "f", value: baseSpeed },
        repeatS:        { type: "f", value: repeatS },
        repeatT:        { type: "f", value: repeatT },
        noiseTexture:   { type: "t", value: noiseTexture },
        noiseScale:     { type: "f", value: noiseScale },
        blendTexture:   { type: "t", value: blendTexture },
        blendSpeed:     { type: "f", value: blendSpeed },
        blendOffset:    { type: "f", value: blendOffset },
        bumpTexture:    { type: "t", value: bumpTexture },
        bumpSpeed:      { type: "f", value: bumpSpeed },
        bumpScale:      { type: "f", value: bumpScale },
        alpha:          { type: "f", value: 1.0 },
        time:           { type: "f", value: 1.0 }
    };
    
    // create custom material from the shader code above
    //   that is within specially labeled script tags
    var customMaterial = new THREE.ShaderMaterial( 
    {
        uniforms: customUniforms,
        vertexShader:   document.getElementById("vertexShader").textContent,
        fragmentShader: document.getElementById("fragmentShader").textContent
    });
    
    sun = new THREE.Mesh(geometry, customMaterial);
    scene.add(sun);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = clock.getDelta();
    customUniforms.time.value += delta;
    sun.rotation.y += 0.005;
    renderer.render(scene, camera);
}
