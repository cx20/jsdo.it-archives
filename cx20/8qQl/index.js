// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト" http://jsdo.it/cx20/2Nrf
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var DOT_SIZE = 0.2;
var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:0, green:0, blue:0, alpha:1}});

var scene = new GLBoost.Scene();

var directionalLight1 = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.5, 0.5, 0.5), new GLBoost.Vector3(1, 1,1), canvas);
scene.add( directionalLight1 );

var directionalLight2 = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.5, 0.5, 0.5), new GLBoost.Vector3(-1, -1, -1), canvas);
scene.add( directionalLight2 );

var objLoader = GLBoost.ObjLoader.getInstance();

var mtlString = 
    'newmtl palette\n' +
    'Kd 1.00 1.00 1.00\n' +
    'Ka 0.00 0.00 0.00\n' +
    'map_Kd https://cx20.github.io/jsdo.it-archives/assets/9/9/W/G/99WGE.png\n';

var promise = objLoader.loadObj('../../assets/k/G/f/3/kGf3w.obj', canvas, null, mtlString);
promise.then(function(mesh) {
    scene.add( mesh );

    var camera = new GLBoost.Camera({
        eye: new GLBoost.Vector3(0.0, 0.0, 30.0),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 100.0
    });

    scene.add( camera );

    scene.prepareForRender();

    (function(){
        renderer.clearCanvas();
        renderer.draw(scene);
        var rotateMatrixX = GLBoost.Matrix33.rotateX(-0.02);
        var rotateMatrixY = GLBoost.Matrix33.rotateY(-0.02);
        var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
        rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
        camera.eye = rotatedVector;

        requestAnimationFrame(arguments.callee);
    })();
});
