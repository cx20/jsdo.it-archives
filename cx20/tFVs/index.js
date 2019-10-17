// forked from Nick Sheffield's "Dot grid" http://codepen.io/nicksheffield/pen/RNgmmb/

var DOT_SIZE = 5;
var X_START_POS = 40;
var Y_START_POS = 40;

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

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var stage = document.getElementById('stage'),
    ctx = stage.getContext('2d'),
    particles = [];


var radius = DOT_SIZE, // how large to draw the particle
    speed = 5, // how fast the particle should move
    variance = 1, // the maximum number of variance that can occur in directions along an axis (1 = 20 possible amounts)
    count = 256; // how many particles to generate

yPos = (variance * -1) + 0.1;
xPos = (variance * -1) + 0.1;

// set the canvas to the size of the window
stage.width = window.innerHeight;
stage.height = window.innerHeight;

for (var i = 0; i < count; i++) {
    // create a new particle
    var p = {};

    // place the particle in the center
    p.x = stage.width / 2 + X_START_POS;
    p.y = stage.height / 2 + Y_START_POS;
    if ( dataSet[i] != "無" ) {
        p.color = getRgbColor(dataSet[i]);
    } else {
        p.color = getRandomColor();
    }

    // set the particles direction of motion
    p.xVel = speed * xPos;
    p.yVel = speed * yPos;

    xPos = parseFloat(xPos.toFixed(1)) + 0.1;

    if (xPos == 0.7) {
        xPos = (variance * -1) + 0.1;
        yPos = parseFloat(yPos.toFixed(1)) + 0.1;
    }

    // add the particle to an array
    particles.push(p);
}

// this function runs once a frame
function render() {
    // clear the canvas
    ctx.clearRect(0, 0, stage.width, stage.height);

    // calculate the new positions of, then draw, each particle
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // move the particle along its chosen direction
        p.x += p.xVel;
        p.y += p.yVel;

        // reverse the x or y direction of the particle if it hits the walls
        if (p.x + radius / 2 > stage.width)
            p.xVel = Math.abs(p.xVel) * -1;

        if (p.x - radius / 2 < 0)
            p.xVel = Math.abs(p.xVel);

        if (p.y + radius / 2 > stage.height)
            p.yVel = Math.abs(p.yVel) * -1;

        if (p.y - radius / 2 < 0)
            p.yVel = Math.abs(p.yVel);

        // draw the particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = p.color; // '#fff';
        ctx.fill();
    }
}

// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


(function animloop() {
    requestAnimFrame(animloop);
    render();
})();
