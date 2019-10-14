// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その１２）" http://jsdo.it/cx20/gA6t
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その１１）" http://jsdo.it/cx20/wU5Ck
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その１０）" http://jsdo.it/cx20/klBx
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その９）" http://jsdo.it/cx20/y0ua
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その８）" http://jsdo.it/cx20/qSSw
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その７）" http://jsdo.it/cx20/kUQG
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その６）" http://jsdo.it/cx20/ET9o
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その５）" http://jsdo.it/cx20/YPoe
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その４）" http://jsdo.it/cx20/KIjw
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その３）" http://jsdo.it/cx20/gG4l
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト（その２）" http://jsdo.it/cx20/89C0
// forked from cx20's "[WebGL] Grimoire.js でポストエフェクトを試してみるテスト" http://jsdo.it/cx20/ubXS
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）（VBO編）" http://jsdo.it/cx20/swSy
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）（VBO編）" http://jsdo.it/cx20/YiRx
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var Vector3 = gr.lib.math.Vector3;
var Quaternion = gr.lib.math.Quaternion;

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
    // オイラー角による回転
    //this.node.setAttribute('rotation', this.phi + ',' + this.phi + ',' + 0);
    
    // クォータニオンによる回転
    var axis = new Vector3(1, 1, 1);
    var angle = this.phi * Math.PI / 180;
    var q = Quaternion.angleAxis(angle, axis);
    this.node.setAttribute('rotation', q.normalize());
  },
});

gr(function() {
  var $$ = gr('#canvas');
});
