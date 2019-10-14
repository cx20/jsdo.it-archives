// forked from cx20's "voxel.css を試してみるテスト（その２）" http://jsdo.it/cx20/IQZx
// forked from cx20's "voxel.css を試してみるテスト" http://jsdo.it/cx20/UK3K
// forked from https://github.com/HunterLarco/voxel.css/blob/master/tests/demo.html

var DOT_SIZE = 30;
var X_START_POS = -DOT_SIZE * 8;
var Y_START_POS = -DOT_SIZE * 8;

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
		"無":"#000000",
		"白":"#ffffff",
		"肌":"#ffcccc",
		"茶":"#800000",
		"赤":"#ff0000",
		"黄":"#ffff00",
		"緑":"#00ff00",
		"水":"#00ffff",
		"青":"#0000ff",
		"紫":"#800080"
	};
	return colorHash[ c ];
}

var scene;
var world;
var editor;
var lightSource;

function init() {
    scene = new voxelcss.Scene();
    scene.rotate(-Math.PI / 5, Math.PI / 4, 0);
    scene.attach(document.body);

    world = new voxelcss.World(scene, 'Demo World');
    editor = new voxelcss.Editor(world);
    editor.enableAutoSave();

    lightSource = new voxelcss.LightSource(300, 300, 300, 750, 0.2, 1);
    scene.addLightSource(lightSource);

    buildCube();
    animate();
}

function buildCube() {
    for ( i = 0; i < dataSet.length; i++ ) {
        var x = ( i % 16 ) * DOT_SIZE + X_START_POS;
        var y = ( 16 - Math.floor( i / 16 ) ) * DOT_SIZE + Y_START_POS;
        var z = 0;
        var color = getRgbColor(dataSet[i]);
        if ( dataSet[i] != "無" ) {
            editor.add(new voxelcss.Voxel(x, y, z, DOT_SIZE * 0.8, {
                mesh: new voxelcss.Mesh(new voxelcss.ColorFace(color))
            }));
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    var x = -Math.PI * 2 / 180 ;
    var y = Math.PI * 2 / 180;
    var z = 0;
    scene.rotate(x, y, z);
}

init();