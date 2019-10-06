// forked from cx20's "ドット絵を濃淡で表現するテスト" http://jsdo.it/cx20/b6rA
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


function getDotChar( c )
{
    var colorHash = {
        "無":"・",
        "白":"園",
        "肌":"国",
        "黄":"固",
        "水":"曲",
        "赤":"由",
        "緑":"回",
        "青":"凶",
        "紫":"日",
        "茶":"口"
    };
    return colorHash[ c ];
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
    var font_size = parseInt(15 * SCALE, 10);
    //ctx.font = "15px 'ＭＳ ゴシック', monospace";
    ctx.font = font_size + "px 'ＭＳ ゴシック', monospace";
    
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
    var dotChar;
    for ( i = 0; i < dataSet.length; i++ ) {
        x = X_START_POS + ( (i + pos ) % 16 ) * DOT_SIZE;
        y = Y_START_POS + Math.floor( i / 16 ) * DOT_SIZE;
        c = dataSet[i];
        dotChar = getDotChar( c );
        //ctx.fillStyle = getRgbColor( c );
        ctx.fillStyle = "#707070";
        ctx.fillText( dotChar, x, y );
    }
    pos++;
}

