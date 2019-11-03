// forked from cx20's "[WebGL] PhiloGL を試してみるテスト（その３）" http://jsdo.it/cx20/pbs2
// forked from cx20's "[WebGL] PhiloGL を試してみるテスト（その２）" http://jsdo.it/cx20/dpi3
// forked from cx20's "PhiloGL を試してみるテスト" http://jsdo.it/cx20/bfyq
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function webGLStart() {
    var cube = new PhiloGL.O3D.Model({
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
        vertices: [ 
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
        ],
        texCoords: [
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
            0.0, 1.0
        ],
        indices: [
             0,  1,  2,    0,  2 , 3,  // Front face
             4,  5,  6,    4,  6 , 7,  // Back face
             8,  9, 10,    8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15,  // Bottom face
            16, 17, 18,   16, 18, 19,  // Right face
            20, 21, 22,   20, 22, 23   // Left face
        ]
    });
 
    PhiloGL('c', {
        program: {
            from: 'ids',
            vs: 'vs',
            fs: 'fs'
        },
        textures: {
            src: ['../../assets/A/k/w/j/AkwjW.jpg'] // frog.jpg
        },
        onLoad: function(app) {
            var gl = app.gl,
                program = app.program,
                camera = app.camera,
                view = new PhiloGL.Mat4,
                rad = 0; 

            gl.enable(gl.DEPTH_TEST);
            camera.view.id();
            
            function animate() {
                draw();
                PhiloGL.Fx.requestAnimationFrame(animate);
            }
            
            function draw() {
                rad += Math.PI * 1.0 / 180.0;
                cube.position.set(0, 0, -3);
                cube.rotation.set(rad, rad, rad);
                cube.update();
                view.mulMat42(camera.view, cube.matrix);
                program.setBuffers({
                    'position': {value: cube.vertices, size: 3},
                    'texcoord': {value: cube.texCoords, size: 2},
                    'indices': {value: cube.indices, bufferType: gl.ELEMENT_ARRAY_BUFFER, size: 1}
                });
                program.setTexture('/assets/A/k/w/j/AkwjW.jpg'); // frog.jpg
                program.setUniform('uMVMatrix', view);
                program.setUniform('uPMatrix', camera.projection);
                program.setUniform('texture', 0);
                gl.drawElements(gl.TRIANGLES, cube.indices.length, gl.UNSIGNED_SHORT, 0);
            }
          
            animate();
        }
    });
}

webGLStart();