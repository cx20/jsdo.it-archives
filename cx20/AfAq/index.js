// forked from cx20's "御嶽山の3Dデータを表示してみた（その２）" http://jsdo.it/cx20/6tna
// forked from cx20's "御嶽山の3Dデータを表示してみた" http://jsdo.it/cx20/6GrB
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
    var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    var s = (evt.target.response || evt.target.responseText).split("\n");
    for (var i = 0; i < y2; i++) {
        var geometry = new THREE.Geometry();
        var colors = [];
        var r = s[Math.floor(i * n)].split(",");
        for (var j = 0; j < x2; j++) {
            var x = (j * n / 2) - 50;
            var y = ((y2 - i - 1) * n / 2) - 50;
            var z = r[j * n] * 1.5;
            geometry.vertices.push(new THREE.Vector3(x, y, z));
            var color = new THREE.Color();
            color.setHSL(((z)/20 * 360 | 0) / 360.0, 0.80, 0.50);
            colors.push ( color );
        }
        geometry.colors = colors;
        var line = new THREE.Line(geometry, material, THREE.LineStrip);
        line.rotation.x = (Math.PI / -2); // 90度回転（地面を上向きに設定）
        scene.add(line);
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


//xhr.open('GET',  'dem.csv', true);
//xhr.open('GET', '/assets/2/g/t/o/2gtor', true);
//xhr.open('GET', '/assets/4/9/G/4/49G4v', true); // 芦ノ湖
//xhr.open('GET', '/assets/5/S/m/V/5SmV7', true); // 黒部峡谷
xhr.open('GET', '../../assets/w/i/P/a/wiPab.csv', true); // 御嶽山
xhr.send(null);

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    animate(); // 再描画
};
