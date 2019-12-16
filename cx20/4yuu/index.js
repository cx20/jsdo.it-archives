// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// GLBoost のトレース機能
//GLBoost['VALUE_CONSOLE_OUT_FOR_DEBUGGING'] = false;
//GLBoost['VALUE_LOG_SHADER_CODE'] = true;
//GLBoost['VALUE_LOG_GLBOOST_OBJECT_LIFECYCLE'] = true;
//GLBoost['VALUE_LOG_GL_RESOURCE_LIFECYCLE'] = true;

var canvas = document.getElementById("world");
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
var renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:1, green:1, blue:1, alpha:1}});

// webgl-debug.js によるトレース機能
glBoostContext.glContext.gl = WebGLDebugUtils.makeDebugContext(glBoostContext.glContext.gl, undefined, logGLCall);

function logGLCall(functionName, args) {
   console.log("gl." + functionName + "(" +
      WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}

var scene = glBoostContext.createScene();

var positions = [
    new GLBoost.Vector3( 0.0,  0.5, 0.0),
    new GLBoost.Vector3(-0.5, -0.5, 0.0),
    new GLBoost.Vector3( 0.5, -0.5, 0.0)
];

var colors = [
    new GLBoost.Vector3(0.0, 0.0, 1.0),
    new GLBoost.Vector3(0.0, 0.0, 1.0),
    new GLBoost.Vector3(0.0, 0.0, 1.0),
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
