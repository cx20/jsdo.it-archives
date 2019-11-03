// forked from cx20's "[WebGL] SceneJS を試してみるテスト" http://jsdo.it/cx20/ABgh
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var scene = SceneJS.createScene({
  nodes: [
    {
      type: "cameras/orbit",
      zoom: 1.9,
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
              type: "geometry",
              positions: [
                -0.5,  0.5, 0.0, // v0
                 0.5,  0.5, 0.0, // v1 
                -0.5, -0.5, 0.0, // v2
                 0.5, -0.5, 0.0  // v3
              ],
              colors: [
                0.5, 0.0, 0.0, 1.0,
                0.0, 0.5, 0.0, 1.0,
                0.0, 0.0, 0.5, 1.0,
                0.5, 0.5, 0.0, 1.0,
              ],
              indices: [
                0, 1, 2,
                1, 2, 3
              ]
            }
          ]
        }
      ]
    }
  ]
});
