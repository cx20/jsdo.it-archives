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
var mars;
var cloud;
var renderer;
var light;
var light2;
var video;
var videoTexture;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    video = document.createElement('video');
    video.autoplay = true;
    //video.src = "../../assets/q/h/s/a/qhsaJ"; // jupiter.webm
    video.src = "../../assets/g/B/h/x/gBhxi.mp4"; // jupiter.mp4
    video.playbackRate = 0.5; // 0.5 倍速
    video.loop = true;
    videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    
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
        map: videoTexture,
        //map: planetTexture,
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
    if( video.readyState === video.HAVE_ENOUGH_DATA ){
        videoTexture.needsUpdate = true;
    }

    mars.rotation.y += 0.005;
    //cloud.rotation.y += 0.006;
    renderer.render(scene, camera);
}
