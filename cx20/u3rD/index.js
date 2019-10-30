// forked from cx20's "[WebGL] Grimoire.js で forward-shading プラグインを試してみるテスト（その２）" http://jsdo.it/cx20/QFNT
// forked from cx20's "[WebGL] Grimoire.js で forward-shading プラグインを試してみるテスト" http://jsdo.it/cx20/ixgd
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）" http://jsdo.it/cx20/yNCh
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("cube2", {}, (gl) => {
  const geometry = new Geometry(gl);
  geometry.addAttributes([
      // upper
    -1, 1, -1,
    1,  1, -1,
    1,  1, 1,
    -1, 1, 1,
    // lower
    -1, -1, -1,
    1,  -1, -1,
    1,  -1, 1,
    -1, -1, 1,
    // front
    -1, -1, 1,
    1,  -1, 1,
    1,  1, 1,
    -1, 1, 1,
    // back
    -1, -1, -1,
    1,  -1, -1,
    1,  1, -1,
    -1, 1, -1,
    // right
    1, -1, -1,
    1,  -1, 1,
    1,  1, 1,
    1, 1, -1,
    // left
    -1, -1, -1,
    -1,  -1, 1,
    -1,  1, 1,
    -1, 1, -1
  ], {
    POSITION: {
      size: 3
    }
  });
  geometry.addAttributes([
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0
  ], {
    TEXCOORD: {
      size: 2
    }
  });
  const n = 1000;
  const arr = [];
  const arr2 = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.random() * 100 - 50);
    arr.push(Math.random() * 100 - 50);
    arr.push(Math.random() * 100 - 50);
    arr2.push(Math.random() * 100 - 50);
  }
  geometry.addAttributes(arr, {
    POSITION_BASE: {
      size: 3,
      instancingDivisor: 4
    }
  });
  geometry.addAttributes(arr2, {
    RANDOM_SEED: {
      size: 1,
      instancingDivisor: 4
    }
  });
  geometry.addIndex("default", n * 4, [
    3, 1, 0, 2, 1, 3,
    4, 5, 7, 7, 5, 6,
    8, 9, 11, 11, 9, 10,
    15, 13, 12, 14, 13, 15,
    19, 17, 16, 18, 17, 19,
    20, 21, 23, 23, 21, 22
  ]);
  return geometry;
});

var Base64 = {
  encode: function(str) {
    return btoa(unescape(encodeURIComponent(str)));
  },
  decode: function(str) {
    return decodeURIComponent(escape(atob(str)));
  }
};

var shader = document.getElementById("shader").textContent;
var encodeString = Base64.encode(shader);
var ASSETS = {};
ASSETS['index.sort'] = "data:;base64," + encodeString; // シェーダを DataURI として格納

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
  var $$ = gr('#canvas');
  $$('goml').addChildByName('import-material', {typeName:'colorTest', src:ASSETS['index.sort']});
    
  for (let x = -count; x <= count; x++) {
    for (let y = -count; y <= count; y++) {
      let color = getRandomColor();
      gr('#canvas')('scene').append(
`
<mesh id="c_x${(x+count)}_y${(y+count)}"  material="new(colorTest)" position="${x*scale}, 0, ${y*scale}" scale="0.42" geometry="cube2" diffuse="${color}" texture="../../assets/A/k/w/j/AkwjW.jpg">
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


