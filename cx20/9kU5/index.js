// forked from cx20's "box2dweb.js テスト" http://jsdo.it/cx20/3PT8
// forked from Akiyah's "Box2dWeb Demo" http://jsdo.it/Akiyah/y7Rd

var DOT_SIZE = 12;
var X_START_POS = 3;
var Y_START_POS = 0;

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

var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


var Physics = window.Physics = function (element, scale) {
    var gravity = new b2Vec2(0, 9.8);
    this.world = new b2World(gravity, true);
    this.element = element;
    this.context = element.getContext("2d");
    this.scale = scale || 20;
    this.dtRemaining = 0;
    this.stepAmount = 1 / 60;
};

Physics.prototype.debug = function () {
    this.debugDraw = new b2DebugDraw();
    this.debugDraw.SetSprite(this.context);
    this.debugDraw.SetDrawScale(this.scale);
    this.debugDraw.SetFillAlpha(0.3);
    this.debugDraw.SetLineThickness(1.0);
    this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    this.world.SetDebugDraw(this.debugDraw);
};

Physics.prototype.step = function (dt) {
    this.dtRemaining += dt;
    while (this.dtRemaining > this.stepAmount) {
        this.dtRemaining -= this.stepAmount;
        this.world.Step(this.stepAmount,
                        10, // velocity iterations
                        10); // position iterations
    }
    if (this.debugDraw) {
        this.world.DrawDebugData();
    } else {
        var obj = this.world.GetBodyList();
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        
        this.context.save();
        this.context.scale(this.scale, this.scale);
        while (obj) {
            var body = obj.GetUserData();
            if (body) {
                body.draw(this.context);
            }
            
            obj = obj.GetNext();
        }
        this.context.restore();
    }
};


Physics.prototype.click = function (callback) {
    var self = this;
    
    function handleClick(e) {
        e.preventDefault();
        var point = {
            x: (e.offsetX || e.layerX) / self.scale,
            y: (e.offsetY || e.layerY) / self.scale
        };
        
        self.world.QueryPoint(function (fixture) {
            callback(fixture.GetBody(),
                     fixture,
                     point);
        }, point);
    }
    
    this.element.addEventListener("mousedown", handleClick);
    this.element.addEventListener("touchstart", handleClick);
};

Physics.prototype.dragNDrop = function () {
    var self = this;
    var obj = null;
    var joint = null;
    
    function calculateWorldPosition(e) {
        return point = {
            x: (e.offsetX || e.layerX) / self.scale,
            y: (e.offsetY || e.layerY) / self.scale
        };
    }
    
    this.element.addEventListener("mousedown", function (e) {
        e.preventDefault();
        var point = calculateWorldPosition(e);
        self.world.QueryPoint(function (fixture) {
            obj = fixture.GetBody().GetUserData();
        }, point);
    });
    
    this.element.addEventListener("mousemove", function (e) {
        if (!obj) {
            return;
        }
        var point = calculateWorldPosition(e);
        
        if (!joint) {
            var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();
            
            jointDefinition.bodyA = self.world.GetGroundBody();
            jointDefinition.bodyB = obj.body;
            jointDefinition.target.Set(point.x, point.y);
            jointDefinition.maxForce = 100000;
            jointDefinition.timeStep = self.stepAmount;
            joint = self.world.CreateJoint(jointDefinition);
        }
        
        joint.SetTarget(new b2Vec2(point.x, point.y));
    });
    
    this.element.addEventListener("mouseup", function (e) {
        obj = null;
        if (joint) {
            self.world.DestroyJoint(joint);
            joint = null;
        }
    });
    
};


Physics.prototype.collision = function () {
    this.listener = new Box2D.Dynamics.b2ContactListener();
    this.listener.PostSolve = function (contact, impulse) {
        var bodyA = contact.GetFixtureA().GetBody().GetUserData(),
            bodyB = contact.GetFixtureB().GetBody().GetUserData();
        
        if (bodyA.contact) {
            bodyA.contact(contact, impulse, true);
        }
        if (bodyB.contact) {
            bodyB.contact(contact, impulse, false);
        }
        
    };
    this.world.SetContactListener(this.listener);
};

var Body = window.Body = function (physics, details) {
    this.details = details = details || {};
    
    // Create the definition
    this.definition = new b2BodyDef();
    
    // Set up the definition
    for (var k in this.definitionDefaults) {
        this.definition[k] = details[k] || this.definitionDefaults[k];
    }
    this.definition.position = new b2Vec2(details.x || 0, details.y || 0);
    this.definition.linearVelocity = new b2Vec2(details.vx || 0, details.vy || 0);
    this.definition.userData = this;
    this.definition.type = details.type == "static" ? b2Body.b2_staticBody :
    b2Body.b2_dynamicBody;
    
    // Create the Body
    this.body = physics.world.CreateBody(this.definition);
    
    // Create the fixture
    this.fixtureDef = new b2FixtureDef();
    for (var l in this.fixtureDefaults) {
        this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
    }
    
    
    details.shape = details.shape || this.defaults.shape;
    
    switch (details.shape) {
        case "circle":
            details.radius = details.radius || this.defaults.radius;
            this.fixtureDef.shape = new b2CircleShape(details.radius);
            break;
        case "polygon":
            this.fixtureDef.shape = new b2PolygonShape();
            this.fixtureDef.shape.SetAsArray(details.points, details.points.length);
            break;
        case "block":
            details.width = details.width || this.defaults.width;
            details.height = details.height || this.defaults.height;
            
            this.fixtureDef.shape = new b2PolygonShape();
            this.fixtureDef.shape.SetAsBox(details.width / 2,
                                           details.height / 2);
            break;
        default:
            break;
    }
    
    this.body.CreateFixture(this.fixtureDef);
};

