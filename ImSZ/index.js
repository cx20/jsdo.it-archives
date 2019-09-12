// forked from cx20's "[WebGL] glTF Tutorial のサンプルを自力で読み込んでみるテスト（その４）" http://jsdo.it/cx20/0jvT
// forked from cx20's "[WebGL] glTF Tutorial のサンプルを自力で読み込んでみるテスト（その３）" http://jsdo.it/cx20/kCl8
// forked from cx20's "[WebGL] glTF Tutorial のサンプルを自力で読み込んでみるテスト（その２）" http://jsdo.it/cx20/So4v
// forked from cx20's "[WebGL] ライブラリを使わずに glTF Tutorial のサンプルを読み込んでみるテスト" http://jsdo.it/cx20/qaa2
// forked from cx20's "[WebGL] ライブラリを使わずに glTF 2.0 データを表示してみるテスト（調整中）" http://jsdo.it/cx20/cFNR
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var indicesAccessor              = 0;
var indicesAccessorBufferView    = 0;
var indicesAccessorByteOffset    = 0;
var indicesAccessorCount         = 0;
var indicesAccessorType          = "";
var indicesAccessorElementCount  = 0;
var indicesBufferViewByteLength  = 0;
var indicesBufferViewByteOffset  = 0;
var indicesBufferViewByteStride  = 0;
var indicesBufferViewBuffer      = 0;
var indicesUri                   = "";

var positionAccessor             = 0;
var positionAccessorBufferView   = 0;
var positionAccessorByteOffset   = 0;
var positionAccessorCount        = 0;
var positionAccessorType         = "";
var positionAccessorElementCount = 0;
var positionBufferViewByteLength = 0;
var positionBufferViewByteOffset = 0;
var positionBufferViewByteStride = 0;
var positionBufferViewBuffer     = 0;
var positionUri                  = 0;

var texCoordAccessor             = 0;
var texCoordAccessorBufferView   = 0;
var texCoordAccessorByteOffset   = 0;
var texCoordAccessorCount        = 0;
var texCoordAccessorType         = "";
var texCoordAccessorElementCount = 0;
var texCoordBufferViewByteOffset = 0;
var texCoordBufferViewByteStride = 0;
var texCoordBufferViewBuffer     = 0;
var texCoordUri                  = "";

var baseColorFactor = [0, 0, 0, 0];
var metallicFactor = 0;
var roughnessFactor = 0;

