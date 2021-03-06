// forked from cx20's "forked: はじめてのCube" http://jsdo.it/cx20/zAKr
// forked from cx20's "forked: はじめてのCube" http://jsdo.it/cx20/cCT5
// forked from cx20's "forked: はじめてのCube" http://jsdo.it/cx20/jahK
// forked from xlune's "はじめてのCube" http://jsdo.it/xlune/cube
/*  
            50 y 
            ^  -50 
            | / z
            |/       x
-50 -----------------> +50
          / |
     +50 /  |
          -50

        [7]------[4]
       / |      / |
     [3]------[0] |
      |  |     |  |
      | [6]----|-[5]
      |/       |/
     [2]------[1]

*/

/*
var g_points = [
    {x: 5, y: 5, z: 5}, // g_points[0]
    {x: 5, y:-5, z: 5}, // g_points[1]
    {x:-5, y:-5, z: 5}, // g_points[2]
    {x:-5, y: 5, z: 5}, // g_points[3]
    {x: 5, y: 5, z:-5}, // g_points[4]
    {x: 5, y:-5, z:-5}, // g_points[5]
    {x:-5, y:-5, z:-5}, // g_points[6]
    {x:-5, y: 5, z:-5}  // g_points[7]
  ];
*/
var g_mario = [];    // new Array( 16 * 16 );
/*
// ＜マリオ＞
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

// ＜色の種類＞
// "無":"#000000",
// "白":"#ffffff",
// "肌":"#ffcccc",
// "茶":"#800000",
// "赤":"#ff0000",
// "黄":"#ffff00",
// "緑":"#00ff00",
// "水":"#00ffff",
// "青":"#0000ff",
// "紫":"#800080"

*/
var g_strLines = [
        "無無無無無無無無無無無無無肌肌肌", 
        "無無無無無無赤赤赤赤赤無無肌肌肌", 
        "無無無無無赤赤赤赤赤赤赤赤赤肌肌", 
        "無無無無無茶茶茶肌肌茶肌無赤赤赤", 
        "無無無無茶肌茶肌肌肌茶肌肌赤赤赤", 
        "無無無無茶肌茶茶肌肌肌茶肌肌肌赤", 
        "無無無無茶茶肌肌肌肌茶茶茶茶赤無", 
        "無無無無無無肌肌肌肌肌肌肌赤無無", 
        "無無赤赤赤赤赤青赤赤赤青赤無無無", 
        "無赤赤赤赤赤赤赤青赤赤赤青無無茶", 
        "肌肌赤赤赤赤赤赤青青青青青無無茶", 
        "肌肌肌無青青赤青青黄青青黄青茶茶", 
        "無肌無茶青青青青青青青青青青茶茶", 
        "無無茶茶茶青青青青青青青青青茶茶", 
        "無茶茶茶青青青青青青青無無無無無", 
        "無茶無無青青青青無無無無無無無無"
    ];

var canvas;
var ctx;
var X_MAX = 465;
var Y_MAX = 400;
var BASE_X = 200;
var BASE_Y = 150;
var RAD_STEP = Math.PI / 180;
var g_vp = 500;
var g_rad_x = 0;
var g_rad_y = 0;
var g_rad_z = 0;

function init()
{
    g_rad_x = RAD_STEP * 2;
    g_rad_y = RAD_STEP * -1;
    g_rad_z = RAD_STEP * -3;

    txtX_rad.value = g_rad_x;
    txtY_rad.value = g_rad_y;
    txtZ_rad.value = g_rad_z;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    clearScreen();
    
    initMario();

    setInterval(draw, 50);
}

