// forked from haii's "星空の世界" http://jsdo.it/haii/5vSL

var DOT_SIZE = 1;

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

var colorSet = [ "無", "白", "肌", "茶", "赤", "黄", "緑", "水", "青", "紫" ];

/*jslint browser: true, bitwise: true, continue: true */
(function () {
    'use strict';

    // http://ja.wikipedia.org/wiki/Xorshift
    function xor128(x, y, z, w) {
        x = x || 123456789;
        y = y || 362436069;
        z = z || 521288629;
        w = w || 88675123;

        return function () {
            var t = x ^ (x << 11);
            x = y;
            y = z;
            z = w;
            w = (w ^ (w >>> 19)) ^ (t ^ (t >>> 8));
            return w;
        };
    }

    window.canvas = document.getElementsByTagName('canvas')[0];
    window.ctx = window.canvas.getContext('2d');
    
    // ドット絵を描画
    function drawMario( ctx, x0, y0 ) {
        var baseColor = colorSet[Math.floor( Math.random() * 10 )];
        for ( var i = 0; i < dataSet.length; i++ ) {
            var x = x0 + ( i % 16 ) * DOT_SIZE;
            var y = y0 + Math.floor( i / 16 ) * DOT_SIZE;
            if ( dataSet[i] != "無" ) {
                ctx.fillStyle = getRgbColor( dataSet[i], baseColor );
                ctx.fillRect( x, y, DOT_SIZE*0.8, DOT_SIZE*0.8 );
            }
        }
    }

    // メインループ
    setInterval(function () {
        var scale, grad, i, j, p, x, y, z, w, a, tmp,
            canvas = window.canvas,
            ctx = window.ctx,
            PI2 = Math.PI * 2,
            t = new Date() / 1000,
            random = xor128(),

            // 回転量
            r1 = t, r2 = 2.4, r3 = t * 0.2,
            r1c = Math.cos(r1), r1s = Math.sin(r1),
            r2c = Math.cos(r2), r2s = Math.sin(r2);

        // キャンバスの中央に描画するようにする
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        scale = Math.max(canvas.width, canvas.height);
        ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
        ctx.scale(scale, scale);

        // 背景描画
        grad = ctx.createLinearGradient(-1, -2, 1, 2);
        grad.addColorStop(0.0, 'hsl(' + ((t * 5 + 90) % 360 | 0) + ',80%,50%)');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1.0, 'hsl(' + (t * 5 % 360 | 0) + ',80%,50%)');
        ctx.fillStyle = grad;
        ctx.fillRect(-0.5, -0.5, 1, 1);
        ctx.rotate(r3 % PI2);

        for (i = 0; i < 360; i += 5) {
            // 座標を決める
            p = random();
            x = (p & 0xff) / 128 - 1;
            y = (p >>> 8 & 0xff) / 128 - 1;
            z = (p >>> 16 & 0xff) / 128 - 1;
            w = (p >>> 24 & 0xff) / 256;

            // Z座標を時間によって移動する
            z += t * 0.5;
            z = (z + 1) % 2 - 1;

            // 透明度を決める
            a = (z + 1) * 0.5;
            if (a < 0.9) {
                ctx.globalAlpha = a / 0.9;
            } else {
                a -= 0.9;
                ctx.globalAlpha = 1 - a / 0.1;
            }

            // Z軸回転
            tmp = x * r1c + y * r1s;
            y = x * r1s - y * r1c;
            x = tmp;

            // X軸回転
            tmp = y * r2c + z * r2s;
            z = y * r2s - z * r2c;
            y = tmp;

            // 透視投影
            z -= 0.75;
            if (z >= 0) { continue; }
            scale = 0.15 / z;
            x *= scale;
            y *= scale;

            // ドット絵を描画
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scale * 0.02, scale * 0.02);
            ctx.rotate(w * PI2);
            drawMario( ctx, x, y );
            ctx.restore();
        }
    }, 100);
}());