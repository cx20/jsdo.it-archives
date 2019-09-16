// forked from cx20's "GLBoost で地球に雲を表示してみるテスト（改）" http://jsdo.it/cx20/OD9U
// forked from cx20's "GLBoost で地球に雲を表示してみるテスト" http://jsdo.it/cx20/kmx9
// forked from cx20's "GLBoost で地球を回してみるテスト（改3）" http://jsdo.it/cx20/SerT
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

var directionalLight = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.4, 0.4, 0.4), new GLBoost.Vector3(-10, -1, -10));
scene.add( directionalLight );
var pointLight1 = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.6, 0.6, 0.6), new GLBoost.Vector3(0, -100, -100));
scene.add( pointLight1 );
var pointLight2 = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.5, 0.5, 0.5), new GLBoost.Vector3(50, 50, -100));
//scene.add( pointLight2 );

var material1 = new GLBoost.ClassicMaterial();
//var shader1 = new GLBoost.SimpleShader();
//var shader1 = new GLBoost.HalfLambertShader();
var shader1 = new GLBoost.PhongShader();
var texture1 = new GLBoost.Texture('../../assets/4/I/b/A/4IbAL.jpg'); // earth_atmos_1024.jpg
material1.diffuseTexture = texture1;
material1.specularColor = new GLBoost.Vector4(0.5, 0.5, 0.5, 1);
material1.shader = shader1;
var geometry1 = new GLBoost.Sphere(20, 24, 24);
var earth = new GLBoost.Mesh(geometry1, material1);
scene.add(earth);

var material2 = new GLBoost.ClassicMaterial();
var shader2 = new GLBoost.HalfLambertShader();
var texture2 = new GLBoost.Texture('../../assets/n/l/9/m/nl9m8.png'); // earth_clouds_1024.png
material2.diffuseTexture = texture2;
material2.shader = shader2;
var geometry2 = new GLBoost.Sphere(20*1.01, 24, 24);
var cloud = new GLBoost.Mesh(geometry2, material2);
scene.add(cloud);

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
var angle2 = 1;
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
    angle += 0.01;

    cloud.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle2));
    angle2 += 0.015;
    
    stats.update();

    requestAnimationFrame(render);
};

render();
