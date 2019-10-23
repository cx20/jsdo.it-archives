// forked from mkkellogg's "Photons: General purpose particle system" http://threejs.org/examples/webgl_particles_general.html

var ParticleSystemIDs = Object.freeze({
    Smoke: 1,
    Flame: 3,
    FlameEmbers: 4
});

var ParticleEnvironmentIDs = Object.freeze({
    Campfire: 1
});

var rendererContainer;
var screenWidth, screenHeight;
var pointLight, ambientLight;
var particleSystems, loadingManager;
var scene, camera, renderer, controls, clock;
var currentEnvironmentID;
var smokeActive, smokeType;
var particleSystemsParent;


window.addEventListener("load", function load(event) {

    window.removeEventListener("load", load, false);
    init();

}, false);


function init() {

    clock = new THREE.Clock();

    getScreenDimensions();

    initScene();
    initListeners();

    initLights();
    PHOTONS.Util.initializeLoadingManager();
    initSceneGeometry(function() {

        initParticleSystems();
        startParticleSystemEnvironment(ParticleEnvironmentIDs.Campfire);
        initRenderer();
        initControls();
        animate();

    });

}

function initParticleSystems() {

    particleSystems = {};
    initializeFlameSystem();
    initializeSmokeSystem();

}

function initializeSmokeSystem() {

    var _TPSV = PHOTONS.SingularVector;

    smokeType = ParticleSystemIDs.Smoke;

    var textureLoader = new THREE.TextureLoader();

    // smokeparticles.png
    var smokeAtlas = PHOTONS.Atlas.createGridAtlas(textureLoader.load('/assets/4/T/h/y/4ThyB.png'), 0.0, 1.0, 1.0, 0.0, 4.0, 4.0, false, true);

    var altVertexShader = [

        PHOTONS.ParticleSystem.Shader.VertexVars,
        "varying vec4 vPosition;",

        PHOTONS.ParticleSystem.Shader.ParticleVertexQuadPositionFunction,

        "void main()",
        "{",
        "vColor = customColor;",
        "vUV = uv;",
        "vec4 quadPos = getQuadPosition();",
        "vPosition = viewMatrix * quadPos;",
        "gl_Position = projectionMatrix * vPosition;",
        "}"

    ].join("\n");

    var altFragmentShader = [

        PHOTONS.ParticleSystem.Shader.FragmentVars,
        "varying vec4 vPosition;",

        THREE.ShaderChunk["common"],
        THREE.ShaderChunk["bsdfs"],
        THREE.ShaderChunk["lights_pars"],

        "void main()",
        "{",

        "vec4 textureColor = texture2D( texture, vUV );",
        "vec4 viewPosition = -vPosition;",
        "vec3 outgoingLight = vec3( 0.0 );",
        "vec4 diffuseColor = vColor * textureColor;",

        "vec3 totalDiffuseLight = vec3( 0.0 );",

        "#if NUM_POINT_LIGHTS > 0",
        "for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {",
        "vec3 lightColor = pointLights[ i ].color;",
        "vec3 lightPosition = pointLights[ i ].position;",
        "vec3 lVector = lightPosition + viewPosition.xyz;",
        "vec3 lightDir = normalize( lVector );",
        "float attenuation = calcLightAttenuation( length( lVector ), pointLights[ i ].distance, pointLights[ i ].decay );",
        "totalDiffuseLight += lightColor * attenuation;",
        "}",
        "#endif",

        "gl_FragColor = diffuseColor * vec4( totalDiffuseLight, 1.0 );",
        "}"

    ].join("\n");
  
    var customUniforms = THREE.UniformsUtils.merge([THREE.UniformsLib['lights'], THREE.UniformsLib['ambient']]);

    var altMaterial = PHOTONS.ParticleSystem.createMaterial(altVertexShader, altFragmentShader, customUniforms);
    altMaterial.lights = true;
    altMaterial.blending = THREE.CustomBlending;
    altMaterial.blendSrc = THREE.SrcAlphaFactor;
    altMaterial.blendDst = THREE.OneMinusSrcAlphaFactor;
    altMaterial.blendEquation = THREE.AddEquation;
    altMaterial.uniforms.texture.value = smokeAtlas.getTexture();

    var particleSystemParams = {

        material: altMaterial,
        zSort: true,
        particleAtlas: smokeAtlas,
        particleReleaseRate: 100,
        particleLifeSpan: 3.0,
        lifespan: 0

    };
    var particleSystem = new PHOTONS.ParticleSystem();
    particleSystem.initialize(camera, scene, particleSystemParams);

    var positionModifier = new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(0, 0, 0),
        range: new THREE.Vector3(10, 0, 10),
        rangeEdgeClamp: false,
        rangeType: PHOTONS.RangeType.Sphere
    });

    var velocityModifier = new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(0, 75, 0),
        range: new THREE.Vector3(5, 30, 5),
        rangeEdgeClamp: false,
        rangeType: PHOTONS.RangeType.Sphere
    });

    var accelerationModifier = new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(0, -22, 0),
        range: new THREE.Vector3(35, 20, 35),
        rangeEdgeClamp: false,
        rangeType: PHOTONS.RangeType.Cube
    });

    var rotationModifier = new PHOTONS.RandomModifier({
        offset: new PHOTONS.SingularVector(0),
        range: new PHOTONS.SingularVector(360)
    });

    var rotationalSpeedModifier = new PHOTONS.RandomModifier({
        offset: new PHOTONS.SingularVector(50),
        range: new PHOTONS.SingularVector(400)
    });

    var sizeModifier = new PHOTONS.FrameSetModifier(
        new PHOTONS.FrameSet(
            [0, 3], [new THREE.Vector2(10, 10),
                new THREE.Vector2(40, 40)
            ],
            false)
    );

    var alphaModifier = new PHOTONS.FrameSetModifier(
        new PHOTONS.FrameSet(
            [0, 1.0, 2.0, 3.0], [new _TPSV(0.0), new _TPSV(0.1), new _TPSV(0.075), new _TPSV(0.0)],
            true
        ));

    var colorModifier = new PHOTONS.FrameSetModifier(
        new PHOTONS.FrameSet(
            [0.0, 1.5, 3], [new THREE.Vector3(0.1, 0.1, 0.1),
                new THREE.Vector3(0.35, 0.35, 0.35),
                new THREE.Vector3(0.7, 0.7, 0.7)
            ],
            false)
    );

    var atlasModifier = new PHOTONS.EvenIntervalIndexModifier(16);

    particleSystem.bindInitializer('position', positionModifier);
    particleSystem.bindInitializer('velocity', velocityModifier);
    particleSystem.bindInitializer('acceleration', accelerationModifier);
    particleSystem.bindInitializer('rotation', rotationModifier);
    particleSystem.bindInitializer('rotationalSpeed', rotationalSpeedModifier);
    particleSystem.bindModifier('atlas', atlasModifier);
    particleSystem.bindModifier('size', sizeModifier);
    particleSystem.bindModifier('alpha', alphaModifier);
    particleSystem.bindModifier('color', colorModifier);

    particleSystems[ParticleSystemIDs.Smoke] = particleSystem;

    particleSystemsParent.add(particleSystems[ParticleSystemIDs.Smoke]);

}

