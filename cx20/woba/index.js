// forked from cx20's "[WebGL] lightgl.js でスライム曲面を描いてみるテスト" http://jsdo.it/cx20/vo3eN
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
    gl.rotate(angle, angle, angle/10, 1);

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
    //gl.begin(gl.LINE_STRIP);
    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
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
            gl.color(x2 + 1.0, y2 + 0.5, z2 + 0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
