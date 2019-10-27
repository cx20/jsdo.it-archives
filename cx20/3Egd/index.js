// forked from cx20's "pixi.js v2 を試してみるテスト（その５）" http://jsdo.it/cx20/miVQ
// forked from cx20's "pixi.js v2 を試してみるテスト（その４）" http://jsdo.it/cx20/vLwd
// forked from cx20's "pixi.js v2 を試してみるテスト（その３）" http://jsdo.it/cx20/8OOq
// forked from cx20's "pixi.js v2 を試してみるテスト（その２）" http://jsdo.it/cx20/4wrE
// forked from cx20's "pixi.js v2 を試してみるテスト" http://jsdo.it/cx20/vmuo

var DOT_SIZE = 16;
var X_START_POS = 0;
var Y_START_POS = 0;

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
        "無":0x000000,
        "白":0xffffff,
        "肌":0xffcccc,
        "茶":0x800000,
        "赤":0xff0000,
        "黄":0xffff00,
        "緑":0x00ff00,
        "水":0x00ffff,
        "青":0x0000ff,
        "紫":0x800080
    };
    return colorHash[ c ];
}

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x0, true);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(465, 465);

// add the renderer view element to the DOM
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";
document.body.appendChild(renderer.view);

/// smoke shader..
var uniforms = {};

uniforms.resolution = { type: '2f', value: { x: 465, y: 465 } };
uniforms.alpha = { type: '1f', value: 1.0 };
uniforms.shift = { type: '1f', value: 1.6 };
uniforms.time = { type: '1f', value: 0 };
uniforms.speed = { type: '2f', value: { x: 0.7, y: 0.4 } };

var fragmentSrc = document.getElementById("fs").text.split("\n");
var coolFilter = new PIXI.AbstractFilter(fragmentSrc, uniforms);

var bg = PIXI.Sprite.fromImage("../../assets/1/p/1/Z/1p1ZY.png"); // 465x465.png
bg.shader = coolFilter;

stage.addChild(bg);

var g = new PIXI.Graphics();

for (var i = 0; i < dataSet.length; i++) {
    var x = (i % 16) * DOT_SIZE + X_START_POS;
    var y = Math.floor(i / 16) * DOT_SIZE + Y_START_POS;
    if ( dataSet[i] != "無" ) {
        //g.lineStyle(1, 0x000000, 1);
        g.beginFill(getRgbColor(dataSet[i]));
        g.drawRect(x, y, DOT_SIZE * 0.95, DOT_SIZE * 0.95);
    }
}
stage.addChild(g);
    
var count = 0;

// var targetValue
function animate() {
   
    count += 0.01;

    coolFilter.uniforms.time.value = count;
    coolFilter.syncUniforms();

    renderer.render(stage);
    requestAnimFrame(animate);
}

requestAnimFrame(animate);
