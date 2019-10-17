// forked from cx20's "ドット絵を LED っぽく表示するテスト（その２）" http://jsdo.it/cx20/8tfT
// forked from cx20's "ドット絵を LED っぽく表示するテスト（その１）" http://jsdo.it/cx20/9owu
// forked from cx20's "forked: EaselJS テスト" http://jsdo.it/cx20/yKZ8
// forked from cx20's "EaselJS テスト" http://jsdo.it/cx20/oxOS

var X_MAX = 465;
var Y_MAX = 465;
var DOT_SIZE = 8;
var SMALL_WIDTH = 151;
var SMALL_HEIGHT = 52;

function getGradientColor( r, g, b, a, pattern )
{
    var result = "";
    
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
var radius = (DOT_SIZE / 2) - 1;
var pos = 0;

init();

var imageData;
function init() {	
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    var canvas_small = document.getElementById('canvas_small');
    var ctx_small = canvas_small.getContext('2d');
    var img = new Image();
    img.onload = function() {
        ctx_small.drawImage(img, 0, 0);
        imageData = ctx_small.getImageData(0, 0, SMALL_WIDTH, SMALL_HEIGHT);
        //animate();
        setInterval(render, 150);
    };
    img.src = "../../assets/0/n/L/y/0nLyP.png";  // side_small.png
}

init();

function render() {
    drawScreen();
    drawData();
}

function drawScreen() {
    ctx.clearRect( 0, 0, X_MAX, Y_MAX );
}

function drawData() {
    var i, x, y;
    var c;
    var color;
    pos %= SMALL_WIDTH;
    for ( var y = 0; y < SMALL_HEIGHT; y++ ) {
        for ( var x = 0; x < SMALL_HEIGHT * 1.1; x++ ) {
            var i = (y * SMALL_WIDTH + x + pos) * 4;
            if ( i >= imageData.data.length ) {
                i -= imageData.data.length;
            }
            var r = imageData.data[i + 0];
            var g = imageData.data[i + 1];
            var b = imageData.data[i + 2];
            var a = imageData.data[i + 3];
            var x2 = x * DOT_SIZE;
            var y2 = y * DOT_SIZE;
            var gradient = ctx.createRadialGradient(x2, y2, 0, x2, y2, radius);
            gradient.addColorStop(0,    getGradientColor(r, g, b, a, 1));
            gradient.addColorStop(0.2,  getGradientColor(r, g, b, a, 2));
            gradient.addColorStop(0.95, getGradientColor(r, g, b, a, 3));
            gradient.addColorStop(1,    getGradientColor(r, g, b, a, 4));
            ctx.fillStyle = gradient;
            ctx.fillRect(x2 - radius, y2 - radius, x2 + radius, y2 + radius);
        }
    }
    pos++;
}
