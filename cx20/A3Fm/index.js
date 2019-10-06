// forked from haii's "にょんっ" http://jsdo.it/haii/A40q
// forked from haii's "回す" http://jsdo.it/haii/hVDY

var DOT_SIZE = 4;
var X_START_POS = -30;
var Y_START_POS = -40;

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

var
    canvas = document.body.appendChild(document.createElement('canvas')),
    ctx = canvas.getContext('2d'),
    scale;

// 周期1の色相環から '#rrggbb' 形式で色を取得
function hue(x) {
    var n = x % 1 * 6, m = n % 1 * 256;
    return '#' + (
        n < 1?
            0x1ff0000 + (m << 8):
        n < 2?
            0x1ffff00 - (m << 16):
        n < 3?
            0x100ff00 + (m << 0):
        n < 4?
            0x100ffff - (m << 8):
        n < 5?
            0x10000ff + (m << 16):
        // else
            0x1ff00ff - (m << 0)
    ).toString(16).slice(1);
}

// 描画
function draw(ctx) {
    var
        PI2 = Math.PI * 2,
        GR = Math.PI * (3 - Math.sqrt(5)), // 黄金角
        t = new Date() / 1000, i, j, n;

    ctx.globalAlpha = 0.5;
    ctx.scale(0.0045, 0.003);

    var x, y;
    for ( i = 0; i < dataSet.length; i++) {
        x = Math.floor(i % 16) * DOT_SIZE;
        y = (i / 16) * DOT_SIZE;
        ctx.save();
        ctx.translate(X_START_POS, y);

        for (j = (y - 5); j < (y + 5); j++) {
            n = t * 0.3 + x * 0.43 + j * j * 0.02;

            if ( dataSet[i] != "無" ) {
                ctx.save();
                ctx.translate(x, Y_START_POS);
                ctx.rotate(n % PI2);
                ctx.fillStyle = getRgbColor( dataSet[i] );
                ctx.fillRect(-DOT_SIZE/2, -DOT_SIZE/2, +DOT_SIZE/2, +DOT_SIZE/2);
            ctx.restore();
            }
        }

        ctx.restore();
    }
}

// メインループ
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.scale(scale, scale);

    draw(ctx);

    ctx.restore();
}

// リサイズ時
addEventListener('resize', function resize() {
    scale = Math.max(
        (canvas.width = document.documentElement.clientWidth) * 2,
        (canvas.height = document.documentElement.clientHeight) * 3
    );

    loop();
    return resize;
}(), false);

setInterval(loop, 16);