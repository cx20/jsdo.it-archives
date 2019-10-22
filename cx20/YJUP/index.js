// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その７改4）" http://jsdo.it/cx20/bMMv
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その７改3）" http://jsdo.it/cx20/plzp
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その７改2）" http://jsdo.it/cx20/v2w2
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その７改）" http://jsdo.it/cx20/7TRS
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その７）" http://jsdo.it/cx20/A5nH
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その６）" http://jsdo.it/cx20/i5wV
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その５）" http://jsdo.it/cx20/qEka
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その４）" http://jsdo.it/cx20/jEqZ
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その３）" http://jsdo.it/cx20/ky6o
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その２）" http://jsdo.it/cx20/rrlt
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var scene;
var camera;
var theta = 0;
var cylinders = [];
var angles = [];
var water;
var controls;

var group;
var extrudeUpper;
var extrudeDown;
var extrudeCenter;
var extrudeOuter1;
var extrudeOuter2;
var extrudeOuter3;
var extrudeOuter4;

width = window.innerWidth;
height = window.innerHeight;

function createSectorGeometry(innerRadius, outerRadius, startAngle, endAngle, segments, thickness) {
    var shape = new THREE.Shape();
    var i, x, y;
    if ( outerRadius > 0 ) {
        for(i = startAngle; i <= endAngle; i += (360/segments)) {
            x = outerRadius * Math.sin(2*Math.PI*i/360);
            y = outerRadius * Math.cos(2*Math.PI*i/360);
            if ( i === startAngle) {
                shape.moveTo(x, y);
            }
            shape.lineTo(x, y);
        }
    }
    if ( innerRadius > 0 ) {
        for(i = endAngle; i >= startAngle; i -= (360/segments)) {
            x = innerRadius * Math.sin(2*Math.PI*i/360);
            y = innerRadius * Math.cos(2*Math.PI*i/360);
            shape.lineTo(x, y);
        }
    }

    var parameters = {
        amount: thickness, // 2
        bevelEnabled: false,
        bevelSegments: 2,
        bevelThickness: 5,
        bevelSize: 3
    };
    
    var geometry = new THREE.ExtrudeGeometry(shape, parameters);
    var material = new THREE.MeshPhongMaterial({
        color: 0x00AFFF,
        specular: 0x111111,
        shininess: 20
    });
    var extrude = new THREE.Mesh(geometry, material);
    extrude.position.z -= thickness/2;
    return extrude;
}

function addPokestop() {
    group = new THREE.Object3D();
    scene.add(group);
    extrudeUpper = createSectorGeometry(25, 50, -90, 90, 36, 5);
    extrudeDown = createSectorGeometry(25, 50, 90, 270, 36, 5);
    extrudeCenter = createSectorGeometry(0, 20, 0, 360, 36, 5);
    extrudeOuter1 = createSectorGeometry(62, 70, 0, 180, 36, 5);
    extrudeOuter2 = createSectorGeometry(62, 70, 180, 360, 36, 5);
    extrudeOuter3 = createSectorGeometry(70, 75, 0, 180, 36, 2);
    extrudeOuter4 = createSectorGeometry(70, 75, 180, 360, 36, 2);
    //extrudeOuter2 = createSectorGeometry(72, 75,  90, 360, 36, 2);
    extrudeUpper.position.y += 2;
    extrudeDown.position.y -= 2;

    extrudeUpper.castShadow = true;
    extrudeDown.castShadow = true;
    extrudeCenter.castShadow = true;
    extrudeOuter1.castShadow = true;
    extrudeOuter2.castShadow = true;
    extrudeOuter3.castShadow = true;
    extrudeOuter4.castShadow = true;

    group.add(extrudeUpper);
    group.add(extrudeDown);
    group.add(extrudeCenter);
    group.add(extrudeOuter1);
    group.add(extrudeOuter2);
    group.add(extrudeOuter3);
    group.add(extrudeOuter4);
    group.scale.set(0.1, 0.1, 0.1);
    group.position.y += 15.0;
    group.position.x -= 10.0;
    group.position.z += 10.0;
}


function addLights() {
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(-10, 50, 50).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-100, 0, 50).normalize();
    scene.add(light2);

    var light3 = new THREE.SpotLight(0xffffff);
    light3.position.set(0, 500, 500);
    light3.target.position.set(0, 0, 0);
    light3.shadowMapWidth = 1000;
    light3.shadowMapHeight = 1000;
    light3.castShadow = true;
    scene.add(light3);
}

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(evt) {
    scene = new THREE.Scene();
    //scene.add(new THREE.AmbientLight(0xffffff));
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 20, 100);

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMapEnabled = true;
    renderer.setSize(width, height);

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.userPan = false;
	controls.userPanSpeed = 0.0;
	controls.maxDistance = 5000.0;
	controls.maxPolarAngle = Math.PI * 0.495;
	controls.autoRotate = true;
	controls.autoRotateSpeed = -2.0;

    var x1 = 128;
    var y1 = 128;
    var x2 = 192; // 256 -> 192
    var y2 = 192; // 256 -> 192
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    var s = (evt.target.response || evt.target.responseText).split("\n");
    var c = 0;
    for (var i = 0; i < y2; i++) {
        var r = s[i].split(",");
        for (var j in r) {
            var h = r[j] == 'e' ? 0 : Number(r[j]);
            geometry.vertices[c].z = h;
            c++;
        }
    }
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('../../assets/9/r/4/P/9r4PX.png'), // 芦ノ湖
        wireframe: false
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    plane.receiveShadow = true;
    scene.add(plane);
//----------------------------------------
    var parameters = {
        widthSegments: 250,
        heightSegments: 250,
        depth: 1500,
        param: 4,
        filterparam: 1
    }

    var waterNormals = new THREE.ImageUtils.loadTexture('../../assets/t/r/M/o/trMo7.jpg'); // waternormals.jpg
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    water = new THREE.Water(renderer, camera, scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 1.0,
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 50.0,
    });

    var plane2 = new THREE.Mesh(
        new THREE.PlaneGeometry(128, 128, 20, 20),
        water.material
    );

    plane2.position.y = 1.6;
    plane2.receiveShadow = true;
    plane2.add(water);
    plane2.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane2);
//----------------------------------------    
    addPokestop();
    addLights();

    document.getElementById('webgl').appendChild(renderer.domElement);
    animate();
}, false);

xhr.open('GET', '../../assets/4/9/G/4/49G4v.csv', true); // 芦ノ湖
xhr.send(null);

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(scene.position);

    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();

	controls.update();

    extrudeCenter.rotation.y += 0.05;

    extrudeOuter1.rotation.y += 0.02;
    extrudeOuter2.rotation.y += 0.02;
    extrudeOuter3.rotation.y -= 0.02;
    extrudeOuter4.rotation.y -= 0.02;
    
    theta += 0.1;
    renderer.render(scene, camera);
}

window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    animate(); // 再描画
};
