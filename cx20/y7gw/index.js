// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container;
var camera, scene, renderer;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new SHREE.Camera();
    camera.position.z = 2;
    scene = new SHREE.Scene();

    var vertexPositions = [
         0.0,  0.5, 0.0, // v0
        -0.5, -0.5, 0.0, // v1
         0.5, -0.5, 0.0  // v2
    ];
    
    var geometry = new SHREE.Geometry();
    geometry.addAttribute('position', 3, vertexPositions);
    geometry.index = [0, 1, 2];
    
    var material = new SHREE.Material({
        vertexShader: document.getElementById('vs').textContent,
        fragmentShader: document.getElementById('fs').textContent
    });

    var mesh = new SHREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new SHREE.Renderer();
    renderer.clearColor = [1.0, 1.0, 1.0, 1.0];
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
