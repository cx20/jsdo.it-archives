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

var dataSet = [
	{ axis:{ x:0, y: 1, z:0 }, angle:Math.PI / 180, morphingType:'sin', position:{ x:0, y:25.0, z:0 }, radiusTop:0,    radiusBottom:12.5, height:12.5, radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y:-1, z:0 }, angle:Math.PI / 180, morphingType:'sin', position:{ x:0, y:12.5, z:0 }, radiusTop:12.5, radiusBottom:0,    height:12.5, radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y: 1, z:0 }, angle:Math.PI / 180, morphingType:'cos', position:{ x:0, y:20.0, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y: 1, z:0 }, angle:Math.PI / 120, morphingType:'cos', position:{ x:0, y:21.0, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y: 1, z:0 }, angle:Math.PI /  90, morphingType:'cos', position:{ x:0, y:22.0, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y:-1, z:0 }, angle:Math.PI /  90, morphingType:'cos', position:{ x:0, y:13.5, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y:-1, z:0 }, angle:Math.PI / 120, morphingType:'cos', position:{ x:0, y:12.5, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
	{ axis:{ x:0, y:-1, z:0 }, angle:Math.PI / 180, morphingType:'cos', position:{ x:0, y:11.5, z:0 }, radiusTop:10.0, radiusBottom:10.0, height:3.0,  radiusSegments:4, heightSegments:1, openEnded:false },
];

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(scene.position);
    camera.position.x = 100 * Math.sin(theta * Math.PI / 180);
    camera.position.y = 100 * Math.cos(60 * Math.PI / 180);
    camera.position.z = 100 * Math.cos(theta * Math.PI / 180);

    // quaternion
    for (var i = 0; i < dataSet.length; i++) {
        var v = dataSet[i].axis;
        var axis = new THREE.Vector3(v.x, v.y, v.z).normalize();
        angles[i] += dataSet[i].angle;
        var q = new THREE.Quaternion();
        q.setFromAxisAngle(axis, angles[i]);
        cylinders[i].quaternion.copy(q);
        if (dataSet[i].morphingType == 'sin') {
            cylinders[i].scale.x = Math.abs(Math.sin(angles[i]));
            cylinders[i].scale.y = Math.abs(Math.sin(angles[i]));
            cylinders[i].scale.z = Math.abs(Math.sin(angles[i]));
        } else if (dataSet[i].morphingType == 'cos') {
            cylinders[i].scale.x = Math.abs(Math.cos(angles[i]));
            cylinders[i].scale.y = Math.abs(Math.cos(angles[i]));
            cylinders[i].scale.z = Math.abs(Math.cos(angles[i]));
        }
    }

    theta += 0.1;
    renderer.render(scene, camera);
}

width = window.innerWidth;
height = window.innerHeight;

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(evt) {
    scene = new THREE.Scene();
    //scene.add(new THREE.AmbientLight(0xffffff));
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMapEnabled = true;
    renderer.setSize(width, height);

/*
    // 座標軸表示
    var axis = new THREE.AxisHelper(100);
    scene.add(axis);
*/

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
            //geometry.vertices[c].z = h * 1; // 高さの強調度を変える場合は、ここの数値を変更する
            geometry.vertices[c].z = h * 1.0;
            c++;
        }
    }
    var material = new THREE.MeshPhongMaterial({
        //map: THREE.ImageUtils.loadTexture('texture.png'),
        //map: THREE.ImageUtils.loadTexture('/assets/l/P/i/Y/lPiYn.png'), // 地図
        //map: THREE.ImageUtils.loadTexture('/assets/m/4/n/F/m4nFo.png'), // 写真１
        //map: THREE.ImageUtils.loadTexture('/assets/n/L/v/L/nLvLt.png'), // 写真２
        map: THREE.ImageUtils.loadTexture('../../assets/9/r/4/P/9r4PX.png'), // 芦ノ湖
        wireframe: false
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    plane.receiveShadow = true;
    scene.add(plane);
//----------------------------------------
    var geometry2 = new THREE.PlaneGeometry(128, 128, 20, 20);
    var material2 = new THREE.MeshPhongMaterial({
        //map: THREE.ImageUtils.loadTexture('water.png'),
        map: THREE.ImageUtils.loadTexture('../../assets/5/7/0/n/570no.png'),
        wireframe: false
    });
    var plane2 = new THREE.Mesh(geometry2, material2);
    plane2.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    plane2.position.y = 1.6;
    plane2.receiveShadow = true;
    scene.add(plane2);
//----------------------------------------    
    // 構造物を追加してみる
    makeRamiel();

    document.getElementById('webgl').appendChild(renderer.domElement);
    animate();
}, false);

function makeRamiel() {
    group = new THREE.Object3D();
    scene.add(group);

    // cylinder … 円筒形
    // API: THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
    //   radiusTop        … 上面の半径
    //   radiusBottom     … 下面の半径
    //   height           … 高さ
    //   radiusSegments   … 円周の分割数
    //   heightSegments   … 縦分割数
    //   openEnded        … false なら蓋をしない
    // 
    for (var i = 0; i < dataSet.length; i++) {
        var data = dataSet[i];
        var geometry = new THREE.CylinderGeometry(data.radiusTop, data.radiusBottom, data.height, data.radiusSegments, data.heightSegments, data.openEnded);
        var cylinder = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            color: 0x258fff
        }));
        cylinder.position.y = data.position.y;
        cylinder.castShadow = true;
        group.add(cylinder);
        cylinders.push(cylinder);
        angles.push(0);
    }

    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(-10, 50, 50).normalize();
    scene.add(light);
/*    
    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-100, 0, 50).normalize();
    scene.add(light2);
*/
    var light3 = new THREE.SpotLight(0xffffff);
    light3.position.set(0, 500, 500);
    light3.target.position.set(0, 0, 0);
    light3.shadowMapWidth = 1000;
    light3.shadowMapHeight = 1000;
    //light3.shadowCameraVisible = true;
    light3.castShadow = true;
    scene.add(light3);
}

//xhr.open('GET',  'dem.csv', true);
//xhr.open('GET', '/assets/2/g/t/o/2gtor', true);
xhr.open('GET', '../../assets/4/9/G/4/49G4v.csv', true); // 芦ノ湖
xhr.send(null);

window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height); // レンダラ―画面の再設定
    camera.aspect = width / height; // カメラのアスペクト比の再調整
    camera.updateProjectionMatrix();
    animate(); // 再描画
};