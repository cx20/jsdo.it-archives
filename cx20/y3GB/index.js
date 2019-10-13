// forked from cx20's "LiquidFun を試してみるテスト（その８）" http://jsdo.it/cx20/496r
// forked from cx20's "LiquidFun を試してみるテスト（その７）" http://jsdo.it/cx20/kfa1
// forked from cx20's "LiquidFun を試してみるテスト（その６）" http://jsdo.it/cx20/tpQn
// forked from cx20's "LiquidFun を試してみるテスト（その５）" http://jsdo.it/cx20/oYCZ
// forked from cx20's "LiquidFun を試してみるテスト（その４）" http://jsdo.it/cx20/y2SB
// forked from cx20's "LiquidFun を試してみるテスト（その３）" http://jsdo.it/cx20/7PQ5
// forked from cx20's "LiquidFun を試してみるテスト（その２）" http://jsdo.it/cx20/gsAW
// forked from cx20's "LiquidFun を試してみるテスト" http://jsdo.it/cx20/vkVp

var DOT_SIZE = 16;
var X_START_POS = 120;
var Y_START_POS = 120;

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
        "無":{r:0x00, g:0x00, b:0x00, a:0xff},
        "白":{r:0xff, g:0xff, b:0xff, a:0xff},
        "肌":{r:0xff, g:0xcc, b:0xcc, a:0xff},
        "茶":{r:0x80, g:0x00, b:0x00, a:0xff},
        "赤":{r:0xff, g:0x00, b:0x00, a:0xff},
        "黄":{r:0xff, g:0xff, b:0x00, a:0xff},
        "緑":{r:0x00, g:0xff, b:0x00, a:0xff},
        "水":{r:0x00, g:0xff, b:0xff, a:0xff},
        "青":{r:0x00, g:0x00, b:0xff, a:0xff},
        "紫":{r:0x80, g:0x00, b:0x80, a:0xff}
    };
    return colorHash[ c ];
}

////////////////////////////////////////////////////
// testSurfaceTension.js
////////////////////////////////////////////////////

