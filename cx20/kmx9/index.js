// forked from cx20's "GLBoost で地球を回してみるテスト（改3）" http://jsdo.it/cx20/SerT
// forked from cx20's "GLBoost で地球を回してみるテスト（改2）（失敗）" http://jsdo.it/cx20/OqXi
// forked from cx20's "GLBoost で地球を回してみるテスト（改）" http://jsdo.it/cx20/6WTV
// forked from cx20's "GLBoost で地球を回してみるテスト" http://jsdo.it/cx20/Chqk
// forked from cx20's "WebGL で地球を回してみるテスト" http://jsdo.it/cx20/cI8t

GLBoost.TARGET_WEBGL_VERSION = 1;

let width = window.innerWidth;
let height = window.innerHeight;
let stats;
let canvas = document.getElementById("world");

let renderer = new GLBoost.Renderer({
    canvas: canvas,
    clearColor: {
        red: 0.0,
        green: 0.0,
        blue: 0.0,
        alpha: 1
    }
});
renderer.resize(width, height);

stats = new Stats();
stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb
stats.domElement.style.position = "fixed";
stats.domElement.style.left     = "5px";
stats.domElement.style.top      = "5px";
document.body.appendChild(stats.domElement);

let scene = new GLBoost.Scene();

let directionalLight = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.4, 0.4, 0.4), new GLBoost.Vector3(-10, -1, -10));
scene.add( directionalLight );
let pointLight1 = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.6, 0.6, 0.6), new GLBoost.Vector3(0, -100, -100));
scene.add( pointLight1 );
let pointLight2 = new GLBoost.DirectionalLight(new GLBoost.Vector3(0.5, 0.5, 0.5), new GLBoost.Vector3(50, 50, -100));
//scene.add( pointLight2 );

let material1 = new GLBoost.ClassicMaterial();
//let shader1 = new GLBoost.SimpleShader();
//let shader1 = new GLBoost.HalfLambertShader();
let shader1 = new GLBoost.PhongShader();
let texture1 = new GLBoost.Texture('../../assets/4/I/b/A/4IbAL.jpg'); // earth_atmos_1024.jpg
material1.diffuseTexture = texture1;
material1.shader = shader1;
let geometry1 = new GLBoost.Sphere(20, 24, 24);
let earth = new GLBoost.Mesh(geometry1, material1);
scene.add(earth);

let material2 = new GLBoost.ClassicMaterial();
let shader2 = new GLBoost.HalfLambertShader();
let texture2 = new GLBoost.Texture('../../assets/n/l/9/m/nl9m8.png'); // earth_clouds_1024.png
material2.diffuseTexture = texture2;
material2.shader = shader2;
let geometry2 = new GLBoost.Sphere(20*1.01, 24, 24);
let cloud = new GLBoost.Mesh(geometry2, material2);
scene.add(cloud);

let camera = new GLBoost.Camera({
    eye: new GLBoost.Vector3(0.0, 0.0, 60.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: width/height,
    zNear: 0.1,
    zFar: 1000.0
});

scene.add(camera);
scene.prepareForRender();

let angle = 1;
let angle2 = 1;
let axis = new GLBoost.Vector3(0,1,0);

let render = function() {
    renderer.clearCanvas();
    renderer.draw(scene);

/*
    // カメラの位置変更により回転しているように見せかける
    let rotateMatrixY = GLBoost.Matrix33.rotateY(GLBoost.MathUtil.radianToDegree(-0.02));
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
