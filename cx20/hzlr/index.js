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

var g_points = [
    {x: 50, y: 50, z: 50}, // g_points[0]
    {x: 50, y:-50, z: 50}, // g_points[1]
    {x:-50, y:-50, z: 50}, // g_points[2]
    {x:-50, y: 50, z: 50}, // g_points[3]
    {x: 50, y: 50, z:-50}, // g_points[4]
    {x: 50, y:-50, z:-50}, // g_points[5]
    {x:-50, y:-50, z:-50}, // g_points[6]
    {x:-50, y: 50, z:-50}  // g_points[7]
  ];

var canvas;
var ctx;
var X_MAX = 465;
var Y_MAX = 380;
var CENTER_X = X_MAX / 2;
var CENTER_Y = Y_MAX / 2;
var RAD_STEP = Math.PI / 180;
var g_vp = 500;
var g_rad_x = 0;
var g_rad_y = 0;
var g_rad_z = 0;

function init()
{
    g_rad_x = RAD_STEP;
    g_rad_y = RAD_STEP * 2;
    g_rad_z = 0;

    txtX_rad.value = g_rad_x;
    txtY_rad.value = g_rad_y;
    txtZ_rad.value = g_rad_z;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    clearScreen();

    setInterval(draw, 50);
}

function draw(){
    var p;
    var p2 = [];
    var i, s;
    var x1, y1, z1;
    var x2, y2, z2;
    var x3, y3, z3;
    for(i = 0; i < g_points.length; i++ ) {
        p = g_points[i];

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
        p2[i] = { x: p.x * s, y: p.y * s, z:p.z };
    }
    drawCube(p2);
}

function drawCube(p){
    clearScreen();
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
    surfaces.push( { x1:p[0].x, y1:p[0].y, z1:p[0].z, x2:p[1].x, y2:p[1].y, z2:p[1].z, x3:p[2].x, y3:p[2].y, z3:p[2].z, x4:p[3].x, y4:p[3].y, z4:p[3].z, style:"#ff0000" } );
    surfaces.push( { x1:p[4].x, y1:p[4].y, z1:p[4].z, x2:p[5].x, y2:p[5].y, z2:p[5].z, x3:p[6].x, y3:p[6].y, z3:p[6].z, x4:p[7].x, y4:p[7].y, z4:p[7].z, style:"#00ff00" } );
    surfaces.push( { x1:p[0].x, y1:p[0].y, z1:p[0].z, x2:p[3].x, y2:p[3].y, z2:p[3].z, x3:p[7].x, y3:p[7].y, z3:p[7].z, x4:p[4].x, y4:p[4].y, z4:p[4].z, style:"#0000ff" } );
    surfaces.push( { x1:p[1].x, y1:p[1].y, z1:p[1].z, x2:p[2].x, y2:p[2].y, z2:p[2].z, x3:p[6].x, y3:p[6].y, z3:p[6].z, x4:p[5].x, y4:p[5].y, z4:p[5].z, style:"#ffff00" } );
    surfaces.push( { x1:p[0].x, y1:p[0].y, z1:p[0].z, x2:p[4].x, y2:p[4].y, z2:p[4].z, x3:p[5].x, y3:p[5].y, z3:p[5].z, x4:p[1].x, y4:p[1].y, z4:p[1].z, style:"#00ffff" } );
    surfaces.push( { x1:p[3].x, y1:p[3].y, z1:p[3].z, x2:p[7].x, y2:p[7].y, z2:p[7].z, x3:p[6].x, y3:p[6].y, z3:p[6].z, x4:p[2].x, y4:p[2].y, z4:p[2].z, style:"#ff00ff" } );
    surfaces.sort( zsort );

   
    var i;
    for ( i = 0; i < surfaces.length; i++ )
    {
        ctx.beginPath();
        ctx.fillStyle = surfaces[i].style;
        ctx.strokeStyle = "#ffffff";
        ctx.moveTo(surfaces[i].x1 + CENTER_X, surfaces[i].y1 + CENTER_Y);
        ctx.lineTo(surfaces[i].x2 + CENTER_X, surfaces[i].y2 + CENTER_Y);
        ctx.lineTo(surfaces[i].x3 + CENTER_X, surfaces[i].y3 + CENTER_Y);
        ctx.lineTo(surfaces[i].x4 + CENTER_X, surfaces[i].y4 + CENTER_Y);
        ctx.lineTo(surfaces[i].x1 + CENTER_X, surfaces[i].y1 + CENTER_Y);

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
    var posZ1 = ( a.z1 + a.z2 + a.z3 + a.z4 ) / 4;
    var posZ2 = ( b.z1 + b.z2 + b.z3 + b.z4 ) / 4;
    if(posZ1 < posZ2){
        return -1;
    }else if(posZ1 > posZ2){
        return 1;
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
