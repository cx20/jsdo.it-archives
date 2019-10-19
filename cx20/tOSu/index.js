// forked from cx20's "obelisk.jsで3Dを表現してみるテスト" http://jsdo.it/cx20/qC6w
// forked from cx20's "HTML TABLEで3Dを表現してみるテスト" http://jsdo.it/cx20/uyu3
// forked from cx20's "ASCII文字で3Dを表現してみるテスト" http://jsdo.it/cx20/tQVQ
// forked from cx20's "forked: はじめてのCube" http://jsdo.it/cx20/jahK
// forked from xlune's "はじめてのCube" http://jsdo.it/xlune/cube

// forked from cx20's "forked: HTML TABLE でドット絵を描くテスト" http://jsdo.it/cx20/mKpp
// forked from cx20's "HTML TABLE でドット絵を描くテスト" http://jsdo.it/cx20/wD9k

var ctx;
var DOT_SIZE = 16;
var X_MAX = 22;
var Y_MAX = 22;
var CENTER_X = X_MAX / 2;
var CENTER_Y = Y_MAX / 2;

var ObeliskCanvas = function( width, height) {
    this._width = width;
    this._height = height;
    this._currentX = 0;
    this._currentY = 0;
    this._screenData = {};

    // 0 point in 2d canvas
    var point = new obelisk.Point(230, 120);
    
    // build floor
    var canvasFloor = document.getElementById('canvas-floor');
    var pixelViewFloor = new obelisk.PixelView(canvasFloor, point);
    var brickDimension = new obelisk.BrickDimension(this._width, this._height);
    var brick = new obelisk.Brick(brickDimension);
    for (var y = 0; y < this._width; y++) {
        this._screenData[y] = {};
        for (var x = 0; x < this._width; x++) {
            var p3D = new obelisk.Point3D(x * DOT_SIZE, y * DOT_SIZE, 0);
            pixelViewFloor.renderObject(brick, p3D);
            this._screenData[y][x] = "";
        }
    }
    // build cube
    this._canvas = document.getElementById('canvas-demo');
    this._pixelView = new obelisk.PixelView(this._canvas, point);
};

