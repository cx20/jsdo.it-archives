// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("custom", {}, function(gl,attrs){
  var geometry = new Geometry(gl);
  // 正弦波×余弦波の座標データを用意
  //             1.0 y 
  //              ^  -1.0 
  //              | / z
  //              |/       x
  // -1.0 -----------------> +1.0
  //            / |
  //      +1.0 /  |
  //           -1.0
  // 
  //             [3]
  //         [4]     [2]
  //      [5]            [1]
  //      *                *
  //     [6]              [0]
  //      *                *
  //      [7]            [11]
  //         [8]     [10]
  //             [9]
  //
  var positions = [];
  var colors = [];
  var indices = [];
  var MAX = 24;
  var A = 1.0;
  var B = 2.0;
  for ( var i = 0; i <= MAX; i++ ) {
      var x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
      var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
      var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
      positions = positions.concat([x, y, z]);
      colors = colors.concat([x+0.5, y+0.5, z+0.5, 1.0])
      indices.push(i);
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
