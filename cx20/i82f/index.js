// forked from cx20's "[WebGL] Babylon.js  で PBR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/UDOz
// forked from cx20's "[WebGL] Babylon.js  で PBR を試してみるテスト（調整中）" http://jsdo.it/cx20/ebAu
// forked from cx20's "[WebGL] Babylon.js のプリミティブ型を試してみるテスト（パラメータオプション形式編）" http://jsdo.it/cx20/WZ1p
// forked from cx20's "[WebGL] Babylon.js のプリミティブ型を試してみるテスト" http://jsdo.it/cx20/ayyF
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/jwt0
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var plane;
var cube;
var sphere;
var circle;
var cylinder;
var cone;
var knot;
var torus;
var octa;

var createScene = function(engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("camera", 0, 1, 5, BABYLON.Vector3.Zero(), scene);
    camera.setPosition( new BABYLON.Vector3(0, 0, -5) );
    camera.attachControl(canvas, false, false);
    camera.wheelDeltaPercentage = 0.005;
    scene.activeCamera = camera;
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var light1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0.0, -1.0, 0.5), scene);
    var light2 = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(-0.5, -0.5, -0.5), scene);
    // Skybox
    var cubeTexture = new BABYLON.CubeTexture(
        "https://rawcdn.githack.com/cx20/gltf-test/7c5f5eddf9e204d9bcbbc6ac06e610bc261fecc1/textures/cube/skybox/",
        scene,
        ["px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg"]
    );
    scene.createDefaultSkybox(cubeTexture, true, 10000);
    var urlBase = "https://rawcdn.githack.com/cx20/jsdo-static-contents/2e26d2e3787eef8301ec72393978d3d835024a3c/";
/*
    // https://www.cgbookcase.com/textures/brick-wall-02
    var textureAO         = new BABYLON.Texture(urlBase + 'textures/Brick_wall_02_1K_AO.jpg', scene);
    var textureBase_Color = new BABYLON.Texture(urlBase + 'textures/Brick_wall_02_1K_Base_Color.jpg', scene);
    var textureHeight     = new BABYLON.Texture(urlBase + 'textures/Brick_wall_02_1K_Height.jpg', scene);
    var textureNormal     = new BABYLON.Texture(urlBase + 'textures/Brick_wall_02_1K_Normal.jpg', scene);
    var textureRoughness  = new BABYLON.Texture(urlBase + 'textures/Brick_wall_02_1K_Roughness.jpg', scene);
*/
    // https://www.cgbookcase.com/textures/metal-tiles-03
    var textureAO         = new BABYLON.Texture(urlBase + 'textures/Metal_tiles_03_1K_AO.jpg', scene);
    var textureBase_Color = new BABYLON.Texture(urlBase + 'textures/Metal_tiles_03_1K_Base_Color.jpg', scene);
    var textureHeight     = new BABYLON.Texture(urlBase + 'textures/Metal_tiles_03_1K_Height.jpg', scene);
    var textureMetallic   = new BABYLON.Texture(urlBase + 'textures/Metal_tiles_03_1K_Metallic.jpg', scene);
    var textureNormal     = new BABYLON.Texture(urlBase + 'textures/Metal_tiles_03_1K_Normal.jpg', scene);
    var textureRoughness  = new BABYLON.Texture(urlBase + 'textures/Metal_tiles_03_1K_Roughness.jpg', scene);

    cube = BABYLON.MeshBuilder.CreateBox('box', {height: 2, width: 2, depth: 2}, scene);
    //cube.position = new BABYLON.Vector3(0, 0, 2); 
    
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    pbr.baseTexture = textureBase_Color;
    pbr.normalTexture = textureNormal;
    pbr.metallicRoughnessTexture = textureRoughness;

    cube.material = pbr;
    
    return scene;
}

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
engine.enableOfflineSupport = false; // Suppress manifest reference
var scene = createScene(engine);

var rad = 0.0;
engine.runRenderLoop(function () {
    rad += Math.PI * 0.5 / 180.0;

    cube.rotation.y = rad;

    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});
