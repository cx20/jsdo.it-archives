// forked from cx20's "[WebGL] GLBoost で PBR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/E756
// forked from cx20's "[WebGL] GLBoost で PBR を試してみるテスト（調整中）" http://jsdo.it/cx20/YYjT
// forked from cx20's "[WebGL] GLBoost のプリミティブ型を試してみるテスト" http://jsdo.it/cx20/MaoR
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/yy3I
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その３）（仮）" http://jsdo.it/cx20/WlZW
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その２）（仮）" http://jsdo.it/cx20/8PA0
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（仮）" http://jsdo.it/cx20/g9yj
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

let width = window.innerWidth;
let height = window.innerHeight;
// setup GLBoost renderer
var canvas = document.getElementById("world");
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);

var renderer = glBoostContext.createRenderer({
  clearColor: {
    red: 0.0,
    green: 0.0,
    blue: 0.0,
    alpha: 1
  }
});
renderer.resize(width, height);

// make a scene
var scene = glBoostContext.createScene();

var geometryCube = glBoostContext.createCube(new GLBoost.Vector3(3, 3, 3), new GLBoost.Vector4(1, 1, 1, 1));

// setup material
var material = glBoostContext.createPBRMetallicRoughnessMaterial();
material.shaderClass = GLBoost.PBRPrincipledShader;
// https://www.cgbookcase.com/textures/brick-wall-02
var urlBase = "https://rawcdn.githack.com/cx20/jsdo-static-contents/89194aefe92cf7111cbac116f6f0bfb194b65503/";
var texture          = glBoostContext.createTexture(urlBase + 'textures/Brick_wall_02_1K_Base_Color.jpg');
var textureAO        = glBoostContext.createTexture(urlBase + 'textures/Brick_wall_02_1K_AO.jpg');
var textureNormal    = glBoostContext.createTexture(urlBase + 'textures/Brick_wall_02_1K_Normal.jpg');
//var textureRoughness = glBoostContext.createTexture(urlBase + 'textures/Brick_wall_02_1K_Roughness.jpg');
var textureORM = glBoostContext.createTexture(urlBase + 'textures/Brick_wall_02_1K_ORM.jpg');
material.setTexture(texture);
material.setTexture(textureAO, GLBoost.TEXTURE_PURPOSE_OCCLUSION);
material.setTexture(textureNormal, GLBoost.TEXTURE_PURPOSE_NORMAL);
material.setTexture(textureORM, GLBoost.TEXTURE_PURPOSE_METALLIC_ROUGHNESS);

var meshCube = glBoostContext.createMesh(geometryCube, material);
//meshSphere.translate = new GLBoost.Vector3((r-0.5)*4, (m-0.5)*4, 0.0);

scene.addChild(meshCube);

let pointLight = glBoostContext.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
pointLight.translate = new GLBoost.Vector3(10, 10, 10);
scene.addChild(pointLight);

//var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(0, 0, -1));
var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(90, 0, 0));
//directionalLight.rotate = new GLBoost.Vector3(90,0,0);
scene.addChild( directionalLight );

var camera = glBoostContext.createPerspectiveCamera({
  eye: new GLBoost.Vector3(0.0, 0.0, 2.7),
  center: new GLBoost.Vector3(0.0, 0.0, 0.0),
  up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
  fovy: 45.0,
  aspect: width/height,
  zNear: 0.1,
  zFar: 1000.0
});
camera.cameraController = glBoostContext.createCameraController();
scene.addChild(camera);

var expression = glBoostContext.createExpressionAndRenderPasses(1);
expression.renderPasses[0].scene = scene;
expression.prepareToRender();

var angle = 0;
var axis = new GLBoost.Vector3(0,1,0);

var render = function() {
  renderer.clearCanvas();
  renderer.draw(expression);

  meshCube.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));

  angle += 0.005;
    
  requestAnimationFrame(render);
};

render();