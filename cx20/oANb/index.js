// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("quad2", {}, (gl) => {
  const geometry = new Geometry(gl);
  geometry.addAttributes([
    -1, 1, 0,
     1, 1, 0,
     1,-1, 0, 
    -1,-1, 0
  ], {
    POSITION: {
      size: 3
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
  geometry.addIndex("default", n * 4, [0, 2, 1, 3, 2, 0]);
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
  $$('scene').addChildByName('mesh', {material:"new(colorTest)", geometry:"quad2", color:"red", scale:"0.1", texture:"../../assets/y/T/5/4/yT541.jpeg"});
});

