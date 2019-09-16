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
        red: 0.0,
        green: 0.0,
        blue: 0.0,
        alpha: 1
    }
});

renderer.resize(width, height);

let scene = glBoostContext.createScene();

let pointLight = glBoostContext.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
pointLight.translate = new GLBoost.Vector3(10, 10, 10);
scene.addChild(pointLight);
let camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: width/height,
    zNear: 0.1,
    zFar: 10000.0
});
camera.cameraController = glBoostContext.createCameraController();
//camera.cameraController.zFarAdjustingFactorBasedOnAABB = 3;
scene.addChild(camera);

//let gridGizmo = glBoostContext.createGridGizmo(16, 16, true, true, false, new GLBoost.Vector4(1, 1, 1, 1));
//scene.addChild(gridGizmo);

let axisGizmo = glBoostContext.createAxisGizmo(4);
scene.addChild(axisGizmo);

let gtime = 0;
let glTFLoader = GLBoost.GLTFLoader.getInstance();
let scale = 0.4;
let url = "../../assets/w/b/X/7/wbX7Y.gltf"
let promise = glTFLoader.loadGLTF(glBoostContext, url, null);
      
promise.then(function(group) {
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