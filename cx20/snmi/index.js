// forked from cx20's "[WebGL] Babylon.js で太陽を表示させてみるテスト" http://jsdo.it/cx20/KehT
// forked from cx20's "[WebGL] Babylon.js で木星を表示させてみるテスト" http://jsdo.it/cx20/Muj5
// forked from cx20's "[WebGL] Babylon.js で火星を表示させてみるテスト" http://jsdo.it/cx20/qB1p
// forked from cx20's "[WebGL] Babylon.js で地球を回してみるテスト（改）" http://jsdo.it/cx20/cqYb
// forked from cx20's "Babylon.js で地球を回してみるテスト" http://jsdo.it/cx20/25mN

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var sun;
var cloud;
var anchor;

// forked from https://www.babylonjs-playground.com/#10GAJ1#1
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Setup environment
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    scene.clearColor = new BABYLON.Color3(0.0, 0.0, 0.0);

    anchor = new BABYLON.TransformNode("");
    anchor.position = new BABYLON.Vector3(0, 0, 0);
    camera.parent = anchor;

    // Skybox
    var cubeTexture = new BABYLON.CubeTexture(
        "https://rawcdn.githack.com/mrdoob/three.js/d8b547a7c1535e9ff044d196b72043f5998091ee/examples/textures/cube/MilkyWay/",
        scene,
        ["dark-s_px.jpg", "dark-s_py.jpg", "dark-s_pz.jpg", "dark-s_nx.jpg", "dark-s_ny.jpg", "dark-s_nz.jpg"]
    );
    //scene.createDefaultSkybox(cubeTexture, true, 100);

    // If you care about the performance of createDefaultSkybox(), The following code can be used to avoid this. However, the environmental texture will not be applied.
    // http://www.html5gamedevs.com/topic/36997-using-skybox-takes-time-to-display-is-it-a-usage-problem/?tab=comments#comment-211765
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = cubeTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    // Create a particle system
    var surfaceParticles = new BABYLON.ParticleSystem("surfaceParticles", 1600, scene);
    var flareParticles = new BABYLON.ParticleSystem("flareParticles", 20, scene);
    var glareParticles = new BABYLON.ParticleSystem("glareParticles", 600, scene);

    // Texture of each particle
    surfaceParticles.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Sun/T_SunSurface.png", scene);
    flareParticles.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Sun/T_SunFlare.png", scene);
    glareParticles.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Sun/T_Star.png", scene);
    
    // Create core sphere
    var coreSphere = BABYLON.MeshBuilder.CreateSphere("coreSphere", {diameter: 2.01, segments: 64}, scene);

    // Create core material
    var coreMat = new BABYLON.StandardMaterial("coreMat", scene)
    coreMat.emissiveColor = new BABYLON.Color3(0.3773, 0.0930, 0.0266); 

    // Assign core material to sphere
    coreSphere.material = coreMat;

    // Pre-warm
    surfaceParticles.preWarmStepOffset = 10;
    surfaceParticles.preWarmCycles = 100;

    flareParticles.preWarmStepOffset = 10;
    flareParticles.preWarmCycles = 100;

    glareParticles.preWarmStepOffset = 10;
    glareParticles.preWarmCycles = 100;

    // Initial rotation
    surfaceParticles.minInitialRotation = -2 * Math.PI;
    surfaceParticles.maxInitialRotation = 2 * Math.PI;

    flareParticles.minInitialRotation = -2 * Math.PI;
    flareParticles.maxInitialRotation = 2 * Math.PI;

    glareParticles.minInitialRotation = -2 * Math.PI;
    glareParticles.maxInitialRotation = 2 * Math.PI;
    
    // Where the sun particles come from
    var sunEmitter = new BABYLON.SphereParticleEmitter();
    sunEmitter.radius = 1;
    sunEmitter.radiusRange = 0; // emit only from shape surface
 
    // Assign particles to emitters
    surfaceParticles.emitter = coreSphere; // the starting object, the emitter
    surfaceParticles.particleEmitterType = sunEmitter;

    flareParticles.emitter = coreSphere; // the starting object, the emitter
    flareParticles.particleEmitterType = sunEmitter;

    glareParticles.emitter = coreSphere; // the starting object, the emitter
    glareParticles.particleEmitterType = sunEmitter;

    // Color gradient over time
    surfaceParticles.addColorGradient(0, new BABYLON.Color4(0.8509, 0.4784, 0.1019, 0.0));
    surfaceParticles.addColorGradient(0.4, new BABYLON.Color4(0.6259, 0.3056, 0.0619, 0.5));
    surfaceParticles.addColorGradient(0.5, new BABYLON.Color4(0.6039, 0.2887, 0.0579, 0.5));
    surfaceParticles.addColorGradient(1.0, new BABYLON.Color4(0.3207, 0.0713, 0.0075, 0.0));
    
    flareParticles.addColorGradient(0, new BABYLON.Color4(1, 0.9612, 0.5141, 0.0));
    flareParticles.addColorGradient(0.25, new BABYLON.Color4(0.9058, 0.7152, 0.3825, 1.0));
    flareParticles.addColorGradient(1.0, new BABYLON.Color4(0.6320, 0.0, 0.0, 0.0));

    glareParticles.addColorGradient(0, new BABYLON.Color4(0.8509, 0.4784, 0.1019, 0.0));
    glareParticles.addColorGradient(0.5, new BABYLON.Color4(0.6039, 0.2887, 0.0579, 0.12));
    glareParticles.addColorGradient(1.0, new BABYLON.Color4(0.3207, 0.0713, 0.0075, 0.0));

    // Size of each particle (random between...
    surfaceParticles.minSize = 0.4;
    surfaceParticles.maxSize = 0.7;

    flareParticles.minScaleX = 0.5;
    flareParticles.minScaleY = 0.5;
    flareParticles.maxScaleX= 1.0;
    flareParticles.maxScaleY = 1.0;

    glareParticles.minScaleX = 0.5;
    glareParticles.minScaleY = 0.75;
    glareParticles.maxScaleX = 1.2;
    glareParticles.maxScaleY = 3.0;

    // Size over lifetime
    flareParticles.addSizeGradient(0, 0);
    flareParticles.addSizeGradient(1, 1);
    
    // Life time of each particle (random between...
    surfaceParticles.minLifeTime = 8.0;
    surfaceParticles.maxLifeTime = 8.0;

    flareParticles.minLifeTime = 10.0;
    flareParticles.maxLifeTime = 10.0;

    glareParticles.minLifeTime = 2.0;
    glareParticles.maxLifeTime= 2.0;

    // Emission rate
    surfaceParticles.emitRate = 200;
    flareParticles.emitRate = 1;
    glareParticles.emitRate = 300;

    // Blend mode : BLENDMODE_ONEONE, BLENDMODE_STANDARD, or BLENDMODE_ADD
    surfaceParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    flareParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    glareParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    surfaceParticles.gravity = new BABYLON.Vector3(0, 0, 0);
    flareParticles.gravity = new BABYLON.Vector3(0, 0, 0);
    glareParticles.gravity = new BABYLON.Vector3(0, 0, 0);

    // Angular speed, in radians
    surfaceParticles.minAngularSpeed = -0.4;
    surfaceParticles.maxAngularSpeed = 0.4;

    flareParticles.minAngularSpeed = 0.0;
    flareParticles.maxAngularSpeed = 0.0;

    glareParticles.minAngularSpeed = 0.0;
    glareParticles.maxAngularSpeed = 0.0;

    // Speed
    surfaceParticles.minEmitPower = 0;
    surfaceParticles.maxEmitPower = 0;
    surfaceParticles.updateSpeed = 0.005;

    flareParticles.minEmitPower = 0.001;
    flareParticles.maxEmitPower = 0.01;

    glareParticles.minEmitPower = 0.0;
    glareParticles.maxEmitPower = 0.0;

    // No billboard
    surfaceParticles.isBillboardBased = false;
    flareParticles.isBillboardBased = true;
    glareParticles.isBillboardBased = true;

    // Render Order
    glareParticles.renderingGroupId = 1;
    flareParticles.renderingGroupId = 2;
    surfaceParticles.renderingGroupId = 3;
    coreSphere.renderingGroupId = 3;

    // Start the particle system
    surfaceParticles.start();
    flareParticles.start();
    glareParticles.start();

    return scene;
}

var scene = createScene();

var rad1 = 0.0;
var rad2 = 0.0;
engine.runRenderLoop(function(){
    rad1 -= Math.PI * 1.0 * 0.05 / 180.0;
    rad2 -= Math.PI * 1.2 * 0.05 / 180.0;
    //sun.rotation.y = rad1;
    anchor.rotation = new BABYLON.Vector3(0, rad1, 0);
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});
