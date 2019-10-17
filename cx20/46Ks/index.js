// forked from cx20's "pixi.js でドット絵を変形させるテスト" http://jsdo.it/cx20/3vKz

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

function getRgbColor( c, baseColor )
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

    if ( c == "赤" || c == "青" ) {
        return colorHash[ baseColor ];
    } else {
        return colorHash[ c ];
    }
}

function getSingleLightColor( c, baseColor, rgbType )
{
    var result = "";

    var rgb = getRgbColor( c, baseColor );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );

    switch ( rgbType )
    {
    case 'r':
        result = r;
        break;
    case 'g':
        result = g;
        break;
    case 'b':
        result = b;
        break;
    }
    //console.log( result );
    return result;
}

var marioImage = [];
function initMario( baseColor ) {
    var canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData( 16, 16 );
    for ( var i =0; i < image.data.length; i += 4 ) {
        if ( dataSet[i/4] != "無" ) {
            image.data[i  ] = getSingleLightColor( dataSet[i/4], baseColor, "r" );
            image.data[i+1] = getSingleLightColor( dataSet[i/4], baseColor, "g" );
            image.data[i+2] = getSingleLightColor( dataSet[i/4], baseColor, "b" );
            image.data[i+3] = 255;
        }
    }
    ctx.putImageData( image, 0, 0 );
    marioImage[baseColor] = canvas.toDataURL();
}


$(window).resize(resize);
window.onorientationchange = resize;

document.addEventListener('DOMContentLoaded', start, false);

var w = 440;    // 1024;
var h = 440;    // 768;

//var n = 2000;
var n = 256;        // ドット数（16x16）
var d = 1;
var current = 0;
//var objs = 17;
var objs = 2;        // 変形パターンの数
var vx = 0;
var vy = 0;
var vz = 0;
var points1 = [];    // x
var points2 = [];    // y
var points3 = [];    // z
var tpoint1 = [];
var tpoint2 = [];
var tpoint3 = [];
var balls = [];

function start() {
    
    initMario("無");
    initMario("白");
    initMario("肌");
    initMario("茶");
    initMario("赤");
    initMario("黄");
    initMario("緑");
    initMario("水");
    initMario("青");
    initMario("紫");
    
    //var ballTexture = new PIXI.Texture.fromImage("assets/pixel.png");
    var ballTexture = { 
/*
        "無":new PIXI.Texture.fromImage("assets/black.png"),
        "白":new PIXI.Texture.fromImage("assets/white.png"),
        "肌":new PIXI.Texture.fromImage("assets/beige.png"),
        "茶":new PIXI.Texture.fromImage("assets/brown.png"),
        "赤":new PIXI.Texture.fromImage("assets/red.png"),
        "黄":new PIXI.Texture.fromImage("assets/yellow.png"),
        "緑":new PIXI.Texture.fromImage("assets/green.png"),
        "水":new PIXI.Texture.fromImage("assets/ltblue.png"),
        "青":new PIXI.Texture.fromImage("assets/blue.png"),
        "紫":new PIXI.Texture.fromImage("assets/purple.png")
*/
        "無":new PIXI.Texture.fromImage(marioImage["無"]),
        "白":new PIXI.Texture.fromImage(marioImage["白"]),
        "肌":new PIXI.Texture.fromImage(marioImage["肌"]),
        "茶":new PIXI.Texture.fromImage(marioImage["茶"]),
        "赤":new PIXI.Texture.fromImage(marioImage["赤"]),
        "黄":new PIXI.Texture.fromImage(marioImage["黄"]),
        "緑":new PIXI.Texture.fromImage(marioImage["緑"]),
        "水":new PIXI.Texture.fromImage(marioImage["水"]),
        "青":new PIXI.Texture.fromImage(marioImage["青"]),
        "紫":new PIXI.Texture.fromImage(marioImage["紫"])
    };
    
    renderer = PIXI.autoDetectRenderer(w, h);
    
    stage = new PIXI.Stage();
    
    document.body.appendChild(renderer.view);
    
    makeObject(0);
    
    for (var i = 0; i < n; i++)
    {
        tpoint1[i] = points1[i];
        tpoint2[i] = points2[i];
        tpoint3[i] = points3[i];
        
        var tempBall = new PIXI.Sprite(ballTexture[dataSet[i]]);
        
        tempBall.anchor.x = 0.5;
        tempBall.anchor.y = 0.5;
        tempBall.alpha = 0.5;
        balls[i] = tempBall;
        
        stage.addChild(tempBall);
    }
    
    resize();
    
    setTimeout(nextObject, 15000);
    
    requestAnimFrame(update);
    
}

