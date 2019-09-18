// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その４）" http://jsdo.it/cx20/0uS0
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その３）" http://jsdo.it/cx20/ATr7
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その２）" http://jsdo.it/cx20/WVW3
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト" http://jsdo.it/cx20/yxN2
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// forked from jerome's "SolidParticleSystem example"  http://www.babylonjs-playground.com/#2KSQ1R#19
var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(.1, .2, .4);
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 100, -200));
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.9;
    var pl = new BABYLON.PointLight("pl", new BABYLON.Vector3(0, 0, 0), scene);
    pl.diffuse = new BABYLON.Color3(1, 1, 1);
    pl.specular = new BABYLON.Color3(0.8, 0.7, 0);
    pl.intensity = 0.95;

    // ground and boxes
    var ground = BABYLON.Mesh.CreateGround("gd", 100, 100, 4, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    var box1 = BABYLON.Mesh.CreateBox("box1", 10, scene);
    var box2 = BABYLON.Mesh.CreateBox("box2", 10, scene);
    box1.position = new BABYLON.Vector3(15, 5, 7);
    box2.position = new BABYLON.Vector3(-15, 5, -5);
    var boxmat = new BABYLON.StandardMaterial("boxmat", scene);
    boxmat.diffuseColor = new BABYLON.Color3(1, 0.8, 0.8);
    boxmat.alpha = 0.5;
    box2.material = boxmat;
    ground.freezeWorldMatrix();
    box1.freezeWorldMatrix();
    box2.freezeWorldMatrix();

    // SH math function
    var harmonic = function(m, lat, long, paths) {
        var pi = Math.PI;
        var pi2 = Math.PI * 2;
        var steplat = pi / lat;
        var steplon = pi2 / long;
        var i = 0;
        for (var theta = 0; theta <= pi2; theta += steplon) {
            var path = [];
            for (var phi = 0; phi <= pi; phi += steplat) {
                var r = 0;
                r += Math.pow(Math.sin(m[0] * phi), m[1]);
                r += Math.pow(Math.cos(m[2] * phi), m[3]);
                r += Math.pow(Math.sin(m[4] * theta), m[5]);
                r += Math.pow(Math.cos(m[6] * theta), m[7]);

                var p = new BABYLON.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
                path.push(p);
            }
            paths[i] = path;
            i++;
        }
        paths[i] = paths[0];
    };



    // Particle system
    var nbSH = 6;
    var nbPartPerSH = 20;
    var paths = [];
    var m = [];
    var speed = 1.7;
    var gravity = -0.01;
    var PS = new SolidParticleSystem('SPS', scene);
    for (var s = 0; s < nbSH; s++) {
        for (var n = 0; n < 8; n++) {
            m[n] = Math.floor(Math.random() * 12);
        }
        var lon = Math.floor(Math.random() * 6) + 3;
        var lat = Math.floor(Math.random() * 6) + 3;
        harmonic(m, lon, lat, paths);
        var rib = BABYLON.Mesh.CreateRibbon("r", paths, false, false, 0, scene);
        PS.addShape(rib, nbPartPerSH);
        rib.dispose();
    }
    var mesh = PS.buildMesh();
    mesh.freezeWorldMatrix();
    mesh.freezeNormals();


    // define a custom SPS behavior

    PS.initParticles = function() {
        // just recycle everything
        for (var p = 0; p < this.nbParticles; p++) {
            this.recycleParticle(this.particles[p]);
        }
    };

    PS.recycleParticle = function(particle) {
        // set particle new velocity, scale and rotation
        particle.position.x = 0;
        particle.position.y = 0;
        particle.position.z = 0;
        particle.velocity.x = (Math.random() - 0.5) * speed;
        particle.velocity.y = Math.random() * speed;
        particle.velocity.z = (Math.random() - 0.5) * speed;
        var scale = 4 * Math.random() + 1;
        particle.scale.x = scale;
        particle.scale.y = scale;
        particle.scale.z = scale;
        particle.rotation.x = Math.random() * 0.1;
        particle.rotation.y = Math.random() * 0.1;
        particle.rotation.z = Math.random() * 0.1;
        particle.color.x = Math.random() * 0.6 + 0.5;
        particle.color.y = Math.random() * 0.6 + 0.5;
        particle.color.z = Math.random() * 0.6 + 0.5;
        particle.color.w = Math.random() * 0.6 + 0.5;
    };

    PS.updateParticle = function(particle) {
        if (particle.position.y < 0) {
            this.recycleParticle(particle);
        }
        particle.velocity.y += gravity; // apply gravity to y
        (particle.position).addInPlace(particle.velocity); // update particle new position
        particle.position.y += speed / 2;
        var sign = (particle.idx % 2 == 0) ? 1 : -1; // rotation sign and new value
        particle.rotation.z += 0.1 * sign;
        particle.rotation.x += 0.05 * sign;
        particle.rotation.y += 0.008 * sign;
    };


    // init all particle values
    PS.initParticles();

    //scene.debugLayer.show();
    // animation
    scene.registerBeforeRender(function() {
        PS.setParticles(false);
        pl.position = camera.position;
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