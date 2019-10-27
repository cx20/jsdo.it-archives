// forked from cx20's "[WebGL] three.js で渦巻きを描いてみるテスト" http://jsdo.it/cx20/Cmdi
// forked from cx20's "[WebGL] three.js でリサージュ図形を描いてみるテスト（BufferGeometry編）" http://jsdo.it/cx20/QQAP
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var MAX = 3600;
var container;
var camera, scene, renderer;
var mesh;
var particles;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    var geometry = new THREE.BufferGeometry
    var positions = new Float32Array(MAX * 3);
    var colors = new Float32Array(MAX * 3);
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

    var A = 5.0;
    var B = 6.0;
    for (var i = 0; i < positions.length / 3; i++) {
        var t = i - (positions.length / 3) / 2;
        var x = 0.5 * Math.cos(2 * Math.PI * t / 360 * A);
        var y = 0.5 * Math.sin(2 * Math.PI * t / 360 * B);
        var z = t / (MAX/2);
        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        colors[i * 3 + 0] = x + 0.5;
        colors[i * 3 + 1] = y + 0.5;
        colors[i * 3 + 2] = z + 0.5;
    }
    geometry.colors = colors;
    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    mesh = new THREE.Line(geometry, material, THREE.LineStrip);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var pos = 0;
var rad = 0.0;

function render() {
    pos += 10;
    if (pos > MAX/2) {
        pos = -MAX/2;
    }
    rad += Math.PI * 1.0 / 180.0

    mesh.rotation.y = rad;
    mesh.geometry.setDrawRange(pos, MAX/2);

    renderer.render(scene, camera);
}