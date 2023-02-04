// forked from cx20's "JSModeler でドット絵を描いてみるテスト" http://jsdo.it/cx20/yzCV
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

var viewer = null;
var legoBuild = null;
var pos = 0;

function GenerateLegoBuild(index) {
    var bodyAndMaterials = legoBuild.GetBodyAndMaterials(index);
    var meshes = JSM.ConvertBodyToThreeMeshes(bodyAndMaterials[0], bodyAndMaterials[1]);
    for (var i = 0; i < meshes.length; i++) {
        viewer.AddMesh(meshes[i]);
    }
}

function GetColorTable() {
    var colors = [
        '#FEC400',
        '#E76318',
        '#DE000D',
        '#80081B',
        '#0057A8',
        '#478CC6',
        '#007B28',
        '#5F8265',
        '#95B90B',
        '#5B1C0C',
        '#8D7452',
        '#D67240'
    ];
    return colors;
}

function draw() {
    drawScreen();
    drawMario();
}

function drawScreen() {
    var currentBrickCount = legoBuild.BrickCount ();
    if (currentBrickCount > 1) {
        legoBuild.RemoveAllBricks ();
        var i;
        for (i = 0; i < currentBrickCount - 1; i++) {
            viewer.RemoveLastMesh ();
        }
    }
}

function drawMario() {
    var tableSize = 16;
    var x, y;
    var columns = 1;
    var rows = 1;
    var isLarge = false;
    for (var i = 0; i < dataSet.length; i++) {
        x = (i + pos) % 16;
        y = Math.floor(i / 16);

        if (dataSet[i] != "無") {
            var color = getRgbColor(dataSet[i]);
            legoBuild.AddLegoBrick(new JSM.LegoBrick(y, x, columns, rows, isLarge, color));
            GenerateLegoBuild(legoBuild.BrickCount() - 1);
        }
    }
    viewer.Draw();
    pos++;
}


function Load() {
    var TextureLoaded = function () {
        viewer.Draw();
    };

    var viewerSettings = {
        "cameraEyePosition": [1.0, -0.5, 1.0],
        "cameraCenterPosition": [0.0, 0.0, 0.0],
        "cameraUpVector": [0, 0, 5]
    };

    var settings = {
        mode: 'Polygon',
        color: '#00aa00'
    };

    var tableSize = 16;

    viewer = new JSM.ThreeViewer ();
    if (!viewer.Start (document.getElementById ('example'), viewerSettings)) {
        Error ();
        return;
    }
    
    legoBuild = new JSM.LegoBuild(new JSM.LegoTable(tableSize, tableSize));
    GenerateLegoBuild(0);

    viewer.FitInWindow();
    viewer.Draw();

    //drawMario();
    setInterval( draw, 200 );
}

window.onload = function () {
    Load();
};
