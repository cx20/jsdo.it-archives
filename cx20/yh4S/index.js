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
camera.addComponent('camera', {
    nearClip: 0.01,
    farClip: 1000
});
camera.addComponent('script');
app.root.addChild(camera);
camera.setLocalPosition(0, 0, 1);
// make the camera interactive

//app.assets.loadFromUrl('./orbit-camera.js', 'script', function (err, asset) {
app.assets.loadFromUrl('../../assets/w/x/i/4/wxi4Y.js', 'script', function (err, asset) {
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
// create directional light entity
var light = new pc.Entity('light');
light.addComponent('light');
light.setEulerAngles(45, 0, 0);
app.root.addChild(light);
// handle dropped GLB/GLTF files

var root;
function init(){
    //　.gltf File Test
    var req = new XMLHttpRequest();
    //req.open("get", "https://cdn.rawgit.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf", true); // NG
    //req.open("get", "https://cdn.rawgit.com/cx20/gltf-test/313ae4c3/sampleModels/Box/glTF/Box.gltf", true); // NG
    req.open("get", "https://cdn.rawgit.com/cx20/gltf-test/313ae4c3/sampleModels/Box/glTF-Embedded/Box.gltf", true); // OK
    //req.open("get", "https://cdn.rawgit.com/cx20/gltf-test/313ae4c3/sampleModels/Duck/glTF/Duck.gltf", true); // NG
    //req.open("get", "https://cdn.rawgit.com/cx20/gltf-test/313ae4c3/sampleModels/Duck/glTF-Embedded/Duck.gltf", true); // OK
    req.send(null);
	
    req.onload = function(){
        var json = JSON.parse(req.responseText);
        root = loadGltf(json, app.graphicsDevice);
        app.root.addChild(root);
        camera.script.orbitCamera.focusEntity = root;
    }
/*
    // .glb File Test
    var req = new XMLHttpRequest();
    req.open("get", "https://cdn.rawgit.com/cx20/gltf-test/313ae4c3/sampleModels/Box/glTF-Binary/Box.glb", true);
    //req.open("get", "https://cdn.rawgit.com/cx20/gltf-test/313ae4c3/sampleModels/Duck/glTF-Binary/Duck.glb", true);
    req.responseType = 'arraybuffer';
    req.send(null);
	
    req.onload = function(){
        //var json = JSON.parse(req.responseText);
        //root = loadGltf(json, app.graphicsDevice);
        root = loadGlb(req.response, app.graphicsDevice);
        app.root.addChild(root);
        camera.script.orbitCamera.focusEntity = root;
    }
*/
}

var timer = 0;
app.on("update", function (deltaTime) {
    timer += deltaTime;
    // code executed on every frame
    root.rotate(1, 1, 1);
});

init();