var c, gl;
var aLoc = {};
var uLoc = {};
var vertexPositionBuffer;
var vertexNormalBuffer;
var vertexTexCoordBuffer;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var nMatrix = mat3.create();

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
  aLoc["texCoord"]         = gl.getAttribLocation(p, "a_texCoord");
  uLoc["modelViewMatrix"]  = gl.getUniformLocation(p, "u_modelViewMatrix");
  uLoc["normalMatrix"]     = gl.getUniformLocation(p, "u_normalMatrix");
  uLoc["projectionMatrix"] = gl.getUniformLocation(p, "u_projectionMatrix");
  uLoc["texture"]          = gl.getUniformLocation(p, "u_texture");
  gl.enableVertexAttribArray(aLoc["position"]);
  gl.enableVertexAttribArray(aLoc["texCoord"]);
    
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
  //          +---------------------------------------------------- accessors[0] : indices    (12 bytes =  2 bytes * 1 * 6)
  //          |               +------------------------------------ accessors[1] : POSITION   (48 bytes =  4 bytes * 3 * 4)
  //          |               |             +---------------------- accessors[2] : TEXCOORD_0 (32 bytes =  4 bytes * 2 * 4)
  //          |               |             |
  // +----------------+--------------+--------------+
  // |  accessors[0]  | accessors[1] | accessors[2] |
  // +----------------+--------------+--------------+
  //          |               |             |
  // +----------------+-----------------------------+
  // | bufferViews[0] |         bufferViews[1]      |
  // +----------------+-----------------------------+
  //          |                       |
  // +----------------+-----------------------------+
  // |                   buffers[0]                 |
  // +----------------------------------------------+
  //
  // |[0][1]..[10][11]|[12][13]..[47]|[48][49].[107]|
  // |<-- 12 bytes -->|<---------- 96 bytes ------->|
  // |<----------------- 108 bytes ---------------->|
  
  //  "accessors" : [ 
  //  {
  //    "bufferView" : 0,
  //    "byteOffset" : 0,
  //    "componentType" : 5123,  // gl.UNSIGNED_SHORT
  //    "count" : 6,
  //    "type" : "SCALAR",
  //    "max" : [ 3 ],
  //    "min" : [ 0 ]
  //  }
  indicesAccessor              = gltf.meshes[0].primitives[0].indices;
  indicesAccessorBufferView    = gltf.accessors[indicesAccessor].bufferView;
  indicesAccessorCount         = gltf.accessors[indicesAccessor].count;
  indicesAccessorType          = gltf.accessors[indicesAccessor].type;
  indicesAccessorElementCount  = getElementCountByTypeName(indicesAccessorType);
  indicesBufferViewByteLength  = gltf.bufferViews[indicesAccessorBufferView].byteLength;
  indicesBufferViewByteOffset  = gltf.bufferViews[indicesAccessorBufferView].byteOffset;
  indicesBufferViewByteStride  = gltf.bufferViews[indicesAccessorBufferView].byteStride;
  indicesBufferViewBuffer      = gltf.bufferViews[indicesAccessorBufferView].buffer;
  indicesUri                   = gltf.buffers[indicesBufferViewBuffer].uri;

  //  "accessors": [
  //    ...
  //  {
  //    "bufferView" : 1,
  //    "byteOffset" : 0,
  //    "componentType" : 5126,  // gl.FLOAT
  //    "count" : 4,
  //    "type" : "VEC3",
  //    "max" : [ 1.0, 1.0, 0.0 ],
  //    "min" : [ 0.0, 0.0, 0.0 ]
  //  }
  positionAccessor             = gltf.meshes[0].primitives[0].attributes.POSITION;
  positionAccessorBufferView   = gltf.accessors[positionAccessor].bufferView;
  positionAccessorByteOffset   = gltf.accessors[positionAccessor].byteOffset;
  positionAccessorCount        = gltf.accessors[positionAccessor].count;
  positionAccessorType         = gltf.accessors[positionAccessor].type;
  positionAccessorElementCount = getElementCountByTypeName(positionAccessorType);
  positionBufferViewByteLength = gltf.bufferViews[positionAccessorBufferView].byteLength;
  positionBufferViewByteOffset = gltf.bufferViews[positionAccessorBufferView].byteOffset;
  positionBufferViewByteStride = gltf.bufferViews[positionAccessorBufferView].byteStride;
  positionBufferViewBuffer     = gltf.bufferViews[positionAccessorBufferView].buffer;
  positionUri                  = gltf.buffers[positionBufferViewBuffer].uri;

  //  "accessors": [
  //    ...
  //  {
  //    "bufferView" : 1,
  //    "byteOffset" : 48,
  //    "componentType" : 5126,  // gl.FLOAT
  //    "count" : 4,
  //    "type" : "VEC2",
  //    "max" : [ 1.0, 1.0 ],
  //    "min" : [ 0.0, 0.0 ]
  //  } ],
  //
  texCoordAccessor             = gltf.meshes[0].primitives[0].attributes.TEXCOORD_0;
  texCoordAccessorBufferView   = gltf.accessors[texCoordAccessor].bufferView;
  texCoordAccessorByteOffset   = gltf.accessors[texCoordAccessor].byteOffset;
  texCoordAccessorCount        = gltf.accessors[texCoordAccessor].count;
  texCoordAccessorType         = gltf.accessors[texCoordAccessor].type;
  texCoordAccessorElementCount = getElementCountByTypeName(texCoordAccessorType);
  texCoordBufferViewByteLength = gltf.bufferViews[texCoordAccessorBufferView].byteLength;
  texCoordBufferViewByteOffset = gltf.bufferViews[texCoordAccessorBufferView].byteOffset;
  texCoordBufferViewByteStride = gltf.bufferViews[texCoordAccessorBufferView].byteStride;
  texCoordBufferViewBuffer     = gltf.bufferViews[texCoordAccessorBufferView].buffer;
  texCoordUri                  = gltf.buffers[texCoordBufferViewBuffer].uri;

