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
// testSoup.js
////////////////////////////////////////////////////

function TestSoup() {
    camera.position.y = 2;
    camera.position.z = 3;
    // create groupd
    var bd = new b2BodyDef;
    var ground = world.CreateBody(bd);

    var shape = new b2PolygonShape;
    shape.vertices.push(new b2Vec2(-4, -1));
    shape.vertices.push(new b2Vec2(4, -1));
    shape.vertices.push(new b2Vec2(4, 0));
    shape.vertices.push(new b2Vec2(-4, 0));
    ground.CreateFixtureFromShape(shape, 0.0);


    shape = new b2PolygonShape;
    shape.vertices.push(new b2Vec2(-4, -0.1));
    shape.vertices.push(new b2Vec2(-2, -0.1));
    shape.vertices.push(new b2Vec2(-2, 2));
    shape.vertices.push(new b2Vec2(-4, 3));
    ground.CreateFixtureFromShape(shape, 0.0);

    shape = new b2PolygonShape;
    shape.vertices.push(new b2Vec2(2, -0.1));
    shape.vertices.push(new b2Vec2(4, -0.1));
    shape.vertices.push(new b2Vec2(4, 3));
    shape.vertices.push(new b2Vec2(2, 2));
    ground.CreateFixtureFromShape(shape, 0.0);

    var psd = new b2ParticleSystemDef();
    psd.radius = 0.035;
    var particleSystem = world.CreateParticleSystem(psd);

    // create particles
/*
    shape = new b2PolygonShape;
    shape.SetAsBoxXYCenterAngle(2, 1, new b2Vec2(0, 1), 0);
    var pd = new b2ParticleGroupDef;
    pd.shape = shape;
    var group = particleSystem.CreateParticleGroup(pd);
*/
    for (var i = 0; i < dataSet.length; i++) {
        if (dataSet[i] != "無") {
            var x = i % 16;
            var y = (15 - Math.floor(i / 16));
            var circle = new b2CircleShape();
            var pgd = new b2ParticleGroupDef();
            circle.position.Set(-1.5 + x * 0.2, +3.0 + y * 0.2);
            circle.radius = 0.10;
            pgd.shape = circle;
            var color = getRgbColor(dataSet[i]);
            pgd.color.Set(color.r, color.g, color.b, color.a);
            particleSystem.CreateParticleGroup(pgd);
        }
    }

    // create soup innards
    bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    var body = world.CreateBody(bd);
    shape = new b2CircleShape;
    shape.position.Set(0, 0.5);
    shape.radius = 0.1;
    body.CreateFixtureFromShape(shape, 0.1);
    var amount = particleSystem.DestroyParticlesInShape(shape,
        body.GetTransform());

    bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    body = world.CreateBody(bd);
    shape = new b2PolygonShape;
    shape.SetAsBoxXYCenterAngle(0.1, 0.1, new b2Vec2(-1, 0.5), 0);
    body.CreateFixtureFromShape(shape, 0.1);
    particleSystem.DestroyParticlesInShape(shape,
        body.GetTransform());

    bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    body = world.CreateBody(bd);
    shape = new b2PolygonShape;
    shape.SetAsBoxXYCenterAngle(0.1, 0.1, new b2Vec2(1, 0.5), 0.5);
    body.CreateFixtureFromShape(shape, 0.1);
    particleSystem.DestroyParticlesInShape(shape,
        body.GetTransform());

    bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    body = world.CreateBody(bd);
    shape = new b2EdgeShape;
    shape.Set(new b2Vec2(0, 2), new b2Vec2(0.1, 2.1));
    body.CreateFixtureFromShape(shape, 1);
    var t = new b2Vec2();
    b2Vec2.Add(t, shape.vertex1, shape.vertex2);
    b2Vec2.MulScalar(t, t, 0.5);
    var massData = new b2MassData(0.1, t, 0.0);
    body.SetMassData(massData);


    bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    body = world.CreateBody(bd);
    shape = new b2EdgeShape;
    shape.Set(new b2Vec2(0.3, 2.0), new b2Vec2(0.4, 2.1));
    body.CreateFixtureFromShape(shape, 1);
    t = new b2Vec2();
    b2Vec2.Add(t, shape.vertex1, shape.vertex2);
    b2Vec2.MulScalar(t, t, 0.5);
    massData = new b2MassData(0.1, t, 0.0);
    body.SetMassData(massData);

    bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    body = world.CreateBody(bd);
    shape = new b2EdgeShape;
    shape.Set(new b2Vec2(-0.3, 2.1), new b2Vec2(-0.2, 2.0));
    body.CreateFixtureFromShape(shape, 1);
    t = new b2Vec2();
    b2Vec2.Add(t, shape.vertex1, shape.vertex2);
    b2Vec2.MulScalar(t, t, 0.5);
    massData = new b2MassData(0.1, t, 0.0);
    body.SetMassData(massData);
}

