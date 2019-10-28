// forked from cx20's "[WebGL] Processing.js を試してみるテスト（JavaScript編）" http://jsdo.it/cx20/yRfJ
// forked from cx20's "[WebGL] Processing.js を試してみるテスト（組み込み言語編）" http://jsdo.it/cx20/xde6
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function sketchProc(p) {
    var angle = 0.0;

    p.setup = function() {
        p.size(465, 465, p.P3D);
        p.background(255, 255, 255);
        p.noFill();
    }

    p.draw = function() {
        angle += Math.PI / 180;
        p.background(0, 0, 0);
        p.translate(p.width/2.0, p.height/2.0, -100);
        p.rotateX(angle);
        p.rotateY(angle);
        p.scale(200);

        // 正弦波×余弦波の座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        //             [3]
        //         [4]     [2]
        //      [5]            [1]
        //      *                *
        //     [6]              [0]
        //      *                *
        //      [7]            [11]
        //         [8]     [10]
        //             [9]
        //
        var MAX = 24;
        var A = 1.0;
        var B = 2.0;
        p.beginShape(p.LINE_STRIP);
        for ( var i = 0; i <= MAX; i++ ) {
            var x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
            var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
            var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
            p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
            p.vertex(x, y, z);
        }
        p.endShape();
    }
}

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var myp = new Processing(canvas, sketchProc);
}

