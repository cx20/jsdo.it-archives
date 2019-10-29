// forked from cx20's "[GLSL] Three.jsで波動シミュレーションを試してみるテスト（その３）" http://jsdo.it/cx20/5QXo
// forked from cx20's "Three.jsで波動シミュレーションを試してみるテスト（その２）" http://jsdo.it/cx20/os42
// forked from cx20's "Three.jsで波動シミュレーションを試してみるテスト" http://jsdo.it/cx20/r7EJ
// forked from Rihei Endo's "WaveEquation Neumann" http://www.natural-science.or.jp/WebGL/WaveEquation_Neumann.html

var DOT_SIZE = 16;
var X_START_POS = 4;
var Y_START_POS = 4;
var Z_START_POS = 0;

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

var _animationID = 0;
var dataSet = [];
var pixelTweet = "";

function getRgbColor( c )
{
	var colorHash = {
		"無":"#ffffff",
		"黒":"#222222",
		"灰":"#666666",
		"白":"#bbbbbb"
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

////////////////////////////////////////////////////////////////////
// 物理系の定義
////////////////////////////////////////////////////////////////////

//２次元正方格子のサイズ
//var N = 100;
//var l = 1.0;
var N = 24;
var l = 5.0;

var dt = 0.1; //時間間隔
var dd = 1.0; //空間間隔
var v = 4; //速度

//境界条件の設定
//var BC = "Neumann"; //or "Dirichlet"
var BC = "Dirichlet"; // "Neumann"; //or 

var peakPosition = {
    x: 0,
    y: 0,
    z: 75,
    sigma2: 50
};
var peakPosition_bound = {
    x_min: -50,
    x_max: 50,
    y_min: -50,
    y_max: 50,
    z_min: -50,
    z_max: 100,
    sigma2_min: 10,
    sigma2_max: 100
};

//一時停止フラグ
var restartFlag = false; //再計算フラグ
var stopFlag = false; //一時停止フラグ

var Tn = 3;
var f = new Array(Tn);

function initialCondition(parameter) {
    var x0 = parameter.x;
    var y0 = parameter.y;
    var z0 = parameter.z;
    var sigma2 = parameter.sigma2;
    for (var t = 0; t < Tn; t++) {
        f[t] = new Array(N);
        for (i = 0; i <= N; i++) {
            f[t][i] = new Array(N);
            for (j = 0; j <= N; j++) {
                var x = (-N / 2 + i) * l;
                var y = (-N / 2 + j) * l;
                //初期条件を与える
                var z = z0 * Math.exp(-(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) / (2 * sigma2));
                f[0][i][j] = z;
            }
        }
    }
    for (var i = 1; i <= N - 1; i++) {
        for (var j = 1; j <= N - 1; j++) {
            f[1][i][j] = f[0][i][j] + v * v / 2.0 * dt * dt / (dd * dd) * (f[0][i + 1][j] + f[0][i - 1][j] + f[0][i][j + 1] + f[0][i][j - 1] - 4.0 * f[0][i][j]);
        }
    }
    if (BC == "Dirichlet") {
        //ディリクレ境界条件
        for (var i = 0; i <= N; i++) {
            f[1][i][0] = f[1][i][N] = f[1][0][i] = f[1][N][i] = 0.0; //境界条件
        }
    } else if (BC == "Neumann") {
        //ノイマン境界条件
        for (var i = 1; i <= N - 1; i++) {
            f[1][i][0] = f[1][i][1];
            f[1][i][N] = f[1][i][N - 1];
            f[1][0][i] = f[1][1][i];
            f[1][N][i] = f[1][N - 1][i];
        }
        //角の処理
        f[1][0][0] = (f[1][0][1] + f[1][1][0]) / 2;
        f[1][0][N] = (f[1][0][N - 1] + f[1][1][N]) / 2;
        f[1][N][0] = (f[1][N - 1][0] + f[1][N][1]) / 2;
        f[1][N][N] = (f[1][N - 1][N] + f[1][N][N - 1]) / 2;
    }
}

////////////////////////////////////////////////////////////////////
// windowイベントの定義
////////////////////////////////////////////////////////////////////
window.addEventListener("load", function() {
    threeStart(); //Three.jsのスタート関数の実行
});


////////////////////////////////////////////////////////////////////
// Three.jsスタート関数の定義
////////////////////////////////////////////////////////////////////
function threeStart() {
    initThree(); //Three.js初期化関数の実行
    initCamera(); //カメラ初期化関数の実行
    initLight(); //光源初期化関数の実行
    //initObject(); //オブジェクト初期化関数の実行
    //loop(); //無限ループ関数の実行
}

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
    
    stop(); //ループ関数の停止
    
    initObject(); //オブジェクト初期化関数の実行
    loop(); //無限ループ関数の実行
}

////////////////////////////////////////////////////////////////////
// Three.js初期化関数の定義
////////////////////////////////////////////////////////////////////

//グローバル変数の宣言
var renderer, //レンダラーオブジェクト
    scene, //シーンオブジェクト
    canvasFrame; //キャンバスフレームのDOM要素

function initThree() {
    //キャンバスフレームDOM要素の取得
    canvasFrame = document.getElementById('canvas-frame');
    //レンダラーオブジェクトの生成
    renderer = new THREE.WebGLRenderer();
    //レンダラーのサイズの設定
    //renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //キャンバスフレームDOM要素にcanvas要素を追加
    canvasFrame.appendChild(renderer.domElement);

    //レンダラークリアーカラーの設定
    renderer.setClearColor(0x000000, 1.0);
    //renderer.setClearColor(0x777777, 1.0);

    //シーンオブジェクトの生成
    scene = new THREE.Scene();
}

////////////////////////////////////////////////////////////////////
// カメラ初期化関数の定義
////////////////////////////////////////////////////////////////////

//グローバル変数の宣言
var camera; //カメラオブジェクト
var theta = 0;

function initCamera() {
    //カメラオブジェクトの生成
    camera = new THREE.PerspectiveCamera(45, canvasFrame.clientWidth / canvasFrame.clientHeight, 1, 10000);
    //カメラの位置の設定
    camera.position.set(160, 0, 100);
    //カメラの上ベクトルの設定
    camera.up.set(0, 0, 1);
    //カメラの中心位置ベクトルの設定
    camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    }); //トラックボール利用時は自動的に無効

}

