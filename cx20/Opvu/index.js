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
    mouse: new pc.Mouse(document.body),
    keyboard: new pc.Keyboard(window)
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
camera.addComponent('camera');
camera.addComponent('script');
app.root.addChild(camera);
camera.setLocalPosition(0, 0.5, 1);

// make the camera interactive
app.assets.loadFromUrl('https://rawcdn.githack.com/cx20/gltf-test/08f35fd423b432a87b22679bdda11365b5d1ac22/libs/playcanvas/v0.223.0-dev/orbit-camera.js', 'script', function (err, asset) {
    camera.script.create('orbitCamera', {
        attributes: {
            inertiaFactor: 0,
            distanceMin: 0,
            distanceMax: 0,
            pitchAngleMax: 90,
            pitchAngleMin: -90,
            frameOnStart: true
        }
    });
    camera.script.create('keyboardInput');
    camera.script.create('mouseInput', {
        attributes: {
            orbitSensitivity: 0.3,
            distanceSensitivity: 0.15
        }
    });
});
// set a prefiltered cubemap as the skybox
var cubemapAsset = new pc.Asset('helipad', 'cubemap', {
    url: "https://rawcdn.githack.com/playcanvas/playcanvas-gltf/5489ff62/viewer/cubemap/6079289/Helipad.dds"
}, {
    "textures": [
        "https://rawcdn.githack.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079292/Helipad_posx.png",
        "https://rawcdn.githack.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079290/Helipad_negx.png",
        "https://rawcdn.githack.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079293/Helipad_posy.png",
        "https://rawcdn.githack.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079298/Helipad_negy.png",
        "https://rawcdn.githack.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079294/Helipad_posz.png",
        "https://rawcdn.githack.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079300/Helipad_negz.png"
    ],
    "magFilter": 1,
    "minFilter": 5,
    "anisotropy": 1,
    "name": "Helipad",
    "rgbm": true,
    "prefiltered": "Helipad.dds"
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

// root entity for loaded gltf scenes which can have more than one root entity
var gltfRoot = new pc.Entity('gltf');
app.root.addChild(gltfRoot);
 
function init(){
    //var url = "https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
    //var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
    let url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/c51a03cbff72037e33aa2cc0b7fe7cac4e4bdea8/models/gltf/2.0/EmaSimpleSkin/glTF/EmaSimpleSkin.gltf"; // COLLADA2GLTF 変換結果
    //let url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/76dfc928/models/gltf/2.0/EmaSimpleSkin_blender/glTF/EmaSimpleSkin_blender.gltf"; // Blender出力結果

    var basePath = url.substring(0, url.lastIndexOf("/")) + "/";
    var ext = url.split(".").pop();
    var isGlb = ext == "glb" ? true : false;

    if ( isGlb ) {
        var req = new XMLHttpRequest();
        req.open("get", url, true);
        req.responseType = isGlb ? "arraybuffer" : "";
        req.send(null);

        req.onload = function(){
            var arrayBuffer = req.response;
            loadGlb(arrayBuffer, app.graphicsDevice, function (roots) {
                initScene(roots);
            });
        }
    } else {
        app.assets.loadFromUrl(url, 'json', function (err, asset) {
            var json = asset.resource;
            var gltf = JSON.parse(json);
            loadGltf(gltf, app.graphicsDevice, function (roots) {
                initScene(roots);
            }, {
                basePath: basePath
            });
        });
    }

    var initScene = function (roots) {
        // add the loaded scene to the hierarchy
        roots.forEach(function (root) {
            gltfRoot.addChild(root);
        });

        // focus the camera on the newly loaded scene
        camera.script.orbitCamera.focusEntity = gltfRoot;
    };
}


var timer = 0;
app.on("update", function (deltaTime) {
    timer += deltaTime;
    // code executed on every frame
    gltfRoot.rotate(0, -0.2, 0);
});

init();