function TestTheoJansen() {
    camera.position.y = 15;
    camera.position.z = 50;

    this.offset = new b2Vec2(0.0, 8.0);
    this.motorSpeed = 2.0;
    this.motorOn = true;
    var pivot = new b2Vec2(0.0, 0.8);

    // Ground
    var bd = new b2BodyDef;
    var ground = world.CreateBody(bd);

    var shape = new b2EdgeShape;
    shape.Set(new b2Vec2(-50.0, 0.0), new b2Vec2(50.0, 0.0));
    ground.CreateFixtureFromShape(shape, 0.0);

    shape = new b2EdgeShape;
    shape.Set(new b2Vec2(-50.0, 0.0), new b2Vec2(-50.0, 10.0));
    ground.CreateFixtureFromShape(shape, 0.0);

    shape = new b2EdgeShape;
    shape.Set(new b2Vec2(50.0, 0.0), new b2Vec2(50.0, 10.0));
    ground.CreateFixtureFromShape(shape, 0.0);

    // Balls
    for (var i = 0; i < 40; ++i) {
        shape = new b2CircleShape;
        shape.radius = 0.25;

        bd = new b2BodyDef;
        bd.type = b2_dynamicBody;
        bd.position.Set(-40.0 + 2.0 * i, 0.5);

        var body = world.CreateBody(bd);
        body.CreateFixtureFromShape(shape, 1.0);
    }

    var temp = new b2Vec2();
    // Chassis
    shape = new b2PolygonShape;
    shape.SetAsBoxXY(2.5, 1.0);

    var sd = new b2FixtureDef;
    sd.density = 1.0;
    sd.shape = shape;
    sd.filter.groupIndex = -1;
    bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    b2Vec2.Add(temp, pivot, this.offset);
    bd.position = temp;
    this.chassis = world.CreateBody(bd);
    this.chassis.CreateFixtureFromDef(sd);

    shape = new b2CircleShape;
    shape.radius = 1.6;

    sd = new b2FixtureDef;
    sd.density = 1.0;
    sd.shape = shape;
    sd.filter.groupIndex = -1;
    bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    b2Vec2.Add(temp, pivot, this.offset);
    bd.position = temp;
    this.wheel = world.CreateBody(bd);
    this.wheel.CreateFixtureFromDef(sd);

    var jd = new b2RevoluteJointDef;
    jd.collideConnected = false;
    jd.motorSpeed = this.motorSpeed;
    jd.maxMotorTorque = 400.0;
    jd.enableMotor = this.motorOn;
    b2Vec2.Add(temp, pivot, this.offset);
    this.motorJoint =
        jd.InitializeAndCreate(this.wheel, this.chassis, temp);
    var wheelAnchor = new b2Vec2();

    b2Vec2.Add(wheelAnchor, pivot, new b2Vec2(0, -0.8));

    this.CreateLeg(-1.0, wheelAnchor);
    this.CreateLeg(1.0, wheelAnchor);

    this.wheel.SetTransform(this.wheel.GetPosition(), 120.0 * Math.PI / 180.0);
    this.CreateLeg(-1.0, wheelAnchor);
    this.CreateLeg(1.0, wheelAnchor);

    this.wheel.SetTransform(this.wheel.GetPosition(), -120.0 * Math.PI / 180.0);
    this.CreateLeg(-1.0, wheelAnchor);
    this.CreateLeg(1.0, wheelAnchor);

    // Create particle system.
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.2;
    psd.dampingStrength = 0.2;
    var particleSystem = world.CreateParticleSystem(psd);

    // Create particle group on top of walker.
/*
    var shape = new b2PolygonShape;
    shape.SetAsBoxXYCenterAngle(7, 0.5, new b2Vec2(0, 15), 0);
    var pd = new b2ParticleGroupDef();
    pd.shape = shape;
    var group = particleSystem.CreateParticleGroup(pd);
*/
    for (var i = 0; i < dataSet.length; i++) {
        if (dataSet[i] != "無") {
            var x = i % 16;
            var y = (15 - Math.floor(i / 16));
            var circle = new b2CircleShape();
            var pgd = new b2ParticleGroupDef();
            circle.position.Set(-3.0 + x * 0.4, +12.0 + y * 0.4);
            circle.radius = 0.15;
            pgd.shape = circle;
            var color = getRgbColor(dataSet[i]);
            pgd.color.Set(color.r, color.g, color.b, color.a);
            particleSystem.CreateParticleGroup(pgd);
        }
    }
}

TestTheoJansen.prototype.CreateLeg = function(s, wheelAnchor) {
    var p1 = new b2Vec2(5.4 * s, -6.1);
    var p2 = new b2Vec2(7.2 * s, -1.2);
    var p3 = new b2Vec2(4.3 * s, -1.9);
    var p4 = new b2Vec2(3.1 * s, 0.8);
    var p5 = new b2Vec2(6.0 * s, 1.5);
    var p6 = new b2Vec2(2.5 * s, 3.7);

    var fd1 = new b2FixtureDef,
        fd2 = new b2FixtureDef;
    fd1.filter.groupIndex = -1;
    fd2.filter.groupIndex = -1;
    fd1.density = 1.0;
    fd2.density = 1.0;

    var poly1 = new b2PolygonShape,
        poly2 = new b2PolygonShape;

    var temp = new b2Vec2();
    if (s > 0.0) {
        poly1.vertices.push(p1);
        poly1.vertices.push(p2);
        poly1.vertices.push(p3);

        poly2.vertices.push(new b2Vec2());
        b2Vec2.Sub(temp, p5, p4);
        poly2.vertices.push(temp.Clone());
        b2Vec2.Sub(temp, p6, p4);
        poly2.vertices.push(temp.Clone());
    } else {
        poly1.vertices.push(p1);
        poly1.vertices.push(p3);
        poly1.vertices.push(p2);

        poly2.vertices.push(new b2Vec2());
        b2Vec2.Sub(temp, p6, p4);
        poly2.vertices.push(temp.Clone());
        b2Vec2.Sub(temp, p5, p4);
        poly2.vertices.push(temp.Clone());
    }

    fd1.shape = poly1;
    fd2.shape = poly2;

    var bd1 = new b2BodyDef,
        bd2 = new b2BodyDef;
    bd1.type = b2_dynamicBody;
    bd2.type = b2_dynamicBody;
    bd1.position = this.offset;
    b2Vec2.Add(temp, p4, this.offset);
    bd2.position = temp;

    bd1.angularDamping = 10.0;
    bd2.angularDamping = 10.0;

    var body1 = world.CreateBody(bd1);
    var body2 = world.CreateBody(bd2);

    body1.CreateFixtureFromDef(fd1);
    body2.CreateFixtureFromDef(fd2);

    var djd = new b2DistanceJointDef;

    // Using a soft distance constraint can reduce some jitter.
    // It also makes the structure seem a bit more fluid by
    // acting like a suspension system.
    djd.dampingRatio = 0.5;
    djd.frequencyHz = 10.0;

    var temp2 = new b2Vec2();
    b2Vec2.Add(temp, p2, this.offset);
    b2Vec2.Add(temp2, p5, this.offset);
    djd.InitializeAndCreate(body1, body2, temp, temp2);

    b2Vec2.Add(temp, p3, this.offset);
    b2Vec2.Add(temp2, p4, this.offset);
    djd.InitializeAndCreate(body1, body2, temp, temp2);

    b2Vec2.Add(temp, p3, this.offset);
    b2Vec2.Add(temp2, wheelAnchor, this.offset);
    djd.InitializeAndCreate(body1, this.wheel, temp, temp2);

    b2Vec2.Add(temp, p6, this.offset);
    b2Vec2.Add(temp2, wheelAnchor, this.offset);
    djd.InitializeAndCreate(body2, this.wheel, temp, temp2);

    var rjd = new b2RevoluteJointDef;
    b2Vec2.Add(temp, p4, this.offset);
    rjd.InitializeAndCreate(body2, this.chassis, temp);
};

