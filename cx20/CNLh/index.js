// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その２１）（調整中）" http://jsdo.it/cx20/w5fs
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その２０）（調整中）" http://jsdo.it/cx20/6dtI
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１９）（調整中）" http://jsdo.it/cx20/Q3iT
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１８）（調整中）" http://jsdo.it/cx20/mtpa
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１７）（調整中）" http://jsdo.it/cx20/kzNO
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１６）（調整中）" http://jsdo.it/cx20/C51j
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/SgVT
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/QQzB
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１３）（調整中）" http://jsdo.it/cx20/uUx8
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１２）（調整中）" http://jsdo.it/cx20/4b3J
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１１）（調整中）" http://jsdo.it/cx20/eDKW
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/mdUF
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/KgME
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その８）（調整中）" http://jsdo.it/cx20/KecT
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その７）（調整中）" http://jsdo.it/cx20/mWcu
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その６）（調整中）" http://jsdo.it/cx20/YSVu
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その５）（調整中）" http://jsdo.it/cx20/MNU4
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その４）（調整中）" http://jsdo.it/cx20/8ZXH
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/Opvu
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その２）（調整中）" http://jsdo.it/cx20/ItxI
// forked from cx20's "[WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（調整中）" http://jsdo.it/cx20/SCCy
// forked from cx20's "[WebGL] PlayCanvas + glTF ファイルを試してみるテスト" http://jsdo.it/cx20/yh4S
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト（その４）" http://jsdo.it/cx20/a066
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト（その３）" http://jsdo.it/cx20/cNue
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト（その２）" http://jsdo.it/cx20/wsZw
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト" http://jsdo.it/cx20/enuS
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var decoderModule;

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
camera.setLocalPosition(0, 0, 1);

