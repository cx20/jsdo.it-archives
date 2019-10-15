// forked from cx20's "[簡易版] WebGL で小惑星に光を当ててみるテスト（その３）" http://jsdo.it/cx20/kWuS
// forked from cx20's "[簡易版] WebGL で小惑星に光を当ててみるテスト（その２）" http://jsdo.it/cx20/4pLsS
// forked from cx20's "[簡易版] WebGL で小惑星に光を当ててみるテスト" http://jsdo.it/cx20/yIKo
// forked from cx20's "[簡易版] WebGL で小惑星をプロットしてみるテスト" http://jsdo.it/cx20/qSiE
// forked from cx20's "[簡易版] WebGL で３次元関数をプロットしてみるテスト" http://jsdo.it/cx20/8H2X
// forked from cx20's "[簡易版] WebGL で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/yoSK
// forked from cx20's "[簡易版] WebGL でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/9Dru
// forked from cx20's "[簡易版] WebGL で円を角度をつけて回転させてみるテスト" http://jsdo.it/cx20/5vCG
// forked from cx20's "[簡易版] WebGL で円を描いてみるテスト" http://jsdo.it/cx20/dz02
// forked from cx20's "[簡易版] WebGL でサインカーブを描いてみるテスト" http://jsdo.it/cx20/fPok
// forked from cx20's "[簡易版] WebGL で点をプロットしてみるテスト" http://jsdo.it/cx20/puXG
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// Module that exposes all the core funcionality of the Draco decoder.
const DracoModule = Module;

var c, gl, ext;
var stats;
var indices_length = 0;

var aLoc = [];
var uLoc = [];

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
    ext = gl.getExtension("OES_element_index_uint");
    ext = gl.getExtension('OES_standard_derivatives');
    
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    
    resizeCanvas();
    window.addEventListener("resize", function(){
        resizeCanvas();
    });

    // Stats
    stats = new Stats();
    // 左上に設定
    stats.domElement.style.position = "fixed";
    stats.domElement.style.right    = "5px";
    stats.domElement.style.top      = "5px";
    document.body.appendChild(stats.domElement);
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    //gl.viewport(0, 0, c.width, c.heihgt);
    gl.viewport(window.innerWidth/2 - c.height/2, 0, c.height, c.height); // TODO: Temporarily adjusted to square for full screen display
}

function initShaders() {
    var p = gl.createProgram();
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    var v = document.getElementById("vs").textContent;
    var f = document.getElementById("fs").textContent;
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    uLoc[0] = gl.getUniformLocation(p, 'matAxisX');
    uLoc[1] = gl.getUniformLocation(p, 'matAxisY');
    uLoc[2] = gl.getUniformLocation(p, 'time');
    gl.enableVertexAttribArray(aLoc[0]);
}

function loadOneModel() {
    let draco_file = new XMLHttpRequest();
    //draco_file.open("GET", "throw_14.drc", true);
    //draco_file.open("GET", "../../assets/6/E/0/L/6E0Lv.drc", true); // Itokawa Hayabusa 50k poly.drc
    draco_file.open("GET", "../../assets/k/y/x/g/kyxge.drc", true); // Itokawa Hayabusa 200k poly.drc
    draco_file.responseType = "arraybuffer";
    draco_file.send();
    draco_file.onload = function(e) {
        loadGeometry(draco_file.response);
        animate();
    }
}

function animate() {
    var baseTime = +new Date;
    var time = 0;

    var rad = 0;
    (function(){
        rad += Math.PI * 1.0 / 180.0;

        var c = Math.cos(rad);
        var s = Math.sin(rad);

        // 変換行列を用意
        // x軸で回転
        var matAxisX = [
            1.0, 0.0, 0.0, 0.0,
            0.0,   c,  -s, 0.0,
            0.0,   s,   c, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];
        // y軸で回転
        var matAxisY = [
              c, 0.0,   s, 0.0,
            0.0, 1.0, 0.0, 0.0,
             -s, 0.0,   c, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];
        gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(matAxisX));
        gl.uniformMatrix4fv(uLoc[1], false, new Float32Array(matAxisY));

        // uniform float time 
        time = (+new Date - baseTime) / 1000;
        gl.uniform1f(uLoc[2], time);

        gl.drawElements(gl.TRIANGLES, indices_length, gl.UNSIGNED_INT, 0);
        gl.flush();
        requestAnimationFrame(arguments.callee);

        // stats 更新
        stats.update();
    })();
}

