var X_MAX = 400;
var Y_MAX = 400;
var RECT_SIZE = 50;
var pos = 1;
var auto = true;

var square = [
    // □(1個x1個) × 24
    {x:0, y:0, w:2, h:2 },
    {x:2, y:0, w:2, h:2 },
    {x:4, y:0, w:2, h:2 },
    {x:6, y:0, w:2, h:2 },
    {x:0, y:2, w:2, h:2 },
    {x:2, y:2, w:2, h:2 },
    {x:4, y:2, w:2, h:2 },
    {x:6, y:2, w:2, h:2 },
    {x:0, y:4, w:2, h:2 },
    {x:2, y:4, w:2, h:2 },
    {x:4, y:4, w:2, h:2 },
    {x:6, y:4, w:2, h:2 },
    {x:0, y:6, w:2, h:2 },
    {x:2, y:6, w:2, h:2 },
    {x:4, y:6, w:2, h:2 },
    {x:6, y:6, w:2, h:2 },

    {x:3, y:1, w:1, h:1 },
    {x:4, y:1, w:1, h:1 },
    {x:3, y:2, w:1, h:1 },
    {x:4, y:2, w:1, h:1 },
    {x:3, y:5, w:1, h:1 },
    {x:4, y:5, w:1, h:1 },
    {x:3, y:6, w:1, h:1 },
    {x:4, y:6, w:1, h:1 },

    // □(2個x2個) × 11
    {x:0, y:0, w:4, h:4 },
    {x:4, y:0, w:4, h:4 },
    {x:0, y:4, w:4, h:4 },
    {x:4, y:4, w:4, h:4 },

    {x:2, y:0, w:4, h:4 },
    {x:2, y:4, w:4, h:4 },
    {x:0, y:2, w:4, h:4 },
    {x:4, y:2, w:4, h:4 },
    {x:2, y:2, w:4, h:4 },

    {x:3, y:1, w:2, h:2 },
    {x:3, y:5, w:2, h:2 },
    // □(3個x3個) × 4
    {x:0, y:0, w:6, h:6 },
    {x:2, y:0, w:6, h:6 },
    {x:0, y:2, w:6, h:6 },
    {x:2, y:2, w:6, h:6 },

    // □(4個x4個) × 4
    {x:0, y:0, w:8, h:8 } 
];

function init() {
    var gui = new dat.GUI();
    gui.add(this, 'pos', 1, 40 ).step( 1 ).listen();
    gui.add(this, 'auto' ).listen();
    gui.closed = true;

    ctx = document.getElementById("canvas").getContext("2d");
    
    ctx.font = "24px 'ＭＳ ゴシック'";

    setInterval( draw, 500 );
}


function draw() {
    drawScreen();
    drawRect();
    lightRect();
    if ( auto ) {
        pos++;
        if ( pos > 40 ) {
           pos = 1;
        }
    }
}

function drawScreen() {
    ctx.clearRect( 0, 0, X_MAX, Y_MAX );
}

function drawRect() {
    ctx.strokeStyle = "#000000";
    var x, y, w, h;
    for ( var i = 0; i < square.length; i++ )
    {
        x = square[i].x * RECT_SIZE;
        y = square[i].y * RECT_SIZE;
        w = square[i].w * RECT_SIZE;
        h = square[i].h * RECT_SIZE;
        ctx.rect( x, y, w, h);
    }
    ctx.stroke();
}

function lightRect() {
    var x, y, w, h;

    x = square[pos-1].x * RECT_SIZE;
    y = square[pos-1].y * RECT_SIZE;
    w = square[pos-1].w * RECT_SIZE;
    h = square[pos-1].h * RECT_SIZE;
    //ctx.fillStyle = "#0000ff";
    ctx.fillStyle = "rgba(0, 0, 255, 0.1)";
    ctx.fillRect( x, y, w, h);
    
    var txt = pos.toString();
    var tm = ctx.measureText(txt);
    
    ctx.fillStyle = "#00ff00";
    ctx.fillText( txt, x + w/2 - tm.width/2, y + h/2 + 24/2);

}
