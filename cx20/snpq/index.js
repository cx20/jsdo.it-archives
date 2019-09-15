// forked from cx20's "[WebGL] GLBoost を試してみるテスト（シェーダ編）（調整中）" http://jsdo.it/cx20/smSr
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/g9yj
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("world");
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
var renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});
var scene = glBoostContext.createScene();

// 頂点データを配列で指定する場合
var positions = [
    [-0.5,  0.5, 0.0], // v0
    [ 0.5,  0.5, 0.0], // v1
    [-0.5, -0.5, 0.0], // v2
    [ 0.5, -0.5, 0.0]  // v3
];

var colors = [
    [1.0, 0.0, 0.0],  // v0
    [0.0, 1.0, 0.0],  // v1
    [0.0, 0.0, 1.0],  // v2
    [1.0, 1.0, 0.0]   // v3
];

var indices = [
    0, 2, 1, 3
];
var geometry = glBoostContext.createGeometry();
geometry.setVerticesData({
    position: positions,
    color: colors
}, [indices], GLBoost.TRIANGLE_STRIP);

// setup material
var material = glBoostContext.createClassicMaterial();
material.shaderClass = GLBoost.FreeShader;

const freeShader = glBoostContext.createFreeShader(
  document.getElementById('vs').textContent,
  document.getElementById('fs').textContent, {
    'position': 'POSITION',
    'color': 'COLOR'
  }, {
  }, {
  }
);

material.shaderInstance = freeShader;

var mesh = glBoostContext.createMesh(geometry, material);

scene.addChild(mesh);

var expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

(function(){
    renderer.clearCanvas();
    renderer.draw(expression);
    requestAnimationFrame(arguments.callee);
})();
