// forked from cx20's "obelisk.js で描いたドット絵を動かしてみるテスト" http://jsdo.it/cx20/20aM
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
var dataSet = [];
var pixelTweet = "";
var animationID = 0;

function getRgbColor( c )
{
	var colorHash = {
		"無":0xffffff,
		"黒":0x222222,
		"灰":0x666666,
		"白":0xbbbbbb
	};
	return colorHash[ c ];
}

// データ形式変換関数
function convertPixelTweetToDataSet( pixelTweet ) {
	var result = [];
	var hash = {
		"0":"無",
		"1":"黒",
		"2":"灰",
		"3":"白"
	};
	// ＜変換前＞
	// 000000000000000000
	// 000000000000003330
	// 000000011111003330
	// 000000111111111330
	// 000000222332302220
	// 000002323332332220
	// 000002322333233320
	// 000002233322222200
	// 000000033333332000
	// 000222221222120000
	// 002222222122210020
	// 033222222111110020
	// 033301121131131220
	// 003021111111111220
	// 000222111111111220
	// 002221111111100000
	// 002001111000000000
	// 000000000000000000
	// 
	// ＜変換後＞
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","白","白","白","無",
	// "無","無","無","無","無","無","無","黒","黒","黒","黒","黒","無","無","白","白","白","無",
	// "無","無","無","無","無","無","黒","黒","黒","黒","黒","黒","黒","黒","黒","白","白","無",
	// "無","無","無","無","無","無","灰","灰","灰","白","白","灰","白","無","灰","灰","灰","無",
	// "無","無","無","無","無","灰","白","灰","白","白","白","灰","白","白","灰","灰","灰","無",
	// "無","無","無","無","無","灰","白","灰","灰","白","白","白","灰","白","白","白","灰","無",
	// "無","無","無","無","無","灰","灰","白","白","白","灰","灰","灰","灰","灰","灰","無","無",
	// "無","無","無","無","無","無","無","白","白","白","白","白","白","白","灰","無","無","無",
	// "無","無","無","灰","灰","灰","灰","灰","黒","灰","灰","灰","黒","灰","無","無","無","無",
	// "無","無","灰","灰","灰","灰","灰","灰","灰","黒","灰","灰","灰","黒","無","無","灰","無",
	// "無","白","白","灰","灰","灰","灰","灰","灰","黒","黒","黒","黒","黒","無","無","灰","無",
	// "無","白","白","白","無","黒","黒","灰","黒","黒","白","黒","黒","白","黒","灰","灰","無",
	// "無","無","白","無","灰","黒","黒","黒","黒","黒","黒","黒","黒","黒","黒","灰","灰","無",
	// "無","無","無","灰","灰","灰","黒","黒","黒","黒","黒","黒","黒","黒","黒","灰","灰","無",
	// "無","無","灰","灰","灰","黒","黒","黒","黒","黒","黒","黒","黒","無","無","無","無","無",
	// "無","無","灰","無","無","黒","黒","黒","黒","無","無","無","無","無","無","無","無","無",
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
	//
	for ( var i = 0; i < pixelTweet.length; i++ ) {
		var x = i % 18;
		var y = Math.floor( i / 18 );
		if ( x > 0 && x < 17 && y > 0 && y < 17 ) {
			var c = pixelTweet[i];
			result.push(hash[c]);
		}
	}
	return result;
}

var canvasFloor, pixelViewFloor;
var canvas, pixelView;
var con;
var colors = [];

function init() {
    // 0 point in 2d canvas
    var point = new obelisk.Point(230, 120);
    
    // build floor
    canvasFloor = document.getElementById('canvas-floor');
    pixelViewFloor = new obelisk.PixelView(canvasFloor, point);
    var brickDimension = new obelisk.BrickDimension(16, 16);
    var brick = new obelisk.Brick(brickDimension);
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 16; j++) {
            var p3D = new obelisk.Point3D(i * DOT_SIZE, j * DOT_SIZE, 0);
            pixelViewFloor.renderObject(brick, p3D);
        }
    }

    // build cube
    canvas = document.getElementById('canvas-demo');
    pixelView = new obelisk.PixelView(canvas, point);

}

function buildCube(xDimension, yDimension, zDimension, color, border) {
    var dimension = new obelisk.CubeDimension(xDimension, yDimension, zDimension);
    var cube = new obelisk.Cube(dimension, color, border);
    pixelView.clear();
    pixelView.renderObject(cube);
}

function buildCubeWithPos(xDimension, yDimension, zDimension, x, y, z, color, border) {
    var dimension = new obelisk.CubeDimension(xDimension, yDimension, zDimension);
    var cube = new obelisk.Cube(dimension, color, border);
    var p3D = new obelisk.Point3D(x, y, z);
    pixelView.renderObject(cube, p3D);
}

// control bar
var ControlBar = function () {
    this.xDimension = DOT_SIZE;
    this.yDimension = DOT_SIZE;
    this.zDimension = DOT_SIZE;
    this.border = true;
};

document.body.addEventListener('paste', function (e) {
    // 貼り付け直後の場合、テキストボックスが空のケースがある為、少し時間をおいて読み込ませる
    setTimeout( delayload, 100 );
}, false);


function toggleButton() {
    var button = document.getElementById("toggle");
    var pixelData = document.getElementById("pixelData");

    if (button.textContent == "show") {

        pixelData.style.display = "block";
        button.textContent = "hide";

    } else if (button.textContent == "hide") {

        pixelData.style.display = "none";
        button.textContent = "show";

    }
}

function clearData() {
	document.getElementById("pixelData").value = "";
}

function showSample() {
    // サンプルデータ設定
	document.getElementById("pixelData").value = "000000000000000000000000000000003330000000011111003330000000111111111330000000222332302220000002323332332220000002322333233320000002233322222200000000033333332000000222221222120000002222222122210020033222222111110020033301121131131220003021111111111220000222111111111220002221111111100000002001111000000000000000000000000000";
	delayload();
}

function delayload() {
    // データ形式変換
    pixelTweet = document.getElementById("pixelData").value;
    dataSet = convertPixelTweetToDataSet( pixelTweet );
    
    stop();
    initData();
    loop();
}

function initData() {
    con = new ControlBar();
    colors = [];
    for ( i = 0; i < dataSet.length; i++) {
        var color = new obelisk.CubeColor().getByHorizontalColor( getRgbColor(dataSet[i]) );
        colors.push( color );
    }
}

function clearCanvas() {
    pixelView.clear();
}

var pos = 0;
function draw() {
    var x, y, z;
    for ( i = 0; i < dataSet.length; i++) {
        if (dataSet[i] != "無") {
            //x = i % 16 * DOT_SIZE;
            x = (i + pos) % 16 * DOT_SIZE;
            y = Math.floor(i / 16) * DOT_SIZE;
            z = 0;
            
            var color = colors[i];
            // build first one
            buildCubeWithPos(16, 16, 16, x, y, z, color, con.border);
            
        }
    }
    pos++;
}

function loop() {
    clearCanvas();
    draw();
    animationID = requestAnimationFrame(loop);
}

function stop() {
    cancelAnimationFrame(animationID);
}

init();
