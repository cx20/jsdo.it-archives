// forked from cx20's "GLBoost で地球を回してみるテスト（改2）（失敗）" http://jsdo.it/cx20/OqXi
// forked from cx20's "GLBoost で地球を回してみるテスト（改）" http://jsdo.it/cx20/6WTV
// forked from cx20's "GLBoost で地球を回してみるテスト" http://jsdo.it/cx20/Chqk
// forked from cx20's "WebGL で地球を回してみるテスト" http://jsdo.it/cx20/cI8t

GLBoost.TARGET_WEBGL_VERSION = 1;

var stats;
var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({
    canvas: canvas,
    clearColor: {
        red: 0.0,
        green: 0.0,
        blue: 0.0,
        alpha: 1
    }
});

stats = new Stats();
stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb
stats.domElement.style.position = "fixed";
stats.domElement.style.left     = "5px";
stats.domElement.style.top      = "5px";
document.body.appendChild(stats.domElement);

var scene = new GLBoost.Scene();

var material = new GLBoost.ClassicMaterial('#world');
var texture = new GLBoost.Texture('../../assets/b/M/L/p/bMLps.jpg', '#world'); // earth.jpg
material.diffuseTexture = texture;

var shader = new GLBoost.PhongShader('#world');
var geometry = new GLBoost.Sphere(20, 24, 24, null, "#world");

var earth = new GLBoost.Mesh(geometry, material);
scene.add(earth);

var camera = new GLBoost.Camera({
    eye: new GLBoost.Vector3(0.0, 0.0, 60.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 1000.0
});

scene.add(camera);
scene.prepareForRender();

var angle = 1;
var axis = new GLBoost.Vector3(0,1,0);

var render = function() {
    renderer.clearCanvas();
    renderer.draw(scene);

/*
    // カメラの位置変更により回転しているように見せかける
    var rotateMatrixY = GLBoost.Matrix33.rotateY(GLBoost.MathUtil.radianToDegree(-0.02));
    rotatedVector = rotateMatrixY.multiplyVector(camera.eye);
    camera.eye = rotatedVector;
*/
    // quaternion による回転
    earth.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
    angle += 0.02;
    
    stats.update();

    requestAnimationFrame(render);
};

render();
