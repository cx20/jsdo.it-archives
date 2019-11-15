// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

let width = window.innerWidth;
let height = window.innerHeight;

let canvas = document.getElementById("world");
let glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
let renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});
renderer.resize(width, height);

let scene = glBoostContext.createScene();

let positions = [];
positions.push(new GLBoost.Vector3( 0.0,  0.5, 0.0));
positions.push(new GLBoost.Vector3(-0.5, -0.5, 0.0));
positions.push(new GLBoost.Vector3( 0.5, -0.5, 0.0));

let geometry = glBoostContext.createGeometry();
let material = glBoostContext.createClassicMaterial();
material.baseColor = new GLBoost.Vector4(0, 0, 1, 1);

geometry.setVerticesData({
    position: positions
});

let mesh = glBoostContext.createMesh(geometry, material);
scene.addChild(mesh);

let expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();


(function(){
    renderer.clearCanvas();
    renderer.draw(expression);
    requestAnimationFrame(arguments.callee);
})();
