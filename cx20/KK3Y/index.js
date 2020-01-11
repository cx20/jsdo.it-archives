// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/g2zj
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/qmYS
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その１３）" http://jsdo.it/cx20/mXMr
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その１２）" http://jsdo.it/cx20/Mk77
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その１１）" http://jsdo.it/cx20/EPnr
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/yJLW
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/8ZrJ
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その８）（調整中）" http://jsdo.it/cx20/ImHb
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その７）（調整中）" http://jsdo.it/cx20/qhnm
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その６）" http://jsdo.it/cx20/eXKx
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その５）" http://jsdo.it/cx20/0CbF
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その４）" http://jsdo.it/cx20/E5A8
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その３）" http://jsdo.it/cx20/qrlI
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（その２）" http://jsdo.it/cx20/uqsM
// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（調整中）" http://jsdo.it/cx20/6gc2
// forked from cx20's "[WebGL] RedGL を試してみるテスト（その４）" http://jsdo.it/cx20/Isul
// forked from cx20's "[WebGL] RedGL を試してみるテスト（その３）" http://jsdo.it/cx20/KIdO
// forked from cx20's "[WebGL] RedGL を試してみるテスト（その２）" http://jsdo.it/cx20/6jdc
// forked from cx20's "[WebGL] RedGL を試してみるテスト" http://jsdo.it/cx20/s4I4
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC


var scale = 20;
//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
//var url = "https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/tutorialModels/Triangle/glTF/Triangle.gltf";
//var url = "https://cx20.github.io/gltf-test/tutorialModels/Triangle/glTF/Triangle.gltf";
//var url = "https://rawcdn.githack.com/cx20/gltf-test/a9cda755ff1c6656c5b3797b8747153e9e630947/tutorialModels/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
//var url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/c51a03cbff72037e33aa2cc0b7fe7cac4e4bdea8/models/gltf/2.0/EmaSimpleSkin/glTF/EmaSimpleSkin.gltf"; // COLLADA2GLTF 変換結果
//var url = "https://rawcdn.githack.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf";
//var url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/94bb7090/models/gltf/2.0/VoxelCorgi/glTF_merge/VoxelCorgi.gltf";
//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
//var url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf";
//var url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/scene.gltf";
//var url = "https://rawcdn.githack.com/mrdoob/rome-gltf/784089b4/files/models/life_soup/quadruped_fox.gltf";
//var url = "https://rawcdn.githack.com/pissang/claygl/c4f45119/example/assets/models/SambaDancing/SambaDancing.gltf";
//var url = "https://rawcdn.githack.com/cx20/gltf-test/e63efa65/tutorialModels/FlightHelmet/glTF/FlightHelmet.gltf";
//var url = "https://rawcdn.githack.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb";
//var url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb";
//var url = "https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb";
var url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb";

var base = url.substr(0, url.lastIndexOf("/") + 1);
var file = url.substr(url.lastIndexOf("/") + 1);

var canvas;
canvas = document.getElementById('canvas');
document.body.appendChild(canvas);
RedGL(canvas, function (v) {
    var tWorld, tView, tScene, tController, tRenderer;
    this['world'] = tWorld = RedWorld();
    tScene = RedScene(this);
    tController = RedObitController(this);
    tController.pan = 30;
    tController.tilt = -30;
    tController.distance = 4;
    tRenderer = RedRenderer();
    tView = RedView('HelloRedGL', this, tScene, tController);
    tWorld.addView(tView);
    tScene['grid'] = RedGrid(this);
    //tScene['axis'] = RedAxis(this);
    tScene.skyBox = RedSkyBox(this, [
        'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/px.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/nx.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/py.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/ny.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/pz.jpg',
        'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/nz.jpg'
    ]);
    var tALight = RedAmbientLight(this)
    tScene.addLight(tALight)
    var tDLight = RedDirectionalLight(this)
    tScene.addLight(tDLight)
    tDLight.x = 2;
    tDLight.y = 1;
    tDLight.z = 1;
    tRenderer.start(this, function (time) {
      //console.log(time)
    });
    //tRenderer.setDebugButton();
    console.log(this);

    RedGLTFLoader(
        this, // redGL
        base, // assetRootPath
        file, // fileName
        function (v) { // callBack
            v['resultMesh'].scaleX = scale;
            v['resultMesh'].scaleY = scale;
            v['resultMesh'].scaleZ = scale;
            
            tScene.addChild(v['resultMesh']);
        },
        RedBitmapCubeTexture(this, // environmentTexture
            [
                'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/px.jpg',
                'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/nx.jpg',
                'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/py.jpg',
                'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/ny.jpg',
                'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/pz.jpg',
                'https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/textures/cube/skybox/nz.jpg'
            ]
        )
    );
});