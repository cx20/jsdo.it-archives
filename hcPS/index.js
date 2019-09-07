// forked from liabru's "Wrecking Ball Physics" http://codepen.io/liabru/pen/zwDiE

var DOT_SIZE = 16;
var X_START_POS = 100;
var Y_START_POS = 80;

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

function getTexture( c )
{
    var textureHash = {
        "無":"../assets/v/N/a/u/vNauP.png", // block_black.png",
        "白":"../assets/y/l/s/1/yls1Y.png", // block_white.png",
        "肌":"../assets/f/z/1/T/fz1Ta.png", // block_beige.png",
        "茶":"../assets/7/C/V/6/7CV6C.png", // block_brown.png",
        "赤":"../assets/4/W/5/e/4W5e7.png", // block_red.png",
        "黄":"../assets/4/5/t/5/45t52.png", // block_yellow.png",
        "緑":"../assets/8/q/x/5/8qx5Y.png", // block_green.png",
        "水":"../assets/c/n/I/B/cnIBE.png", // block_ltblue.png",
        "青":"../assets/g/b/P/W/gbPW5.png", // block_blue.png",
        "紫":"../assets/1/y/8/H/1y8HS.png"  // block_purple.png"
    };
    return textureHash[ c ];
}

// Matter module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;

// create a Matter.js engine
var engine = Engine.create(document.body, {
    render: {
        options: {
            showAngleIndicator: false,
            wireframes: false
        }
    }
});

// add a mouse controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

var offset = 5;
World.addBody(engine.world, Bodies.rectangle(210, 400 + offset, 330 + 2 * offset, 20, {
    isStatic: true
}));

var _i = 0;

var rows = 10;
var yy = 600 - 50 - 40 * rows;

var stack = Composites.stack(X_START_POS, yy, DOT_SIZE, DOT_SIZE, 0, 0, function (x, y, column, row) {
    var color = dataSet[_i++];
    var style = getRgbColor(color);
    return Bodies.rectangle(x, y, DOT_SIZE, DOT_SIZE, {
        friction: 0.9,
        restitution: 0.1,
        render: {
            //fillStyle:style,
            sprite: {
                texture: getTexture(color)
            }
        }
    });
});

World.addComposite(engine.world, stack);

// 鉄球の初期位置
var ball = Bodies.circle(-160, 160, 20, {
    density: 1,
    frictionAir: 0.001
});

// ワイヤーの原点
World.addBody(engine.world, ball);
World.addConstraint(engine.world, Constraint.create({
    pointA: {
        x: 40,
        y: 60
    },
    bodyB: ball
}));

// run the engine
Engine.run(engine);