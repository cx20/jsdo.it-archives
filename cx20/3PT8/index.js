// forked from Akiyah's "Box2dWeb Demo" http://jsdo.it/Akiyah/y7Rd

var DOT_SIZE = 12;
var X_START_POS = 50;
var Y_START_POS = 50;

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

function getRgbColor(c) {
    var colorHash = {
        "無": "#000000",
        "白": "#ffffff",
        "肌": "#ffcccc",
        "茶": "#800000",
        "赤": "#ff0000",
        "黄": "#ffff00",
        "緑": "#00ff00",
        "水": "#00ffff",
        "青": "#0000ff",
        "紫": "#800080"
    };
    return colorHash[c];
}

function init() {
    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2AABB = Box2D.Collision.b2AABB;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2World = Box2D.Dynamics.b2World;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

    var worldScale = 30;

    var world = new b2World(new b2Vec2(0, 10), true);

    var canvasPosition = getElementPosition(document.getElementById("canvas"));

    debugDraw();
    window.setInterval(update, 1000 / 60);

    createBox(440, 5, 220,   0, b2Body.b2_staticBody, "#00ff00");
    createBox(440, 5, 220, 440, b2Body.b2_staticBody, "#00ff00");
    createBox(5, 440,   0, 220, b2Body.b2_staticBody, "#00ff00");
    createBox(5, 440, 440, 220, b2Body.b2_staticBody, "#00ff00");

    document.addEventListener("mousedown", function (e) {
        createBox(10, 10, e.clientX - canvasPosition.x, e.clientY - canvasPosition.y, b2Body.b2_dynamicBody, "#ffffff");
    });
    var i, x, y;
    var color;
    for (i = 0; i < dataSet.length; i++) {
        x = (i % 16) * DOT_SIZE + 0; // X_START_POS;
        y = Math.floor(i / 16) * DOT_SIZE;
        color = getRgbColor(dataSet[i]);
        createBox(10, 10, x, y, b2Body.b2_dynamicBody, color);
    }

    function createBox(width, height, pX, pY, type, color) {
        var bodyDef = new b2BodyDef;
        bodyDef.type = type;
        bodyDef.position.Set(pX / worldScale, pY / worldScale);
        bodyDef.userData = color;
        var polygonShape = new b2PolygonShape;
        polygonShape.SetAsBox(width / 2 / worldScale, height / 2 / worldScale);
        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.5;
        fixtureDef.shape = polygonShape;
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
    }

    function debugDraw() {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
        debugDraw.SetDrawScale(30.0);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
    }

    function update() {
        world.Step(1 / 60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();

        var context = document.getElementById("canvas").getContext("2d");
        for (var b = world.GetBodyList(); b; b = b.GetNext()) {
            if (b.GetType() == b2Body.b2_dynamicBody) {
                var pos = b.GetPosition();
                var color = b.GetUserData();

                context.save();
                context.translate(pos.x * worldScale, pos.y * worldScale);
                context.rotate(b.GetAngle());
                if (color != "#ffffff") {
                    context.fillStyle = color;
                    context.fillRect(pos.x - 5, pos.y - 5, 10, 10); // TODO:崩壊時の回転に対応できていない。
                }
                context.restore();
            }
        }
    };

    //http://js-tut.aardon.de/js-tut/tutorial/position.html

    function getElementPosition(element) {
        var elem = element,
            tagname = "",
            x = 0,
            y = 0;
        while ((typeof (elem) == "object") && (typeof (elem.tagName) != "undefined")) {
            y += elem.offsetTop;
            x += elem.offsetLeft;
            tagname = elem.tagName.toUpperCase();
            if (tagname == "BODY") {
                elem = 0;
            }
            if (typeof (elem) == "object") {
                if (typeof (elem.offsetParent) == "object") {
                    elem = elem.offsetParent;
                }
            }
        }
        return {
            x: x,
            y: y
        };
    }

};