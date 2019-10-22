// forked from cx20's "九州付近の地図に震度データを合成してみる" http://jsdo.it/cx20/eaW9
// forked from cx20's "阿蘇山の3Dデータを表示してみる" http://jsdo.it/cx20/wtNjT
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var gui;
var scene;
var camera;
var renderer;
var controls;
var engine;
var clock = new THREE.Clock();
var width = window.innerWidth - 2;
var height = window.innerHeight - 2;
var MAP = "../../assets/s/h/v/7/shv7d.jpg"; // 空撮写真
var WIREFRAME = true;
var ROTATE = false;


var dataSet = [
	{date:'2018/05/02 00:11:40', lat:33.11, long:131.192, dep:3.1, mag:0.5},
	{date:'2018/05/02 00:23:20', lat:33.005, long:130.473, dep:12.4, mag:0.1},
	{date:'2018/05/02 00:40:07', lat:32.769, long:130.619, dep:8.1, mag:0.4},
	{date:'2018/05/02 01:07:02', lat:32.767, long:130.617, dep:8.5, mag:0.4},
	{date:'2018/05/02 01:16:13', lat:33.092, long:132.311, dep:34.1, mag:0.9},
	{date:'2018/05/02 01:18:51', lat:32.56, long:130.554, dep:8.1, mag:0.3},
	{date:'2018/05/02 03:17:54', lat:32.691, long:130.721, dep:12.1, mag:0.1},
	{date:'2018/05/02 04:12:37', lat:32.375, long:130.68, dep:11.2, mag:0.4},
	{date:'2018/05/02 04:14:01', lat:31.943, long:130.894, dep:0.2, mag:0.7},
	{date:'2018/05/02 05:03:44', lat:33.507, long:131.882, dep:71.7, mag:2.3},
	{date:'2018/05/02 05:17:04', lat:32.062, long:131.822, dep:29.6, mag:0.7},
	{date:'2018/05/02 05:58:05', lat:32.649, long:130.682, dep:10.7, mag:0.1},
	{date:'2018/05/02 06:21:54', lat:32.556, long:131.66, dep:14.1, mag:0.2},
	{date:'2018/05/02 06:37:42', lat:33.063, long:131.12, dep:10.5, mag:0.6},
	{date:'2018/05/02 06:39:55', lat:32.971, long:131.073, dep:8.9, mag:0.6},
	{date:'2018/05/02 07:09:20', lat:32.687, long:129.997, dep:11.7, mag:0.6},
	{date:'2018/05/02 07:09:34', lat:32.276, long:132.014, dep:20.1, mag:2.2},
	{date:'2018/05/02 07:24:21', lat:32.111, long:130.118, dep:8.5, mag:0.1},
	{date:'2018/05/02 07:45:41', lat:32.224, long:130.705, dep:7.6, mag:0.3},
	{date:'2018/05/02 08:06:14', lat:33.452, long:132.279, dep:44.3, mag:0.2},
	{date:'2018/05/02 09:04:29', lat:33.282, long:131.366, dep:9.9, mag:0.4},
	{date:'2018/05/02 09:18:37', lat:32.798, long:130.552, dep:10.6, mag:1.2},
	{date:'2018/05/02 09:29:34', lat:32.224, long:130.707, dep:7.4, mag:0.7},
	{date:'2018/05/02 10:32:58', lat:32.724, long:130.679, dep:13, mag:1.2},
	{date:'2018/05/02 10:50:05', lat:32.558, long:131.657, dep:14, mag:0.5},
	{date:'2018/05/02 12:04:29', lat:33.728, long:130.194, dep:10.9, mag:0.8},
	{date:'2018/05/02 12:19:08', lat:32.844, long:130.621, dep:11.9, mag:0.4},
	{date:'2018/05/02 12:33:37', lat:32.529, long:130.566, dep:11.8, mag:1.1},
	{date:'2018/05/02 12:36:13', lat:32.107, long:130.098, dep:7.6, mag:0.5},
	{date:'2018/05/02 12:53:28', lat:31.905, long:130.869, dep:7.7, mag:0.4},
	{date:'2018/05/02 14:31:41', lat:33.065, long:130.501, dep:13.5, mag:0.8},
	{date:'2018/05/02 15:55:59', lat:32.783, long:130.647, dep:7.4, mag:0.6},
	{date:'2018/05/02 16:09:50', lat:33.097, long:130.36, dep:11.6, mag:0.7},
	{date:'2018/05/02 16:29:25', lat:32.663, long:130.72, dep:6.8, mag:1.4},
	{date:'2018/05/02 16:41:57', lat:32.483, long:131.663, dep:18.6, mag:0.6},
	{date:'2018/05/02 16:44:03', lat:31.919, long:130.861, dep:5.2, mag:0.4},
	{date:'2018/05/02 16:54:51', lat:31.918, long:130.871, dep:4.4, mag:0.5},
	{date:'2018/05/02 17:48:30', lat:32.719, long:131.106, dep:13.1, mag:0.1},
	{date:'2018/05/02 17:56:04', lat:31.927, long:130.884, dep:1.8, mag:0.3},
	{date:'2018/05/02 17:59:22', lat:32.713, long:130.705, dep:11.8, mag:0.4},
	{date:'2018/05/02 18:21:48', lat:32.338, long:130.513, dep:2.9, mag:0.3},
	{date:'2018/05/02 18:24:17', lat:32.629, long:131.253, dep:10.6, mag:0.6},
	{date:'2018/05/02 18:56:57', lat:32.798, long:130.55, dep:10.3, mag:0.9},
	{date:'2018/05/02 19:23:34', lat:31.825, long:130.298, dep:7.6, mag:0.2},
	{date:'2018/05/02 19:31:39', lat:32.967, long:131.067, dep:9.3, mag:1.2},
	{date:'2018/05/02 19:48:42', lat:32.662, long:130.728, dep:7.9, mag:1.5},
	{date:'2018/05/02 20:00:46', lat:32.917, long:130.859, dep:12.7, mag:0.3},
	{date:'2018/05/02 20:29:00', lat:32.528, long:132.044, dep:33.9, mag:1},
	{date:'2018/05/02 20:30:13', lat:31.908, long:131.707, dep:39.4, mag:0.9},
	{date:'2018/05/02 20:37:07', lat:32.651, long:130.694, dep:12.9, mag:0.6},
	{date:'2018/05/02 21:02:32', lat:32.595, long:130.76, dep:7.1, mag:0.1},
	{date:'2018/05/02 21:08:33', lat:31.934, long:130.891, dep:0.9, mag:0.1},
	{date:'2018/05/02 21:10:00', lat:31.931, long:130.882, dep:1.5, mag:0.2},
	{date:'2018/05/02 21:11:11', lat:31.933, long:130.888, dep:1, mag:0.8},
	{date:'2018/05/02 21:13:59', lat:31.934, long:130.887, dep:0.9, mag:0.1},
	{date:'2018/05/02 21:19:36', lat:31.918, long:130.865, dep:4.9, mag:0.6},
	{date:'2018/05/02 21:20:18', lat:31.933, long:130.877, dep:0, mag:0.8},
	{date:'2018/05/02 21:21:32', lat:31.935, long:130.875, dep:1.2, mag:0.8},
	{date:'2018/05/02 21:23:54', lat:31.933, long:130.885, dep:1.5, mag:0.3},
	{date:'2018/05/02 21:27:11', lat:31.932, long:130.884, dep:2.2, mag:0.8},
	{date:'2018/05/02 21:28:17', lat:31.938, long:130.877, dep:0.5, mag:0.9},
	{date:'2018/05/02 21:29:37', lat:32.761, long:130.78, dep:9.8, mag:1.3},
	{date:'2018/05/02 21:32:16', lat:31.93, long:130.885, dep:1.9, mag:0.4},
	{date:'2018/05/02 21:35:10', lat:31.912, long:130.867, dep:5.5, mag:0.3},
	{date:'2018/05/02 21:36:27', lat:31.932, long:130.886, dep:1, mag:0.3},
	{date:'2018/05/02 21:41:14', lat:31.921, long:130.873, dep:1, mag:0.6},
	{date:'2018/05/02 21:42:35', lat:31.915, long:130.881, dep:4.7, mag:0.4},
	{date:'2018/05/02 21:43:58', lat:31.931, long:130.88, dep:1.5, mag:0.7},
	{date:'2018/05/02 21:45:41', lat:31.927, long:130.876, dep:0, mag:0.5},
	{date:'2018/05/02 21:46:57', lat:31.925, long:130.877, dep:3.9, mag:0.4},
	{date:'2018/05/02 21:48:55', lat:31.939, long:130.881, dep:0, mag:1.1},
	{date:'2018/05/02 21:51:47', lat:31.928, long:130.881, dep:2.5, mag:0.4},
	{date:'2018/05/02 21:52:22', lat:31.93, long:130.881, dep:3.5, mag:0.7},
	{date:'2018/05/02 21:53:12', lat:31.92, long:130.873, dep:3, mag:0.6},
	{date:'2018/05/02 21:59:44', lat:32.977, long:131.115, dep:9.3, mag:0.6},
	{date:'2018/05/02 22:00:24', lat:31.912, long:130.857, dep:5.9, mag:0.4},
	{date:'2018/05/02 22:00:51', lat:31.921, long:130.874, dep:0, mag:0.5},
	{date:'2018/05/02 22:01:26', lat:31.931, long:130.878, dep:1.6, mag:0.5},
	{date:'2018/05/02 22:01:55', lat:31.914, long:130.871, dep:5.3, mag:0.5},
	{date:'2018/05/02 22:02:48', lat:31.932, long:130.876, dep:0, mag:1},
	{date:'2018/05/02 22:04:08', lat:31.913, long:130.864, dep:6, mag:0.2},
	{date:'2018/05/02 22:05:36', lat:31.935, long:130.881, dep:0, mag:0.4},
	{date:'2018/05/02 22:06:57', lat:31.916, long:130.866, dep:5, mag:0.2},
	{date:'2018/05/02 22:07:46', lat:31.915, long:130.871, dep:5.4, mag:0.5},
	{date:'2018/05/02 22:09:17', lat:32.838, long:130.585, dep:5.7, mag:0.6},
	{date:'2018/05/02 22:09:50', lat:31.917, long:130.867, dep:5.2, mag:0.1},
	{date:'2018/05/02 22:11:37', lat:31.932, long:130.874, dep:2.2, mag:1.7},
	{date:'2018/05/02 22:14:55', lat:31.913, long:130.862, dep:5.3, mag:0.1},
	{date:'2018/05/02 22:15:17', lat:31.916, long:130.872, dep:5.1, mag:0.5},
	{date:'2018/05/02 22:16:01', lat:31.937, long:130.882, dep:0.6, mag:0.7},
	{date:'2018/05/02 22:16:47', lat:31.912, long:130.872, dep:5.9, mag:0.2},
	{date:'2018/05/02 22:19:34', lat:31.935, long:130.884, dep:1.4, mag:0.9},
	{date:'2018/05/02 22:27:15', lat:31.931, long:130.875, dep:1.7, mag:0.9},
	{date:'2018/05/02 22:38:27', lat:31.941, long:130.883, dep:0, mag:0.1},
	{date:'2018/05/02 22:40:43', lat:31.938, long:130.884, dep:0.9, mag:0.5},
	{date:'2018/05/02 22:52:19', lat:31.917, long:130.868, dep:5, mag:0.1},
	{date:'2018/05/02 22:54:32', lat:31.932, long:130.882, dep:0, mag:0.1},
	{date:'2018/05/02 22:58:43', lat:31.93, long:130.848, dep:6, mag:0.8},
	{date:'2018/05/02 22:58:56', lat:32.729, long:132.011, dep:12.2, mag:0.8},
	{date:'2018/05/02 23:01:46', lat:32.826, long:130.63, dep:3.3, mag:1},
	{date:'2018/05/02 23:30:39', lat:31.916, long:130.873, dep:5.5, mag:0.1},
	{date:'2018/05/02 23:34:28', lat:32.736, long:130.607, dep:7.9, mag:0.4},
	{date:'2018/05/02 23:35:11', lat:31.933, long:130.889, dep:0, mag:0.5},
	{date:'2018/05/02 23:37:39', lat:31.913, long:130.867, dep:5.5, mag:0.2},
	{date:'2018/05/02 23:47:40', lat:31.91, long:130.856, dep:5.6, mag:0.1},
	{date:'2018/05/02 23:50:34', lat:31.914, long:130.869, dep:5, mag:0.4},
	{date:'2018/05/02 23:53:32', lat:31.934, long:130.881, dep:0, mag:0.8},
	{date:'2018/05/02 23:53:51', lat:31.935, long:130.877, dep:0, mag:0.8},
];


