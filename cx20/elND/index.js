// forked from cx20's "[WebGL] SpectorJS を試してみるテスト（WebGL編）" http://jsdo.it/cx20/crNT
// forked from cx20's "[簡易版] WebGL でテクスチャ付き立方体を回転させてみるテスト（glMatrix.js v2.x編）" http://jsdo.it/cx20/jqD6
// forked from cx20's "[簡易版] WebGL で立方体にテクスチャを貼り付けてみるテスト" http://jsdo.it/cx20/uMVp
// forked from cx20's "[簡易版] WebGL で立方体に色を付けてみるテスト" http://jsdo.it/cx20/FPzz
// forked from cx20's "[簡易版] WebGL で立方体を回転させてみるテスト" http://jsdo.it/cx20/kj5U
// forked from cx20's "[簡易版] WebGL で立方体を描いてみるテスト" http://jsdo.it/cx20/dokR
// forked from cx20's "[簡易版] WebGL でピラミッドを描いてみるテスト" http://jsdo.it/cx20/h1aF
// forked from cx20's "[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その２）" http://jsdo.it/cx20/gydx
// forked from cx20's "[簡易版] WebGL で変換行列を用いて三角形を傾けてみるテスト（その１）" http://jsdo.it/cx20/konT
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function SimpleRenderer() {
    this.c = null;
    this.gl = null;
    this.aLoc = [];
    this.uLoc = [];

    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();

    this.vertexPositionBuffer = null;
    this.coordBuffer = null;
    this.vertexIndexBuffer = null;

    this.rad = 0;
}

SimpleRenderer.prototype.initWebGL = function() {
    this.c = document.getElementById("c");
    this.gl = this.c.getContext("experimental-webgl");
    this.gl.enable(this.gl.DEPTH_TEST);
};

SimpleRenderer.prototype.initShaders = function(vertexSourceCode, fragmentSourceCode) {
    this.p = this.gl.createProgram();
    this.vs = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.v = document.getElementById("vs").textContent;
    this.f = document.getElementById("fs").textContent;
    if ( vertexSourceCode !== undefined ) {
        this.v = vertexSourceCode;
    }
    if ( fragmentSourceCode !== undefined ) {
        this.f = fragmentSourceCode;
    }
    this.gl.shaderSource(this.vs, this.v);
    this.gl.shaderSource(this.fs, this.f);
    this.gl.compileShader(this.vs);
    this.gl.compileShader(this.fs);
    this.gl.attachShader(this.p, this.vs);
    this.gl.attachShader(this.p, this.fs);
    this.gl.linkProgram(this.p);
    this.gl.useProgram(this.p);
    this.aLoc[0] = this.gl.getAttribLocation(this.p, "position");
    this.aLoc[1] = this.gl.getAttribLocation(this.p, "textureCoord");
    this.uLoc[0] = this.gl.getUniformLocation(this.p, "pjMatrix");
    this.uLoc[1] = this.gl.getUniformLocation(this.p, "mvMatrix");
    this.uLoc[2]  = this.gl.getUniformLocation(this.p, "texture");
    this.gl.enableVertexAttribArray(this.aLoc[0]);
    this.gl.enableVertexAttribArray(this.aLoc[1]);

    this.p.__SPECTOR_rebuildProgram = rebuildProgram;
};

SimpleRenderer.prototype.rebuildShaders = function(vertexSourceCode, fragmentSourceCode) {
    this.gl.detachShader(this.p, this.vs);
    this.gl.detachShader(this.p, this.fs);
    this.gl.deleteShader(this.vs);
    this.gl.deleteShader(this.fs);
    this.gl.deleteProgram(this.p);
    this.initShaders(vertexSourceCode, fragmentSourceCode);
}

SimpleRenderer.prototype.initBuffers = function() {
    this.vertexPositionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
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
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.aLoc[0], 3, this.gl.FLOAT, false, 0, 0);

    this.coordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordBuffer);
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
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.aLoc[1], 2, this.gl.FLOAT, false, 0, 0);
    
    this.vertexIndexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
    var indices = [
         0,  1,  2,    0,  2 , 3,  // Front face
         4,  5,  6,    4,  6 , 7,  // Back face
         8,  9, 10,    8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15,  // Bottom face
        16, 17, 18,   16, 18, 19,  // Right face
        20, 21, 22,   20, 22, 23   // Left face
    ];
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

    var img = new Image();
    var texture;
    var _gl = this.gl;
    img.onload = function(){
        texture = _gl.createTexture();
        _gl.bindTexture(_gl.TEXTURE_2D, texture);
        _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, img);
        _gl.generateMipmap(_gl.TEXTURE_2D);
    };
    //img.src = "frog.jpg";
    img.src = "../../assets/A/k/w/j/AkwjW.jpg";  // 256x256
};

SimpleRenderer.prototype.draw = function() {

    this.rad += Math.PI * 1.0 / 180.0;
    mat4.perspective(this.pMatrix, 45, 465 / 465, 0.1, 100.0);
    mat4.identity(this.mvMatrix);
    var translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, -2.0);
    mat4.translate(this.mvMatrix, this.mvMatrix, translation);
    mat4.rotate(this.mvMatrix, this.mvMatrix, this.rad, [1, 1, 1]);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    this.gl.vertexAttribPointer(this.aLoc[0], 3, this.gl.FLOAT, false, 0, 0);
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordBuffer);
    this.gl.vertexAttribPointer(this.aLoc[1], 2, this.gl.FLOAT, false, 0, 0);
    
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
    this.gl.uniformMatrix4fv(this.uLoc[0], false, this.pMatrix);
    this.gl.uniformMatrix4fv(this.uLoc[1], false, this.mvMatrix);

    this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);
    this.gl.flush();
};

SimpleRenderer.prototype.animate = function(callback) {
    this.draw();
    requestAnimationFrame(this.animate.bind(this, callback));
};

var render = new SimpleRenderer();
render.initWebGL();
render.initShaders();
render.initBuffers();
render.animate();

function rebuildProgram(vertexSourceCode,  fragmentSourceCode, onCompiled, onError)
{
    render.rebuildShaders(vertexSourceCode, fragmentSourceCode);
    //render.animate();
}
