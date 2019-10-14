// forked from cx20's "[WebGL] Grimoire.js で render-quad を使ってシェーダを実行してみるテスト" http://jsdo.it/cx20/AtCh
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s
// nothing

gr(function() {
  var $$ = gr('#canvas');

  var canvas = document.querySelector("canvas");
  canvas.addEventListener("mousemove", onMouseMove, false );
  function onMouseMove(e) {
    var render = gr('#canvas')('#render');
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    render.setAttribute('mouse', x/465 + ',' + y/465);
  }
});
