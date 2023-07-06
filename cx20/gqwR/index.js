// forked from cx20's "[WebGL] SpectorJS を試してみるテスト（three.js編）" http://jsdo.it/cx20/s2ix
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）（その４）" http://jsdo.it/cx20/2XDY
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）（その３）" http://jsdo.it/cx20/yv6Z
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）（その２）" http://jsdo.it/cx20/vryW
// forked from cx20's "[WebGL] three.js を試してみるテスト（BufferGeometry編）" http://jsdo.it/cx20/yCyD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let container;
let camera, scene, renderer;
let geometry;
let uniforms = {};
let material;
let mesh;
let rad = 0.0;

//let spector = new SPECTOR.Spector();

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;
    scene = new THREE.Scene();

    // 立方体の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //         [7]------[6]
    //        / |      / |
    //      [3]------[2] |
    //       |  |     |  |
    //       | [4]----|-[5]
    //       |/       |/
    //      [0]------[1]
    //
    let vertexPositions = [
            // Front face
            [-0.5, -0.5,  0.5], // v0
            [ 0.5, -0.5,  0.5], // v1
            [ 0.5,  0.5,  0.5], // v2
            [-0.5,  0.5,  0.5], // v3
            // Back face
            [-0.5, -0.5, -0.5], // v4
            [ 0.5, -0.5, -0.5], // v5
            [ 0.5,  0.5, -0.5], // v6
            [-0.5,  0.5, -0.5], // v7
            // Top face
            [ 0.5,  0.5,  0.5], // v2
            [-0.5,  0.5,  0.5], // v3
            [-0.5,  0.5, -0.5], // v7
            [ 0.5,  0.5, -0.5], // v6
            // Bottom face
            [-0.5, -0.5,  0.5], // v0
            [ 0.5, -0.5,  0.5], // v1
            [ 0.5, -0.5, -0.5], // v5
            [-0.5, -0.5, -0.5], // v4
            // Right face
            [ 0.5, -0.5,  0.5], // v1
            [ 0.5,  0.5,  0.5], // v2
            [ 0.5,  0.5, -0.5], // v6
            [ 0.5, -0.5, -0.5], // v5
            // Left face
            [-0.5, -0.5,  0.5], // v0
            [-0.5,  0.5,  0.5], // v3
            [-0.5,  0.5, -0.5], // v7
            [-0.5, -0.5, -0.5]  // v4
    ];
    const vertices = new Float32Array(vertexPositions.length * 3);
    for (let i = 0; i < vertexPositions.length; i++) {
        vertices[i * 3 + 0] = vertexPositions[i][0];
        vertices[i * 3 + 1] = vertexPositions[i][1];
        vertices[i * 3 + 2] = vertexPositions[i][2];
    }
    let texcoord = new Float32Array([
        // Front face
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        // Back face
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        // Top face
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        // Bottom face
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        // Right face
        1, 0,
        0, 0,
        0, 1,
        1, 1,
        // Left face
        1, 0,
        0, 0,
        0, 1,
        1, 1
    ]);
    
    const indices = new Uint16Array([
         0,  1,  2,    0,  2 , 3,  // Front face
         4,  5,  6,    4,  6 , 7,  // Back face
         8,  9, 10,    8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15,  // Bottom face
        16, 17, 18,   16, 18, 19,  // Right face
        20, 21, 22,   20, 22, 23   // Left face
    ]);
    
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(texcoord, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    const loader = new THREE.TextureLoader();
    const texture = loader.load('../../assets/A/k/w/j/AkwjW.jpg'); // frog.jpg
    uniforms = {
        texture : { type: "t", value: texture }  // frog.jpg
    };

    material = new THREE.RawShaderMaterial({
        vertexShader: document.getElementById('vs').textContent,
        fragmentShader: document.getElementById('fs').textContent,
        side: THREE.DoubleSide,
        uniforms: uniforms
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    //spector.displayUI();
    
    renderer.render(scene, camera);
    renderer.info.programs[0].program.__SPECTOR_rebuildProgram = rebuildProgram;

}

function rebuildProgram(vertexSourceCode,  fragmentSourceCode, onCompiled, onError)
{
    scene.remove(mesh);
    material = new THREE.RawShaderMaterial({
        vertexShader: vertexSourceCode,
        fragmentShader: fragmentSourceCode,
        side: THREE.DoubleSide,
        uniforms: uniforms
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}


function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    rad += Math.PI * 1.0 / 180.0
    mesh.rotation.x = rad;
    mesh.rotation.y = rad;
    mesh.rotation.z = rad;
    renderer.render(scene, camera);
}


