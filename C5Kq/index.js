// forked from cx20's "[WebGL] Grimoire.js で Cube を動的に追加してみるテスト（改）" http://jsdo.it/cx20/w8ZO
// forked from cx20's "[WebGL] Grimoire.js で Cube を動的に追加してみるテスト" http://jsdo.it/cx20/8Mxl
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

gr(function() {
    var $$ = gr("#main");
    for (var i = -5; i < 5; i++) {
        for (var j = -5; j < 5; j++) {
            $$("scene").append(`<mesh geometry="quad" scale="0.4" position="${i},${j},0" color="brown" />`);
        }
    }
    rotation();
});
var ratio = 0;

function rotation() {
    gr('#main')('mesh').setAttribute('rotation', ratio + ',' + ratio + ',' + ratio);
    ratio += 1;
    requestAnimationFrame(rotation);
}