function nextObject () {
    
    current++;
    
    if (current > objs)
    {
        current = 0;
    }
    
    makeObject(current);
    
    setTimeout(nextObject, 15000);
    
}

function makeObject ( t ) {
    
    var xd;
    var i = 0;
    
    switch (t)
    {
        case 0:
            for (i = 0; i < n; i++)
            {
                // 円
                xd = 90 + Math.round((i/(n-1)) * 180);
                points1[i] = (Math.cos(xd) * 10) * (Math.cos(t * 360 / n) * 10);
                points2[i] = (Math.cos(xd) * 10) * (Math.sin(t * 360 / n) * 10);
                points3[i] = Math.sin(xd) * 100;
            }
            break;
            
        case 1:
            for (i = 0; i < n; i++)
            {
                // ドット絵
                xd = 90 + Math.round((i/(n-1)) * 180);
                points1[i] = (i % 16) * 10 - 50
                points2[i] = ((15-i) / 16) * 10 + 100;
                points3[i] = 0;
            }
            break;

        case 2:
            for (i = 0; i < n; i++)
            {
                // 無限大（∞）
                xd = 90 + Math.round((i/(n-1)) * 180);
                points1[i] = (Math.cos(xd) * 10) * (Math.cos(xd) * 10);
                points2[i] = (Math.cos(xd) * 10) * (Math.sin(xd) * 10);
                points3[i] = Math.sin(xd) * 100;
            }
            break;
        }
    }

function resize()
{
    w = $(window).width() - 20; // 16;
    h = $(window).height() - 20; // 16;
    
    renderer.resize(w, h);
}

function update()
{
    var x3d, y3d, z3d, tx, ty, tz, ox;
    
    if (d < 250)
    {
        d++;
    }
    
    vx += 0.0075;
    vy += 0.0075;
    vz += 0.0075;
    
    for (var i = 0; i < n; i++)
    {
        if (points1[i] > tpoint1[i]) { tpoint1[i] = tpoint1[i] + 1; }
        if (points1[i] < tpoint1[i]) { tpoint1[i] = tpoint1[i] - 1; }
        if (points2[i] > tpoint2[i]) { tpoint2[i] = tpoint2[i] + 1; }
        if (points2[i] < tpoint2[i]) { tpoint2[i] = tpoint2[i] - 1; }
        if (points3[i] > tpoint3[i]) { tpoint3[i] = tpoint3[i] + 1; }
        if (points3[i] < tpoint3[i]) { tpoint3[i] = tpoint3[i] - 1; }
        
        x3d = tpoint1[i];
        y3d = tpoint2[i];
        z3d = tpoint3[i];
        
        ty = (y3d * Math.cos(vx)) - (z3d * Math.sin(vx));
        tz = (y3d * Math.sin(vx)) + (z3d * Math.cos(vx));
        tx = (x3d * Math.cos(vy)) - (tz * Math.sin(vy));
        tz = (x3d * Math.sin(vy)) + (tz * Math.cos(vy));
        ox = tx;
        tx = (tx * Math.cos(vz)) - (ty * Math.sin(vz));
        ty = (ox * Math.sin(vz)) + (ty * Math.cos(vz));
        
        balls[i].position.x = (512 * tx) / (d - tz) + w / 2;
        balls[i].position.y = (h/2) - (512 * ty) / (d - tz);
        
    }
    
    renderer.render(stage);
    
    requestAnimFrame(update);
}
