// forked from cx20's "[WebGL] Processing.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/qLuh
// forked from cx20's "[WebGL] Processing.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/qLmr
// forked from cx20's "[WebGL] Processing.js を試してみるテスト（JavaScript編）" http://jsdo.it/cx20/yRfJ
// forked from cx20's "[WebGL] Processing.js を試してみるテスト（組み込み言語編）" http://jsdo.it/cx20/xde6
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function sketchProc(p) {
    var angle = 0.0;
    var theta = 0.0;

    p.setup = function() {
        p.size(465, 465, p.P3D);
        p.background(255, 255, 255);
        p.noFill();
    }

    p.draw = function() {
        theta += Math.PI * 1/180;
        angle += Math.PI / 180;
        p.background(0, 0, 0);
        p.translate(p.width/2.0, p.height/2.0, -100);
        p.rotateX(45);
        p.rotateZ(angle);
        p.scale(200);

        // 3次元関数の座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        p.beginShape(p.POINTS);
        for ( var j = -10; j < 10; j += 0.2 ) {
            for ( var i = -10; i < 10; i += 0.2) {
                var x = i;
                var y = j;
                var z = Math.sin(Math.sqrt(x*x+y*y) + theta)/Math.sqrt(x*x+y*y);
                var x2 = x / 10;
                var y2 = y / 10;
                var z2 = z / 2;
                p.stroke((x2+0.5)*255, (y2+0.5)*255, (z2+0.5)*255);
                p.vertex(x2, y2, z2);
            }
        }
        p.endShape();
    }
}

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var myp = new Processing(canvas, sketchProc);
}
