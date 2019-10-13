var DOT_SIZE = 6;
var X_START_POS = -48;
var Y_START_POS = -48;

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥

var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
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

init( "draw-svg", Two.Types.svg );
init( "draw-canvas", Two.Types.canvas );
init( "draw-webgl", Two.Types.webgl );

function init( id, type ) {
    // Make an instance of two and place it on the page.
    var elem = document.getElementById(id);    // .children[0];
    var params = { width: 100, height: 100, type:type, autostart: true };
    var two = new Two(params).appendTo(elem);

    var x, y;
    var rects = [];
    var color;
    for ( var i = 0; i < dataSet.length; i++ ) {
        x = ( i % 16 ) * DOT_SIZE ;
        y = Math.floor( i / 16 ) * DOT_SIZE;
        if ( dataSet[i] != "無" ) {
            var rect = two.makeRectangle( X_START_POS + x, Y_START_POS + y, (DOT_SIZE * 0.8), (DOT_SIZE * 0.8));
            color = dataSet[i];
            rect.fill = getRgbColor( color );
            rects.push( rect );
        }
        
    }

    var group = two.makeGroup(rects);
    group.translation.set(two.width / 2, two.height / 2);
    group.scale = 0;
    group.noStroke();

    // Bind a function to scale and rotate the group
    // to the animation loop.
    two.bind('update', function(frameCount) {
      // This code is called everytime two.update() is called.
      // Effectively 60 times per second.
      if (group.scale > 0.9999) {
        group.scale = group.rotation = 0;
      }
      var t = (1 - group.scale) * 0.125;
      group.scale += t;
      group.rotation += t * 2 * Math.PI;
    }).play();  // Finally, start the animation loop
}
