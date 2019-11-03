// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var shape = new THREE.Shape();
    shape.moveTo(   0, 0.5 ); // v0
    shape.lineTo(-0.5,-0.5 ); // v1
    shape.lineTo( 0.5,-0.5 ); // v2
    shape.lineTo(   0, 0.5 ); // v0
    var geometry = new THREE.ShapeGeometry(shape);
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}
