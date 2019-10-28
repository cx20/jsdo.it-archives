// forked from cx20's "[WebGL] Processing.js でスライム曲面を描いてみるテスト" http://jsdo.it/cx20/ktw0
// forked from cx20's "[WebGL] Processing.js で Wave Ball を描いてみるテスト" http://jsdo.it/cx20/SVEe
// forked from cx20's "[WebGL] Processing.js でトーラスを描いてみるテスト" http://jsdo.it/cx20/6Qrb
// forked from cx20's "[WebGL] Processing.js でリンゴ曲面を描いてみるテスト" http://jsdo.it/cx20/oyuL7
// forked from cx20's "[WebGL] Processing.js で貝殻曲面を描いてみるテスト" http://jsdo.it/cx20/QyLv
// forked from cx20's "[WebGL] Processing.js でローマ曲面を描いてみるテスト" http://jsdo.it/cx20/AXqw
// forked from cx20's "[WebGL] Processing.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/qLuh
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
        p.rotate(angle, angle, angle/10, 1);
        p.scale(300);

       // ハート曲面の座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        //p.beginShape(p.LINE_STRIP);
        p.beginShape(p.POINTS);
        p.strokeWeight(2.0);
        var num = 16;
        for (var i = -Math.PI * num; i <= Math.PI * num; i++) {
            for (var j = -num; j <= num; j++) {
                var theta = i / num;
                var z0 = j / num;
                var r = 4 * Math.sqrt(1 - z0 * z0) * Math.pow(Math.sin(Math.abs(theta)), Math.abs(theta));
                var x1 = r * Math.sin(theta);
                var y1 = r * Math.cos(theta);
                var z1 = z0;
                var x2 = x1 / 8;
                var y2 = y1 / 8;
                var z2 = z1 / 8;
                p.stroke((x2+1.0)*255, (y2+0.5)*255, (z2+0.5)*255);
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