// make the camera interactive
app.assets.loadFromUrl('https://cdn.rawgit.com/cx20/gltf-test/e1324ae3/libs/playcanvas/v1.9.0-dev/orbit-camera.js', 'script', function (err, asset) {
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
    url: "https://cdn.rawgit.com/playcanvas/playcanvas-gltf/5489ff62/viewer/cubemap/6079289/Helipad.dds"
}, {
    "textures": [
        "https://cdn.rawgit.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079292/Helipad_posx.png",
        "https://cdn.rawgit.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079290/Helipad_negx.png",
        "https://cdn.rawgit.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079293/Helipad_posy.png",
        "https://cdn.rawgit.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079298/Helipad_negy.png",
        "https://cdn.rawgit.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079294/Helipad_posz.png",
        "https://cdn.rawgit.com/playcanvas/playcanvas-gltf/tree/master/viewer/cubemap/6079300/Helipad_negz.png"
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

// root entity for loaded gltf scenes which can have more than one root entity
var gltfRoot = new pc.Entity('gltf');
app.root.addChild(gltfRoot);


function loadScript(src) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    return new Promise(function (resolve) {
        script.onload = resolve;
        head.appendChild(script);
    });
}

function init(){
    if (true) {//typeof WebAssembly !== 'object') {
        loadScript('https://cdn.rawgit.com/cx20/gltf-test/e1324ae3/libs/playcanvas/v1.9.0-dev/draco_decoder.js').then(function () {
            decoderModule = DracoDecoderModule();
            onLoad();
        });
    } else {
        loadScript('https://cdn.rawgit.com/cx20/gltf-test/e1324ae3/libs/playcanvas/v1.9.0-dev/draco_wasm_wrapper.js').then(function () {
            fetch('https://cdn.rawgit.com/cx20/gltf-test/e1324ae3/libs/playcanvas/v1.9.0-dev/draco_decoder.wasm').then(function (response) {
                response.arrayBuffer().then(function (arrayBuffer) {
                    decoderModule = DracoDecoderModule({ wasmBinary: arrayBuffer });
                    onLoad();
                });
            });
        });
    }
}

function onLoad() {
    //var url = "https://cdn.rawgit.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb";
    //var url = "https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb";
    //var url = "https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb";
    //var url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb";
    //var url = "https://cdn.rawgit.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_01.gltf";
    //var url = "https://cdn.rawgit.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_04.gltf";
    //var url = "https://cdn.rawgit.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_07.gltf";
    //var url = "https://cdn.rawgit.com/mrdoob/three.js/r97/examples/models/gltf/BotSkinned/glTF-MaterialsUnlit/Bot_Skinned.gltf";
    //var url = "https://cdn.rawgit.com/cx20/gltf-test/7af4f399/tutorialModels/SpecGlossVsMetalRough/glTF/SpecGlossVsMetalRough.gltf";
    //var url = "https://cdn.rawgit.com/cx20/jsdo-static-contents/33ab7250/models/gltf/2.0/Itokawa/glTF-Draco/Itokawa.glb";
    //var url = "https://rawcdn.githack.com/BabylonJS/Exporters/9bc140006be149687be045f60b4a25cdb45ce4fc/Maya/Samples/glTF 2.0/T-Rex/trex_running.gltf";
    var url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/ef789b017e86ed960bd38df4617fadbbfbd245ec/models/gltf/2.0/Kaendoki/glTF-Binary/Kaendoki.glb";

    var scale = 0.01;
    var basePath = url.substring(0, url.lastIndexOf("/")) + "/";
    var ext = url.split(".").pop();
    var isGlb = (ext == "glb") ? true : false;

    // create directional light entity
    var light = new pc.Entity('light');
    light.addComponent('light',);
    app.root.addChild(light);
    light.setEulerAngles(45, 0, 45);
 
    // rotator script
    var Rotate = pc.createScript('rotate');
    Rotate.prototype.update = function (deltaTime) {
        this.entity.rotate(0, -deltaTime * 20, 0);
    };
    // glTF scene root that rotates
    var gltfRoot = new pc.Entity();
    gltfRoot.addComponent('script');
    gltfRoot.script.create('rotate');
    app.root.addChild(gltfRoot);

    if ( isGlb ) {
        var req = new XMLHttpRequest();
        req.open("get", url, true);
        req.responseType = isGlb ? "arraybuffer" : "";
        req.send(null);

        req.onload = function(){
            var arrayBuffer = req.response;
            loadGlb(arrayBuffer, app.graphicsDevice, function (model, textures, animationClips) {
                // add the loaded scene to the hierarchy
                gltfRoot.addComponent('model');
                gltfRoot.model.model = model;
                if ( animationClips && animationClips.length > 0 ) {
                    gltfRoot.animComponent = new AnimationComponent();
                }
                if ( gltfRoot.animComponent ) {
                    // Add all animations to the model's animation component
                    for (var i = 0; i < animationClips.length; i++) {
                        animationClips[i].transferToRoot(gltfRoot);
                        gltfRoot.animComponent.addClip(animationClips[i]);
                    }
                    gltfRoot.animComponent.playClip(animationClips[0].name);
                }
                // focus the camera on the newly loaded scene
                camera.script.orbitCamera.focusEntity = gltfRoot;
            }, {
                decoderModule: decoderModule
            });
        }
    } else {
        app.assets.loadFromUrl(url, 'json', function (err, asset) {
            var json = asset.resource;
            var gltf = JSON.parse(json);
            loadGltf(gltf, app.graphicsDevice, function (model, textures, animationClips) {
                // add the loaded scene to the hierarchy
                gltfRoot.addComponent('model');
                gltfRoot.model.model = model;
                if ( animationClips && animationClips.length > 0 ) {
                    gltfRoot.animComponent = new AnimationComponent();
                }
                if ( gltfRoot.animComponent ) {
                    // Add all animations to the model's animation component
                    for (var i = 0; i < animationClips.length; i++) {
                        animationClips[i].transferToRoot(gltfRoot);
                        gltfRoot.animComponent.addClip(animationClips[i]);
                    }
                    gltfRoot.animComponent.playClip(animationClips[0].name);
                }
                // focus the camera on the newly loaded scene
                camera.script.orbitCamera.focusEntity = gltfRoot;
            }, {
                decoderModule: decoderModule,
                basePath: basePath
            });
        });
    }
}

init();