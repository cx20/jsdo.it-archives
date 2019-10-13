// forked from cx20's "[GLSL] テクスチャを合成してみるテスト（その２）" http://jsdo.it/cx20/U2QP
// forked from cx20's "[GLSL] テクスチャを合成してみるテスト" http://jsdo.it/cx20/wVSQ
// forked from cx20's "[簡易版] WebGL でテクスチャを試してみるテスト" http://jsdo.it/cx20/y4vz
// forked from cx20's "[簡易版] WebGL で四角形に色を付けてみるテスト" http://jsdo.it/cx20/veHj
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
// forked from cx20's "[簡易版] WebGL で四角形に色を付けてみるテスト" http://jsdo.it/cx20/veHj
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c, gl;
var aLoc = [];
var uLoc = [];
var texture0;
var texture1;

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
}

function initShaders() {
    var p = gl.createProgram();
    var v = document.getElementById("vs").textContent;
    var f = document.getElementById("fs").textContent;
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);

    gl.getShaderParameter(fs, gl.COMPILE_STATUS);
    console.log( gl.getShaderInfoLog(fs) );

    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    gl.enableVertexAttribArray(aLoc[0]);
    aLoc[1] = gl.getAttribLocation(p, "color");
    gl.enableVertexAttribArray(aLoc[1]);
    aLoc[2] = gl.getAttribLocation(p, "textureCoord");
    gl.enableVertexAttribArray(aLoc[2]);

    uLoc[0]  = gl.getUniformLocation(p, 'mvpMatrix');
    uLoc[1]  = gl.getUniformLocation(p, 'marsTexture');
    uLoc[2]  = gl.getUniformLocation(p, 'heightMapTexture');
    uLoc[3]  = gl.getUniformLocation(p, 'time');
}

function initBuffers() {
    var data = [ 
        -1.0, 0.5, 0.0, // v0 
         1.0, 0.5, 0.0, // v1
        -1.0,-0.5, 0.0, // v2
         1.0,-0.5, 0.0  // v3
    ];
    
    var color = [ 
         1.0, 1.0, 1.0, 1.0, // v0
         1.0, 1.0, 1.0, 1.0, // v1
         1.0, 1.0, 1.0, 1.0, // v2
         1.0, 1.0, 1.0, 1.0  // v3
    ];

    var textureCoord = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoord), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[2], 2, gl.FLOAT, false, 0, 0);
    
    // 変換行列を用意
    var mvpMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(mvpMatrix));

    // 画像データの読み込み
    var img0 = new Image();
    img0.onload = function(){
        // テクスチャを用意
        texture0 = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img0);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
    //img0.src = "/assets/A/j/X/S/AjXS2.jpg"; // mars.jpg
    img0.src = "../../assets/g/H/E/b/gHEbn.jpg"; // earth.jpg

    var img1 = new Image();
    img1.onload = function(){
        // テクスチャを用意
        texture1 = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img1);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
    //img1.src = "/assets/s/i/i/9/sii9N.jpg"; // mars_heightmap.jpg
    img1.src = "../../assets/2/h/3/H/2h3HU.jpg"; // earth_heightmap.jpg
}


function animate() {
    render();
    requestAnimationFrame(animate);
}

var baseTime = +new Date;
var time = 0;

function render() {
    // uniform float time 
    time = (+new Date - baseTime) / 1000;
    gl.uniform1f(uLoc[3], time);

    // テクスチャユニットを指定してバインドし登録する
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture0);
    gl.uniform1i(uLoc[1], 0);
    
    // テクスチャユニットを指定してバインドし登録する
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.uniform1i(uLoc[2], 1);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.flush();
}

initWebGL();
initShaders();
initBuffers();
animate();
