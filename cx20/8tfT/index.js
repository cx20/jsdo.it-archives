// forked from cx20's "ドット絵を LED っぽく表示するテスト（その１）" http://jsdo.it/cx20/9owu
// forked from cx20's "forked: EaselJS テスト" http://jsdo.it/cx20/yKZ8
// forked from cx20's "EaselJS テスト" http://jsdo.it/cx20/oxOS
var X_MAX = 440;
var Y_MAX = 440;
var DOT_SIZE = (window.innerHeight/18); // 20;
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

function getGradientColor( c, pattern )
{
    var result = "";
    var rgb = getRgbColor( c );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );
    var a = 0;
    
    switch ( pattern )
    {
        case 1:
            // rgba(255, 255, 255, 1)
            r = 255;
            g = 255;
            b = 255;
            a = 1;
            break;
        case 2:
            r += 85;
            g += 85;
            b += 85;
            // rgba(255, 85, 85, 1)
            a = 1;
            break;
        case 3:
            // rgba(128, 0, 0, 1)
            a = 1;
            break;
        case 4:
            // rgba(128, 0, 0, 0)
            a = 0;
            break;
    }
    result = "rgba( " + r + ", " + g + ", " + b + ", " + a + ")";
    //console.log( result );
    return result;
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
    
    setInterval( draw, 200 );
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
        x = X_START_POS + ( (i + pos ) % 16 ) * DOT_SIZE;
        y = Y_START_POS + Math.floor( i / 16 ) * DOT_SIZE;
        c = dataSet[i];
        
        var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0,    getGradientColor(c, 1));
        gradient.addColorStop(0.2,  getGradientColor(c, 2));
        gradient.addColorStop(0.95, getGradientColor(c, 3));
        gradient.addColorStop(1,    getGradientColor(c, 4));
        ctx.fillStyle = gradient;
        ctx.fillRect(x - radius, y - radius, x + radius, y + radius);
    }
    pos++;
}
