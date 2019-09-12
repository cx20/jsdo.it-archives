// forked from cx20's "[WebGL] Grimoire.js で動画テクスチャを試してみるテスト（調整中）" http://jsdo.it/cx20/03xg
// forked from cx20's "[WebGL] Grimoire.js で木星を表示させてみるテスト" http://jsdo.it/cx20/kuVS
// forked from cx20's "Grimoire.js で地球を回してみるテスト" http://jsdo.it/cx20/uQit
// forked from cx20's "WebGL で地球を回してみるテスト" http://jsdo.it/cx20/cI8t


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
      this.node.setAttribute('rotation', `${this.phi}, ${this.phi}, 0`);
  },
});

gr(function () {
  var $$ = gr('#canvas');
  $$('mesh').addComponent('Rotate').setAttribute('speed', 0.5);
});