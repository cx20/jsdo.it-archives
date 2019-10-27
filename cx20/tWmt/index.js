// forked from goodboy's "pixi.js example" http://www.goodboydigital.com/pixijs/masky/
// forked from cx20's "pixi.js v3 を試してみるテスト" http://jsdo.it/cx20/4c4K
// forked from cx20's "pixi.js v2 を試してみるテスト" http://jsdo.it/cx20/vmuo

var stage = new PIXI.Container();
var renderer = new PIXI.autoDetectRenderer(465, 465);
document.body.appendChild(renderer.view);

requestAnimationFrame(update);

var bgSprite = new PIXI.extras.TilingSprite.fromImage("../../assets/m/F/X/X/mFXXI.jpg", 465, 410); // alpha_mask_bottom.jpg
var topSprite = new PIXI.extras.TilingSprite.fromImage("../../assets/n/H/O/4/nHO4D.jpg", 465, 410); // alpha_mask_top.jpg
//var maskSprite = new PIXI.Sprite.fromImage("/assets/m/v/Z/C/mvZC5.jpg", 465, 410); // alpha_mask.jpg
var maskSprite = new PIXI.Sprite.fromImage("../../assets/s/K/b/2/sKb26.jpg", 256, 256); // frog.jpg

maskSprite.scale.x *= 465/256;
maskSprite.scale.y *= 410/256;

stage.addChild(bgSprite);
stage.addChild(topSprite);
stage.addChild(maskSprite);

topSprite.mask = maskSprite

function update() {
    requestAnimationFrame(update);
    renderer.render(stage);

    bgSprite.tilePosition.x += 1;
    topSprite.tilePosition.x -= 1;
}