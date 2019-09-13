// forked from cx20's "[WebGL] Grimoire.js 消しゴムを表示させてみるテスト" http://jsdo.it/cx20/OGm0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）（VBO編）" http://jsdo.it/cx20/swSy
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）（VBO編）" http://jsdo.it/cx20/YiRx
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
    -0.5,  -0.5,  0.7, // v0
     0.5,  -0.5,  0.7, // v1
     0.35,  0.5,  0.4, // v2
    -0.35,  0.5,  0.4, // v3
    // Back face
    -0.5,  -0.5, -0.7, // v4
     0.5,  -0.5, -0.7, // v5
     0.35,  0.5, -0.4, // v6
    -0.35,  0.5, -0.4, // v7
    // Top face
     0.35,  0.5,  0.4, // v2
    -0.35,  0.5,  0.4, // v3
    -0.35,  0.5, -0.4, // v7
     0.35,  0.5, -0.4, // v6
    // Bottom face
    -0.5,  -0.5,  0.7, // v0
     0.5,  -0.5,  0.7, // v1
     0.5,  -0.5, -0.7, // v5
    -0.5,  -0.5, -0.7, // v4
    // Right face
     0.5,  -0.5,  0.7, // v1
     0.35,  0.5,  0.4, // v2
     0.35,  0.5, -0.4, // v6
     0.5,  -0.5, -0.7, // v5
    // Left face
    -0.5,  -0.5,  0.7, // v0
    -0.35,  0.5,  0.4, // v3
    -0.35,  0.5, -0.4, // v7
    -0.5,  -0.5, -0.7, // v4
    // Front2 face
    -0.35,  0.5,  0.4,  // v3
     0.35,  0.5,  0.4,  // v2
     0.0,   0.6,  0.35, // v8
    // Back2 face
    -0.35,  0.5, -0.4,  // v7
     0.35,  0.5, -0.4,  // v6
     0.0,   0.6, -0.35, // v9
    // Right2 Face
     0.35,  0.5,  0.4,  // v2
     0.35,  0.5, -0.4,  // v6
     0.0,   0.6, -0.35, // v9
     0.0,   0.6,  0.35, // v8
    // Left2 Face
    -0.35,  0.5,  0.4,  // v3
    -0.35,  0.5, -0.4,  // v7
     0.0,   0.6, -0.35, // v9
     0.0,   0.6,  0.35  // v8
  ]);
  // テクスチャ座標データを用意
  //  (0, 1)               (1, 1)
  //   t +----+----+----+----+
  //     | ① | ② | ③ |    |
  //     +----+----+----+----+
  //     | ④ | ⑤ | ⑥ |    |
  //     +----+----+----+----+ -> s
  //  (0, 0)               (1, 0)
  //
  var texcoords = new Float32Array([
    // Front face
    0.5,  0.5, // v0
    0.75, 0.5, // v1
    0.75, 1.0, // v2
    0.5,  1.0, // v3
    
    // Back face
    0.25, 0.5, // v4
    0.5,  0.5, // v5
    0.5,  1.0, // v6
    0.25, 1.0, // v7
    
    // Top face
    0.75, 0.5, // v2
    0.5,  0.5, // v3
    0.5,  0.0, // v7
    0.75, 0.0, // v6
    
    // Bottom face
    0.0,  0.5, // v0
    0.25, 0.5, // v1
    0.25, 1.0, // v5
    0.0,  1.0, // v4
    
    // Right face
    0.0,  0.5, // v1
    0.0,  0.0, // v2
    0.25, 0.0, // v6
    0.25, 0.5, // v5
    
    // Left face
    0.5,  0.5, // v0
    0.5,  0.0, // v3
    0.25, 0.0, // v7
    0.25, 0.5, // v4
    
    // Front2 face
    0.75,  0.0, // v3
    1.0,   0.0, // v2
    1.0,   0.5, // v8
    // Back2 face
    0.75,  0.0, // v7
    1.0,   0.0, // v6
    1.0,   0.5, // v9
    // Right2 Face
    0.75,  0.0, // v2
    1.0,   0.0, // v6
    1.0,   0.5, // v9
    0.75,  0.5, // v8
    // Left2 Face
    0.75,  0.0, // v3
    1.0,   0.0, // v7
    1.0,   0.0, // v9
    0.75,  0.5  // v8
  ]);
  geometry.addAttributes(positions, {
    POSITION:{
      size: 3
    }
  });
  geometry.addAttributes(texcoords, {
    TEXCOORD:{
      size: 2
    }
  });
  var indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23,  // Left face
    24, 25, 26,                // Front2 face
    27, 28, 29,                // Back2 face
    30, 31, 32,   30, 32, 33,  // Right2 face
    34, 35, 36,   34, 36, 37   // Left2 face
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
    this.node.setAttribute('rotation', this.phi + ',' + this.phi + ',' + 0);
  },
});