function getColorByMag( mag )
{
    var color = 0x000000;
    if ( mag <= 1 ) {
        //color = 0xaaaaaa;  // 灰色
        color = 0xffff70;  // 灰色
    } else if ( mag > 1 && mag <=3 ) {
        color = 0xffff00;  // 黄色
    } else if ( mag > 3 && mag <= 5 ) {
        color = 0xffa020; // オレンジ
    } else if ( mag > 5 ) {
        color = 0xff0000; // 赤
    }
    return color;
}


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
        //var k = 1.5; // 起伏の強調度
        var k = 0.5; // 起伏の強調度
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
    camera.position.set(0, -100, 100);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // OrbitControls の準備
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp(Math.PI * 0.38);
    controls.autoRotate = ROTATE; //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0; //自動回転する時の速度

    // heightMap より標高データを取得
    var data = getHeightData(img);

/*
    // 標高データを元に地形を生成
    var x1 = 128;
    var y1 = 128;
    var x2 = 256;
    var y2 = 256;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    for (var i = 0; i < geometry.vertices.length; i++) {
        geometry.vertices[i].z = data[i];
    }
*/
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
        transparent: true,        // 半透明合成のパラメータ
        blending: THREE.NormalBlending,  // 半透明合成の方法
        opacity: 0.5,                    // 透明度
        wireframe: WIREFRAME
    });
    var plane = new THREE.Mesh(geometry, material);
    
    // 座標回転
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);
    
    // 震度データプロット
    plot(scene, dataSet);

    // GUI
    gui = new dat.GUI();
    var mapSelector = gui.add(window, 'MAP', {
        "通常地図": "../../assets/m/S/S/q/mSSq8.jpg",
        "空撮写真": "../../assets/s/h/v/7/shv7d.jpg",
        "中央構造線": "../../assets/i/k/l/R/iklRn.jpg",
        "地質図&活断層":"../../assets/g/n/k/p/gnkpK.png",
        "布田川・日奈久断層帯":"../../assets/c/Q/t/p/cQtpC.jpg",
        "九州の地表の動き":"../../assets/y/b/n/K/ybnKv.jpg"
    });
    var mapWireframe = gui.add(window, 'WIREFRAME').name('Wireframe');
    var mapRotate = gui.add(window, 'ROTATE').name('Rotate');

    mapSelector.onChange(function (value) {
        plane.material.map = THREE.ImageUtils.loadTexture(value);
    });
    
    mapWireframe.onChange(function (value) {
        plane.material.wireframe = value;
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

img.src = "../../assets/s/L/U/G/sLUGm.png"; // heightMap.png

function plot(scene, dataSet) {
    for ( var i = 0; i < dataSet.length; i++ ) {
        var data = dataSet[i];
        // 表示範囲
        // 経度：129.5600～132.3480
        // 緯度：31.7100～34.0500
        var x = ((data.long - 130.9540)/2.788)*128;
        var z = (-(data.lat - 32.8800)/2.34)*128;
        var y = -(data.dep/1.5);
        var w = (data.mag)/3;
        var color = getColorByMag(data.mag);
        var geometry = new THREE.BoxGeometry(w, w, w);
        var material = new THREE.MeshPhongMaterial( {
            color: color,
            transparent: true,        // 半透明合成のパラメータ
            blending: THREE.NormalBlending,  // 半透明合成の方法
            opacity: 0.5,                    // 透明度
        } );
        var cube = new THREE.Mesh( geometry, material );
        cube.position.set(x, y, z);
        scene.add( cube );
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    var dt = clock.getDelta();

    renderer.render(scene, camera);
}