/*
  baseColorFactor = gltf.materials[0].pbrMetallicRoughness.baseColorFactor;
  metallicFactor  = gltf.materials[0].pbrMetallicRoughness.metallicFactor;
  roughnessFactor = gltf.materials[0].pbrMetallicRoughness.roughnessFactor;
*/
    
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

  var promise3 = ajax(texCoordUri).then(function(response) {
    vertexTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    // TODO: 8 だと NG。要調査
    //  console.log(new Float32Array(response, texCoordBufferViewByteOffset + texCoordAccessorByteOffset, 12));
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(response, texCoordBufferViewByteOffset + texCoordAccessorByteOffset, 8), gl.STATIC_DRAW);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(response, texCoordBufferViewByteOffset + texCoordAccessorByteOffset, 12), gl.STATIC_DRAW);
  }, function(error) {
    console.error("Failed!", error);
  });

  Promise.all([promise1, promise2, promise3]).then(function(){
    var materialAccessor = gltf.meshes[0].primitives[0].material;
    var textureIndex = gltf.materials[0].pbrMetallicRoughness.baseColorTexture.index;
    var textureUri = gltf.images[textureIndex].uri;
  
    var img = new Image();
    var texture;
   img.onload = function(){
      img = resizeImage(img);
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      // "samplers": [
      //   {
      //     "magFilter": 9729, // gl.LINEAR
      //     "minFilter": 9986, // gl.NEAREST_MIPMAP_LINEAR
      //     "wrapS": 10497,    // gl.REPEAT
      //     "wrapT": 10497     // gl.REPEAT
      //   }
      // ],
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.generateMipmap(gl.TEXTURE_2D);
      
      gl.uniform1i(uLoc["texture"], 0);
    
      animate();
    };
    img.src = textureUri;
  });
}

function resizeImage(image) {
    var canvas = document.createElement("canvas");
    canvas.width = resizeTextureSize(image.width);
    canvas.height = resizeTextureSize(image.height);

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas;
}

function resizeTextureSize(value) {
    return Math.pow(2, Math.round(Math.log(value) / Math.LN2));
}

function animate() {
  render();
  requestAnimationFrame(animate);
}

var rad = 0;
function render() {
  //rad += Math.PI * 1.0 / 180.0;
    
  var i = 0;
  for ( i = 0; i < gltf.scenes[0].nodes.length; i++ ) {
    var nodeMesh = gltf.nodes[i].mesh;
    var nodeTranslation = gltf.nodes[i].translation;
    if ( nodeTranslation == undefined ) {
      nodeTranslation = [0, 0, 0];
    }
  
    mat3.identity(nMatrix);
    mat4.perspective(pMatrix, 45, c.width / c.height, 0.1, 100.0);
    mat4.identity(mvMatrix);
  
    var translation = vec3.create();
    vec3.set(translation, nodeTranslation[0], nodeTranslation[1], nodeTranslation[2] - 2 );
    mat4.translate(mvMatrix, mvMatrix, translation);
    mat4.rotate(mvMatrix, mvMatrix, rad, [1, 1, 1]);
  
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.vertexAttribPointer(aLoc["position"], 3, gl.FLOAT, false, 0, 0);
      
  
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
    gl.vertexAttribPointer(aLoc["texCoord"], 2, gl.FLOAT, false, texCoordBufferViewByteStride, 0);
    //gl.vertexAttribPointer(aLoc["texCoord"], 2, gl.FLOAT, false, 0, 0);

    mat3.normalFromMat4(nMatrix, mvMatrix);
    gl.uniformMatrix3fv(uLoc["normalMatrix"], false, nMatrix);
    gl.uniformMatrix4fv(uLoc["projectionMatrix"], false, pMatrix);
    gl.uniformMatrix4fv(uLoc["modelViewMatrix"], false, mvMatrix);
      
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  
    gl.flush();
  }
}

window.onload = function() {
  glTips(); // glTips をグローバル呼び出し可能とする

  initWebGL();
  initShaders();
  //initBuffers();
  //render();
};