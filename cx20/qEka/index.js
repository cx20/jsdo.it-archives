// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その４）" http://jsdo.it/cx20/jEqZ
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その３）" http://jsdo.it/cx20/ky6o
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その２）" http://jsdo.it/cx20/rrlt
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var scene;
var camera;
var theta = 0;

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    camera.lookAt(scene.position);
    camera.position.x = 100 * Math.sin(theta * Math.PI / 180);
    camera.position.y = 100 * Math.cos(60    * Math.PI / 180);
    camera.position.z = 100 * Math.cos(theta * Math.PI / 180);

    theta += 0.2;
    renderer.render(scene, camera);
}

width = window.innerWidth;
height = window.innerHeight;

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function (evt) {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    var x1 = 128;
    var y1 = 128;
    var x2 = 192; // 256 -> 192
    var y2 = 192; // 256 -> 192
    //var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    var geometry = new THREE.Geometry();
    var s = (evt.target.response || evt.target.responseText).split("\n");
    var c = 0;
    var colors = [];
    for (var i = 0; i < y2; i++) {
        var r = s[i].split(",");
        for (var j in r) {
            var h = r[j] == 'e' ? 0 : Number(r[j]);
            var x = j - 90;
            var y = i - 90;
            var z = h * 1.5; // 高さの強調度を変える場合は、ここの数値を変更する
            var color = new THREE.Color();
            color.setHSL((z/12 * 360 | 0) / 360.0, 0.80, 0.50);
            var vertex = new THREE.Vector3( x, y, z );
            geometry.vertices.push( vertex );
            colors.push(color);
        }
    }
    
    geometry.colors = colors;

    // material
    var material = new THREE.PointCloudMaterial( {
        size: 3,
        transparent: true,
        opacity: 0.7,
        vertexColors: true
    } );

    // particle system
    var plane = new THREE.PointCloud( geometry, material );
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）

    scene.add(plane);

    document.getElementById('webgl').appendChild(renderer.domElement);
    animate();
}, false);
//xhr.open('GET',  'dem.csv', true);
xhr.open('GET', '../../assets/2/g/t/o/2gtor.csv', true);
xhr.send(null);

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    animate(); // 再描画
};
