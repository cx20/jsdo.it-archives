// forked from "WebGL Earth API: Satellite" http://examples.webglearth.org/examples/satellite.html

function initialize() {
    var options = {atmosphere: true, center: [0, 0], zoom: 0};
    var earth = new WE.map('earth_div', options);
/*
    WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
        subdomains: '1234',
        attribution: 'Tiles Courtesy of MapQuest'
    }).addTo(earth);
*/
    WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
      minZoom: 0,
      maxZoom: 5,
      attribution: 'NASA'
    }).addTo(earth);
    // Start a simple rotation animation
    setInterval(function() {
        var c = earth.getPosition();
        earth.setCenter([c[0], c[1] + 1.0]);
    }, 30);
}

initialize();
