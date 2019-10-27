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
    gl.rotate(30, 1, 0, 0);
    gl.rotate(angle, 0, 1, 0);

    // 正弦波×余弦波の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //             [3]
    //         [4]     [2]
    //      [5]            [1]
    //      *                *
    //     [6]              [0]
    //      *                *
    //      [7]            [11]
    //         [8]     [10]
    //             [9]
    //
    var data = [];
    var MAX = 24;
    var A = 1.0;
    var B = 2.0;
    gl.begin(gl.LINE_STRIP);
    for ( var i = 0; i <= MAX; i++ ) {
        var x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
        var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
        var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
        gl.color(x+0.5, y+0.5, z+0.5, 1.0);
        gl.vertex(x, y, z);
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
