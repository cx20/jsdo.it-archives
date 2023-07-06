// forked from cx20's "Three.js で冥王星を表示させてみるテスト" http://jsdo.it/cx20/tenj
// forked from cx20's "Three.js で地球を回してみるテスト" http://jsdo.it/cx20/tv0T

import * as THREE from 'three';

let scene
let renderer;
let camera;
let container;
let light;
let mesh;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    light = new THREE.PointLight( new THREE.Color(0x808080), 1.5);
    //light2 = new THREE.PointLight( new THREE.Color(0x101010), 1);
    light.position.set(500, -100, 1000);
    //light2.position.set(50, 50, 1000);
    scene.add(light);
    //scene.add(light2);
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(140, 30, 30);
    const material = new THREE.MeshLambertMaterial({
        map: loader.load('../../assets/4/Y/G/9/4YG92.jpg'),	// moon.jpg
        bumpMap: loader.load('../../assets/4/Y/G/9/ldem_3_8bit.jpg'), // moon.jpg
        bumpScale: 1.0
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.overdraw = true;
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate(timestamp) {
    render(timestamp);
    requestAnimationFrame(animate);
}

function render(timestamp) {
    //mesh.rotation.y += 0.005;
    mesh.rotation.y = timestamp / 1000 * 0.3;
    renderer.render(scene, camera);
}
