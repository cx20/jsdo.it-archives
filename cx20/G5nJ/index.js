// forked from cx20's "[WebGL] GLBoost + ObjLoader を試してみるテスト" http://jsdo.it/cx20/8qQl
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト" http://jsdo.it/cx20/2Nrf
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var arg = new Object;
var pair = location.search.substring(1).split('&');
for (var i = 0; pair[i]; i++) {
    var kv = pair[i].split('=');
    arg[kv[0]] = kv[1];
}

GLBoost.TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({
    canvas: canvas,
    clearColor: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
    }
});

var scene = new GLBoost.Scene();


var pointLight = new GLBoost.PointLight(new GLBoost.Vector3(1.0, 1.0, 1.0), '#world');
pointLight.translate = new GLBoost.Vector3(10, 10, 10);
scene.add(pointLight);

var pointLight2 = new GLBoost.PointLight(new GLBoost.Vector3(1.0, 1.0, 1.0), '#world');
pointLight2.translate = new GLBoost.Vector3(-10, -10, -10);
scene.add(pointLight2);

var camera = new GLBoost.Camera({
    eye: new GLBoost.Vector3(0.0, 1, 5),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 300.0
});
scene.add(camera);


var glTFLoader = GLBoost.GLTFLoader.getInstance();
var promise = glTFLoader.loadGLTF('../../assets/w/b/X/7/wbX7Y.gltf', '#world'); // box.gltf
//var promise = glTFLoader.loadGLTF('/assets/a/G/Q/N/aGQNo', '#world'); // simple_box.gltf
promise.then(function(mesh) {
    scene.add(mesh);

    scene.prepareForRender();

    var render = function() {
        renderer.clearCanvas();
        renderer.draw(scene);

        var rotateMatrix = GLBoost.Matrix33.rotateY(GLBoost.MathUtil.radianToDegree(-0.02));
        var rotatedVector = rotateMatrix.multiplyVector(camera.eye);
        camera.eye = rotatedVector;

        requestAnimationFrame(render);
    };
    render();
});
