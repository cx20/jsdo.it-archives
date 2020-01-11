// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/cFfM
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/4vdQ
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その１３）（調整中）" http://jsdo.it/cx20/EDu8Q
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その１２）（調整中）" http://jsdo.it/cx20/OPwT
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その１１）（調整中）" http://jsdo.it/cx20/8xUn
// forked from cx20's "[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/QP9W
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

//var url = "https://rawcdn.githack.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb";
//var url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb";
//var url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb";
//var url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_05.glb";
//var url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_10.glb";
var url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb";

var scale = 20;

var camera = new Hilo3d.PerspectiveCamera({
    aspect: innerWidth / innerHeight,
    fov: 60,
    far: 10000,
    near: 1,
    x: 0,
    y: 1,
    z: 4.7
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
        //this.rotationY -= 0.1;
    }
}).addTo(stage);
container.rotationX = 20;
//container.rotationY = -45;

var directionLight = new Hilo3d.DirectionalLight({
    amount:2,
    color:new Hilo3d.Color(1, 1, 1),
    direction:new Hilo3d.Vector3(0, 0, -1)
}).addTo(stage);

var ambientLight = new Hilo3d.AmbientLight({
    color:new Hilo3d.Color(1, 1, 1),
    amount: .2
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
    node.setPosition(0, 0, 0);
    model.materials.forEach(function (material) {
        material.brdfLUT = brfdTexture;
        material.diffuseEnvMap = diffuseEnvMap;
        material.specularEnvMap = specularEnvMap;
        //material.cullFace = false; // TODO: I do not know how to set correctly in Hilo3d
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
    skybox.setScale(100);

    var orbitControls = new OrbitControls(stage, {
        isLockMove:true,
        isLockZ:true,
    });
}).start();
