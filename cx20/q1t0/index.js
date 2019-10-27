// forked from goodboy's "pixi.js example" http://pixijs.github.io/examples/index.html?s=basics&f=textured-mesh.js&title=Textured+Mesh&v=v3.0.2
// forked from cx20's "pixi.js v3 を試してみるテスト（その３）" http://jsdo.it/cx20/uhVV
// forked from goodboy's "pixi.js example" http://www.goodboydigital.com/pixijs/bunnymark/
// forked from cx20's "pixi.js v3 を試してみるテスト（その２）" http://jsdo.it/cx20/tWmt
// forked from goodboy's "pixi.js example" http://www.goodboydigital.com/pixijs/masky/
// forked from cx20's "pixi.js v3 を試してみるテスト" http://jsdo.it/cx20/4c4K
// forked from cx20's "pixi.js v2 を試してみるテスト" http://jsdo.it/cx20/vmuo

var renderer = PIXI.autoDetectRenderer(465, 465);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var count = 0;

// build a rope!
var ropeLength = 465 / 25;
var ropeLength = 25;

var points = [];

for (var i = 0; i < 20; i++)
{
    points.push(new PIXI.Point(i * ropeLength, 0));
}

var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('../../assets/A/k/w/j/AkwjW.jpg'), points); // frog.jpg

strip.position.x = 0;
strip.position.y = 230;

stage.addChild(strip);

var g = new PIXI.Graphics();

g.x = strip.x;
g.y = strip.y;
stage.addChild(g);

// start animating
animate();

function animate() {

    count += 0.1;

    // make the snake
    for (var i = 0; i < points.length; i++) {
        points[i].y = Math.sin((i * 0.5) + count) * 10;
        points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 10;
    }

    // render the stage
    renderer.render(stage);
    renderPoints();
    requestAnimationFrame(animate);
}

function renderPoints() {

    g.clear();
    g.lineStyle(2, 0xffc2c2);
    g.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length; i++) {
        g.lineTo(points[i].x, points[i].y);
    };

    for (var i = 1; i < points.length; i++) {
        g.beginFill(0x00ff22);
        g.drawCircle(points[i].x, points[i].y, 5);
        g.endFill();
    };
}