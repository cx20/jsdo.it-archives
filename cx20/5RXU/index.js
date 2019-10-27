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
    gl.translate(0, 0, -3);
    gl.rotate(30, 1, 0, 0);
    gl.rotate(angle, 0, 1, 0);

    // 3次元リサージュの座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    var MAX = 360;
    var A = 100.0;
    var B = 99.0;
    var C = 1.0;
    var alpha = Math.PI/4;
    var beta  = Math.PI/3;
    var theta = 0; // Math.PI/2;
    gl.begin(gl.LINE_STRIP);
    for ( var i = 0; i <= MAX; i += 0.1 ) {
        var x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
        var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
        gl.color(x+0.5, y+0.5, z+0.5, 1.0);
        gl.vertex(x, y, z);
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
