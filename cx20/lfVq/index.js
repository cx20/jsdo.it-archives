// forked from cx20's "『群れ』シミュレーションをドット絵に変えてみるテスト" http://jsdo.it/cx20/4jiQ
// forked from cx20's "forked: お互いに間隔を調整しあうボール" http://jsdo.it/cx20/5uTp
// forked from makishimaa's "お互いに間隔を調整しあうボール" http://jsdo.it/makishimaa/ahOV

//var DOT_SIZE = 16;
var DOT_SIZE = (window.innerHeight/18); // 16;
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

function getRgbColor( c, baseColor )
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

    if ( c == "赤" || c == "青" ) {
        return colorHash[ baseColor ];
    } else {
        return colorHash[ c ];
    }
}

function getSingleLightColor( c, baseColor, rgbType )
{
    var result = "";

    var rgb = getRgbColor( c, baseColor );
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


// 定数
var FPS = 30;          // フレームレート
//var SCREEN_SIZE = 460; // 画面サイズ
var SCREEN_SIZE_X = window.innerWidth; // 画面サイズ
var SCREEN_SIZE_Y = window.innerHeight; // 画面サイズ
var BOID_SIZE = DOT_SIZE * 0.8;  // ボイドの大きさ
var MAX_SPEED = 7;     // ボイドの最大速度
var canvas = document.getElementById('world');
var ctx = canvas.getContext('2d');
var boids = [];        // ボイド

var colors = [ "無", "白", "肌", "茶", "赤", "黄", "緑", "水", "青", "紫" ];
var images = [];
function initImage( baseColor ) {
    var canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData( 16, 16 );
    for ( var i =0; i < image.data.length; i += 4 ) {
        if ( dataSet[i/4] != "無" ) {
            image.data[i+0] = getSingleLightColor( dataSet[i/4], baseColor, "r" );
            image.data[i+1] = getSingleLightColor( dataSet[i/4], baseColor, "g" );
            image.data[i+2] = getSingleLightColor( dataSet[i/4], baseColor, "b" );
            image.data[i+3] = 255;
        }
    }
    images[baseColor] = image;
}

window.onload = function () {
    /* 初期化 */
    canvas.width = SCREEN_SIZE_X;
    canvas.height = SCREEN_SIZE_Y;
    var i;
    var x, y;
    var color;
    var boid;
    for (i = 0; i < dataSet.length; ++i) {
        x = X_START_POS + (i % 16) * DOT_SIZE;
        y = Y_START_POS + Math.floor(i / 16) * DOT_SIZE;
        color = getRgbColor(dataSet[i]);
        if (dataSet[i] != "無") {
            boid = {
                x: x,  // x座標
                y: y,  // y座標
                vx: 0, // x方向の速度
                vy: 0, // y方向の速度
                color: dataSet[i]	// color
            };
            boids.push(boid);
        }
    }

    for ( i = 0; i < colors.length; i++ ) {
        initImage(colors[i]);
    }

    /* ループ開始 */
    setInterval(simulate, 1000 / FPS);
};

/**
 * シミュレート
 */
var simulate = function () {
    draw(); // ボイドの描画
    move(); // ボイドの座標の更新
};

/**
 * ボイドの描画
 */
var draw = function () {
    ctx.clearRect(0, 0, SCREEN_SIZE_X, SCREEN_SIZE_Y); // 画面をクリア
    // 全てのボイドの描画
    var boid;
    for (var i = 0; i < boids.length; ++i) {
        boid = boids[i];
/*
        ctx.beginPath();
        ctx.fillStyle = boid.color;
        //ctx.fillRect(boid.x - BOID_SIZE / 2, boid.y - BOID_SIZE / 2, BOID_SIZE, BOID_SIZE);
        ctx.arc(boid.x, boid.y, BOID_SIZE/2, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
*/
        // 「○」→「ドット絵」に変更
		ctx.putImageData(images[boid.color], boid.x, boid.y);

    }
};

/**
 * ボイドの位置の更新
 */
var move = function () {
    for (var i = 0; i < boids.length; ++i) {
        // ルールを適用して速さを変更
        rule1(i); // 近くの群れの真ん中に向かおうとする
        rule2(i); // ボイドは他のボイドと距離を取ろうとする
        rule3(i); // ボイドは他のボイドの平均速度に合わせようとする
        // limit speed
        var b = boids[i];
        var speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed >= MAX_SPEED) {
            var r = MAX_SPEED / speed;
            b.vx *= r;
            b.vy *= r;
        }
        // 座標の更新
        b.x += b.vx;
        b.y += b.vy;
        // 壁の外に出てしまった場合速度を内側へ向ける
        if (b.x < 0 && b.vx < 0 || b.x > SCREEN_SIZE_X && b.vx > 0) b.vx *= -1;
        if (b.y < 0 && b.vy < 0 || b.y > SCREEN_SIZE_Y && b.vy > 0) b.vy *= -1;
    }
};

/**
 * ルール1: ボイドは近くに存在する群れの中心に向かおうとする
 */
var rule1 = function (index) {
    var c = {
        x: 0,
        y: 0
    }; // 自分を除いた群れの真ん中
    for (var i = 0, len = boids.length; i < len; ++i) {
        if (i != index) {
            c.x += boids[i].x;
            c.y += boids[i].y;
        }
    }
    c.x /= boids.length - 1;
    c.y /= boids.length - 1;
    boids[index].vx += (c.x - boids[index].x) / 100;
    boids[index].vy += (c.y - boids[index].y) / 100;
};

/**
 * ルール2: ボイドは隣のボイドとちょっとだけ距離をとろうとする
 */
var rule2 = function (index) {
    for (var i = 0, len = boids.length; i < len; ++i) {
        if (i != index) {
            var d = getDistance(boids[i], boids[index]); // ボイド間の距離
            //if (d < 5) {
            if (d < DOT_SIZE/2) {
                boids[index].vx -= boids[i].x - boids[index].x;
                boids[index].vy -= boids[i].y - boids[index].y;
            }
        }
    }
};

/**
 * ルール3: ボイドは近くのボイドの平均速度に合わせようとする
 */
var rule3 = function (index) {
    var pv = {
        x: 0,
        y: 0
    }; // 自分を除いた群れの平均速度
    for (var i = 0, len = boids.length; i < len; ++i) {
        if (i != index) {
            pv.x += boids[i].vx;
            pv.y += boids[i].vy;
        }

    }
    pv.x /= boids.length - 1;
    pv.y /= boids.length - 1;
    boids[index].vx += (pv.x - boids[index].vx) / 8;
    boids[index].vy += (pv.y - boids[index].vy) / 8;
};

/**
 * 2つのボイド間の距離
 */
var getDistance = function (b1, b2) {
    var x = Math.abs(b1.x - b2.x);
    var y = Math.abs(b1.y - b2.y);
    return Math.sqrt(x * x + y * y);
};
