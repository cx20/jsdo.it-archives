// forked from cx20's "Babylon.js でドット絵を回転するテスト" http://jsdo.it/cx20/5gwF
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

const DOT_SIZE = 3;
const X_START_POS = -20;
const Y_START_POS = -20;

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
const dataSet = [
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
	const colorHash = {
		"無":0x000000,
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
	return colorHash[ c ];
}

var scene;
var sphere;

window.onload = function () {
    const canvas = document.getElementById("renderCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        const engine = new BABYLON.Engine(canvas, true);

        //Create Rotation/Scaling scene
        scene = createScene(engine);
        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            scene.render();
        });

        let alpha = 0;
        scene.beforeRender = function () {
            sphere.rotation.x = alpha;
            sphere.rotation.y = -alpha;
            alpha += 0.01;
        };

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
        
        document.getElementById('export_scene').addEventListener('click', function() {
            var options = {
                binary: document.getElementById('option_binary').checked
            };
            
            if ( options.binary ) {
                let glb = BABYLON.GLTF2Export.GLB(scene, "hello", {});
                glb.downloadFiles();
            } else {
                let gltf = BABYLON.GLTF2Export.GLTF(scene, "hello", {});
                gltf.downloadFiles();
            }
        
        });
    }

};

function createScene(engine) {
    //Creation of the scene
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 2 * Math.PI, 100, new BABYLON.Vector3.Zero(), scene);

    const directional1 = new BABYLON.DirectionalLight("directional", new BABYLON.Vector3(100, 100, 100), scene);
    const directional2 = new BABYLON.DirectionalLight("directional", new BABYLON.Vector3(100, -100, -100), scene);

    sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 1, scene); // オブジェクトの親として用意
    sphere.rotation.x = Math.PI * 90 / 180;
    sphere.rotation.y = Math.PI * 90 / 180;
    sphere.isVisible = false;
    for (let i = 0; i < dataSet.length; i++) {
        let x = (i % 16) * DOT_SIZE + X_START_POS;
        let y = (16 - Math.floor(i / 16)) * DOT_SIZE + Y_START_POS;

        let color = getRgbColor(dataSet[i]);
        let colorR = ((color & 0xff0000) >> 16) / 255;
        let colorG = ((color & 0x00ff00) >>  8) / 255;
        let colorB = ((color & 0x0000ff) >>  0) / 255;

        if (dataSet[i] != "無") {
            let box = BABYLON.Mesh.CreateBox("Box", DOT_SIZE * 0.8, scene);
            box.position.x = x;
            box.position.y = y;
            let material = new BABYLON.StandardMaterial("default", scene);
            material.diffuseColor = new BABYLON.Color3(colorR, colorG, colorB);
            material.backFaceCulling = false;
            box.material = material;
            box.parent = sphere; // ドットをグループ化する為に親を指定
        }
    }

    return scene;
}