////////////////////////////////////////////////////
// testSoupStirrer.js
////////////////////////////////////////////////////

function TestSoupStirrer() {
    camera.position.y = 2;
    camera.position.z = 3;

    // not real inheritance but it will do
    var parent = new TestSoup();
    this.oscillationOffset = 0;

    this.particleSystem = world.particleSystems[0];

    this.particleSystem.SetDamping(1.0);

    // Shape of the stirrer.
    var shape = new b2CircleShape;
    shape.position.Set(0, 0.7);
    shape.radius = 0.4;

    // Create the stirrer.
    var bd = new b2BodyDef;
    bd.type = b2_dynamicBody;
    this.stirrer = world.CreateBody(bd);
    this.stirrer.CreateFixtureFromShape(shape, 1.0);

    // Destroy all particles under the stirrer.
    var xf = new b2Transform;
    xf.SetIdentity();
    this.particleSystem.DestroyParticlesInShape(shape, xf);

    this.CreateJoint();
}

TestSoupStirrer.prototype.CreateJoint = function() {
    var prismaticJointDef = new b2PrismaticJointDef();
    prismaticJointDef.bodyA = g_groundBody;
    prismaticJointDef.bodyB = this.stirrer;
    prismaticJointDef.collideConnected = true;
    prismaticJointDef.localAxisA.Set(1, 0);
    prismaticJointDef.localAnchorA = this.stirrer.GetPosition();
    this.joint = world.CreateJoint(prismaticJointDef);
};

TestSoupStirrer.prototype.ToggleJoint = function() {
    if (this.joint) {
        world.DestroyJoint(this.joint);
        this.joint = null;
    } else {
        this.CreateJoint();
    }
};

TestSoupStirrer.prototype.Keyboard = function(key) {
    switch (key) {
        case 't':
            this.ToggleJoint();
            break;
    }
};

TestSoupStirrer.prototype.MouseUp = function(p) {
    if (this.InSoup(p)) {
        this.ToggleJoint();
    }
};

/**@return bool*/
TestSoupStirrer.prototype.InSoup = function(pos) {
    return pos.y > -1.0 && pos.y < 2.0 && pos.x > -3.0 && pos.x < 3.0;
};

TestSoupStirrer.prototype.Step = function() {
    // Magnitude of the force applied to the body.
    var k_forceMagnitude = 10.0;
    // How often the force vector rotates.
    var k_forceOscillationPerSecond = 0.2;
    var k_forceOscillationPeriod =
        1.0 / k_forceOscillationPerSecond;
    // Maximum speed of the body.
    var k_maxSpeed = 2.0;

    this.oscillationOffset += (1.0 / 60.0);
    if (this.oscillationOffset > k_forceOscillationPeriod) {
        this.oscillationOffset -= k_forceOscillationPeriod;
    }

    // Calculate the force vector.
    var forceAngle = this.oscillationOffset *
        k_forceOscillationPerSecond * 2.0 * Math.PI;
    var forceVector =
        new b2Vec2(Math.sin(forceAngle), Math.cos(forceAngle));
    b2Vec2.MulScalar(forceVector, forceVector, k_forceMagnitude);

    // Only apply force to the body when it's within the soup.
    if (this.InSoup(this.stirrer.GetPosition()) &&
        this.stirrer.GetLinearVelocity().Length() < k_maxSpeed) {
        this.stirrer.ApplyForceToCenter(forceVector, true);
    }

    Step();
};

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

  testSwitch("TestSoupStirrer");

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
