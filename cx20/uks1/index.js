// forked from hoge1e4's "forked: ドット絵を花火にしてみるテスト" http://jsdo.it/hoge1e4/bAhd
// forked from cx20's "ドット絵を花火にしてみるテスト" http://jsdo.it/cx20/k0VC
// forked from norahiko's "ドーン花火" http://jsdo.it/norahiko/uvMX
// forked from norahiko's "(´・ω・`) forked: やらない花" http://jsdo.it/norahiko/xfHB
// forked from GeckoTang's "やらない花" http://jsdo.it/GeckoTang/yDfb

var DOT_SIZE = 16;
var X_START_POS = -120;
var Y_START_POS = -100;
var Z_START_POS = 0;

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
		"黒":"#444444",
		"灰":"#888888",
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

function dataSetToHanabiData(dataSet) {
    var hanabiData = [];
    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * DOT_SIZE + X_START_POS;
        var y = Math.floor(i / 16) * DOT_SIZE + Y_START_POS;
        if ( dataSet[i] != "無" ) {
            hanabiData.push( [ x, y,  getRgbColor(dataSet[i]) ]  );
        }
    };
    return hanabiData;
}

var cvs = document.createElement("canvas");
var ctx = cvs.getContext("2d");
var sty = cvs.style;
var DATA = [];
var bg = 0;
var per = 0;
var WIDTH = cvs.width = window.innerWidth;
var HEIGHT = cvs.height = window.innerHeight;
var RADIUS = 200;
var BG_WIDTH = 465;
var centerX = WIDTH >> 1;
var centerY = HEIGHT >> 1;

function delayload() {
    // データ形式変換
    pixelTweet = document.getElementById("pixelData").value;
    dataSet = convertPixelTweetToDataSet( pixelTweet );

    DATA = dataSetToHanabiData(dataSet);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    document.body.appendChild(cvs);

    render(0, centerX, centerY);
    cls();

    cvs.addEventListener("click", handleClick, false);
}

/**
 *  放物線生成用
 */
function tween(x) {
    var y = -(x - 50) * (x - 50) / 2500 + 1;
    return y > 0 ? y : 0;
}

function cls() {
    var c = ctx;
    c.globalAlpha = 0.03;
    c.fillStyle = "black";
    c.fillRect(0, 0, WIDTH, HEIGHT);
    requestAnimationFrame(cls);
}

/**
 *
 */
function render(per, centerX, centerY) {
    var c = ctx,
        d = DATA,
        p, i, t,
        JUMP = 160;

    // Background Grad
    ++bg;
    if (bg > BG_WIDTH) {
        bg = 0;
    }
    sty.backgroundPosition = bg + "px 0";

    //
    c.save();
    c.globalAlpha = 0.03;
    c.restore();

    if (per < 150) {
        c.save();
        t = tween(per);
        c.globalAlpha = t;
        c.translate(centerX, centerY - t * JUMP);
        var per2 = per < 30 ? 10 : per - 20;
        for (i = d.length; i--;) {
            p = d[i];
            c.fillStyle = p[2];
            c.fillRect(
                p[0] * RADIUS * per2 / 10000,
                p[1] * RADIUS * per2 / 10000 + (per < 30 ? (30 - per) * (30 - per) * 0 : 0),
                3,
                3
            );
        }
        c.restore();
    }

    if (per < 160) { // 100 + 1 / 0.1
        requestAnimationFrame(function() {
            render(per + 1.0, centerX, centerY);
        });
    }
}

function handleClick(evt) {
    centerX = evt.layerX;
    centerY = evt.layerY;
    render(0, centerX, centerY);
}
