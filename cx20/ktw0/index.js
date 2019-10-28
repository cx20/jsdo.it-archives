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
        p.rotate(60, 1, 0, 0);
        p.rotate(angle, angle, angle, 1);
        p.scale(300);

        // スライムの座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        //p.beginShape(p.POINTS);
        p.beginShape(p.LINE_STRIP);
        p.strokeWeight(1.0);
        var a = 1;
        var b = 1;
        var c = 1;
        var r = 1;
        var ustep = Math.PI * 5 / 180;
        var vstep = Math.PI * 5 / 180;
        for (var v = -Math.PI/2; v <= Math.PI/2; v += vstep) {
            for (var u = 0; u <= 2 * Math.PI; u += ustep) {
                var x = b * (Math.cos(v) * (r + Math.sin(v))) * Math.cos(u);
                var y = a * (r + Math.sin(v));
                var z = b * (Math.cos(v) * (r + Math.sin(v))) * Math.sin(u);
                var x2 = x/2;
                var y2 = y/2 - 0.5;
                var z2 = z/2;
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
