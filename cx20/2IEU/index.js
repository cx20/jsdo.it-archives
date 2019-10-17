// forked from cx20's "forked: オリンピックロゴ" http://jsdo.it/cx20/W2cn
// forked from manse's "オリンピックロゴ" http://jsdo.it/manse/IARr

var dataSet = [
    {x:204, y:30, w:50, h:12, angle:0},
    {x:203, y:44, w:24, h:45, angle:74},
    {x:151, y:44, w:12, h:51, angle:419},
    {x:256, y:44, w:45, h:25, angle:14},
    {x:307, y:44, w:50, h:13, angle:29},
    {x:211, y:70, w:36, h:36, angle:360},
    {x:112, y:82, w:50, h:12, angle:360},
    {x:294, y:82, w:50, h:12, angle:0},
    {x:344, y:95, w:13, h:50, angle:59},
    {x:112, y:96, w:25, h:45, angle:72},
    {x:166, y:96, w:45, h:25, angle:15},
    {x:294, y:96, w:24, h:45, angle:73},
    {x:352, y:108, w:36, h:36, angle:360},
    {x:121, y:121, w:36, h:37, angle:360},
    {x:75, y:134, w:36, h:37, angle:59},
    {x:307, y:134, w:45, h:25, angle:15},
    {x:390, y:146, w:25, h:45, angle:14},
    {x:121, y:160, w:44, h:26, angle:72},
    {x:345, y:172, w:36, h:36, angle:29},
    {x:62, y:185, w:50, h:12, angle:30},
    {x:55, y:197, w:50, h:13, angle:59},
    {x:404, y:197, w:13, h:51, angle:30},
    {x:30, y:204, w:12, h:52, angle:360},
    {x:416, y:204, w:12, h:52, angle:360},
    {x:100, y:224, w:45, h:26, angle:44},
    {x:358, y:224, w:25, h:45, angle:43},
    {x:67, y:249, w:45, h:25, angle:73},
    {x:390, y:249, w:25, h:45, angle:14},
    {x:113, y:275, w:37, h:37, angle:59},
    {x:345, y:275, w:36, h:37, angle:29},
    {x:55, y:301, w:50, h:13, angle:59},
    {x:158, y:301, w:45, h:25, angle:74},
    {x:300, y:301, w:25, h:45, angle:15},
    {x:404, y:301, w:12, h:51, angle:29},
    {x:100, y:327, w:45, h:26, angle:44},
    {x:203, y:327, w:36, h:37, angle:59},
    {x:255, y:327, w:26, h:45, angle:44},
    {x:358, y:327, w:25, h:45, angle:44},
    {x:275, y:346, w:12, h:52, angle:360},
    {x:144, y:352, w:50, h:13, angle:59},
    {x:314, y:353, w:12, h:50, angle:29},
    {x:114, y:379, w:50, h:13, angle:29},
    {x:189, y:379, w:45, h:26, angle:44},
    {x:241, y:379, w:36, h:37, angle:29},
    {x:344, y:379, w:13, h:51, angle:419},
];

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

var pos = 0;
// 物理演算の正しさを優先。ロゴのレイアウトに問題あり。
var stack = Composites.stack(0, 0, 1, dataSet.length, 0, 0, function(x, y, column, row) {
    var style1 = "#01256d";
    var style2 = "#012060";
    var rect = dataSet[pos++];
    var body = Bodies.rectangle(0, 0, rect.w, rect.h, { render: {fillStyle:style1, strokeStyle:style2}});
    var v = {x:rect.x, y:rect.y};
    Matter.Body.translate(body, v);
    Matter.Body.rotate(body, rect.angle * Math.PI/180 );
    return body;
});

// ロゴのレイアウトを終戦。物理演算に問題あり。
/*
var stack = Composites.stack(0, 0, 1, dataSet.length, 0, 0, function(x, y, column, row) {
    var style1 = "#01256d";
    var style2 = "#012060";
    var rect = dataSet[pos++];
    //var body = Bodies.rectangle(rect.x, rect.y, rect.w, rect.h, { render: {fillStyle:style1, strokeStyle:style2 }, isStatic: true});
    var body = Bodies.rectangle(rect.x, rect.y, rect.w, rect.h, { render: {fillStyle:style1, strokeStyle:style2 }, isStatic: false});
    // 四角形の左上の回転時の原点とする
    var v1 = {x:rect.x-rect.w/2, y:rect.y-rect.h/2};
    for ( var i = 0; i < body.vertices.length; i++ ) {
        // 指定された座標からベクトルを回転
        var v2 = Matter.Vector.rotateAbout(body.vertices[i], Math.PI*rect.angle/180, v1 ); // vector, angle, point
        // 取得した座標のみを反映（直接 Vector を代入すると、プロパティ情報が失われるため）
        body.vertices[i].x = v2.x;
        body.vertices[i].y = v2.y;
    }
    return body;
});
*/

// create the ground the stack will sit on
var ground = Bodies.rectangle(200, 400, 500, 10, { isStatic: true });

// create the wrecking ball
var ball = Bodies.circle(-60, 60, 20, { density: 1, frictionAir: 0.001});

// add all of the bodies to the world
World.add(engine.world, [stack, ground]);

// run the engine
Engine.run(engine);

// for debug
var renderOptions = engine.render.options;
renderOptions.showAxes = true;
renderOptions.showCollisions = true;
renderOptions.showPositions = true;
renderOptions.showConvexHulls = true;