function initMario(){

    var strLine;
    var strMessage;
    for ( y = 0; y < g_strLines.length; y++ )
    {
        strMessage = "";
        strLine = g_strLines[y];
        for ( x = 0; x < strLine.length; x++ )
        {
            var points = [
                {x: 5, y: 5, z: 5}, // g_points[0]
                {x: 5, y:-5, z: 5}, // g_points[1]
                {x:-5, y:-5, z: 5}, // g_points[2]
                {x:-5, y: 5, z: 5}, // g_points[3]
                {x: 5, y: 5, z:-5}, // g_points[4]
                {x: 5, y:-5, z:-5}, // g_points[5]
                {x:-5, y:-5, z:-5}, // g_points[6]
                {x:-5, y: 5, z:-5}  // g_points[7]
              ];
            var c = strLine.substr( x, 1 );
            adjustPoint( points, x, y );
            var style = getRgbColor( c );
            if ( c != "無" )
            {
                g_mario.push( { cube:points, style:style } );
            }
        }
    }
}

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

function adjustPoint( points, x, y )
{
    var i = 0;
    for ( i = 0; i < points.length; i++ )
    {
        points[i].x += x * 10;
        points[i].y += y * 10;
    }
}

function draw() {
    clearScreen();

    var i;
    for ( i = 0; i < g_mario.length; i++ )
    {
        drawMario( g_mario[i] );
    }
}

function drawMario( mario ){
    var p;
    var p2 = [];
    var i, s;
    var x1, y1, z1;
    var x2, y2, z2;
    var x3, y3, z3;
    var points = mario.cube;
    var style = mario.style;
    
    for(i = 0; i < points.length; i++ ) {
        p = points[i];

        // 以下コメントは「C言語によるはじめてのアルゴリズム入門」の解説より抜粋
        //
        // ■ Amazon.co.jp： C言語によるはじめてのアルゴリズム入門: 河西 朝雄: 本
        // http://www.amazon.co.jp/dp/4874085008
        // 
        // 8.4 ３次元座標変換
        // 
        
        // y軸周りにβ角回転する
        // x1 = x * cos(β) + z * sin(β)
        // y1 = y
        // z1 = -x * sin(β) + z * cos(β)
        x1 = p.x * Math.cos(g_rad_y) + p.z * Math.sin(g_rad_y);
        y1 = p.y;
        z1 = -p.x * Math.sin(g_rad_y) + p.z * Math.cos(g_rad_y);
        
        // x軸周りにα角回転する
        // x2 = x1
        // y2 = y1 * cos(α) - z1 * sin(α)
        // z2 = y1 * sin(α) + z1 * cos(α)
        x2 = x1;
        y2 = y1 * Math.cos(g_rad_x) - z1 * Math.sin(g_rad_x);
        z2 = y1 * Math.sin(g_rad_x) + z1 * Math.cos(g_rad_x);
        
        // z軸周りにγ角回転する
        // x2 = x2 * cos(γ) - y2 * sin(γ)
        // y2 = x2 * sin(γ) + y2 * cos(γ)
        // z2 = z2
        x3 = x2 * Math.cos(g_rad_z) - y2 * Math.sin(g_rad_z);
        y3 = x2 * Math.sin(g_rad_z) + y2 * Math.cos(g_rad_z);
        z3 = z2;
        
        // 計算結果を戻す
        p.x = x3;
        p.y = y3;
        p.z = z3;
        
        // 上記の回転で得られた座標を z = 0 平面に平行投影する
        // （x3, y3, z3 のうち、z3 を無視することが z = 0 への平行投影を意味する。）
        s = g_vp / (g_vp - p.z);
        p2[i] = { x: p.x * s, y: p.y * s, z: p.z };
    }
    drawCube(p2, style);
}

