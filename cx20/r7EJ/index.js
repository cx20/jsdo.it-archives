// forked from Rihei Endo's "WaveEquation Neumann" http://www.natural-science.or.jp/WebGL/WaveEquation_Neumann.html

////////////////////////////////////////////////////////////////////
// 物理系の定義
////////////////////////////////////////////////////////////////////

//２次元正方格子のサイズ
//var N = 100;
//var l = 1.0;
var N = 50;
var l = 2.0;

var dt = 0.1; //時間間隔
var dd = 1.0; //空間間隔
var v = 4; //速度

//境界条件の設定
var BC = "Neumann"; //or "Dirichlet"

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
//	resizeTo(516, 538);
    initialCondition(peakPosition);
    threeStart(); //Three.jsのスタート関数の実行
});


////////////////////////////////////////////////////////////////////
// Three.jsスタート関数の定義
////////////////////////////////////////////////////////////////////
function threeStart() {
    initThree(); //Three.js初期化関数の実行
    initCamera(); //カメラ初期化関数の実行
    initLight(); //光源初期化関数の実行
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
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    if (!renderer) alert('Three.js の初期化に失敗しました');
    //レンダラーのサイズの設定
    renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);
    //キャンバスフレームDOM要素にcanvas要素を追加
    canvasFrame.appendChild(renderer.domElement);

    //レンダラークリアーカラーの設定
    renderer.setClearColor(0x000000);

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
/*
    //軸オブジェクトの生成
    axis = new THREE.AxisHelper(100);
    //軸オブジェクトのシーンへの追加
    scene.add(axis);
    //軸オブジェクトの位置座標を設定
    axis.position.set(0, 0, 0);
*/
    //初期条件
    initialCondition(peakPosition);

    //形状オブジェクトの宣言と生成
    var geometry = new THREE.Geometry();
    //一片の長さ
    for (i = 0; i <= N; i++) {
        for (j = 0; j <= N; j++) {
            var x = (-N / 2 + i) * l;
            var y = (-N / 2 + j) * l;
            //初期条件を与える
            var z = f[0][i][j];
            //頂点座標データの追加
            geometry.vertices.push(new THREE.Vector3(x, y, z));
        }
    }
    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            var ii = (N + 1) * i + j;
            //面指定用頂点インデックスを追加
            geometry.faces.push(new THREE.Face4(ii, ii + (N + 1), ii + (N + 1) + 1, ii + 1));
        }
    }
    //面の法線ベクトルを計算
    geometry.computeFaceNormals();
    //面の法線ベクトルから頂点法線ベクトルの計算
    geometry.computeVertexNormals();

    //材質オブジェクトの宣言と生成
    var material = new THREE.MeshPhongMaterial({
        wireframe: true,
        color: 0xafeeee,
        ambient: 0xafeeee,
        side: THREE.DoubleSide,
        specular: 0xffffff,
        shininess: 250
    });
    //立方体オブジェクトの生成
    lattice = new THREE.Mesh(geometry, material);

    //形状オブジェクトの宣言と生成
    var geometry = new THREE.BoxGeometry(1, 101, 30);
    //材質オブジェクトの宣言と生成F
    var material = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        ambient: 0xFFFFFF,
        specular: 0xffffff,
        shininess: 100,
        transparent: true,
        opacity: 0.2
    });

    for (var i = 0; i < 4; i++) {
        //立方体オブジェクトの生成
        cubes[i] = new THREE.Mesh(geometry, material);
        //立方体オブジェクトのシーンへの追加
        scene.add(cubes[i]);
    }
    //立方体オブジェクトの位置座標を設定
    cubes[0].position.set(50, 0, 15);
    cubes[1].position.set(-50, 0, 15);
    cubes[2].position.set(0, 50, 15);
    cubes[2].rotation.set(0, 0, Math.PI / 2);
    cubes[3].position.set(0, -50, 15);
    cubes[3].rotation.set(0, 0, Math.PI / 2);
}

////////////////////////////////////////////////////////////////////
// 無限ループ関数の定義
////////////////////////////////////////////////////////////////////

//グローバル変数の宣言
var step = 0; //ステップ数
function loop() {
/*
    //トラックボールによるカメラオブジェクトのプロパティの更新
    trackball.update();
*/
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
    requestAnimationFrame(loop);
}