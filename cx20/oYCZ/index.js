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
// testImpulse.js
////////////////////////////////////////////////////

function TestImpulse() {
    camera.position.y = 2;
    camera.position.z = 3;
    this.boxLeft = -2;
    this.boxRight = 2;
    this.boxBottom = 0;
    this.boxTop = 4;
    this.useLinearImpulse = false;
    this.groups = [];

    // Create the containing box.
    var bd = new b2BodyDef;
    var ground = world.CreateBody(bd);

    var shape = new b2ChainShape;
    shape.vertices.push(new b2Vec2(this.boxLeft, this.boxBottom));
    shape.vertices.push(new b2Vec2(this.boxRight, this.boxBottom));
    shape.vertices.push(new b2Vec2(this.boxRight, this.boxTop));
    shape.vertices.push(new b2Vec2(this.boxLeft, this.boxTop));
    shape.CreateLoop();
    ground.CreateFixtureFromShape(shape, 0.0);

/*
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.025;
    psd.damping = 0.2;
    this.particleSystem = world.CreateParticleSystem(psd);
    // Create the particles.
    shape = new b2PolygonShape ;
    shape.SetAsBoxXYCenterAngle(0.4, 1.0, new b2Vec2(0.0, 1.01), 0);
    var pd = new b2ParticleGroupDef;
    pd.shape = shape;
    this.groups.push( this.particleSystem.CreateParticleGroup(pd) );
*/
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.025;
    psd.damping = 0.2;
    this.particleSystem = world.CreateParticleSystem(psd);
    // Create the particles.
    for (var i = 0; i < dataSet.length; i++) {
        if (dataSet[i] != "無") {
            var x = i % 16;
            var y = (15 - Math.floor(i / 16));
            var circle = new b2CircleShape();
            var pgd = new b2ParticleGroupDef();
            circle.position.Set(-0.5 + x * 0.15, +1.5 + y * 0.15);
            circle.radius = 0.06;
            pgd.shape = circle;
            var color = getRgbColor(dataSet[i]);
            pgd.color.Set(color.r, color.g, color.b, color.a);
            this.groups.push(this.particleSystem.CreateParticleGroup(pgd));
        }
    }
}

TestImpulse.prototype.MouseUp = function(p) {
    var isInsideBox = this.boxLeft <= p.x &&
        p.x <= this.boxRight &&
        this.boxBottom <= p.y &&
        p.y <= this.boxTop;

    if (isInsideBox) {
        var boxCenter = new b2Vec2(0.5 * (this.boxLeft + this.boxRight),
            0.5 * (this.boxBottom + this.boxTop));
        var direction = new b2Vec2();
        b2Vec2.Sub(direction, p, boxCenter);
        b2Vec2.Normalize(direction, direction);
        this.ApplyImpulseOrForce(direction);
    }
};

TestImpulse.prototype.Keyboard = function(key) {
    switch (key) {
        case 'l':
            this.useLinearImpulse = true;
            break;

        case 'f':
            this.useLinearImpulse = false;
            break;
    }
};

TestImpulse.prototype.ApplyImpulseOrForce = function(direction) {
    var particleGroup = this.particleSystem.particleGroups[0];
    var numParticles = particleGroup.GetParticleCount();

    for (var i = 0; i < this.groups.length; i++) {
        if (this.useLinearImpulse) {
            var kImpulseMagnitude = 0.005;
            var impulse = new b2Vec2();
            b2Vec2.MulScalar(impulse, direction, kImpulseMagnitude * numParticles);
            this.groups[i].ApplyLinearImpulse(impulse);
        } else {
            var kForceMagnitude = 1.0;
            var force = new b2Vec2();
            b2Vec2.MulScalar(force, direction, kForceMagnitude * numParticles);
            this.groups[i].ApplyForce(force);
        }
    }
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

  testSwitch("TestImpulse");

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
