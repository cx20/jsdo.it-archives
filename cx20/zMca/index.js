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
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -3);
    gl.rotate(-60, 1, 0, 0);
    gl.rotate(angle, 0, 0, 1);

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
    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
    for ( var j = -10; j < 10; j += 0.5 ) {
        for ( var i = -10; i < 10; i += 0.5) {
            var x = i;
            var y = j;
            var z = Math.sin(Math.sqrt(x*x+y*y))/Math.sqrt(x*x+y*y);
            var x2 = x / 10;
            var y2 = y / 10;
            var z2 = z / 2;
            gl.color(x2+0.5, y2+0.5, z2+0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
