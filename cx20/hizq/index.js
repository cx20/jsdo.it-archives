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
var boxShape = [];
var boxBody = [];

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

    // Add a box
    for (var i = 0; i < dataSet.length; i++) {
        var x = (i % 16) * DOT_SIZE;
        var y = (16 - Math.floor(i / 16)) * DOT_SIZE;
        boxShape[i] = new p2.Rectangle(DOT_SIZE * 0.8, DOT_SIZE * 0.8);
        boxBody[i] = new p2.Body({
            mass: 1,
            position: [x + X_START_POS, y + Y_START_POS],
            angularVelocity: 0
        });
        boxBody[i].addShape(boxShape[i]);
        world.addBody(boxBody[i]);
    }

    // Add a plane
    planeShape = new p2.Plane();
    planeBody = new p2.Body({
        position: [0, -2]
    });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);
}

function drawbox() {
    ctx.lineWidth = 0.01;
    for (var i = 0; i < dataSet.length; i++) {
        ctx.beginPath();
        var x = boxBody[i].position[0],
            y = boxBody[i].position[1];
        ctx.save();
        ctx.translate(x, y); // Translate to the center of the box
        ctx.rotate(boxBody[i].angle); // Rotate to the box body frame
        ctx.fillStyle = getRgbColor(dataSet[i]);
        ctx.fillRect(-boxShape[i].width / 2, -boxShape[i].height / 2, boxShape[i].width, boxShape[i].height);
        ctx.strokeStyle = "#555";
        ctx.strokeRect(-boxShape[i].width / 2, -boxShape[i].height / 2, boxShape[i].width, boxShape[i].height);
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
    drawbox();
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