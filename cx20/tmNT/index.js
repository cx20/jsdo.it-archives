// forked from cx20's "hull.js を試してみるテスト" http://jsdo.it/cx20/fl8C

var DOT_SIZE = 16;
var X_START_POS = 100;
var Y_START_POS = 100;

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

var gui;
var canvas;
var ctx;
var center_x = 465 / 2;
var center_y = 465 / 2;
var concavity = 20;
window.onload = function() {
    canvas = document.getElementById('c');
    ctx = canvas.getContext('2d');
    draw();

    gui = new dat.GUI();
    gui.add(window, 'concavity', 10, 100).onChange(function(v) {
        draw();
    });
}

function calcDistance(x1, y1, x2, y2) {
    var a, b, d;

    a = x1 - x2;
    b = y1 - y2;
    d = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    return d;
}

function getRndColor() {
    var r = 255 * Math.random() | 0,
        g = 255 * Math.random() | 0,
        b = 255 * Math.random() | 0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function draw() {
    var pointset = [];
    ctx.clearRect(0, 0, 465, 465);

    // draw all pixels
    //ctx.fillStyle = "black";
    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * DOT_SIZE + X_START_POS;
        var y = Math.floor( i / 16 ) * DOT_SIZE + Y_START_POS;
        if ( dataSet[i] != "無" ) {
            pointset.push([x, y]);
            ctx.beginPath();
            ctx.fillStyle = getRgbColor( dataSet[i] );
            ctx.arc(x, y, DOT_SIZE/2*0.9, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.closePath();
        }
    }

    var pts = hull(pointset, concavity);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.beginPath();
    pts.forEach(function(px) {
        ctx.lineTo(px[0], px[1]);
        ctx.moveTo(px[0], px[1]);
    });
    ctx.stroke();
    ctx.closePath();
}