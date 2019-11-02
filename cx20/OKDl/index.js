// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var c, gl;
var aLoc = [];
var fps = 1000 / 30;

function initWebGL() {
    c = document.getElementById("c");
    // WebGL1 コンテキストを取得
    gl = getWebGL1Context(c);                               // glTips#getWebGL1Context()
    resizeCanvas();
    window.addEventListener("resize", function(){
        resizeCanvas();
    });
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    gl.viewport(0, 0, c.width, c.height);
}

function initShaders() {
    var vsText = document.getElementById("vs").textContent;
    var fsText = document.getElementById("fs").textContent;
/*
    // WebGLShader オブジェクトを文字列を元に準備
    var vs = compileShader(gl, gl.VERTEX_SHADER, vsText);     // glTips#compileShader()
    var fs = compileShader(gl, gl.FRAGMENT_SHADER, fsText);   // glTips#compileShader()
    // WebGLProgram オブジェクトをセットアップ
    var p = setupShaderProgram(gl, vs, fs);                   // glTips#setupShaderProgram()
*/
    // WebGLProgram オブジェクトを文字列を元にセットアップ
    var p = setupShaderProgramFromSource(gl, vsText, fsText); // glTips#setupShaderProgramFromSource()
    
    // WebGLProgram オブジェクトをアクティブにする
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    gl.enableVertexAttribArray(aLoc[0]);
}

function initBuffers() {
    var positions = [ 
         0.0, 0.5, 0.0, // v0 
        -0.5,-0.5, 0.0, // v1
         0.5,-0.5, 0.0  // v2
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
}

function render() {
    draw();
    requestAnimationFrame(render);
}

function draw() {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    gl.flush();
}

window.onload = function() {
    glTips(); // glTips をグローバル呼び出し可能とする

    initWebGL();
    initShaders();
    initBuffers();
    render();
};
