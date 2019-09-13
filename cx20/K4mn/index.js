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
    this.node.setAttribute('rotation',0 + ',' + this.phi + ',' + 0);
  },
});

gr(function () {
  var $$ = gr('#canvas');
  $$('#earth').addComponent('Rotate').setAttribute('speed', 0.5);
  $$('#cloud').addComponent('Rotate').setAttribute('speed', 0.7);
});
