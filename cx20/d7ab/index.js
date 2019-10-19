// forked from _ishibashijun's "手書き図形" http://jsdo.it/_ishibashijun/o8uG
var ctx;
var X_MAX = 465;
var Y_MAX = 465;
var CENTER_X = X_MAX / 2;
var CENTER_Y = Y_MAX / 2;

function ftline( ctx, x1, y1, x2, y2 ) {
    ctx.beginPath();
    ctx.moveTo( x1 + ( Math.random() * 5 - 2 ), y1 + ( Math.random() * 5 - 2 ) );
    ctx.bezierCurveTo( x1 + ( x2 - x1 ) / 3 + ( Math.random() * 5 - 2 ),
                       y1 + ( y2 - y1 ) / 3 + ( Math.random() * 5 - 2 ),
                       x1 + 2 * ( x2 - x1 ) / 3 + ( Math.random() * 5 - 2 ),
                       y1 + 2 * ( y2 - y1 ) / 3 + ( Math.random() * 5 - 2 ),
                       x2 + ( Math.random() * 5 - 2 ),
                       y2 + ( Math.random() * 5 - 2 ) );
    ctx.closePath();
    ctx.stroke();
}

function ftrect( ctx, x, y, w, h ) {
    ftline( ctx, x, y, x, y + h );
    ftline( ctx, x, y, x + w, y );
    ftline( ctx, x + w, y, x + w, y + h );
    ftline( ctx, x, y + h, x + w, y + h );
}

var FreeHandCanvas = function( width, height) {
    this._width = width;
    this._height = height;
    this._currentX = 0;
    this._currentY = 0;
    this._canvas = document.getElementById("c");
    this._canvas.width = width;
    this._canvas.height = height;
    this._ctx = this._canvas.getContext("2d");
};

FreeHandCanvas.prototype = {
    moveTo: function( x1, y1 ) {
        this._currentX = Math.floor(x1);
        this._currentY = Math.floor(y1);
    },
    lineTo: function( x1, y1 ) {
        ftline( this._ctx, this._currentX, this._currentY, x1, y1 );
        x1 = Math.floor( x1 );
        y1 = Math.floor( y1 );
        this.moveTo( x1, y1 );
    },
    rect: function( x1, y1, x2, y2 ) {
        ftrect( this._ctx, x1, y1, x2, y2 );
    },
    fillRect: function( x1, y1, x2, y2 ) {
        this._ctx.fillRect( x1, y1, x2, y2 );
    },
    fillStyle: function( style ) {
        this._ctx.fillStyle = style;
    }
};

var g_points = [
    {x: 50, y: 50, z: 50}, // g_points[0]
    {x: 50, y:-50, z: 50}, // g_points[1]
    {x:-50, y:-50, z: 50}, // g_points[2]
    {x:-50, y: 50, z: 50}, // g_points[3]
    {x: 50, y: 50, z:-50}, // g_points[4]
    {x: 50, y:-50, z:-50}, // g_points[5]
    {x:-50, y:-50, z:-50}, // g_points[6]
    {x:-50, y: 50, z:-50}  // g_points[7]
  ];

var g_vp = 500;
var g_rad_x = 0;
var g_rad_y = 0;
var g_rad_z = 0;

function onload() {
    g_rad_x = Math.PI * 6 / 180;
    g_rad_y = Math.PI * 6 / 180;
    g_rad_x = Math.PI * 6 / 180;

    //canvas = document.getElementById("c");
    //ctx = canvas.getContext("2d");
    ctx = new FreeHandCanvas( X_MAX, Y_MAX );
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
    ctx.fillStyle( "#ffffff" );
    ctx.fillRect( 0, 0, X_MAX, Y_MAX );
}

window.addEventListener( "load", onload, false );