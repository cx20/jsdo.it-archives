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
var objs = 3;        // 変形パターンの数
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
        "無":new PIXI.Texture.fromImage("../../assets/r/t/V/W/rtVWv.png"),
        "白":new PIXI.Texture.fromImage("../../assets/e/j/7/P/ej7P2.png"),
        "肌":new PIXI.Texture.fromImage("../../assets/z/j/3/P/zj3PY.png"),
        "茶":new PIXI.Texture.fromImage("../../assets/y/j/P/L/yjPLj.png"),
        "赤":new PIXI.Texture.fromImage("../../assets/8/J/U/t/8JUta.png"),
        "黄":new PIXI.Texture.fromImage("../../assets/u/8/m/P/u8mPQ.png"),
        "緑":new PIXI.Texture.fromImage("../../assets/2/c/n/a/2cnal.png"),
        "水":new PIXI.Texture.fromImage("../../assets/n/6/d/Z/n6dZW.png"),
        "青":new PIXI.Texture.fromImage("../../assets/5/Z/b/1/5Zb1N.png"),
        "紫":new PIXI.Texture.fromImage("../../assets/3/0/7/K/307Ky.png")
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
        
        //var tempBall = new PIXI.Sprite(ballTexture["青"]);
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
                // 直線
                points1[i] = -50 + Math.round((i/(n-1)) * 100);
                points2[i] = 0;
                points3[i] = 0;
            }
            break;

        case 1:
            for (i = 0; i < n; i++)
            {
                // 円
                xd = -90 + Math.round((i/(n-1)) * 180);
                points1[i] = (Math.cos(xd) * 10) * (Math.cos(t * 360 / n) * 10);
                points2[i] = (Math.cos(xd) * 10) * (Math.sin(t * 360 / n) * 10);
                points3[i] = Math.sin(xd) * 100;
            }
            break;
            
        case 2:
            for (i = 0; i < n; i++)
            {
                // ドット絵
                xd = -90 + Math.round((i/(n-1)) * 180);
                points1[i] = (i % 16) * 5 - 50;
                points2[i] = (i / 16) * 5 - 50;
                points3[i] = 0;
            }
            break;

        case 3:
            for (i = 0; i < n; i++)
            {
                // 無限大（∞）
                xd = -90 + Math.round((i/(n-1)) * 180);
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
