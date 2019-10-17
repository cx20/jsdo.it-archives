// forked from cx20's "texgen.js を試してみるテスト" http://jsdo.it/cx20/pmnX
var texture = new TG.Texture( 465, 465 )
    .add( new TG.Noise().tint( 1.0, 0.0, 0.0 ) )
    .add( new TG.Noise().tint( 0.0, 1.0, 0.0 ) )
    .add( new TG.Noise().tint( 0.0, 0.0, 1.0 ) )
    .toCanvas();

document.body.appendChild( texture );
