// forked from cx20's "[WebGL] Processing.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/qLmr
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

        // 3次元リサージュの座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        var MAX = 360;
        var A = 100.0;
        var B = 99.0;
        var C = 1.0;
        var alpha = Math.PI/4;
        var beta  = Math.PI/3;
        var theta = 0; // Math.PI/2;
        p.beginShape(p.LINE_STRIP);
        for ( var i = 0; i <= MAX; i += 0.1 ) {
            var x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
            var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
            var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
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

