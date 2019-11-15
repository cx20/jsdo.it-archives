// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（仮）" http://jsdo.it/cx20/g9yj
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

let material = glBoostContext.createClassicMaterial();
material.baseColor = new GLBoost.Vector4(1, 1, 1, 1);

// 正方形の座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//        [0]------[1]
//         |        |
//         |        |
//         |        |
//        [2]------[3]
//
let uSpan = 1;
let vSpan = 1;
let geometry = glBoostContext.createPlane(1, 1, uSpan, vSpan);
let colors = [
    new GLBoost.Vector4(1.0, 0.0, 0.0, 1.0),  // v0
    new GLBoost.Vector4(0.0, 1.0, 0.0, 1.0),  // v1
    new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),  // v2
    new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0)   // v3
];
let mesh = glBoostContext.createMesh(geometry, material);
scene.addChild(mesh);

let camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 2.5, 0.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 0.0, 1.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 1000.0
});

scene.addChild(camera);

let expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

geometry.updateVerticesData({
    color: colors
});

(function(){
    renderer.clearCanvas();
    renderer.draw(expression);
    requestAnimationFrame(arguments.callee);
})();