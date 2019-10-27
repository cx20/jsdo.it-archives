// forked from cx20's "[WebGL] lightgl.js で Wave Ball を描いてみるテスト" http://jsdo.it/cx20/1YU6
// forked from cx20's "[WebGL] lightgl.js でトーラスを描いてみるテスト" http://jsdo.it/cx20/sssl
// forked from cx20's "[WebGL] lightgl.js でリンゴ曲面を描いてみるテスト" http://jsdo.it/cx20/pejt
// forked from cx20's "[WebGL] lightgl.js で貝殻曲面を描いてみるテスト" http://jsdo.it/cx20/lyR5
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
    gl.rotate(angle, angle, angle, 1);

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
    gl.begin(gl.LINE_STRIP);
    //gl.begin(gl.POINTS);
    gl.pointSize(2.0);
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
            gl.color(x2 + 0.5, y2 + 0.5, z2 + 0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
