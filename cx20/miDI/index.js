// forked from cx20's "Babylon.js + Oimo.js で消しゴムを落下させてみるテスト（改）" http://jsdo.it/cx20/oMV2
// forked from cx20's "Babylon.js + Oimo.js で消しゴムを落下させてみるテスト" http://jsdo.it/cx20/2B91
// forked from cx20's "Babylon.js + Oimo.js で階段からテクスチャを転がしてみるテスト（その２）" http://jsdo.it/cx20/cO8L
// forked from cx20's "Babylon.js + Oimo.js で階段からテクスチャを転がしてみるテスト" http://jsdo.it/cx20/QHMX
// forked from cx20's "Babylon.js + Oimo.js で階段からボールを転がしてみるテスト" http://jsdo.it/cx20/ytSi
// forked from cx20's "Babylon.js + Oimo.js で箱にボールを入れてみるテスト（その３）" http://jsdo.it/cx20/sq6f
// forked from cx20's "Babylon.js + Oimo.js で箱にボールを入れてみるテスト（その２）" http://jsdo.it/cx20/w7xl
// forked from cx20's "Babylon.js + Oimo.js で箱にボールを入れてみるテスト" http://jsdo.it/cx20/3iAf
// forked from cx20's "Babylon.js + Oimo.js を試してみるテスト（その４）" http://jsdo.it/cx20/zbqE
// forked from cx20's "Babylon.js + Oimo.js を試してみるテスト（その３）" http://jsdo.it/cx20/jIDe
// forked from cx20's "Babylon.js + Oimo.js を試してみるテスト（その２）" http://jsdo.it/cx20/2s9F
// forked from cx20's "Babylon.js + Oimo.js を試してみるテスト" http://jsdo.it/cx20/exkA
// forked from Temechon's "Physics demo - Babylon.js & Oimo.js" http://pixelcodr.com/tutos/oimo/game/index.html

// The babylon engine
var engine;
// The current scene
var scene;
// The HTML canvas
var canvas;

// to go quicker
var v3 = BABYLON.Vector3;

// The function onload is loaded when the DOM has been loaded
document.addEventListener("DOMContentLoaded", function () {
    onload();
}, false);

// Resize the babylon engine when the window is resized
window.addEventListener("resize", function () {
	if (engine) {
		engine.resize();
	}
},false);

/**
 * Onload function : creates the babylon engine and the scene
 */
var onload = function () {
	// Engine creation
    canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);

    // Scene creation
	createScene();

    // The render function
	engine.runRenderLoop(function () {
        scene.render();
	});	

};

var createScene = function() {

    scene = new BABYLON.Scene(engine);
    //scene.debugLayer.show();
    scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.CannonJSPlugin());
    scene.getPhysicsEngine().setTimeStep(1 / 30);

    /** SKYBOX **/
    BABYLON.Engine.ShadersRepository = "shaders/";
    var skybox = BABYLON.Mesh.CreateSphere("skyBox", 10, 2500, scene);
    var shader = new BABYLON.ShaderMaterial("gradient", scene, {
        vertexElement: "vertexShaderCode",
        fragmentElement: "fragmentShaderCode"
    }, {});
    shader.setFloat("offset", 0);
    shader.setFloat("exponent", 0.6);
    shader.setColor3("topColor", BABYLON.Color3.FromInts(0,119,255));
    shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240,240, 255));
    shader.backFaceCulling = false;
    skybox.material = shader;


    /** CAMERA **/
    var camera = new BABYLON.ArcRotateCamera("Camera", 0.86, 1.37, 250, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.maxZ = 5000;
    camera.lowerRadiusLimit = 120;
    camera.upperRadiusLimit = 430;
    camera.lowerBetaLimit =0.75;
    camera.upperBetaLimit =1.58 ;

    /** SUN LIGHT **/
    var light0 = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    /** GROUND **/
    var mat = new BABYLON.StandardMaterial("ground", scene);
    var t = new BABYLON.Texture("../../assets/8/l/A/2/8lA2e.jpg", scene); // grass.jpg
    
    t.uScale = t.vScale = 2;
    mat.diffuseTexture = t;
    mat.specularColor = BABYLON.Color3.Black();
    var g = BABYLON.Mesh.CreateBox("ground", 400, scene);
    g.position.y = -20;
    g.scaling.y = 0.01;
    g.material = mat;
    g.physicsImpostor = new BABYLON.PhysicsImpostor(g, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1.0, restitution: 1.0 }, scene);

    // light1
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20*10, 40*10, 20*10);
    light.intensity = 0.5*2;

    var matBoard = new BABYLON.StandardMaterial("board", scene);
    matBoard.emissiveColor = new BABYLON.Color3(1, 0, 0);
    var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
    matBoard.diffuseTexture = fireTexture;
    matBoard.opacityTexture = fireTexture;

    for ( var i = 0; i < 20; i++ ) {
        var stair = BABYLON.Mesh.CreateBox("stair", 100, scene);
        stair.position.x = i * -10;
        stair.position.y = i * 5 - 10;
        stair.scaling.x = 0.1;
        stair.scaling.y = 0.1;
        //stair.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false, mass: 0, friction: 1.0, restitution: 1.0 });
        stair.physicsImpostor = new BABYLON.PhysicsImpostor(stair, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 1.0, restitution: 1.0 }, scene);
    }

    // Get a random number between two limits
    var randomNumber = function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

    // Initial height
    var y = 50;

    // all our objects
    var objects = [];

    // max number of objects
    //var max = 150;
    var max = 300;

    // Creates arandom position above the ground
    var getPosition = function(y) {
        //return new v3(randomNumber(-25,25), y, randomNumber(-25, 25));
        return new v3(randomNumber(-25,25) , randomNumber(0, 100) + y, randomNumber(-25, 25));
    };

    var matEraser = new BABYLON.StandardMaterial("material", scene);
    matEraser.reflectionTexture = new BABYLON.CubeTexture(
        "../../assets",
        scene,
        [
        "/K/J/E/L/KJELT.png", // "/eraser_px.png",
        "/a/n/c/O/ancOu.png", // "/eraser_py.png",
        "/4/5/e/g/45egw.png", // "/eraser_pz.png",
        "/I/i/K/q/IiKql.png", // "/eraser_nx.png",
        "/8/Y/P/B/8YPB2.png", // "/eraser_ny.png",
        "/2/m/0/f/2m0fo.png", // "/eraser_nz.png"
        ]
    );
    matEraser.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    matEraser.diffuseColor = BABYLON.Color3.Black();
    
    // Creates
    for (var i = 0; i < max; i++) {

        var scale = 1;
        var s = BABYLON.Mesh.CreateBox("s", 15, scene);
        // 消しゴムのサイズとなるよう調整
        s.scaling.x = 1.0;
        s.scaling.y = 0.2;
        s.scaling.z = 0.5;
        s.position = new v3(randomNumber(-25,25) - 120, randomNumber(0, 100) + 200, randomNumber(-50, 50));
        s.material = matEraser;
        s.physicsImpostor = new BABYLON.PhysicsImpostor(s, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, friction: 0.4, restitution: 0.2 }, scene);

        // SAVE OBJECT
        objects.push(s);

        // INCREMENT HEIGHT
        //y+=10;
    }
    
    scene.registerBeforeRender(function() {
        objects.forEach(function(obj) {
            // If object falls
            if (obj.position.y < -100) {
                //obj.position = getPosition(100);
                obj.position = new v3(randomNumber(-25,25) - 120, randomNumber(0, 100) + 200, randomNumber(-50, 50));
            }
        });
        //scene.activeCamera.alpha += 0.01;
    });

};
