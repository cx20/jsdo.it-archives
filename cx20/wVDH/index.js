// forked from cx20's "[WebGL] Grimoire.js で render-quad を使ってシェーダを実行してみるテスト" http://jsdo.it/cx20/AtCh
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s
// nothing


gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1',
      converter: 'Number',
    },
  },
  $mount: function () {
    this.phi = 0;
  },
  $update: function () {
    this.phi += this.getAttribute('speed');
    this.node.setAttribute('rotation', this.phi + ',' + this.phi + ',' + 0);
  },
});

gr(function() {
  var $$ = gr('#canvas');
});
