// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その９）（失敗）" http://jsdo.it/cx20/d2KX
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その８）" http://jsdo.it/cx20/8Jmv
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その７）" http://jsdo.it/cx20/A5nH
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その６）" http://jsdo.it/cx20/i5wV
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その５）" http://jsdo.it/cx20/qEka
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その４）" http://jsdo.it/cx20/jEqZ
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その３）" http://jsdo.it/cx20/ky6o
// forked from cx20's "地理院地図3Dデータを使ってみるテスト（その２）" http://jsdo.it/cx20/rrlt
// forked from cx20's "地理院地図3Dデータを使ってみるテスト" http://jsdo.it/cx20/l4shv

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function (evt) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    var k = 2.5;    // 倍率
    var x1 = 128;
    var y1 = 128;
    var x2 = 192;
    var y2 = 192;
    var mapData = (evt.target.response || evt.target.responseText).split("\n");
    for (var i = 0; i < y2; i++) {
        var r = mapData[i].split(",");
        for (var j = 0; j < x2; j++) {
            var x = j * k;
            var y = i * k;
            var z = r[j] * 30;
            
            var h = z % 360;
            var s = 100;
            var l = 50;
            ctx.fillStyle = "hsl(" + h + "," + s + "%," + l + "%)";
            ctx.fillRect(x, y, k, k);
        }
    }

}, false);


//xhr.open('GET',  'dem.csv', true);
//xhr.open('GET', '/assets/2/g/t/o/2gtor', true); // 富士山
xhr.open('GET', '../../assets/4/9/G/4/49G4v.csv', true); // 芦ノ湖
xhr.send(null);
