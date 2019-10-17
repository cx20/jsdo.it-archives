// forked from Robert Lemon’ｓ "Bored. Move your mouse." http://codepen.io/rlemon/pen/zdvxs

var X_MAX = 440;
var Y_MAX = 440;
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

function Block(x, y, s, c) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;

    this.static = true;
    this.vx = 0;
    this.vy = 0;

    this.o = 1;

    this.sx = x;
    this.sy = y;
}
Block.prototype = {
    constructor: Block,
    update: function () {
        this.x += this.vx;
        this.y += this.vy;

        this.vy += settings.gravity;
        this.vx += settings.wind;

        if (this.vy > settings.max_velocity) {
            this.vy = settings.max_velocity;
        }
        if (this.vx > settings.max_velocity) {
            this.vx = settings.max_velocity;
        }
        this.o = 1 - ((Date.now() - this.start) / settings.lifespan);
        console.log( 1 - ((this.start - Date.now()) / settings.lifespan));
    },
    reset: function () {
        this.x = this.sx;
        this.y = this.sy;
        this.static = true;
        this.o = 0;
        this.vx = 0;
        this.vy = 0;
    },
    render: function (context) {
        context.beginPath();
        context.globalAlpha = this.o;
        context.rect(this.x - this.s / 2, this.y - this.s / 2, this.s, this.s);
        context.fillStyle = this.c;
        context.fill();
        context.closePath();
    }
};

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    height, width, settings, blocks, size;
setTimeout(init, 10);
function init() {
    height = canvas.height = document.body.offsetHeight;
    width = canvas.width = document.body.offsetWidth;
    settings = {
        gravity: .1,
        wind: 0,
        max_velocity: 3,
        lifespan: 2500
    };
    blocks = [];
/*
    size = width / 24 | 0;
    for (var y = 24; y >= 0; y--) {
        for (var x = 0; x < width + size; x += size) {
            blocks.push(new Block(x, y * size, size, color()));
        }
    }
*/
    size = width / 24 | 0;
    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * DOT_SIZE + X_START_POS;
        var y = (Math.floor( i / 16 )) * DOT_SIZE + Y_START_POS;
        if ( dataSet[i] != "無" ) 
        {
        var color = getRgbColor( dataSet[i] );
        blocks.push(new Block(x, y, DOT_SIZE * 0.9, color));
        }
    }
    update();
    render();
    canvas.onmousemove = listen;
}
function color() {
    return 'rgb(' + (Math.random() * 127|0) + ',' + (Math.random() * 127|0) + ',' + (Math.random() * 127|0) + ')';
}
function listen(e) {
    var ex = e.clientX,
        ey = e.clientY,
        t = size / 4;
    for (var i = 0, l = blocks.length; i < l; i++) {
        if (!blocks[i].static) {
            continue;
        }
        var b = blocks[i],
            hs = b.s / 2,
            bx1 = b.x - hs,
            bx2 = b.x + hs,
            by1 = b.y - hs,
            by2 = b.y + hs;
        if (ex >= bx1 && ex <= bx2 && ey >= by1 && ey <= by2) {
            blocks[i].static = false;
            blocks[i].vx = Math.random() * 4 - 2;
            blocks[i].vy = Math.random() * 4 - 2;
            blocks[i].start = Date.now();
            return;
        }
    }
}

function update() {
    for (var i = 0, l = blocks.length; i < l; i++) {
        if (blocks[i].o < 1) {
            blocks[i].o += .05;
        }
        if (blocks[i].static) {
            continue;
        }
        var now = Date.now();
        if (now - blocks[i].start > settings.lifespan) {
            blocks[i].reset();
            continue;
        }
        blocks[i].update();
    }
    setTimeout(update, 1000 / 60);
}

function render() {
    context.clearRect(0, 0, width, height);
    for (var i = 0, l = blocks.length; i < l; i++) {
        blocks[i].render(context);
    }
    requestAnimationFrame(render);
}
