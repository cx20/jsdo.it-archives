// forked from cx20's "[WebGL] Processing.js を試してみるテスト（JavaScript編）（その３）" http://jsdo.it/cx20/Gl8z
// forked from cx20's "[WebGL] Processing.js を試してみるテスト（JavaScript編）（その２）" http://jsdo.it/cx20/qZA9
// forked from cx20's "[WebGL] Processing.js を試してみるテスト（JavaScript編）" http://jsdo.it/cx20/yRfJ
// forked from cx20's "[WebGL] Processing.js を試してみるテスト（組み込み言語編）" http://jsdo.it/cx20/xde6
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var sketch = new Processing.Sketch();
sketch.use3DContext = true;
sketch.imageCache.add("../../assets/A/k/w/j/AkwjW.jpg"); // frog.jpg

sketch.attachFunction = function(p) {
    var tex;
    var angle = 0.0;

    p.setup = function() {
        p.size(465, 465, p.P3D);
        tex = p.loadImage("../../assets/A/k/w/j/AkwjW.jpg"); // frog.jpg
        p.textureMode(p.NORMALIZED);
    };

    p.draw = function() {
        angle += Math.PI / 180;
        p.noStroke();
        p.background(255, 255, 255);
        p.translate(p.width/2.0, p.height/2.0, -100);
        p.rotateX(angle);
        p.rotateY(angle);
        p.scale(100);
        texturedCube(tex);
    }

    function texturedCube(tex) {
        p.beginShape(p.QUADS);
        p.texture(tex);
        
        // +Z "front" face
        p.vertex(-1, -1,  1, 0, 0);
        p.vertex( 1, -1,  1, 1, 0);
        p.vertex( 1,  1,  1, 1, 1);
        p.vertex(-1,  1,  1, 0, 1);

        // -Z "back" face
        p.vertex( 1, -1, -1, 0, 0);
        p.vertex(-1, -1, -1, 1, 0);
        p.vertex(-1,  1, -1, 1, 1);
        p.vertex( 1,  1, -1, 0, 1);

        // +Y "bottom" face
        p.vertex(-1,  1,  1, 0, 0);
        p.vertex( 1,  1,  1, 1, 0);
        p.vertex( 1,  1, -1, 1, 1);
        p.vertex(-1,  1, -1, 0, 1);

        // -Y "top" face
        p.vertex(-1, -1, -1, 0, 0);
        p.vertex( 1, -1, -1, 1, 0);
        p.vertex( 1, -1,  1, 1, 1);
        p.vertex(-1, -1,  1, 0, 1);

        // +X "right" face
        p.vertex( 1, -1,  1, 0, 0);
        p.vertex( 1, -1, -1, 1, 0);
        p.vertex( 1,  1, -1, 1, 1);
        p.vertex( 1,  1,  1, 0, 1);

        // -X "left" face
        p.vertex(-1, -1, -1, 0, 0);
        p.vertex(-1, -1,  1, 1, 0);
        p.vertex(-1,  1,  1, 1, 1);
        p.vertex(-1,  1, -1, 0, 1);

        p.endShape();
    }
};

var canvas = document.getElementById("canvas");
var myp = new Processing(canvas, sketch);
