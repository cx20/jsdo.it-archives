// forked from cx20's "HTML5 + Canvas で四角形を描くテスト" http://jsdo.it/cx20/sZm0p

var X_MAX = 400;
var Y_MAX = 400;
var X_POS = 200;
var Y_POS = 200;
var R = 100;
var pos = 1;
var auto = true;

var triangle = [
    { x1:  0, y1:-100, x2:-22, y2:-32, x3: 22, y3:-32 },
    { x1:-95, y1: -32, x2:-36, y2: 11, x3:-22, y3:-32 },
    { x1:-58, y1:  80, x2:  0, y2: 37, x3:-36, y3: 11 },
    { x1: 58, y1:  80, x2: 36, y2: 11, x3:  0, y3: 37 },
    { x1: 95, y1: -32, x2: 22, y2:-32, x3: 36, y3: 11 },
    
    { x1:  0, y1:  37, x2:-58, y2: 80, x3: 58, y3: 80 },
    { x1: 36, y1:  11, x2: 58, y2: 80, x3: 95, y3:-32 },
    { x1: 22, y1: -32, x2: 95, y2:-32, x3:  0, y3:-100},
    { x1:-22, y1: -32, x2:  0, y2:-100,x3:-95, y3:-32 },
    { x1:-36, y1:  11, x2:-95, y2:-32, x3:-58, y3: 80 },
    
    { x1:-36, y1:  11, x2:-58, y2: 80, x3: 58, y3: 80 },
    { x1:  0, y1:  37, x2: 58, y2: 80, x3: 95, y3:-32 },
    { x1: 36, y1:  11, x2: 95, y2:-32, x3:  0, y3:-100},
    { x1: 22, y1: -32, x2:  0, y2:-100,x3:-95, y3:-32 },
    { x1:-22, y1: -32, x2:-95, y2:-32, x3:-58, y3: 80 },
    
    { x1: 36, y1:  11, x2:-58, y2: 80, x3: 58, y3: 80 },
    { x1: 22, y1: -32, x2: 58, y2: 80, x3: 95, y3:-32 },
    { x1:-22, y1: -32, x2: 95, y2:-32, x3:  0, y3:-100},
    { x1:-36, y1:  11, x2:  0, y2:-100,x3:-95, y3:-32 },
    { x1:  0, y1:  37, x2:-95, y2:-32, x3:-58, y3: 80 },
    
    { x1:  0, y1:-100, x2:-58, y2: 80, x3: 36, y3: 11 },
    { x1:-95, y1: -32, x2: 58, y2: 80, x3: 22, y3:-32 },
    { x1:-58, y1:  80, x2: 95, y2:-32, x3:-22, y3:-32 },
    { x1: 58, y1:  80, x2:  0, y2:-100,x3:-36, y3: 11 },
    { x1: 95, y1: -32, x2:-95, y2:-32, x3:  0, y3: 37 },
    
    { x1:  0, y1:-100, x2:-58, y2: 80, x3: 58, y3: 80 },
    { x1:-95, y1: -32, x2: 58, y2: 80, x3: 95, y3:-32 },
    { x1:-58, y1:  80, x2: 95, y2:-32, x3:  0, y3:-100},
    { x1: 58, y1:  80, x2:  0, y2:-100,x3:-95, y3:-32 },
    { x1: 95, y1: -32, x2:-95, y2:-32, x3:-58, y3: 80 },
    
    { x1:  0, y1:-100, x2:-95, y2:-32, x3: 95, y3:-32 },
    { x1:-95, y1: -32, x2:-58, y2: 80, x3:  0, y3:-100},
    { x1:-58, y1:  80, x2: 58, y2: 80, x3:-95, y3:-32 },
    { x1: 58, y1:  80, x2: 95, y2:-32, x3:-58, y3: 80 },
    { x1: 95, y1: -32, x2:  0, y2:-100,x3: 58, y3: 80 }
];

function init() {
    var gui = new dat.GUI();
    gui.add(this, 'pos', 1, 35 ).step( 1 ).listen();
    gui.add(this, 'auto' ).listen();
    gui.closed = true;

    ctx = document.getElementById("canvas").getContext("2d");
    
    ctx.font = "24px 'ＭＳ ゴシック'";

    setInterval( draw, 500 );
}


function draw() {
    drawScreen();
    drawStar();
    lightTriangle();
    if ( auto ) {
        pos++;
        if ( pos > 35 ) {
           pos = 1;
        }
    }
}

function drawScreen() {
    ctx.clearRect( 0, 0, X_MAX, Y_MAX );
}

function drawStar() {
    ctx.strokeStyle = "#000000";
	var a = (72/360) * 2 * Math.PI;
	var t0 = (-90/360) * 2 * Math.PI;
	var p = [];
	for ( i = 0; i < 5; i++ ) {
		var t = -1 * i * a + t0;
		var x = R * Math.cos(t) + X_POS;
		var y = R * Math.sin(t) + Y_POS;
		p.push( { x:x, y:y });
	}

	ctx.beginPath();
	// 正五角形
	ctx.moveTo(p[0].x, p[0].y);
	ctx.lineTo(p[1].x, p[1].y);
	ctx.lineTo(p[2].x, p[2].y);
	ctx.lineTo(p[3].x, p[3].y);
	ctx.lineTo(p[4].x, p[4].y);
	ctx.lineTo(p[0].x, p[0].y);
	// 星形
	ctx.moveTo(p[0].x, p[0].y);
	ctx.lineTo(p[2].x, p[2].y);
	ctx.lineTo(p[4].x, p[4].y);
	ctx.lineTo(p[1].x, p[1].y);
	ctx.lineTo(p[3].x, p[3].y);
	ctx.lineTo(p[0].x, p[0].y);
	ctx.stroke();
}

function lightTriangle() {
    var x0 = Math.floor( triangle[pos-1].x1 + triangle[pos-1].x2 + triangle[pos-1].x3 ) / 3 + X_POS;
    var y0 = Math.floor( triangle[pos-1].y1 + triangle[pos-1].y2 + triangle[pos-1].y3 ) / 3 + Y_POS;
    var x1 = triangle[pos-1].x1 + X_POS;
    var y1 = triangle[pos-1].y1 + Y_POS;
    var x2 = triangle[pos-1].x2 + X_POS;
    var y2 = triangle[pos-1].y2 + Y_POS;
    var x3 = triangle[pos-1].x3 + X_POS;
    var y3 = triangle[pos-1].y3 + Y_POS;

    ctx.fillStyle = "rgba(0, 0, 255, 0.1)";
    ctx.beginPath();
    ctx.moveTo( x1, y1 );
    ctx.lineTo( x2, y2 );
    ctx.lineTo( x3, y3 );
    ctx.lineTo( x1, y1 );
    ctx.closePath();
    ctx.fill();

    var txt = pos.toString();
    var tm = ctx.measureText(txt);
    
    ctx.fillStyle = "#00ff00";
    ctx.fillText( txt, x0 - tm.width/2, y0 + 24/2);
}
