// forked from cx20's "Matter.js でゴゴゴを物理演算してみるテスト" http://jsdo.it/cx20/dJbc
// forked from liabru's "Boxes & Beach Ball Physics" http://codepen.io/liabru/pen/Ivxib

// Matter module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Vertices = Matter.Vertices,
    MouseConstraint = Matter.MouseConstraint;

// create a Matter.js engine
var engine = Engine.create(document.body, {
    render: {
        options: {
            wireframes: false
        }
    }
});

// add a mouse controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

// some settings
var offset = 10,
    wallOptions = {
        isStatic: true,
        render: {
            visible: false
        }
    };

var offset = 5;
World.add(engine.world, [Bodies.rectangle(210, 400 + offset, 330 + 2 * offset, 20, {
    isStatic: true
})]);

for (var i = 0; i < 3; i++) {
    var x = 100 + i * 10;
    var y = 100 - i * 100;
    var shape = {
        label: 'Trapezoid Body' + i,
        position: {
            x: x,
            y: y
        },
        //vertices: Vertices.fromPath('L5 10 L100 0 L95 95 L0 100 L5 80 L80 75 L85 15 L0 20 Z'), // 「コ」
        //vertices: Vertices.fromPath('L0 0 L20 0 L20 40 L55 40 L50 60 L20 60 L25 100 L5 100 Z'), // 「ト」
        vertices: Vertices.fromPath('L0 40 L50 10 L100 40 L52 40 L52 100 L48 100 L48 40') // 「傘」
    };
    World.add(engine.world, [
        // 「傘」
        Body.create(Common.extend({}, shape))
    ]);
}

// run the engine
Engine.run(engine);
