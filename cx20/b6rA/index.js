// forked from cx20's "ドット絵をCRT表示っぽくするテスト" http://jsdo.it/cx20/j4TG
// forked from cx20's "ドット絵を液晶表示っぽくするテスト" http://jsdo.it/cx20/2DwX
// forked from cx20's "ドット絵を LED っぽく表示するテスト（その２）" http://jsdo.it/cx20/8tfT
// forked from cx20's "ドット絵を LED っぽく表示するテスト（その１）" http://jsdo.it/cx20/9owu
// forked from cx20's "forked: EaselJS テスト" http://jsdo.it/cx20/yKZ8
// forked from cx20's "EaselJS テスト" http://jsdo.it/cx20/oxOS
var X_MAX = 440;
var Y_MAX = 440;
var DOT_SIZE = (window.innerHeight/18); // 20;
var SCALE = window.innerHeight/Y_MAX;
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


function getDotSize( c )
{
    var colorHash = {
        "無":1,
        "白":10,
        "肌":9,
        "黄":8,
        "水":7,
        "赤":6,
        "緑":5,
        "青":4,
        "紫":3,
        "茶":2
    };
    return colorHash[ c ] * SCALE;
}

var canvas;
var ctx;
var radius = (DOT_SIZE / 2) - 2;
var pos = 0;

init();

function init() {
    canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    
    //draw();
    setInterval( draw, 200 );
}


function draw() {
    drawScreen();
    drawMario();
}

function drawScreen() {
    //ctx.clearRect( 0, 0, X_MAX, Y_MAX );
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawMario() {
    var i, x, y;
    var c;
    var color;
    var colorR;
    var colorG;
    var colorB;
    var dotSize;
    for ( i = 0; i < dataSet.length; i++ ) {
        x = X_START_POS + ( (i + pos ) % 16 ) * DOT_SIZE;
        y = Y_START_POS + Math.floor( i / 16 ) * DOT_SIZE;
        c = dataSet[i];
        dotSize = getDotSize( c );
        ctx.beginPath();
        ctx.fillStyle = "#800000";
        ctx.arc(x, y, dotSize, 0, Math.PI*2, true);
        ctx.fill();
    }
    pos++;
}

