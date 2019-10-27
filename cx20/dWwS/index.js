// forked from cx20's "pixi.js v2 を試してみるテスト（その９）" http://jsdo.it/cx20/5eL7
// forked from cx20's "pixi.js v2 を試してみるテスト（その８）" http://jsdo.it/cx20/r06R
// forked from cx20's "pixi.js v2 を試してみるテスト（その７）" http://jsdo.it/cx20/6jRA
// forked from cx20's "pixi.js v2 を試してみるテスト（その６）" http://jsdo.it/cx20/3Egd
// forked from cx20's "pixi.js v2 を試してみるテスト（その５）" http://jsdo.it/cx20/miVQ
// forked from cx20's "pixi.js v2 を試してみるテスト（その４）" http://jsdo.it/cx20/vLwd
// forked from cx20's "pixi.js v2 を試してみるテスト（その３）" http://jsdo.it/cx20/8OOq
// forked from cx20's "pixi.js v2 を試してみるテスト（その２）" http://jsdo.it/cx20/4wrE
// forked from cx20's "pixi.js v2 を試してみるテスト" http://jsdo.it/cx20/vmuo

var DOT_SIZE = 16;
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

var g = new PIXI.Graphics();
g.beginFill(0xffffff);
g.drawRect(0, 0, 465, 465);

for (var i = 0; i < dataSet.length; i++) {
    var x = X_START_POS + (i % 16) * DOT_SIZE ;
    var y = Y_START_POS + Math.floor(i / 16) * DOT_SIZE;
    if ( dataSet[i] != "無" ) {
        g.beginFill(getRgbColor(dataSet[i]));
        g.drawRect(x, y, DOT_SIZE * 0.95, DOT_SIZE * 0.95);
    }
}

var texture = g.generateTexture();
var bg = new PIXI.Sprite(texture);

var uniforms = {};
uniforms.resolution = { type: '2f', value: { x: 465, y: 465 } };
uniforms.time = { type: '1f', value: 0 };

var fragmentSrc = document.getElementById("fs").text.split("\n");
var coolFilter = new PIXI.AbstractFilter(fragmentSrc, uniforms);
bg.shader = coolFilter;
stage.addChild(bg);

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
