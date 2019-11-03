// forked from cx20's "[WebGL] regl を試してみるテスト" http://jsdo.it/cx20/GaeB
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var regl = createREGL();

const drawTriangle = regl({

  vert: `
    precision mediump float;
    attribute vec3 position;
    attribute vec4 color;
    varying   vec4 vColor;
    void main() {
      vColor = color;
      gl_Position = vec4(position, 1);
    }`,
  frag: `
    precision mediump float;
    varying   vec4 vColor;
    void main() {
      gl_FragColor = vColor;
    }`,


  attributes: {
    elements: [
        [0, 1, 2], 
        [2, 3, 1]
    ],
    // 正方形の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //        [0]------[1]
    //         |        |
    //         |        |
    //         |        |
    //        [2]------[3]
    //
    position: regl.buffer([
      [ -0.5, 0.5, 0.0 ], // v0
      [  0.5, 0.5, 0.0 ], // v1 
      [ -0.5,-0.5, 0.0 ], // v2
      [  0.5,-0.5, 0.0 ]  // v3
    ]),
    color : [ 
      [1.0, 0.0, 0.0, 1.0], // v0
      [0.0, 1.0, 0.0, 1.0], // v1
      [0.0, 0.0, 1.0, 1.0], // v2
      [1.0, 1.0, 0.0, 1.0]  // v3
    ]
 },
  uniforms: {
    //color: regl.prop('color')
  },
  primitive: "triangle strip",
  count: 4
})

regl.frame(({time}) => {
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  drawTriangle({
    //color: color
  })
})
