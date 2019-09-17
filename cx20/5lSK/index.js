// forked from cx20's "Babylon.js でドット絵を回転するテスト" http://jsdo.it/cx20/5gwF
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

var DOT_SIZE = 16;
var X_START_POS = -40;
var Y_START_POS = -40;

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
		"無":new BABYLON.Color3(0x00/0xff, 0x00/0xff, 0x00/0xff),
		"白":new BABYLON.Color3(0xff/0xff, 0xff/0xff, 0xff/0xff),
		"肌":new BABYLON.Color3(0xff/0xff, 0xcc/0xff, 0xcc/0xff),
		"茶":new BABYLON.Color3(0x80/0xff, 0x00/0xff, 0x00/0xff),
		"赤":new BABYLON.Color3(0xff/0xff, 0x00/0xff, 0x00/0xff),
		"黄":new BABYLON.Color3(0xff/0xff, 0xff/0xff, 0x00/0xff),
		"緑":new BABYLON.Color3(0x00/0xff, 0xff/0xff, 0x00/0xff),
		"水":new BABYLON.Color3(0x00/0xff, 0xff/0xff, 0xff/0xff),
		"青":new BABYLON.Color3(0x00/0xff, 0x00/0xff, 0xff/0xff),
		"紫":new BABYLON.Color3(0x80/0xff, 0x00/0xff, 0x80/0xff)
	};
	return colorHash[ c ];
}
var scene;
var sphere;
var isEnablePhysics = false;

window.onload = function () {
    var canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        var engine = new BABYLON.Engine(canvas, true);

        //Create Rotation/Scaling scene
        scene = CreateChartingTestScene(engine);
        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            scene.render();
        });

        var alpha = 0;
        scene.beforeRender = function () {
            if ( !isEnablePhysics ) {
                sphere.rotation.y = alpha;
                alpha += 0.01;
            }
        };

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });

        canvas.addEventListener("click", function () {
            isEnablePhysics = true;
    
            // Physics
            scene.enablePhysics();
        });
    
    }

};

var CreateChartingTestScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 1, scene); // オブジェクトの親として用意

    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);
    camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(20, 70, -100));
    light.position = new BABYLON.Vector3(0, 25, -50);
    
    // Data
    var scale = 10;
    var playgroundSize = 100;

/*
    // Background
    var background = BABYLON.Mesh.CreatePlane("background", playgroundSize, scene, false);
    background.material = new BABYLON.StandardMaterial("background", scene);
    background.scaling.y = 0.5;
    background.position.z = playgroundSize / 2 - 0.5;
    background.position.y = playgroundSize / 4;
    background.receiveShadows = true;
    var backgroundTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    background.material.diffuseTexture = backgroundTexture;
    background.material.specularColor = new BABYLON.Color3(0, 0, 0);
    background.material.backFaceCulling = false;
    background.parent = sphere;
    backgroundTexture.drawText("Babylon.js", null, 300, "bold 70px Segoe UI", "white", "#555555");
*/
    // Ground    
    ground = BABYLON.Mesh.CreateGround("ground", playgroundSize, playgroundSize, 1, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.position.y = -0.1;
    ground.parent = sphere;
    
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    
    //var createSeries = function (series) {
    var createSeries = function (dataSet) {
        var margin = 2;
        var offset = playgroundSize / (dataSet.length) - margin;
        var x = -playgroundSize / 2 + offset / 2;

        for (var index = 0; index < dataSet.length; index++) {
            var data = dataSet[index];
            
            if ( dataSet[index] != "無" ) {

                var bar = BABYLON.Mesh.CreateBox(data, 3.0, scene, false);
                bar.scaling = new BABYLON.Vector3(offset / 2.0, 0, offset / 2.0);
                bar.position.x = (index % 16) * DOT_SIZE * 0.3 + X_START_POS;
                bar.position.y = 0;
                bar.position.z = ( 15 - Math.floor( index / 16 )) * DOT_SIZE * 0.3 + Y_START_POS;
                
                // Animate a bit
                var animation = new BABYLON.Animation("anim", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
                animation.setKeys([
                    { frame: 0, value: new BABYLON.Vector3(offset / 2.0, 0, offset / 2.0) },
                    { frame: 100, value: new BABYLON.Vector3(offset / 2.0, Math.random() * scale / 2, offset / 2.0) }]);
                bar.animations.push(animation);
                bar.parent = sphere;
                
                scene.beginAnimation(bar, 0, 100, false, 2.0);

                // Material
                bar.material = new BABYLON.StandardMaterial(data.label + "mat", scene);
                bar.material.diffuseColor = getRgbColor(data);
                bar.material.emissiveColor = getRgbColor(data).scale(0.3);
                bar.material.specularColor = new BABYLON.Color3(0, 0, 0);

                // Shadows
                shadowGenerator.getShadowMap().renderList.push(bar);
                // Going next
                x += offset + margin;
            }
        }
    };

    //createSeries(browsers_Series);
    createSeries(dataSet);

    // Limit camera
    camera.lowerAlphaLimit = Math.PI;
    camera.upperAlphaLimit = 2 * Math.PI;
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.99;
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 150;

    return scene;
};