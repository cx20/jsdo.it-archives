// forked from cx20's "Google マップで絵を描いてみるテスト" http://jsdo.it/cx20/qbTa
// forked from ksk1015's "Google Map APIの練習 マーカーとウィンドウ付ける" http://jsdo.it/ksk1015/i9yq
// forked from ksk1015's "Google Map APIの練習 " http://jsdo.it/ksk1015/26bu

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

function getColorIconUrl( c ) {
    var colorHash = {
		"無":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_black.png",  // "#000000",
		"白":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png",   // "#ffffff",
		"肌":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_white.png",  // "#ffcccc",
		"茶":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png", // "#800000",
		"赤":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png",    // "#ff0000",
		"黄":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_yellow.png", // "#ffff00",
		"緑":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png",  // "#00ff00",
		"水":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_ltblue.png", // "#00ffff",
		"青":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png",   // "#0000ff",
		"紫":"//maps.gstatic.com/mapfiles/ridefinder-images/mm_20_purple.png"  // "#800080"
	};

    return colorHash[ c ];
}


var mapElem = document.getElementById("map");

var map = new google.maps.Map(mapElem, {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng( 35.685692 + Y_START_POS/1000, 139.754784 + X_START_POS/1000 ),
    mapTypeControlOptions: { mapTypeIds: ['mono', google.maps.MapTypeId.ROADMAP] },
    zoom: 12,
    streetViewControl: false
});

var i, x, y;
var iconUrl;
for ( i = 0; i < dataSet.length; i++ ) {
    
    x = ( i % 16 ) * DOT_SIZE;
    y = ( 16 - Math.floor( i / 16 ) ) * DOT_SIZE;

    var point = new google.maps.LatLng(35.685692 + y / 1000, 139.754784 + x / 1000);

    if ( dataSet[i] != "無" ) {
        iconUrl = getColorIconUrl(dataSet[i]);
    
        var marker =  new google.maps.Marker({
            icon: iconUrl,
            position: point,
            map: map,
            draggable: true
        });
    }
}

/*取得スタイルの貼り付け*/
var styleOptions = [
{
    "stylers": [
        { "saturation": -100 },
        { "visibility": "simplified" },
        { "lightness": 22 }
    ]
}
];
var styledMapOptions = { name: 'モノクロ' };
var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
map.mapTypes.set('mono', sampleType);
map.setMapTypeId('mono');
