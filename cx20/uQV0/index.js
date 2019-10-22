// forked from cx20's "Google マップで絵を描いてみるテスト" http://jsdo.it/cx20/qbTa
// forked from ksk1015's "Google Map APIの練習 マーカーとウィンドウ付ける" http://jsdo.it/ksk1015/i9yq
// forked from ksk1015's "Google Map APIの練習 " http://jsdo.it/ksk1015/26bu

var DOT_SIZE = 3;
var X_START_POS = 50;
var Y_START_POS = 20;

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
    // 通常マーカーアイコン
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
    // 小マーカーアイコン
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

function getColorName( c ) {
    var colorHash = {
		"無":"black",  // "#000000",
		"白":"blue",   // "#ffffff",
		"肌":"beige",  // "#ffcccc",
		"茶":"brown",  // "#800000",
		"赤":"red",    // "#ff0000",
		"黄":"yellow", // "#ffff00",
		"緑":"green",  // "#00ff00",
		"水":"ltblue", // "#00ffff",
		"青":"blue",   // "#0000ff",
		"紫":"purple"  // "#800080"
	};

    return colorHash[ c ];
}

function getColorNo( c ) {
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

var mapElem = document.getElementById("map");

var map = new google.maps.Map(mapElem, {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng( 35.685692 + Y_START_POS/72, 139.054784 + X_START_POS/60 ),
    //zoom: 12,
    zoom: 8,
    streetViewControl: false
});

var i, x, y;
var iconUrl;
//for ( i = 0; i < dataSet.length; i++ ) {
for ( i = dataSet.length - 1; i >= 0; i-- ) {
    
    x = ( i % 16 ) * DOT_SIZE;
    y = ( 16 - Math.floor( i / 16 ) ) * DOT_SIZE;

    var point = new google.maps.LatLng(35.685692 + y/72, 139.054784 + x/60);

    if ( dataSet[i] != "無" ) {
        var dotRect = {
          path: 'M0,0 L0,10 L10,10 L10,0 z',
          //fillColor: getColorName(dataSet[i]),
          fillColor: getColorNo(dataSet[i]),
          fillOpacity: 0.8, // 透明度
          scale: 0.9,
          strokeColor: "black",
          strokeWeight: 0.5
        };

        var marker =  new google.maps.Marker({
            icon: dotRect,
            position: point,
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
    }
    
}
