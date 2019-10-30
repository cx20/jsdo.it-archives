// forked from cx20's "forked: [Grimoire.js] 様々なHeight-mapを試してみるテスト" http://jsdo.it/cx20/uzTK
// forked from LimeStreem's "[Grimoire.js] 様々なHeight-mapを試してみるテスト" http://jsdo.it/LimeStreem/KYkA
// forked from LimeStreem's "forked: [Grimoire.js] きのこの山たけのこの里の断面図を高さマップとして使ってみるテスト" http://jsdo.it/LimeStreem/eIjx
// forked from cx20's "[Grimoire.js] きのこの山たけのこの里の断面図を高さマップとして使ってみるテスト" http://jsdo.it/cx20/Ajbf
// forked from cx20's "[WebGL] Grimoire.jsで霜降り肉を高さマップとして使ってみるテスト" http://jsdo.it/cx20/IQIT
// forked from cx20's "[WebGL] Grimoire.jsで赤色立体地図を高さマップとして使ってみるテスト" http://jsdo.it/cx20/0PP3
// forked from cx20's "[WebGL] Grimoire.jsで地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/Gqjp
// forked from cx20's "[WebGL] Grimoire.jsで高さマップを試してみるテスト" http://jsdo.it/cx20/APWd
// forked from cx20's "[WebGL] Grimoire.js+ ポリゴンで３次元関数を表示してみるテスト" http://jsdo.it/cx20/8e5I
// forked from cx20's "[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/SM1B
// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s
// heightMap より標高データを取得する
// 参考：http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img, heightScale) {
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
    var k = heightScale; // 起伏の強調度
    var height = (pix[i] + pix[i + 1] + pix[i + 2]) / 3 * 1 / 16 * k;
    //var height = pix[i] * 1 / 16 * k; // 赤色のみを参照
    data[j++] = height;
  }

  return data;
}

var GLExtRequestor = gr.lib.fundamental.Resource.GLExtRequestor;
GLExtRequestor.request("OES_element_index_uint");

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
var ImageResolver = gr.lib.fundamental.Asset.ImageResolver; // 画像のキャッシュなどをいい感じに読み込んでくれるクラスです
GeometryFactory.addType("hight-map", {
  heightScale: {
    converter: "Number",
    default: 1.0
  },
  src: {
    converter: "String",
    default: null
  }
}, function(gl, attrs) {
  if (attrs.src === null) {
    throw new Error("Geometry typed `hight-map` must have src attribute.");
  }

  return new Promise((resolve, reject) => {
    ImageResolver.resolve(attrs.src).then(img => {
      const hightData = getHeightData(img, attrs.heightScale);
      var geometry = new Geometry(gl);
      const HEIGHT_SEGMENT = img.width - 1;
      const WIDTH_SEGMENT = img.height - 1;
      const positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
      const normals = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
      const texcoords = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 2);
      const indices = new Uint32Array(WIDTH_SEGMENT * HEIGHT_SEGMENT * 6);
      var k = 0;
      for (var row = 0; row < HEIGHT_SEGMENT; row++) {
        for (var col = 0; col < WIDTH_SEGMENT; col++) {
          var a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
          var b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
          var c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
          var d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
          indices[k * 6 + 0] = a;
          indices[k * 6 + 1] = b;
          indices[k * 6 + 2] = c;
          indices[k * 6 + 3] = d;
          indices[k * 6 + 4] = a;
          indices[k * 6 + 5] = c;
          k++;
        }
      }
      k = 0;
      for (var x = -1; x < 1; x += 2 / WIDTH_SEGMENT) {
        for (var y = -1; y < 1; y += 2 / HEIGHT_SEGMENT) {
          const u = x / 2 + 0.5;
          const v = y / 2 + 0.5;
          const pw = Math.floor(u * img.width);
          const ph = Math.floor(v * img.height);
          var z = hightData[ph * (WIDTH_SEGMENT + 1) + pw];
          var z2 = z / 32 - 0.5;
          positions[k * 3 + 0] = x;
          positions[k * 3 + 1] = z2;
          positions[k * 3 + 2] = y;

          normals[k * 3 + 0] = x;
          normals[k * 3 + 1] = z2;
          normals[k * 3 + 2] = y;

          texcoords[k * 2 + 0] = u;
          texcoords[k * 2 + 1] = v;

          k++;
        }
      }
      geometry.addAttributes(positions, {
        POSITION: {
          size: 3
        }
      });
      geometry.addAttributes(normals, {
        NORMAL: {
          size: 3
        }
      });
      geometry.addAttributes(texcoords, {
        TEXCOORD: {
          size: 2
        }
      });
      geometry.addIndex("default", indices, WebGLRenderingContext.TRIANGLES);
      resolve(geometry);
    });
  });
});

gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '0.5',
      converter: 'Number',
    },
  },
  $mount: function() {
    this.phi = 0;
  },
  $update: function() {
    this.phi += this.getAttribute('speed');
    this.node.setAttribute('rotation', `0, ${this.phi}, 0`);
  }
});

gr(function() {
  var $$ = gr('#canvas');
  $$('mesh').addComponent('Rotate');
});