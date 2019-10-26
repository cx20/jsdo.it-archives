// forked from cx20's "vox.js を試してみるテスト（その４）" http://jsdo.it/cx20/qL0R
// forked from cx20's "vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ymYt
// forked from cx20's "vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/adwz
// forked from cx20's "vox.js を試してみるテスト" http://jsdo.it/cx20/u80n
// forked from ohisama1's "vox.js test 0" http://jsdo.it/ohisama1/e9dm

var scene, camera, renderer, controls;
var ROTATE = true;
var DOT_SIZE = 16;

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
    var parser = new vox.Parser();
    // adobe.vox
    parser.parse("../../assets/y/l/j/y/yljy3.vox").then(function(voxelData) {
/*
        var builder = new vox.MeshBuilder(voxelData, {
            voxelSize: DOT_SIZE,
            vertexColor: true,
            optimizeFaces: false,
        });
        var v0 = builder.createMesh();
        //v0.position.y -= 50;
        scene.add(v0);
*/
        var meshArray = [];
        for ( var i = 0; i  < voxelData.voxels.length; i++ ) {
            var voxel = voxelData.voxels[i];
            //var geometry = new THREE.BoxGeometry(DOT_SIZE * 0.8, DOT_SIZE * 0.8, DOT_SIZE * 0.8);
            var geometry = new THREE.SphereGeometry(DOT_SIZE * 0.8 / 2, 8, 6);
            var c = voxelData.palette[voxel.colorIndex];
            var color = new THREE.Color(c.r / 255, c.g / 255, c.b / 255);
            //var material = new THREE.MeshLambertMaterial({color: color});
            var material = new THREE.MeshLambertMaterial({color: color, wireframe: true});
            meshArray[i] = new THREE.Mesh(geometry, material);
            meshArray[i].position.x = voxel.x * DOT_SIZE - voxelData.size.x * DOT_SIZE / 2;
            meshArray[i].position.y = voxel.z * DOT_SIZE - voxelData.size.z * DOT_SIZE / 2;
            meshArray[i].position.z = voxel.y * DOT_SIZE - voxelData.size.y * DOT_SIZE / 2;

            scene.add(meshArray[i]);
        }
    });
    render();
}

function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
