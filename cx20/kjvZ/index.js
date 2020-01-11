// forked from cx20's "[WebGL] RedGL で glTF 2.0形式のデータを表示してみるテスト（調整中）" http://jsdo.it/cx20/6gc2
// forked from cx20's "[WebGL] RedGL を試してみるテスト（その４）" http://jsdo.it/cx20/Isul
// forked from cx20's "[WebGL] RedGL を試してみるテスト（その３）" http://jsdo.it/cx20/KIdO
// forked from cx20's "[WebGL] RedGL を試してみるテスト（その２）" http://jsdo.it/cx20/6jdc
// forked from cx20's "[WebGL] RedGL を試してみるテスト" http://jsdo.it/cx20/s4I4
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC


var scale = 1.0;
var url = "https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
//var url = "https://rawcdn.githack.com/cx20/gltf-test/a152f08b1321902ff0497b6e6407922baa16cca7/tutorialModels/Triangle/glTF/Triangle.gltf";
//var url = "https://cx20.github.io/gltf-test/tutorialModels/Triangle/glTF/Triangle.gltf";
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