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
                "triangle": {
                    attribute: "position",
                    value: new Float32Array([
                         0.0,  0.5, 0.0, // v0
                        -0.5, -0.5, 0.0, // v1
                         0.5, -0.5, 0.0  // v2
                    ]),
                    size: 3
                }
            });

            program.setBuffer("triangle");
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
    });
}

webGLStart();