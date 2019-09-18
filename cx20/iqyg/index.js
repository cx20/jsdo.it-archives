// forked from cx20's "[WebGL] Babylon.js で消しゴムを表示させてみるテスト" http://jsdo.it/cx20/0yXZ
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（その４）" http://jsdo.it/cx20/wNbW
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（その３）" http://jsdo.it/cx20/o79P
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（その２）" http://jsdo.it/cx20/mJuge
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var cube;
var createScene = function(engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -3), scene);
    cube = new BABYLON.Mesh('cube', scene);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

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
    var positions = [
        // Front face
        -0.5, -0.5,  0.5, // v0
         0.5, -0.5,  0.5, // v1
         0.5,  0.5,  0.5, // v2
        -0.5,  0.5,  0.5, // v3
        // Back face
        -0.5, -0.5, -0.5, // v4
         0.5, -0.5, -0.5, // v5
         0.5,  0.5, -0.5, // v6
        -0.5,  0.5, -0.5, // v7
        // Top face
         0.5,  0.5,  0.5, // v2
        -0.5,  0.5,  0.5, // v3
        -0.5,  0.5, -0.5, // v7
         0.5,  0.5, -0.5, // v6
        // Bottom face
        -0.5, -0.5,  0.5, // v0
         0.5, -0.5,  0.5, // v1
         0.5, -0.5, -0.5, // v5
        -0.5, -0.5, -0.5, // v4
        // Right face
         0.5, -0.5,  0.5, // v1
         0.5,  0.5,  0.5, // v2
         0.5,  0.5, -0.5, // v6
         0.5, -0.5, -0.5, // v5
        // Left face
        -0.5, -0.5,  0.5, // v0
        -0.5,  0.5,  0.5, // v3
        -0.5,  0.5, -0.5, // v7
        -0.5, -0.5, -0.5  // v4
    ];
    var uv = [
		1/4, 2/3, // v0
		2/4, 2/3, // v1
		2/4, 1/3, // v2
		1/4, 1/3, // v3

		4/4, 2/3, // v4
		3/4, 2/3, // v5
		3/4, 1/3, // v6
		4/4, 1/3, // v7

		2/4, 1/3, // v2
		1/4, 1/3, // v3
		1/4, 0/3, // v7
		2/4, 0/3, // v6

		1/4, 2/3, // v0
		2/4, 2/3, // v1
		2/4, 3/3, // v5
		1/4, 3/3, // v4

		2/4, 2/3, // v1
		2/4, 1/3, // v2
		3/4, 1/3, // v6
		3/4, 2/3, // v5

		1/4, 2/3, // v0
		1/4, 1/3, // v3
		0/4, 1/3, // v7
		0/4, 2/3  // v4
    ];
    var indices = [
         0,  1,  2,    0,  2 , 3,  // Front face
         4,  5,  6,    4,  6 , 7,  // Back face
         8,  9, 10,    8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15,  // Bottom face
        16, 17, 18,   16, 18, 19,  // Right face
        20, 21, 22,   20, 22, 23   // Left face
    ];

    cube.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions, true);
    cube.setVerticesData(BABYLON.VertexBuffer.UVKind, uv);
    cube.setIndices(indices);

    var material = new BABYLON.ShaderMaterial("material", scene, {
        vertexElement: "vs",
        fragmentElement: "fs",
    }, {
        attributes: ["position", "uv"],
        uniforms: ["worldViewProjection"]
    });
    
    material.setTexture("texture", new BABYLON.Texture("../../assets/y/w/s/V/ywsV6.jpg", scene)); // earth_texture.png

    cube.material = material;
    cube.material.backFaceCulling = false;

    return scene;
};

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

var rad = 0.0;
engine.runRenderLoop(function () {
    rad += Math.PI * 1.0 / 180.0;
    cube.rotation.x = rad;
    cube.rotation.y = rad;
    //cube.rotation.z = rad;
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});
