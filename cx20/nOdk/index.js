// forked from cx20's "[簡易版] WebGL 2.0 でテクスチャ付き立方体を回転させてみるテスト" http://jsdo.it/cx20/6Hfz
// forked from cx20's "[簡易版] WebGL 2.0 で立方体を回転させてみるテスト" http://jsdo.it/cx20/gMEb
// forked from cx20's "[簡易版] WebGL 2.0 で四角形に色を付けてみるテスト" http://jsdo.it/cx20/k8ar
// forked from cx20's "[簡易版] WebGL 2.0 で三角形に色を付けてみるテスト" http://jsdo.it/cx20/yNd0
// forked from cx20's "[簡易版] WebGL 2.0 を試してみるテスト" http://jsdo.it/cx20/tYEN
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c, gl;
var aLoc = [];
var uLoc = [];
var vao;

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("webgl2") || c.getContext("experimental-webgl2");
    gl.enable(gl.DEPTH_TEST);
    vao = gl.createVertexArray();  
    resizeCanvas();
    window.addEventListener("resize", function(){
        resizeCanvas();
    });
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
    console.log(gl.getShaderInfoLog(vs));
    console.log(gl.getShaderInfoLog(fs));
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "textureCoord");
    uLoc[0] = gl.getUniformLocation(p, "uPMatrix");
    uLoc[1] = gl.getUniformLocation(p, "uMVMatrix");
    uLoc[2]  = gl.getUniformLocation(p, "uTexture");
}

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

var vertexPositionBuffer;
var coordBuffer
var vertexIndexBuffer;

function initBuffers() {
    gl.bindVertexArray(vao);  

    vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aLoc[0]);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    coordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coordBuffer);
    var textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aLoc[1]);
    gl.vertexAttribPointer(aLoc[1], 2, gl.FLOAT, false, 0, 0);
    
    vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    var indices = [
         0,  1,  2,    0,  2 , 3,  // Front face
         4,  5,  6,    4,  6 , 7,  // Back face
         8,  9, 10,    8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15,  // Bottom face
        16, 17, 18,   16, 18, 19,  // Right face
        20, 21, 22,   20, 22, 23   // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    var img = new Image();
    var texture;
    img.onload = function(){
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
    //img.src = "frog.jpg";
    img.src = "../../assets/A/k/w/j/AkwjW.jpg";  // 256x256
}

var rad = 0;
function draw() {

    rad += Math.PI * 1.0 / 180.0;
    mat4.perspective(pMatrix, 45, 465 / 465, 0.1, 100.0);
    mat4.identity(mvMatrix);
    var translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, -2.0);
    mat4.translate(mvMatrix, mvMatrix, translation);
    mat4.rotate(mvMatrix, mvMatrix, rad, [1, 1, 1]);

    gl.bindVertexArray(vao);
    
    gl.uniformMatrix4fv(uLoc[0], false, pMatrix);
    gl.uniformMatrix4fv(uLoc[1], false, mvMatrix);

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    gl.flush();
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

initWebGL();
initShaders();
initBuffers();
animate();