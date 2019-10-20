let scene, camera, renderer;
let geometry;

let theta = 0;
let line;
let color;

const R = 100;
let f1 = 0.0;
let f2 = 0.0;
let f3 = 0.0;
let f4 = 0.0;
let p1 = 0.0;

let uniforms = {
    f1:   {type: "f", value: 0.0},
    f2:   {type: "f", value: 0.0},
    f3:   {type: "f", value: 0.0},
    f4:   {type: "f", value: 0.0},
    p1:   {type: "f", value: 0.0}
};

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10000);
    //camera.position.z = 200;
    //scene.add(camera);
    
    scene.position.z = -200;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMap.enabled = true;
    renderer.vr.enabled = true;

    container = document.getElementById("container");
    container.appendChild(renderer.domElement);

    document.body.appendChild( WEBVR.createButton( renderer ) );
    controller = new THREE.GearVRController();

    window.addEventListener( 'resize', onWindowResize, false );

    geometry = new THREE.Geometry();
    initHarmonograph();
}

function initHarmonograph()
{
    let x, y, z;
    for (let t = 0; t <= 100; t += 0.01) {
        x = t;
        y = 0.0;
        z = 0.0;
        geometry.vertices.push( new THREE.Vector3( x, y, z ) );
    }

    // material
    let material = new THREE.ShaderMaterial( {
        uniforms:       uniforms,
        vertexShader:   document.getElementById( 'vs' ).textContent,
        fragmentShader: document.getElementById( 'fs' ).textContent,
    });
    line = new THREE.Line(geometry, material, THREE.LineStrip);
    scene.add(line);
}

function randomHarmonograph() {
    f1 = (f1 + Math.random() / 100) % 10;
    f2 = (f2 + Math.random() / 100) % 10;
    f3 = (f3 + Math.random() / 100) % 10;
    f4 = (f4 + Math.random() / 100) % 10;
    p1 += (Math.PI*2 * 0.5 / 360);
    uniforms.f1.value = f1;
    uniforms.f2.value = f2;
    uniforms.f3.value = f3;
    uniforms.f4.value = f4;
    uniforms.p1.value = p1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    renderer.setAnimationLoop( render );
}

function render() {
    randomHarmonograph();
    renderer.render( scene, camera );
}

init();
animate();