function initializeFlameSystem() {

    var _TPSV = PHOTONS.SingularVector;

    // ---------------------
    // flame particle system
    // ---------------------

    var flameMaterial = PHOTONS.ParticleSystem.createMaterial();
    flameMaterial.blending = THREE.AdditiveBlending;

    var particleSystemParams = {

        material: flameMaterial,
        particleAtlas: PHOTONS.Atlas.createGridAtlas(new THREE.TextureLoader().load('/assets/G/Y/R/P/GYRP7.jpg'), 0.0, 1.0, 1.0, 0.0, 8.0, 8.0, false, true), // fireloop3.jpg
        particleReleaseRate: 3,
        particleLifeSpan: 3,
        lifespan: 0

    };
    var particleSystem = new PHOTONS.ParticleSystem();
    particleSystem.initialize(camera, scene, particleSystemParams);

    particleSystem.bindModifier("atlas", new PHOTONS.EvenIntervalIndexModifier(64));

    particleSystem.bindModifier("size", new PHOTONS.FrameSetModifier(
        new PHOTONS.FrameSet(
            [0, 3], [new THREE.Vector3(20, 25),
                new THREE.Vector3(20, 25)
            ],
            false)
    ));

    particleSystem.bindModifier("alpha", new PHOTONS.FrameSetModifier(
        new PHOTONS.FrameSet(
            [0, 0.2, 1.2, 2.0, 3], [new _TPSV(0), new _TPSV(.3), new _TPSV(1), new _TPSV(1), new _TPSV(0)],
            true)
    ));

    particleSystem.bindModifier("color", new PHOTONS.FrameSetModifier(
        new PHOTONS.FrameSet(
            [0, 3], [new THREE.Vector3(1.4, 1.4, 1.4),
                new THREE.Vector3(1.4, 1.4, 1.4)
            ],
            false)
    ));

    particleSystem.bindInitializer('position', new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(0, 0, 0),
        range: new THREE.Vector3(0, 0, 0),
        rangeEdgeClamp: false,
        rangeType: PHOTONS.RangeType.Sphere
    }));

    particleSystem.bindInitializer('velocity', new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(0, 25, 0),
        range: new THREE.Vector3(10, 2, 10),
        rangeEdgeClamp: false,
        rangeType: PHOTONS.RangeType.Sphere
    }));

    particleSystems[ParticleSystemIDs.Flame] = particleSystem;
    particleSystemsParent.add(particleSystems[ParticleSystemIDs.Flame]);

    // ---------------------
    // flame embers particle system
    // ---------------------

    var emberMaterial = PHOTONS.ParticleSystem.createMaterial();
    emberMaterial.blending = THREE.AdditiveBlending;

    particleSystemParams = {

        material: emberMaterial,
        particleAtlas: new PHOTONS.Atlas(new THREE.TextureLoader().load('/assets/M/G/W/F/MGWFz.png'), true), // Puff.png
        particleReleaseRate: 18,
        particleLifeSpan: 3,
        lifespan: 0

    };
    particleSystem = new PHOTONS.ParticleSystem();
    particleSystem.initialize(camera, scene, particleSystemParams);

    particleSystem.bindModifier("atlas", new PHOTONS.EvenIntervalIndexModifier(1));

    particleSystem.bindModifier('size', new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(.25, .25, 0.0),
        range: new THREE.Vector3(0.05, 0.05, 0.0),
        rangeEdgeClamp: false,
        rangeType: PHOTONS.RangeType.Sphere,
        runOnce: true
    }));

    particleSystem.bindModifier("alpha", new PHOTONS.FrameSetModifier(
        new PHOTONS.FrameSet(
            [0, 0.2, 1.2, 2.0, 3], [new _TPSV(0), new _TPSV(1), new _TPSV(1), new _TPSV(1), new _TPSV(0)],
            true)
    ));

    particleSystem.bindModifier("color", new PHOTONS.FrameSetModifier(
        new PHOTONS.FrameSet(
            [0, 2, 3], [new THREE.Vector3(1.3, 1.3, 0),
                new THREE.Vector3(.75, .4, .4),
                new THREE.Vector3(.6, .6, .6)
            ],
            false)
    ));

    particleSystem.bindInitializer('position', new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(0, 7, 0),
        range: new THREE.Vector3(3, 0, 3),
        rangeEdgeClamp: false,
        rangeType: PHOTONS.RangeType.Sphere
    }));

    particleSystem.bindInitializer('velocity', new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(0, 25, 0),
        range: new THREE.Vector3(15, 25, 15),
        rangeEdgeClamp: true,
        rangeType: PHOTONS.RangeType.Sphere
    }));

    particleSystem.bindModifier('acceleration', new PHOTONS.RandomModifier({
        offset: new THREE.Vector3(0, 15, 0),
        range: new THREE.Vector3(180, 280, 180),
        rangeEdgeClamp: true,
        rangeType: PHOTONS.RangeType.Sphere
    }));

    particleSystems[ParticleSystemIDs.FlameEmbers] = particleSystem;
    particleSystemsParent.add(particleSystems[ParticleSystemIDs.FlameEmbers]);

}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false);
}

