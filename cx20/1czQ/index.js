// forked from haii's "毬" http://jsdo.it/haii/bUU0

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

// Appのコンストラクタ
function App(canvas) {
    this.canvas = canvas;
    //this.maris = new Array(10);
    this.maris = [];
    this.init();
}

App.prototype = {
    // 初期化
    init: function() {
        // 毬を作る
/*
        for (var i = 0; i < this.maris.length; i++) {
            this.maris[i] = new Mari(this.canvas);
        }
*/
		var x, y;
        var color;
        for ( var i = 0; i < dataSet.length; i++ ) {
            x = X_START_POS + (i % 16) * DOT_SIZE;
            y = Y_START_POS + Math.floor( i / 16 ) * DOT_SIZE;
            color = getRgbColor( dataSet[i] );
            if ( dataSet[i] != "無" ) {
                this.maris.push( new Mari(this.canvas, x, y, DOT_SIZE/2, color) );
            }
        }
    },

    // 移動
    move: function() {
        // 毬を動かす
        for (var i = 0, mari; (mari = this.maris[i]); i++) {
            mari.move();
        }
    },

    // 描画
    draw: function(ctx) {
        // 背景を描く
        ctx.fillStyle = '#112';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 毬を描く
        for (var i = 0, mari; (mari = this.maris[i]); i++) {
            mari.draw(ctx);
        }
    }
};


// 毬のコンストラクタ
function Mari(canvas, x, y, radius, color) {
    this.canvas = canvas;
    this.path = new Array(30);

    this.init(x, y, radius, color);
}

Mari.prototype = {
    // 初期化
    init: function(x, y, radius, color) {
/*
        // 毬の半径
        this.radius = 50;
        if (Math.random() > 0.9) this.radius = 80; // 時々少し大きいものを出現させる

        // 座標、回転、色
        this.x = Math.random() * this.canvas.width;
        this.y = -this.radius;
        this.rotation = Math.PI * 2;
        this.color = '#' + (4096 + Math.random() * 4096 | 0).toString(16).slice(1); // #000～#fff
*/
        // 毬の半径
        this.radius = radius;

        // 座標、回転、色
        this.x = x;
        this.y = y;
        this.rotation = Math.PI * 2;
        this.color = color;

        // 模様
        for (var i = 0; i < this.path.length; i++) {
            this.path[i] = Math.random() * Math.PI * 2;
        }

        // 速度
        this.vx = Math.random() * 4 + 4;
        if (this.x > this.canvas.width * 0.5) this.vx = -this.vx; // なるべく画面の中央へ向かわせる
        this.vy = Math.random() + 5;
        this.vrotation = Math.random() * 0.4 - 0.2;

        // 壁で跳ね返ったか
        this.bound = false;
    },

    // 移動
    move: function() {
        // 動かす
        this.vy += 1;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.vrotation;

        // 床で跳ね返す
        if (this.y > this.canvas.height - this.radius) {
            this.y = this.canvas.height - this.radius;
            this.vy = -this.vy * 0.9;
            this.vrotation = Math.random() * 0.4 - 0.2;
        }

        // 壁で跳ね返す
        if (!this.bound && (this.x < this.radius || this.x > this.canvas.width - this.radius)) {
            this.vx = -this.vx;
            this.bound = true;
        }

        // 画面外へ出たら初期化
        if (this.x < -this.radius || this.x > this.canvas.width + this.radius) {
            this.init();
        }
    },

    // 描画
    draw: function(ctx) {
        // スタイルを設定する
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'bevel';
        ctx.beginPath();

        // 外側の円
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        // 内側の模様
        ctx.moveTo(this.getPx(0), this.getPy(0));
        for (var i = 0; i < this.path.length; i++) {
            ctx.lineTo(this.getPx(this.path[i]), this.getPy(this.path[i]));
        }
        ctx.closePath();

        // 描画
        ctx.stroke();
    },

    // 円周上の地点のX座標
    getPx: function(t) {
        return this.x + Math.cos(this.rotation + t) * this.radius;
    },

    // 円周上の地点のY座標
    getPy: function(t) {
        return this.y - Math.sin(this.rotation + t) * this.radius;
    }
};


var canvas, ctx, app, canvasFitly = true, cursorTimer, cursorLocked = false;

// 画面読み込み時
window.onload = function() {
    // Canvasとcontextを取得する
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');

    // appを作る
    app = new App(canvas);

    // インターバル設定
    setInterval(oninterval, 1000 / 30);

    // リサイズ処理とインターバル処理を呼び出す
    window.onresize();
    oninterval();
};

// インターバル
function oninterval() {
    // appを動かして描画
    app.move();
    app.draw(ctx);
}

// マウスボタン押下時
window.onmousedown = function() {
    // 画面サイズの設定を変更
    canvasFitly = !canvasFitly;
    window.onresize();

    // ドラッグしたときにCanvasが選択状態にならないようにする
    return false;
};

// マウス移動時
window.onmousemove = function() {
    // カーソル非表示にしたタイミングでonmousemoveが呼ばれるので対策
    if (cursorLocked) {
        cursorLocked = false;
        return;
    }

    // マウスカーソルを表示する
    document.documentElement.style.cursor = 'auto';

    // 一定時間経過したらマウスカーソルを非表示にする
    clearTimeout(cursorTimer);
    cursorTimer = setTimeout(function() {
        document.documentElement.style.cursor = 'none';
        cursorLocked = true;
    }, 1000);
};

// 画面リサイズ時
window.onresize = function() {
    // 画面とCanvasのサイズを取得
    var
        wh = document.documentElement.clientHeight,
        ww = document.documentElement.clientWidth,
        ch = canvas.height,
        cw = canvas.width,
        dh = ch,
        dw = cw;

    // リサイズ後のCanvasサイズを計算
    if (canvasFitly) {
        if (cw / ch < ww / wh) {
            dh = wh;
            dw = wh * cw / ch;
        } else {
            dh = ww * ch / cw;
            dw = ww;
        }
    }

    // Canvasをリサイズして中央へ移動
    canvas.style.top = (wh - dh >> 1) + 'px';
    canvas.style.left = (ww - dw >> 1) + 'px';
    canvas.style.height = dh + 'px';
    canvas.style.width = dw + 'px';
};