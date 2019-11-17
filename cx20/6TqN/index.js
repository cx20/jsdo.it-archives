// forked from cx20's "[WebGL] glMatrix でクォータニオンを試してみるテスト" http://jsdo.it/cx20/gJ6T
// forked from cx20's "[簡易版] WebGL でテクスチャ付き立方体を回転させてみるテスト（glMatrix.js v2.x編）" http://jsdo.it/cx20/jqD6
// forked from cx20's "[簡易版] WebGL で立方体にテクスチャを貼り付けてみるテスト" http://jsdo.it/cx20/uMVp
// forked from cx20's "[簡易版] WebGL で立方体に色を付けてみるテスト" http://jsdo.it/cx20/FPzz
// forked from cx20's "[簡易版] WebGL で立方体を回転させてみるテスト" http://jsdo.it/cx20/kj5U
// forked from cx20's "[簡易版] WebGL で立方体を描いてみるテスト" http://jsdo.it/cx20/dokR
// forked from cx20's "[簡易版] WebGL でピラミッドを描いてみるテスト" http://jsdo.it/cx20/h1aF
// forked from cx20's "[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その２）" http://jsdo.it/cx20/gydx
// forked from cx20's "[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その１）" http://jsdo.it/cx20/konT
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// WebGL variable
var c, gl;
var aLoc = [];
var uLoc = [];

var mvMatrix;
var pMatrix;
var qMatrix;
var translation;
var scale;
var view;

var vertexPositionBuffer;
var coordBuffer
var vertexIndexBuffer;
var rad = 0;

var eye;
var center;
var up;
var q;

// oimo variable
var world;
var oimoGround;
var oimoBox;

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
    gl.enable(gl.DEPTH_TEST);

    resizeCanvas();
    window.addEventListener("resize", function(){
        resizeCanvas();
    });

    mvMatrix = mat4.create();
    pMatrix = mat4.create();
    qMatrix = mat4.create();
    mat4.perspective(pMatrix, 45, c.width / c.height, 0.1, 1000.0);
    translation = vec3.create();
    scale = vec3.create();
    
    eye = vec3.create();
    center = vec3.create();
    up = vec3.create();
    vec3.set(eye, 0, 50, 200);
    vec3.set(center, 0, 0, 0);
    vec3.set(up, 0, 1, 0);
    view = mat4.create();
    mat4.lookAt(view, eye, center, up);
    mat4.multiply(pMatrix, pMatrix, view);
    q = quat.create();
    quat.identity(q);
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    gl.viewport(0, 0, c.width, c.height);
    //gl.viewport(window.innerWidth/2 - c.height/2, 0, c.height, c.height); // TODO: Temporarily adjusted to square for full screen display
}

function initWorld() {
    world = new OIMO.World({ 
        timestep: 1/60 * 2, 
        iterations: 8, 
        broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: [0,-9.8,0] 
    });
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
    aLoc[1] = gl.getAttribLocation(p, "textureCoord");
    uLoc[0] = gl.getUniformLocation(p, "pjMatrix");
    uLoc[1] = gl.getUniformLocation(p, "mvMatrix");
    uLoc[2]  = gl.getUniformLocation(p, "texture");
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
}

function initBuffers() {
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
    var data = [ 
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
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

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, coordBuffer);
    gl.vertexAttribPointer(aLoc[1], 2, gl.FLOAT, false, 0, 0);
}

function addGround() {
    oimoGround = world.add({
        type: "box",
        size: [200, 4, 200],
        pos: [0, 0, 0],
        rot: [0, 0, 0],
        move: false,
        density: 1
    });
}

function addBox() {
    oimoBox = world.add({
        type: "box",
        size: [50, 50, 50],
        pos: [0, 100, 0],
        rot: [10, 10, 10],
        move: true,
        density: 1
    });
}

function draw() {
    var p;
    var r;
    world.step();
    rad += Math.PI * 1.0 / 180.0;

    // Camera
    vec3.set(eye, 200 * Math.sin(rad), 50, 200 * Math.cos(rad));
    vec3.set(center, 0, 0, 0);
    vec3.set(up, 0, 1, 0);
    mat4.lookAt(view, eye, center, up);
    mat4.perspective(pMatrix, 45, c.width / c.height, 0.1, 1000.0);
    mat4.multiply(pMatrix, pMatrix, view);

    // Ground
    mat4.identity(mvMatrix);
    p = oimoGround.getPosition();
    r = oimoGround.getQuaternion();
    vec3.set(scale, 200, 4, 200);
    vec3.set(translation, p.x, p.y, p.z);
    mat4.translate(mvMatrix, mvMatrix, translation);
    q = quat.fromValues(r.x, r.y, r.z, r.w);
    mat4.fromQuat(mvMatrix, q);
    mat4.scale(mvMatrix, mvMatrix, scale);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    gl.uniformMatrix4fv(uLoc[0], false, pMatrix);
    gl.uniformMatrix4fv(uLoc[1], false, mvMatrix);

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

    // Box
    mat4.identity(mvMatrix);
    vec3.set(scale, 50.0, 50.0, 50.0);
    p = oimoBox.getPosition();
    r = oimoBox.getQuaternion();
    vec3.set(translation, p.x, p.y, p.z);
    mat4.translate(mvMatrix, mvMatrix, translation);
    q = quat.fromValues(r.x, r.y, r.z, r.w);
    mat4.fromQuat(qMatrix, q);
    mat4.multiply(mvMatrix, mvMatrix, qMatrix);
    mat4.scale(mvMatrix, mvMatrix, scale);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
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
initWorld();
initShaders();
initBuffers();
addGround();
addBox();
animate();
