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
    var texture = new TG.Texture( 465, 465 )
        .add( new TG.SinX().frequency(0.1+i/1000).tint( 1.0, 0.0, 0.0 ) )
        .add( new TG.SinY().frequency(0.1-i/2000).tint( 0.0, 1.0, 0.0 ) )
        .add( new TG.Noise().tint( 1.0, 0.0, 0.0 ) )
        .add( new TG.Noise().tint( 0.0, 1.0, 0.0 ) )
        .add( new TG.Noise().tint( 0.0, 0.0, 1.0 ) )
    .toImageData(context);

    context.putImageData( texture, 0, 0 );
    i++;
}

function animate() {
    
    requestAnimationFrame( animate );
    render();
    
}
