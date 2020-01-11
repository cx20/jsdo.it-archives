// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その１）" http://jsdo.it/cx20/G5nJ
// forked from cx20's "[WebGL] GLBoost + ObjLoader を試してみるテスト" http://jsdo.it/cx20/8qQl
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト" http://jsdo.it/cx20/2Nrf
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
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

let scene = glBoostContext.createScene();

let pointLight = glBoostContext.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
pointLight.translate = new GLBoost.Vector3(10, 10, 10);
scene.addChild(pointLight);
let camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 2.0, 3.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 75.0,
    aspect: width/height,
    zNear: 0.1,
    zFar: 3000.0
});
camera.cameraController = glBoostContext.createCameraController();
//camera.cameraController.zFarAdjustingFactorBasedOnAABB = 3;
scene.addChild(camera);

let gridGizmo = glBoostContext.createGridGizmo(16, 16, true, true, false, new GLBoost.Vector4(1, 1, 1, 1));
scene.addChild(gridGizmo);

let gtime = 0;
let glTF2Loader = GLBoost.GLTF2Loader.getInstance();
let modelConverter = GLBoost.ModelConverter.getInstance();
let scale = 1.0;
let url = "https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
//let url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
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
    
    let render = function() {
        scene.setCurrentAnimationValue('time', gtime);
        renderer.clearCanvas();
        renderer.update(expression); 
        renderer.draw(expression);
        gtime += 0.03;
        if (gtime > 5) {
            gtime = 0.0;
        }
        let rotateMatrix = GLBoost.Matrix33.rotateY(-0.5);
        let rotatedVector = rotateMatrix.multiplyVector(camera.eye);
        camera.eye = rotatedVector;
        requestAnimationFrame(render);
    };
    render();
});