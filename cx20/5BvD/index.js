// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container = document.getElementById("container");
var context = new GLOW.Context();
context.setupClear({red:1, green:1, blue:1, alpha:1}); // 白色に設定
context.clear();
container.appendChild(context.domElement);

var triangleShader = {
    data: {
        position: new Float32Array([
             0.0,  0.5, 0.0, // v0
            -0.5, -0.5, 0.0, // v1
             0.5, -0.5, 0.0  // v2
        ]),
    },
    primitives: GL.TRIANGLES,
    vertexShader: document.getElementById("vs").textContent,
    fragmentShader: document.getElementById("fs").textContent,
};

var shader = new GLOW.Shader(triangleShader);
shader.draw();
