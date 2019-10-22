// forked from cx20's "箱根山周辺の3Dデータを表示してみる（その４）" http://jsdo.it/cx20/9TzI
// forked from cx20's "箱根山周辺の3Dデータを表示してみる（その３）" http://jsdo.it/cx20/iBDu
// forked from cx20's "箱根山周辺の3Dデータを表示してみる（その２）" http://jsdo.it/cx20/ineU
// forked from cx20's "箱根山周辺の3Dデータを表示してみる" http://jsdo.it/cx20/ljKt
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var gui;
var scene;
var camera;
var renderer;
var controls;
var width = window.innerWidth - 2;
var height = window.innerHeight - 2;
var MAP = "../../assets/1/j/j/H/1jjHY.jpg";
var ROTATE = true;

// heightMap より標高データを取得する
// 参考：http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");

    var size = img.width * img.height;
    var data = new Float32Array(size);

    context.drawImage(img, 0, 0);

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j = 0;
    for (var i = 0; i < pix.length; i += 4) {
        var k = 1.5; // 起伏の強調度
        var height = (pix[i] + pix[i + 1] + pix[i + 2])/3 * 1/16 * k;
        data[j++] = height;
    }

    return data;
}

var img = new Image();
img.onload = function() {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 60, 150);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // OrbitControls の準備
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    //controls.rotateUp(Math.PI * 0.38);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0; //自動回転する時の速度

    // heightMap より標高データを取得
    var data = getHeightData(img);

    // 標高データを元に地形を生成
    var x1 = 128;
    var y1 = 128;
    var x2 = 256;
    var y2 = 256;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    for (var i = 0; i < geometry.vertices.length; i++) {
        geometry.vertices[i].z = data[i];
    }

    // テクスチャを貼り付け
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(MAP)
    });
    var plane = new THREE.Mesh(geometry, material);
    
    // 座標回転
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);

    // GUI
    gui = new dat.GUI();
    var mapSelector = gui.add(window, 'MAP', {
        "通常地図": "../../assets/1/j/j/H/1jjHY.jpg", 
        "空撮写真": "../../assets/4/1/C/7/41C7x.jpg",
        "防災地図": "../../assets/p/Q/e/W/pQeWF.jpg", 
        "規制範囲": "../../assets/m/A/6/u/mA6uT.jpg", 
        "地殻変動": "../../assets/d/q/g/U/dqgUo.jpg", 
        "震源分布": "../../assets/4/E/u/4/4Eu4D.jpg",
        "火山基本図": "../../assets/8/i/z/t/8izth.jpg"
    });
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');

    mapSelector.onChange(function (value) {
        plane.material.map = THREE.ImageUtils.loadTexture(value);
    });
    
    mapRotate.onChange(function (value) {
        controls.autoRotate = value;
    });
    
    document.getElementById("webgl").appendChild(renderer.domElement);
    animate();

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }, false );
};

img.src = "../../assets/g/H/h/L/gHhLD.png"; // heightMap.png

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}