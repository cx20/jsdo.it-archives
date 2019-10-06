// forked from cx20's "obelisk.js でドット絵を描いてみるテスト" http://jsdo.it/cx20/7W4D
// forked from rison's "Pixel Isometric Cube Generator" http://jsdo.it/rison/ttQD

var DOT_SIZE = 14;
var X_START_POS = 50;
var Y_START_POS = 50;

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

function getRgbColor( c )
{
    return colorHash[ c ];
}

function main() {
    // 0 point in 2d canvas
    var point = new obelisk.Point(230, 120);
    var pos = 0;

    // control bar
    var ControlBar = function () {
        this.xDimension = DOT_SIZE;
        this.yDimension = DOT_SIZE;
        this.zDimension = DOT_SIZE;
        this.border = true;
    };
    
    // build floor
    var canvasFloor = document.getElementById('canvas-floor');
    var pixelViewFloor = new obelisk.PixelView(canvasFloor, point);
    var brickDimension = new obelisk.BrickDimension(16, 16);
    var brick = new obelisk.Brick(brickDimension);
    var dimension = new obelisk.CubeDimension(16, 16, 16);
    
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 16; j++) {
            var p3D = new obelisk.Point3D(i * DOT_SIZE, j * DOT_SIZE, 0);
            pixelViewFloor.renderObject(brick, p3D);
        }
    }

    // build cube
    var canvas = document.getElementById('canvas-demo');
    var pixelView = new obelisk.PixelView(canvas, point);

    function renderCube( x, y, z, c, border) {
        var cube = cubes[c];
        var p3D = new obelisk.Point3D(x, y, z);
        pixelView.renderObject(cube, p3D);
    }
    
    // make array for color cube
    var cubes = [];
    var colors = [];
    var con = new ControlBar();
    for( var c in colorHash) {
        colors[c] = new obelisk.CubeColor().getByHorizontalColor( getRgbColor(c) );
        cubes[c] = new obelisk.Cube(dimension, colors[c], con.border);
    }

    setInterval( draw, 200 );

    function draw() {
        drawScreen();
        drawMario();
    }
    
    function drawScreen() {
        pixelView.clear();
    }
    
    function drawMario() {
        var x, y, z;
        var c;
        for ( i = 0; i < dataSet.length; i++) {
            if (dataSet[i] != "無") {
                x = (i + pos) % 16 * DOT_SIZE;
                y = Math.floor(i / 16) * DOT_SIZE;
                z = 0;
                c = dataSet[i];
                renderCube( x, y, z, c, con.border);
            }
        }
        pos++;
    }
}

main();
