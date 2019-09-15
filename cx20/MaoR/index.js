// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/yy3I
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その３）（仮）" http://jsdo.it/cx20/WlZW
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その２）（仮）" http://jsdo.it/cx20/8PA0
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（仮）" http://jsdo.it/cx20/g9yj
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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

// make a scene
var scene = glBoostContext.createScene();

// setup material
var material = glBoostContext.createClassicMaterial();
var texture = glBoostContext.createTexture('../../assets/u/L/K/7/uLK7v.jpg');
material.setTexture(texture);
material.shaderClass = GLBoost.PhongShader;

// createPlane(width, height, uSpan, vSpan, customVertexAttributes, isUVRepeat
var geometryPlane = glBoostContext.createPlane(1, 1, 1, 1);
var meshPlane = glBoostContext.createMesh(geometryPlane, material);
meshPlane.translate = new GLBoost.Vector3(-1.5, 1.5, 0.0);

// createCube(widthVector, vertexColor)
var geometryCube = glBoostContext.createCube(new GLBoost.Vector3(1,1,1), new GLBoost.Vector4(1,1,1,1));
var meshCube = glBoostContext.createMesh(geometryCube, material);
meshCube.translate = new GLBoost.Vector3(0.0, 1.5, 0.0);

// createSphere(radius, widthSegments, heightSegments, vertexColor)
var geometrySphere = glBoostContext.createSphere(0.5, 24, 24, null);
var meshSphere = glBoostContext.createMesh(geometrySphere, material);
meshSphere.translate = new GLBoost.Vector3(1.5, 1.5, 0.0);

// createAxisGizmo(length)
var meshAxis = glBoostContext.createAxisGizmo(0.5);
meshAxis.translate = new GLBoost.Vector3(-1.5, -0.5, 0.0);

// createGridGizmo(length, division, isXZ, isXY, isYZ, colorVec)
var meshGrid = glBoostContext.createGridGizmo(0.5, 2, true, true, false, new GLBoost.Vector4(1, 1, 1, 1));
meshGrid.translate = new GLBoost.Vector3(0.0, -0.5, 0.0);

var materialB = glBoostContext.createClassicMaterial();
var textureB = glBoostContext.createTexture('http://jsrun.it/assets/U/L/K/7/ULK7v.jpg');
materialB.setTexture(textureB);
materialB.shaderClass = GLBoost.PhongShader;


var wide = 1.0;
var particlesPosition = [];
for (var i=0; i<100; i++) {
  particlesPosition.push([(Math.random() - 0.5)*wide, (Math.random() - 0.5)*wide, (Math.random() - 0.5)*wide]);
}
// createParticle(centerPointData, particleWidth, particleHeight, customVertexAttributes, performanceHint)
var geometryParticle = glBoostContext.createParticle({position: particlesPosition}, 0.1, 0.1, null, GLBoost.DYNAMIC_DRAW);
var meshParticle = glBoostContext.createMesh(geometryParticle, materialB);
meshParticle.translate = new GLBoost.Vector3(1.5, -0.5, 0.0);

scene.addChild(meshPlane);
scene.addChild(meshSphere);
scene.addChild(meshCube);
scene.addChild(meshAxis);
scene.addChild(meshGrid);
scene.addChild(meshParticle);

var directionalLight = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1, 1, 1), new GLBoost.Vector3(0, 0, -1));
scene.addChild( directionalLight );

var camera = glBoostContext.createPerspectiveCamera({
  eye: new GLBoost.Vector3(0.0, 0.0, 6.0),
  center: new GLBoost.Vector3(0.0, 0.0, 0.0),
  up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
  fovy: 45.0,
  aspect: 1.0,
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

  //meshPlane.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
  meshPlane.rotate = new GLBoost.Vector3(90, 0, GLBoost.MathUtil.radianToDegree(-angle));
  meshSphere.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
  meshCube.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
  meshAxis.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
  meshGrid.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
  meshParticle.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));

  angle += 0.02;
    
  requestAnimationFrame(render);
};

render();