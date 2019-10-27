// forked from cx20's "[WebGL] lightgl.js でローマ曲面を描いてみるテスト" http://jsdo.it/cx20/v0rS
// forked from cx20's "[WebGL] lightgl.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/5RXU
// forked from cx20's "[WebGL] lightgl.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/4kX2
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var angle = 0;
var gl = GL.create();

gl.onupdate = function(seconds) {
    angle += 45 * seconds;
};

gl.ondraw = function() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -2);
    gl.rotate(60, 1, 0, 0);
    gl.rotate(angle, 0, 0, -1);

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
    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
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
            gl.color(x + 0.5, y + 0.5, z + 0.5, 1.0);
            gl.vertex(x, y, z);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
