// forked from cx20's "Three.js で太陽を表示させてみるテスト" http://jsdo.it/cx20/ensQ
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
var venus;
var cloud;
var renderer;
var light;
var light2;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 300;

    scene = new THREE.Scene();
    light = new THREE.PointLight( new THREE.Color(0xffffff), 1);
    light.position.set(100, 0, 500);
    scene.add(light);
    geometry = new THREE.SphereGeometry(100, 30, 30);
    var planetTexture = THREE.ImageUtils.loadTexture('../../assets/i/g/4/9/ig499.jpg'); // venusmap.jpg
    var bumpTexture = THREE.ImageUtils.loadTexture('../../assets/c/z/3/a/cz3aR.jpg'); // venusbump.jpg
    material = new THREE.MeshPhongMaterial({
        map: planetTexture,
        bumpMap: bumpTexture,
        shininess: 0
    });
    venus = new THREE.Mesh(geometry, material);
    scene.add(venus);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    venus.rotation.y += 0.005;
    renderer.render(scene, camera);
}
