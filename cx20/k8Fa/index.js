// forked from cx20's "[WebGL] Grimoire.js でロボットを作ってみるテスト" http://jsdo.it/cx20/omki
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

const Vector3 = gr.lib.math.Vector3;
const Quaternion = gr.lib.math.Quaternion;

var roboDataSet = [
    {id:"head",      type:"cube",  size:[1,1,1],       color:"#ffffff", pos:[0,2.5,0]},
    {id:"waist",     type:"cube",  size:[1.5,0.1,1],   color:"#ff7f00", pos:[0,-0.2,0]},
    {id:"upperBody", type:"cube",  size:[2,2,1],       color:"#ff0000", pos:[0,0.9,0]},
    {id:"lowerBody", type:"cube",  size:[2,1,1],       color:"#ff0000", pos:[0,-0.8,0]},
    {id:"rightArm",  type:"cube",  size:[0.7,2,0.7],   color:"#0000ff", pos:[-1.5,1,0]},
    {id:"leftArm",   type:"cube",  size:[0.7,2,0.7],   color:"#0000ff", pos:[+1.5,1,0]},
    {id:"rightLeg",  type:"cube",  size:[0.7,2,0.7],   color:"#ffffff", pos:[-0.5,-2,0]},
    {id:"leftLeg",   type:"cube",  size:[0.7,2,0.7],   color:"#ffffff", pos:[+0.5,-2,0]},
    {id:"rightFoot", type:"cube",  size:[0.9,0.5,1.5], color:"#0000ff", pos:[-0.5,-3,0]},
    {id:"leftFoot",  type:"cube",  size:[0.9,0.5,1.5], color:"#0000ff", pos:[+0.5,-3,0]},
];

function createMeshByDataset(dataSet) {
  var $$ = gr('#canvas');
  for (var i = 0; i < dataSet.length; i++) {
    var item = dataSet[i];
    if (item.type == "cube") {
      var scale = new Vector3(item.size[0] * 0.5, item.size[1] * 0.5, item.size[2] * 0.5);
      var position = new Vector3(item.pos[0], item.pos[1], item.pos[2]);
      $$('#group').addChildByName('mesh', {
        id: item.id,
        position: position,
        scale: scale,
        geometry: item.type,
        metallic: "0.8",     // 反射率 ※ "metalic" has been corrected to "metallic" in grimoire-forward-shading.js v1.8.0
        roughness: "0.5",   // 物質表面の粗さ
        albedo: item.color  // 素材自体の色味
      });
    }
  }
}

gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '2',
      converter: 'Number',
    },
  },
  $mount: function() {
    this.phi = 0;
  },
  $update: function() {
    this.phi += this.getAttribute('speed');
    this.node.setAttribute('rotation', 0 + ',' + this.phi + ',' + 0);
  },
});

gr(function() {
  createMeshByDataset(roboDataSet);
});
