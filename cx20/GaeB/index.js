// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var regl = createREGL();

const drawTriangle = regl({

  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

  attributes: {
    position: regl.buffer([
      [ 0.0,  0.5],
      [-0.5, -0.5],
      [ 0.5, -0.5]
    ])
  },

  uniforms: {
    color: regl.prop('color')
  },
  count: 3
})

regl.frame(({time}) => {
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  drawTriangle({
    color: [0, 0, 1, 1]
  })
})
