// forked from cx20's "[WebGL] GLOW.js を試してみるテスト" http://jsdo.it/cx20/5BvD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var container = document.getElementById("container");
var context = new GLOW.Context();
context.setupClear({red:1, green:1, blue:1, alpha:1}); // 白色に設定
context.clear();
container.appendChild(context.domElement);

var squareShader = {
    data: {
        // 正方形の座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        //        [0]------[1]
        //         |        |
        //         |        |
        //         |        |
        //        [2]------[3]
        //
        position: new Float32Array([
            -0.5, 0.5, 0.0, // v0
             0.5, 0.5, 0.0, // v1 
            -0.5,-0.5, 0.0, // v2
             0.5,-0.5, 0.0  // v3
        ]),
        color: new Float32Array([ 
             1.0, 0.0, 0.0, 1.0, // v0
             0.0, 1.0, 0.0, 1.0, // v1
             0.0, 0.0, 1.0, 1.0, // v2
             1.0, 1.0, 0.0, 1.0  // v3
        ])
    },
    primitives: GL.TRIANGLE_STRIP,
    indices: [2, 0, 1, 2, 1, 3], // 暫定的にインデックスバッファで指定するよう対応
    vertexShader: document.getElementById("vs").textContent,
    fragmentShader: document.getElementById("fs").textContent,
};

var shader = new GLOW.Shader(squareShader);
shader.draw();
