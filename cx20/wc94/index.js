// forked from cx20's "[WebGL] p5.js を試してみるテスト" http://jsdo.it/cx20/uwAD
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

function setup(){
    createCanvas(465, 465, 'webgl');
}

function draw(){
    background(255, 255, 255);
    fill(0, 0, 255);
    noStroke();
    beginShape(TRIANGLE_STRIP);
    vertex(-230, -230, 0);
    vertex( 230, -230, 0);
    vertex(-230,  230, 0);
    vertex( 230,  230, 0);
    endShape(CLOSE);
}

/*
function setup(){
    createGraphics(465, 465, 'webgl');
    background(255, 255, 255);
    noStroke();
    windowResized(); // 何故かリサイズしないと再描画しなかった為、追加
}

function draw(){
    beginShape(TRIANGLE_STRIP);
    fill(0, 0, 255);
    vertex(115, 115);
    vertex(350, 115);
    vertex(115, 350);
    vertex(350, 350);
    endShape(CLOSE);
}

function windowResized() {
    resizeCanvas(465, 465);
}
*/
