// forked from cx20's "[WebGL] GLBoost で三角形を沢山描いてみるテスト" http://jsdo.it/cx20/q0RI
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var X_START_POS = 0;
var Y_START_POS = 0;
var Z_START_POS = 0;

// ‥‥‥‥〓〓〓〓〓〓〓‥‥□□□
// ‥‥○○〓〓〓〓〓〓〓〓‥□□□
// ‥‥○○‥○○○○○○○○○□□
// ‥‥‥‥‥■■■□□■□‥○○○
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■■■○■■■‥‥‥
// ‥○■■■■■■■■■■■‥‥■
// □□○■■■■■■○■■■‥‥■
// □□□‥■■■■■■■○○■■■
// ‥□‥○○○○○○○○■■■■■
// ‥‥■■■■■■■■■■■■■■
// ‥■■■■■■■■■■‥‥‥‥‥
// ‥■‥‥■■■■‥‥‥‥‥‥‥‥

var dataSet = [
    "無","無","無","無","赤","赤","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","白","白","赤","赤","赤","赤","赤","赤","赤","赤","無","肌","肌","肌",
    "無","無","白","白","無","白","白","白","白","白","白","白","白","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","白","白","白",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","赤","赤","赤","白","赤","赤","無","無","無",
    "無","白","赤","赤","赤","赤","赤","赤","赤","赤","赤","赤","赤","無","無","茶",
    "肌","肌","白","赤","赤","赤","赤","赤","赤","赤","白","赤","赤","無","無","茶",
    "肌","肌","肌","無","赤","赤","赤","赤","赤","赤","赤","赤","白","白","茶","茶",
    "無","肌","無","白","白","白","白","白","白","白","白","白","赤","赤","茶","茶",
    "無","無","茶","茶","茶","赤","赤","赤","赤","赤","赤","赤","赤","赤","茶","茶",
    "無","茶","茶","茶","赤","赤","赤","赤","赤","赤","赤","無","無","無","無","無",
    "無","茶","無","無","赤","赤","赤","赤","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":"#000000",
        "白":"#ffffff",
        "肌":"#ffcccc",
        "茶":"#800000",
        "赤":"#ff0000",
        "黄":"#ffff00",
        "緑":"#00ff00",
        "水":"#00ffff",
        "青":"#0000ff",
        "紫":"#800080"
    };
    return colorHash[ c ];
}

function getSingleColorDepth( c, rgbType )
{
    var result = 0;
    var rgb = getRgbColor( c );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );
    switch ( rgbType )
    {
    case 'r':
        result = r / 255;
        break;
    case 'g':
        result = g / 255;
        break;
    case 'b':
        result = b / 255;
        break;
    }
    return result;
}

var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:0, green:0, blue:0, alpha:1}});

var scene = new GLBoost.Scene();

var positions = [];
var colors = [];
for ( var i = 0; i < 100000; i++ ) {
    var x = (Math.random() - 0.5) * 2 * 10;
    var y = (Math.random() - 0.5) * 2 * 10;
    var z = (Math.random() - 0.5) * 2 * 10;
    var vector = new  GLBoost.Vector3(x, y, z);
    if ( vector.length() < 10 ) {
        var vectorA = new GLBoost.Vector3(x + Math.random() * 1 -0.5, y + Math.random() * 1 -0.5, z + Math.random() * 1 -0.5);
        var vectorB = new GLBoost.Vector3(x + Math.random() * 1 -0.5, y + Math.random() * 1 -0.5, z + Math.random() * 1 -0.5);
        var vectorC = new GLBoost.Vector3(x + Math.random() * 1 -0.5, y + Math.random() * 1 -0.5, z + Math.random() * 1 -0.5);
        var colorA = new GLBoost.Vector3(Math.random(), Math.random(), Math.random());
        var colorB = new GLBoost.Vector3(Math.random(), Math.random(), Math.random());
        var colorC = new GLBoost.Vector3(Math.random(), Math.random(), Math.random());
        positions.push( vectorA );
        positions.push( vectorB );
        positions.push( vectorC );

        var x0 = (Math.floor(x*1.5) + 10);
        var y0 = (Math.floor(y*1.5) + 10);
        var z0 = (Math.floor(z*1.5) + 10);
        console.log( x0 + ", " + y0 + ", " + z0 );
        if ( x0 >= (0+X_START_POS) && y0 >= (0+Y_START_POS) 
          && x0 < (16+X_START_POS) && y0 < (16+Y_START_POS) ) {
            var pos = (x0-X_START_POS) + ((15-y0)-Y_START_POS) * 16;
            if ( dataSet[pos] != "無") {
                var c = dataSet[pos];
                colorA.x = getSingleColorDepth(c, "r" );
                colorA.y = getSingleColorDepth(c, "g" );
                colorA.z = getSingleColorDepth(c, "b" );
                colorB.x = getSingleColorDepth(c, "r" );
                colorB.y = getSingleColorDepth(c, "g" );
                colorB.z = getSingleColorDepth(c, "b" );
                colorC.x = getSingleColorDepth(c, "r" );
                colorC.y = getSingleColorDepth(c, "g" );
                colorC.z = getSingleColorDepth(c, "b" );
            }
        }
        colors.push( colorA );
        colors.push( colorB );
        colors.push( colorC );
    }
}

var geometry = new GLBoost.Geometry(canvas);
geometry.setVerticesData({
    position: positions,
    color: colors
});
var mesh = new GLBoost.Mesh(geometry);

scene.add( mesh );

var camera = new GLBoost.Camera({
    eye: new GLBoost.Vector3(0.0, 0.0, 30.0),
    center: new GLBoost.Vector3(0.0, 0.0, 0.0),
    up: new GLBoost.Vector3(0.0, 1.0, 0.0)
}, {
    fovy: 45.0,
    aspect: 1.0,
    zNear: 0.1,
    zFar: 100.0
});

scene.add( camera );

scene.prepareForRender();

(function(){
    renderer.clearCanvas();
    renderer.draw(scene);
    var rotateMatrixX = GLBoost.Matrix33.rotateX(-0.00);
    var rotateMatrixY = GLBoost.Matrix33.rotateY(-0.02);
    var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
    rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
    camera.eye = rotatedVector;

    requestAnimationFrame(arguments.callee);
})();
