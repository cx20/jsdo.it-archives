// forked from Szenia Zadvornykh's "Glitchy Rainbow Panda" http://codepen.io/zadvorsky/pen/iwemx

var DOT_SIZE = 15;
var X_START_POS = 100;
var Y_START_POS = 100;
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

function getRgbColor( c ) {
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

    const TWO_PI = Math.PI * 2;

// canvas settings
var viewWidth = 512,
    viewHeight = 512,
    glitchCanvas = document.getElementById("glitch_canvas"),
    ctx;

var image,
    glitchImageData,
    originalImageData,
    pixels;

// these control glitching, and are in turn controlled by TweenMax
var gvars = {
    waveAmp0:0,
    waveFrq0:1,
    waveOfs0:0,
    waveAmp1:0,
    waveFrq1:1,
    waveOfs1:0,
    pos0:0,
    pos1:0,
    pos2:0
};

var cosCache0 = [];
var cosCache1 = [];

window.onload = function() {
/*
    image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = imageLoaded;
    //image.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/panda.jpg';
    image.src = 'mario.png';
**/
    init();

    function init() {
        initCanvas();
        createImageData();
        processImageData();
        setupTweens();

        requestAnimationFrame(loop);
    }
};

function initCanvas() {
    glitchCanvas.width = viewWidth;
    glitchCanvas.height = viewHeight;
    ctx = glitchCanvas.getContext('2d');
}

// draw the image into the canvas and grab the pixel data
// the image is drawn with an offset, because the white border looks kinda nice
function createImageData() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, viewWidth, viewHeight);
//    ctx.drawImage(image, 32, 32, 448, 448);

    for(var i = 0; i < dataSet.length; i++) {
        var x = X_START_POS + (i % 16) * DOT_SIZE;
        var y = Y_START_POS + Math.floor(i / 16) * DOT_SIZE;
        var color = getRgbColor(dataSet[i]);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, DOT_SIZE - 2, DOT_SIZE - 2);
    }


    originalImageData = ctx.getImageData(0, 0, viewWidth, viewHeight);
    glitchImageData = ctx.getImageData(0, 0, viewWidth, viewHeight);

    ctx.clearRect(0, 0, viewWidth, viewHeight);
}
// split pixel data (red, green, blue, alpha) into pixels and make a grid
// alpha is ignored because it is always 255
function processImageData() {
    var data = originalImageData.data,
        pixelCount = data.length / 4,
        pixelIndex = 0,
        x, y;

    pixels = [];

    for (var i = 0; i < pixelCount; i++) {
        pixelIndex = i * 4;
        x = i % viewWidth;
        y = Math.floor(i / viewHeight);

        if (!pixels[y]) pixels[y] = [];

        pixels[y][x] = [
            data[pixelIndex + 0], // red
            data[pixelIndex + 1], // green
            data[pixelIndex + 2]  // blue
        ];
    }
}

function setupTweens() {
    var tl0 = new TimelineMax({repeat:-1, yoyo:true});
    tl0.to(gvars, 0.8, {waveAmp0:64, waveFrq0:16, waveOfs0:16, ease:Back.easeOut, delay:0.5});

    var tl1 = new TimelineMax({repeat:-1, yoyo:true});
    tl1.to(gvars, 2, {waveAmp1:128, waveFrq1:8, waveOfs1:64, ease:Elastic.easeIn, delay:0.25});

    var tl2 = new TimelineMax({repeat:-1, yoyo:true});
    tl2.to(gvars, 1, {pos0:256, ease:Bounce.easeInOut, delay:4});

    var tl3 = new TimelineMax({repeat:-1, yoyo:true});
    tl3.to(gvars, 5, {pos1:128, pos2:512, ease:Cubic.easeInOut, delay:2});
}

function update() {
    var data = glitchImageData.data,
        row,
        pixelIndex = 0;
    // fraction of x and y of width and height
    var fx, fy;
    // red, green and blue channel pixel coordinates
    var rx, ry,
        gx, gy,
        bx, by;

    var wave0Sin,
        wave1Sin,
        wave0Cos,
        wave1Cos,
        pos0,
        pos1,
        pos2;

    cosCache0.length = 0;
    cosCache1.length = 0;

    for (var y = 0; y < viewHeight; y++) {
        row = pixels[y];
        fy = y / viewHeight;

        wave0Sin = Math.sin(gvars.waveOfs0 + gvars.waveFrq0 * fy) * gvars.waveAmp0;
        wave1Sin = Math.sin(gvars.waveOfs1 + gvars.waveFrq1 * fy) * gvars.waveAmp1;
        pos1 = gvars.pos1 * fy;

        for (var x = 0; x < viewWidth; x++) {
            pixelIndex = (y * viewWidth + x) * 4;
            fx = x / viewWidth;

            if (cosCache0[x] !== undefined) {
              wave0Cos = cosCache0[x];
            }
            else {
              wave0Cos = Math.cos(gvars.waveOfs0 + gvars.waveFrq0 * fx) * gvars.waveAmp0;
              cosCache0[x] = wave0Cos;
            }

            if (cosCache1[x] !== undefined) {
              wave1Cos = cosCache1[x];
            }
            else {
              wave1Cos = Math.cos(gvars.waveOfs1 + gvars.waveFrq1 * fx) * gvars.waveAmp1;
              cosCache1[x] = wave1Cos;
            }

            pos0 = gvars.pos0 * fx;
            pos2 = gvars.pos2 * fx;

            // it really does not matter what you do here, it all looks glitchy :)
            // really, just put the operators and vars in any random combination (but be careful you don't divide by 0)
            // AND A WHOLE NEW GLITCHY MESS WILL EMERGE!
            rx = x + wave1Sin + pos0;
            ry = y + wave1Cos - pos2;
            gx = x - wave1Cos * pos1;
            gy = y - wave0Sin + pos1;
            bx = x + wave0Sin + pos0;
            by = y - wave0Sin * pos2;

            data[pixelIndex + 0] = getChannel(rx, ry, 0);
            data[pixelIndex + 1] = getChannel(gx, gy, 1);
            data[pixelIndex + 2] = getChannel(bx, by, 2);
        }
    }
}

function draw() {
    ctx.putImageData(glitchImageData, 0, 0);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function getChannel(x, y, c) {
    x = x | 0;
    y = y | 0;
    x = wrap(x, 0, viewWidth - 1);
    y = wrap(y, 0, viewHeight - 1);

    return pixels[y][x][c];
}

function wrap(v, min, max) {
    return (((v - min) % (max - min)) + (max - min)) % (max - min) + min;
}