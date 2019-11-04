// forked from cx20's "Babylon.js で Cannon.js を使ってみるテスト" http://jsdo.it/cx20/2Pre

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
/*
    var colorHash = {
        "無":0xDCAA6B,    // 段ボール色
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
*/
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
    new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

    /** GROUND **/
    var mat = new BABYLON.StandardMaterial("ground", scene);
    //var t = new BABYLON.Texture("img/ground3.jpg", scene);
    //var t = new BABYLON.Texture("../../assets/v/T/X/f/vTXfj.jpg", scene);
     var t = new BABYLON.Texture("../../assets/8/l/A/2/8lA2e.jpg", scene); // grass.jpg
   
    t.uScale = t.vScale = 10;
    mat.diffuseTexture = t;
    mat.specularColor = BABYLON.Color3.Black();
    var g = BABYLON.Mesh.CreateBox("ground", 400, scene);
    g.position.y = -20;
    g.scaling.y = 0.01;
    g.material = mat;
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
    var y = 50;

    // all our objects
    var objects = [];

    // max number of objects
    var max = 150;

    // Creates arandom position above the ground
    var getPosition = function(y) {
        //return new v3(randomNumber(-200,200), y, randomNumber(-200, 200));
        return new v3(randomNumber(-25,25) , randomNumber(0, 100) + y, randomNumber(-25, 25));
    };

    // Box
    var box_size = 8;
    var i = 0;
    for (var y = 0; y < 16; y++) {
        for (var x = 0; x < 16; x++) {
            i = (15 - x) + (15 - y) * 16;
            var box = BABYLON.Mesh.CreateBox("Box" + String(i), box_size * 0.8, scene, true);
            var x1 = -30 + x * box_size + Math.random();
            var y1 = 30 + y * box_size + Math.random();
            var z1 = 50 + Math.random();
            box.position = new BABYLON.Vector3(x1, y1, z1);
            var materialWood = new BABYLON.StandardMaterial("wood", scene);
            //materialWood.diffuseTexture = new BABYLON.Texture("../../assets/2/3/x/Y/23xY2.jpg", scene); // wood.jpg
            materialWood.diffuseTexture = new BABYLON.Texture("../../assets/y/M/D/y/yMDyd.jpg", scene); // wood.jpg
            //materialWood.diffuseTexture = new BABYLON.Texture("wood.jpg", scene); // wood.jpg
            var rgbColor = getRgbColor(dataSet[i]);
            materialWood.emissiveColor = new BABYLON.Color3(rgbColor[0], rgbColor[1], rgbColor[2]);
            box.material = materialWood;
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 1, friction: 0.2, restitution: 0.3}, scene);
            //box.rotate(BABYLON.Axis.X,Math.random() * 0.5);
            //box.rotate(BABYLON.Axis.Z,Math.random() * 0.5);

            // SAVE OBJECT
            objects.push(box);
        }
    }

    scene.registerBeforeRender(function() {
        objects.forEach(function(obj) {
            // If object falls
            if (obj.position.y < -100) {
                obj.position = getPosition(200);
                obj.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
            }
        });
    });

};
