// forked from cx20's "Canvas でベクターフォントを使って文字を描いてみるテスト" http://jsdo.it/cx20/qAMm
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

var ctx;
var X_MAX = 465;
var Y_MAX = 465;
var CENTER_X = X_MAX / 2;
var CENTER_Y = Y_MAX / 2;

function init()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    setInterval(draw, 300);
}

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
	for ( var i = 0; i < hershey.length; i += 2) {
		var xChar = hershey[i+0];
		var yChar = hershey[i+1];
		var x = xChar.charCodeAt(0) - R + 15;
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

function convertHersheyToSimplexFontTable(hersheyFontArray, codeTable) {
	var fontTable = [];
	for ( key in codeTable ) {
		var simplex = convertHersheyToSimplex(hersheyFontArray[codeTable[key]][1]);
		fontTable[key] = simplex;
	}
	return fontTable;
}

//var simplexFontArray = convertHersheyToSimplexFontArray(hersheyFontArray);
//var simplexFontArray = convertHersheyToSimplexFontArray(japaneseFontArray);
var simplexFontTable = convertHersheyToSimplexFontTable(japaneseFontArray, japaneseKanjiTable);

var pos = 0;
var message = "本日は晴天なり　";
function draw(){
	clearScreen();
	//var dataSet = simplexFontArray[Math.floor(Math.random() * simplexFontArray.length)];
	var dataSet = simplexFontTable[message[pos]];
	pos++;
	if ( pos >= message.length ) {
		pos =0;
	}
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
