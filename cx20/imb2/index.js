// forked from cx20's "振り子でドット絵を動かしてみるテスト" http://jsdo.it/cx20/1qxj
// forked from yuqq.js's "Pendulum Wave" http://jsdo.it/yuqq.js/qjtB

var DOT_SIZE = 20;
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
var dataSet = [];
var pixelTweet = "";
var animationID = 0;

function getRgbColor( c )
{
	var colorHash = {
		"無":"#ffffff",
		"黒":"#222222",
		"灰":"#666666",
		"白":"#bbbbbb"
	};
	return colorHash[ c ];
}

// データ形式変換関数
function convertPixelTweetToDataSet( pixelTweet ) {
	var result = [];
	var hash = {
		"0":"無",
		"1":"黒",
		"2":"灰",
		"3":"白"
	};
	// ＜変換前＞
	// 000000000000000000
	// 000000000000003330
	// 000000011111003330
	// 000000111111111330
	// 000000222332302220
	// 000002323332332220
	// 000002322333233320
	// 000002233322222200
	// 000000033333332000
	// 000222221222120000
	// 002222222122210020
	// 033222222111110020
	// 033301121131131220
	// 003021111111111220
	// 000222111111111220
	// 002221111111100000
	// 002001111000000000
	// 000000000000000000
	// 
	// ＜変換後＞
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","白","白","白","無",
	// "無","無","無","無","無","無","無","黒","黒","黒","黒","黒","無","無","白","白","白","無",
	// "無","無","無","無","無","無","黒","黒","黒","黒","黒","黒","黒","黒","黒","白","白","無",
	// "無","無","無","無","無","無","灰","灰","灰","白","白","灰","白","無","灰","灰","灰","無",
	// "無","無","無","無","無","灰","白","灰","白","白","白","灰","白","白","灰","灰","灰","無",
	// "無","無","無","無","無","灰","白","灰","灰","白","白","白","灰","白","白","白","灰","無",
	// "無","無","無","無","無","灰","灰","白","白","白","灰","灰","灰","灰","灰","灰","無","無",
	// "無","無","無","無","無","無","無","白","白","白","白","白","白","白","灰","無","無","無",
	// "無","無","無","灰","灰","灰","灰","灰","黒","灰","灰","灰","黒","灰","無","無","無","無",
	// "無","無","灰","灰","灰","灰","灰","灰","灰","黒","灰","灰","灰","黒","無","無","灰","無",
	// "無","白","白","灰","灰","灰","灰","灰","灰","黒","黒","黒","黒","黒","無","無","灰","無",
	// "無","白","白","白","無","黒","黒","灰","黒","黒","白","黒","黒","白","黒","灰","灰","無",
	// "無","無","白","無","灰","黒","黒","黒","黒","黒","黒","黒","黒","黒","黒","灰","灰","無",
	// "無","無","無","灰","灰","灰","黒","黒","黒","黒","黒","黒","黒","黒","黒","灰","灰","無",
	// "無","無","灰","灰","灰","黒","黒","黒","黒","黒","黒","黒","黒","無","無","無","無","無",
	// "無","無","灰","無","無","黒","黒","黒","黒","無","無","無","無","無","無","無","無","無",
	// "無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無","無",
	//
	for ( var i = 0; i < pixelTweet.length; i++ ) {
		var x = i % 18;
		var y = Math.floor( i / 18 );
		if ( x > 0 && x < 17 && y > 0 && y < 17 ) {
			var c = pixelTweet[i];
			result.push(hash[c]);
		}
	}
	return result;
}

document.body.addEventListener('paste', function (e) {
    // 貼り付け直後の場合、テキストボックスが空のケースがある為、少し時間をおいて読み込ませる
    setTimeout( delayload, 100 );
}, false);


function toggleButton() {
    var button = document.getElementById("toggle");
    var pixelData = document.getElementById("pixelData");

    if (button.textContent == "show") {

        pixelData.style.display = "block";
        button.textContent = "hide";

    } else if (button.textContent == "hide") {

        pixelData.style.display = "none";
        button.textContent = "show";

    }
}

function clearData() {
	document.getElementById("pixelData").value = "";
}

function showSample() {
    // サンプルデータ設定
	document.getElementById("pixelData").value = "000000000000000000000000000000003330000000011111003330000000111111111330000000222332302220000002323332332220000002322333233320000002233322222200000000033333332000000222221222120000002222222122210020033222222111110020033301121131131220003021111111111220000222111111111220002221111111100000002001111000000000000000000000000000";
	delayload();
}

function delayload() {
    // データ形式変換
    pixelTweet = document.getElementById("pixelData").value;
    dataSet = convertPixelTweetToDataSet( pixelTweet );

    stop();
    initData();
    loop();
}

