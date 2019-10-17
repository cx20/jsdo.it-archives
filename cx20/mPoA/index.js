// forked from Tim Holman's "Interactive image nodes" http://codepen.io/tholman/pen/AmptL

var DOT_SIZE = 16;
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

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[vendors[x] + 'CancelAnimationFrame'] || 
                                       window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

var Nodes = {
    // Settings
    density: DOT_SIZE,

    drawDistance: 24,
    baseRadius: 4,
    maxLineThickness: 4,
    reactionSensitivity: 3,
    lineThickness: 1,

    points: [],
    mouse: {
        x: -1000,
        y: -1000,
        down: false
    },

    animation: null,

    canvas: null,
    context: null,

    imageInput: null,
    bgCanvas: null,
    bgContext: null,

    init: function () {
        // Set up the visual canvas 
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.context.globalCompositeOperation = "lighter";
        
        this.imageInput = document.createElement('input');
        this.imageInput.setAttribute('type', 'file');
        this.imageInput.style.visibility = 'hidden';
        this.imageInput.addEventListener('change', this.upload, false);
        document.body.appendChild(this.imageInput);

        this.canvas.addEventListener('mousemove', this.mouseMove, false);
        this.canvas.addEventListener('mousedown', this.mouseDown, false);
        this.canvas.addEventListener('mouseup', this.mouseUp, false);
        this.canvas.addEventListener('mouseout', this.mouseOut, false);

        window.onresize = function (event) {
            Nodes.onWindowResize();
        };

        this.drawImageToBackground();
    },

    preparePoints: function () {

        // Clear the current points
        this.points = [];
        var width, height, i, j;

        var x, y;
        for (i = 0; i < dataSet.length; i++) {
            if (dataSet[i] != "無") {
                color = getRgbColor(dataSet[i]);
                x = i % 16 * this.density + X_START_POS;
                y = Math.floor(i / 16) * this.density + Y_START_POS;
                this.points.push({
                    x: x,
                    y: y,
                    originalX: x,
                    originalY: y,
                    color: color
                });
            }
        }
    },

    updatePoints: function () {

        var i, currentPoint, theta, distance;

        for (i = 0; i < this.points.length; i++) {

            currentPoint = this.points[i];

            theta = Math.atan2(currentPoint.y - this.mouse.y, currentPoint.x - this.mouse.x);

            if (this.mouse.down) {
                distance = this.reactionSensitivity * 200 / Math.sqrt(
                    (this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
                    (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y));
            } else {
                distance = this.reactionSensitivity * 100 / Math.sqrt(
                    (this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
                    (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y));
            }

            currentPoint.x += Math.cos(theta) * distance + (currentPoint.originalX - currentPoint.x) * 0.05;
            currentPoint.y += Math.sin(theta) * distance + (currentPoint.originalY - currentPoint.y) * 0.05;
        }
    },

    drawLines: function () {

        var i, j, currentPoint, otherPoint, distance, lineThickness;

        for (i = 0; i < this.points.length; i++) {

            currentPoint = this.points[i];

            // Draw the dot.
            this.context.fillStyle = currentPoint.color;
            this.context.strokeStyle = currentPoint.color;

            for (j = 0; j < this.points.length; j++) {

                // Distaqnce between two points.
                otherPoint = this.points[j];

                if (otherPoint == currentPoint) {
                    continue;
                }

                distance = Math.sqrt((otherPoint.x - currentPoint.x) * (otherPoint.x - currentPoint.x) +
                    (otherPoint.y - currentPoint.y) * (otherPoint.y - currentPoint.y));

                if (distance <= this.drawDistance) {

                    this.context.lineWidth = (1 - (distance / this.drawDistance)) * this.maxLineThickness * this.lineThickness;
                    this.context.beginPath();
                    this.context.moveTo(currentPoint.x, currentPoint.y);
                    this.context.lineTo(otherPoint.x, otherPoint.y);
                    this.context.stroke();
                }
            }
        }
    },

    drawPoints: function () {

        var i, currentPoint;

        for (i = 0; i < this.points.length; i++) {

            currentPoint = this.points[i];

            // Draw the dot.
            this.context.fillStyle = currentPoint.color;
            this.context.strokeStyle = currentPoint.color;

            this.context.beginPath();
            this.context.arc(currentPoint.x, currentPoint.y, this.baseRadius, 0, Math.PI * 2, true);
            this.context.closePath();
            this.context.fill();
        }
    },

    draw: function () {
        this.animation = requestAnimationFrame(function () {
            Nodes.draw();
        });

        this.clear();
        this.updatePoints();
        this.drawLines();
        this.drawPoints();

    },

    clear: function () {
        this.canvas.width = this.canvas.width;
    },

    // Image is loaded... draw to bg canvas
    drawImageToBackground: function () {

        this.bgCanvas = document.createElement('canvas');
        var newWidth, newHeight;

        // Draw to background canvas
        this.bgContext = this.bgCanvas.getContext('2d');
        this.preparePoints();
        this.draw();
    },

    mouseDown: function (event) {
        Nodes.mouse.down = true;
    },

    mouseUp: function (event) {
        Nodes.mouse.down = false;
    },

    mouseMove: function (event) {
        Nodes.mouse.x = event.offsetX || (event.layerX - Nodes.canvas.offsetLeft);
        Nodes.mouse.y = event.offsetY || (event.layerY - Nodes.canvas.offsetTop);
    },

    mouseOut: function (event) {
        Nodes.mouse.x = -1000;
        Nodes.mouse.y = -1000;
        Nodes.mouse.down = false;
    },

    // Resize and redraw the canvas.
    onWindowResize: function () {
        cancelAnimationFrame(this.animation);
        this.drawImageToBackground();
    }
};

Nodes.init();
