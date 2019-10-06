// forked from clockmaker's "ForceMap Arrows" http://jsdo.it/clockmaker/arrows

var DOT_SIZE = 1;
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

function getSingleLightColor( c, rgbType )
{
    var result = "";

    var rgb = getRgbColor( c );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );

    switch ( rgbType )
    {
    case 'r':
        result = r;
        break;
    case 'g':
        result = g;
        break;
    case 'b':
        result = b;
        break;
    }
    //console.log( result );
    return result;
}

var NUM_PARTICLE = 200;
var arrowImage;
var forceMapImage;
var forceMapCanvas;
var forceMapIndexA = 0;
var forceMapIndexB = 1;
var stage;
var particleList = [];

init();

function init() {
	forceMapImage = new Image();
	forceMapImage.onload = initForceMap;
	forceMapImage.src = "../../assets/o/8/c/8/o8c8b.jpg";
}

function initForceMap() {
	var forceMapElement = document.createElement("canvas");
	forceMapElement.setAttribute("width", forceMapImage.width);
	forceMapElement.setAttribute("height", forceMapImage.height);

	forceMapCanvas = forceMapElement.getContext("2d");
	forceMapCanvas.drawImage(forceMapImage, 0, 0);

/*
    arrowImage = new Image();
	arrowImage.onload = initParticles;
	arrowImage.src = "http://jsrun.it/assets/3/c/r/U/3crUM.png";
*/
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var image = ctx.createImageData( 16, 16 );
	for ( var i =0; i < image.data.length; i += 4 ) {
		if ( dataSet[i/4] != "無" ) {
			image.data[i  ] = getSingleLightColor( dataSet[i/4], "r" );
			image.data[i+1] = getSingleLightColor( dataSet[i/4], "g" );
			image.data[i+2] = getSingleLightColor( dataSet[i/4], "b" );
			image.data[i+3] = 255;
		}
	}
	ctx.putImageData( image, 0, 0 );
	arrowImage = new Image();
	arrowImage.onload = initParticles;
	arrowImage.src = canvas.toDataURL();
}

function initParticles() {
	canvas = document.getElementById("myCanvas");
	stage = new Stage(canvas);

	for (i = 0; i < NUM_PARTICLE; i++) {
		var arrow = new Arrow(arrowImage, Math.random() * 465 >> 0, Math.random() * 465 >> 0);
		stage.addChild(arrow);
		particleList[i] = arrow;
	}

	Ticker.setFPS(60);
	Ticker.addListener(window);
	setInterval(resetForceMapIndex, 1000);
}

function tick() {
	for (var i = 0; i < particleList.length; i++) {
		var arrow = particleList[i];
		var data = forceMapCanvas.getImageData(arrow.x >> 1, arrow.y >> 1, 1, 1);
		arrow.step(data.data[forceMapIndexA], data.data[forceMapIndexB]);
	}
	stage.update();
}

function resetForceMapIndex() {
	var indexArr = [0, 1, 2];
	forceMapIndexA = indexArr[indexArr.length * Math.random() >> 0];
	forceMapIndexB = indexArr[indexArr.length * Math.random() >> 0];
}


(function (window) {
	function Arrow(imageOrUri, x, y) {
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.ax = 0;
		this.ay = 0;
		this.initialize(imageOrUri);
		this.regX = 10;
		this.regY = 10;
	}

	var p = Arrow.prototype = new Bitmap();

	p.step = function (colorA, colorB) {
		this.ax += ( colorA - 128 ) * 0.0005;
		this.ay += ( colorB - 128 ) * 0.0005;
		this.vx += this.ax;
		this.vy += this.ay;
		this.x += this.vx;
		this.y += this.vy;

		this.rotation = Math.atan2(this.vy, this.vx) * 180 / Math.PI;

		this.ax *= 0.96;
		this.ay *= 0.96;
		this.vx *= 0.92;
		this.vy *= 0.92;

		( this.x > 465 ) ? this.x = 0 : ( this.x < 0 ) ? this.x = 465 : 0;
		( this.y > 465 ) ? this.y = 0 : ( this.y < 0 ) ? this.y = 465 : 0;
	};
	window.Arrow = Arrow;
}(window));