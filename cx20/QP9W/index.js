// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/C2Bo
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その８）（調整中）" http://jsdo.it/cx20/4g1I
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その７）（調整中）" http://jsdo.it/cx20/qjyh
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その６）（調整中）" http://jsdo.it/cx20/CJ4B
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その５）（調整中）" http://jsdo.it/cx20/6whX
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その４）（調整中）" http://jsdo.it/cx20/SkgH
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/Elp4
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その２）（調整中）" http://jsdo.it/cx20/6jUn
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（調整中）" http://jsdo.it/cx20/i5iW
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/aWAs
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/6Ujc
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/O7Hi
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/gKXr
// forked from cx20's "[WebGL] Hilo3d を試してみるテスト" http://jsdo.it/cx20/gwMA
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
//var url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/76dfc928/models/gltf/2.0/EmaSimpleSkin_blender/glTF/EmaSimpleSkin_blender.gltf";
//var url = "https://rawcdn.githack.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf";
//var url = "http://jsrun.it/assets/U/j/F/1/UjF1i";
//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
//var url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf";
//var url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/scene.gltf";
var url = "https://rawcdn.githack.com/mrdoob/rome-gltf/784089b4/files/models/life_soup/quadruped_fox.gltf";

var scale = 0.05;
var modelName = "EmaSimpleSkin_blender";

var camera = new Hilo3d.PerspectiveCamera({
    aspect: innerWidth / innerHeight,
    fov:75,
    far: 2000,
    near: 1,
    z:3
});

var stage = new Hilo3d.Stage({
    container: document.body,
    camera: camera,
    clearColor: new Hilo3d.Color(0,0,0),
    width: innerWidth,
    height: innerHeight,
    pixelRatio:1
});

var container = new Hilo3d.Node({
    onUpdate:function(){
        this.rotationY -= 1;
    }
}).addTo(stage);

var directionLight = new Hilo3d.DirectionalLight({
    color:new Hilo3d.Color(0.8, 0.8, 0.8),
    direction:new Hilo3d.Vector3(1, -1, 0)
}).addTo(stage);

var ambientLight = new Hilo3d.AmbientLight({
    color:new Hilo3d.Color(1, 1, 1),
    amount: .5
}).addTo(stage);

var ticker = new Hilo3d.Ticker(60);
ticker.addTick(stage);
ticker.addTick(Hilo3d.Tween);
ticker.addTick(Hilo3d.Animation);
ticker.start(true);

var loadingElem = document.getElementById('loading');
var loadQueue = new Hilo3d.LoadQueue([{
    type: 'CubeTexture',
    images: [
        'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/diffuse/bakedDiffuse_01.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/diffuse/bakedDiffuse_02.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/diffuse/bakedDiffuse_03.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/diffuse/bakedDiffuse_04.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/diffuse/bakedDiffuse_05.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/diffuse/bakedDiffuse_06.jpg'
    ]
}, {
    type: 'CubeTexture',
    right: 'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/px.jpg',
    left: 'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/nx.jpg',
    top: 'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/py.jpg',
    bottom: 'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/ny.jpg',
    front: 'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/pz.jpg',
    back: 'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/nz.jpg',
},{
    src: 'https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/brdfLUT.png',
    type:'Texture'
},{
    src:url
}]).on('load', function(e){
    var progress = loadQueue.getLoaded()/loadQueue.getTotal();
    if(progress >= 1){
        loadingElem.parentNode.removeChild(loadingElem);
    }
    else{
        loadingElem.innerHTML = 'loading ' + (progress*100).toFixed(2) + '% ...';
    }
}).on('complete', function () {
    var result = loadQueue.getAllContent();
    var diffuseEnvMap = result[0];
    var specularEnvMap = result[1];
    var brfdTexture = result[2];
    var model = window.model = result[3];
    var node = model.node;

    switch(modelName){
        case 'VC':
            stage.camera = model.cameras[4];
            break;
        case 'Cameras':
            // stage.camera = model.cameras[0];
            break;
        case 'GearboxAssy':
            scale = 0.1;
            node.setPosition(-159.20*scale, -17.02*scale, -3.21*scale);
            break;
        case 'AnimatedMorphSphere':
            diffuseEnvMap = null;
            break;
    }

    model.materials.forEach(function (material) {
        material.brdfLUT = brfdTexture;
        material.diffuseEnvMap = diffuseEnvMap;
        material.specularEnvMap = specularEnvMap;
        material.cullFace = false; // TODO: I do not know how to set correctly in Hilo3d
    });

    node.setScale(scale);
    container.addChild(node);
    container.addChild(new Hilo3d.AxisHelper());

    var skybox = new Hilo3d.Mesh({
        geometry: new Hilo3d.BoxGeometry(),
        material: new Hilo3d.BasicMaterial({
            lightType: 'NONE',
            side: Hilo3d.constants.BACK,
            diffuse: specularEnvMap
        })
    }).addTo(container);
    skybox.setScale(20);

    var orbitControls = new OrbitControls(stage, {
        isLockMove:true,
        isLockZ:true,
    });
}).start();