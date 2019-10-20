// forked from cx20's "[WebVR] GLBoost で WebVR を試してみるテスト（その８）（調整中）" http://jsdo.it/cx20/C42E
// forked from cx20's "[WebVR] GLBoost で WebVR を試してみるテスト（その７）（調整中）" http://jsdo.it/cx20/iGLM
// forked from cx20's "[WebVR] GLBoost で WebVR を試してみるテスト（その６）（調整中）" http://jsdo.it/cx20/ygHt
// forked from cx20's "[WebVR] GLBoost で WebVR を試してみるテスト（その５）（調整中）" http://jsdo.it/cx20/0iRm
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（その４）（調整中）" http://jsdo.it/cx20/SePJ
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/GeUE
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/akl7
// forked from cx20's "[WebGL] GLBoost で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/2e3y
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/yy3I
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その３）（仮）" http://jsdo.it/cx20/WlZW
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その２）（仮）" http://jsdo.it/cx20/8PA0
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（組み込み関数編）（仮）" http://jsdo.it/cx20/g9yj
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

let canvas = document.getElementById("world");
let width = window.innerWidth;
let height = window.innerHeight;

let glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
let renderer = glBoostContext.createRenderer({
    clearColor: {
        red: 0.6,
        green: 0.6,
        blue: 0.6,
        alpha: 1
    }
});

renderer.resize(width, height);

renderer.readyForWebVR(document.querySelector('.enter-web-vr'));

document.querySelector('.enter-web-vr').addEventListener('click', ()=>{
    renderer.enterWebVR();
});

let scene = glBoostContext.createScene();
scene.translate = new GLBoost.Vector3(0, 0, -30);

let pointLight = glBoostContext.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
pointLight.translate = new GLBoost.Vector3(10, 10, 10);
scene.addChild(pointLight);
let camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(1, 5, 30),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 60.0,
    aspect: width/height,
    zNear: 0.1,
    zFar: 3000.0
});
camera.cameraController = glBoostContext.createCameraController();
//camera.cameraController.zFarAdjustingFactorBasedOnAABB = 3;
scene.addChild(camera);

//let gridGizmo = glBoostContext.createGridGizmo(16, 16, true, true, false, new GLBoost.Vector4(1, 1, 1, 1));
//scene.addChild(gridGizmo);

let axisGizmo = glBoostContext.createAxisGizmo(4);
scene.addChild(axisGizmo);

let gtime = 0;
let glTF2Loader = GLBoost.GLTF2Loader.getInstance();
let modelConverter = GLBoost.ModelConverter.getInstance();
let scale = 5;
//let url = "https://cdn.rawgit.com/cx20/gltf-test/e63efa65/tutorialModels/FlightHelmet/glTF/FlightHelmet.gltf";
let url = "https://cdn.rawgit.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb";

let promise = glTF2Loader.loadGLTF(url, {
      extensionLoader: null,
      defaultShader: GLBoost.PhongShader,
      isNeededToMultiplyAlphaToColorOfPixelOutput: true,
      isTextureImageToLoadPreMultipliedAlpha: false,
      isExistJointGizmo: false,
      isBlend: false,
      isDepthTest: true,
      isAllMeshesTransparent: false
    });
      
promise.then(function(gltfObj) {
    let group = modelConverter.convertToGLBoostModel(glBoostContext, gltfObj);
    //camera.cameraController.target = group;
    console.log(group);
    group.scale = new GLBoost.Vector3(scale, scale, scale);
    scene.addChild(group);

    let expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();
    
    let angle = 0;
    let axis = new GLBoost.Vector3(0, -1, 0);

    renderer.doConvenientRenderLoop(expression, function() {
        group.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
        angle += 0.02;
    });                                    
});