ObeliskCanvas.prototype = {

    buildCube: function(xDimension, yDimension, zDimension, color, border) {
        var dimension = new obelisk.CubeDimension(xDimension, yDimension, zDimension);
        var cube = new obelisk.Cube(dimension, color, border);
        this._pixelView.clear();
        this._pixelView.renderObject(cube);
    },
    buildCubeWithPos: function(xDimension, yDimension, zDimension, x, y, z, color, border) {
        var dimension = new obelisk.CubeDimension(xDimension, yDimension, zDimension);
        var cube = new obelisk.Cube(dimension, color, border);
        var p3D = new obelisk.Point3D(x, y, z);
        this._pixelView.renderObject(cube, p3D);
    },
    // control bar
    ControlBar: function () {
        this.xDimension = DOT_SIZE;
        this.yDimension = DOT_SIZE;
        this.zDimension = DOT_SIZE;
        this.border = true;
    },
    getText: function(x, y) {
        return this._screenData[y][x];
    },
    setText: function(x, y, txt) {
        this._screenData[y][x] = txt;
        var x1, y1, z1;
        x1 = x * DOT_SIZE;
        y1 = y * DOT_SIZE;
        z1 = 0;
        var color = new obelisk.CubeColor().getByHorizontalColor( 0x00ff00 );
        var con = new this.ControlBar();
        this.buildCubeWithPos(DOT_SIZE, DOT_SIZE, DOT_SIZE, x1, y1, z1, color, con.border);
    },
    moveTo: function( x1, y1 ) {
        this._currentX = Math.floor(x1);
        this._currentY = Math.floor(y1);
    },
/*
    lineTo: function( x1, y1 ) {
        x1 = Math.floor( x1 );
        y1 = Math.floor( y1 );
        // 描画の開始位置 (x0, y0) と終点 (x1, y1) の情報を元に
        // １次関数「y = a * x + b」の傾き「a」ならびに切片「b」を求める
        var x_diff = x1 - this._currentX;    // x の増加量
        var y_diff = y1 - this._currentY;    // y の増加量
        var a;
        if ( x_diff !== 0 ) {
            a = y_diff / x_diff;    // 傾き a = y の増加量 / x の増加量
        } else {
            a = 0;    // #DIV/0 対策
        }
        var b = this._currentY - a * this._currentX;    // 切片 b = y - a * x
        var x, y;
        if ( a === 0 ) {
            // x の増加量が= 0 の場合
            if ( x_diff === 0 ) {
                if ( y1 > this._currentY ) {
                    for ( y = this._currentY; y < y1; y++ ) {
                        this.setText( x1, y, "x");
                    }
                } else {
                    for ( y = this._currentY; y > y1; y-- ) {
                        this.setText( x1, y, "x");
                    }
                }
            }
            // y 軸の増加量が 0 の場合
            else if ( y_diff === 0 ) {
                if ( x1 > this._currentX ) {
                    for ( x = this._currentX; x < x1; x++ ) {
                        this.setText( x, y1, "x");
                    }
                } else {
                    for ( x = this._currentX; x > x1; x-- ) {
                        this.setText( x, y1, "x");
                    }
                }
            }
        } else {
            // １次関数「y = a * x + b」に従って、座標を算出
            if ( x1 > this._currentX ) {
                for ( x = this._currentX; x < x1; x++ ) {
                    y = Math.floor( a * x + b );
                    this.setText( x, y, "x");
                }
            } else {
                for ( x = this._currentX; x > x1; x-- ) {
                    y = Math.floor( a * x + b );
                    this.setText( x, y, "x");
                }
            }
        }
        this.moveTo( x1, y1 );
    },
*/
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
    fillRect: function( x1, y1, x2, y2 ) {
/*
        for ( var x = x1; x < x2; x++ ) {
            for ( var y = y1; y < y2; y++ ) {
                this.setText( x, y, "." );
            } 
        }
*/
        this._pixelView.clear();
    }
};

/*  
            5 y 
            ^  -5 
            | / z
            |/       x
 -5 -----------------> +5
          / |
      +5 /  |
           -5

        [7]------[4]
       / |      / |
     [3]------[0] |
      |  |     |  |
      | [6]----|-[5]
      |/       |/
     [2]------[1]

*/

var g_points = [
    {x: 5, y: 5, z: 5}, // g_points[0]
    {x: 5, y:-5, z: 5}, // g_points[1]
    {x:-5, y:-5, z: 5}, // g_points[2]
    {x:-5, y: 5, z: 5}, // g_points[3]
    {x: 5, y: 5, z:-5}, // g_points[4]
    {x: 5, y:-5, z:-5}, // g_points[5]
    {x:-5, y:-5, z:-5}, // g_points[6]
    {x:-5, y: 5, z:-5}  // g_points[7]
  ];

var g_vp = 500;
var g_rad_x = 0;
var g_rad_y = 0;
var g_rad_z = 0;

function init()
{
    g_rad_x = Math.PI * 6 / 180;
    g_rad_y = Math.PI * 6 / 180;
    g_rad_x = Math.PI * 6 / 180;

//    canvas = document.getElementById("canvas");
//    ctx = canvas.getContext("2d");
//    ctx = new TextCanvas( X_MAX, Y_MAX );
    ctx = new ObeliskCanvas( X_MAX, Y_MAX );
    clearScreen();

    setInterval(draw, 100);
}

