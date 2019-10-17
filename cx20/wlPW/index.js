// forked from tsubao's "[canvas] 紙ふぶき" http://jsdo.it/tsubao/iR2g

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
/*
    var result = "";
    var rgb = getRgbColor( c );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );
    switch ( rgbType )
    {
    case 'r':
        r = r;
        g = 0;
        b = 0;
        break;
    case 'g':
        r = 0;
        g = g;
        b = 0;
        break;
    case 'b':
        r = 0;
        g = 0;
        b = b;
        break;
    }
    result = "rgb( " + r + ", " + g + ", " + b + ")";
    return result;
*/
    var result = 0;
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
    return result;
}

	//var DEF_KAMIKIRE_MAX = 200;
	var DEF_KAMIKIRE_MAX = dataSet.length;
	
	var kamikire_array = [];
	var cvs;
	var ctx;
	var stageWidth, stageHeight;
	var resizeFlg = true;
	//
	window.onload = function()
	{
		init();
	}
	
	
	//初期処理
	function init()
	{
		cvs = document.getElementById("canvas");
		
		//ウィンドウサイズ設定
		stageWidth = window.innerWidth ? window.innerWidth : $(window).width();
		stageHeight = window.innerHeight ? window.innerHeight : $(window).height();
		cvs.width = stageWidth;
		cvs.height = stageHeight;
		
		ctx = cvs.getContext("2d");
        ctx.fillStyle = "#FFF";
		ctx.fillRect(0, 0, cvs.width, cvs.height);
		
		//生成
		var color;
		for(var i=0; i<DEF_KAMIKIRE_MAX; i++){
			color = dataSet[i];
			var kami = new Kamikire(5+Math.floor(Math.random()*5));
			
			if ( color != "無" ) {
				//kami.x = Math.random()*stageWidth;
				//kami.y = Math.random()*stageHeight;
				kami.x = X_START_POS + (i % 16) * DOT_SIZE;
				kami.y = Y_START_POS + Math.floor(i / 16) * DOT_SIZE;
				kami._r = getSingleLightColor( color, "r" );
				kami._g = getSingleLightColor( color, "g" );
				kami._b = getSingleLightColor( color, "b" );
				
				//ctx.fillStyle = "#" + kami._r + kami._g + kami._b;
				ctx.fillStyle = 'rgb('+kami._r+', '+kami._g+', '+kami._b+')';
				ctx.fillRect(kami.x, kami.y, kami.SIZE, kami.SIZE);
				
				//
				kamikire_array.push(kami);
			}
		}
		
		setInterval(EnterFrame, 30);
	}
	
    //紙ふぶき
	function Kamikire(_size){
		this.SIZE = _size;
		
		this.x = 0;
		this.y = 0;
		this.alpha = 1;
		
		var t = Math.random()*Math.PI*2;
		var r = Math.floor((1+Math.cos(t))*127.9999);
		var g = Math.floor((1+Math.cos(t+Math.PI*2/3))*127.9999);
		var b = Math.floor((1+Math.cos(t-Math.PI*2/3))*127.9999);
		
		this._r = r;
		this._g = g;
		this._b = b;
		this._backColor = 0x010101*Math.floor(127+Math.random()*64);
		this._omega = (Math.random()*2-1)*Math.PI/4;
		this._fallTheta = 0;
		this._fallSpeed = 1+Math.random()*2;
		
		this._theta = Math.random()*Math.PI*2;
		this._Ax = 1;
		this._Ay = Math.random();
		this._Az = Math.random()*2-1;
		var _l = Math.sqrt(this._Ax*this._Ax+this._Ay*this._Ay+this._Az*this._Az);
		this._Ax /= _l;
		this._Ay /= _l;
		this._Az /= _l;
		var _s = Math.sqrt(this._Ax*this._Ax+this._Ay*this._Ay);
		if(_s == 0){ // then A == ( 0, 0, -1 );
			this._Bx = 1.0; this._By = 0.0; this._Bz = 0.0;
			this._Cx = 0.0; this._Cy = 1.0; this._Cz = 0.0;
		} else {
			this._Bx = this._Ay; this._By = -this._Ax; this._Bz = 0;
			this._Cx = this._Ax*this._Az; this._Cy = this._Ay*this._Az; this._Cz = -(_s*_s);
			this._Bx /= _s; this._By /= _s;
			this._Cx /= _s*_l; this._Cy /= _s*_l; this._Cz /= _s*_l;
		}
	}
	
	Kamikire.prototype = {
		get rotation3D(){
			return this._theta - (Math.PI*2)*Math.floor(this._theta/(Math.PI*2));
		},
		set rotation3D(theta){
			this._theta = theta - (Math.PI*2)*Math.floor(theta/(Math.PI*2));
			var _cos = Math.cos(this._theta);
			var _sin = Math.sin(this._theta);
			
			// vector F is the rotated image of (1,0,0);
			var _Fx = this._Ax*this._Ax+(this._Bx*this._Bx+this._Cx*this._Cx)*_cos;
			var _Fy = this._Ax*this._Ay+(this._Bx*this._By+this._Cx*this._Cy)*_cos+(this._Bx*this._Cy-this._Cx*this._By)*_sin;
			var _Fz = this._Ax*this._Az+(this._Bx*this._Bz+this._Cx*this._Cz)*_cos-(this._Bx*this._Cz-this._Cx*this._Bz)*_sin;
			// vector G is the rotated image of (0,1,0);
			var _Gx = this._Ax*this._Ay+(this._By*this._Bx+this._Cy*this._Cz)*_cos+(this._By*this._Cx-this._Cy*this._Bx)*_sin;
			var _Gy = this._Ay*this._Ay+(this._By*this._By+this._Cy*this._Cy)*_cos;
			var _Gz = this._Ay*this._Az+(this._By*this._Bz+this._Cy*this._Cz)*_cos+(this._By*this._Cz-this._Cy*this._Bz)*_sin;
			
			//
			//ctx.fillStyle = 'rgba('+this._r+', '+this._g+', '+this._b+', '+this.alpha+')';
			ctx.fillStyle = 'rgb('+this._r+', '+this._g+', '+this._b+')';
			
			ctx.beginPath();
			ctx.lineTo(this.x+-_Fx*this.SIZE/2+_Gx*this.SIZE/2, this.y+-_Fy*this.SIZE/2+_Gy*this.SIZE/2);
			ctx.lineTo(this.x+-_Fx*this.SIZE/2-_Gx*this.SIZE/2, this.y+-_Fy*this.SIZE/2-_Gy*this.SIZE/2);
			ctx.lineTo(this.x+_Fx*this.SIZE/2-_Gx*this.SIZE/2, this.y+_Fy*this.SIZE/2-_Gy*this.SIZE/2);
			ctx.lineTo(this.x+_Fx*this.SIZE/2+_Gx*this.SIZE/2, this.y+_Fy*this.SIZE/2+_Gy*this.SIZE/2);
			ctx.closePath();
			ctx.fill();
		},
		fall: function(){
			this.rotation3D = this.rotation3D + this._omega;
			
			this.x += this._fallSpeed*Math.sin(this._fallTheta);
			this.y += this._fallSpeed*Math.cos(this._fallTheta);
			this._fallTheta += (Math.random()*2-1)*Math.PI/12;
			if(this._fallTheta < -Math.PI/2){
				this._fallTheta = -Math.PI - this._fallTheta;
			}
			if(this._fallTheta > Math.PI/2){
				this._fallTheta = Math.PI - this._fallTheta;
			}
		}
	}
	
	
	//enterframe
	function EnterFrame()
	{
		//初期化
		if(resizeFlg){
			resizeFlg = false;
			cvs.width = stageWidth;
			cvs.height = stageHeight;
		}
		ctx.clearRect(0,0,stageWidth,stageHeight);
		
		//表示更新
		//for( i=0; i<DEF_KAMIKIRE_MAX; ++i){
		for( i=0; i<kamikire_array.length; ++i){
			if(kamikire_array[i].y>0){
				var par = kamikire_array[i].y / stageHeight;
				par = 1 - par;
				
				kamikire_array[i].alpha = par;
			}
			
			if(kamikire_array[i].x - kamikire_array[i].SIZE/Math.SQRT2 > stageWidth){
				kamikire_array[i].x -= stageWidth;
			}
			if(kamikire_array[i].x + kamikire_array[i].SIZE/Math.SQRT2 < 0){
				kamikire_array[i].x += stageWidth;
			}
			if(kamikire_array[i].y - kamikire_array[i].SIZE/Math.SQRT2 > stageHeight){
				kamikire_array[i].y -= stageHeight;
			}
			
			kamikire_array[i].fall();
		}
	}
	
	/**
	 * リサイズ
	 */
	$(window).resize(function(){
		resizeFlg = true;
		stageWidth = window.innerWidth ? window.innerWidth : $(window).width();
		stageHeight = window.innerHeight ? window.innerHeight : $(window).height();
	});
	