// forked from cx20's "Three.js + Oimo.js でドミノっぽくドット絵を作るテスト" http://jsdo.it/cx20/8ReN
// forked from cx20's "Three.js + Oimo.js でドット絵を落下させるテスト" http://jsdo.it/cx20/voHQ
// forked from Lo-Th's "oimo basic" http://jsdo.it/Lo-Th/frXo
// three var

var DOT_SIZE = 16;
var X_START_POS = 0;
var Y_START_POS = 0;
// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [];
var pixelTweet = "";

// Three.js 用変数
var camera, scene, light, renderer, container, center;
var controls;
var meshs = [];
var geoBox;

// Oimo.js 用変数
var world;
var bodys = [];

init();

document.body.addEventListener('paste', function (e) {
    // 貼り付け直後の場合、テキストボックスが空のケースがある為、少し時間をおいて読み込ませる
    setTimeout( delayload, 100 );
}, false);


function toggleButton() {
    var button = document.getElementById("toggle");
    var pixelData = document.getElementById("pixelData");

    if (button.textContent == "show") {

        pixelData.style.display = "block";
        button.textContent = "hide";

    } else if (button.textContent == "hide") {

        pixelData.style.display = "none";
        button.textContent = "show";

    }
}

function clearData() {
	document.getElementById("pixelData").value = "";
}

function showSample() {
    // サンプルデータ設定
	document.getElementById("pixelData").value = "000000000000000000000000000000003330000000011111003330000000111111111330000000222332302220000002323332332220000002322333233320000002233322222200000000033333332000000222221222120000002222222122210020033222222111110020033301121131131220003021111111111220000222111111111220002221111111100000002001111000000000000000000000000000";
	delayload();
}

function delayload() {
    // データ形式変換
    pixelTweet = document.getElementById("pixelData").value;
    dataSet = convertPixelTweetToDataSet( pixelTweet );
    
    // リセット
    clearMesh();
    world.clear();

    // 床を作成する
    createGround();
    
    // ドミノ碑を作成する
    createDomino();

    // ドミノ碑を倒す為の立方体を配置する
    createCube();

    // アニメーションする
    animate();
}

function getRgbColor( c )
{
	var colorHash = {
		"無":0xffffff,
		"黒":0x010101,
		"灰":0x444444,
		"白":0x777777
	};
	return colorHash[ c ];
}

// データ形式変換関数
function convertPixelTweetToDataSet( pixelTweet ) {
	var result = [];
	var hash = {
		"0":"無",
		"1":"黒",
		"2":"灰",
		"3":"白"
	};
	// ＜変換前＞
	// 000000000000000000
	// 000000000000003330
	// 000000011111003330
	// 000000111111111330
	// 000000222332302220
	// 000002323332332220
	// 000002322333233320
	// 000002233322222200
	// 000000033333332000
	// 000222221222120000
	// 002222222122210020
	// 033222222111110020
	// 033301121131131220
	// 003021111111111220
	// 000222111111111220
	// 002221111111100000
	// 002001111000000000
	// 000000000000000000
	// 
	// ＜変換後＞
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","白","白","白","無",
	// "無","無","無","無","無","無","無","黒","黒","黒","黒","黒","無","無","白","白","白","無",
	// "無","無","無","無","無","無","黒","黒","黒","黒","黒","黒","黒","黒","黒","白","白","無",
	// "無","無","無","無","無","無","灰","灰","灰","白","白","灰","白","無","灰","灰","灰","無",
	// "無","無","無","無","無","灰","白","灰","白","白","白","灰","白","白","灰","灰","灰","無",
	// "無","無","無","無","無","灰","白","灰","灰","白","白","白","灰","白","白","白","灰","無",
	// "無","無","無","無","無","灰","灰","白","白","白","灰","灰","灰","灰","灰","灰","無","無",
	// "無","無","無","無","無","無","無","白","白","白","白","白","白","白","灰","無","無","無",
	// "無","無","無","灰","灰","灰","灰","灰","黒","灰","灰","灰","黒","灰","無","無","無","無",
	// "無","無","灰","灰","灰","灰","灰","灰","灰","黒","灰","灰","灰","黒","無","無","灰","無",
	// "無","白","白","灰","灰","灰","灰","灰","灰","黒","黒","黒","黒","黒","無","無","灰","無",
	// "無","白","白","白","無","黒","黒","灰","黒","黒","白","黒","黒","白","黒","灰","灰","無",
	// "無","無","白","無","灰","黒","黒","黒","黒","黒","黒","黒","黒","黒","黒","灰","灰","無",
	// "無","無","無","灰","灰","灰","黒","黒","黒","黒","黒","黒","黒","黒","黒","灰","灰","無",
	// "無","無","灰","灰","灰","黒","黒","黒","黒","黒","黒","黒","黒","無","無","無","無","無",
	// "無","無","灰","無","無","黒","黒","黒","黒","無","無","無","無","無","無","無","無","無",
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
	//
	for ( var i = 0; i < pixelTweet.length; i++ ) {
		var x = i % 18;
		var y = Math.floor( i / 18 );
		if ( x > 0 && x < 17 && y > 0 && y < 17 ) {
			var c = pixelTweet[i];
			result.push(hash[c]);
		}
	}
	return result;
}

