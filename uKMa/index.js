// forked from cx20's "[WebGL] Grimoire.js で Cube を動的に追加してみるテスト（調整中）" http://jsdo.it/cx20/8Mxl
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

gr(function() {
    var n = 30;
    var r = 10;
    for (var i = 0; i < n; i++) {
        var px = r * Math.sin(Math.PI * 2 / n * i);
        var pz = r * Math.cos(Math.PI * 2 / n * i);
        var position = 'position="' + px + ',0,' + pz + '"';
        var color = ["red","yellow","blue","green","orange","white","black"][i % 7];
        console.log('<mesh geometry="cube" ' + position + ' color="'+color+'"/>');
        gr("#canvas")("scene").append('<mesh geometry="cube" ' + position + ' color="'+color+'"/>');
    }
});
