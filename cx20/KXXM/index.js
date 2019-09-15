// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("world");
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
var renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});

var scene = glBoostContext.createScene();
/*
// 頂点データを Vector で指定する場合
var positions = [
    new GLBoost.Vector3( 0.0,  0.5, 0.0),
    new GLBoost.Vector3(-0.5, -0.5, 0.0),
    new GLBoost.Vector3( 0.5, -0.5, 0.0)
];

var colors = [
    new GLBoost.Vector3(0.0, 0.0, 1.0),
    new GLBoost.Vector3(0.0, 0.0, 1.0),
    new GLBoost.Vector3(0.0, 0.0, 1.0)
];
*/
// 頂点データを配列で指定する場合
var positions = [
    [ 0.0,  0.5, 0.0],
    [-0.5, -0.5, 0.0],
    [ 0.5, -0.5, 0.0]
];

var colors = [
    [0.0, 0.0, 1.0],
    [0.0, 0.0, 1.0],
    [0.0, 0.0, 1.0]
];

var geometry = glBoostContext.createGeometry();
geometry.setVerticesData({
    position: positions,
    color: colors
});
var mesh = glBoostContext.createMesh(geometry);

scene.addChild(mesh);

var expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

(function(){
    renderer.clearCanvas();
    renderer.draw(expression);
    requestAnimationFrame(arguments.callee);
})();
