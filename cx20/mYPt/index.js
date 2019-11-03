// forked from cx20's "[WebGL] SceneJS を試してみるテスト（その２）" http://jsdo.it/cx20/zVHS
// forked from cx20's "[WebGL] SceneJS を試してみるテスト" http://jsdo.it/cx20/ABgh
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var scene = SceneJS.createScene({
  nodes: [
    {
      type: "cameras/orbit",
      zoom: 2,
      nodes:[
        {
          type:"lights",
          lights:[
            {
              mode:"ambient",
              color:{ r:1.0, g:1.0, b:1.0 }
            }
          ],
          nodes: [
            {
              type: "rotate",
              x: 1,
              y: 1,
              z: 1,
              id: "cube-rotate",
              nodes: [
                {
                  type: "geometry",
                  positions: [
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
                  ],
                  colors: [
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
                    0.0, 0.0, 1.0, 1.0, // Left face
                    0.0, 0.0, 1.0, 1.0, // Left face
                    0.0, 0.0, 1.0, 1.0, // Left face
                    0.0, 0.0, 1.0, 1.0  // Left face
                  ],
                  indices: [
                     0,  1,  2,    0,  2 , 3,  // Front face
                     4,  5,  6,    4,  6 , 7,  // Back face
                     8,  9, 10,    8, 10, 11,  // Top face
                    12, 13, 14,   12, 14, 15,  // Bottom face
                    16, 17, 18,   16, 18, 19,  // Right face
                    20, 21, 22,   20, 22, 23   // Left face
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

var cubeRotateAngle = 0;

scene.on("tick", function() {
  scene.getNode("cube-rotate",
    function(cubeRotate) {
      cubeRotate.setAngle(cubeRotateAngle);
    });
  cubeRotateAngle += 1.0;
});