function loadGeometry(raw_data) {
    const buffer = new DracoModule.DecoderBuffer();
    let rawBuffer = raw_data;
    buffer.Init(new Int8Array(rawBuffer), rawBuffer.byteLength);
    const wrapper = new DracoModule.WebIDLWrapper();

    /*
     * Determine what type is this file, mesh or point cloud.
     */
    const geometryType = wrapper.GetEncodedGeometryType(buffer);
    if (geometryType == DracoModule.TRIANGULAR_MESH) {
      console.log("Loaded a mesh.");
    } else if (geometryType == DracoModule.POINT_CLOUD) {
      console.log("Loaded a point cloud.");
    } else {
      console.log("Error: Unknown geometry type.");
    }
    convertDracoGeometryTo3JS(wrapper, geometryType, buffer);
}

function convertDracoGeometryTo3JS(wrapper, geometryType, buffer) {
    let dracoGeometry;
    if (geometryType == DracoModule.TRIANGULAR_MESH) {
      dracoGeometry = wrapper.DecodeMeshFromBuffer(buffer);
    } else {
      dracoGeometry = wrapper.DecodePointCloudFromBuffer(buffer);
    }
    DracoModule.destroy(buffer);

    let numFaces, numPoints, numVertexCoordinates, numAttributes;
    // For output basic geometry information.
    let geometryInfoStr = "";
    if (geometryType == DracoModule.TRIANGULAR_MESH) {
      numFaces = dracoGeometry.num_faces();
      geometryInfoStr += "Number of faces loaded: " + numFaces.toString()
          + ".\n";
    } else {
      numFaces = 0;
    }
    
console.log(geometryInfoStr);

    numPoints = dracoGeometry.num_points();
    count = numPoints;
    numVertexCoordinates = numPoints * 3;
    numAttributes = dracoGeometry.num_attributes();
    geometryInfoStr = "Number of points loaded: " + numPoints.toString() + ".\n";
    geometryInfoStr += "Number of attributes loaded: " +  numAttributes.toString() + ".\n";

    // Get position attribute. Must exists.
    const posAttId = wrapper.GetAttributeId(dracoGeometry, Module.POSITION);
    if (posAttId == -1) {
      const errorMsg = "No position attribute found in the mesh.";
      console.log(errorMsg);
      DracoModule.destroy(wrapper);
      DracoModule.destroy(dracoGeometry);
      throw new Error(errorMsg);
    }
    const posAttribute = wrapper.GetAttribute(dracoGeometry, posAttId);
    const posAttributeData = new DracoModule.DracoFloat32Array();
    wrapper.GetAttributeFloatForAllPoints(dracoGeometry, posAttribute, posAttributeData);
    // Get color attributes if exists.
    const colorAttId = wrapper.GetAttributeId(dracoGeometry, Module.COLOR);
    let colAttributeData;
    if (colorAttId != -1) {
      geometryInfoStr += "\nLoaded color attribute.\n";
      const colAttribute = wrapper.GetAttribute(dracoGeometry, colorAttId);
      colAttributeData = new DracoModule.DracoFloat32Array();
      wrapper.GetAttributeFloatForAllPoints(dracoGeometry, colAttribute, colAttributeData);
    }

    // Get normal attributes if exists.
    const normalAttId = wrapper.GetAttributeId(dracoGeometry, Module.NORMAL);
    let norAttributeData;
    if (normalAttId != -1) {
      geometryInfoStr += "\nLoaded normal attribute.\n";
      const norAttribute = wrapper.GetAttribute(dracoGeometry, normalAttId);
      norAttributeData = new DracoModule.DracoFloat32Array();
      wrapper.GetAttributeFloatForAllPoints(dracoGeometry, norAttribute, norAttributeData);
    }
console.log(geometryInfoStr);

    var positions = [];
    var normals = [];
    var colors = [];
    var indices = [];
    
    for (let i = 0; i < numVertexCoordinates; i += 3) {
        positions.push(posAttributeData.GetValue(i+0));
        positions.push(posAttributeData.GetValue(i+1));
        positions.push(posAttributeData.GetValue(i+2));

    }

    DracoModule.destroy(posAttributeData);
    if (colorAttId != -1)
      DracoModule.destroy(colAttributeData);
    if (normalAttId != -1)
      DracoModule.destroy(norAttributeData);

    // For mesh, we need to generate the faces.
    if (geometryType == DracoModule.TRIANGULAR_MESH) {
      const numIndices = numFaces * 3;
      const ia = new DracoInt32Array();
      for (let i = 0; i < numFaces; ++i) {
        wrapper.GetFaceFromMesh(dracoGeometry, i, ia);
        indices.push(ia.GetValue(0));
        indices.push(ia.GetValue(1));
        indices.push(ia.GetValue(2));
      }
      DracoModule.destroy(ia);
    }
    DracoModule.destroy(wrapper);
    DracoModule.destroy(dracoGeometry);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
    
    indices_length = indices.length;
}

initWebGL();
initShaders();
loadOneModel();
