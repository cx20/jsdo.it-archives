// forked from cx20's "[WebGL] Grimoire.jsで地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/Gqjp
// forked from cx20's "[WebGL] Grimoire.jsで高さマップを試してみるテスト" http://jsdo.it/cx20/APWd
// forked from cx20's "[WebGL] Grimoire.js+ ポリゴンで３次元関数を表示してみるテスト" http://jsdo.it/cx20/8e5I
// forked from cx20's "[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/SM1B
// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

const ImageResolver = gr.lib.fundamental.Asset.ImageResolver; // 画像のキャッシュなどをいい感じに読み込んでくれるクラスです
const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
const Geometry = gr.lib.fundamental.Geometry.Geometry;
const GLExtRequestor = gr.lib.fundamental.Resource.GLExtRequestor;
GLExtRequestor.request("OES_element_index_uint");

GeometryFactory.addType("hight-map", {
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
      const hightData = getHeightData(img);
      const geometry = new Geometry(gl);
      const HEIGHT_SEGMENT = img.width - 1;
      const WIDTH_SEGMENT = img.height - 1;
      const positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
      const texcoords = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 2);
      const indices = new Uint32Array(WIDTH_SEGMENT * HEIGHT_SEGMENT * 6);
      let k = 0;
      for (let row = 0; row < HEIGHT_SEGMENT; row++) {
        for (let col = 0; col < WIDTH_SEGMENT; col++) {
          let a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
          let b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
          let c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
          let d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
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
      for (let x = -1; x < 1; x += 2 / WIDTH_SEGMENT) {
        for (let y = -1; y < 1; y += 2 / HEIGHT_SEGMENT) {
          let u = x / 2 + 0.5;
          let v = y / 2 + 0.5;
          let pw = Math.floor(u * img.width);
          let ph = Math.floor(v * img.height);
          let z = hightData[ph * (WIDTH_SEGMENT + 1) + pw];
          let z2 = z / 32 - 0.5;
          positions[k * 3 + 0] = x;
          positions[k * 3 + 1] = z2;
          positions[k * 3 + 2] = y;

          texcoords[k * 2 + 0] = u;
          texcoords[k * 2 + 1] = 1-v;

          k++;
        }
      }
      geometry.addAttributes(positions, {
        POSITION: {
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

// heightMap より標高データを取得する
// 参考：http://danni-three.blogspot.jp/2013/09/threejs-heightmaps.html
function getHeightData(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext("2d");

  const size = img.width * img.height;
  const data = new Float32Array(size);

  context.drawImage(img, 0, 0);

  const imgd = context.getImageData(0, 0, img.width, img.height);
  const pix = imgd.data;

  let j = 0;
  for (let i = 0; i < pix.length; i += 4) {
    let k = 0.2; // 起伏の強調度
    let height = (pix[i] + pix[i + 1] + pix[i + 2]) / 3 * 1 / 16 * k;
    data[j++] = height;
  }

  return data;
}

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

gr(function () {
  const $$ = gr('#canvas');
  $$('mesh').addComponent('Rotate');
});
