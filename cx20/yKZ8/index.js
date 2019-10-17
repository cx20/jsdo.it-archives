// forked from cx20's "EaselJS テスト" http://jsdo.it/cx20/oxOS
var DOT_SIZE = 20;
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
    var r = parseInt( "0x" + rgb.substr( 0, 2 ) );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ) );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ) );
    var r2 = parseInt( r + Math.random() * 20 );
    var g2 = parseInt( g + Math.random() * 20 );
    var b2 = parseInt( b + Math.random() * 20 );
    console.log( "rgb(" + r2 + "," + g2 + "," + b2 + ")" );
    return "rgb(" + r2 + "," + g2 + "," + b2 + ")";
}

var stage;
init();

function init() {
    var canvasObject = document.getElementById('myCanvas');
    stage = new createjs.Stage(canvasObject);
    draw();
}

function draw() {
    var myShape = new createjs.Shape();
    var myGraphics = myShape.graphics;
    
    myShape.x = X_START_POS;
    myShape.y = Y_START_POS;

    stage.addChild(myShape);
    
    var i, x, y;
    var color;
	for ( i = 0; i < dataSet.length; i++ ) {
        x = ( i % 16 ) * DOT_SIZE;
        y = Math.floor( i / 16 ) * DOT_SIZE;
        console.log( x + "," + y );
        color = getRgbColor(dataSet[i]);
        myGraphics.beginFill(color);
        myGraphics.beginFill("#777777");
        myGraphics.drawRoundRect(x-2, y-2, 16, 16, 3);
        myGraphics.beginFill(getRandColor( color ) );
        myGraphics.drawRoundRect(x, y, 16, 16, 3);
        
	}
    stage.update();
}
