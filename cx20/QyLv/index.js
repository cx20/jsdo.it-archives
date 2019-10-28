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
        p.rotate(90, 1, 0, 0);
        p.rotate(angle, 0, 0, -1);
        p.scale(300);

        // 貝殻曲面（seashell）の座標データを用意
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
        p.strokeWeight(2.0);
        var ustep = Math.PI * 5 / 180;
        var vstep = Math.PI * 5 / 180;
        var a = 0.2;
        var b = 0.6;
        var c = 0.2;
        var n = 2.0;
        for (var v = 0; v <= 2 * Math.PI; v += vstep) {
            for (var u = 0; u <= 2 * Math.PI; u += ustep) {
                x = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.cos(n * v);
                y = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.sin(n * v);
                z = b * v / (2 * Math.PI) + a * (1 - v / (2 * Math.PI)) * Math.sin(u);
                p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
                p.vertex(x, y, z);
            }
        }
        p.endShape();
    }
    
}

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var myp = new Processing(canvas, sketchProc);
}
