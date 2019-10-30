// forked from cx20's "[WebGL] Grimoire.js でインスタンシング機能を使ってみるテスト" http://jsdo.it/cx20/oANb
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("cube2", {}, (gl) => {
  const geometry = new Geometry(gl);
  geometry.addAttributes([
      // upper
    -1, 1, -1,
    1,  1, -1,
    1,  1, 1,
    -1, 1, 1,
    // lower
    -1, -1, -1,
    1,  -1, -1,
    1,  -1, 1,
    -1, -1, 1,
    // front
    -1, -1, 1,
    1,  -1, 1,
    1,  1, 1,
    -1, 1, 1,
    // back
    -1, -1, -1,
    1,  -1, -1,
    1,  1, -1,
    -1, 1, -1,
    // right
    1, -1, -1,
    1,  -1, 1,
    1,  1, 1,
    1, 1, -1,
    // left
    -1, -1, -1,
    -1,  -1, 1,
    -1,  1, 1,
    -1, 1, -1
  ], {
    POSITION: {
      size: 3
    }
  });
  geometry.addAttributes([
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0
  ], {
    TEXCOORD: {
      size: 2
    }
  });
  const n = 100000;
  const arr = [];
  const arr2 = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.random() * 100 - 50);
    arr.push(Math.random() * 100 - 50);
    arr.push(Math.random() * 100 - 50);
    arr2.push(Math.random() * 100 - 50);
  }
  geometry.addAttributes(arr, {
    POSITION_BASE: {
      size: 3,
      instancingDivisor: 4
    }
  });
  geometry.addAttributes(arr2, {
    RANDOM_SEED: {
      size: 1,
      instancingDivisor: 4
    }
  });
  geometry.addIndex("default", n * 4, [
    3, 1, 0, 2, 1, 3,
    4, 5, 7, 7, 5, 6,
    8, 9, 11, 11, 9, 10,
    15, 13, 12, 14, 13, 15,
    19, 17, 16, 18, 17, 19,
    20, 21, 23, 23, 21, 22
  ]);
  return geometry;
});

var Base64 = {
  encode: function(str) {
    return btoa(unescape(encodeURIComponent(str)));
  },
  decode: function(str) {
    return decodeURIComponent(escape(atob(str)));
  }
};

var shader = document.getElementById("shader").textContent;
var encodeString = Base64.encode(shader);
var ASSETS = {};
ASSETS['index.sort'] = "data:;base64," + encodeString; // シェーダを DataURI として格納

gr(function() {
  var $$ = gr('#canvas');
  $$('goml').addChildByName('import-material', {typeName:'colorTest', src:ASSETS['index.sort']});
  $$('scene').addChildByName('mesh', {material:"new(colorTest)", geometry:"cube2", color:"red", scale:"0.1", texture:"../../assets/A/k/w/j/AkwjW.jpg"});
});

