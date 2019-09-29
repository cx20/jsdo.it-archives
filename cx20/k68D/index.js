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
var mars;
var cloud;
var renderer;
var light;
var light2;

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
    var planetTexture = THREE.ImageUtils.loadTexture('../../assets/2/N/E/a/2NEaQ.jpg'); // jupiter.jpg
    //var normalTexture = THREE.ImageUtils.loadTexture('../../assets/c/P/t/k/cPtkD.png'); // jupiter_002.jpg
    material = new THREE.MeshPhongMaterial({
        map: planetTexture,
        //normalMap: normalTexture,
        //specularMap: specularTexture,
        color: 0xffffff,
        specular: 0x111111,
        shininess: 0
    });
    mars = new THREE.Mesh(geometry, material);
    scene.add(mars);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    mars.rotation.y += 0.005;
    renderer.render(scene, camera);
}
