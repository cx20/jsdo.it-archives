// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/s6N4
// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（その８）（調整中）" http://jsdo.it/cx20/6K2e
// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（その６）（調整中）" http://jsdo.it/cx20/mkHR
// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（その６）（調整中）" http://jsdo.it/cx20/O3eo
// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（その５）（調整中）" http://jsdo.it/cx20/E9Ph
// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（その４）（調整中）" http://jsdo.it/cx20/4bHc
// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/89Fn
// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（その２）（調整中）" http://jsdo.it/cx20/Gldx
// forked from cx20's "[WebGL] GLBoost で glTF 2.0 モデルを表示してみるテスト（調整中）" http://jsdo.it/cx20/Qr7c
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
    //eye: new GLBoost.Vector3(2.0, 1.0, 2.0),
    eye: new GLBoost.Vector3(1, 0.5, 10),
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

//let gridGizmo = glBoostContext.createGridGizmo(16, 16, true, true, false, new GLBoost.Vector4(1, 1, 1, 1));
//scene.addChild(gridGizmo);

let axisGizmo = glBoostContext.createAxisGizmo(4);
scene.addChild(axisGizmo);

let gtime = 0;
let glTF2Loader = GLBoost.GLTF2Loader.getInstance();
let modelConverter = GLBoost.ModelConverter.getInstance();
let scale = 0.1;
//let url = "https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
//let url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
//let url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/395358db/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf"
//var url = "https://rawcdn.githack.com/cx20/gltf-test/7e912826/tutorialModels/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
//let url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/76dfc928/models/gltf/2.0/EmaSimpleSkin_blender/glTF/EmaSimpleSkin_blender.gltf";
//let url = "https://rawcdn.githack.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf";
//let url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/94bb7090/models/gltf/2.0/VoxelCorgi/glTF_merge/VoxelCorgi.gltf";
//let url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
//let url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
//let url = "https://rawcdn.githack.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf";
//let url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/scene.gltf";
let url = "https://rawcdn.githack.com/mrdoob/rome-gltf/784089b4/files/models/life_soup/quadruped_fox.gltf";

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