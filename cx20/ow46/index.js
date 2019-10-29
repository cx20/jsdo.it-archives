// forked from cx20's "Verlet-JS サンプル" http://jsdo.it/cx20/cOLd

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

function getRgbColor( c )
{
	var colorHash = {
		"無":"#ffffff",
		"黒":"#111111",
		"灰":"#444444",
		"白":"#777777"
	};
	return colorHash[ c ];
}

function getBrightness( c )
{
	var colorHash = {
		"無":15/15,
		"黒":1/15,
		"灰":4/15,
		"白":7/15
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

	var canvas = document.getElementById("canvas");

	// canvas dimensions
	var width = 465;
	var height = 465;

	// retina
	var dpr = window.devicePixelRatio || 1;
	canvas.width = width*dpr;
	canvas.height = height*dpr;
	canvas.getContext("2d").scale(dpr, dpr);

	// simulation
	var sim = new VerletJS(width, height, canvas);
	sim.friction = 1;
	sim.highlightColor = "#fff";

	// entities
	var min = Math.min(width,height)*0.5;
	var segments = 20;
	var cloth = sim.cloth(new Vec2(width/2,height/3), min, min, segments, 6, 0.9);
	
	cloth.drawConstraints = function(ctx, composite) {
		var stride = min/segments;
		var x,y;
		var pos = 0;
		for (y=1;y<segments;++y) {
			var strLine = "";
			for (x=1;x<segments;++x) {
				ctx.beginPath();

				var i1 = (y-1)*segments+x-1;
				var i2 = (y)*segments+x;
				
				ctx.moveTo(cloth.particles[i1].pos.x, cloth.particles[i1].pos.y);
				ctx.lineTo(cloth.particles[i1+1].pos.x, cloth.particles[i1+1].pos.y);
				
				ctx.lineTo(cloth.particles[i2].pos.x, cloth.particles[i2].pos.y);
				ctx.lineTo(cloth.particles[i2-1].pos.x, cloth.particles[i2-1].pos.y);
				
				var off = cloth.particles[i2].pos.x - cloth.particles[i1].pos.x;
				off += cloth.particles[i2].pos.y - cloth.particles[i1].pos.y;
				off *= 0.25;
				
				//var coef = Math.round((Math.abs(off)/stride)*255);
                var coef = Math.round((Math.abs(off)/stride)*255 * 2);
				if (coef > 255)
					coef = 255;
				
				var ch = "";
				var style = "";
				var brightness = 0;
				var coef2 = 0;
				if ( x >= 2 && x <= 17 && y >= 2 && y <= 17)
				{
					pos = (y-2) * 16 + (x-2);
					ch = dataSet[pos];
					style = getRgbColor( ch );
					brightness = getBrightness( ch );
					coef2 = Math.floor( brightness * coef );
				}
				if ( style === "" || ch == "無" )
				{
					//ctx.fillStyle = "rgb(" + coef + ",0," + (255-coef)+ ")";
					ctx.fillStyle = "rgb(" + coef + "," + coef + "," + coef + ")";	// グレースケール
				}
				else
				{
					//ctx.fillStyle = style;
					ctx.fillStyle = "rgb(" + coef2 + "," + coef2 + "," + coef2 + ")";	// グレースケール
				}
				
				ctx.fill();
			}
		}
		
		var c;
		for (c in composite.constraints) {
			if (composite.constraints[c] instanceof PinConstraint) {
				var point = composite.constraints[c];
				ctx.beginPath();
				ctx.arc(point.pos.x, point.pos.y, 1.2, 0, 2*Math.PI);
				ctx.fillStyle = "rgba(255,255,255,1)";
				ctx.fill();
			}
		}
	};
	
	cloth.drawParticles = function(ctx, composite) {
		// do nothing for particles
	};
	
	// animation loop
	var legIndex = 0;
	var loop = function() {
		sim.frame(16);
		sim.draw();
		requestAnimFrame(loop);
	};

	loop();
}