function getGradientColor( rgb, pattern )
{
    var result = "";
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );
    var a = 0;
    
    switch ( pattern )
    {
        case 1:
            r = 255;
            g = 255;
            b = 255;
            a = 1;
            break;
        case 2:
            r += 85;
            g += 85;
            b += 85;
            a = 1;
            break;
        case 3:
            a = 1;
            break;
        case 4:
            a = 0;
            break;
    }
    result = "rgba( " + r + ", " + g + ", " + b + ", " + a + ")";
    return result;
}

var PendulumNumber = 256;
var MaxStringLength = 300;
var MinStringLength = 200;
var StartAngle = 0.2;
var PendulumRadius = 5;
var g = 9.8127;
var dt = 200;
var k = 0;

var cvs = {
    'elem': undefined,
    'width': 0,
    'height': 0,
    'ctx': undefined,
    'left': 0,
    'top': 0,
    'pos_x': 0,
    'pos_y': 0
};

cvs.elem = document.getElementById('cvs');
var b = document.body;
var d = document.documentElement;
cvs.width = Math.max(b.clientWidth, b.scrollWidth, d.scrollWidth, d.clientWidth);
cvs.height = Math.max(b.clientHeight, b.scrollHeight, d.scrollHeight, d.clientHeight);
cvs.elem.height = cvs.height;
cvs.elem.width = cvs.width;
cvs.ctx = cvs.elem.getContext('2d');
cvs.left = cvs.elem.getBoundingClientRect ? cvs.elem.getBoundingClientRect().left : 0;
cvs.top = cvs.elem.getBoundingClientRect ? cvs.elem.getBoundingClientRect().top : 0;

var theta = [];
var omega = [];
var r = [];
var colors = [];

function hsv2rgb(hue, sat, val) {
    var red, grn, blu, i, f, p, q, t;
    hue %= 360;
    if (val == 0) {
        return 'rgb(0,0,0)';
    }
    sat /= 100;
    val /= 100;
    hue /= 60;
    i = Math.floor(hue);
    f = hue - i;
    p = val * (1 - sat);
    q = val * (1 - (sat * f));
    t = val * (1 - (sat * (1 - f)));
    if (i == 0) {
        red = val;
        grn = t;
        blu = p;
    }
    else if (i == 1) {
        red = q;
        grn = val;
        blu = p;
    }
    else if (i == 2) {
        red = p;
        grn = val;
        blu = t;
    }
    else if (i == 3) {
        red = p;
        grn = q;
        blu = val;
    }
    else if (i == 4) {
        red = t;
        grn = p;
        blu = val;
    }
    else if (i == 5) {
        red = val;
        grn = p;
        blu = q;
    }
    red = Math.floor(red * 255);
    grn = Math.floor(grn * 255);
    blu = Math.floor(blu * 255);
    return 'rgb(' + [red, grn, blu].join(',') + ')';
}

function initData() {
	var color;
	var delta = (MaxStringLength - MinStringLength) / PendulumNumber;
	for (var i = 0; i < PendulumNumber; i++) {
	    theta[i] = (-8 + i % 16) * 0.05;
	    omega[i] = 0;
	    r[i] = MinStringLength + i * delta;
	    color = dataSet[i];
	    colors[i] = getRgbColor( color );
	}
}

function clearCanvas() {
    cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
}

function drawPendulum() {
    var pos_x = cvs.width / 2;
    var pos_y = -100;

    for (var i = 0; i < PendulumNumber; i++) {
        omega[i] -= (g / r[i] * Math.sin(theta[i]) + k * omega[i]) * dt / 1000;
        theta[i] += omega[i];
        var x = r[i] * Math.sin(theta[i]);
        var y = r[i] * Math.cos(theta[i]) * 1.5;
        if ( dataSet[i] != "無" ) {
            cvs.ctx.beginPath();
            cvs.ctx.moveTo(pos_x, pos_y);
            cvs.ctx.lineWidth = 0.1;
            cvs.ctx.lineTo(pos_x + x, pos_y + y);
            cvs.ctx.strokeStyle = colors[i];
            cvs.ctx.stroke();
            cvs.ctx.closePath();
            cvs.ctx.beginPath();
            var radius = (DOT_SIZE / 2 ) - 2;
            var gradient = cvs.ctx.createRadialGradient(pos_x + x, pos_y + y, 0, pos_x + x, pos_y + y, radius);
            gradient.addColorStop(0,    getGradientColor(colors[i], 1));
            gradient.addColorStop(0.2,  getGradientColor(colors[i], 2));
            gradient.addColorStop(0.95, getGradientColor(colors[i], 3));
            gradient.addColorStop(1,    getGradientColor(colors[i], 4));
            cvs.ctx.fillStyle = gradient;
            cvs.ctx.fillRect(pos_x + x - radius, pos_y + y - radius, pos_x + x + radius, pos_y + y + radius);
            cvs.ctx.closePath();
        }
    }

}

function loop() {
    clearCanvas();
    drawPendulum();
    animationID = requestAnimationFrame(loop);
}

function stop() {
    cancelAnimationFrame(animationID);
}
