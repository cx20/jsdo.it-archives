// forked from cx20's "pixi.js v2 を試してみるテスト" http://jsdo.it/cx20/vmuo
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

var fragmentSrc = document.getElementById("fs1").text.split("\n");
var coolFilter = new PIXI.AbstractFilter(fragmentSrc, uniforms);

var uniforms = {};
uniforms.uScan = {type: 'sampler2D', value:new PIXI.Texture.fromImage("scan.png")};
uniforms.power = { type: '1f', value: 3/465 };
uniforms.noise = { type: '1f', value: 0.2 };

//// grain filter..

var fragmentSrc = document.getElementById("fs2").text.split("\n");
var scanFilter = new PIXI.AbstractFilter(fragmentSrc, uniforms);

// console.log(fragmentSource);
//var bg = PIXI.Sprite.fromImage("/assets/9/7/E/z/97EzZ.jpg"); // test_BG.jpg
var bg = PIXI.Sprite.fromImage("../../assets/1/p/1/Z/1p1ZY.png"); // 465x465.png
bg.shader = coolFilter;

stage.addChild(bg);

//var logo = PIXI.Sprite.fromImage("pixiJsV2.png");
var logo = PIXI.Sprite.fromImage("../../assets/u/e/E/Z/ueEZK.png");
logo.position.x = 465/2;
logo.position.y = 465/2;

logo.anchor.set(0.5);
logo.blendMode = PIXI.blendModes.ADD
stage.addChild(logo);

stage.filters = [scanFilter];

var count = 0;

var count2 = 0;
var ease = 0;

// var targetValue
function animate() {
   
    count += 0.01;

    coolFilter.uniforms.time.value = count;
    coolFilter.syncUniforms();

    count2 ++;

    if(count2 > 150)
    {
        count2 = 0;
        ease = ( Math.random() * 30) /// 630;
    }

    ease *= 0.9;

    scanFilter.uniforms.power.value += (ease -  scanFilter.uniforms.power.value ) * 0.3;

    ease =  0.8 + Math.random() * 0.2;

    logo.alpha += (ease - logo.alpha ) * 0.1
    scanFilter.uniforms.noise.value += 0.1;
    scanFilter.uniforms.noise.value %= 1;
    scanFilter.syncUniforms();

    renderer.render(stage);
    
    requestAnimFrame(animate);
}

requestAnimFrame(animate);
