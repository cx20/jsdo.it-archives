// forked from cx20's "[WebGL] Grimoire.js + ポリゴンで３次元関数を表示してみるテスト（改）" http://jsdo.it/cx20/cB5T
// forked from cx20's "[WebGL] Grimoire.js+ ポリゴンで３次元関数を表示してみるテスト" http://jsdo.it/cx20/8e5I
// forked from cx20's "[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/SM1B
// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

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

initialCondition(peakPosition);

var WIDTH_SEGMENT = N;
var HEIGHT_SEGMENT = N;
var WIDTH_SIZE = 1.0 * 2 / WIDTH_SEGMENT;
var HEIGHT_SIZE = 1.0 * 2 / WIDTH_SEGMENT;

var positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
var colors = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 4);

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("custom", {}, function (gl, attrs) {
  var geometry = new Geometry(gl);
  var indices = new Uint16Array(WIDTH_SEGMENT * HEIGHT_SEGMENT * 6);
  k = 0;
  for (var row = 0; row < HEIGHT_SEGMENT; row++) {
    for (var col = 0; col < WIDTH_SEGMENT; col++) {
      var a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
      var b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
      var c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
      var d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
      indices[k * 6 + 0] = b;
      indices[k * 6 + 1] = a;
      indices[k * 6 + 2] = c;
      indices[k * 6 + 3] = a;
      indices[k * 6 + 4] = d;
      indices[k * 6 + 5] = c;
      k++;
    }
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  });
  geometry.addAttributes(colors, {
    COLOR: {
      size: 4
    }
  });
  //geometry.addIndex("default", indices, WebGLRenderingContext.TRIANGLES);
  geometry.addIndex("default", indices, WebGLRenderingContext.LINES);
  return geometry;
});

gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1',
      converter: 'Number',
    },
  },
  $mount: function () {
    this.phi = 0;
    this.theta = 0;
  },
  $update: function () {
    this.theta += Math.PI * 1 / 180;
    var gr = this.companion.get("GeometryRegistory");
    var geometry = gr.getGeometry("c1");
    var bufferPositions = geometry.buffers[geometry.accessors["POSITION"].bufferIndex];
    var bufferColors = geometry.buffers[geometry.accessors["COLOR"].bufferIndex];
    k = 0;
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
        positions[k * 3 + 0] = x;
        positions[k * 3 + 1] = y;
        positions[k * 3 + 2] = z;

        colors[k * 4 + 0] = x + 0.5;
        colors[k * 4 + 1] = y + 0.5;
        colors[k * 4 + 2] = z + 0.5;
        colors[k * 4 + 3] = 1.0;

        k++;
      }
    }

    bufferPositions.update(positions);
    bufferColors.update(colors);

    this.phi += this.getAttribute('speed');
    //this.node.setAttribute('rotation', this.phi + ',' + this.phi + ',' + 0);
  },
});

gr(function () {
  var $$ = gr('#canvas');
  $$('mesh').addComponent('Rotate');
});