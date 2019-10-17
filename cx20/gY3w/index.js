// forked from cx20's "texgen.js を試してみるテスト（その３）" http://jsdo.it/cx20/2xXN
// forked from cx20's "texgen.js を試してみるテスト（その２）" http://jsdo.it/cx20/cd6f
// forked from cx20's "texgen.js を試してみるテスト" http://jsdo.it/cx20/pmnX
var X_START_POS = 184;
var Y_START_POS = 184;
var texture = new TG.Texture( 465, 465 )
    .add( new TG.Rect().position(X_START_POS +  0, Y_START_POS +  0).size(32, 32).tint( 1.0, 0.0, 0.0 ) )
    .add( new TG.Rect().position(X_START_POS + 32, Y_START_POS + 32).size(32, 32).tint( 0.0, 1.0, 0.0 ) )
    .add( new TG.Rect().position(X_START_POS + 64, Y_START_POS + 64).size(32, 32).tint( 0.0, 0.0, 1.0 ) )
    .toCanvas();

document.body.appendChild( texture );