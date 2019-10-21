// forked from cx20's "WebGL Earth で奥の細道を旅してみるテスト" http://jsdo.it/cx20/yKOU
// forked from cx20's "WebGL Earth API を試してみるテスト（その２）" http://jsdo.it/cx20/bMh0
// forked from cx20's "WebGL Earth API を試してみるテスト" http://jsdo.it/cx20/5aj8
// forked from "WebGL Earth API: Satellite" http://examples.webglearth.org/examples/satellite.html

var earth;
function initialize() {
    var options = {atmosphere: true, center: [0, 0], zoom: 0};
    earth = new WE.map('earth_div', options);
    WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
        subdomains: '1234',
        attribution: 'Tiles Courtesy of MapQuest'
    }).addTo(earth);
}

var markers = [];


// 山岳座標データ
var dataSet = [
    { name: "御嶽山" ,longitude: 137.480278, latitude: 35.892778 }
];

function putMarkers() {
    for (var i = 0; i < dataSet.length; i++) {
        var data = dataSet[i];
        var marker = WE.marker([data.latitude, data.longitude]).addTo(earth);
        marker.bindPopup(data.name, {
            maxWidth: 40,
            closeButton: false
        }).closePopup();
        markers.push(marker);
    }
}

function flyToJapan() {
    earth.panInsideBounds([
        [35 - 2, 139 - 2],
        [35 + 2, 139 + 2]
    ], {
        heading: 0,
        tilt: 45,
        duration: 1
    });
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
        earth.panInsideBounds([
            [data.latitude - 1, data.longitude - 1],
            [data.latitude + 1, data.longitude + 1]
        ], {
            heading: 0,
            tilt: 45,
            duration: 1
        });
        oldpos = pos;
        pos++;
    } else {
        clearInterval(timer);
        //flyToJapan();
        var oldmarker = markers[oldpos]
        oldmarker.closePopup();    // 前回のマーカーのポップアップをクローズする
    }
}

initialize();
putMarkers();
flyToJapan();
