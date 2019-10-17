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
    .add( new TG.SinX().frequency( 0.05+i/1000 ) )
    .mul( new TG.SinX().frequency( 0.08-i/2000 ) )
    .add( new TG.SinY().frequency( 0.05-i/1000 ) )
    .mul( new TG.SinY().frequency( 0.08+i/2000 ) )
    .div( new TG.Number().tint( 1, 2, 1 ) )
    .add( new TG.SinX().frequency( 0.003 ).tint( 0.5, 0, 0 ) )
    .toImageData(context);
    
    context.putImageData( texture, 0, 0 );
    i++;
}

function animate() {
    
    requestAnimationFrame( animate );
    render();
    
}
