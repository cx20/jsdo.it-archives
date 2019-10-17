// forked from joshuha's "Draw Hex grid" http://pastebin.com/CtCpZh1e

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
var r = 10;
var part = 60;

function drawHexGrid() {
    canvas = document.getElementById("c");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var grid_size_x = r * Math.sqrt(3);
    var grid_size_y = r * Math.sqrt(2.25);
    
    var hexes_x = 25;
    var hexes_y = 30;

    var i;
    var color = "#000000";
    var offset_x;
    for ( grid_y = 0; grid_y < hexes_y; grid_y++ ) {
        for ( grid_x = 0; grid_x < hexes_x; grid_x++ ) {
            if (grid_y % 2 === 0) {
                offset_x = grid_size_x/2;
            } else {
                offset_x = 0;
            }
            
            // ドット絵表示位置判定
            if ( grid_x >= 5 && grid_x <= 20 && grid_y >= 5 && grid_y <= 20 ) {
                i = (grid_y - 5 ) * 16 + (grid_x - 5);
                color = getRgbColor(dataSet[i]);
            } else {
                color = "#000000";
            }
            
            drawHexagon( grid_x, grid_y, grid_size_x, grid_size_y, offset_x, color);
        }
    }
}


function drawHexagon( grid_x, grid_y, grid_size_x, grid_size_y, offset_x, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    var i, x, y;
    var bFirst = true;
    for ( i = 0; i <= 6; i++) {
        var a = i * part - 90;
        x = 16 + r * Math.cos(a * Math.PI / 180)+ grid_x * grid_size_x + offset_x;
        y = 16 + r * Math.sin(a * Math.PI / 180)+ grid_y * grid_size_y;
        if (bFirst) {
            ctx.moveTo(x,y);
            bFirst = false;
        } else {
            ctx.lineTo(x,y);
        }
    }
    ctx.fill();
}

drawHexGrid();
