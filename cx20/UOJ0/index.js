// forked from cx20's "[WebGL] Grimoire.js で小惑星を表示させてみるテスト（フラットシェーディング編）" http://jsdo.it/cx20/WLYg
// forked from cx20's "[WebGL] Grimoire.js で小惑星を表示させてみるテスト" http://jsdo.it/cx20/UkgF
// forked from cx20's "[WebGL] Grimoire.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/SM1B
// forked from cx20's "[WebGL] Grimoire.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/8Fx0
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

// Module that exposes all the core funcionality of the Draco decoder.
const DracoModule = Module;

var isInitialized = false;
var isDracoLoaded = false;

var g_positions;
var g_indices;

var Vector3 = gr.lib.math.Vector3;
var Quaternion = gr.lib.math.Quaternion;

var GLExtRequestor = gr.lib.fundamental.Resource.GLExtRequestor;
GLExtRequestor.request("OES_element_index_uint");
GLExtRequestor.request("OES_standard_derivatives");
var Geometry = gr.lib.fundamental.Geometry.Geometry;
gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1',
      converter: 'Number',
    },
  },
  $mount: function () {
     this.phi = 0;
     //this.isInitialized = false;
     //this.isDracoLoaded = false;
     loadOneModel();
  },
  $update: function () {
    if ( !isInitialized && isDracoLoaded ) {
      var gl = this.node.companion.get("gl");
      var geometry = new Geometry(gl);
      geometry.addAttributes(g_positions, {POSITION:{size: 3}});
      geometry.addIndex("default", g_indices, WebGLRenderingContext.TRIANGLES);
      gr("#canvas")("mesh").setAttribute("geometry", geometry);
      isInitialized = true;
    }

      if (isInitialized) {
          this.phi += this.getAttribute('speed');
          // オイラー角による回転
          //this.node.setAttribute('rotation', this.phi + ',' + this.phi + ',' + 0);
          
          // クォータニオンによる回転
          var axis = new Vector3(1, 1, 1);
          var angle = this.phi * Math.PI / 180;
          var q = Quaternion.angleAxis(angle, axis);
          this.node.setAttribute('rotation', q.normalize());
      }
  },
});

gr(function () {
  var $$ = gr('#canvas');
  $$('mesh').addComponent('Rotate');
});

function loadOneModel() {
    let draco_file = new XMLHttpRequest();
    //draco_file.open("GET", "throw_14.drc", true);
    //draco_file.open("GET", "http://jsrun.it/assets/6/E/0/L/6E0Lv", true); // Itokawa Hayabusa 50k poly.drc
    draco_file.open("GET", "../assets/k/y/x/g/kyxge.drc", true); // Itokawa Hayabusa 200k poly.drc
    draco_file.responseType = "arraybuffer";
    draco_file.send();
    draco_file.onload = function(e) {
        loadGeometry(draco_file.response);
        isDracoLoaded = true;
    }
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

    g_positions = new Float32Array(positions);
    g_indices = new Uint32Array(indices);
}
