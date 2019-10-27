// forked from cx20's "[WebGL] lightgl.js でハーモノグラフを描いてみるテスト" http://jsdo.it/cx20/ry8D
// forked from cx20's "[WebGL] lightgl.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/5RXU
// forked from cx20's "[WebGL] lightgl.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/4kX2
// forked from cx20's "[WebGL] lightgl.js を試してみるテスト" http://jsdo.it/cx20/rm4H
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var count = 10000;
var factor = [0.5, 0.4, 0.6, 0.8];
var len = count * 2;
var deg = Math.PI;
var a = 2;
var b = -1.5;
var c;
var d;
var x, y;
var tx, ty;
var scale = 1 / 4;
var angle = 0;

var gl = GL.create();

function drawCliffordAttractors()
{
    var x, y, z;
    var t = 0;
    gl.begin(gl.POINTS);
    c = 2 * Math.cos(deg * factor[2]);
    d = 2 * Math.cos(deg * factor[3]);
    x = 0;
    y = 0;
    z = 0;
    for (var n = 0; n < len; n += 2) {
        tx = Math.sin(a * y) + c * Math.cos(a * x);
        ty = Math.sin(b * x) + d * Math.cos(b * y);
        x = tx;
        y = ty;
        gl.color(x*scale + 0.5, y*scale + 0.5, z, 1.0);
        gl.vertex(x*scale, y*scale, z*scale);
    }
    deg += 0.005;
    gl.end();
}

gl.onupdate = function(seconds) {
    //angle += 45 * seconds;
};

gl.ondraw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -3);
    gl.rotate(30, 1, 0, 0);
    gl.rotate(angle, 0, 1, 0);

    drawCliffordAttractors();
};

gl.fullscreen();
gl.animate();
