// forked from cx20's "[WebGL] ライブラリを使わずに glTF Tutorial のサンプルを読み込んでみるテスト" http://jsdo.it/cx20/qaa2
// forked from cx20's "[WebGL] ライブラリを使わずに glTF 2.0 データを表示してみるテスト（調整中）" http://jsdo.it/cx20/cFNR
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var indicesAccessor              = 0;
var indicesAccessorCount         = 0;
var indicesAccessorBufferView    = 0;
var indicesAccessorByteOffset    = 0;
var indicesAccessorType          = "";
var indicesAccessorElementCount  = 0;
var indicesBufferViewByteLength  = 0;
var indicesBufferViewByteOffset  = 0;
var indicesBuffer                = 0;
var indicesUri                   = "";

var positionAccessor             = 0;
var positionAccessorCount        = 0;
var positionAccessorBufferView   = 0;
var positionAccessorByteOffset   = 0;
var positionAccessorType         = "";
var positionAccessorElementCount = 0;
var positionBufferViewByteOffset = 0;
var positionBuffer               = 0;
var positionUri                  = "";

var inputAccessor                = 0;
var inputBufferView              = 0;
var inputAccessorCount           = 0;
var inputAccessorBufferView      = 0;
var inputAccessorByteOffset      = 0;
var inputAccessorByteOffset      = 0;
var inputAccessorType            = "";
var inputBufferViewByteOffset    = 0;
var inputBuffer                  = 0;
var inputUri                     = "";

var outputAccessor               = 0;
var outputBufferView             = 0;
var outputAccessorCount          = 0;
var outputAccessorBufferView     = 0;
var outputAccessorByteOffset     = 0;
var outputAccessorByteOffset     = 0;
var outputAccessorType           = "";
var outputBufferViewByteOffset   = 0;
var outputBuffer                 = 0;
var outputUri                    = "";

var c, gl;
var aLoc = {};
var uLoc = {};
var vertexPositionBuffer;
var vertexNormalBuffer;

var times = [];
var rotations = [];

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var nMatrix = mat3.create();
var q = quat.create();
var q1 = quat.create();
var q2 = quat.create();

function initWebGL() {
  c = document.getElementById("c");
  gl = getWebGL1Context(c);
  gl.enable(gl.DEPTH_TEST);
  resizeCanvas();
  window.addEventListener("resize", function() {
    resizeCanvas();
  });
}

function resizeCanvas() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  gl.viewport(0, 0, c.width, c.height);
}

function initShaders() {
  var p = gl.createProgram();
  var vs = gl.createShader(gl.VERTEX_SHADER);
  var fs = gl.createShader(gl.FRAGMENT_SHADER);
  var vsText = document.getElementById("vs").textContent;
  var fsText = document.getElementById("fs").textContent;
  gl.shaderSource(vs, vsText);
  gl.shaderSource(fs, fsText);
  gl.compileShader(vs);
  gl.compileShader(fs);
  console.log(vsText);
  console.log(gl.getShaderInfoLog(vs));
  console.log(fsText);
  console.log(gl.getShaderInfoLog(fs));
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  gl.useProgram(p);
  aLoc["position"]         = gl.getAttribLocation(p, "a_position");
  uLoc["modelViewMatrix"]  = gl.getUniformLocation(p, "u_modelViewMatrix");
  uLoc["normalMatrix"]     = gl.getUniformLocation(p, "u_normalMatrix");
  uLoc["projectionMatrix"] = gl.getUniformLocation(p, "u_projectionMatrix");
  gl.enableVertexAttribArray(aLoc["position"]);
    
  load();
}

