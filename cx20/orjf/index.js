// forked from cx20's "Matter.js でテクスチャを使ってみるテスト" http://jsdo.it/cx20/hcPS
// forked from liabru's "Wrecking Ball Physics" http://codepen.io/liabru/pen/zwDiE

var DOT_SIZE = 16;
var X_START_POS = 100;
var Y_START_POS = 80;

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
		"無":0xffffff,
		"黒":0x111111,
		"灰":0x444444,
		"白":0x777777
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

function getTexture( c )
{
    var textureHash = {
        "無":"../../assets/4/c/u/t/4cutK.png", // block_beige.png
        "黒":"../../assets/y/G/E/Z/yGEZV.png", // block_black.png
        "灰":"../../assets/g/9/y/3/g9y3x.png", // block_brown.png
        "白":"../../assets/8/y/w/n/8ywng.png", // block_white.png
	    };
    return textureHash[ c ];
}

// ライブラリのエイリアス設定
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;

// 物理演算のエンジンを作成する
var engine = Engine.create(document.body, {
    render: {
        options: {
            showAngleIndicator: false,
            wireframes: false
        }
    }
});

// マウス制御を追加する
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

// 床を追加する
var offset = 5;
World.addBody(engine.world, Bodies.rectangle(210, 400 + offset, 330 + 2 * offset, 20, {
    isStatic: true
}));

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
    
    // 物理演算の世界をクリアする
    World.clear(engine.world, true);

    // 鉄球の初期位置
    var ball = Bodies.circle(-160, 160, 20, {
        density: 1,
        frictionAir: 0.001
    });

    // ワイヤーの原点
    World.addBody(engine.world, ball);
    World.addConstraint(engine.world, Constraint.create({
        pointA: {
            x: 40,
            y: 60
        },
        bodyB: ball
    }));

    var cnt = 0;
    var rows = 10;
    var yy = 600 - 50 - 40 * rows;
    
    // ドット絵作成
    var stack = Composites.stack(X_START_POS, yy, DOT_SIZE, DOT_SIZE, 0, 0, function (x, y, column, row) {
        var color = dataSet[cnt++];
        var style = getRgbColor(color);
        return Bodies.rectangle(x, y, DOT_SIZE, DOT_SIZE, {
            friction: 0.9,
            restitution: 0.1,
            render: {
                sprite: {
                    texture: getTexture(color)
                }
            }
        });
    });
    
    // ドット絵を追加
    World.addComposite(engine.world, stack);

    // 物理演算の実行
    Engine.run(engine);
}
