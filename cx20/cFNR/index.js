// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var positionAccessor             = 0;
var positionAccessorBufferView   = 0;
var positionAccessorCount        = 0;
var positionBufferViewByteOffset = 0;
var positionBufferViewByteStride = 0;
var positionBufferViewBuffer     = 0;
var positionUri                  = "";

var normalAccessor               = 0;
var normalAccessorBufferView     = 0;
var normalAccessorCount          = 0;
var normalBufferViewByteOffset   = 0;
var normalBufferViewByteStride   = 0;
var normalBufferViewBuffer       = 0;
var normalUri                    = "";

var c, gl;
var aLoc = {};
var uLoc = {};
var vertexPositionBuffer;
var vertexNormalBuffer;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var nMatrix = mat3.create();
var diffuse = [];
var shininess = 0;
var specular = [];

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
  aLoc["normal"]           = gl.getAttribLocation(p, "a_normal");
  uLoc["diffuse"]          = gl.getUniformLocation(p, "u_diffuse");
  uLoc["modelViewMatrix"]  = gl.getUniformLocation(p, "u_modelViewMatrix");
  uLoc["normalMatrix"]     = gl.getUniformLocation(p, "u_normalMatrix");
  uLoc["projectionMatrix"] = gl.getUniformLocation(p, "u_projectionMatrix");
  gl.enableVertexAttribArray(aLoc["position"]);
  gl.enableVertexAttribArray(aLoc["normal"]);
    
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

function load() {
  //          +---------------------------------------------------- accessors[0] : POSITION   (36 bytes = 12 bytes * 3)
  //          |               +------------------------------------ accessors[1] : NORMAL     (36 bytes = 12 bytes * 3)
  //          |               |              +--------------------- accessors[2] : COLOR_0    (36 bytes = 12 bytes * 3)
  //          |               |              |              +------ accessors[3] : TEXCOORD_0 (24 bytes =  8 bytes * 3)
  //          |               |              |              |
  // +----------------+--------------+--------------+--------------+
  // |  accessors[0]  | accessors[1] | accessors[2] | accessors[3] |
  // +----------------+--------------+--------------+--------------+
  // | bufferViews[0] |bufferViews[1]|bufferViews[2]|bufferViews[3]|
  // +----------------+--------------+--------------+--------------+
  // |                          buffers[0]                         |
  // +-------------------------------------------------------------+
  //
  // |[0][1]..[34][35]|[36][37]..[71]|[72][73].[107]|[108]....[131]|
  // |<--- 36 bytes ->|<- 36 bytes ->|<- 36 bytes ->|<- 24 bytes ->|
  // |<------------------------ 132 bytes ------------------------>|
  
  // <componentType>
  // 5123 ... gl.UNSIGNED_SHORT
  // 5126 ... gl.FLOAT

  //   "accessors": [
  //     {
  //       "bufferView": 0,
  //       "componentType": 5126,
  //       "count": 3,
  //       "max": [0.5, 0.5, 0],
  //       "min": [-0.5,-0.5, 0],
  //       "type": "VEC3"
  //     },
  //
  positionAccessor             = gltf.meshes[0].primitives[0].attributes.POSITION;
  positionAccessorBufferView   = gltf.accessors[positionAccessor].bufferView;
  positionAccessorCount        = gltf.accessors[positionAccessor].count;
  positionBufferViewByteOffset = gltf.bufferViews[positionAccessorBufferView].byteOffset;
  positionBufferViewByteStride = gltf.bufferViews[positionAccessorBufferView].byteStride;
  positionBufferViewBuffer     = gltf.bufferViews[positionAccessorBufferView].buffer;
  positionUri                  = gltf.buffers[positionBufferViewBuffer].uri;

  normalAccessor               = gltf.meshes[0].primitives[0].attributes.NORMAL;
  normalAccessorBufferView     = gltf.accessors[normalAccessor].bufferView;
  normalAccessorCount          = gltf.accessors[normalAccessor].count;
  normalBufferViewByteOffset   = gltf.bufferViews[normalAccessorBufferView].byteOffset;
  normalBufferViewByteStride   = gltf.bufferViews[normalAccessorBufferView].byteStride;
  normalBufferViewBuffer       = gltf.bufferViews[normalAccessorBufferView].buffer;
  normalUri                    = gltf.buffers[normalBufferViewBuffer].uri;

  diffuse = new Float32Array(gltf.materials[0].pbrMetallicRoughness.baseColorFactor);

  var promise1 = ajax(positionUri).then(function(response) {
    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(response), gl.STATIC_DRAW);
  }, function(error) {
    console.error("Failed!", error);
  });

  var promise2 = ajax(normalUri).then(function(response) {
    vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(response), gl.STATIC_DRAW);
  }, function(error) {
    console.error("Failed!", error);
  });
  
  Promise.all([promise1, promise2]).then(function(){
    animate();
  });
}

function animate() {
  render();
  requestAnimationFrame(animate);
}

var rad = 0;
function render() {
  //rad += Math.PI * 1.0 / 180.0;
  mat3.identity(nMatrix);
  mat4.perspective(pMatrix, 45, c.width / c.height, 0.1, 100.0);
  mat4.identity(mvMatrix);

  var translation = vec3.create();
  vec3.set(translation, 0.0, 0.0, -2.0);
  mat4.translate(mvMatrix, mvMatrix, translation);
  mat4.rotate(mvMatrix, mvMatrix, rad, [1, 1, 1]);

  gl.uniform4fv(uLoc["diffuse"],  diffuse);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  gl.vertexAttribPointer(aLoc["position"], 3, gl.FLOAT, false, positionBufferViewByteStride, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
  gl.vertexAttribPointer(aLoc["normal"], 3, gl.FLOAT, false, normalBufferViewByteStride, normalBufferViewByteOffset);

  mat3.normalFromMat4(nMatrix, mvMatrix);
  gl.uniformMatrix3fv(uLoc["normalMatrix"], false, nMatrix);
  gl.uniformMatrix4fv(uLoc["projectionMatrix"], false, pMatrix);
  gl.uniformMatrix4fv(uLoc["modelViewMatrix"], false, mvMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, positionAccessorCount);

  gl.flush();
}

window.onload = function() {
  glTips(); // glTips をグローバル呼び出し可能とする

  initWebGL();
  initShaders();
  //initBuffers();
  //render();
};