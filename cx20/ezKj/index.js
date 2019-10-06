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

function getEnglishColorName( c )
{
	var colorHash = {
		"無":"",
		"肌":"beige",
		"茶":"brown",
		"赤":"red",
		"黄":"yellow",
		"緑":"green",
		"青":"blue"
	};
	return colorHash[ c ];
}

smart.ready({
	red   :"../../assets/6/X/7/9/6X79c.png", // "img/ballRed.png",
	blue  :"../../assets/r/G/3/7/rG37W.png", // "img/ballBlue.png",
	green :"../../assets/r/K/D/b/rKDbm.png", // "img/ballGreen.png",
	yellow:"../../assets/c/l/t/8/clt8s.png", // "img/ballYellow.png",
	beige :"../../assets/y/n/i/f/ynifg.png", // "img/ballBeige.png",
	brown :"../../assets/m/R/2/t/mR2tJ.png"  // "img/ballBrown.png",
},function(S,imgs) {
    // 擬似クラスを定義
	var Ball3D = S.extend({
		init: function (x_, y_, z_, img_) {
			this.x = this.baseX = x_;
			this.y = this.baseY = y_;
			this.z = this.baseZ = z_;
			this.screenX = 0;
			this.screenY = 0;
			this.scale = 1;
			this.img = img_;
		},
		transform: function (sinX, cosX, sinY, cosY, scale_) // 3D座標系から2D座標へ変換
		{
			var sx = this.x;
			var sy = this.y;
			var sz = this.z;
			var tm;
			tm = sx * cosY - sz * sinY;
			sz = sz * cosY + sx * sinY;
			sx = tm;
			tm = sy * cosX - sz * sinX;
			sz = sz * cosX + sy * sinX;
			sy = tm;
			this.scale = 750 / (750 + sz * scale_) * scale_;
			this.screenX = sx * this.scale;
			this.screenY = sy * this.scale;
		}
	});
	var Space3D = S.extend({
		init: function (x_, y_) {
			this.balls = [];
			this.rotX = 0;
			this.rotY = 0;
			this.scale = 1;
			this.x = x_;
			this.y = y_;
		},
		render: function (cvs) {
			var i, len;
			var sinX = Math.sin(this.rotX);
			var cosX = Math.cos(this.rotX);
			var sinY = Math.sin(this.rotY);
			var cosY = Math.cos(this.rotY);
			for (i = 0, len = this.balls.length; i < len; i++) {
				this.balls[i].transform(sinX, cosX, sinY, cosY, this.scale);
			}
			this.balls.sort(function (a, b) // Zソート
				{
					return (a.scale > b.scale) ? 1 : -1;
				});
			for (i = 0; i < len; i++) // 毎フレーム全てのBallを共通のCanvasへ描画
			{
				var ball = this.balls[i];
				if (ball.scale > 0) {
					var size = ball.scale * 30;
					var sx = this.x + ball.screenX - size / 2;
					var sy = this.y + ball.screenY - size / 2;
					cvs.draw(ball.img, 0, 0, 40, 40, sx, sy, size, size);
				}
			}
		}
	});

    // オブジェクト作成
	var stage = new S.Stage("stage");
	var canvas = stage.addChild(new S.Canvas(stage.width, stage.height));
	var space3d = new Space3D(stage.width / 2, stage.height / 2);
/*
	for(var i=0;i<256;i++) // Ballを作成
	{
		var x = 480 /7 * (i%8) -240;
		var z = 480 /7 * (Math.floor(i/8)%8) -240;
		var y = 260 /3 * Math.floor(i/64) -180;
		space3d.balls.push(new Ball3D(x,y,z,imgs[["red","blue","green","yellow"][Math.floor(i/64)]]));
	}
*/
    var japaneseColor;
    var englishColor;
    for (var i = 0; i < 256; i++) // Ballを作成
    {
        var x = 32 * (15 - i % 16) - 220;
        var y = 32 * (Math.floor(i / 16)) - 220;
        var z = 0;
        //space3d.balls.push(new Ball3D(x,y,z,imgs[["red","blue","green","yellow"][Math.floor(i/64)]]));
        japaneseColor = dataSet[i];
        englishColor = getEnglishColorName(japaneseColor);
        if (dataSet[i] != "無") {
            console.log(japaneseColor + "," + englishColor + "," + imgs[englishColor]);
            space3d.balls.push(new Ball3D(x, y, z, imgs[englishColor]));
        }
    }

    // アニメーション設定
    S.timeline.enterframe(function (e) {
        space3d.rotY += 0.033;
        canvas.clear();
        space3d.render(canvas);
    });
	space3d.rotX = Math.PI * 0.5;
	space3d.scale = 0.3;
	S.tween.start(space3d, {
		rotX: 0.33
	}, "easeInOutQuad", 5, 0.2);
	S.tween.start(space3d, {
		scale: 2.4
	}, "easeInOutQuad", 1.75, 0.2, function () {
		S.tween.start(space3d, {
			scale: 0.75
		}, "easeInOutQuad", 2.75, 0.25);
	});
	stage.bind(S.touchEnabled ? "touchstart" : "mousedown", function (e) {
		for (i = 0, len = space3d.balls.length; i < len; i++) {
			var ball = space3d.balls[i];
			S.tween.start(ball, {
				x: ball.baseX * (0.8 + Math.random() * 2.4),
				y: ball.baseY * (0.8 + Math.random() * 2.4),
				z: ball.baseZ * (0.8 + Math.random() * 2.4)
			}, "easeInOutQuad", Math.random() * 0.25 + 0.25);
		}
		e.preventDefault();
	});
	stage.bind(S.touchEnabled ? "touchend" : "mouseup", function (e) {
		for (i = 0, len = space3d.balls.length; i < len; i++) {
			var ball = space3d.balls[i];
			S.tween.start(ball, {
				x: ball.baseX,
				y: ball.baseY,
				z: ball.baseZ
			}, "easeOutQuad", Math.random() * 0.15 + 0.25);
		}
	});
});
