// forked from cx20's "[WebGL] Grimoire.js で forward-shading プラグインを試してみるテスト" http://jsdo.it/cx20/ixgd
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）" http://jsdo.it/cx20/yNCh
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

//--------------------------------------
// Index.js
//--------------------------------------
function getRandomColor(){ 
    const hex = "000000" + Math.floor(Math.random()*16777215).toString(16); 
    const col = "#" + hex.substr( hex.length - 6, 6 );
    return col;
}

const scale = 1;
const count = 4;

gr(function() {
  for (let x = -count; x <= count; x++) {
    for (let y = -count; y <= count; y++) {
      let color = getRandomColor();
      gr('#canvas')('scene').append(
`
<mesh id="c_x${(x+count)}_y${(y+count)}" position="${x*scale}, 0, ${y*scale}" scale="0.42" geometry="cube" diffuse="${color}">
<mesh.components>
<Wave />
</mesh.components>
</mesh>
`
      );
    }
  }
});


//--------------------------------------
// StareAt.js
//--------------------------------------
var Quaternion = gr.lib.math.Quaternion;
var Matrix = gr.lib.math.Matrix;

gr.registerComponent('StareAt', {
  attributes: {
    center: {
      default: '0, 0, 0',
      converter: 'Vector3',
    },
    axis: {
      default: '0, 1, 0',
      converter: 'Vector3',
    },
    speed: {
      default: 0.03,
      converter: 'Number',
    },
    zoom: {
      default: 1.0,
      converter: 'Number',
    },
    zoomPhase: {
      default: 1.3,
      converter: 'Number',
    },
  },
  $awake: function() {
    this._transform = this.node.getComponent('Transform');
  },
  $mount: function() {
    this.phi = 0;
    var d = this.node.getAttribute('position').subtractWith(this.getAttribute('center'));
    this.direction = d.normalized;
    this.distance = d.magnitude;
    this.baseRotation = this._transform.rotation;
  },
  $update: function() {
    this.phi += this.getAttribute('speed');
    var rotateQuaternion = Quaternion.angleAxis(this.phi, this.getAttribute('axis'));
    var rotateMatrix = Matrix.rotationQuaternion(rotateQuaternion);
    var rotatedDirection = Matrix.transformNormal(rotateMatrix, this.direction);
    this._transform.position = this.getAttribute('center')
      .addWith(rotatedDirection.multiplyWith(this.distance - this.getAttribute('zoom') * Math.sin(this.phi * this.getAttribute('zoomPhase'))));
    this._transform.rotation = Quaternion.multiply(rotateQuaternion, this.baseRotation);
  },
});


//--------------------------------------
// Wave.js
//--------------------------------------
var Vector3 = gr.lib.math.Vector3;

gr.registerComponent('Wave', {
  attributes: {
    center: {
      default: '0, 0, 0',
      converter: 'Vector3',
    },
    axis: {
      default: '0, 1, 0',
      converter: 'Vector3',
    },
    speed: {
      default: 0.03,
      converter: 'Number',
    },
    coefficient: {
      default: 1,
      converter: 'Number',
    },
    amplitude: {
      default: 1,
      converter: 'Number',
    },
  },
  $awake: function() {
    this._transform = this.node.getComponent('Transform');
  },
  $mount: function() {
    this.t = 0;
    var d = this.node.getAttribute('position').subtractWith(this.getAttribute('center'));
    this.distance = d.magnitude;
    this.basePosition = this._transform.position;
  },
  $update: function() {
    this.t += this.getAttribute('speed');
    this._transform.position = this.basePosition
      .addWith(new Vector3(0, this.getAttribute('amplitude') * Math.sin(this.t + this.distance * this.getAttribute('coefficient')), 0));
  },
});


