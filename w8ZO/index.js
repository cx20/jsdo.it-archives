// forked from cx20's "[WebGL] Grimoire.js で Cube を動的に追加してみるテスト" http://jsdo.it/cx20/8Mxl
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

gr(function(){
    var ratio = 0;
    function init() {
      gr('#canvas')('scene').append('<mesh position="0,0,0" geometry="cube" material="#sprite" targetBuffer="default" />');
    }
    
    function rot() {
      //gr('#canvas')('mesh').setAttribute('rotation', ratio + ',' + ratio + ',' + ratio);
      var gomlNode = gr('#canvas')('mesh');
      gomlNode.setAttribute('rotation', ratio + ',' + ratio + ',' + ratio);
      ratio += 1;
      requestAnimationFrame(rot);
    }
    
    init();
    rot();
});
