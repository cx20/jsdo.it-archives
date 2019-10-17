// forked from haii's "風" http://jsdo.it/haii/AmIi
// forked from haii's "うねり" http://jsdo.it/haii/oJUg

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

var SCREEN_WIDTH = 10;
var SCREEN_HEIGHT = 10;

var random = function (i) {
    i += 12345678;
    i ^= i << 5 ^ i >> 3;
    i += 87654321;
    i ^= i << 2 ^ i >> 1;
    return (i & 255) / 256;
};
var noise = function (x, y, z) {
    var i = Math.floor(x), t = x - i, u = 1 - t, a, b, c;
    switch (arguments.length) {
    case 1:
        a = random(i);
        b = random(i + 1);
        c = random(i + 2);
        break;
    case 2:
        y += i * 10;
        a = noise(y);
        b = noise(y + 10);
        c = noise(y + 20);
        break;
    case 3:
        z += i * 100;
        a = noise(y, z);
        b = noise(y, z + 100);
        c = noise(y, z + 200);
        break;
    }
    a = (a + b) * 0.5;
    c = (b + c) * 0.5;
    return (a * u + b * t) * u + (b * u + c * t) * t;
};

var drawMario = function( ctx, base_x, base_y, base_color, size) {
    for (var i = 0; i < dataSet.length; ++i) {
        var x = base_x + (i % 16) * size;
        var y = base_y + Math.floor(i / 16) * size;
        var color = getRgbColor(dataSet[i]);
        if (dataSet[i] != "無") {
            if ( dataSet[i] == "赤" || dataSet[i] == "青" ) {
                color = base_color;
            }
            ctx.fillStyle = color;
            ctx.fillRect(x, y, size, size);
        }
    }
};

(function loop() {
    var scale, x, y, z,
        canvas = document.getElementsByTagName('canvas')[0],
        ctx = canvas.getContext('2d'),
        t = Number(new Date()) / 1000;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scale = Math.max(canvas.width / SCREEN_WIDTH, canvas.height / SCREEN_HEIGHT);
    ctx.translate(0.5 * canvas.width, 0.5 * canvas.height);
    ctx.scale(scale, scale);
    ctx.translate(-0.5 * SCREEN_WIDTH, -0.5 * SCREEN_HEIGHT);

    for (y = 0; y <= SCREEN_HEIGHT; y += 1) {
        for (x = 0; x <= SCREEN_WIDTH; x += 1) {
            z = noise(x * 0.02 + t * 0.2, y * 0.5) * 720;
            z += random(x * 10 + y * 100) * 10;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(z * 0.2);
/*
            ctx.fillStyle = 'hsl(' + z + ',90%,65%)';
            ctx.fillRect(-0.4, -0.4, 0.8, 0.8);
*/
            drawMario(ctx, -0.4, -0.4, 'hsl(' + z + ',90%,65%)', 0.8/16.0 );
            ctx.restore();
        }
    }

    window.requestAnimationFrame(loop);
}());
