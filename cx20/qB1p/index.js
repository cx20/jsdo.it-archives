// forked from cx20's "[WebGL] Babylon.js で地球を回してみるテスト（改）" http://jsdo.it/cx20/cqYb
// forked from cx20's "Babylon.js で地球を回してみるテスト" http://jsdo.it/cx20/25mN

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var mars;
var cloud;

var createScene = function(){
    
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 200, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.wheelDeltaPercentage = 0.005;
    
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(1000, 500, -500), scene);
    light.intensity = 1.5;
    
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
    
    mars = BABYLON.MeshBuilder.CreateSphere('sphere01', {segments:32, diameter:100}, scene);
    var material1 = new BABYLON.StandardMaterial("material01", scene);
    material1.diffuseTexture  = new BABYLON.Texture("../../assets/w/x/n/n/wxnn6.jpg", scene); // mars_atmos_1024.jpg
    material1.normalTexture   = new BABYLON.Texture("../../assets/q/W/O/6/qWO6j.jpg", scene); // mars_normal_1024.jpg
    material1.specularTexture = new BABYLON.Texture("../../assets/k/l/5/G/kl5Gk.jpg", scene); // black_specular_1024.jpg
    mars.material = material1;
    
/*
    cloud = BABYLON.MeshBuilder.CreateSphere('cloud', {segments:32, diameter:102}, scene);
    var material2 = new BABYLON.StandardMaterial("materialCloud", scene);
    material2.diffuseTexture = new BABYLON.Texture("/assets/M/Q/s/8/MQs8f.png", scene); // mars_clouds_1024.png
    material2.alpha = 1.0;
    material2.diffuseTexture.hasAlpha = true;
    material2.useAlphaFromDiffuseTexture = true;
    cloud.material = material2;
*/    
    return scene;
}

var scene = createScene();

var rad1 = 0.0;
var rad2 = 0.0;
engine.runRenderLoop(function(){
    rad1 -= Math.PI * 1.0 * 0.2 / 180.0;
    rad2 -= Math.PI * 1.2 * 0.2 / 180.0;
    mars.rotation.y = rad1;
    //cloud.rotation.y = rad2;
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});
