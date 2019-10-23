// forked from http://codepen.io/deepmagic/pen/KwDhE
// knobs
var numpts = 100;
var speed = 0.4;
var spirocoeff = 3;
var space = 10;

//<><><><><><>
var ctx, pt, dist = 100,
    points = [],
    ct = 0,
    xx = xxx = 1,
    yy = yyy = 1;
var camera, last = new Date().getTime();

function Point(x, y, z, scale, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0.001;
    this.scale = scale || 1;
    this.color = color || "#fff";
}

function render() {
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgb( 0, 0, 0 )";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (var i = 0; i < points.length; i++) {
        pt = project(points[i]);
        drawCircle(pt.x, pt.y, pt.scale, 1, points[i].color);
    }

    animate();
    requestAnimFrame(render);
}

function animate(time) {
    var time = new Date().getTime();
    var t = (time - last) / 1000;
    for (var i = 0; i < points.length; i++) {

        points[i].z += speed * t;
        points[i].x = Math.sin(xxx) * Math.sin(points[i].z * spirocoeff);
        points[i].y = Math.sin(yyy) * Math.cos(points[i].z * spirocoeff);

        if (points[i].z >= numpts / space) {
            points.splice(i, 1);
            points.push(new Point(0, 0, 0, 1, 'hsl(' + String((ct / numpts) * 360) + ',100%,50%)'));
            ct++;
            if (ct > numpts) {
                ct = 0;
            }
        }
    }
    last = time;
}

function drawCircle(x, y, r, w, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
}

function project(pt) {
    p = {};
    p.x = ctx.canvas.width / 2 + (pt.x * (dist / pt.z));
    p.y = ctx.canvas.height / 2 + (pt.y * (dist / pt.z));
    p.scale = (dist / pt.z);
    return p;
}

function init() {
    points = [];
    for (var i = 0; i < numpts; i++) {
        points.push(new Point(0, 0, i / space, 1, 'hsl(' + String((i / numpts) * 360) + ',100%,50%)'));
    }
}

window.addEventListener('load', onLoad, false);

function onLoad(evt) {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.onresize = function() {
        ctx.canvas.height = window.innerHeight; // document.body.offsetHeight;
        ctx.canvas.width = window.innerWidth; // document.body.offsetWidth;
    };
    window.onresize();

    canvas.addEventListener('mousemove', function(evt) {
        xxx = (((evt.layerX || evt.offsetX || evt.clientX) - ctx.canvas.width / 2) / ctx.canvas.width) * Math.PI;
        yyy = (((-evt.layerY || evt.offsetY || evt.clientY) - ctx.canvas.height / 2) / ctx.canvas.height) * Math.PI;
    });

    init();
    render();
}


var gui = new dat.GUI();
gui.close();
var c = gui.add(window, "numpts", 1, 2000);
var cc = gui.add(window, "spirocoeff", 1, 40);
var ccc = gui.add(window, "speed", 0.001, 3.00);
var cccc = gui.add(window, "space", 1, 100);

var to;
c.onChange(function(value) {
    clearTimeout(to);
    to = setTimeout(init, 500);
});

var to2;
cccc.onChange(function(value) {
    clearTimeout(to);
    to2 = setTimeout(init, 500);
});

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();