// forked from cx20's "Snap.svg でドット絵を描いてみるテスト" http://jsdo.it/cx20/kCUy

var X_MAX = window.innerWidth;
var Y_MAX = window.innerHeight;
var SCALE = Y_MAX / 465;
var s = Snap(X_MAX, Y_MAX);

var thetas = [
    {title:"　0 ",  theta:0},
    {title:"π/8",  theta:22.5},
    {title:"π/4",  theta:45},
    {title:"3π/8", theta:67.5},
    {title:"π/2",  theta:90},
    {title:"5π/8", theta:112.5},
    {title:"3π/4", theta:135},
    {title:"7π/8", theta:157.5},
    {title:"　π ", theta:180}
];

var ratios = [
    {title:"　1", a:1, b:1, times:1},
    {title:"　2", a:1, b:2, times:1},
    {title:"　3", a:1, b:3, times:1},
    {title:"　4", a:1, b:4, times:1},
    {title:"1/2", a:2, b:1, times:1},
    {title:"3/2", a:2, b:3, times:1},
    {title:"4/3", a:3, b:4, times:1},
    {title:"6/5", a:5, b:6, times:1},
    {title:"√2", a:Math.sqrt(2), b:1, times:6},
];

function animate() {
    Snap.animate(0, 360, function(val) {
        s.rect(0, 0, X_MAX, Y_MAX).attr({fill: "#fff"});
        var angle = val;
        drawMatrix();
        draw(angle);
    }, 5000, mina.linear, animate);
}

function drawMatrix() {
    var rows = ratios.length;
    var cols = thetas.length;

    s.rect(0, 0, X_MAX, Y_MAX).attr({fill: "#fff"});
    var x1, y1, x2, y2, title;
    for ( var col = 0; col <= cols; col++ ) {
        x1 = (col * 40 + 60) * SCALE;
        y1 = (60) * SCALE;
        x2 = (col * 40 + 60) * SCALE;
        y2 = (rows * 40 + 60) * SCALE;
        s.line(x1, y1, x2, y2).attr({stroke: "#369", strokeWidth: 1, fill: "none"});
        if ( col < cols ) {
            title = thetas[col].title;
            s.text(x2 + 5 * SCALE, 55 * SCALE, title ).attr({stroke: "#369", "font-size":12 * SCALE});
        }
    }
    for ( var row = 0; row <= rows; row++ ) {
        x1 = (60) * SCALE;
        y1 = (row * 40 + 60) * SCALE;
        x2 = (cols * 40 + 60) * SCALE;
        y2 = (row * 40 + 60) * SCALE;
        s.line(x1, y1, x2, y2).attr({stroke: "#369", strokeWidth: 1, fill: "none"});
        if ( row < rows ) {
            title = ratios[row].title;
            s.text(35 * SCALE, y2 + 25 * SCALE, title ).attr({stroke: "#369", "font-size":12 * SCALE});
        }
    }
}

function draw(angle) {
    var rows = ratios.length;
    var cols = thetas.length;

    for ( var row = 0; row < rows; row++ ) {
        for ( var col = 0; col < cols; col++ ) {
            var theta = thetas[col].theta + angle; 
            var base_x = (col * 40 + 80) * SCALE;
            var base_y = (row * 40 + 80) * SCALE;
            var a = ratios[row].a;
            var b = ratios[row].b;
            var scale = 15 * SCALE;
            var times = ratios[row].times;
            drawLissajous(base_x, base_y, theta, a, b, scale, times);
        }
    }
}

function drawLissajous(base_x, base_y, theta, a, b, scale, times) {
    var points = [];
    for (var t = 0; t <= 360*times; t += 5) {
        var x = scale * Math.sin(2 * Math.PI * (t) / 360 * a) + base_x;
        var y = -scale * Math.sin(2 * Math.PI * (t) / 360 * b + 2 * Math.PI*theta/360) + base_y;
        points.push(x, y);
    }
    s.polyline(points).attr({stroke: "#369", strokeWidth: 1, fill: "none"});
}

animate();