function initRenderer() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(screenWidth, screenHeight);
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    rendererContainer = document.getElementById('renderingContainer');
    rendererContainer.appendChild(renderer.domElement);

}

function initLights() {

    ambientLight = new THREE.AmbientLight(0x101010);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 40, 0);
    pointLight.castShadow = true;
    pointLight.shadowCameraNear = 1;
    pointLight.shadowCameraFar = 1000;
    pointLight.shadowMapWidth = 4096;
    pointLight.shadowMapHeight = 2048;
    pointLight.shadowBias = -0.5;
    scene.add(pointLight);

}

function initSceneGeometry(onFinished) {

    var loadedCount = 0;
    var targetLoadCount = 3;
    var onFinishedCalled = false;

    function incrementAndCheckLoadComplete() {

        loadedCount++;

        if (!onFinishedCalled && loadedCount >= targetLoadCount && onFinished) {

            onFinishedCalled = true;
            onFinished();

        }

    }

    // ---------------------
    // create ground
    // ---------------------

    var groundTexture = new THREE.TextureLoader().load('/assets/G/o/1/H/Go1HV.jpg'); // grass1.jpg
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10, 10);

    var groundMaterial = new THREE.MeshLambertMaterial({

        color: 0xffffff,
        map: groundTexture,
        vertexColors: THREE.NoColors,
        side: THREE.BackSide

    });

    var groundGeometry = new THREE.PlaneGeometry(1000, 1000, 30, 30);
    var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.position.y = 0;
    groundMesh.rotation.x = Math.PI / 2.0;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // ---------------------
    // load campfire
    // ---------------------
    var campFireMaterial = new THREE.MeshLambertMaterial({

        color: 0xffffff,
        vertexColors: THREE.NoColors,
        side: THREE.FrontSide

    });

    // campfire.obj / campfire_texture.jpg
    PHOTONS.Util.loadObj('/assets/I/R/F/k/IRFk4', '/assets/c/m/p/q/cmpqg.jpg', campFireMaterial,

        function(mesh) {

            mesh.castShadow = true;
            mesh.receiveShadow = false;

        },
        function(object) {

            object.position.set(0, 0, 0);
            object.scale.set(7, 7, 7);
            scene.add(object);

            incrementAndCheckLoadComplete();

        }

    );

    // ---------------------
    // load rocks
    // ---------------------

    var rockMaterial = new THREE.MeshLambertMaterial({

        color: 0xffffff,
        vertexColors: THREE.NoColors,
        side: THREE.FrontSide

    });

    // brownrock.obj / brownrock.jpg
    PHOTONS.Util.loadObj('/assets/i/3/I/O/i3IOl', '/assets/6/O/z/v/6Ozvi.jpg', rockMaterial,

        function(mesh) {

            mesh.castShadow = true;
            mesh.receiveShadow = true;

        },
        function(object) {

            object.position.set(-70, 0, 0);
            object.scale.set(.55, .55, .55);
            scene.add(object);

            var rockObject2 = object.clone();
            rockObject2.rotation.z = -Math.PI / 4;
            rockObject2.rotation.x = Math.PI / 2;
            rockObject2.position.set(-55, -1, 25);
            rockObject2.scale.set(.35, .35, .35);
            scene.add(rockObject2);

            var rockObject3 = object.clone();
            rockObject3.rotation.z = Math.PI / 4;
            rockObject3.rotation.x = Math.PI / 2;
            rockObject3.position.set(45, 10, 45);
            rockObject3.scale.set(.65, .65, .85);
            scene.add(rockObject3);

            incrementAndCheckLoadComplete();

        }

    );

    // ---------------------
    // load trees
    // ---------------------

    var treeMaterial = new THREE.MeshLambertMaterial({

        color: 0xffffff,
        vertexColors: THREE.NoColors,
        side: THREE.FrontSide

    });

    // pinetree_doubleface.obj / pinetree.jpg
    PHOTONS.Util.loadObj('/assets/A/2/w/5/A2w5e', '/assets/6/T/L/r/6TLrZ.jpg', treeMaterial,

        function(mesh) {

            mesh.castShadow = true;
            mesh.receiveShadow = true;

        },
        function(object) {

            object.rotation.z = Math.PI / 64;
            object.rotation.x = Math.PI / 64;
            object.position.set(-20, -1, -80);
            object.scale.set(1.155, 1.155, 1.155);
            scene.add(object);

            var treeObject2 = object.clone();
            treeObject2.rotation.z = -Math.PI / 16;
            treeObject2.rotation.x = Math.PI / 32;
            treeObject2.position.set(15, -1, -80);
            treeObject2.scale.set(.855, .855, .855);
            scene.add(treeObject2);

            incrementAndCheckLoadComplete();

        }

    );

    particleSystemsParent = new THREE.Object3D();
    particleSystemsParent.position.set(0, 0, 0);
    particleSystemsParent.matrixAutoUpdate = true;
    scene.add(particleSystemsParent);

}

