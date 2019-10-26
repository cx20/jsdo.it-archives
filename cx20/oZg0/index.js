// forked from cx20's "vox.js を試してみるテスト（その５）" http://jsdo.it/cx20/af9L
// forked from cx20's "vox.js を試してみるテスト（その４）" http://jsdo.it/cx20/qL0R
// forked from cx20's "vox.js を試してみるテスト（その３）" http://jsdo.it/cx20/ymYt
// forked from cx20's "vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/adwz
// forked from cx20's "vox.js を試してみるテスト" http://jsdo.it/cx20/u80n
// forked from ohisama1's "vox.js test 0" http://jsdo.it/ohisama1/e9dm

var DOT_SIZE = 16;
var meshArray = [];
var list = [];

var scene, camera, renderer, controls;
var ROTATE = true;

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
        var X_START_POS = -voxelData.size.x * DOT_SIZE / 2;
        var Y_START_POS = -voxelData.size.z * DOT_SIZE / 2;
        var Z_START_POS = -voxelData.size.y * DOT_SIZE / 2;
        
        for ( var i = 0; i  < voxelData.voxels.length; i++ ) {
            var voxel = voxelData.voxels[i];
            var geometry = new THREE.BoxGeometry(DOT_SIZE * 0.8, DOT_SIZE * 0.8, DOT_SIZE * 0.8);
            //var geometry = new THREE.SphereGeometry(DOT_SIZE * 0.8 / 2, 12, 12);
            var c = voxelData.palette[voxel.colorIndex];
            var color = new THREE.Color(c.r / 255, c.g / 255, c.b / 255);
            var material = new THREE.MeshLambertMaterial({color: color});
            //var material = new THREE.MeshLambertMaterial({color: color, wireframe: true});
            meshArray[i] = new THREE.Mesh(geometry, material);
            meshArray[i].position.x = voxel.x * DOT_SIZE + X_START_POS;
            meshArray[i].position.y = voxel.z * DOT_SIZE + X_START_POS;
            meshArray[i].position.z = voxel.y * DOT_SIZE + X_START_POS;

            scene.add(meshArray[i]);
            list.push(meshArray[i].clone());
        }

        setInterval(transformMesh, 5000);
    });
    render();
}

function render() {
    TWEEN.update();

    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();

function transformMesh() {
    var type = Math.floor(Math.random() * 3);

    switch (type) {
    case 0:
        transformTypeRandom();
        break;
    case 1:
        transformTypeOriginal();
        break;
    case 2:
        transformTypeInfinity();
        break;
    default:
        transformTypeOriginal();
        break;
    }
}

// Random
function transformTypeRandom() {
    for (var i = 0; i < meshArray.length; i++) {
        var rot = 360 / meshArray.length * i;
        var vx = Math.random() * 200 - 100;
        var vy = Math.random() * 200 - 100;
        var vz = Math.random() * 200 - 100;

        new TWEEN.Tween(meshArray[i].scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1000)
            .easing(TWEEN.Easing.Back.Out).start();

        new TWEEN.Tween(meshArray[i].position).to({
            x: vx,
            y: vy,
            z: vz
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(meshArray[i].rotation).to({
            x: 0,
            y: rot,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

// Original
function transformTypeOriginal() {
    var x, y, z;
    for (i = 0; i < list.length; i++) {
        x = list[i].position.x;
        y = list[i].position.y;
        z = list[i].position.z;
        
        new TWEEN.Tween(meshArray[i].position).to({
            x: x,
            y: y,
            z: z
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(meshArray[i].rotation).to({
            x: 0,
            y: 0,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}

// Infinity
function transformTypeInfinity() {
    for (var i = 0; i < list.length; i++) {
        var rot = 4 * i;
        var vx = 100 * ( Math.cos(rot * Math.PI / 180) * Math.cos(rot * Math.PI / 180)) + Math.random() * 10;
        var vy = 100 * ( Math.cos(rot * Math.PI / 180) * Math.sin(rot * Math.PI / 180)) + Math.random() * 10;
        var vz = 100 * Math.cos(rot * Math.PI / 180) + Math.random() * 10;

        new TWEEN.Tween(meshArray[i].scale).to({
            x: 1,
            y: 1,
            z: 1
        }, 1000)
            .easing(TWEEN.Easing.Back.Out).start();

        new TWEEN.Tween(meshArray[i].position).to({
            x: vx,
            y: vy,
            z: vz
        }, 1000)
            .easing(TWEEN.Easing.Exponential.InOut).start();

        new TWEEN.Tween(meshArray[i].rotation).to({
            x: 0,
            y: rot,
            z: 0
        }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut).start();
    }
}
