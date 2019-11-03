// forked from cx20's "PhiloGL を試してみるテスト" http://jsdo.it/cx20/bfyq
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function webGLStart() {
    PhiloGL("c", {
        program: {
            from: "ids",
            vs: "vs",
            fs: "fs"
        },
        onLoad: function(app) {
            var gl = app.gl,
                program = app.program;

            program.setBuffers({
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
                "square": {
                    attribute: "position",
                    value: new Float32Array([
                        -0.5, 0.5, 0.0, // v0
                         0.5, 0.5, 0.0, // v1 
                        -0.5,-0.5, 0.0, // v2
                         0.5,-0.5, 0.0  // v3
                    ]),
                    size: 3
                },
                "squareColor": {
                    attribute: "color",
                    value: new Float32Array([
                         1.0, 0.0, 0.0, 1.0, // v0
                         0.0, 1.0, 0.0, 1.0, // v1
                         0.0, 0.0, 1.0, 1.0, // v2
                         1.0, 1.0, 0.0, 1.0  // v3
                    ]),
                    size: 4
                },
            });

            program.setBuffer("square");
            program.setBuffer("squareColor");
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
    });
}

webGLStart();