function drawCube(p, style){
/*
            50 y 
            ^  -50 
            | / z
            |/       x
-50 -----------------> +50
          / |
     +50 /  |
          -50

        [7]------[4]
       / |      / |
     [3]------[0] |
      |  |     |  |
      | [6]----|-[5]
      |/       |/
     [2]------[1]

*/
    var surfaces = [];
    surfaces.push( { x1:p[0].x, y1:p[0].y, z1:p[0].z, x2:p[1].x, y2:p[1].y, z2:p[1].z, x3:p[2].x, y3:p[2].y, z3:p[2].z, x4:p[3].x, y4:p[3].y, z4:p[3].z } );
    surfaces.push( { x1:p[4].x, y1:p[4].y, z1:p[4].z, x2:p[5].x, y2:p[5].y, z2:p[5].z, x3:p[6].x, y3:p[6].y, z3:p[6].z, x4:p[7].x, y4:p[7].y, z4:p[7].z } );
    surfaces.push( { x1:p[0].x, y1:p[0].y, z1:p[0].z, x2:p[3].x, y2:p[3].y, z2:p[3].z, x3:p[7].x, y3:p[7].y, z3:p[7].z, x4:p[4].x, y4:p[4].y, z4:p[4].z } );
    surfaces.push( { x1:p[1].x, y1:p[1].y, z1:p[1].z, x2:p[2].x, y2:p[2].y, z2:p[2].z, x3:p[6].x, y3:p[6].y, z3:p[6].z, x4:p[5].x, y4:p[5].y, z4:p[5].z } );
    surfaces.push( { x1:p[0].x, y1:p[0].y, z1:p[0].z, x2:p[4].x, y2:p[4].y, z2:p[4].z, x3:p[5].x, y3:p[5].y, z3:p[5].z, x4:p[1].x, y4:p[1].y, z4:p[1].z } );
    surfaces.push( { x1:p[3].x, y1:p[3].y, z1:p[3].z, x2:p[7].x, y2:p[7].y, z2:p[7].z, x3:p[6].x, y3:p[6].y, z3:p[6].z, x4:p[2].x, y4:p[2].y, z4:p[2].z } );
    surfaces.sort( zsort );

   
    var i;
    for ( i = 0; i < surfaces.length; i++ )
    {
        ctx.beginPath();
        ctx.fillStyle = style;
        ctx.moveTo(surfaces[i].x1 + BASE_X, surfaces[i].y1 + BASE_Y);
        ctx.lineTo(surfaces[i].x2 + BASE_X, surfaces[i].y2 + BASE_Y);
        ctx.lineTo(surfaces[i].x3 + BASE_X, surfaces[i].y3 + BASE_Y);
        ctx.lineTo(surfaces[i].x4 + BASE_X, surfaces[i].y4 + BASE_Y);
        ctx.lineTo(surfaces[i].x1 + BASE_X, surfaces[i].y1 + BASE_Y);

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }
}

function clearScreen() {
    ctx.fillStyle = "rgb( 0, 0, 0 )";
    ctx.fillRect( 0, 0, X_MAX, Y_MAX );
}

function zsort(a, b){
    var posZ1 = -( a.z1 + a.z2 + a.z3 + a.z4 ) / 4;
    var posZ2 = -( b.z1 + b.z2 + b.z3 + b.z4 ) / 4;
    if(posZ1 < posZ2){
        return 1;
    }else if(posZ1 > posZ2){
        return -1;
    }else{
        return 0;
    }
}

function btnX_minus_onclick() {
    g_rad_x -= RAD_STEP;
    txtX_rad.value = g_rad_x;
}

function btnX_plus_onclick() {
    g_rad_x += RAD_STEP;
    txtX_rad.value = g_rad_x;
}

function btnY_minus_onclick() {
    g_rad_y -= RAD_STEP;
    txtY_rad.value = g_rad_y;
}

function btnY_plus_onclick() {
    g_rad_y += RAD_STEP;
    txtY_rad.value = g_rad_y;
}

function btnZ_minus_onclick() {
    g_rad_z -= RAD_STEP;
    txtZ_rad.value = g_rad_z;
}

function btnZ_plus_onclick() {
    g_rad_z += RAD_STEP;
    txtZ_rad.value = g_rad_z;
}