function init() {
    // カメラを作成する
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 150, 300);
    center = new THREE.Vector3();
    camera.lookAt(center);

    // シーンを作成する
    scene = new THREE.Scene();

    // 物理演算の準備
    world = new OIMO.World();

    // ライトを作成する
    light = new THREE.DirectionalLight(0xffffff, 1.3);
    light.position.set(0.3, 1, 0.5);
    scene.add(light);

    // レンダラーを作成する
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x0000000);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // レンダラーのサイズを指定する
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.4;
    controls.autoRotate = false;     //true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = 5.0;    //自動回転する時の速度

    // HTML との紐づけを行う
    container = document.getElementById("container");
    container.appendChild(renderer.domElement);
}

function createGround() {
    // 床の物理演算の設定
    var ground = new OIMO.Body({
        size: [400, 40, 400],
        pos: [0, -50, 0],
        world: world
    });
    
    // 床表示用の設定
    var material = new THREE.MeshLambertMaterial({
        color: 0x202020
    });
    var geometry = new THREE.BoxGeometry(400, 40, 400);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -50;
    scene.add(mesh);
}

function createDomino() {
    // ドミノ碑のサイズ
    var w = DOT_SIZE * 0.2;
    var h = DOT_SIZE * 1.5;
    var d = DOT_SIZE;

    // ドミノ碑のベースとなる箱を作成する
    geoBox = new THREE.BoxGeometry(1, 1, 1);

    var color;
    var i;
    // ドミノ碑を16x16個、整列させる
    for (var x = 0; x < 16; x++) {
        for (var z = 0; z < 16; z++) {
            i = x + (z) * 16;
            y = 0;
            // 物理演算用のオブジェクトを設定
            bodys[i] = new OIMO.Body({
                type: 'box',
                size: [w, h, d],
                pos: [-120 + x * DOT_SIZE, y * DOT_SIZE, -120 + z * DOT_SIZE * 1.2],
                move: true,
                world: world
            });
            // ドミノ碑の色を設定（ドット絵になるよう色を変更）
            color = getRgbColor(dataSet[i]);
            var material = new THREE.MeshLambertMaterial({
                color: color
            });
            // 表示用のオブジェクトを設定
            meshs[i] = new THREE.Mesh(geoBox, material);
            meshs[i].scale.set(w, h, d);
            scene.add(meshs[i]);
        }
    }
}

function createCube() {
    // 立方体のサイズ
    var w = DOT_SIZE;
    var h = DOT_SIZE;
    var d = DOT_SIZE;
    // ドミノ碑を倒す為に、赤色の立方体×16個、配置する。
    var size = bodys.length;
    for (var i = 0; i < 16; i++) {
        var x = 0;
        var y = 2;
        var z = i;
        // 物理演算用のオブジェクトを設定
        bodys[size + i] = new OIMO.Body({
            type: 'box',
            size: [w, h, d],
            pos: [-125 + x * DOT_SIZE, y * DOT_SIZE, -120 + z * DOT_SIZE * 1.2],
            move: true,
            world: world
        });
        // 立方体の色を設定（白色）
        var material = new THREE.MeshLambertMaterial({
            color: "#fff"
        });
        // 表示用のオブジェクトを設定
        meshs[size + i] = new THREE.Mesh(geoBox, material);
        meshs[size + i].scale.set(w, h, d);
        scene.add(meshs[size + i]);
    }
}

// オブジェクトをクリアする
function clearMesh() {
    var i = meshs.length;
    while (i--) {
        scene.remove(meshs[i]);
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    // 物理演算の世界の時間を進める
    world.step();

    var p, r, m, x, y, z;
    var mtx = new THREE.Matrix4();
    var i = bodys.length;
    var mesh;

    // ドミノ碑の物理演算を行い位置の算出を行う
    while (i--) {
        var body = bodys[i].body;
        mesh = meshs[i];
        m = body.getMatrix();
        mtx.fromArray(m);
        mesh.position.setFromMatrixPosition(mtx);
        mesh.rotation.setFromRotationMatrix(mtx);
    }

    // 表示を更新する
    renderer.render(scene, camera);
}
