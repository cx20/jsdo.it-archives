// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その３）" http://jsdo.it/cx20/ATr7
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その２）" http://jsdo.it/cx20/WVW3
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト" http://jsdo.it/cx20/yxN2
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// forked from iiceman's "colliding lightsabers"  http://www.babylonjs-playground.com/#1WUQ1S#4
var createScene = function() {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("cam", -1.57079633, 1.57079633, 20, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(engine.getRenderingCanvas());

    // This targets the camera to scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Sword 1
    var hilt1 = BABYLON.Mesh.CreateCylinder("box", 2.5, .5, .5, 12, scene);
    hilt1.position.y = -5;
    hilt1.position.x = -2;
    var color1 = new BABYLON.Color4(1, 0, 0, 1);
    var color2 = new BABYLON.Color4(0, 1, 0, 1);
    var colorDead = new BABYLON.Color4(0, 0, 1, 1);
    createBeam(hilt1, new BABYLON.ParticleSystem("ps1", 1000, scene), color1, color2, colorDead);

    // Sword 2
    var hilt2 = BABYLON.Mesh.CreateCylinder("box", 2.5, .5, .5, 12, scene);
    hilt2.position.y = -5;
    hilt2.position.x = 2;
    hilt2.rotation.z = Math.PI / 4;
    hilt2.rotation.y = -Math.PI / 40;
    var color1 = new BABYLON.Color4(0, 0, 1, 1);
    var color2 = new BABYLON.Color4(0, 1, 0, 1);
    var colorDead = new BABYLON.Color4(1, 0, 0, 1);
    createBeam(hilt2, new BABYLON.ParticleSystem("ps2", 1000, scene), color1, color2, colorDead);

    setTimeout(function() {
        createSparkles(new BABYLON.Vector3(-2, -1, -0.25), new BABYLON.Color4(1, 0.5, 0.5, 1), new BABYLON.Color4(0.5, 1, 0.5, 1));
    }, 800);

    function createBeam(hilt, ps, color1, color2, colorDead) {
        //var url = "http://i166.photobucket.com/albums/u83/j1m68/star.jpg";
        var url = "/assets/O/w/z/3/Owz3K.jpg"; // star.jpg
        //var url = "/assets/i/q/3/o/iq3oJ.png"; // flare.png

        // var ps1 = new BABYLON.ParticleSystem("ps1", 10000, scene);
        ps.particleTexture = new BABYLON.Texture(url, scene);

        ps.minSize = 0.7;
        ps.maxSize = 0.7;
        ps.minLifeTime = 5;
        ps.maxLifeTime = 5;
        ps.minEmitPower = 2;
        ps.maxEmitPower = 2;

        ps.minAngularSpeed = 0;
        ps.maxAngularSpeed = Math.PI;

        ps.emitter = hilt;

        ps.emitRate = 70;
        ps.updateSpeed = 0.05;
        ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        ps.color1 = color1;
        ps.color2 = color2;
        ps.colorDead = colorDead;

        ps.direction1 = new BABYLON.Vector3(0, 1, 0);
        ps.direction2 = new BABYLON.Vector3(0, 1, 0);
        ps.minEmitBox = new BABYLON.Vector3(0, 1.5, 0);
        ps.maxEmitBox = new BABYLON.Vector3(0, 1.5, 0);

        ps.start();
    }

    function createSparkles(emitter, color1, color2) {
        //var url = "http://i166.photobucket.com/albums/u83/j1m68/star.jpg";
        var url = "/assets/O/w/z/3/Owz3K.jpg"; // star.jpg
        //var url = "/assets/i/q/3/o/iq3oJ.png"; // flare.png

        var ps1 = new BABYLON.ParticleSystem("ps1", 10000, scene);
        ps1.particleTexture = new BABYLON.Texture(url, scene);

        ps1.minSize = 0.5;
        ps1.maxSize = 1;
        ps1.minLifeTime = 1;
        ps1.maxLifeTime = 1;
        ps1.minEmitPower = 3;
        ps1.maxEmitPower = 3;

        ps1.minAngularSpeed = 0;
        ps1.maxAngularSpeed = Math.PI;

        ps1.emitter = emitter;

        ps1.emitRate = 20;
        ps1.updateSpeed = 0.05;
        ps1.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        ps1.color1 = color1;
        ps1.color2 = color2;
        ps1.colorDead = new BABYLON.Color3(0, 0, 0.2, 0);

        ps1.direction1 = new BABYLON.Vector3(-1, 1, -1);
        ps1.direction2 = new BABYLON.Vector3(1, -1, 1);
        ps1.minEmitBox = new BABYLON.Vector3(0, -0.5, 0);
        ps1.maxEmitBox = new BABYLON.Vector3(0, 0.5, 0);

        ps1.gravity = new BABYLON.Vector3(0, -5, 0);

        ps1.start();
    }

    // Camera Animations
    scene.registerBeforeRender(function() {
        scene.activeCamera.alpha += 0.01;
    });

    return scene;

};
var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

engine.runRenderLoop(function() {
    scene.render();

});