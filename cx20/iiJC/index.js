// forked from cx20's "[WebGL] WebGL Helper を試してみるテスト（その３）" http://jsdo.it/cx20/ijP3
// forked from cx20's "[WebGL] WebGL Helper を試してみるテスト（その２）" http://jsdo.it/cx20/AlTE
// forked from cx20's "[WebGL] WebGL Helper を試してみるテスト" http://jsdo.it/cx20/avc4
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c = document.getElementById('c');
var gl = $gl.getGLContext(c);

var prg = $gl.setupProgram({
    vertexShader: $gl.getShaderSourceFromDOM('vs'),
    fragmentShader: $gl.getShaderSourceFromDOM('fs') 
});

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
var position = [
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

var texcoord = [
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
];

var indices = [
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23   // Left face
];

var vbo = $gl.createBuffer($gl.ARRAY_BUFFER, position);
var texcoord_vbo = $gl.createBuffer($gl.ARRAY_BUFFER, texcoord);
var ibo = $gl.createBuffer($gl.ELEMENT_ARRAY_BUFFER, indices);

var texture = $gl.setupTexture('../../assets/A/k/w/j/AkwjW.jpg');  // frog.jpg

var attLoc = [
    gl.getAttribLocation(prg, 'position'),
    gl.getAttribLocation(prg, 'texcoord')
];

var uniLoc  = gl.getUniformLocation(prg, 'u_mvpMatrix');
var uniLoc2 = gl.getUniformLocation(prg, 'texture');

gl.enableVertexAttribArray(attLoc[0]);
gl.enableVertexAttribArray(attLoc[1]);

var angle = 0;
var z = 10;
var projMatrix = mat4.perspective(60, c.clientWidth / c.clientHeight, 1, 100, mat4());
var viewMatrix = mat4.lookAt(vec3(0, 0, z), vec3(0, 0, 0), vec3(0, 1, 0));

function draw() {
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var modelMatrix = mat4();
    var mvpMatrix   = mat4();

    angle = (angle + 1) % 360;
    mat4.rotate(modelMatrix, angle, vec3(1, 1, 1), modelMatrix);
    mat4.scale(modelMatrix, vec3(5, 5, 5), modelMatrix);
    mat4.multiply(projMatrix, viewMatrix, mvpMatrix);
    mat4.multiply(mvpMatrix, modelMatrix, mvpMatrix);
    
    gl.uniformMatrix4fv(uniLoc, false, mvpMatrix);

    $gl.setupBuffer({
        buffer: vbo,
        index: attLoc[0],
        size: 3
    }); 

    $gl.setupBuffer({
        buffer: texcoord_vbo,
        index: attLoc[1],
        size: 2
    });

    //使用するテクスチャをバインド・有効化
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(uniLoc2, texture);

    $gl.setupIndex(ibo);

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    gl.flush();
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();
