// forked from cx20's "texgen.js を試してみるテスト（その２）" http://jsdo.it/cx20/cd6f
// forked from cx20's "texgen.js を試してみるテスト" http://jsdo.it/cx20/pmnX
var texture = new TG.Texture( 465, 465 )
    .add( new TG.CheckerBoard().tint( 1.0, 1.0, 1.0 ) )
    .toCanvas();

document.body.appendChild( texture );
