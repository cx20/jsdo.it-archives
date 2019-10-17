// forked from cx20's "forked: 記号文字で図形を描くテスト" http://jsdo.it/cx20/k9Q2
// forked from cx20's "記号文字で図形を描くテスト" http://jsdo.it/cx20/vFbx
// forked from http://javascript.g.hatena.ne.jp/cx20/20080312/1205291740

var X_MAX = 460;
var Y_MAX = 460;
var X_START_POS = 50;
var Y_START_POS = 120;

var X_CHAR_SIZE = 14;
var Y_CHAR_SIZE = 14;

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

var canvas;
var symbol = "╋";
var angle = 0;
var animation = true;

function init() {
    canvas = new fabric.Canvas('Canvas');
    
    var gui = new dat.GUI();
    gui.add(this, 'symbol', [ '■', '◆', '●', '★', '╋', '□', '◇', '○', '☆', '┼' ] );
    gui.add(this, 'animation').listen();
    
    initMario();
   
    setInterval( draw, 100 );
}

function initMario() {
    var i, x, y;
    var color;
	for ( i = 0; i < dataSet.length; i++ ) {
        x = i % 16;
        y = Math.floor( i / 16 );
        var text = new fabric.Text(symbol, { 
            fontSize: 20,
            fontFamily: 'ＭＳ ゴシック', 
            left:  x * X_CHAR_SIZE + X_START_POS, 
            top: y * Y_CHAR_SIZE + Y_START_POS,
            fill: getRgbColor(dataSet[i]),
            angle: 0
        });

        if ( dataSet[i] != "無" ) {
            canvas.add( text );
        }
	}
}

function draw() {
    if ( animation ) {
        drawMario();
    }

}

function drawMario() {
    angle += 10;
    if (angle === 360) {
        angle = 0;
    }
    var i, x, y;
    var color;
    var canvasObjects = canvas.getObjects();
	for ( i = 0; i < canvasObjects.length; i++ ) {
        canvasObjects[i].setText(symbol);
        canvasObjects[i].setAngle(angle);
	}
    canvas.renderAll();

}
