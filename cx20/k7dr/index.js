// forked from nekodon's "EaselJSでキラキラエフェクト" http://jsdo.it/nekodon/thMU

var DOT_SIZE = 28;
var X_START_POS = 0;
var Y_START_POS = 0;

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

function getSpeedByColor( c )
{
    var colorHash = {
        "無":0,
        "白":10,
        "肌":20,
        "茶":30,
        "赤":40,
        "黄":50,
        "緑":60,
        "水":70,
        "青":80,
        "紫":90
    };
    return colorHash[ c ];
}

//var count = 30;
var count = dataSet.length;
var stage;
var maxWidth;
var maxHeight;


$(document).ready(function(){
	init();
});


function init(){
	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	maxWidth = $("#canvas").width();
	maxHeight =$("#canvas").height();
	stage.compositeOperation = "lighter";
	
	var x, y;
	for(var i = 0; i<count; i++){
		var myShape = new createjs.Shape();
		//ランダムな色を取得
		//var randomColor = "#" + Math.floor(Math.random()*0xFFFFFF).toString(16);
		//myShape.vx = myShape.x = Math.random()*maxWidth;
		//myShape.vy = myShape.y = Math.random()*maxHeight;
		//myShape.radius = 10+(Math.random()*100);
		//myShape.speed = (9-myShape.radius*0.1)/4;
		x = X_START_POS + (i % 16) * DOT_SIZE;
		y = Y_START_POS + Math.floor(i / 16) * DOT_SIZE;
		var randomColor = getRgbColor( dataSet[i] );
		myShape.vx = myShape.x = x;
		myShape.vy = myShape.y = y;
		myShape.rot = Math.random()*360;
		myShape.radius = DOT_SIZE/2;
		myShape.speed = (9-getSpeedByColor( dataSet[i] )*0.1)/4;
		
		var graphics = myShape.graphics;
		graphics.beginFill(randomColor);
		graphics.drawCircle(0, 0, myShape.radius);
		
		var blurStrong = 0.5+myShape.radius/5;
		var blurFilter = new createjs.BoxBlurFilter(blurStrong, blurStrong, 2);
		myShape.filters = [blurFilter];
		var margins = blurFilter.getBounds();
		myShape.cache(-myShape.radius+margins.x-7, -myShape.radius+margins.y-7, myShape.radius*2+margins.width+14, myShape.radius*2+margins.height+14);
				
		stage.addChild(myShape);
	}
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(window);
	stage.update();
}


function tick(){
	var l = stage.getNumChildren();
	for(var i=0; i<l; i++){
		var circle = stage.getChildAt(i);
		circle.vx += Math.cos(circle.rot*Math.PI/180)*circle.speed;
		circle.vy += Math.sin(circle.rot*Math.PI/180)*circle.speed;
		circle.x = circle.vx;
		circle.y = circle.vy;
		
		if(circle.x > maxWidth+circle.radius){
			circle.x = circle.vx = -circle.radius;
		}else if(circle.x < -circle.radius){
			circle.x = circle.vx = maxWidth+circle.radius;
		}
		if(circle.y > maxHeight+circle.radius){
			circle.vy = circle.y = -circle.radius;
		}else if(circle.y < -circle.radius){
			circle.vy = circle.y = maxHeight + circle.radius;
		}
	}
	stage.update();
}
