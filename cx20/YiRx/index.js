// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("custom", {}, function(gl,attrs){
  var geometry = new Geometry(gl);
  var positions = new Float32Array([
    // Front face
    -0.5, -0.5,  0.5, // v0
     0.5, -0.5,  0.5, // v1
     0.5,  0.5,  0.5, // v2
    -0.5,  0.5,  0.5, // v3
    // Back face
    -0.5, -0.5, -0.5, // v4
     0.5, -0.5, -0.5, // v5
     0.5,  0.5, -0.5, // v6
    -0.5,  0.5, -0.5, // v7
    // Top face
     0.5,  0.5,  0.5, // v2
    -0.5,  0.5,  0.5, // v3
    -0.5,  0.5, -0.5, // v7
     0.5,  0.5, -0.5, // v6
    // Bottom face
    -0.5, -0.5,  0.5, // v0
     0.5, -0.5,  0.5, // v1
     0.5, -0.5, -0.5, // v5
    -0.5, -0.5, -0.5, // v4
    // Right face
     0.5, -0.5,  0.5, // v1
     0.5,  0.5,  0.5, // v2
     0.5,  0.5, -0.5, // v6
     0.5, -0.5, -0.5, // v5
    // Left face
    -0.5, -0.5,  0.5, // v0
    -0.5,  0.5,  0.5, // v3
    -0.5,  0.5, -0.5, // v7
    -0.5, -0.5, -0.5  // v4
  ]);
  var colors = new Float32Array([
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    1.0, 0.0, 0.0, 1.0, // Front face
    
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    1.0, 1.0, 0.0, 1.0, // Back face
    
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    0.0, 1.0, 0.0, 1.0, // Top face
    
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    1.0, 0.5, 0.5, 1.0, // Bottom face
    
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    1.0, 0.0, 1.0, 1.0, // Right face
    
    0.0, 0.0, 1.0, 1.0,  // Left face
    0.0, 0.0, 1.0, 1.0,  // Left face
    0.0, 0.0, 1.0, 1.0,  // Left face
    0.0, 0.0, 1.0, 1.0   // Left face
  ]);
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
  var indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23   // Left face
  ];
  geometry.addIndex("default", indices, WebGLRenderingContext.TRIANGLES);
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
  },
  $update: function () {
    this.phi += this.getAttribute('speed');
    this.node.setAttribute('rotation', `${this.phi}, ${this.phi}, 0`);
  },
});

gr(function() {
  var $$ = gr('#canvas');
  //var shader = document.getElementById('shader').textContent;
  //$$('goml').addChildByName('import-material', {typeName:'colorShader', src:'data:;base64,' + btoa(shader)}); // grimoire-preset-basic.js v1.10.16 にてこのコードは不要になりました。
});
