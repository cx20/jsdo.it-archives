// forked from JointJS's "Organizational Charts Demo" http://www.jointjs.com/demos/org

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

function getRgbColor( c, baseColor )
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

    if ( c == "赤" || c == "青" ) {
        return colorHash[ baseColor ];
    } else {
        return colorHash[ c ];
    }
}

function getSingleLightColor( c, baseColor, rgbType )
{
    var result = "";

    var rgb = getRgbColor( c, baseColor );
    rgb = rgb.replace("#", "");
    var r = parseInt( "0x" + rgb.substr( 0, 2 ), 16 );
    var g = parseInt( "0x" + rgb.substr( 2, 2 ), 16 );
    var b = parseInt( "0x" + rgb.substr( 4, 2 ), 16 );

    switch ( rgbType )
    {
    case 'r':
        result = r;
        break;
    case 'g':
        result = g;
        break;
    case 'b':
        result = b;
        break;
    }
    //console.log( result );
    return result;
}

var marioImage = [];
function initMario( baseColor ) {
    var canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData( 16, 16 );
    for ( var i =0; i < image.data.length; i += 4 ) {
        if ( dataSet[i/4] != "無" ) {
            image.data[i  ] = getSingleLightColor( dataSet[i/4], baseColor, "r" );
            image.data[i+1] = getSingleLightColor( dataSet[i/4], baseColor, "g" );
            image.data[i+2] = getSingleLightColor( dataSet[i/4], baseColor, "b" );
            image.data[i+3] = 255;
        }
    }
    ctx.putImageData( image, 0, 0 );
    marioImage[baseColor] = canvas.toDataURL();
}

initMario("無");
initMario("白");
initMario("肌");
initMario("茶");
initMario("赤");
initMario("黄");
initMario("緑");
initMario("水");
initMario("青");
initMario("紫");

var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 440,
    height: 440,
    gridSize: 1,
    model: graph,
    perpendicularLinks: true
});

var member = function(x, y, rank, name, image, background, border) {

    var cell = new joint.shapes.org.Member({
        position: { x: x, y: y },
        attrs: {
            '.card': { fill: background, stroke: border},
//              image: { 'xlink:href': './images/'+ image },
              image: { 'xlink:href': marioImage[image] },
            '.rank': { text: rank }, '.name': { text: name }
        }
    });
    graph.addCell(cell);
    return cell;
};

function link(source, target, breakpoints) {

    var cell = new joint.shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints
    });
    graph.addCell(cell);
    return cell;
}

var mario  = member(150, 15,'CEO',            'Mario',  '赤', '#F1C40F', 'gray');
var homer  = member( 15,100,'VP Marketing',   'Homer',  '黄', '#2ECC71', '#008e09');
var marge  = member(150,100,'VP Sales',       'Marge',  '緑', '#2ECC71', '#008e09');
var lisa   = member(300,100,'VP Production' , 'Lisa',   '水', '#2ECC71', '#008e09');
var lenny  = member( 15,175,'Manager',        'Lenny',  '紫', '#3498DB', '#333');
var maggie = member(150,175,'Manager',        'Maggie', '青', '#3498DB', '#333');
var carl   = member( 15,250,'Manager',        'Carl',   '茶', '#3498DB', '#333');

link(mario, marge,  [{x: 240, y: 90}]);
link(mario, homer,  [{x: 240, y: 90}, {x: 100, y:  90}]);
link(mario, lisa,   [{x: 240, y: 90}, {x: 360, y:  90}]);
link(homer, lenny,  [{x: 100, y: 190}]);
link(homer, carl,   [{x: 100, y: 265}]);
link(marge, maggie, [{x: 240, y: 190}]);