function ajax(url, responseType) {
  var responseType = typeof responseType !== 'undefined' ?  responseType : "arraybuffer";
  if ( url.match(/^data:application\/(.*);base64,/) ){
    return new Promise(function(resolve, reject) {
      var dataUri = url.split(',');
      var type = dataUri[0].split(':')[1].split(';')[0];
      var byteString = atob(dataUri[1]);
      var byteStringLength = byteString.length;
      var arrayBuffer = new ArrayBuffer(byteStringLength);
      var intArray = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteStringLength; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }
      resolve(arrayBuffer);
    });
  } else if ( url.match(/^data:text\/plain;base64,/) ){
    return new Promise(function(resolve, reject) {
      var dataUri = url.split(',');
      var type = dataUri[0].split(':')[1].split(';')[0];
      var byteString = atob(dataUri[1]);
      resolve(byteString);
    });
  } else {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.responseType = responseType;
  
      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };
  
      req.onerror = function() {
        reject(Error("Network Error"));
      };
  
      req.send();
    });
  }

}

function getElementCountByTypeName(typeName) {
  var typeHash = {"SCALAR":1, "VEC2":2, "VEC3":3, "VEC4":4, "MAT2":4, "MAT3":9, "MAT4":16};
  return typeHash[typeName];
}

function load() {
  //          +------------------------------------------------------------------- accessors[0] : indices    ( 6 bytes =  2 bytes * 3)
  //          |                       +------------------------------------------- accessors[1] : POSITION   (36 bytes = 12 bytes * 3)
  //          |                       |                +-------------------------- accessors[2] : input      (20 bytes =  4 bytes * 5)
  //          |                       |                |               +---------- accessors[3] : output     (80 bytes = 16 bytes * 5)
  //          |                       |                |               |
  // +----------------+      +----------------+----------------+----------------+
  // |  accessors[0]  |      |  accessors[1]  |  accessors[2]  |  accessors[3]  |
  // +----------------+      +----------------+----------------+----------------+
  //          |                       |                |               |
  // +----------------+      +----------------+----------------+----------------+
  // | bufferViews[0] |      | bufferViews[1] |        bufferViews[2]           |
  // +----------------+      +----------------+---------------------------------+
  //          |                       |                        |
  // +----------------------------------------+---------------------------------+
  // |               buffers[0]               |           buffers[1]            |
  // +----------------------------------------+---------------------------------+
  //
  // |[0][1]....[4][5]|[6][7]|[8][9]..[42][43]|[44][45]...............[142][143]|
  // |<--- 6 bytes -->|2bytes|<-- 36 bytes -->|<---------- 100 bytes ---------->|
  // |<------------- 44 bytes --------------->|<---------- 100 bytes ---------->|
  
  //   "accessors": [
  //     {
  //       "bufferView": 0,
  //       "componentType": 5123, // gl.UNSIGNED_SHORT
  //       "count": 3,
  //       "max": [2],
  //       "min": [0],
  //       "type": "SCALAR"
  //     },
  //
  indicesAccessor               = gltf.meshes[0].primitives[0].indices;
  indicesAccessorCount          = gltf.accessors[indicesAccessor].count;
  indicesAccessorBufferView     = gltf.accessors[indicesAccessor].bufferView;
  indicesAccessorByteOffset     = gltf.accessors[indicesAccessor].byteOffset;
  indicesAccessorType           = gltf.accessors[indicesAccessor].type;
  indicesAccessorElementCount   = getElementCountByTypeName(indicesAccessorType);
  indicesBufferViewByteLength   = gltf.bufferViews[indicesAccessorBufferView].byteLength;
  indicesBufferViewByteOffset   = gltf.bufferViews[indicesAccessorBufferView].byteOffset;
  indicesBufferViewByteStride   = gltf.bufferViews[indicesAccessorBufferView].byteStride;
  indicesBuffer                 = gltf.bufferViews[indicesAccessorBufferView].buffer;
  indicesUri                    = gltf.buffers[indicesBuffer].uri;

  //   "accessors": [
  //     ...
  //     {
  //       "bufferView" : 1,
  //       "byteOffset" : 0,
  //       "componentType" : 5126, // gl.FLOAT
  //       "count" : 3,
  //       "type" : "VEC3",
  //       "max" : [ 1.0, 1.0, 0.0 ],
  //       "min" : [ 0.0, 0.0, 0.0 ]
  //     },
  // 
  positionAccessor              = gltf.meshes[0].primitives[0].attributes.POSITION;
  positionAccessorCount         = gltf.accessors[positionAccessor].count;
  positionAccessorBufferView    = gltf.accessors[positionAccessor].bufferView;
  positionAccessorByteOffset    = gltf.accessors[positionAccessor].byteOffset;
  positionAccessorType          = gltf.accessors[positionAccessor].type;
  positionAccessorElementCount  = getElementCountByTypeName(positionAccessorType);
  positionBufferViewByteOffset  = gltf.bufferViews[positionAccessorBufferView].byteOffset;
  positionBufferViewByteStride  = 0; // gltf.bufferViews[positionAccessorBufferView].byteStride;
  positionBuffer                = gltf.bufferViews[positionAccessorBufferView].buffer;
  positionUri                   = gltf.buffers[positionBuffer].uri;

  //   "accessors": [
  //     ...
  //     {
  //       "bufferView" : 2,
  //       "byteOffset" : 0,
  //       "componentType" : 5126, // gl.FLOAT
  //       "count" : 5,
  //       "type" : "SCALAR",
  //       "max" : [ 1.0 ],
  //       "min" : [ 0.0 ]
  //     },
  // 
  inputAccessor                 = gltf.animations[0].samplers[0].input;
  inputAccessorCount            = gltf.accessors[inputAccessor].count;
  inputAccessorBufferView       = gltf.accessors[inputAccessor].bufferView;
  inputAccessorByteOffset       = gltf.accessors[inputAccessor].byteOffset;
  inputAccessorType             = gltf.accessors[inputAccessor].type;
  inputAccessorElementCount     = getElementCountByTypeName(inputAccessorType);
  inputBufferViewByteOffset     = gltf.bufferViews[inputAccessorBufferView].byteOffset;
  inputBuffer                   = gltf.bufferViews[inputAccessorBufferView].buffer;
  inputUri                      = gltf.buffers[inputBuffer].uri;

  //   "accessors": [
  //     ...
  //    {
  //      "bufferView" : 2,
  //      "byteOffset" : 20,
  //      "componentType" : 5126, // gl.FLOAT
  //      "count" : 5,
  //      "type" : "VEC4",
  //      "max" : [ 0.0, 0.0, 1.0, 1.0 ],
  //      "min" : [ 0.0, 0.0, 0.0, -0.707 ]
  //    }
  // 
  outputAccessor                 = gltf.animations[0].samplers[0].output;
  outputAccessorCount            = gltf.accessors[outputAccessor].count;
  outputAccessorBufferView       = gltf.accessors[outputAccessor].bufferView;
  outputAccessorByteOffset       = gltf.accessors[outputAccessor].byteOffset;
  outputAccessorType             = gltf.accessors[outputAccessor].type;
  outputAccessorElementCount     = getElementCountByTypeName(outputAccessorType);
  outputBufferViewByteOffset     = gltf.bufferViews[outputAccessorBufferView].byteOffset;
  outputBuffer                   = gltf.bufferViews[outputAccessorBufferView].buffer;
  outputUri                      = gltf.buffers[outputBuffer].uri;

  var promise1 = ajax(indicesUri).then(function(response) {
    vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(response, indicesBufferViewByteOffset, indicesAccessorElementCount * indicesAccessorCount), gl.STATIC_DRAW);
  }, function(error) {
    console.error("Failed!", error);
  });

  var promise2 = ajax(positionUri).then(function(response) {
    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(response, positionBufferViewByteOffset, positionAccessorElementCount * positionAccessorCount), gl.STATIC_DRAW);
  }, function(error) {
    console.error("Failed!", error);
  });

  var promise3 = ajax(inputUri).then(function(response) {
    // times = [0.0, 0.25, 0.5, 0.75, 1.0];
    times = new Float32Array(response, inputAccessorByteOffset, inputAccessorElementCount * inputAccessorCount);
  }, function(error) {
    console.error("Failed!", error);
  });

  var promise4 = ajax(outputUri).then(function(response) {
    // rotations = [
    //   [0.0, 0.0, 0.0, 1.0 ],
    //   [0.0, 0.0, 0.707, 0.707],
    //   [0.0, 0.0, 1.0, 0.0],
    //   [0.0, 0.0, 0.707, -0.707],
    //   [0.0, 0.0, 0.0, 1.0]
    // ];
    for ( var i = 0; i < outputAccessorCount; i++ ) {
      rotations.push( new Float32Array(response, outputAccessorByteOffset + 16 * i, 4));
    }
  }, function(error) {
    console.error("Failed!", error);
  });
   
  Promise.all([promise1, promise2, promise3, promise4]).then(function(){
    animate();
  });
}

