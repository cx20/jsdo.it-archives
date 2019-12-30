// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その１０改2）" http://jsdo.it/cx20/sL2i
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その１０改）" http://jsdo.it/cx20/yc3W
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その１０）" http://jsdo.it/cx20/wbmT
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その９）（失敗）" http://jsdo.it/cx20/d2KX
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
    camera.position.set(0, 100, 100);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0;    //自動回転する時の速度

    var n = 2;
    var x1 = 128;
    var y1 = 128;
    var x2 = 192 / n;
    var y2 = 192 / n;
    var geometry = new THREE.BoxGeometry(4,2,4);
    var s = (evt.target.response || evt.target.responseText).split("\n");
    for (var i = 0; i < y2; i++) {
        var colors = [];
        var r = s[Math.floor(i * n)].split(",");
        for (var j = 0; j < x2; j++) {
            var x = (j * n / 2) - 50;
            var y = Math.floor((r[j * n] * 1) / n * n);
            var z = ((i - 1) * n / 2) - 50;
            var color = new THREE.Color();
            color.setHSL((y / 40 * 360 | 0) / 360.0, 0.80, 0.50);
            var material = new THREE.MeshLambertMaterial({
                color: color,
                wireframe: false
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            scene.add(mesh);
        }
    }

    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(-10, 50, 50).normalize();
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-100, 0, 50).normalize();
    scene.add(light2);

    document.getElementById('webgl').appendChild(renderer.domElement);
    animate();
}, false);


xhr.open('GET', '../../assets/7/D/o/H/7DoHj.csv', true); // 黒部峡谷
xhr.send(null);

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    animate(); // 再描画
};
