// forked from cx20's "[WebGL] regl を試してみるテスト（その２）" http://jsdo.it/cx20/kObE
// forked from cx20's "[WebGL] regl を試してみるテスト" http://jsdo.it/cx20/GaeB
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var regl = createREGL();

var position = [
  [-0.5, +0.5, +0.5], [+0.5, +0.5, +0.5], [+0.5, -0.5, +0.5], [-0.5, -0.5, +0.5], // positive z face.
  [+0.5, +0.5, +0.5], [+0.5, +0.5, -0.5], [+0.5, -0.5, -0.5], [+0.5, -0.5, +0.5], // positive x face
  [+0.5, +0.5, -0.5], [-0.5, +0.5, -0.5], [-0.5, -0.5, -0.5], [+0.5, -0.5, -0.5], // negative z face
  [-0.5, +0.5, -0.5], [-0.5, +0.5, +0.5], [-0.5, -0.5, +0.5], [-0.5, -0.5, -0.5], // negative x face.
  [-0.5, +0.5, -0.5], [+0.5, +0.5, -0.5], [+0.5, +0.5, +0.5], [-0.5, +0.5, +0.5], // top face
  [-0.5, -0.5, -0.5], [+0.5, -0.5, -0.5], [+0.5, -0.5, +0.5], [-0.5, -0.5, +0.5]  // bottom face
]

const indices = [
  [2, 1, 0], [2, 0, 3],       // positive z face.
  [6, 5, 4], [6, 4, 7],       // positive x face.
  [10, 9, 8], [10, 8, 11],    // negative z face.
  [14, 13, 12], [14, 12, 15], // negative x face.
  [18, 17, 16], [18, 16, 19], // top face.
  [20, 21, 22], [23, 20, 22]  // bottom face
]
const colors = [
  [1.0, 0.0, 0.0, 1.0], // Front face
  [1.0, 0.0, 0.0, 1.0], // Front face
  [1.0, 0.0, 0.0, 1.0], // Front face
  [1.0, 0.0, 0.0, 1.0], // Front face
  [1.0, 1.0, 0.0, 1.0], // Back face
  [1.0, 1.0, 0.0, 1.0], // Back face
  [1.0, 1.0, 0.0, 1.0], // Back face
  [1.0, 1.0, 0.0, 1.0], // Back face
  [0.0, 1.0, 0.0, 1.0], // Top face
  [0.0, 1.0, 0.0, 1.0], // Top face
  [0.0, 1.0, 0.0, 1.0], // Top face
  [0.0, 1.0, 0.0, 1.0], // Top face
  [1.0, 0.5, 0.5, 1.0], // Bottom face
  [1.0, 0.5, 0.5, 1.0], // Bottom face
  [1.0, 0.5, 0.5, 1.0], // Bottom face
  [1.0, 0.5, 0.5, 1.0], // Bottom face
  [1.0, 0.0, 1.0, 1.0], // Right face
  [1.0, 0.0, 1.0, 1.0], // Right face
  [1.0, 0.0, 1.0, 1.0], // Right face
  [1.0, 0.0, 1.0, 1.0], // Right face
  [0.0, 0.0, 1.0, 1.0], // Left face
  [0.0, 0.0, 1.0, 1.0], // Left face
  [0.0, 0.0, 1.0, 1.0], // Left face
  [0.0, 0.0, 1.0, 1.0]  // Left face
];

var mat4 = {};
mat4.scale = scale;
mat4.lookAt = lookAt;
mat4.perspective = perspective;

const drawTriangle = regl({

  vert: `
    precision mediump float;
    attribute vec3 position;
    attribute vec4 color;
    uniform mat4 projection, view;
    varying   vec4 vColor;
    void main() {
      vColor = color;
      gl_Position =  projection * view * vec4(position * 2.0, 1);
    }`,
  frag: `
    precision mediump float;
    varying   vec4 vColor;
    void main() {
      gl_FragColor = vColor;
    }`,


  attributes: {
    position: position,
    color: colors
  },
  elements: indices,
  uniforms: {
    view: ({tick}) => {
      const t = 0.01 * tick
      return mat4.lookAt([],
        [5 * Math.cos(t), 2.5 * Math.sin(t), 5 * Math.sin(t)],
        [0, 0.0, 0],
        [0, 1, 0])
    },
    projection: ({viewportWidth, viewportHeight}) =>
      mat4.perspective([],
        Math.PI / 4,
        viewportWidth / viewportHeight,
        0.01,
        10),
  },
  primitive: "triangles",
  count: 36
})

regl.frame(({time}) => {
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  drawTriangle({
  })
})
