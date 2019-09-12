// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

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
  var MAX = 360;
  var A = 100.0;
  var B = 99.0;
  var C = 1.0;
  var alpha = Math.PI/4;
  var beta  = Math.PI/3;
  var theta = 0; // Math.PI/2;
  var positions = new Float32Array((MAX*10+1) * 3);
  var colors = new Float32Array((MAX*10+1) * 4);
  var indices = new Uint16Array((MAX*10+1) * 1);

  var k = 0;
  for ( var i = 0; i <= MAX; i += 0.1 ) {
    var x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
    var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
    var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
    positions[k * 3 + 0] = x;
    positions[k * 3 + 1] = y;
    positions[k * 3 + 2] = z;
        
    colors[k * 4 + 0] = x + 0.5;
    colors[k * 4 + 1] = y + 0.5;
    colors[k * 4 + 2] = z + 0.5;
    colors[k * 4 + 3] = 1.0;
        
    indices[k] = k;
        
    k++;
  }
  geometry.addAttributes(positions, {
    POSITION:{
      size: 3
    }
  });
  geometry.addAttributes(colors, {
    COLOR:{
      size: 4
    }
  });
  geometry.addIndex("default", indices, WebGLRenderingContext.LINE_STRIP);
  return geometry;
});
