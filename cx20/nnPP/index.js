// forked from cx20's "Leaflet.js でドット絵を描いてみるテスト" http://jsdo.it/cx20/3bxL
var DOT_SIZE = 3;
var X_START_POS = 50;
var Y_START_POS = 30;

var map = L.map('map').setView([35.685692 + Y_START_POS/1000, 139.754784 + X_START_POS/1000], 12);

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    maxZoom: 18,
    id: 'examples.map-i86knfo3'
}).addTo(map);

var markers = [];

// 奥の細道座標データ
var dataSet = [
	{ name: "深川" ,longitude: 139.796328, latitude: 35.68496048 },
	{ name: "千住" ,longitude: 139.7989021, latitude: 35.74075044 },
	{ name: "草加" ,longitude: 139.8026561, latitude: 35.83777446 },
	{ name: "室の八嶋" ,longitude: 139.7278221, latitude: 36.38956157 },
	{ name: "日光" ,longitude: 139.595172, latitude: 36.74085364 },
	{ name: "黒羽" ,longitude: 140.1361612, latitude: 36.87061167 },
	{ name: "殺生石" ,longitude: 140.0050361, latitude: 37.08270271 },
	{ name: "遊行柳" ,longitude: 140.1611012, latitude: 36.9876187 },
	{ name: "白河の関" ,longitude: 140.2223202, latitude: 37.05099571 },
	{ name: "須賀川" ,longitude: 140.3518932, latitude: 37.29366976 },
	{ name: "二本松" ,longitude: 140.4337802, latitude: 37.58585782 },
	{ name: "福島" ,longitude: 140.4544072, latitude: 37.75502585 },
	{ name: "飯坂温泉" ,longitude: 140.4499352, latitude: 37.83010387 },
	{ name: "岩沼" ,longitude: 140.8718783, latitude: 38.10956793 },
	{ name: "笠島" ,longitude: 140.8800753, latitude: 38.17076194 },
	{ name: "仙台" ,longitude: 140.8760363, latitude: 38.27074196 },
	{ name: "多賀城" ,longitude: 141.0060883, latitude: 38.29520997 },
	{ name: "塩釜" ,longitude: 141.0215683, latitude: 38.32132397 },
	{ name: "松島" ,longitude: 141.0734783, latitude: 38.39190999 },
	{ name: "平泉" ,longitude: 141.1198584, latitude: 38.98758311 },
	{ name: "尿前の関" ,longitude: 140.6966253, latitude: 38.73737006 },
	{ name: "尾花沢" ,longitude: 140.3959992, latitude: 38.59741803 },
	{ name: "立石寺" ,longitude: 140.4359982, latitude: 38.31144697 },
	{ name: "本合海" ,longitude: 140.2356272, latitude: 38.73192106 },
	{ name: "出羽三山" ,longitude: 139.9114071, latitude: 38.71261905 },
	{ name: "酒田" ,longitude: 139.8322951, latitude: 38.9195751 },
	{ name: "象潟" ,longitude: 139.9033211, latitude: 39.21469716 },
	{ name: "新潟" ,longitude: 139.4319, latitude: 38.19720195 },
	{ name: "越後" ,longitude: 138.7042649, latitude: 37.53612481 },
	{ name: "市振" ,longitude: 138.3094148, latitude: 37.17657273 },
	{ name: "那古" ,longitude: 137.0940845, latitude: 36.77941165 },
	{ name: "倶利伽羅峠(1)" ,longitude: 136.8745355, latitude: 36.66189363 },
	{ name: "倶利伽羅峠(2)" ,longitude: 136.7427974, latitude: 36.67488863 },
	{ name: "金沢" ,longitude: 136.6627794, latitude: 36.56398361 },
	{ name: "小松" ,longitude: 136.4437074, latitude: 36.40714857 },
	{ name: "山中温泉" ,longitude: 136.3698504, latitude: 36.25238854 },
	{ name: "那谷寺" ,longitude: 136.4205894, latitude: 36.31527156 },
	{ name: "加賀の全昌寺" ,longitude: 136.3076614, latitude: 36.30334555 },
	{ name: "汐越の松" ,longitude: 136.2099323, latitude: 36.17176253 },
	{ name: "福井" ,longitude: 136.2170573, latitude: 36.0652255 },
	{ name: "敦賀" ,longitude: 136.0292263, latitude: 35.69100243 },
	{ name: "色の浜" ,longitude: 136.0349613, latitude: 35.72917743 },
	{ name: "大垣" ,longitude: 136.6105784, latitude: 35.35558236 }
]

function putMarkers() {
    for (var i = 0; i < dataSet.length; i++) {
        var data = dataSet[i];
        var marker = L.marker([data.latitude, data.longitude]).addTo(map);
        marker.bindPopup(data.name, {
            maxWidth: 40,
            closeButton: false
        }).closePopup();
        markers.push(marker);
    }
}

function flyToJapan() {
    map.setView([37, 139], 6);
}

var pos = 0;
var oldpos = 0;
var timer = 0;

function letsGoTour() {
    pos = 0;
    // １秒毎に滞在先を変更する
    timer = setInterval(stay, 1000);
}

function stay() {
    if (pos < dataSet.length) {
        var data = dataSet[pos];
        var oldmarker = markers[oldpos]
        oldmarker.closePopup();    // 前回のマーカーのポップアップをクローズする
        var marker = markers[pos]
        marker.openPopup();        // 現在のマーカーのポップアップを表示する
        map.setView( [data.latitude, data.longitude], 10 );
        oldpos = pos;
        pos++;
    } else {
        clearInterval(timer);
        flyToJapan();
        var oldmarker = markers[oldpos]
        oldmarker.closePopup();    // 前回のマーカーのポップアップをクローズする
    }
}

putMarkers();
flyToJapan();