function draw(){
    var p;
    var p2 = [];
    var i, s;
    var x1, y1, z1;
    var x2, y2, z2;
    var x3, y3, z3;
    for(i = 0; i < g_points.length; i++ ) {
        p = g_points[i];

        // 以下コメントは「C言語によるはじめてのアルゴリズム入門」の解説より抜粋
        //
        // ■ Amazon.co.jp： C言語によるはじめてのアルゴリズム入門: 河西 朝雄: 本
        // http://www.amazon.co.jp/dp/4874085008
        // 
        // 8.4 ３次元座標変換
        // 
        
        // y軸周りにβ角回転する
        // x1 = x * cos(β) + z * sin(β)
        // y1 = y
        // z1 = -x * sin(β) + z * cos(β)
        x1 = p.x * Math.cos(g_rad_y) + p.z * Math.sin(g_rad_y);
        y1 = p.y;
        z1 = -p.x * Math.sin(g_rad_y) + p.z * Math.cos(g_rad_y);
        
        // x軸周りにα角回転する
        // x2 = x1
        // y2 = y1 * cos(α) - z1 * sin(α)
        // z2 = y1 * sin(α) + z1 * cos(α)
        x2 = x1;
        y2 = y1 * Math.cos(g_rad_x) - z1 * Math.sin(g_rad_x);
        z2 = y1 * Math.sin(g_rad_x) + z1 * Math.cos(g_rad_x);
        
        // z軸周りにγ角回転する
        // x2 = x2 * cos(γ) - y2 * sin(γ)
        // y2 = x2 * sin(γ) + y2 * cos(γ)
        // z2 = z2
        x3 = x2 * Math.cos(g_rad_z) - y2 * Math.sin(g_rad_z);
        y3 = x2 * Math.sin(g_rad_z) + y2 * Math.cos(g_rad_z);
        z3 = z2;
        
        // 計算結果を戻す
        p.x = x3;
        p.y = y3;
        p.z = z3;
        
        // 上記の回転で得られた座標を z = 0 平面に平行投影する
        // （x3, y3, z3 のうち、z3 を無視することが z = 0 への平行投影を意味する。）
        s = g_vp / (g_vp - p.z);
        p2[i] = { x: p.x * s, y: p.y * s };
    }
    drawCube(p2);
}

function drawCube(p){
    clearScreen();
//    ctx.beginPath();
//    ctx.strokeStyle = "#FFFFFF";
/*
            50 y 
            ^  -50 
            | / z
            |/       x
-50 -----------------> +50
          / |
     +50 /  |
          -50

        [7]------[4]
       / |      / |
     [3]------[0] |
      |  |     |  |
      | [6]----|-[5]
      |/       |/
     [2]------[1]

*/
    ctx.moveTo(p[0].x + CENTER_X, p[0].y + CENTER_Y);
    ctx.lineTo(p[1].x + CENTER_X, p[1].y + CENTER_Y);
    ctx.lineTo(p[2].x + CENTER_X, p[2].y + CENTER_Y);
    ctx.lineTo(p[3].x + CENTER_X, p[3].y + CENTER_Y);
    ctx.lineTo(p[0].x + CENTER_X, p[0].y + CENTER_Y);
    ctx.lineTo(p[4].x + CENTER_X, p[4].y + CENTER_Y);
    ctx.lineTo(p[5].x + CENTER_X, p[5].y + CENTER_Y);
    ctx.lineTo(p[6].x + CENTER_X, p[6].y + CENTER_Y);
    ctx.lineTo(p[7].x + CENTER_X, p[7].y + CENTER_Y);
    ctx.lineTo(p[4].x + CENTER_X, p[4].y + CENTER_Y);
    ctx.moveTo(p[1].x + CENTER_X, p[1].y + CENTER_Y);
    ctx.lineTo(p[5].x + CENTER_X, p[5].y + CENTER_Y);
    ctx.moveTo(p[2].x + CENTER_X, p[2].y + CENTER_Y);
    ctx.lineTo(p[6].x + CENTER_X, p[6].y + CENTER_Y);
    ctx.moveTo(p[3].x + CENTER_X, p[3].y + CENTER_Y);
    ctx.lineTo(p[7].x + CENTER_X, p[7].y + CENTER_Y);
//    ctx.closePath();
//    ctx.stroke();
}

function clearScreen() {
//    ctx.fillStyle = "rgb( 0, 0, 0 )";
    ctx.fillRect( 0, 0, X_MAX, Y_MAX );
}

init();