var fps = 30;
var frameTime = 1000 / fps;
var lastTimeRender = +new Date();

function animate() {
    var now = new Date();
    requestAnimationFrame(animate);

    if (now - lastTimeRender < frameTime) {
      return;
    }
    render();
    lastTimeRender = new Date();
}

function getKeyframePositionPairByTime(time) {
  var result = {time1:0, time2:0, pos1:0, pos2:0};
  for ( var i = 0; i < times.length; i++ ) {
    var pos1 = i;
    var pos2 = i < (times.length-1) ? i + 1 : 0;
    var time1 = times[pos1];
    var time2 = times[pos2];
    if ( time >= time1 && time < time2 ) {
      return {time1: time1, time2: time2, pos1: pos1, pos2: pos2};
    }
  }
  return result;
}

function getQuaternionPairByTime(time) {
  var keyframePositionPair = getKeyframePositionPairByTime(time);
  var time1 = keyframePositionPair.time1;
  var time2 = keyframePositionPair.time2;
  var pos1 = keyframePositionPair.pos1;
  var pos2 = keyframePositionPair.pos2;
  q1.set(rotations[pos1]);
  q2.set(rotations[pos2]);
  return {time1: time1, time2: time2, q1:q1, q2:q2};
}

function getRotationDataByTime(time) {
  var quaternionPair = getQuaternionPairByTime(time);
  var time1 = quaternionPair.time1;
  var time2 = quaternionPair.time2;
  var deltaTime = (time - time1)/(time2-time1);
   
  quat.slerp(q, q1, q2, deltaTime);
  
  return q;
}

var rad = 0;
var time = 0;

function render() {
  //rad += Math.PI * 1.0 / 180.0;
  mat3.identity(nMatrix);
  mat4.perspective(pMatrix, 45, c.width / c.height, 0.1, 100.0);
  mat4.identity(mvMatrix);

  var translation = vec3.create();
  translation.set([0.0, 0.0, -2.0]);
  q = getRotationDataByTime(time);
  time += 0.01;
  if ( time >= 1.0 ) {
    time = 0;
  }
  
  mat4.fromRotationTranslation(mvMatrix, q, translation);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  gl.vertexAttribPointer(aLoc["position"], 3, gl.FLOAT, false, 0, 0);

  mat3.normalFromMat4(nMatrix, mvMatrix);
  gl.uniformMatrix3fv(uLoc["normalMatrix"], false, nMatrix);
  gl.uniformMatrix4fv(uLoc["projectionMatrix"], false, pMatrix);
  gl.uniformMatrix4fv(uLoc["modelViewMatrix"], false, mvMatrix);

  gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);

  gl.flush();
}

window.onload = function() {
  glTips(); // glTips をグローバル呼び出し可能とする

  initWebGL();
  initShaders();
};
