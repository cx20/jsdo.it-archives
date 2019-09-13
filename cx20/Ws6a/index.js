// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その９）（調整中）" http://jsdo.it/cx20/CgDC
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その８）（調整中）" http://jsdo.it/cx20/a3HB
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その７）（調整中）" http://jsdo.it/cx20/Mq2h
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その６）（調整中）" http://jsdo.it/cx20/oCiQ
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その５）（調整中）" http://jsdo.it/cx20/2PYW
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その４）（調整中）" http://jsdo.it/cx20/iE9t
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/sV4J
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その２）" http://jsdo.it/cx20/irCY
// forked from cx20's "[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（調整中）" http://jsdo.it/cx20/GJUm
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）" http://jsdo.it/cx20/yNCh
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）" http://jsdo.it/cx20/a1kX
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）" http://jsdo.it/cx20/mjC6
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

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
    this.node.setAttribute('rotation', 0 + ',' + this.phi + ',' + 0);
  },
});

gr(function () {
  var $$ = gr('#canvas');
  $$('model').addComponent('Rotate');
});
