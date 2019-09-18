// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト" http://jsdo.it/cx20/yxN2
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 8), scene);
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    
    // Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 50.0, scene);
    ground.position = new BABYLON.Vector3(0, -10, 0);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.backFaceCulling = false;
    ground.material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 1);

    // Emitters
    var emitter0 = BABYLON.Mesh.CreateBox("emitter0", 0.1, scene);
    emitter0.isVisible = false;

    // Custom shader for particles
    BABYLON.Effect.ShadersStore["myParticleFragmentShader"] =
    "#ifdef GL_ES\n" +
    "precision highp float;\n" +
    "#endif\n" +

    "varying vec2 vUV;\n" +                     // Provided by babylon.js
    "varying vec4 vColor;\n" +                  // Provided by babylon.js

    "uniform sampler2D diffuseSampler;\n" +     // Provided by babylon.js
    "uniform float time;\n" +                   // This one is custom so we need to declare it to the effect

    "void main(void) {\n" +
        "vec2 position = vUV;\n" +

        "float color = 0.0;\n" +
        "vec2 center = vec2(0.5, 0.5);\n" +
	
        "color = sin(distance(position, center) * 10.0+ time * vColor.g);\n" +

        "vec4 baseColor = texture2D(diffuseSampler, vUV);\n" +

        "gl_FragColor = baseColor * vColor * vec4( vec3(color, color, color), 1.0 );\n" +
    "}\n" +
    "";

    // Effect
    var effect = engine.createEffectForParticles("myParticle", ["time"]);

    // Particles
    var particleSystem = new BABYLON.ParticleSystem("particles", 4000, scene, effect);
    particleSystem.particleTexture = new BABYLON.Texture("/assets/i/q/3/o/iq3oJ.png", scene); // flare.png
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 1.0;
    particleSystem.minLifeTime = 0.5;
    particleSystem.maxLifeTime = 5.0;
    particleSystem.minEmitPower = 0.5;
    particleSystem.maxEmitPower = 3.0;
    particleSystem.emitter = emitter0;
    particleSystem.emitRate = 100;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    particleSystem.direction1 = new BABYLON.Vector3(-1, 1, -1);
    particleSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
    particleSystem.color1 = new BABYLON.Color4(1, 1, 0, 1);
    particleSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1);
    particleSystem.gravity = new BABYLON.Vector3(0, -1.0, 0);
    particleSystem.start();

    var time = 0;
    var order = 0.1;

    scene.registerBeforeRender(function () {
        // Waiting for effect to be compiled
        if (!effect) {
            return;
        }

        effect.setFloat("time", time);

        time += order;

        if (time > 100 || time < 0) {
            order *= -1;
        }
    });

    // Camera Animations
    scene.registerBeforeRender(function () {
        scene.activeCamera.alpha += 0.01;
    });

    return scene;
};

var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

engine.runRenderLoop(function () {
    scene.render();

});
