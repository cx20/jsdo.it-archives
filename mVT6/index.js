// forked from cx20's "[WebGL] ライブラリを使わずに glTF Tutorial のサンプルを読み込んでみるテスト" http://jsdo.it/cx20/qaa2
// forked from cx20's "[WebGL] ライブラリを使わずに glTF 2.0 データを表示してみるテスト（調整中）" http://jsdo.it/cx20/cFNR
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var indicesAccessor              = 0;
var indicesAccessorBufferView    = 0;
var indicesAccessorCount         = 0;
var indicesBufferViewByteLength  = 0;
var indicesBufferViewByteOffset  = 0;
var indicesBufferViewByteStride  = 0;
var indicesBufferViewBuffer      = 0;
var indicesType                  = 0;
var indicesUri                   = "";

var positionAccessor             = 0;
var positionAccessorBufferView   = 0;
var positionAccessorCount        = 0;
var positionBufferViewByteOffset = 0;
var positionBufferViewByteStride = 0;
var positionBufferViewBuffer     = 0;
var positionType                 = 0;
var positionUri                  = "";

var c, gl;
var aLoc = {};
var uLoc = {};
var vertexPositionBuffer;
var vertexNormalBuffer;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var nMatrix = mat3.create();
var q = quat.create();

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
  // Safari 対策
  if ( url.match(/^data:application\/octet-stream;base64,/) ){
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

function load() {
  //          +------------------------------ accessors[0] : indices    ( 6 bytes =  2 bytes * 3)
  //          |               +-------------- accessors[1] : POSITION   (36 bytes = 12 bytes * 3)
  //          |               |        
  // +----------------+--------------+
  // |  accessors[0]  | accessors[1] |
  // +----------------+--------------+
  // | bufferViews[0] |bufferViews[1]|
  // +----------------+--------------+
  // |           buffers[0]          |
  // +-------------------------------+
  //
  // |[0][1]....[4][5]|[6][7]....[41]|
  // |<--- 6 bytes -->|<- 36 bytes ->|
  // |<------------- 42 bytes ------>|
  
  // <componentType>
  // 5123 ... gl.UNSIGNED_SHORT
  // 5126 ... gl.FLOAT

  //   "accessors": [
  //     {
  //       "bufferView": 0,
  //       "componentType": 5123,
  //       "count": 3,
  //       "max": [2],
  //       "min": [0],
  //       "type": "SCALAR"
  //     },
  //
  indicesAccessor              = gltf.meshes[0].primitives[0].indices;
  indicesAccessorBufferView    = gltf.accessors[indicesAccessor].bufferView;
  indicesAccessorCount         = gltf.accessors[indicesAccessor].count;
  indicesBufferViewByteLength  = gltf.bufferViews[indicesAccessorBufferView].byteLength;
  indicesBufferViewByteOffset  = gltf.bufferViews[indicesAccessorBufferView].byteOffset;
  indicesBufferViewByteStride  = gltf.bufferViews[indicesAccessorBufferView].byteStride;
  indicesBufferViewBuffer      = gltf.bufferViews[indicesAccessorBufferView].buffer;
  indicesType                  = gltf.buffers[indicesBufferViewBuffer].type;
  indicesUri                   = gltf.buffers[indicesBufferViewBuffer].uri;
  
  positionAccessor             = gltf.meshes[0].primitives[0].attributes.POSITION;
  positionAccessorBufferView   = gltf.accessors[positionAccessor].bufferView;
  positionAccessorCount        = gltf.accessors[positionAccessor].count;
  positionBufferViewByteOffset = gltf.bufferViews[positionAccessorBufferView].byteOffset;
  positionBufferViewByteStride = 0; // gltf.bufferViews[positionAccessorBufferView].byteStride;
  positionBufferViewBuffer     = gltf.bufferViews[positionAccessorBufferView].buffer;
  positionType                 = gltf.buffers[positionBufferViewBuffer].type;
  positionUri                  = gltf.buffers[positionBufferViewBuffer].uri;

  var promise1 = ajax(positionUri, positionType).then(function(response) {
    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(response), gl.STATIC_DRAW);
  }, function(error) {
    console.error("Failed!", error);
  });

  var promise2 = ajax(indicesUri, indicesType).then(function(response) {
    vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(response, indicesBufferViewByteOffset, indicesBufferViewByteLength), gl.STATIC_DRAW);
  }, function(error) {
    console.error("Failed!", error);
  });

  Promise.all([promise1, promise2]).then(function(){
    animate();
  });
}

var fps = 5;
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

var rad = 0;
var rotations = [
    [0.0, 0.0, 0.0, 1.0 ],
    [0.0, 0.0, 0.707, 0.707],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.707, -0.707],
//    [0.0, 0.0, 0.0, 1.0]
];
var keyframePosition = 0;

function render() {
  //rad += Math.PI * 1.0 / 180.0;
  mat3.identity(nMatrix);
  mat4.perspective(pMatrix, 45, c.width / c.height, 0.1, 100.0);
  mat4.identity(mvMatrix);

/*
  var translation = vec3.create();
  vec3.set(translation, 0.0, 0.0, -2.0);
  mat4.translate(mvMatrix, mvMatrix, translation);
  mat4.rotate(mvMatrix, mvMatrix, rad, [1, 1, 1]);
*/
  var translation = vec3.create();
  translation.set([0.0, 0.0, -2.0]);
  //q.set([0.0, 0.0, 0.707, 0.707]);
  q.set(rotations[keyframePosition]);
  if (keyframePosition < (rotations.length-1) ) {
    keyframePosition++;
  } else {
    keyframePosition = 0;
  }
  mat4.fromRotationTranslation(mvMatrix, q, translation);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  gl.vertexAttribPointer(aLoc["position"], 3, gl.FLOAT, false, positionBufferViewByteStride, positionBufferViewByteOffset);
  //gl.vertexAttribPointer(aLoc["position"], 3, gl.FLOAT, false, 8, 0);

  mat3.normalFromMat4(nMatrix, mvMatrix);
  gl.uniformMatrix3fv(uLoc["normalMatrix"], false, nMatrix);
  gl.uniformMatrix4fv(uLoc["projectionMatrix"], false, pMatrix);
  gl.uniformMatrix4fv(uLoc["modelViewMatrix"], false, mvMatrix);

  gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
  //gl.drawElements(gl.POINTS, 3, gl.UNSIGNED_SHORT, 0);

  gl.flush();
}

window.onload = function() {
  glTips(); // glTips をグローバル呼び出し可能とする

  initWebGL();
  initShaders();
  //initBuffers();
  //render();
};