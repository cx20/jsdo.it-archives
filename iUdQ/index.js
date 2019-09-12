// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

var GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
var Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType('custom', {}, function(gl,attrs){
  var geometry = new Geometry(gl);
  var position = [
     0.0,  0.5,  0.0,
    -0.5, -0.5,  0.0,
     0.5, -0.5,  0.0
  ];
  var indices = [0, 1, 2];
  geometry.addAttributes(position, {
    POSITION:{size: 3}
  });
  geometry.addIndex('default', indices, WebGLRenderingContext.TRIANGLES);
  return geometry;
});

gr(function() {
  var $$ = gr('#canvas');
  //var shader = document.getElementById('shader').textContent;
  //$$('goml').addChildByName('import-material', {typeName:'blueShader', src:'data:;base64,' + btoa(shader)}); // grimoire-preset-basic.js v1.10.16 にてこのコードは不要になりました。
});
