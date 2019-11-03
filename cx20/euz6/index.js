// forked from cx20's "[WebGL] webgl-utils.js を試してみるテスト（その３）" http://jsdo.it/cx20/6GRf
// forked from cx20's "[WebGL] webgl-utils.js を試してみるテスト（その２）" http://jsdo.it/cx20/hSkH
// forked from cx20's "[WebGL] webgl-utils.js を試してみるテスト" http://jsdo.it/cx20/d23X
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c = document.getElementById("c");
var gl = getWebGLContext(c);
var programInfo = createProgramInfo(gl, ["vs", "fs"]);

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
var arrays = {
    position: { 
        numComponents: 3,
        data: [ 
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
        ]
    },
    texcoord: [
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
    ],
    indices: [ 
         0,  1,  2,    0,  2 , 3,  // Front face
         4,  5,  6,    4,  6 , 7,  // Back face
         8,  9, 10,    8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15,  // Bottom face
        16, 17, 18,   16, 18, 19,  // Right face
        20, 21, 22,   20, 22, 23   // Left face
    ]
};

var mapping = {
    position: "position",
    texcoord: "texcoord"
};

var tex = gl.createTexture();
var img = new Image();
img.onload = function(){
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
};
img.src = "../../assets/A/k/w/j/AkwjW.jpg";  // frog.jpg

var uniforms = {
    u_texture: tex
};

var bufferInfo = createBufferInfoFromArrays(gl, arrays, mapping);

var projection = makePerspective(30 * Math.PI / 180, c.clientWidth / c.clientHeight, 0.5, 1000);
var eye = [0, 0, -4];
var target = [0, 0, 0];
var up = [0, 1, 0];

var camera = makeLookAt(eye, target, up);
var view = makeInverse(camera);
var viewProjection = matrixMultiply(view, projection);
    
var rad = 0;
function render() {
    rad += Math.PI * 1.0 / 180.0;

    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var world = makeIdentity();
    world = matrixMultiply(world, makeXRotation(rad));
    world = matrixMultiply(world, makeYRotation(rad));
    world = matrixMultiply(world, makeZRotation(rad));
    uniforms.u_worldViewProjection = matrixMultiply(world, viewProjection);

    gl.useProgram(programInfo.program);
    setBuffersAndAttributes(gl, programInfo.attribSetters, bufferInfo);
    setUniforms(programInfo.uniformSetters, uniforms);
    gl.drawElements(gl.TRIANGLES, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(render);
}

render();
