// forked from cx20's "[WebGL] Grimoire.js で球体にエフェクトをかけてみるテスト" http://jsdo.it/cx20/eRe9
// forked from cx20's "[WebGL] Grimoire.js で立方体にエフェクトをかけてみるテスト" http://jsdo.it/cx20/4glF
// forked from cx20's "[WebGL] Grimoire.js で render-quad を使ってシェーダを実行してみるテスト（その３）" http://jsdo.it/cx20/Ehzy
// forked from cx20's "forked: [WebGL] Grimoire.js で render-quad を使ってシェーダを実行してみるテスト" http://jsdo.it/cx20/wVDH
// forked from cx20's "[WebGL] Grimoire.js で render-quad を使ってシェーダを実行してみるテスト" http://jsdo.it/cx20/AtCh
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s
// nothing

var Vector3 = gr.lib.math.Vector3;
var Quaternion = gr.lib.math.Quaternion;

gr.registerComponent('Rotate', {
  attributes: {
    speed: {
      default: '1.0',
      converter: 'Number',
    },
  },
  $mount: function () {
    this.phi = 0;
  },
  $update: function () {
    this.phi += this.getAttribute('speed');
    // オイラー角による回転
    //this.node.setAttribute('rotation', this.phi + ',' + this.phi + ',' + 0);
    
    // クォータニオンによる回転
    var axis = new Vector3(0, 1, 0);
    var angle = this.phi * Math.PI / 180;
    var q = Quaternion.angleAxis(angle, axis);
    this.node.setAttribute('rotation', q.normalize());
  },
});

gr(function() {
  var $$ = gr('#canvas');
  $$('#mars').addComponent('Rotate').setAttribute('speed', 0.2);
  $$('#cloud').addComponent('Rotate').setAttribute('speed', 0.3);
});
