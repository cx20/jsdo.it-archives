// forked from cx20's "Leaflet.js でドット絵を描いてみるテスト" http://jsdo.it/cx20/3bxL
var DOT_SIZE = 3;
var X_START_POS = 50;
var Y_START_POS = 30;

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

var map;
var ol_wms;
function init(){
    map = new OpenLayers.Map('map');
    ol_wms = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0?", {layers: 'basic'} );
}

function drawMario() {
    var boxes = new OpenLayers.Layer.Vector("Boxes");

    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * DOT_SIZE;
        var y = (15 - Math.floor(i / 16)) * DOT_SIZE;
        var ext = [
            139.754784 + x / 1000, 35.685692 + y / 1000,
            139.754784 + x / 1000 + DOT_SIZE * 0.001 * 0.9, 35.685692 + y / 1000 + DOT_SIZE * 0.001 * 0.9
        ];
        bounds = OpenLayers.Bounds.fromArray(ext);
        if (dataSet[i] != "無") {
            var color = getRgbColor(dataSet[i]);
            box = new OpenLayers.Feature.Vector(bounds.toGeometry(), null, {
                fillColor: color,
                fillOpacity: 0.8,
                strokeWidth: 0.1,
                strokeColor: "#000000"
            });
            boxes.addFeatures(box);
        }
    }

    map.addLayers([ol_wms, boxes]);
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    var sf = new OpenLayers.Control.SelectFeature(boxes);
    map.addControl(sf);
    sf.activate();
    map.setCenter(new OpenLayers.LonLat(139.754784 + X_START_POS / 1000, 35.685692 + Y_START_POS / 1000), 12);
}

init();
drawMario();
