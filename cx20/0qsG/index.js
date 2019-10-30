// forked from cx20's "[WebGL] p5.js を試してみるテスト（その２）" http://jsdo.it/cx20/wc94
// forked from cx20's "[WebGL] p5.js を試してみるテスト" http://jsdo.it/cx20/uwAD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var angle = 0;

function setup(){
    createCanvas(465, 465, 'webgl');
}

function draw(){
    angle += Math.PI / 180;
    background(255, 255, 255);
    translate(0, 0, -100);
    rotate(angle, [1, 1, 1]);
    box(200);
}
