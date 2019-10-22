// forked from cx20's "御嶽山の3Dデータを表示してみた" http://jsdo.it/cx20/6GrB
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv
var scene;
var camera;
var controls;
var theta = 0;

function animate() {
    requestAnimationFrame( animate );
    update();
    render();
}

function update()
{
/*
    camera.lookAt(scene.position);
    camera.position.x = 100 * Math.sin(theta * Math.PI / 180);
    camera.position.y = 100 * Math.cos(60    * Math.PI / 180);
    camera.position.z = 100 * Math.cos(theta * Math.PI / 180);
*/
    theta += 0.1;

	controls.update();
}

function render() {
    renderer.render(scene, camera);
}

width = window.innerWidth;
height = window.innerHeight;

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function (evt) {
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, -100, 100);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.rotateUp(Math.PI * 0.38); 
    controls.autoRotate = true;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -2.0;    //自動回転する時の速度
/*
    // 座標軸表示
    var axis = new THREE.AxisHelper(100);
    scene.add(axis);
*/

    var x1 = 128;
    var y1 = 128;
    var x2 = 192; // 256;
    var y2 = 192; // 256;
    var geometry = new THREE.PlaneGeometry(x1, y1, x2 - 1, y2 - 1);
    var s = (evt.target.response || evt.target.responseText).split("\n");
    var c = 0;
    for (var i = 0; i < y2; i++) {
        var r = s[i].split(",");
        for (var j in r) {
            var h = r[j] == 'e' ? 0 : Number(r[j]);
            geometry.vertices[c].z = h * 1.5; //高さの強調度を変える場合は、ここの数値を変更する
            c++;
        }
    }
    var material = new THREE.MeshPhongMaterial({
        //map: THREE.ImageUtils.loadTexture('texture.png')
        //map: THREE.ImageUtils.loadTexture('/assets/4/G/0/T/4G0Tz.png')
        //map: THREE.ImageUtils.loadTexture('/assets/6/w/s/U/6wsUt.png') // 御嶽山（地図）
        map: THREE.ImageUtils.loadTexture('../../assets/y/D/v/x/yDvxy.png') // 御嶽山（空撮）
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / -2; // 90度回転（地面を上向きに設定）
    scene.add(plane);

    material = new THREE.MeshBasicMaterial({
        color: 0x444444
    });

    document.getElementById('webgl').appendChild(renderer.domElement);
    animate();
}, false);
//xhr.open('GET',  'dem.csv', true);
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