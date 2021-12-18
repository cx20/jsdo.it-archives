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
    light = new THREE.PointLight( new THREE.Color(0x808080), 3);
    light2 = new THREE.PointLight( new THREE.Color(0x101010), 2);
    light.position.set(0, -100, 1000);
    light2.position.set(50, 50, 1000);
    scene.add(light);
    scene.add(light2);
    geometry = new THREE.SphereGeometry(140, 30, 30);
    var planetTexture = THREE.ImageUtils.loadTexture('../../assets/k/C/E/D/kCEDg.jpg'); // mars_atmos_1024.jpg
    //var planetTexture = THREE.ImageUtils.loadTexture('../../assets/g/k/b/s/gkbsR.jpg'); // mars_ocean_1024.jpg
    var normalTexture = THREE.ImageUtils.loadTexture('../../assets/k/u/S/Y/kuSYW.jpg'); // mars_normal_1024.jpg
    //var specularTexture = THREE.ImageUtils.loadTexture('../../assets/w/N/j/h/wNjh6.jpg'); // mars_specular_1024.jpg
    material = new THREE.MeshPhongMaterial({
        map: planetTexture,
        normalMap: normalTexture,
        //specularMap: specularTexture,
        color: 0xffffff,
        specular: 0x111111,
        shininess: 20
    });
    mars = new THREE.Mesh(geometry, material);
    scene.add(mars);

    var cloudsTexture = THREE.ImageUtils.loadTexture('../../assets/n/l/9/m/nl9m8.png'); // earth_clouds_1024.png
    var materialClouds = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: cloudsTexture,
        transparent: true
    });
    //cloud = new THREE.Mesh(geometry, materialClouds);
    //cloud.scale.set(1.010, 1.010, 1.010);
    //scene.add(cloud);

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
    renderer.render(scene, camera);
}