TestTheoJansen.prototype.Keyboard = function(key) {
    switch (key) {
        case 'a':
            this.motorJoint.SetMotorSpeed(-this.motorSpeed);
            break;

        case 's':
            this.motorJoint.SetMotorSpeed(0.0);
            break;

        case 'd':
            this.motorJoint.SetMotorSpeed(this.motorSpeed);
            break;

        case 'm':
            this.motorJoint.EnableMotor(!this.motorJoint.IsMotorEnabled());
            break;

        case 'l':
            this.motorJoint.EnableLimit(!this.motorJoint.IsLimitEnabled());
            break;
    }
}

////////////////////////////////////////////////////
// testbed.js
////////////////////////////////////////////////////

// shouldnt be a global :(
var particleColors = [
  new b2ParticleColor(0xff, 0x00, 0x00, 0xff), // red
  new b2ParticleColor(0x00, 0xff, 0x00, 0xff), // green
  new b2ParticleColor(0x00, 0x00, 0xff, 0xff), // blue
  new b2ParticleColor(0xff, 0x8c, 0x00, 0xff), // orange
  new b2ParticleColor(0x00, 0xce, 0xd1, 0xff), // turquoise
  new b2ParticleColor(0xff, 0x00, 0xff, 0xff), // magenta
  new b2ParticleColor(0xff, 0xd7, 0x00, 0xff), // gold
  new b2ParticleColor(0x00, 0xff, 0xff, 0xff) // cyan
];
var container;
var world = null;
var threeRenderer;
var renderer;
var camera;
var scene;
var objects = [];
var timeStep = 1.0 / 60.0;
var velocityIterations = 8;
var positionIterations = 3;
var test = {};
var projector = new THREE.Projector();
var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
var g_groundBody = null;

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function printErrorMsg(msg) {
  var domElement = document.createElement('div');
  domElement.style.textAlign = 'center';
  domElement.innerHTML = msg;
  document.body.appendChild(domElement);
}

function initTestbed() {
  camera = new THREE.PerspectiveCamera(70
    , windowWidth / windowHeight
    , 1, 1000);

  try {
    threeRenderer = new THREE.WebGLRenderer();
  } catch( error ) {
    printErrorMsg('<p>Sorry, your browser does not support WebGL.</p>'
                + '<p>This testbed application uses WebGL to quickly draw'
                + ' LiquidFun particles.</p>'
                + '<p>LiquidFun can be used without WebGL, but unfortunately'
                + ' this testbed cannot.</p>'
                + '<p>Have a great day!</p>');
    return;
  }

  threeRenderer.setClearColor(0xEEEEEE);
  threeRenderer.setSize(windowWidth, windowHeight);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 100;
  scene = new THREE.Scene();
  camera.lookAt(scene.position);

  document.body.appendChild( this.threeRenderer.domElement);

  this.mouseJoint = null;

  // hack
  renderer = new Renderer();
  var gravity = new b2Vec2(0, -10);
  world = new b2World(gravity);
  Testbed();
}

