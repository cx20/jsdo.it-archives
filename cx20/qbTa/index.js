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
/*
    var colorHash = {
		"無":"//maps.google.co.jp/mapfiles/ms/icons/black.png",  // "#000000",
		"白":"//maps.google.co.jp/mapfiles/ms/icons/blue.png",   // "#ffffff",
		"肌":"//maps.google.co.jp/mapfiles/ms/icons/yellow.png", // "#ffcccc",
		"茶":"//maps.google.co.jp/mapfiles/ms/icons/orange.png", // "#800000",
		"赤":"//maps.google.co.jp/mapfiles/ms/icons/red.png",    // "#ff0000",
		"黄":"//maps.google.co.jp/mapfiles/ms/icons/yellow.png", // "#ffff00",
		"緑":"//maps.google.co.jp/mapfiles/ms/icons/green.png",  // "#00ff00",
		"水":"//maps.google.co.jp/mapfiles/ms/icons/ltblue.png", // "#00ffff",
		"青":"//maps.google.co.jp/mapfiles/ms/icons/blue.png",   // "#0000ff",
		"紫":"//maps.google.co.jp/mapfiles/ms/icons/purple.png"  // "#800080"
	};
*/
    var colorHash = {
		"無":"//labs.google.com/ridefinder/images/mm_20_black.png",  // "#000000",
		"白":"//labs.google.com/ridefinder/images/mm_20_blue.png",   // "#ffffff",
		"肌":"//labs.google.com/ridefinder/images/mm_20_white.png",  // "#ffcccc",
		"茶":"//labs.google.com/ridefinder/images/mm_20_orange.png", // "#800000",
		"赤":"//labs.google.com/ridefinder/images/mm_20_red.png",    // "#ff0000",
		"黄":"//labs.google.com/ridefinder/images/mm_20_yellow.png", // "#ffff00",
		"緑":"//labs.google.com/ridefinder/images/mm_20_green.png",  // "#00ff00",
		"水":"//labs.google.com/ridefinder/images/mm_20_ltblue.png", // "#00ffff",
		"青":"//labs.google.com/ridefinder/images/mm_20_blue.png",   // "#0000ff",
		"紫":"//labs.google.com/ridefinder/images/mm_20_purple.png"  // "#800080"
	};

    return colorHash[ c ];
}


var mapElem = document.getElementById("map");

var map = new google.maps.Map(mapElem, {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng( 35.685692 + Y_START_POS/1000, 139.754784 + X_START_POS/1000 ),
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
