// forked from cx20's "[WebGL] Grimoire.js でハーモノグラフを描いてみるテスト（JS編）" http://jsdo.it/cx20/AJ0C
// forked from cx20's "[WebGL] Grimoire.js でハーモノグラフみたいな何かを描いてみるテスト（シェーダ編）" http://jsdo.it/cx20/wG9h
// forked from cx20's "[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/SM1B
// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var GLExtRequestor = gr.lib.fundamental.Resource.GLExtRequestor;
GLExtRequestor.request("OES_element_index_uint");

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;

var count = 100000;
var factor = [0.5, 0.4, 0.6, 0.8];
var len = count * 3;
var positions = new Float32Array(len);
//var indices = new Uint16Array(count);
var indices = new Uint32Array(count);


GeometryFactory.addType("custom", {}, function(gl,attrs){
  var geometry = new Geometry(gl);
  var k = 0;
  for ( var i = 0; i < count; i += 3) {
    var x = k;
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
  //geometry.addIndex("default", indices, WebGLRenderingContext.LINE_STRIP);
  geometry.addIndex("default", indices, WebGLRenderingContext.POINTS);
  return geometry;
});

gr.registerComponent('CalcCliffordAttractor', {
  attributes: {
  },
  $mount: function () {
    this.deg = Math.PI;
  },
  $update: function () {
    var gr = this.companion.get("GeometryRegistory");
    var geometryPromise = gr.getGeometry("c1");
    geometryPromise.then(geometry=>{
      var buffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex];
  
      // クリフォードアトラクターのデータを用意
      //             1.0 y 
      //              ^  -1.0 
      //              | / z
      //              |/       x
      // -1.0 -----------------> +1.0
      //            / |
      //      +1.0 /  |
      //           -1.0
      // 
  
      var a = 2;
      var b = -1.5;
      var c;
      var d;
      var x, y, z;
      var tx, ty, tz;
      var scale = 1 / 4;
      var k = 0;
  
      c = 2 * Math.cos(this.deg * factor[2]);
      d = 2 * Math.cos(this.deg * factor[3]);
      x = 0;
      y = 0;
        
      for (var i = 0; i < count; i += 3) {
          tx = Math.sin(a * y) + c * Math.cos(a * x);
          ty = Math.sin(b * x) + d * Math.cos(b * y);
          tz = Math.cos(a * y) + c * Math.sin(a * x);
          x = tx;
          y = ty;
          z = tz;
          positions[k * 3 + 0] = x * scale;
          positions[k * 3 + 1] = y * scale;
          positions[k * 3 + 2] = z * scale;
          
          k++;
      }
      this.deg += 0.005;
  
      buffer.update(positions);
    });
  }
});

gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1',
      converter: 'Number'
    }
  },
  $mount: function () {
    this.phi = 0;
  },
  $update: function () {
    this.phi += this.getAttribute('speed');
    this.node.setAttribute('rotation', `0, ${this.phi}, 0`);
  }
});

var Base64 = {
  encode: function(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
};

var shader = document.getElementById("shader").textContent;
var encodeString = Base64.encode(shader);
var ASSETS = {};
ASSETS['index.sort'] = "data:;base64," + encodeString; // シェーダを DataURI として格納

gr(function() {
  var $$ = gr('#canvas');
  $$('goml').addChildByName('import-material', {typeName:'colorShader', src:ASSETS['index.sort']});
  $$('mesh').addComponent('CalcCliffordAttractor');
  $$('mesh').addComponent('Rotate');

});
