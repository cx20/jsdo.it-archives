// forked from cx20's "Babylon.js + Oimo.js でドミノっぽくドット絵を作るテスト" http://jsdo.it/cx20/IV5c
// forked from cx20's "Babylon.js + Oimo.js でサッカーボールを落下させてみるテスト" http://jsdo.it/cx20/q0A9
// forked from cx20's "Babylon.js + Oimo.js を試してみるテスト（その４）" http://jsdo.it/cx20/zbqE
// forked from cx20's "Babylon.js + Oimo.js を試してみるテスト（その３）" http://jsdo.it/cx20/jIDe
// forked from cx20's "Babylon.js + Oimo.js を試してみるテスト（その２）" http://jsdo.it/cx20/2s9F
// forked from cx20's "Babylon.js + Oimo.js を試してみるテスト" http://jsdo.it/cx20/exkA
// forked from Temechon's "Physics demo - Babylon.js & Oimo.js" http://pixelcodr.com/tutos/oimo/game/index.html

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":[0xDC/0xFF, 0xAA/0xFF, 0x6B/0xFF],    // 段ボール色
        "白":[0xff/0xFF, 0xff/0xFF, 0xff/0xFF],
        "肌":[0xff/0xFF, 0xcc/0xFF, 0xcc/0xFF],
        "茶":[0x80/0xFF, 0x00/0xFF, 0x00/0xFF],
        "赤":[0xff/0xFF, 0x00/0xFF, 0x00/0xFF],
        "黄":[0xff/0xFF, 0xff/0xFF, 0x00/0xFF],
        "緑":[0x00/0xFF, 0xff/0xFF, 0x00/0xFF],
        "水":[0x00/0xFF, 0xff/0xFF, 0xff/0xFF],
        "青":[0x00/0xFF, 0x00/0xFF, 0xff/0xFF],
        "紫":[0x80/0xFF, 0x00/0xFF, 0x80/0xFF]
    };
    return colorHash[c];
}

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
    scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
    scene.getPhysicsEngine().setTimeStep(1 / 10);

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
    var camera = new BABYLON.ArcRotateCamera("Camera", -2.2, 1.37, 500, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.maxZ = 5000;
    camera.lowerRadiusLimit = 120;
    camera.upperRadiusLimit = 430;
    camera.lowerBetaLimit =0.75;
    camera.upperBetaLimit =1.58 ;

    /** SUN LIGHT **/
    new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    /** GROUND **/
    var mat = new BABYLON.StandardMaterial("ground", scene);
    //var t = new BABYLON.Texture("ground.jpg", scene);
    //var t = new BABYLON.Texture("http://jsrun.it/assets/v/T/X/f/vTXfj.jpg", scene); // ground.jpg
    //var t = new BABYLON.Texture("grass.jpg", scene);
    var t = new BABYLON.Texture("../../assets/8/l/A/2/8lA2e.jpg", scene); // grass.jpg
    
    t.uScale = t.vScale = 2;
    mat.diffuseTexture = t;
    mat.specularColor = BABYLON.Color3.Black();
    var g = BABYLON.Mesh.CreateBox("ground", 400, scene);
    g.position.y = -20;
    g.scaling.y = 0.01;
    g.material = mat;
    //g.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false, mass: 0, friction: 1.0, restitution: 1.0 });
    g.physicsImpostor = new BABYLON.PhysicsImpostor(g, BABYLON.PhysicsImpostor.BoxImpostor, { move:false, mass: 0, friction: 1.0, restitution: 1.0 }, scene);

    // Get a random number between two limits
    var randomNumber = function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    };

    // Initial height
    var y = 200;

    // all our objects
    var objects = [];

    // Creates arandom position above the ground
    var getPosition = function(y) {
        return new v3(randomNumber(-25,25) , randomNumber(0, 100) + y, randomNumber(-25, 25));
    };

    // Creates
    var domino_size = 15;
    var i = 0;
    for (var y = 0; y < 16; y++) {
        for (var x = 0; x < 16; x++) {
            i = x + (15 - y) * 16;
            var domino = BABYLON.Mesh.CreateBox("Domino" + String(i), domino_size, scene);
            x1 = -100  + x * domino_size * 1.0;
            y1 = -10;
            z1 = -150 + y * domino_size * 1.2;
            domino.position = new BABYLON.Vector3(x1, y1, z1);
            domino.scaling = { x:0.1, y:1.0, z:1.0 };
            var materialDomino = new BABYLON.StandardMaterial("domino", scene);
            rgbColor = getRgbColor(dataSet[i]);
            materialDomino.emissiveColor = new BABYLON.Color3(rgbColor[0], rgbColor[1], rgbColor[2]);
            materialDomino.diffuseColor = new BABYLON.Color3(rgbColor[0], rgbColor[1], rgbColor[2]);
            domino.material = materialDomino;
            //domino.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, mass: 1 });
            domino.physicsImpostor = new BABYLON.PhysicsImpostor(domino, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1}, scene);
        }
    }
    
    var ball_size = 15;
    for (y = 0; y < 16; y++) {
        var ball = BABYLON.Mesh.CreateSphere("ball" + String(y), 16, ball_size, scene);
        x1 = -105;
        y1 = 10 + Math.random();
        z1 = -150 + y * ball_size * 1.2;
        ball.position = new BABYLON.Vector3(x1, y1, z1);
        ball.rotation.x = 0.1;
        ball.rotation.y = 0.1;
        ball.rotation.z = 0.1;
        materialBall = new BABYLON.StandardMaterial("ball", scene);
        //materialBall.diffuseTexture = new BABYLON.Texture("/assets/g/w/v/H/gwvHN.png", scene); // Football.png
        materialBall.diffuseTexture = new BABYLON.Texture("../../assets/r/x/X/q/rxXqY.jpg", scene); // Football.png
        rgbColor = getRgbColor("白");
        materialBall.emissiveColor = new BABYLON.Color3(rgbColor[0], rgbColor[1], rgbColor[2]);
        ball.material = materialBall;
        //ball.setPhysicsState({ impostor: BABYLON.PhysicsEngine.SphereImpostor, mass: 1 });
        ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1}, scene);
    }
    
    scene.registerBeforeRender(function() {
        objects.forEach(function(obj) {
            // If object falls
            if (obj.position.y < -100) {
                obj.position = getPosition(200);
                //obj.setPhysicsState({impostor:BABYLON.PhysicsEngine.SphereImpostor, mass:1, friction:0.4, restitution:0.6});
                obj.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
            }
        });
        //scene.activeCamera.alpha += 0.01;
    });

};