function initScene() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 1.0, 2, 2000);
    scene.add(camera);
    resetCamera();

}

function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.autoRotate = true; // true:自動回転する,false:自動回転しない
    controls.autoRotateSpeed = -3.0; //自動回転する時の速度
    controls.target.set(0, 0, 0);
    controls.update();

}

function onWindowResize() {

    getScreenDimensions();
    renderer.setSize(screenWidth, screenHeight);
    resetCamera();

}

var flickerPointLight = (function() {

    var lastAdjuster;

    return function flickerPointLight() {

        var adjuster = (Math.random() - 0.5);

        if (lastAdjuster) {

            diff = (adjuster - lastAdjuster) * .2;
            adjuster = lastAdjuster + diff;

        }

        var intensity = 4;
        intensity += adjuster * 4;
        pointLight.intensity = intensity;

        pointLight.distance = adjuster * 50 + 200;
        pointLight.decay = adjuster * 5 + 3;

        lastAdjuster = adjuster;

    }

})();

function updateSmokeType() {

    particleSystems[ParticleSystemIDs.Smoke].deactivate();

    if (smokeActive) {

        particleSystems[smokeType].activate();

    }

}

function startParticleSystemEnvironment(id) {

    resetCamera();

    Object.keys(particleSystems).forEach(function(key) {

        var system = particleSystems[key];
        system.deactivate();

    });

    currentEnvironmentID = id;
    if (id == ParticleEnvironmentIDs.Campfire) {

        smokeActive = true;
        particleSystems[ParticleSystemIDs.Flame].activate();
        particleSystems[ParticleSystemIDs.FlameEmbers].activate();
        updateSmokeType();
        pointLight.distance = 300;
        pointLight.intensity = 6;
        pointLight.color.setRGB(1, .8, .4);
        pointLight.decay = 2;
        pointLight.position.set(0, 40, 0);

        ambientLight.color.setRGB(.08, .08, .08);

    } else {

        return;

    }

}

function getScreenDimensions() {

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

}

function resetCamera() {

    getScreenDimensions();
    camera.aspect = screenWidth / screenHeight;
    camera.updateProjectionMatrix();
    camera.position.set(0, 100, 200);
    camera.lookAt(scene.position);

}

function updateParticleSystems() {

    var deltaTime = clock.getDelta();

    Object.keys(particleSystems).forEach(function(key) {

        var system = particleSystems[key];
        if (system.isActive) {

            system.update(deltaTime);

        }

    });

    if (currentEnvironmentID == ParticleEnvironmentIDs.Campfire) {

        flickerPointLight();

    }

}

function animate() {

    requestAnimationFrame(animate);
    update();
    render();

}

function update() {

    var time = performance.now() * 0.001;

    controls.update();
    updateParticleSystems();

}

function render() {

    renderer.render(scene, camera);

}