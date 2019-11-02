// forked from cx20's "[WebGL] WWG.js を試してみるテスト（その２）" http://jsdo.it/cx20/gDNn
// forked from cx20's "[WebGL] WWG.js を試してみるテスト" http://jsdo.it/cx20/E96S
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var render = {
    env: {
        clear_color: [1.0, 1.0, 1.0, 1.0]
    },
    vshader: {
        text: document.getElementById('vshader').innerText
    },
    fshader: {
        text: document.getElementById('fshader').innerText
    },
    vs_uni: {
        mvpMatrix: [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    },
    model: [{
        geo: {
            mode: "tri", // TRIANGLES
            vtx_at: ["position", "color"],
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
            vtx: [
                // Front face
                -0.5, -0.5,  0.5,   1.0, 0.0, 0.0, 1.0,
                 0.5, -0.5,  0.5,   1.0, 0.0, 0.0, 1.0,
                 0.5,  0.5,  0.5,   1.0, 0.0, 0.0, 1.0,
                -0.5,  0.5,  0.5,   1.0, 0.0, 0.0, 1.0,
                // Back face
                -0.5, -0.5, -0.5,   1.0, 1.0, 0.0, 1.0,
                 0.5, -0.5, -0.5,   1.0, 1.0, 0.0, 1.0,
                 0.5,  0.5, -0.5,   1.0, 1.0, 0.0, 1.0,
                -0.5,  0.5, -0.5,   1.0, 1.0, 0.0, 1.0,
                // Top face
                 0.5,  0.5,  0.5,   0.0, 1.0, 0.0, 1.0,
                -0.5,  0.5,  0.5,   0.0, 1.0, 0.0, 1.0,
                -0.5,  0.5, -0.5,   0.0, 1.0, 0.0, 1.0,
                 0.5,  0.5, -0.5,   0.0, 1.0, 0.0, 1.0,
                // Bottom face
                -0.5, -0.5,  0.5,   1.0, 0.5, 0.5, 1.0,
                 0.5, -0.5,  0.5,   1.0, 0.5, 0.5, 1.0,
                 0.5, -0.5, -0.5,   1.0, 0.5, 0.5, 1.0,
                -0.5, -0.5, -0.5,   1.0, 0.5, 0.5, 1.0,
                 // Right face
                 0.5, -0.5,  0.5,   1.0, 0.0, 1.0, 1.0,
                 0.5,  0.5,  0.5,   1.0, 0.0, 1.0, 1.0,
                 0.5,  0.5, -0.5,   1.0, 0.0, 1.0, 1.0,
                 0.5, -0.5, -0.5,   1.0, 0.0, 1.0, 1.0,
                 // Left face
                -0.5, -0.5,  0.5,   0.0, 0.0, 1.0, 1.0,
                -0.5,  0.5,  0.5,   0.0, 0.0, 1.0, 1.0,
                -0.5,  0.5, -0.5,   0.0, 0.0, 1.0, 1.0,
                -0.5, -0.5, -0.5,   0.0, 0.0, 1.0, 1.0
            ],
            idx: [
                 0,  1,  2,    0,  2 , 3,  // Front face
                 4,  5,  6,    4,  6 , 7,  // Back face
                 8,  9, 10,    8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15,  // Bottom face
                16, 17, 18,   16, 18, 19,  // Right face
                20, 21, 22,   20, 22, 23   // Left face
            ]
        }
    }]
};

var wwg = new WWG();
var can = document.getElementById('screen1');
wwg.init(can);
var r = wwg.createRender();
var p = {
    camRX: 30,
    camRY: -30,
    rotX: 0,
    rotY: 0,
    ofsY: 0
};
r.setRender(render).then(function() {
    var st = new Date().getTime();
    var lt = st;
    (function loop() {
        window.requestAnimationFrame(loop);
        var ct = new Date().getTime();
        var tint = (ct - st);
        //if ((ct - lt) < 60) return;

        r.draw({
            vs_uni: {
                mvpMatrix: new CanvasMatrix4().
                    rotate(tint / 20 - 90, 1, 1, 0).    // rotate(angle,x,y,z)
                    lookat(0, 0, 3, 0, 0, 0, 0, 1, 0).  // lookat(eyex, eyey, eyez, centerx, centery, centerz, upx, upy, upz)
                    perspective(40, 1.0, 0.1, 1000).    // perspective(fovy, aspect, zNear, zFar)
                    getAsWebGLFloatArray()
            }
        });
        lt = ct;
    })();
}).catch(function(err) {
    console.log(err);
});