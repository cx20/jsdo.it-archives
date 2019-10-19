// forked from cx20's "p2.js でドット絵を物理演算してみるテスト（その１）" http://jsdo.it/cx20/hizq
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

var canvas, ctx, w, h,
    world, planeBody;
var circleShape = [];
var circleBody = [];

init();
animate();

function init() {

    // Init canvas
    canvas = document.getElementById("myCanvas");
    w = canvas.width;
    h = canvas.height;

    ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.05;

    // Init p2.js
    world = new p2.World();

    // Add a circle
    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * DOT_SIZE + Math.random(1) / 100; // スタック防止の為、ランダム値を追加
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
        position: [0, -2]
    });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);
}

function drawCircle() {
    ctx.lineWidth = 0.01;
    for (var i = 0; i < dataSet.length; i++) {
        ctx.beginPath();
        var x = circleBody[i].position[0],
            y = circleBody[i].position[1],
            radius = circleShape[i].radius;
        ctx.save();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = getRgbColor(dataSet[i]);
        ctx.fill();
        ctx.strokeStyle = "#555";
        ctx.stroke();
        ctx.restore();
    }
}

function drawPlane() {
    var y = planeBody.position[1];
    ctx.moveTo(-w, y);
    ctx.lineTo(w, y);
    ctx.stroke();
}

function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, w, h);

    // Transform the canvas
    // Note that we need to flip the y axis since Canvas pixel coordinates
    // goes from top to bottom, while physics does the opposite.
    ctx.save();
    ctx.translate(w / 2, h / 2); // Translate to the center
    ctx.scale(50, -50); // Zoom in and flip y axis

    // Draw all bodies
    drawCircle();
    drawPlane();

    // Restore transform
    ctx.restore();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Move physics bodies forward in time
    world.step(1 / 60);

    // Render scene
    render();
}