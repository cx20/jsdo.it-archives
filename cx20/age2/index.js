// forked from cx20's "TexGen.js でアニメーションさせてみるテスト（その２）" http://jsdo.it/cx20/5Hek
// forked from cx20's "texgen.js でアニメーションさせてみるテスト" http://jsdo.it/cx20/yXYm
// forked from cx20's "texgen.js を試してみるテスト" http://jsdo.it/cx20/pmnX

var i = 0;
var size = 465;

var canvas = document.createElement("canvas");
canvas.width = size * 3;
canvas.height = size;
document.body.appendChild( canvas );

var context = canvas.getContext("2d");

animate();

function render() {
    var texture = new TG.Texture( size, size )
        .add( new TG.SinX().frequency((i%size)/100).tint( 1.0, 0.0, 0.0 ) )
        .add( new TG.SinY().frequency((i%size)/100).tint( 0.0, 1.0, 0.0 ) )
        .add( new TG.SinX().frequency(0.01+(i%size)/100).tint( 0.0, 0.0, 1.0 ) )
        .add( new TG.SinY().frequency(0.01+(i%size)/100).tint( 0.0, 0.0, 1.0 ) )
        .add( new TG.Pixelate().size(16, 16) )
        .add( new TG.Transform().angle(i%size) )
    .toImageData(context);

    context.putImageData( texture, 0, 0 );
    i++;
}

function animate() {
    
    requestAnimationFrame( animate );
    render();
    
}
