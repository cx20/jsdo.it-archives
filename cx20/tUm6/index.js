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
var X_MAX = 60;
var Y_MAX = 60;
var CENTER_X = X_MAX / 2;
var CENTER_Y = Y_MAX / 2;

var TableCanvas = function (width, height) {
    this._width = width;
    this._height = height;
    this._currentX = 0;
    this._currentY = 0;
    this._screenData = {};

    var table = document.createElement("table");
    table.style.border = 1;
    var i = 0;
    for (var r = 0; r < Y_MAX; r++) {
        var row = table.insertRow(r);
        for (var c = 0; c < X_MAX; c++) {
            var cell = row.insertCell(c);
            var txt = "";
            cell.textContent = txt;
          if ( txt == "x" ) {
              cell.className = "緑";
              cell.textContent = txt;
          } else {
              cell.className = "";
              cell.textContent = "";
          }
        }
    }

    var canvas = document.getElementById("canvas");
    canvas.appendChild(table);
};

TableCanvas.prototype = {
    getText: function (x, y) {
        //		return this._screenData[y][x].nodeValue;
        var canvas = document.getElementById("canvas");
        var table = canvas.firstChild;
        var cell = table.rows[y].cells[x];
        return cell.textContent;
    },
    setText: function (x, y, txt) {
        if ( x < 0 ) { x = 0; }
        if ( y < 0 ) { y = 0; }
        var canvas = document.getElementById("canvas");
        var table = canvas.firstChild;
        var cell = table.rows[y].cells[x];
        if ( txt == "x" ) {
            cell.className = "緑";
            cell.textContent = txt;
        } else {
            cell.className = "";
            cell.textContent = "";
        }
    },
    moveTo: function (x1, y1) {
        this._currentX = Math.floor(x1);
        this._currentY = Math.floor(y1);
    },
	lineTo: function( x1, y1 ) {
		x1 = Math.floor( x1 );
		y1 = Math.floor( y1 );
		var x0 = Math.floor(this._currentX);
		var y0 = Math.floor(this._currentY);
		var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
		var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
		var err = (dx>dy ? dx : -dy)/2;

		while (true) {
			this.setText( x0, y0, "x");
			if (x0 === x1 && y0 === y1) break;
			var e2 = err;
			if (e2 > -dx) { err -= dy; x0 += sx; }
			if (e2 < dy) { err += dx; y0 += sy; }
		}
		this.moveTo( x1, y1 );
	},
    fillRect: function (x1, y1, x2, y2) {
        for (var x = x1; x < x2; x++) {
            for (var y = y1; y < y2; y++) {
                this.setText(x, y, ".");
            }
        }
    }
};

function init()
{
//    canvas = document.getElementById("canvas");
//    ctx = canvas.getContext("2d");
//    ctx = new TextCanvas( X_MAX, Y_MAX );
    ctx = new TableCanvas( X_MAX, Y_MAX );
    clearScreen();

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

var simplexFontArray = convertHersheyToSimplexFontArray(hersheyFontArray);

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
	var x0 = -1;
    var y0 = -1;
	for ( var i = 2; i < dataSet.length; i += 2 ) {
		var x = dataSet[i];
		var y = dataSet[i+1];
		if ( x >= 0 && y >= 0 ) {
			if ( x0 == -1 && y0 == -1 ) {
				ctx.moveTo(x, 32-y);
			} else {
				ctx.lineTo(x, 32-y);
			}
		}
		x0 = x;
		y0 = y;
	}
}


function clearScreen() {
//    ctx.fillStyle = "rgb( 0, 0, 0 )";
    ctx.fillRect( 0, 0, X_MAX, Y_MAX );
}

init();
