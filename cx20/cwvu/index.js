// forked from kingpanda's "マルチcanvasを立体表示" http://jsdo.it/kingpanda/AkKK
var DOT_SIZE = 0.3;
var X_START_POS = -2.5;
var Y_START_POS = 0.5;

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
        //"無":"#000000",
        "無":"#dcaa6b",  // 段ボール色
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

var canvas1, canvas2, canvas3;
var ctx1, ctx2, ctx3;
var w, h,
    world, planeBody;
var circleShape = [];
var circleBody = [];

init();
animate();

function init() {

    // Init canvas
    canvas1 = document.getElementById("canvas1");
    canvas2 = document.getElementById("canvas2");
    canvas3 = document.getElementById("canvas3");
    w = canvas1.width;
    h = canvas1.height;

    ctx1 = canvas1.getContext("2d");
    ctx1.lineWidth = 0.05;
    ctx2 = canvas2.getContext("2d");
    ctx2.lineWidth = 0.05;
    ctx3 = canvas3.getContext("2d");
    ctx3.lineWidth = 0.05;

    // Init p2.js
    world = new p2.World();

    // Add a circle
    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * DOT_SIZE + Math.random(1) / 100;
        var y = (16 - Math.floor(i / 16)) * DOT_SIZE;
        circleShape[i] = new p2.Circle(DOT_SIZE / 2 * 0.8);
        circleBody[i] = new p2.Body({
            mass: 1,
            position: [x + X_START_POS, y + Y_START_POS]
        });
        circleBody[i].addShape(circleShape[i]);
        world.addBody(circleBody[i]);
    }

    // Add a plane
    planeShape = new p2.Plane();
    planeBody = new p2.Body({
        position: [0, -1.5]
    });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);
}

function drawCircle() {
    ctx1.lineWidth = 0.01;
    ctx2.lineWidth = 0.01;
    ctx3.lineWidth = 0.01;
    for (var i = 0; i < dataSet.length; i++) {
        var x = circleBody[i].position[0] * 1.0,
            y = circleBody[i].position[1],
            radius = circleShape[i].radius * 1.0;
        ctx1.beginPath();
        ctx1.save();
        ctx1.arc(x + 3.0, y, radius, 0, 2 * Math.PI);
        ctx1.fillStyle = getRgbColor(dataSet[i]);
        ctx1.fill();
        ctx1.strokeStyle = "#555";
        ctx1.stroke();
        ctx1.restore();

        ctx2.beginPath();
        ctx2.save();
        ctx2.arc(x, y, radius, 0, 2 * Math.PI);
        ctx2.fillStyle = getRgbColor(dataSet[i]);
        ctx2.fill();
        ctx2.strokeStyle = "#555";
        ctx2.stroke();
        ctx2.restore();

        ctx3.beginPath();
        ctx3.save();
        ctx3.arc(x - 3.0, y, radius, 0, 2 * Math.PI);
        ctx3.fillStyle = getRgbColor(dataSet[i]);
        ctx3.fill();
        ctx3.strokeStyle = "#555";
        ctx3.stroke();
        ctx3.restore();
    }
}

function drawPlane() {
    var y = planeBody.position[1];
    ctx1.moveTo(-w, y);
    ctx1.lineTo(w, y);
    ctx1.stroke();

    ctx2.moveTo(-w, y);
    ctx2.lineTo(w, y);
    ctx2.stroke();

    ctx3.moveTo(-w, y);
    ctx3.lineTo(w, y);
    ctx3.stroke();
}

function render() {
    // Clear the canvas
    ctx1.clearRect(0, 0, w, h);
    ctx2.clearRect(0, 0, w, h);
    ctx3.clearRect(0, 0, w, h);

    // Transform the canvas
    // Note that we need to flip the y axis since Canvas pixel coordinates
    // goes from top to bottom, while physics does the opposite.
    ctx1.save();
    ctx1.translate(w / 2, h / 2); // Translate to the center
    ctx1.scale(50, -50); // Zoom in and flip y axis

    ctx2.save();
    ctx2.translate(w / 2, h / 2); // Translate to the center
    ctx2.scale(50, -50); // Zoom in and flip y axis

    ctx3.save();
    ctx3.translate(w / 2, h / 2); // Translate to the center
    ctx3.scale(50, -50); // Zoom in and flip y axis

    // Draw all bodies
    drawCircle();
    drawPlane();

    // Restore transform
    ctx1.restore();
    ctx2.restore();
    ctx3.restore();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move physics bodies forward in time
    world.step(1 / 60);

    // Render scene
    render();
}