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
/*
    // Start a simple rotation animation
    setInterval(function() {
        var c = earth.getPosition();
        earth.setCenter([c[0], c[1] + 1.0]);
    }, 30);
*/
}

function flyToJapan() {
    earth.panInsideBounds([[22, 122], [48, 154]],
        {heading: 0, tilt: 25, duration: 1});
}

initialize();
