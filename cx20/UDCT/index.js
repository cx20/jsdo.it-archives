// forked from cx20's "スーパーカミオカンデ付近の3Dデータを表示してみる（改）" http://jsdo.it/cx20/cZUk
// forked from cx20's "スーパーカミオカンデ付近の3Dデータを表示してみる" http://jsdo.it/cx20/grqS
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var gui;
var scene;
var camera;
var renderer;
var controls;
var arrow;
var clock = new THREE.Clock();
var width = window.innerWidth - 2;
var height = window.innerHeight - 2;
var MAP = "../../assets/g/L/J/J/gLJJh.jpg"; // 空撮写真
var SMOKE = false;
var ROTATE = true;
var MARKER = true;
var WIREFRAME = false;
var TRANSPARENT = true;


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

var container;
var img = new Image();
img.onload = function() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

    scene = new THREE.Scene();
    
    arrow = new THREE.ArrowHelper( new THREE.Vector3(0, -1, 0).normalize(), new THREE.Vector3(40, 35, 20), 35, 0xff0000 );
    scene.add( arrow );
    
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
    var scale = 4; // メッシュの細かさを調整
    var x1 = 128;
    var y1 = 128;
    var x2 = 256/scale;
    var y2 = 256/scale;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    for (var i = 0; i < geometry.vertices.length; i++) {
        var k = Math.floor(i / x2);
        var j = 256 * k * scale + (i % y2) * scale;
        geometry.vertices[i].z = data[j];
    }

    // テクスチャを貼り付け
    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(MAP),
        transparent: TRANSPARENT,        // 半透明合成のパラメータ
        blending: THREE.NormalBlending,  // 半透明合成の方法
        opacity: 0.5,                    // 透明度
        wireframe: WIREFRAME
    });
    var plane = new THREE.Mesh(geometry, material);
    
    // 座標回転
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);
    
    var cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 2, 16),
        new THREE.MeshLambertMaterial( { color: 0xffff00, wireframe: true } )
    );
    cylinder.position.x = 40;
    cylinder.position.y = 0;
    cylinder.position.z = 20;
    scene.add( cylinder );

    // GUI
    gui = new dat.GUI();
    gui.close();
    var mapSelector = gui.add(window, 'MAP', {
        "通常地図": "../../assets/o/k/8/M/ok8Mu.png",
        "空撮写真": "../../assets/g/L/J/J/gLJJh.jpg"
    });
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');
    var mapMarker = gui.add(window, 'MARKER').name('Marker');
    var mapWireframe = gui.add(window, 'WIREFRAME').name('Wireframe');
    var mapTransparent = gui.add(window, 'TRANSPARENT').name('Transparent');
    
    mapSelector.onChange(function (value) {
        plane.material.map = THREE.ImageUtils.loadTexture(value);
    });
    
    mapRotate.onChange(function (value) {
        controls.autoRotate = value;
    });

    mapMarker.onChange(function (value) {
        arrow.visible = value;
    });
    
    mapWireframe.onChange(function (value) {
        plane.material.wireframe = value;
    });

    mapTransparent.onChange(function (value) {
        plane.material.transparent = value;
    });

    //document.getElementById("webgl").appendChild(renderer.domElement);
    container.appendChild( renderer.domElement );
    animate();

    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }, false );
};

img.src = "../../assets/w/5/U/p/w5Upg.png"; // heightMap.png

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.clear();
    renderer.render(scene, camera);
}