function testSwitch(testName) {
  ResetWorld();
  world.SetGravity(new b2Vec2(0, -10));
  var bd = new b2BodyDef;
  g_groundBody = world.CreateBody(bd);
  test = new window[testName];
}

function Testbed(obj) {
  // Init world
  //GenerateOffsets();
  //Init
  var that = this;
  document.addEventListener('keypress', function(event) {
    if (test.Keyboard !== undefined) {
      test.Keyboard(String.fromCharCode(event.which) );
    }
  });
  document.addEventListener('keyup', function(event) {
    if (test.KeyboardUp !== undefined) {
      test.KeyboardUp(String.fromCharCode(event.which) );
    }
  });

  document.addEventListener('mousedown', function(event) {
    var p = getMouseCoords(event);
    var aabb = new b2AABB;
    var d = new b2Vec2;

    d.Set(0.01, 0.01);
    b2Vec2.Sub(aabb.lowerBound, p, d);
    b2Vec2.Add(aabb.upperBound, p, d);

    var queryCallback = new QueryCallback(p);
    world.QueryAABB(queryCallback, aabb);

    if (queryCallback.fixture) {
      var body = queryCallback.fixture.body;
      var md = new b2MouseJointDef;
      md.bodyA = g_groundBody;
      md.bodyB = body;
      md.target = p;
      md.maxForce = 1000 * body.GetMass();
      that.mouseJoint = world.CreateJoint(md);
      body.SetAwake(true);
    }
    if (test.MouseDown !== undefined) {
      test.MouseDown(p);
    }

  });

  document.addEventListener('mousemove', function(event) {
    var p = getMouseCoords(event);
    if (that.mouseJoint) {
      that.mouseJoint.SetTarget(p);
    }
    if (test.MouseMove !== undefined) {
      test.MouseMove(p);
    }
  });

  document.addEventListener('mouseup', function(event) {
    if (that.mouseJoint) {
      world.DestroyJoint(that.mouseJoint);
      that.mouseJoint = null;
    }
    if (test.MouseUp !== undefined) {
      test.MouseUp(getMouseCoords(event));
    }
  });


  window.addEventListener( 'resize', onWindowResize, false );

  testSwitch("TestTheoJansen");

  render();
}

var render = function() {
  // bring objects into world
  renderer.currentVertex = 0;
  if (test.Step !== undefined) {
    test.Step();
  } else {
    Step();
  }
  renderer.draw();

  threeRenderer.render(scene, camera);
  requestAnimationFrame(render);
};

var ResetWorld = function() {
  if (world !== null) {
    while (world.joints.length > 0) {
      world.DestroyJoint(world.joints[0]);
    }

    while (world.bodies.length > 0) {
      world.DestroyBody(world.bodies[0]);
    }

    while (world.particleSystems.length > 0) {
      world.DestroyParticleSystem(world.particleSystems[0]);
    }
  }
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 100;
};

var Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
};

/**@constructor*/
function QueryCallback(point) {
  this.point = point;
  this.fixture = null;
}

/**@return bool*/
QueryCallback.prototype.ReportFixture = function(fixture) {
  var body = fixture.body;
  if (body.GetType() === b2_dynamicBody) {
    var inside = fixture.TestPoint(this.point);
    if (inside) {
      this.fixture = fixture;
      return true;
    }
  }
  return false;
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  threeRenderer.setSize( window.innerWidth, window.innerHeight );
}

function getMouseCoords(event) {
  var mouse = new THREE.Vector3();
  mouse.x = (event.clientX / windowWidth) * 2 - 1;
  mouse.y = -(event.clientY / windowHeight) * 2 + 1;
  mouse.z = 0.5;

  projector.unprojectVector(mouse, camera);
  var dir = mouse.sub(camera.position).normalize();
  var distance = -camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  var p = new b2Vec2(pos.x, pos.y);
  return p;
}

initTestbed();
