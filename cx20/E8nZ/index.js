// forked from cx20's "vox.js を試してみるテスト（その１１）" http://jsdo.it/cx20/04WG
// forked from cx20's "vox.js を試してみるテスト（その１０）" http://jsdo.it/cx20/q67O
// forked from cx20's "vox.js を試してみるテスト（その９）" http://jsdo.it/cx20/4LYl
// forked from cx20's "vox.js を試してみるテスト（その８）" http://jsdo.it/cx20/iEi8
// forked from cx20's "vox.js を試してみるテスト（その７）" http://jsdo.it/cx20/K6wm
// forked from cx20's "vox.js を試してみるテスト（その６）" http://jsdo.it/cx20/oZg0
// forked from cx20's "vox.js を試してみるテスト（その５）" http://jsdo.it/cx20/af9L
// forked from cx20's "vox.js を試してみるテスト（その４）" http://jsdo.it/cx20/qL0R
// forked from cx20's "vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ymYt
// forked from cx20's "vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/adwz
// forked from cx20's "vox.js を試してみるテスト" http://jsdo.it/cx20/u80n
// forked from ohisama1's "vox.js test 0" http://jsdo.it/ohisama1/e9dm

var scene, camera, renderer, controls;
var ROTATE = true;
var mesh;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 450 / 450, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp(Math.PI * 0.1);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 4.0; //自動回転する時の速度

    renderer.setSize(465, 465);
    renderer.shadowMapEnabled = true;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 300;
    camera.lookAt(scene.position);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 100, -100);
    scene.add(spotLight);

    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(100, 100, 100).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-100, -100, -100).normalize();
    scene.add(light2);

    document.body.appendChild(renderer.domElement);
    var DOT_SIZE = 10;
    var parser = new vox.Parser();
    // adobe.vox
    parser.parse("../../assets/y/l/j/y/yljy3.vox").then(function(voxelData) {
        var builder = new vox.MeshBuilder(voxelData, {
            voxelSize: DOT_SIZE,
            vertexColor: true,
            optimizeFaces: false
        });
        mesh = builder.createMesh();
        mesh.material.wireframe = true;
        scene.add(mesh);
        render();
    });
}

function render() {
    var vertices = mesh.geometry.vertices;
    for (var i = 0; i < vertices.length; i++) {
        var particle = vertices[i];
        particle.x += Math.random() - 0.5;
        particle.y += Math.random() - 0.5;
        particle.z += Math.random() - 0.5;
    }
    mesh.geometry.verticesNeedUpdate = true;

    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
