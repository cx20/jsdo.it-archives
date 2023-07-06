// forked from cx20's "Three.js で火星を表示させてみるテスト" http://jsdo.it/cx20/AFvB
// forked from cx20's "Three.js で地球を表示させてみるテスト" http://jsdo.it/cx20/78Dn
// forked from cx20's "Three.js で月を表示させてみるテスト" http://jsdo.it/cx20/vcVy
// forked from cx20's "Three.js で冥王星を表示させてみるテスト" http://jsdo.it/cx20/tenj
// forked from cx20's "Three.js で地球を回してみるテスト" http://jsdo.it/cx20/tv0T

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let width = 0;
let height = 0;
let mixer = null;
let clock = new THREE.Clock();
let scene
let renderer;
let controls;
let camera;
let light;
let light2;
let mars;
let cloud;

init();
animate();

function init() {
    let container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    light = new THREE.PointLight( new THREE.Color(0x808080), 3);
    light2 = new THREE.PointLight( new THREE.Color(0x101010), 2);
    light.position.set(0, -100, 1000);
    light2.position.set(50, 50, 1000);
    scene.add(light);
    scene.add(light2);
    let geometry = new THREE.SphereGeometry(140, 30, 30);
    const loader = new THREE.TextureLoader();
    //const planetTexture = loader.load('../../assets/K/C/E/D/KCEDg.jpg'); // mars_atmos_1024.jpg
    //const planetTexture = loader.load('../../assets/M/y/f/I/MyfIJ.jpg'); // mars_ocean_1024_001.jpg
    //const planetTexture = loader.load('../../assets/Q/Z/O/f/QZOf3.jpg'); // mars_ocean_1024_002.jpg
    //const planetTexture = loader.load('../../assets/I/f/x/I/IfxIP.jpg'); // mars_ocean_1024_003.jpg
    //const planetTexture = loader.load('../../assets/A/D/5/D/AD5Dj.jpg'); // mars_ocean_1024_004.jpg
    const planetTexture = loader.load('../../assets/e/0/L/P/e0LPo.jpg'); // mars_ocean_1024_005.jpg
    const normalTexture = loader.load('../../assets/k/u/S/Y/kuSYW.jpg'); // mars_normal_1024.jpg
    //const specularTexture = loader.load('../../assets/w/N/j/h/wNjh6.jpg'); // mars_specular_1024.jpg
    let material = new THREE.MeshPhongMaterial({
        map: planetTexture,
        normalMap: normalTexture,
        //specularMap: specularTexture,
        color: 0xffffff,
        specular: 0x111111,
        shininess: 20
    });
    mars = new THREE.Mesh(geometry, material);
    scene.add(mars);

    const cloudsTexture = loader.load('../../assets/n/l/9/m/nl9m8.png'); // earth_clouds_1024.png
    const materialClouds = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: cloudsTexture,
        transparent: true
    });
    cloud = new THREE.Mesh(geometry, materialClouds);
    cloud.scale.set(1.010, 1.010, 1.010);
    scene.add(cloud);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate(timestamp) {
    render(timestamp);
    requestAnimationFrame(animate);
}

function render(timestamp) {
    //mars.rotation.y += 0.005;
    //cloud.rotation.y += 0.006;
    mars.rotation.y = timestamp / 1000 * 0.3;
    cloud.rotation.y = timestamp / 1000 * 0.4;
    renderer.render(scene, camera);
}
