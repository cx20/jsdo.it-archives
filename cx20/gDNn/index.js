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
            mode: "tri_strip",
            vtx_at: ["position", "color"],
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
            vtx: [
                // position      color
                // ------------  -------------------
                -0.5, 0.5, 0.0,  1.0, 0.0, 0.0, 1.0,
                 0.5, 0.5, 0.0,  0.0, 1.0, 0.0, 1.0,
                -0.5,-0.5, 0.0,  0.0, 0.0, 1.0, 1.0,
                 0.5,-0.5, 0.0,  1.0, 1.0, 0.0, 1.0
            ],
            idx: [
                0, 1, 2, 3
            ]
        }
    }]
};
var wwg = new WWG();
wwg.init(document.getElementById('screen1'));
resizeCanvas();
window.addEventListener("resize", function(){
    resizeCanvas();
});

function resizeCanvas() {
    wwg.can.width = window.innerWidth;
    wwg.can.height = window.innerHeight;
    wwg.gl.viewport(0, 0, wwg.can.width, wwg.can.height);
}

var r = wwg.createRender();
r.setRender(render).then(function() {
    console.log(r);
    r.draw();
}).catch(function(err) {
    console.log(err);
});