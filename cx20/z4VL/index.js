// forked from cx20's "texgen.js を試してみるテスト（その４）" http://jsdo.it/cx20/gY3w
// forked from cx20's "texgen.js を試してみるテスト（その３）" http://jsdo.it/cx20/2xXN
// forked from cx20's "texgen.js を試してみるテスト（その２）" http://jsdo.it/cx20/cd6f
// forked from cx20's "texgen.js を試してみるテスト" http://jsdo.it/cx20/pmnX
var texture = new TG.Texture( 465, 465 )
    .add( new TG.SinX().frequency(0.1).tint( 1.0, 0.0, 0.0 ) )
    .add( new TG.SinY().frequency(0.1).tint( 0.0, 1.0, 0.0 ) )
    .add( new TG.Noise().tint( 1.0, 0.0, 0.0 ) )
    .add( new TG.Noise().tint( 0.0, 1.0, 0.0 ) )
    .add( new TG.Noise().tint( 0.0, 0.0, 1.0 ) )
    .toCanvas();

document.body.appendChild( texture );
