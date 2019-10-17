// forked from cx20's "forked: EaselJS テスト" http://jsdo.it/cx20/yKZ8
// forked from cx20's "EaselJS テスト" http://jsdo.it/cx20/oxOS
var DOT_SIZE = 20;
var X_START_POS = 50;
var Y_START_POS = 50;
var X_MAX = 440;
var Y_MAX = 440;

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
/*
    // 通常の色
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
*/
/*
    // 濃いめ
    var colorHash = {
		"無":"#000000",
		"白":"#777777",
		"肌":"#776666",
		"茶":"#400000",
		"赤":"#770000",
		"黄":"#777700",
		"緑":"#007700",
		"水":"#007777",
		"青":"#000077",
		"紫":"#400040"
	};
*/
    
    // 薄め
    var colorHash = {
		"無":"#dddddd",
		"白":"#ffffff",
		"肌":"#ddcccc",
		"茶":"#806666",
		"赤":"#cc7777",
		"黄":"#dddd55",
		"緑":"#00dd00",
		"水":"#00dddd",
		"青":"#7777cc",
		"紫":"#800080"
	};

    return colorHash[ c ];
}

function getRandColor( color ) {
    var rgb = color.replace("#", "" );
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );
    var r2 = parseInt( r + Math.random() * 20, 10 );
    var g2 = parseInt( g + Math.random() * 20, 10 );
    var b2 = parseInt( b + Math.random() * 20, 10 );
//    console.log( "rgb(" + r2 + "," + g2 + "," + b2 + ")" );
    return "rgb(" + r2 + "," + g2 + "," + b2 + ")";
}

var stage;
var dots = [];
init();

function init() {
    var canvasObject = document.getElementById('myCanvas');
    stage = new createjs.Stage(canvasObject);

    var i, x, y;
    var color;
	for ( i = 0; i < dataSet.length; i++ ) {
       dots[i] = createDot( i, x, y );
	}

	//50fpsでtick関数を呼び出す設定 
	createjs.Ticker.addListener(window); 
	createjs.Ticker.setFPS(50); 
}

function tick(){ 
     for (var i = 0; i < dots.length; i++){ 
         var dot = dots[i]; 
         dot.x += dot.vx; 
         dot.y += dot.vy; 
         if (dot.x < -DOT_SIZE) dot.x = X_MAX; 
         else if (dot.x > X_MAX) dot.x = -DOT_SIZE; 
         if (dot.y < -DOT_SIZE) dot.y = Y_MAX; 
         else if(dot.y > Y_MAX) dot.y = -DOT_SIZE; 
    } 
    stage.update();
}

function createDot( i, x, y ) {
    var dot = new createjs.Shape();
    
    x = ( i % 16 ) * DOT_SIZE;
    y = Math.floor( i / 16 ) * DOT_SIZE;
//    console.log( x + "," + y );
    color = getRgbColor(dataSet[i]);
    dot.graphics.beginFill(color);
    dot.graphics.beginFill("#777777");
    dot.graphics.drawRoundRect(0-2, 0-2, DOT_SIZE-4, DOT_SIZE-4, 3);
    dot.graphics.beginFill(getRandColor( color ) );
    dot.graphics.drawRoundRect(0, 0, DOT_SIZE-4, DOT_SIZE-4, 3);

    dot.x = X_START_POS + x;
    dot.y = Y_START_POS + y;
    dot.vx = Math.random()*2-1;
    dot.vy = Math.random()*2-1;

    stage.addChild(dot);
    return dot;
}
