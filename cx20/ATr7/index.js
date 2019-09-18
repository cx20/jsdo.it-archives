// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト（その２）" http://jsdo.it/cx20/WVW3
// forked from cx20's "[WebGL] Babylon.js + ParticleSystem を試してみるテスト" http://jsdo.it/cx20/yxN2
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/uqcv
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/anpf
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/oRtWo
// forked from cx20's "[WebGL] Babylon.js を試してみるテスト" http://jsdo.it/cx20/84AP
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// forked from Wingnut's "custom particles" http://babylonjs-playground.azurewebsites.net/#D1QNY
var createScene = function() {

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.0, 0.0, 0.0);

    var light = new BABYLON.HemisphericLight("Hemi", new BABYLON.Vector3(0, 1, 0), scene);
    light.groundColor = BABYLON.Color3.Red();

    var camera = new BABYLON.ArcRotateCamera("Camera", -.8, 1.3, 50, new BABYLON.Vector3(0, 3, 0), scene);
    camera.attachControl(canvas);

    //var url = "http://i166.photobucket.com/albums/u83/j1m68/star.jpg";
    var url = "../../assets/i/q/3/o/iq3oJ.png"; // flare.png

    // tree cone
    var tree = BABYLON.Mesh.CreateCylinder("tree", 20, 0, 10, 16, 16, scene, false);
    tree.material = new BABYLON.StandardMaterial("treemat", scene);
    tree.material.diffuseColor = new BABYLON.Color3(0, .3, 0);
    tree.position.y = 4;
    tree.material.alpha = 1;

    // Mirrors
    var tile1 = BABYLON.Mesh.CreatePlane("tile1", 70, scene);
    tile1.position.y = -15;
    tile1.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    tile1.showBoundingBox = true;

    var tile2 = BABYLON.Mesh.CreatePlane("tile2", 70, scene);
    tile2.position = new BABYLON.Vector3(0, 20, 35);
    tile2.rotation = new BABYLON.Vector3(Math.PI, Math.PI, 0);
    tile2.showBoundingBox = true;

    var tile3 = BABYLON.Mesh.CreatePlane("tile3", 70, scene);
    tile3.position = new BABYLON.Vector3(-35, 20, 0);
    tile3.rotation = new BABYLON.Vector3(Math.PI, Math.PI / 2, 0);
    tile3.showBoundingBox = true;

    // Particle Systems
    // ------- snow -------
    var emitter1 = BABYLON.Mesh.CreateBox("emitter1", 1, scene);
    emitter1.position.y = 50;
    emitter1.isVisible = false;

    var ps1 = new BABYLON.ParticleSystem("ps1", 5000, scene);
    ps1.particleTexture = new BABYLON.Texture(url, scene);

    ps1.minSize = 0.01;
    ps1.maxSize = .5;
    ps1.minLifeTime = 10;
    ps1.maxLifeTime = 10;
    ps1.minEmitPower = 5;
    ps1.maxEmitPower = 5;

    ps1.minAngularSpeed = -2;
    ps1.maxAngularSpeed = 2;
    ps1.emitter = emitter1;

    ps1.emitRate = 30;
    ps1.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    ps1.direction1 = new BABYLON.Vector3(-1, -1, -1);
    ps1.direction2 = new BABYLON.Vector3(1, -1, 1);
    ps1.minEmitBox = new BABYLON.Vector3(-1, 0, -1);
    ps1.maxEmitBox = new BABYLON.Vector3(1, 0, 1);

    ps1.gravity = new BABYLON.Vector3(0, -.5, 0);

    ps1._colorizer = function() {
        return new BABYLON.Color4(1, 1, 1, 0)
    };

    ps1.start();

    // ------- tree lights -------
    var emitter2 = BABYLON.Mesh.CreateBox("emitter2", .1, scene);
    emitter2.position.y = tree.position.y + 10.5;
    emitter2.isVisible = false;
    emitter2.material = new BABYLON.StandardMaterial("emat2", scene);
    emitter2.material.diffuseColor = new BABYLON.Color3(.2, 1, 0);

    var ps2 = new BABYLON.ParticleSystem("ps2", 5000, scene);
    ps2.particleTexture = new BABYLON.Texture(url, scene);

    ps2.minSize = 0.05;
    ps2.maxSize = 1;
    ps2.minLifeTime = 17.5;
    ps2.maxLifeTime = 17.5;
    ps2.minEmitPower = 1.2;
    ps2.maxEmitPower = 1.2;

    ps2.emitter = emitter2;

    ps2.emitRate = 40;
    ps2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    ps2.direction1 = new BABYLON.Vector3(-.25, -1, 0);
    ps2.direction2 = new BABYLON.Vector3(-.25, -1, 0);
    ps2.minEmitBox = new BABYLON.Vector3(.05, -.1, 0);
    ps2.maxEmitBox = new BABYLON.Vector3(.05, -.1, 0);

    ps2.gravity = new BABYLON.Vector3(0, 0, 0);
    ps2.start();

    // ------- garland1 -------
    var emitter3 = BABYLON.Mesh.CreateBox("emitter3", .1, scene);
    emitter3.position.y = tree.position.y + 10;
    emitter3.isVisible = false;
    emitter3.material = new BABYLON.StandardMaterial("emat3", scene);
    emitter3.material.diffuseColor = new BABYLON.Color3(.2, 0, 1);

    var ps3 = new BABYLON.ParticleSystem("ps3", 5000, scene);

    ps3.particleTexture = new BABYLON.Texture(url, scene);

    ps3.minSize = .5;
    ps3.maxSize = .5;
    ps3.minLifeTime = 9;
    ps3.maxLifeTime = 9;
    ps3.minEmitPower = 2;
    ps3.maxEmitPower = 2;

    ps3.emitter = emitter3;

    emitter3.material.alpha = 1;

    ps3.emitRate = 50;

    ps3.direction1 = new BABYLON.Vector3(-.3, -1, 0);
    ps3.direction2 = new BABYLON.Vector3(-.3, -1, 0);
    ps3.minEmitBox = new BABYLON.Vector3(-.1, 0, 0);
    ps3.maxEmitBox = new BABYLON.Vector3(-.1, 0, 0);

    ps3.gravity = new BABYLON.Vector3(0, -.05, 0);
    ps3._colorizer = function() {
        return new BABYLON.Color4(randomNumber(.1, 2), 0, randomNumber(.1, 2), 0)
    };
    ps3.start();

    // ------- garland2 -------
    var emitter4 = BABYLON.Mesh.CreateBox("emitter4", .1, scene);
    emitter4.position.y = tree.position.y + 10;
    emitter4.isVisible = false;
    emitter4.material = new BABYLON.StandardMaterial("emat", scene);
    emitter4.material.diffuseColor = new BABYLON.Color3(1, 0, .2);

    var ps4 = new BABYLON.ParticleSystem("ps4", 5000, scene);

    ps4.particleTexture = new BABYLON.Texture(url, scene);

    ps4.minSize = .5;
    ps4.maxSize = .5;
    ps4.minLifeTime = 9;
    ps4.maxLifeTime = 9;
    ps4.minEmitPower = 2;
    ps4.maxEmitPower = 2;

    ps4.emitter = emitter4;

    emitter4.material.alpha = 1;

    ps4.emitRate = 50;

    ps4.direction1 = new BABYLON.Vector3(-.3, -1, 0);
    ps4.direction2 = new BABYLON.Vector3(-.3, -1, 0);
    ps4.minEmitBox = new BABYLON.Vector3(-.1, 0, 0);
    ps4.maxEmitBox = new BABYLON.Vector3(-.1, 0, 0);

    ps4.gravity = new BABYLON.Vector3(0, -.05, 0);
    ps4._colorizer = function() {
        return new BABYLON.Color4(randomNumber(.1, 2), randomNumber(.1, 2), 0, 0)
    };
    ps4.start();


    //Creation of mirror materials
    var mirrorMaterial1 = new BABYLON.StandardMaterial("texture4", scene);
    mirrorMaterial1.diffuseColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    mirrorMaterial1.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    mirrorMaterial1.reflectionTexture = new BABYLON.MirrorTexture("mirror", 1024, scene, true); //Create a mirror texture
    mirrorMaterial1.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1.0, 0, -10.0);
    mirrorMaterial1.reflectionTexture.renderList = [emitter1, emitter2, emitter3, emitter4, tree];
    mirrorMaterial1.reflectionTexture.level = 1; //Select the level (0.0 > 1.0) of the reflection

    var mirrorMaterial2 = new BABYLON.StandardMaterial("texture6", scene);
    mirrorMaterial2.diffuseColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    mirrorMaterial2.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    mirrorMaterial2.reflectionTexture = new BABYLON.MirrorTexture("mirror2", 1024, scene, true);
    mirrorMaterial2.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, 0, 1, -10.0);
    mirrorMaterial2.reflectionTexture.renderList = [emitter1, emitter2, emitter3, emitter4, tree];
    mirrorMaterial2.reflectionTexture.level = 1;

    var mirrorMaterial3 = new BABYLON.StandardMaterial("texture6", scene);
    mirrorMaterial3.diffuseColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    mirrorMaterial3.specularColor = new BABYLON.Color3(0.0, 0.0, 0.0);
    mirrorMaterial3.reflectionTexture = new BABYLON.MirrorTexture("mirror2", 1024, scene, true);
    mirrorMaterial3.reflectionTexture.mirrorPlane = new BABYLON.Plane(-1, 0, 0, -10.0);
    mirrorMaterial3.reflectionTexture.renderList = [emitter1, emitter2, emitter3, emitter4, tree];
    mirrorMaterial3.reflectionTexture.level = 1;

    //Applying materials
    tile1.material = mirrorMaterial1;
    tile2.material = mirrorMaterial2;
    tile3.material = mirrorMaterial3;

    var randomNumber = function(min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

    BABYLON.ParticleSystem.prototype._colorizer = function() {

        return new BABYLON.Color4(Math.random(), Math.random(), Math.random(), Math.random());

    };

    BABYLON.ParticleSystem.prototype._sizer = function() {

        return randomNumber(this.minSize, this.maxSize);

    };

    BABYLON.ParticleSystem.prototype._update = function(newParticles) {
        // Update current
        this._alive = this.particles.length > 0;
        for (var index = 0; index < this.particles.length; index++) {
            var particle = this.particles[index];
            particle.age += this._scaledUpdateSpeed;

            if (particle.age >= particle.lifeTime) {
                this._stockParticles.push(this.particles.splice(index, 1)[0]);
                index--;
                continue;
            } else {

                // wingy adds 2 lines...
                particle.color = this._colorizer();
                particle.size = this._sizer();

                particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                particle.position.addInPlace(this._scaledDirection);

                this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
                particle.direction.addInPlace(this._scaledGravity);
            }
        }

        // Add new ones
        var worldMatrix;

        if (this.emitter.position) {
            worldMatrix = this.emitter.getWorldMatrix();
        } else {
            worldMatrix = BABYLON.Matrix.Translation(this.emitter.x, this.emitter.y, this.emitter.z);
        }

        for (index = 0; index < newParticles; index++) {
            if (this.particles.length == this._capacity) {
                break;
            }

            if (this._stockParticles.length !== 0) {
                particle = this._stockParticles.pop();
                particle.age = 0;
            } else {
                particle = new BABYLON.Particle();
            }
            this.particles.push(particle);

            var emitPower = randomNumber(this.minEmitPower, this.maxEmitPower);

            this.startDirectionFunction(emitPower, worldMatrix, particle.direction);

            particle.lifeTime = randomNumber(this.minLifeTime, this.maxLifeTime);

            particle.size = randomNumber(this.minSize, this.maxSize);
            particle.angularSpeed = randomNumber(this.minAngularSpeed, this.maxAngularSpeed);

            this.startPositionFunction(worldMatrix, particle.position);

        }
    };

    // animation
    var animate = function() {
        emitter1.rotation.y += .1;
        emitter2.rotation.y += 1;
        emitter3.rotation.y += .25;
        emitter4.rotation.y -= .25;
    }

    // Camera Animations
    scene.registerBeforeRender(function() {
        scene.activeCamera.alpha += 0.01;
    });

    scene.registerBeforeRender(animate);
    return scene;
};

var canvas = document.querySelector("#c");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene(engine);

engine.runRenderLoop(function() {
    scene.render();

});