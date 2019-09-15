// forked from cx20's "[WebGL] GLBoost で AxisGizmo を試してみるテスト" http://jsdo.it/cx20/UpcX
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その１１）" http://jsdo.it/cx20/aUDu
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その１０）" http://jsdo.it/cx20/SyYq
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その９）（調整中）" http://jsdo.it/cx20/grfJ
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その８）（調整中）" http://jsdo.it/cx20/kTDe
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その７）" http://jsdo.it/cx20/eUpY
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その６）（調整中）" http://jsdo.it/cx20/OdJJ
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その５）（調整中）" http://jsdo.it/cx20/kCiVJ
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その４）（調整中）" http://jsdo.it/cx20/C56H
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その３）" http://jsdo.it/cx20/S7YK
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（その２）" http://jsdo.it/cx20/Mvy1
// forked from cx20's "[WebGL] GLBoost + glTF Loader を試してみるテスト（暫定対応）" http://jsdo.it/cx20/G5nJ
// forked from cx20's "[WebGL] GLBoost + ObjLoader を試してみるテスト" http://jsdo.it/cx20/8qQl
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト" http://jsdo.it/cx20/2Nrf
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("world");
var width = window.innerWidth;
var height = window.innerHeight;
var glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);

var renderer = glBoostContext.createRenderer({
    canvas: canvas,
    clearColor: {
        red: 0.6,
        green: 0.6,
        blue: 0.6,
        alpha: 1
    }
});
renderer.resize(width, height);

var scene = glBoostContext.createScene();

var pointLight = glBoostContext.createPointLight(new GLBoost.Vector3(1.0, 1.0, 1.0));
pointLight.translate = new GLBoost.Vector3(10, 10, 10);

scene.addChild(pointLight);
var camera = glBoostContext.createPerspectiveCamera({
    eye: new GLBoost.Vector3(-5.0, 5.0, 5.0),
    center: new GLBoost.Vector3(0.0, 1.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: width/height,
    zNear: 0.01,
    zFar: 3000.0
});
camera.cameraController = glBoostContext.createCameraController();
scene.addChild( camera );

// createAxisGizmo(length)
//var axisGizmo = glBoostContext.createAxisGizmo(4);
//scene.addChild(axisGizmo);

// createGridGizmo(length, division, isXZ, isXY, isYZ, colorVec)
//var gridGizmo = glBoostContext.createGridGizmo(4, 5, true, true, false, new GLBoost.Vector4(1, 1, 1, 1));
var gridGizmo = glBoostContext.createGridGizmo(4, 2, true, true, false, new GLBoost.Vector4(1, 1, 1, 1));
scene.addChild(gridGizmo);

var gtime = 0;

var glTFLoader = GLBoost.GLTFLoader.getInstance();
//var promise = glTFLoader.loadGLTF(glBoostContext, 'https://raw.githubusercontent.com/cx20/gltf-test/master/sampleModels/VC/glTF-Embedded/VC.gltf', 1, null); // VC.gltf
//var promise = glTFLoader.loadGLTF(glBoostContext, 'https://cdn.rawgit.com/emadurandal/GLBoost/master/examples/standalone/loading_gltf_skinning_anim/resources/body/lady.gltf', 1, null); // lady.gltf
var promise = glTFLoader.loadGLTF(glBoostContext, 'https://rawcdn.githack.com/cx20/gltf-test/ec33f99922e75261956b92220420f0ef66e6963e/sampleModels/WalkingLady/glTF/WalkingLady.gltf', 1, null); // lady.gltf

promise.then(function(mesh) {
    //console.log(mesh);

    var scale = 2.0;
    mesh.scale = new GLBoost.Vector3(scale, scale, scale);
    scene.addChild(mesh);
    //scene.prepareForRender();

    var expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();

    var render = function() {
        scene.setCurrentAnimationValue('time', gtime);
        renderer.clearCanvas();
        //renderer.draw(scene);
        renderer.draw(expression);

        gtime += 0.03;

        if (gtime > 1) {
            gtime = 0.0;
        }

        var rotateMatrix = GLBoost.Matrix33.rotateY(1);
        var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
        camera.eye = rotatedVector;

        requestAnimationFrame(render);
    };
    render();
});