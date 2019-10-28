// forked from cx20's "[WebGL] Processing.js を試してみるテスト（組み込み言語編）" http://jsdo.it/cx20/xde6
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function sketchProc(p) {
    p.setup = function() {
        p.size(465, 465, p.P3D);
        p.background(255, 255, 255);
        p.noStroke();
        p.noLoop();
    }

    p.draw = function() {
        p.fill(0, 0, 255);
        p.beginShape(p.TRIANGLES);
        p.vertex(235, 140);
        p.vertex(115, 350);
        p.vertex(350, 350);
        p.endShape(p.CLOSE);
    }
}

var canvas = document.getElementById("canvas");
var myp = new Processing(canvas, sketchProc);
