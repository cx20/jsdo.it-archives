// forked from cx20's "HTML TABLEで文字を描いてみるテスト（その３）" http://jsdo.it/cx20/prGL
// forked from cx20's "HTML TABLEで文字を描いてみるテスト（その２）" http://jsdo.it/cx20/tUm6
// forked from cx20's "HTML TABLEで文字を描いてみるテスト" http://jsdo.it/cx20/4pZR
// forked from cx20's "HTML TABLEで3Dを表現してみるテスト（改）" http://jsdo.it/cx20/w7S2
// forked from cx20's "HTML TABLEで3Dを表現してみるテスト" http://jsdo.it/cx20/uyu3
// forked from cx20's "ASCII文字で3Dを表現してみるテスト" http://jsdo.it/cx20/tQVQ
// forked from cx20's "forked: はじめてのCube" http://jsdo.it/cx20/jahK
// forked from xlune's "はじめてのCube" http://jsdo.it/xlune/cube

// forked from cx20's "forked: HTML TABLE でドット絵を描くテスト" http://jsdo.it/cx20/mKpp
// forked from cx20's "HTML TABLE でドット絵を描くテスト" http://jsdo.it/cx20/wD9k

var pos = 0;

var ctx;
var X_MAX = 465;
var Y_MAX = 465;
var CENTER_X = X_MAX / 2;
var CENTER_Y = Y_MAX / 2;

function init()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    setInterval(draw, 100);
}

var message = "Hello, World!";
var pos = 0;

function convertHersheyToSimplex(hershey) {
	var simplex = [];
	var R = 82;
	
	// "MWOMOV RUMUV ROQUQ"
	// The left position is 'M' - 'R' = -5
	// The right position is 'W' - 'R' = 5
	// The first coordinate is "OM" = (-3,-5)
	// The second coordinate is "OV" = (-3,4)
	// Raise the pen " R"
	// Move to "UM" = (3,-5)
	// Draw to "UV" = (3,4)
	// Raise the pen " R"
	// Move to "OQ" = (-3,-1)
	// Draw to "UQ" = (3,-1)
	// Drawing this out on a piece of paper will reveal it represents an 'H'.
	//
	var vertex = Math.floor(hershey.length / 2) - 1; // this excludes the left and right position
	var left = hershey[0].charCodeAt(0) - R; // left position
	var right = hershey[1].charCodeAt(0) - R; // right position
	var width = right - left;
	simplex.push( vertex, width );
	for ( var i = 2; i < hershey.length; i += 2) {
		var xChar = hershey[i+0];
		var yChar = hershey[i+1];
		var x = xChar.charCodeAt(0) - R - left; // convert to absolute coordinates from relative coordinates
		var y = 32 - (yChar.charCodeAt(0) - R + 15);
		if ( xChar == " " && yChar == "R" ) {
			x = y = -1;
		}
		simplex.push(x, y);
	}
	return simplex;
}

function convertHersheyToSimplexFontArray(hersheyFontArray) {
	var fontArray = [];
	for ( key in hersheyFontArray ) {
		var simplex = convertHersheyToSimplex(hersheyFontArray[key][1]);
		fontArray.push( simplex );
	}
	return fontArray;
}

//var simplexFontArray = convertHersheyToSimplexFontArray(hersheyFontArray);
var simplexFontArray = convertHersheyToSimplexFontArray(japaneseFontArray);

function draw(){
	clearScreen();
    // message is random character
    var dataSet = simplexFontArray[Math.floor(Math.random() * simplexFontArray.length)];
/*
    // ＜文字「A」のフォントデータの概要＞
    // 配列の最初の 8, 18 は、頂点数ならび文字幅を示し、残りは座標（x,y）を示します。
    // 座標（-1,-1）は、ペンを上げた状態を示します。
    var dataSet = [
      8,18,
      9,21, 1, 0,-1,-1, 9,21,17, 0,-1,-1, 4, 7,14, 7,-1,-1,...
    ];
    // "／" を描く
    ctx.moveTo(9, 21);
    ctx.lineTo(1, 0);
    // "＼" を描く
    ctx.moveTo(9, 21);
    ctx.lineTo(17, 0);
    // "─" を描く
    ctx.moveTo(4, 7);
    ctx.lineTo(14, 7);
*/
	var scale = 10;
	ctx.beginPath();
	ctx.strokeStyle = "rgb(0, 255, 0)";
	var x0 = -1;
    var y0 = -1;
	for ( var i = 2; i < dataSet.length; i += 2 ) {
		var x = dataSet[i];
		var y = dataSet[i+1];
		if ( x >= 0 && y >= 0 ) {
			if ( x0 == -1 && y0 == -1 ) {
				ctx.moveTo(x * scale, (32-y) * scale);
			} else {
				ctx.lineTo(x * scale, (32-y) * scale);
			}
		}
		x0 = x;
		y0 = y;
	}
	ctx.stroke();
}


function clearScreen() {
//    ctx.fillStyle = "rgb( 0, 0, 0 )";
    ctx.fillRect( 0, 0, X_MAX, Y_MAX );
}

init();