Body.prototype.defaults = { shape: "block", width: 4, height: 4, radius: 1 };

Body.prototype.fixtureDefaults = { density: 2, friction: 1, restitution: 0.2 };

Body.prototype.definitionDefaults = {
    active: true,
    allowSleep: true,
    angle: 0,
    angularVelocity: 0,
    awake: true,
    bullet: false,
    fixedRotation: false
};


Body.prototype.draw = function (context) {
    var pos = this.body.GetPosition(),
        angle = this.body.GetAngle();
    
    context.save();
    context.translate(pos.x, pos.y);
    context.rotate(angle);
    
    
    if (this.details.color) {
        context.fillStyle = this.details.color;
        
        switch (this.details.shape) {
            case "circle":
                context.beginPath();
                context.arc(0, 0, this.details.radius, 0, Math.PI * 2);
                context.fill();
                break;
            case "polygon":
                var points = this.details.points;
                context.beginPath();
                context.moveTo(points[0].x, points[0].y);
                for (var i = 1; i < points.length; i++) {
                    context.lineTo(points[i].x, points[i].y);
                }
                context.fill();
                break;
            case "block":
                context.fillRect(-this.details.width / 2, -this.details.height / 2,
                                 this.details.width,
                                 this.details.height);
                break;
            default:
                break;
        }
    }
    
    if (this.details.image) {
        context.drawImage(this.details.image, -this.details.width / 2, -this.details.height / 2,
                          this.details.width,
                          this.details.height);
        
    }
    
    context.restore();
    
};


var physics,
    lastFrame = new Date().getTime();

window.gameLoop = function () {
    var tm = new Date().getTime();
    requestAnimationFrame(gameLoop);
    var dt = (tm - lastFrame) / 1000;
    if (dt > 1 / 15) {
        dt = 1 / 15;
    }
    physics.step(dt);
    lastFrame = tm;
};

function init() {
    var img = new Image();
    
    // Wait for the image to load
    img.addEventListener("load", function() {
        
        physics = window.physics = new Physics(document.getElementById("canvas"));
        
        physics.collision();
        // Create some walls
        new Body(physics, { color: "green", type: "static", x: 0, y: 0, height: 44,  width: 0.5 });
        new Body(physics, { color: "green", type: "static", x:22, y: 0, height: 44,  width: 0.5});
        new Body(physics, { color: "green", type: "static", x: 0, y: 0, height: 0.5, width: 44 });
        new Body(physics, { color: "green", type: "static", x: 0, y:22, height: 0.5, width: 44 });
/*
        new Body(physics, { image: img, x: 5, y: 8 });
        new Body(physics, { image: img, x: 13, y: 8 });
        new Body(physics, { color: "blue", x: 8, y: 3 });
*/
        for ( var i = 0; i < dataSet.length; i++ ) {
            var x = i % 16 * (DOT_SIZE/physics.scale * 1.1);
            var y = Math.floor( i / 16 ) * (DOT_SIZE/physics.scale * 1.1);
            if ( dataSet[i] != "無" ) {
                var color = getRgbColor( dataSet[i] );
                new Body(physics, { 
                    color: color, 
                    x: x + X_START_POS, 
                    y: y + Y_START_POS, 
                    height:DOT_SIZE/physics.scale, 
                    width:DOT_SIZE/physics.scale });
            }
        }
        new Body(physics, { color: "gray", shape: "circle", radius: 3, x: 10, y: 20 });
        
/*
        new Body(physics, { color: "gray", shape: "circle", radius: 4, x: 5, y: 20 });
        
        new Body(physics, { color: "pink", shape: "polygon", 
                            points: [ { x: 0, y: 0 }, { x: 0, y: 4 },{ x: -10, y: 0 }   ],
                            x: 20, y: 5 });
*/
        physics.dragNDrop();
        
        requestAnimationFrame(gameLoop);
    });
    
    //img.src = "http://jsrun.it/assets/r/T/y/u/rTyue.jpg";    // bricks.jpg
    img.src = "https://cx20.github.io/jsdo.it-archives/assets/y/l/s/1/yls1Y.png";
}


// Lastly, add in the `requestAnimationFrame` shim, if necessary. Does nothing 
// if `requestAnimationFrame` is already on the `window` object.
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());