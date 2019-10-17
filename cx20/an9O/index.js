// forked from norahiko's "シンプルな実装のボロノイ図" http://jsdo.it/norahiko/zS12

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
        "無":[0x00, 0x00, 0x00],
        "白":[0xff, 0xff, 0xff],
        "肌":[0xff, 0xcc, 0xcc],
        "茶":[0x80, 0x00, 0x00],
        "赤":[0xff, 0x00, 0x00],
        "黄":[0xff, 0xff, 0x00],
        "緑":[0x00, 0xff, 0x00],
        "水":[0x00, 0xff, 0xff],
        "青":[0x00, 0x00, 0xff],
        "紫":[0x80, 0x00, 0x80]
    };
    return colorHash[ c ];
}

var width = 465;
var height = 465;
var pointNum = 256;

var canvas = document.querySelector("canvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, width, height);
var imageData = ctx.getImageData(0, 0, width, height);
var pixels = imageData.data;
var points = [];


init();
loop();

function init() {
    for(var i = 0; i < pointNum; i++) {
        points.push(new Point());
    }   
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function Point() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    var x1 = Math.floor(this.x / width * 16);
    var y1 = Math.floor(this.y / height * 16);
    var pos = x1 + y1 * 16;
    if ( dataSet[pos] != "無" ) {
        var c = getRgbColor(dataSet[pos]);
        this.color = [ c[0], c[1], c[2] ];
    } else {
        this.color = [
            Math.random() * 256 | 0,
            Math.random() * 256 | 0,
            Math.random() * 256 | 0,
        ];
    }
}

function update() {
    for(var i = 0; i < points.length; i++) {
        var point = points[i];
        if(point.x < 0 || width <= point.x) {
            point.speedX = -point.speedX;
        } else if(point.y < 0 || height <= point.y) {
            point.speedY = -point.speedY;
        }

        point.x += point.speedX;
        point.y += point.speedY;
    }
}

function draw() {
    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            var point = getNearestPoint(x, y);
            drawPixel(x, y, point);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function drawPixel(x, y, point) {
    var pos = (x + y * width) * 4;
    pixels[pos] = point.color[0];
    pixels[pos + 1] = point.color[1];
    pixels[pos + 2] = point.color[2];
}

function getNearestPoint(x, y) {
    var neaest;
    var distance = Infinity;
    for(var i = 0; i < points.length; i++) {
        var point = points[i];
        var dx = point.x - x;
        var dy = point.y - y;
        var d = dx * dx + dy * dy;
        if(d < distance) {
            distance = d;
            neaest = point;
        }
    }
    return neaest;
}