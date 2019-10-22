// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その８）" http://jsdo.it/cx20/8Jmv
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

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    camera.lookAt(scene.position);
/*
    camera.position.x = 100 * Math.sin(theta * Math.PI / 180);
    camera.position.y = 100 * Math.cos(60    * Math.PI / 180);
    camera.position.z = 100 * Math.cos(theta * Math.PI / 180);
*/
    controls.update();

    theta += 0.1;
    renderer.render(scene, camera);
}

width = window.innerWidth;
height = window.innerHeight;

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function (evt) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 60, 150);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0;    //自動回転する時の速度
    
    var s = (evt.target.response || evt.target.responseText).split("\n");
    makeMap1(s);
    makeMap2(s);
    makeMap3(s);

    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(-10, 50, 50).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-100, 0, 50).normalize();
    scene.add(light2);

    document.getElementById('webgl').appendChild(renderer.domElement);
    animate();
}, false);

function makeMap1(s) {
    var n = 6;
    var x1 = 128;
    var y1 = 128;
    var x2 = 192 / n;
    var y2 = 192 / n;
    var material = new THREE.LineBasicMaterial({
        color: 0x7fff7f
    });

    for (var i = 0; i < y2; i++) {
        var geometry = new THREE.Geometry();
        var r = s[Math.floor(i * n)].split(",");
        for (var j = 0; j < x2; j++) {
            var x = (j * n / 2) - 50;
            var y = ((y2 - i - 1) * n / 2) - 10;
            var z = r[j * n] * 1.0 - 50;
            geometry.vertices.push(new THREE.Vector3(x, y, z));
        }
        var line = new THREE.Line(geometry, material, THREE.LineStrip);
        line.rotation.x = (Math.PI / -2); // 90度回転（地面を上向きに設定）
        scene.add(line);
    }
}

function makeMap2(s) {
    var n = 2;
    var x1 = 128;
    var y1 = 128;
    var x2 = 192 / n;
    var y2 = 192 / n;

    var geometry = new THREE.Geometry();
    var c = 0;
    var colors = [];
    for (var i = 0; i < y2; i++) {
        //var geometry = new THREE.Geometry();
        var r = s[Math.floor(i * n)].split(",");
        for (var j = 0; j < x2; j++) {
            var x = (j * n / 2) - 50;
            var y = ((y2 - i - 1) * n / 2) - 50;
            var z = r[j * n] * 1.5 - 30;
            console.log( "x, y, z = " + x + ", " + y + ", " + z );
            var color = new THREE.Color();
            color.setHSL(((z+30)/20 * 360 | 0) / 360.0, 0.80, 0.50);
            var vertex = new THREE.Vector3( x, y, z );
            geometry.vertices.push( vertex );
            colors.push(color);
        }
    }
    
    geometry.colors = colors;

    // material
    var material = new THREE.PointCloudMaterial( {
        size: 1,
        transparent: true,
        opacity: 0.7,
        vertexColors: true
    } );

    // particle system
    var plane = new THREE.PointCloud( geometry, material );
    plane.rotation.x = (Math.PI / -2) * 0.8; // 90度回転（地面を上向きに設定）
    plane.position.z = -27;

    scene.add(plane);
}

function makeMap3() {
    var geometry = new THREE.PlaneGeometry(72, 96, 15, 20);
    var material = new THREE.MeshLambertMaterial({
        //map: THREE.ImageUtils.loadTexture('water.png'),
        //map: THREE.ImageUtils.loadTexture('/assets/5/7/0/n/570no.png'),
        color: 0xffff00,
        wireframe: true
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = (Math.PI / -2) * 0.4; // 90度回転（地面を上向きに設定）
    plane.position.y = 5;
    plane.position.z = -15;
    scene.add(plane);
}

//xhr.open('GET',  'dem.csv', true);
//xhr.open('GET', '/assets/2/g/t/o/2gtor', true);
xhr.open('GET', '../../assets/4/9/G/4/49G4v.csv', true); // 芦ノ湖
xhr.send(null);

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    animate(); // 再描画
};
