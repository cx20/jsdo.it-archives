// forked from cx20's "西之島の3Dデータを表示してみる（Babylon.js）" http://jsdo.it/cx20/uZ1S
// forked from cx20's "Babylon.js でカスタムシェーダを使用してみるテスト（その３）" http://jsdo.it/cx20/cMBM
// forked from cx20's "Babylon.js でカスタムシェーダを使用してみるテスト（その２）" http://jsdo.it/cx20/trns
// forked from cx20's "Babylon.js でカスタムシェーダを使用してみるテスト" http://jsdo.it/cx20/xBET
// forked from cx20's "Babylon.js で国土地理院のデータを表示してみるテスト" http://jsdo.it/cx20/cERE
// forked from cx20's "Babylon.js v2.0 を試してみるテスト（その２）" http://jsdo.it/cx20/oo0c
// forked from cx20's "Babylon.js v2.0 を試してみるテスト" http://jsdo.it/cx20/whLL
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

// waterMaterial.js
(function () {
    WaterMaterial = function (name, scene, light) {
        this.name = name;
        this.id = name;
        this.light = light;

        this._scene = scene;
        scene.materials.push(this);

        //this.bumpTexture = new BABYLON.Texture("/Water/bump.png", scene);
        this.bumpTexture = new BABYLON.Texture("../../assets/y/C/c/U/yCcU2.png", scene);
        this.bumpTexture.uScale = 2;
        this.bumpTexture.vScale = 2;
        this.bumpTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
        this.bumpTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;

        this.reflectionTexture = new BABYLON.MirrorTexture("reflection", 512, scene, true);
        this.refractionTexture = new BABYLON.RenderTargetTexture("refraction", 512, scene, true);        
        this.reflectionTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);

        this.refractionTexture.onBeforeRender = function() {
            BABYLON.clipPlane = new BABYLON.Plane(0, 1, 0, 0);
        };

        this.refractionTexture.onAfterRender = function() {
            BABYLON.clipPlane = null;
        };

        this.waterColor = new BABYLON.Color3(0.0, 0.3, 0.1);
        this.waterColorLevel = 0.2;
        this.fresnelLevel = 1.0;
        this.reflectionLevel = 0.6;
        this.refractionLevel = 0.8;
        
        this.waveLength = 0.1;
        this.waveHeight = 0.15;

        this.waterDirection = new BABYLON.Vector2(0, 1.0);

        this._time = 0;
    };

    WaterMaterial.prototype = Object.create(BABYLON.Material.prototype);

    // Properties   
    WaterMaterial.prototype.needAlphaBlending = function () {
        return false;
    };

    WaterMaterial.prototype.needAlphaTesting = function () {
        return false;
    };

    // Methods   
    WaterMaterial.prototype.getRenderTargetTextures = function () {
        var results = [];

        results.push(this.reflectionTexture);
        results.push(this.refractionTexture);

        return results;
    };

    WaterMaterial.prototype.isReady = function (mesh) {
        var engine = this._scene.getEngine();
        
        if (this.bumpTexture && !this.bumpTexture.isReady) {
            return false;
        }

        var vs = document.getElementById("vs").textContent;
        var fs = document.getElementById("fs").textContent;

        BABYLON.Effect.ShadersStore["Water/waterVertexShader"] = vs;
        BABYLON.Effect.ShadersStore["Water/waterFragmentShader"] = fs;

        this._effect = engine.createEffect("Water/water",
            ["position", "normal", "uv"],
            ["worldViewProjection", "world", "view", "vLightPosition", "vEyePosition", "waterColor", "vLevels", "waveData", "windMatrix"],
            ["reflectionSampler", "refractionSampler", "bumpSampler"],
            "");

        if (!this._effect.isReady()) {
            return false;
        }

        return true;
    };

    WaterMaterial.prototype.bind = function (world, mesh) {
        this._time += 0.0001 * this._scene.getAnimationRatio();

        this._effect.setMatrix("world", world);
        this._effect.setMatrix("worldViewProjection", world.multiply(this._scene.getTransformMatrix()));
        this._effect.setVector3("vEyePosition", this._scene.activeCamera.position);
        this._effect.setVector3("vLightPosition", this.light.position);
        this._effect.setColor3("waterColor", this.waterColor);
        this._effect.setFloat4("vLevels", this.waterColorLevel, this.fresnelLevel, this.reflectionLevel, this.refractionLevel);
        this._effect.setFloat2("waveData", this.waveLength, this.waveHeight);

        // Textures
        this._effect.setMatrix("windMatrix", this.bumpTexture.getTextureMatrix().multiply(BABYLON.Matrix.Translation(this.waterDirection.x * this._time, this.waterDirection.y * this._time, 0)));
        this._effect.setTexture("bumpSampler", this.bumpTexture);
        this._effect.setTexture("reflectionSampler", this.reflectionTexture);
        this._effect.setTexture("refractionSampler", this.refractionTexture);
    };

    WaterMaterial.prototype.dispose = function () {
        if (this.bumpTexture) {
            this.bumpTexture.dispose();
        }
        
        if (this.groundTexture) {
            this.groundTexture.dispose();
        }

        if (this.snowTexture) {
            this.snowTexture.dispose();
        }
        this.baseDispose();
    };
})();

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    // Now create a basic Babylon Scene object 
    var scene = new BABYLON.Scene(engine);
    
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);
    
    //camera.setPosition(new BABYLON.Vector3(-40, 20, 50));
    camera.setPosition(new BABYLON.Vector3(-40, 5, 50));
    
    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene);
    
    var extensions = [
        "../../../../../assets/x/s/Y/k/xsYk8.jpg", // "/../../skybox/dark-s_px.jpg", 
        "../../../../../assets/1/g/O/W/1gOWa.jpg", // "/../../skybox/dark-s_py.jpg", 
        "../../../../../assets/m/7/s/7/m7s7q.jpg", // "/../../skybox/dark-s_pz.jpg", 
        "../../../../../assets/4/x/e/H/4xeHN.jpg", // "/../../skybox/dark-s_nx.jpg", 
        "../../../../../assets/g/V/E/9/gVE9m.jpg", // "/../../skybox/dark-s_ny.jpg", 
        "../../../../../assets/f/D/1/C/fD1Cf.jpg"  // "/../../skybox/dark-s_nz.jpg"
    ];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene, extensions);
    
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    
    // Ground
    //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap.png", 100, 100, 100, 0, 20, scene, false);
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../../assets/5/u/z/c/5uzcQ.png", 100, 100, 100, 0, 10, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    //groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("../../assets/o/c/f/m/ocfmb.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 1;
    groundMaterial.diffuseTexture.vScale = 1;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -0.1;
    ground.material = groundMaterial;
    
    // Water
    BABYLON.Engine.ShadersRepository = "";
    var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
    var waterMaterial = new WaterMaterial("water", scene, sun);
    waterMaterial.refractionTexture.renderList.push(ground);
    
    waterMaterial.reflectionTexture.renderList.push(ground);
    waterMaterial.reflectionTexture.renderList.push(skybox);
    
    water.material = waterMaterial;
    
    var beforeRenderFunction = function () {
        // Camera
        if (camera.beta < 0.1)
            camera.beta = 0.1;
        else if (camera.beta > (Math.PI / 2) * 0.9)
            camera.beta = (Math.PI / 2) * 0.9;
        
        if (camera.radius > 150)
            camera.radius = 150;
        
        if (camera.radius < 5)
            camera.radius = 5;
    };
    
    camera.attachControl(canvas);

    // Animations
    scene.registerBeforeRender(function () {
        //scene.activeCamera.alpha += 0.01;
        scene.activeCamera.alpha += 0.005;
    });

    return scene;
}

var scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});
