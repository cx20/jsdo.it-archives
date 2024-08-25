// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その２）（調整中）" http://jsdo.it/cx20/ItxI
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（調整中）" http://jsdo.it/cx20/SCCy
// forked from cx20's "[WebGL] PlayCanvas + glTF ファイルを試してみるテスト" http://jsdo.it/cx20/yh4S
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト（その４）" http://jsdo.it/cx20/a066
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト（その３）" http://jsdo.it/cx20/cNue
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト（その２）" http://jsdo.it/cx20/wsZw
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト" http://jsdo.it/cx20/enuS
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// create a PlayCanvas application
var canvas = document.getElementById('application');
var app = new pc.Application(canvas, {
    mouse: new pc.Mouse(canvas),
    touch: new pc.TouchDevice(canvas)
});
app.start();

// fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
app.scene.gammaCorrection = pc.GAMMA_SRGB;
app.scene.toneMapping = pc.TONEMAP_ACES;

// ensure canvas is resized when window changes size
window.addEventListener('resize', function() {
    app.resizeCanvas();
});

// create camera entity
var camera = new pc.Entity('camera');
camera.addComponent('camera', {
    nearClip: 0.01,
    farClip: 1000
});
camera.addComponent('script');
app.root.addChild(camera);
camera.setLocalPosition(1, 0.5, 1);

app.assets.loadFromUrl('https://cx20.github.io/gltf-test/libs/playcanvas/v2.0.0/orbit-camera.js', 'script', function (err, asset) {
    camera.script.create('orbitCamera');
    camera.script.create("orbitCameraInputMouse");
    camera.script.create("orbitCameraInputTouch");

});

// set a prefiltered cubemap as the skybox
var cubemapAsset = new pc.Asset('helipad', 'cubemap', {
    url: "https://rawcdn.githack.com/playcanvas/playcanvas-gltf/5489ff62/viewer/cubemap/6079289/Helipad.dds"
}, {
    "rgbm": true
});
app.assets.add(cubemapAsset);
app.assets.load(cubemapAsset);
cubemapAsset.ready(function () {
    app.scene.skyboxMip = 2;
    app.scene.setSkybox(cubemapAsset.resources);
});

// create directional light entity
var light = new pc.Entity('light');
light.addComponent('light');
light.setEulerAngles(45, 0, 0);
app.root.addChild(light);

var gltf;
function init(){
    //var url = "https://rawcdn.githack.com/cx20/gltf-test/313ae4c3/sampleModels/Box/glTF-Embedded/Box.gltf"
    //var url = "https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
    //var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
    var url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/c51a03cbff72037e33aa2cc0b7fe7cac4e4bdea8/models/gltf/2.0/EmaSimpleSkin/glTF/EmaSimpleSkin.gltf"; // COLLADA2GLTF 変換結果
    var filename = url.split('/').pop();
    app.assets.loadFromUrlAndFilename(url, filename, "container", function (err, asset) {
        var resource = asset.resource;
        gltf = new pc.Entity('gltf');
        gltf.addComponent('model', {
            type: "asset",
            asset: resource.model
        });
        app.root.addChild(gltf);
        
        // create animations
        if (resource.animations && resource.animations.length > 0) {
            gltf.addComponent('animation', {
                assets: resource.animations.map(function(asset) {
                    return asset.id;
                }),
                speed: 1
            });
        }

        if ( camera ) {
            var orbitCamera = camera.script.orbitCamera;
            orbitCamera.focus(gltf);
        }
    });
}

var timer = 0;
app.on("update", function (deltaTime) {
    timer += deltaTime;
    // code executed on every frame
    if (gltf) {
        //gltf.rotate(0, -1, 0);
    }
});

init();