////////////////////////////////////////////////////////////////////
// 光源初期化関数の定義
////////////////////////////////////////////////////////////////////

//グローバル変数の宣言
var directionalLight, //平行光源オブジェクト
    ambientLight; //環境光オブジェクト

function initLight() {
    //平行光源オブジェクトの生成
    directionalLight = new THREE.DirectionalLight(0xDDDDDD, 1.0, 0);
    //平行光源オブジェクトの位置の設定
    directionalLight.position.set(30, 30, 100);

    //環境光オブジェクトの生成
    ambientLight = new THREE.AmbientLight(0x222222);
    //環境光オブジェクトのシーンへの追加
    scene.add(ambientLight);

    //平行光源オブジェクトのシーンへの追加
    scene.add(directionalLight);
}

////////////////////////////////////////////////////////////////////
// オブジェクト初期化関数の定義
////////////////////////////////////////////////////////////////////

//グローバル変数の宣言
var axis, //軸オブジェクト
    lattice, //２次元格子オブジェクト
    cubes = []; //立方体オブジェクト

function initObject() {
    //初期条件
    initialCondition(peakPosition);

    //形状オブジェクトの宣言と生成
    var geometry = new THREE.Geometry();
    //一片の長さ
    var colors = [];
    for (i = 0; i <= N; i++) {
        for (j = 0; j <= N; j++) {
            var x = (-N / 2 + i) * l;
            var y = (-N / 2 + j) * l;
            //初期条件を与える
            var z = f[0][i][j];

            //頂点座標データの追加
            geometry.vertices.push(new THREE.Vector3(x, y, z));

            var ii = i - X_START_POS;
            var jj = j - Y_START_POS;
            var color = new THREE.Color();
            if ( ( ii >= 0 && ii < 16 ) 
              && ( jj >= 0 && jj < 16 ) ){
                var pos = jj * 16 + (15-ii);
                if ( dataSet[pos] != "無" ) {
                    color.setStyle( getRgbColor( dataSet[pos] ) );
                }
            }
            colors.push( color );
        }
    }

    geometry.colors = colors;
    //面の法線ベクトルを計算
    geometry.computeFaceNormals();
    //面の法線ベクトルから頂点法線ベクトルの計算
    geometry.computeVertexNormals();

    // material
    attributes = {
        size: {    type: 'f', value: [] },
        customColor: { type: 'c', value: [] }
    };

    uniforms = {
        amplitude: { type: "f", value: 1.0 },
        color:     { type: "c", value: new THREE.Color( 0xffffff ) },
    };

    // material
    var material = new THREE.ShaderMaterial( {

        uniforms:       uniforms,
        attributes:     attributes,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true

    });

    //立方体オブジェクトの生成
    lattice = new THREE.PointCloud( geometry, material );

    var vertices = lattice.geometry.vertices;
    var values_size = attributes.size.value;
    var values_color = attributes.customColor.value;

    for (var v = 0; v < vertices.length; v++) {

        //values_size[v] = DOT_SIZE * 1.5;
        values_size[v] = DOT_SIZE * 1.2;
        values_color[v] = colors[v];
    }

}

