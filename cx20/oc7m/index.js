// forked from cx20's "CSS でドット絵を描くテスト（その３）" http://jsdo.it/cx20/gRie
// forked from cx20's "CSS でドット絵を描くテスト（その２）" http://jsdo.it/cx20/iQdn
// forked from cx20's "CSS でドット絵を描くテスト" http://jsdo.it/cx20/etxV
// forked from cx20's "forked: HTML TABLE でドット絵を描くテスト" http://jsdo.it/cx20/mKpp
// forked from cx20's "HTML TABLE でドット絵を描くテスト" http://jsdo.it/cx20/wD9k

var X_MAX = 440;
var Y_MAX = 440;
var DOT_SIZE = 15;
var X_START_POS = X_MAX / 2 - (DOT_SIZE * 16) / 2;
var Y_START_POS = X_MAX / 2 - (DOT_SIZE * 16) / 2;

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
var ctx;
var radius = (DOT_SIZE / 2) - 2;
var pos = 0;

var degree = 0;

init();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    draw();
    
    setInterval( rotate, 100 );
}

function draw() {
    drawScreen();
    drawMario();
}

function drawScreen() {
    ctx.clearRect( 0, 0, X_MAX, Y_MAX );
}

function drawMario() {
    var i, x, y;
    var c;
    var color;
    for ( i = 0; i < dataSet.length; i++ ) {
        x = X_START_POS + ( i % 16 ) * DOT_SIZE;
        y = Y_START_POS + Math.floor( i / 16 ) * DOT_SIZE;
        c = dataSet[i];
        color = getRgbColor( c );
        ctx.fillStyle = color;
        ctx.fillRect(x, y, DOT_SIZE - 2, DOT_SIZE - 2);
    }
}

function rotate() {
    degree += 5;
    if ( degree >= 360 ) {
        degree = 0;
    }
    canvas.style.WebkitTransform = "perspective(1000px) rotateY("+degree+"deg)";
    canvas.style.MozTransform = "perspective(1000px) rotateY("+degree+"deg)";
    canvas.style.msTransform = "perspective(1000px) rotateY("+degree+"deg)";
}

