// forked from cx20's "Google マップで絵を描いてみるテスト" http://jsdo.it/cx20/qbTa
// forked from ksk1015's "Google Map APIの練習 マーカーとウィンドウ付ける" http://jsdo.it/ksk1015/i9yq
// forked from ksk1015's "Google Map APIの練習 " http://jsdo.it/ksk1015/26bu

var DOT_SIZE = 2;
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

function getDotSize( c )
{
    var colorHash = {
        "無":1,
        "白":10,
        "肌":9,
        "黄":8,
        "水":7,
        "赤":6,
        "緑":5,
        "青":4,
        "紫":3,
        "茶":2
    };
    return colorHash[ c ];
}

var map, pointarray, heatmap;

var taxiData = [];
function initialize() {
    var mapOptions = {
        zoom: 13,
        //center: new google.maps.LatLng(37.774546, -122.433523),
        center: new google.maps.LatLng(35.685692 + 20/1000, 139.754784 + 20/1000),
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'),
                              mapOptions);
    
    taxiData
    var i, j, x, y, x0, y0, x1, y1;
    var iconUrl;
    for ( i = 0; i < dataSet.length; i++ ) {
        
        x0 = (( i % 16 ) * DOT_SIZE) / 1000;
        y0 = (( 16 - Math.floor( i / 16 ) ) * DOT_SIZE) / 1000;
        
        if ( dataSet[i] != "無" ) {
            for ( j = 0; j < getDotSize( dataSet[i] ); j++ ) {
                x1 = Math.random() * 1/1000;
                y1 = Math.random() * 1/1000;
                x = x0 + x1;
                y = y0 + y1;
                //taxiData.push( new google.maps.LatLng(37.774546 + y / 1000 + x0, -122.433523 + x / 1000 + y0) );
                taxiData.push( new google.maps.LatLng(35.685692 + y, 139.754784 + x) );
            }
        }
    }
    
    
    var pointArray = new google.maps.MVCArray(taxiData);
    
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });
    
    heatmap.setMap(map);
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.setOptions({
        gradient: heatmap.get('gradient') ? null : gradient
    });
}

function changeRadius() {
    heatmap.setOptions({radius: heatmap.get('radius') ? null : 20});
}

function changeOpacity() {
    heatmap.setOptions({opacity: heatmap.get('opacity') ? null : 0.2});
}

google.maps.event.addDomListener(window, 'load', initialize);