////////////////////////////////////////////////////////////////////
// 無限ループ関数の定義
////////////////////////////////////////////////////////////////////

//グローバル変数の宣言
var step = 0; //ステップ数
function loop() {
    camera.lookAt(scene.position);
    camera.position.x = 200 * Math.sin(theta * Math.PI / 180);
    camera.position.y = 100;
    camera.position.z = 200 * Math.cos(theta * Math.PI / 180);
    theta += 0.5;

    //時刻の取得
    var time = step * dt;
    //時間発展
    if (stopFlag == false) {
        //ステップ数のインクリメント
        step++;
        time = step * dt;
        for (var i = 1; i <= N - 1; i++) {
            for (var j = 1; j <= N - 1; j++) {
                f[2][i][j] = 2.0 * f[1][i][j] - f[0][i][j] + v * v * dt * dt / (dd * dd) * (f[1][i + 1][j] + f[1][i - 1][j] + f[1][i][j + 1] + f[1][i][j - 1] - 4.0 * f[1][i][j]);
            }
        }
        if (BC == "Dirichlet") {
            //ディリクレ境界条件
            for (var i = 0; i <= N; i++) {
                f[2][i][0] = f[2][i][N] = f[2][0][i] = f[2][N][i] = 0.0; //境界条件
            }
        } else if (BC == "Neumann") {
            //ノイマン境界条件
            for (var i = 1; i <= N - 1; i++) {
                f[2][i][0] = f[2][i][1];
                f[2][i][N] = f[2][i][N - 1];
                f[2][0][i] = f[2][1][i];
                f[2][N][i] = f[2][N - 1][i];
            }
            //角の処理
            f[2][0][0] = (f[2][0][1] + f[2][1][0]) / 2;
            f[2][0][N] = (f[2][0][N - 1] + f[2][1][N]) / 2;
            f[2][N][0] = (f[2][N - 1][0] + f[2][N][1]) / 2;
            f[2][N][N] = (f[2][N - 1][N] + f[2][N][N - 1]) / 2;

        }
        //次の計算のために配列の数値を入れかえる。ここで過去の情報は失われる。
        for (var i = 0; i <= N; i++) {
            for (var j = 0; j <= N; j++) {
                f[0][i][j] = f[1][i][j];
                f[1][i][j] = f[2][i][j];
            }
        }
    }

    var a = 0;
    for (i = 0; i <= N; i++) {
        for (j = 0; j <= N; j++) {
            var x = (-N / 2 + i) * l;
            var y = (-N / 2 + j) * l;
            var z = f[1][i][j];
            //頂点座標データの追加
            lattice.geometry.vertices[a].z = z;
            a++;
        }
    }

    lattice.geometry.normalsNeedUpdate = true;
    lattice.geometry.verticesNeedUpdate = true;
    //面の法線ベクトルを計算
    lattice.geometry.computeFaceNormals();
    //面の法線ベクトルから頂点法線ベクトルの計算
    lattice.geometry.computeVertexNormals();

    //立方体オブジェクトのシーンへの追加
    scene.add(lattice);

    //クリアーカラーで初期化
    renderer.clear();
    //レンダリング
    renderer.render(scene, camera);

    scene.remove(lattice);

    //「loop()」関数の呼び出し
    _animationID = requestAnimationFrame(loop);
}

function stop() {
    cancelAnimationFrame(_animationID);
}
