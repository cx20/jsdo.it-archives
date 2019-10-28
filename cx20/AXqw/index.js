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
        p.rotateX(angle);
        p.rotateY(angle);
        p.scale(300);

        // ローマ曲面の座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        p.beginShape(p.LINE_STRIP);
        var ustep = Math.PI * 10 / 180;
        var vstep = Math.PI * 10 / 180;
        for (var v = 0; v <= 2 * Math.PI; v += vstep) {
            for (var u = 0; u <= 2 * Math.PI; u += ustep) {
                p.RomanSurface(u, v);
                p.RomanSurface(u + ustep, v);
                p.RomanSurface(u + ustep, v + vstep);
                p.RomanSurface(u, v + vstep);
            }
            p.endShape();
        }
    }
    
    p.RomanSurface = function(u, v) {
        var x = Math.sin(u) * Math.cos(u) * Math.sin(v) * Math.sin(v);
        var y = Math.sin(u) * Math.sin(v) * Math.cos(v);
        var z = Math.cos(u) * Math.sin(v) * Math.cos(v);
        p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
        p.vertex(x, y, z);
    }
}

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var myp = new Processing(canvas, sketchProc);
}
