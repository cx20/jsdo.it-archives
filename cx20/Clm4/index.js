// forked from cx20's "[WebGL] Babylon.js + SolidParticleSystem を試してみるテスト" http://jsdo.it/cx20/UVZC
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その４）" http://jsdo.it/cx20/0uS0
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その３）" http://jsdo.it/cx20/ATr7
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その２）" http://jsdo.it/cx20/WVW3
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト" http://jsdo.it/cx20/yxN2
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// http://www.babylonjs-playground.com/#2KSQ1R#110
var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(.1, .2, .4);
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 150, -500));
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.9;
    var pl = new BABYLON.PointLight("pl", new BABYLON.Vector3(0, 0, 0), scene);
    pl.diffuse = new BABYLON.Color3(1, 1, 1);
    pl.specular = new BABYLON.Color3(0.2, 0.2, 0.8);
    pl.intensity = 0.95;

    var ground = BABYLON.Mesh.CreateGround('gd', 300, 300, 2, scene);
    ground.position.y = -20;
    ground.freezeWorldMatrix();

    var SPS = new BABYLON.SolidParticleSystem('SPS', scene);
    //SPS.disableParticleColor();
    //SPS.disableParticleTexture();

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    //BABYLON.SceneLoader.ImportMesh("", "scenes/", "rabbit.babylon", scene, function (meshes) {
    BABYLON.SceneLoader.ImportMesh("", "/assets/E/c/r/y/", "Ecryr", scene, function(meshes) {

        var k = 0.0;
        var gravity = -0.01;
        var v = 2;
        var skullNb = 60;

        SPS.initParticles = function() {
            var pi2 = Math.PI * 2;
            for (var p = 0; p < this.nbParticles; p++) {
                this.particles[p].position = BABYLON.Vector3.Zero();
                this.particles[p].rotation = new BABYLON.Vector3(Math.random() * pi2, Math.random() * pi2, Math.random() * pi2);
                this.particles[p].velocity = new BABYLON.Vector3((Math.random() - 0.5) * v, Math.random() * v, (Math.random() - 0.5) * v);
                this.particles[p].color = new BABYLON.Color4(Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, Math.random() / 2 + 0.5, 1);
            }
        };

        SPS.updateParticle = function(particle) {
            particle.rotation.y += 0.01;
            particle.rotation.x += 0.1;
            particle.position.addInPlace(particle.velocity);
            particle.position.y += v / 2;
            particle.velocity.y += gravity;
            if (particle.position.y < 0) {
                particle.position.x = 0.0;
                particle.position.y = 0.0;
                particle.position.z = 0.0;
                var scl = 0.5 + Math.random() / 2;
                particle.scale.x = scl;
                particle.scale.y = scl;
                particle.scale.z = scl;
                particle.velocity.x = (Math.random() - 0.5) * v;
                particle.velocity.y = Math.random() * v;
                particle.velocity.z = (Math.random() - 0.5) * v;
            }

        };


        SPS.addShape(meshes[1], skullNb);
        var mesh = SPS.buildMesh();
        mesh.freezeNormals();
        mesh.freezeWorldMatrix();

        meshes[1].dispose();

        SPS.initParticles();
        SPS.setParticles();

        scene.registerBeforeRender(function() {
            SPS.setParticles();
            k += 0.01;
        });

    });

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