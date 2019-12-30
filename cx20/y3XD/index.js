// forked from cx20's "three.js で DRACO 形式のデータを表示してみるテスト" http://jsdo.it/cx20/MvND
// forked from "three.js webgl - loaders - Draco loader" https://storage.googleapis.com/demos.webmproject.org/draco/draco_loader_throw.html

// Module that exposes all the core funcionality of the Draco decoder.
const DracoModule = Module;

let container;
let camera, scene, renderer;
let cameraTarget;
let mouseX = 0, mouseY = 0;
let angle = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let start_time;

init();
//animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    
    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
    camera.position.set(3, 3, 1);
    cameraTarget = new THREE.Vector3( 0, 0, 0 );
    
    scene = new THREE.Scene();
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.35);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    
    start_time = performance.now();
    
    loadOneModel();
}


function loadOneModel() {
    let draco_file = new XMLHttpRequest();
    //draco_file.open("GET", "throw_14.drc", true);
    //draco_file.open("GET", "http://jsrun.it/assets/6/E/0/L/6E0Lv", true); // Itokawa Hayabusa 50k poly.drc
    draco_file.open("GET", "../../assets/k/y/x/g/kyxge.drc", true); // Itokawa Hayabusa 200k poly.drc
    draco_file.responseType = "arraybuffer";
    draco_file.send();
    draco_file.onload = function(e) {
        loadGeometry(draco_file.response);
        animate();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    const timer = Date.now() * 0.001;
    //camera.position.x = 3.5;
    //camera.position.z = 3.5;
    //camera.position.y = 1.5;
    camera.lookAt(cameraTarget);
    
    let mesh = scene.getObjectByName("model");

    // quaternion
    let axis = new THREE.Vector3(0.2,0.4,0.8).normalize();
    let q = new THREE.Quaternion();
    q.setFromAxisAngle(axis, timer);
    mesh.quaternion.copy(q);
    
    renderer.render(scene, camera);
}

function loadGeometry(raw_data) {
    const dracoLoader = new THREE.DRACOLoader();
    const bufferGeometry = dracoLoader.decodeDracoFile(raw_data);
    const material = new THREE.MeshStandardMaterial({vertexColors: THREE.VertexColors});
    //const material = new THREE.MeshStandardMaterial({vertexColors: THREE.VertexColors, shading: THREE.SmoothShading});
    //const material = new THREE.MeshStandardMaterial({vertexColors: THREE.VertexColors, shading: THREE.FlatShading});
    //const material = new THREE.MeshPhongMaterial({vertexColors: THREE.VertexColors});
    //const material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});    
    bufferGeometry.computeVertexNormals();
    let geometry = new THREE.Mesh(bufferGeometry, material);
    geometry.scale.multiplyScalar(5);
    geometry.name = "model";
    scene.add(geometry);
}

// ----------------------------------
// DRACOLoader.js
// ----------------------------------

// Copyright 2016 The Draco Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
THREE.DRACOLoader = function(manager) {
    this.manager = (manager !== undefined) ? manager :
        THREE.DefaultLoadingManager;
    this.materials = null;
};


THREE.DRACOLoader.prototype = {

    constructor: THREE.DRACOLoader,

    load: function(url, onLoad, onProgress, onError) {
        const scope = this;
        const loader = new THREE.FileLoader(scope.manager);
        loader.setPath(this.path);
        loader.setResponseType('arraybuffer');
        loader.load(url, function(blob) {
            onLoad(scope.decodeDracoFile(blob));
        }, onProgress, onError);
    },

    setPath: function(value) {
        this.path = value;
    },

    decodeDracoFile: function(rawBuffer) {
        const scope = this;
        /*
         * Here is how to use Draco Javascript decoder and get the geometry.
         */
        const buffer = new DracoModule.DecoderBuffer();
        buffer.Init(new Int8Array(rawBuffer), rawBuffer.byteLength);
        const wrapper = new DracoModule.WebIDLWrapper();

        /*
         * Determine what type is this file, mesh or point cloud.
         */
        const geometryType = wrapper.GetEncodedGeometryType(buffer);
        if (geometryType == DracoModule.TRIANGULAR_MESH) {
          fileDisplayArea.innerText = "Loaded a mesh.\n";
        } else if (geometryType == DracoModule.POINT_CLOUD) {
          fileDisplayArea.innerText = "Loaded a point cloud.\n";
        } else {
          const errorMsg = "Error: Unknown geometry type.";
          fileDisplayArea.innerText = errorMsg;
          throw new Error(errorMsg);
        }
        return scope.convertDracoGeometryTo3JS(wrapper, geometryType, buffer);
    },

    convertDracoGeometryTo3JS: function(wrapper, geometryType, buffer) {
        let dracoGeometry;
        if (geometryType == DracoModule.TRIANGULAR_MESH) {
          dracoGeometry = wrapper.DecodeMeshFromBuffer(buffer);
        } else {
          dracoGeometry = wrapper.DecodePointCloudFromBuffer(buffer);
        }
        DracoModule.destroy(buffer);
        /*
         * Example on how to retrieve mesh and attributes.
         */
        let numFaces, numPoints, numVertexCoordinates, numAttributes;
        // For output basic geometry information.
        let geometryInfoStr;
        if (geometryType == DracoModule.TRIANGULAR_MESH) {
          numFaces = dracoGeometry.num_faces();
          geometryInfoStr += "Number of faces loaded: " + numFaces.toString()
              + ".\n";
        } else {
          numFaces = 0;
        }
        numPoints = dracoGeometry.num_points();
        numVertexCoordinates = numPoints * 3;
        numAttributes = dracoGeometry.num_attributes();
        geometryInfoStr = "Number of points loaded: " + numPoints.toString()
            + ".\n";
        geometryInfoStr += "Number of attributes loaded: " +
            numAttributes.toString() + ".\n";

        // Get position attribute. Must exists.
        const posAttId = wrapper.GetAttributeId(dracoGeometry,
                                                Module.POSITION);
        if (posAttId == -1) {
          const errorMsg = "No position attribute found in the mesh.";
          fileDisplayArea.innerText = errorMsg;
          DracoModule.destroy(wrapper);
          DracoModule.destroy(dracoGeometry);
          throw new Error(errorMsg);
        }
        const posAttribute = wrapper.GetAttribute(dracoGeometry, posAttId);
        const posAttributeData = new DracoModule.DracoFloat32Array();
        wrapper.GetAttributeFloatForAllPoints(
            dracoGeometry, posAttribute, posAttributeData);
        // Get color attributes if exists.
        const colorAttId = wrapper.GetAttributeId(dracoGeometry, Module.COLOR);
        let colAttributeData;
        if (colorAttId != -1) {
          geometryInfoStr += "\nLoaded color attribute.\n";
          const colAttribute = wrapper.GetAttribute(dracoGeometry, colorAttId);
          colAttributeData = new DracoModule.DracoFloat32Array();
          wrapper.GetAttributeFloatForAllPoints(dracoGeometry, colAttribute,
                                                colAttributeData);
        }

        // Get normal attributes if exists.
        const normalAttId =
            wrapper.GetAttributeId(dracoGeometry, Module.NORMAL);
        let norAttributeData;
        if (normalAttId != -1) {
          geometryInfoStr += "\nLoaded normal attribute.\n";
          const norAttribute = wrapper.GetAttribute(dracoGeometry, normalAttId);
          norAttributeData = new DracoModule.DracoFloat32Array();
          wrapper.GetAttributeFloatForAllPoints(dracoGeometry, norAttribute,
                                                norAttributeData);
        }

        // Structure for converting to THREEJS geometry later.
        const geometryBuffer = {
            indices: [],
            vertices: [],
            normals: [],
            uvs: [],
            colors: []
        };
        for (let i = 0; i < numVertexCoordinates; i += 3) {
            geometryBuffer.vertices.push(
                posAttributeData.GetValue(i),
                posAttributeData.GetValue(i + 1),
                posAttributeData.GetValue(i + 2));
            // Add color.
            if (colorAttId != -1) {
              geometryBuffer.colors.push(
                  colAttributeData.GetValue(i),
                  colAttributeData.GetValue(i + 1),
                  colAttributeData.GetValue(i + 2));
            } else {
              // Default is white.
              geometryBuffer.colors.push(1.0, 1.0, 1.0);
            }
            // Add normal.
            if (normalAttId != -1) {
              geometryBuffer.normals.push(
                  norAttributeData.GetValue(i),
                  norAttributeData.GetValue(i + 1),
                  norAttributeData.GetValue(i + 2));
            }
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
            geometryBuffer.indices.push(
                ia.GetValue(0), ia.GetValue(1), ia.GetValue(2));
          }
          DracoModule.destroy(ia);
        }
        DracoModule.destroy(wrapper);
        DracoModule.destroy(dracoGeometry);

        fileDisplayArea.innerText += geometryInfoStr;

        // Import data to Three JS geometry.
        const geometry = new THREE.BufferGeometry();
        if (geometryType == DracoModule.TRIANGULAR_MESH) {
          geometry.setIndex(new(geometryBuffer.indices.length > 65535 ?
                THREE.Uint32BufferAttribute : THREE.Uint16BufferAttribute)
              (geometryBuffer.indices, 1));
        }
        geometry.addAttribute('position',
            new THREE.Float32BufferAttribute(geometryBuffer.vertices, 3));
        geometry.addAttribute('color',
            new THREE.Float32BufferAttribute(geometryBuffer.colors, 3));
        if (normalAttId != -1) {
          geometry.addAttribute('normal',
              new THREE.Float32BufferAttribute(geometryBuffer.normals, 3));
        }
        return geometry;
    }
};