// forked from cx20's "[WebGL] Babylon.js で木星を表示させてみるテスト" http://jsdo.it/cx20/Muj5
// forked from cx20's "[WebGL] Babylon.js で火星を表示させてみるテスト" http://jsdo.it/cx20/qB1p
// forked from cx20's "[WebGL] Babylon.js で地球を回してみるテスト（改）" http://jsdo.it/cx20/cqYb
// forked from cx20's "Babylon.js で地球を回してみるテスト" http://jsdo.it/cx20/25mN

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var jupiter;
var cloud;

var createScene = function(){
    
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 200, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.wheelDeltaPercentage = 0.005;
    
    //var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(500, 200, -500), scene);
    var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(500, 200, -500), scene);
    light.intensity = 1.0;
    
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

    //var videoTexture  = new BABYLON.VideoTexture("video", ["jupiter.webm", "jupiter.mp4"], scene, true, {autoplay: true});
    var videoTexture  = new BABYLON.VideoTexture("video", ["../../assets/g/B/h/x/gBhxi.mp4", "../../assets/q/h/s/a/qhsaJ.webm"], scene, true, {autoplay: true});
    videoTexture.video.playbackRate = 0.5;
    
    jupiter = BABYLON.MeshBuilder.CreateSphere('sphere01', {segments:32, diameter:100}, scene);
    var material1 = new BABYLON.StandardMaterial("material01", scene);
    material1.diffuseTexture  = videoTexture
    material1.specularTexture = new BABYLON.Texture("../../assets/k/l/5/G/kl5Gk.jpg", scene); // black_specular_1024.jpg
   
    jupiter.material = material1;
    
    return scene;
}

var scene = createScene();

var rad1 = 0.0;
var rad2 = 0.0;
engine.runRenderLoop(function(){
    rad1 -= Math.PI * 1.0 * 0.2 / 180.0;
    rad2 -= Math.PI * 1.2 * 0.2 / 180.0;
    //jupiter.rotation.y = rad1;
    jupiter.rotation.y -= 0.005;
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});
