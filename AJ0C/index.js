// forked from cx20's "[WebGL] Grimoire.js でハーモノグラフみたいな何かを描いてみるテスト（シェーダ編）" http://jsdo.it/cx20/wG9h
// forked from cx20's "[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/SM1B
// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var MAX = 360;
var positions = new Float32Array((MAX*10) * 3);
var indices = new Uint16Array((MAX*10) * 1);

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("custom", {}, function(gl,attrs){
  var geometry = new Geometry(gl);
  // 3次元リサージュの座標データを用意
  //             1.0 y 
  //              ^  -1.0 
  //              | / z
  //              |/       x
  // -1.0 -----------------> +1.0
  //            / |
  //      +1.0 /  |
  //           -1.0
  // 

  var A = 100.0;
  var B = 99.0;
  var C = 1.0;
  var alpha = Math.PI/4;
  var beta  = Math.PI/3;
  var theta = 0; // Math.PI/2;
  var k = 0;
  for ( var i = 0; i < MAX; i += 0.1 ) {
    var x = i;
    var y = 0.0;
    var z = 0.0;

    positions[k * 3 + 0] = x;
    positions[k * 3 + 1] = y;
    positions[k * 3 + 2] = z;
    
    indices[k] = k;
        
    k++;
  }
  geometry.addAttributes(positions, {
    POSITION:{
      size: 3
    }
  });
  geometry.addIndex("default", indices, WebGLRenderingContext.LINE_STRIP);
  return geometry;
});

var p1 = 0;
var A1 = 0.4, f1 = 2, p1 = 1/16, d1 = 0.02;
var A2 = 0.4, f2 = 2, p2 = 3 / 2, d2 = 0.0315;
var A3 = 0.4, f3 = 2, p3 = 13 / 15, d3 = 0.02;
var A4 = 0.4, f4 = 2, p4 = 1, d4 = 0.02;

function randomHarmonograph() {
    f1 = (f1 + Math.random() / 40) % 10;
    f2 = (f2 + Math.random() / 40) % 10;
    f3 = (f3 + Math.random() / 40) % 10;
    f4 = (f4 + Math.random() / 40) % 10;
    p1 += (Math.PI*2 * 0.5 / 360);
}


gr.registerComponent('CalcHarmonograph', {
  attributes: {
  },
  $mount: function () {
    this.phi = 0;
  },
  $update: function () {
    var gr = this.companion.get("GeometryRegistory");
    //var geometry = gr.getGeometry("c1");
    // v1.9.28 では getGeometry() が Promise を返却するようになっている為、VBO を JS 側で更新する場合は注意。
    gr.getGeometry("c1").then(geometry=>{
      var buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex];
      var x, y, z;
      var t = 0;
      var k = 0;
      randomHarmonograph();
      for ( var i = 0; i < MAX; i += 0.1 ) {
        x = A1 * Math.sin(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.sin(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
        y = A3 * Math.sin(f3 * t + Math.PI * p3) * Math.exp(-d3 * t) + A4 * Math.sin(f4 * t + Math.PI * p4) * Math.exp(-d4 * t);
        z = A1 * Math.cos(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.cos(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
        positions[k * 3 + 0] = x;
        positions[k * 3 + 1] = y;
        positions[k * 3 + 2] = z;
        t += 0.01;
        k++;
      }
      buffer.update(positions);
    });
  },
});

gr(function() {
  var $$ = gr('#canvas');
  //$$('goml').addChildByName('import-material', {typeName:'colorShader', src:ASSETS['index.sort']});
  $$('mesh').addComponent('CalcHarmonograph');
});
