// forked from cx20's "[WebGL] Babylon.js で木星を表示させてみるテスト" http://jsdo.it/cx20/Muj5
// forked from cx20's "[WebGL] Babylon.js で火星を表示させてみるテスト" http://jsdo.it/cx20/qB1p
// forked from cx20's "[WebGL] Babylon.js で地球を回してみるテスト（改）" http://jsdo.it/cx20/cqYb
// forked from cx20's "Babylon.js で地球を回してみるテスト" http://jsdo.it/cx20/25mN

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var sun;
var cloud;
var anchor;

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 3, new BABYLON.Vector3(0, 0, 0), scene);
    
    camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = 2.5;
    camera.upperRadiusLimit = 10;
    camera.pinchDeltaPercentage = 0.01;
    camera.wheelDeltaPercentage = 0.01;

    anchor = new BABYLON.TransformNode("");
    anchor.position = new BABYLON.Vector3(0, 0, 0);
    camera.parent = anchor;


    scene.clearColor = new BABYLON.Color3(0.0, 0.0, 0.0);

    // Skybox
    var cubeTexture = new BABYLON.CubeTexture(
        "https://rawcdn.githack.com/mrdoob/three.js/d8b547a7c1535e9ff044d196b72043f5998091ee/examples/textures/cube/MilkyWay/",
        scene,
        ["dark-s_px.jpg", "dark-s_py.jpg", "dark-s_pz.jpg", "dark-s_nx.jpg", "dark-s_ny.jpg", "dark-s_nz.jpg"]
    );
    //scene.createDefaultSkybox(cubeTexture, true, 100);

    // If you care about the performance of createDefaultSkybox(), The following code can be used to avoid this. However, the environmental texture will not be applied.
    // http://www.html5gamedevs.com/topic/36997-using-skybox-takes-time-to-display-is-it-a-usage-problem/?tab=comments#comment-211765
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = cubeTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    // Lets create a sun effect made of 3 different particle system
    // Definition: https://assets.babylonjs.com/particles/systems/sun.json
    BABYLON.ParticleHelper.CreateAsync("sun", scene).then((set) => {
        set.start();
    });

    return scene;
}

var scene = createScene();

var rad1 = 0.0;
var rad2 = 0.0;
engine.runRenderLoop(function(){
    rad1 -= Math.PI * 1.0 * 0.05 / 180.0;
    rad2 -= Math.PI * 1.2 * 0.05 / 180.0;
    //sun.rotation.y = rad1;
    anchor.rotation = new BABYLON.Vector3(0, rad1, 0);
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});
