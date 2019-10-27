// forked from cx20's "[WebGL] lightgl.js で３次元関数をプロットしてみるテスト（改）" http://jsdo.it/cx20/vHqB
// forked from cx20's "[WebGL] lightgl.js で３次元関数をプロットしてみるテスト" http://jsdo.it/cx20/zMca
// forked from cx20's "[WebGL] lightgl.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/5RXU
// forked from cx20's "[WebGL] lightgl.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/4kX2
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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

var angle = 0;
var gl = GL.create();

gl.onupdate = function(seconds) {
    angle += 45 * seconds;
};

initialCondition(peakPosition);

gl.ondraw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -3);
    gl.rotate(-60, 1, 0, 0);
    gl.rotate(angle, 0, 0, 1);

    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
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

    var a = 0;
    for (i = 0; i <= N; i++) {
        for (j = 0; j <= N; j++) {
            var x = (-N / 2 + i) * l * 0.02;
            var y = (-N / 2 + j) * l * 0.02;
            var z = f[1][i][j] * 0.02;
            //頂点座標データの追加
            gl.color(x+0.5, y+0.5, z+0.5, 1.0);
            gl.vertex(x, y, z);
            a++;
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
