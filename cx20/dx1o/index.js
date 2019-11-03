// forked from cx20's "[WebGL] GLOW.js を試してみるテスト（その２改）" http://jsdo.it/cx20/qnRd
// forked from cx20's "[WebGL] GLOW.js を試してみるテスト（その２）" http://jsdo.it/cx20/mNo2
// forked from cx20's "[WebGL] GLOW.js を試してみるテスト" http://jsdo.it/cx20/5BvD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container = document.getElementById("container");
var context = new GLOW.Context();
context.enableCulling(false);
context.setupClear({red:1, green:1, blue:1, alpha:1});
context.clear();
container.appendChild(context.domElement);
GLOW.defaultCamera.localMatrix.setPosition( 0, 0, 3 );
GLOW.defaultCamera.update();

var cubeShader = {
    data: {
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
        position: new Float32Array([
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
        ]),
        color: new Float32Array([ 
            1.0, 0.0, 0.0, 1.0, // Front face
            1.0, 0.0, 0.0, 1.0, // Front face
            1.0, 0.0, 0.0, 1.0, // Front face
            1.0, 0.0, 0.0, 1.0, // Front face
            1.0, 1.0, 0.0, 1.0, // Back face
            1.0, 1.0, 0.0, 1.0, // Back face
            1.0, 1.0, 0.0, 1.0, // Back face
            1.0, 1.0, 0.0, 1.0, // Back face
            0.0, 1.0, 0.0, 1.0, // Top face
            0.0, 1.0, 0.0, 1.0, // Top face
            0.0, 1.0, 0.0, 1.0, // Top face
            0.0, 1.0, 0.0, 1.0, // Top face
            1.0, 0.5, 0.5, 1.0, // Bottom face
            1.0, 0.5, 0.5, 1.0, // Bottom face
            1.0, 0.5, 0.5, 1.0, // Bottom face
            1.0, 0.5, 0.5, 1.0, // Bottom face
            1.0, 0.0, 1.0, 1.0, // Right face
            1.0, 0.0, 1.0, 1.0, // Right face
            1.0, 0.0, 1.0, 1.0, // Right face
            1.0, 0.0, 1.0, 1.0, // Right face
            0.0, 0.0, 1.0, 1.0, // Left face
            0.0, 0.0, 1.0, 1.0, // Left face
            0.0, 0.0, 1.0, 1.0, // Left face
            0.0, 0.0, 1.0, 1.0  // Left face
        ]),
        transform: new GLOW.Matrix4(),
        inverse: GLOW.defaultCamera.inverse,
        projection: GLOW.defaultCamera.projection,
    },
    indices: new Uint16Array([
             0,  1,  2,    0,  2 , 3,  // Front face
             4,  5,  6,    4,  6 , 7,  // Back face
             8,  9, 10,    8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15,  // Bottom face
            16, 17, 18,   16, 18, 19,  // Right face
            20, 21, 22,   20, 22, 23   // Left face
        ]),
    primitives: GL.TRIANGLE,
    vertexShader: document.getElementById("vs").textContent,
    fragmentShader: document.getElementById("fs").textContent,
};

var cube = new GLOW.Shader(cubeShader);

function animate() {
    draw();
    requestAnimationFrame(animate);
}

var rad = Math.PI * 1.0 / 180.0;
function draw() {
    context.cache.clear();
    cube.transform.addRotation( rad, rad, rad );
    cube.draw();
}

animate();
