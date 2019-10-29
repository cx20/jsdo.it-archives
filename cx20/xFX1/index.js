// forked from cx20's "PlayCanvas で碁石を落下させてみるテスト" http://jsdo.it/cx20/gmdS
// forked from cx20's "PlayCanvas で物理演算を試してみるテスト" http://jsdo.it/cx20/oWV0
// forked from https://github.com/playcanvas/engine/blob/master/examples/physics/falling_shapes/index.html
// forked from cx20's "PlayCanvas を試してみるテスト" http://jsdo.it/cx20/rlcX
// forked from https://github.com/playcanvas/engine/blob/master/examples/spinning_cube/index.html

// ***********    Initialize application   *******************
var canvas = document.getElementById("application-canvas");

// Create the application and start the update loop
var application = new pc.fw.Application(canvas);
application.start();

// Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
application.setCanvasFillMode(pc.fw.FillMode.FILL_WINDOW);
application.setCanvasResolution(pc.fw.ResolutionMode.AUTO);

application.context.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

// Set the gravity for our rigid bodies
application.context.systems.rigidbody.setGravity(0, -9.8, 0);

function createMaterial (color) {
    var material = new pc.scene.PhongMaterial();
    material.diffuse = color;
    // we need to call material.update when we change its properties
    material.update();
    return material;
}

// create a few materials for our objects
var black = createMaterial(new pc.Color(0,0,0));
var white = createMaterial(new pc.Color(1,1,1));
var red = createMaterial(new pc.Color(1,0,0));
var green = createMaterial(new pc.Color(0,1,0));
var blue = createMaterial(new pc.Color(0,0,1));
var yellow = createMaterial(new pc.Color(1,1,0));
var wood = createMaterial(new pc.Color(197/255, 162/255, 81/255));

// ***********    Create our floor   *******************

var floor = new pc.fw.Entity();

// add a 'box' model
application.context.systems.model.addComponent(floor, {
    type: "box"
});

// make the floor white
//floor.model.material = white;
floor.model.material = wood;

// scale it
floor.setLocalScale(10, 1, 10);

// add a rigidbody component so that other objects collide with it
application.context.systems.rigidbody.addComponent(floor, {
    type: "static",
    restitution: 0.5
});

// add a collision component
application.context.systems.collision.addComponent(floor, {
    type: "box",
    halfExtents: new pc.Vec3(5, 0.5, 5)
});

// add the floor to the hierarchy
application.context.root.addChild(floor);

// ***********    Create lights   *******************

// make our scene prettier by adding a directional light
var light = new pc.fw.Entity();
application.context.systems.light.addComponent(light, {
    type: "directional",
    color: new pc.Color(1, 1, 1),
    castShadows: true,
    shadowResolution: 2048
});

// set the direction for our light
light.setLocalEulerAngles(45, 30, 0);

// Add the light to the hierarchy
application.context.root.addChild(light);

// ***********    Create camera    *******************
// Create camera entity
function Camera() {
  var cam = new pc.fw.Entity();
  application.context.systems.camera.addComponent(cam, {
    clearColor: new pc.Color(0.1, 0.1, 0.1),
    farClip: 20
  });
  application.context.root.addChild(cam);
  this.entity = cam;
  this.timer = 0;
}

Camera.prototype.update = function (dt) {
  this.timer += dt;
  // Spin the camera around a center point
  var x = Math.sin(this.timer * 0.25) * 6;
  var z = Math.cos(this.timer * 0.25) * 4;
  var e = this.entity;
  e.setPosition(x, 5, z);
  e.lookAt(0, 3, 0);
}

// Create an Entity with a camera component
var camera = new Camera();

// ***********    Create templates    *******************

// Create other shapes too for variety...

// A sphere...
var sphereTemplate = new pc.fw.Entity();
application.context.systems.model.addComponent(sphereTemplate, {
    type: "sphere",
    castShadows: true
});

application.context.systems.rigidbody.addComponent(sphereTemplate, {
    type: "dynamic",
    mass: 50,
    restitution: 0.5
});

application.context.systems.collision.addComponent(sphereTemplate, {
    type: "sphere",
    radius: 0.25
});


// make the sphere black
sphereTemplate.model.material = black;

sphereTemplate.setLocalScale( 0.5, 0.25, 0.5 );

// add all the templates to an array so that
// we can randomly spawn them
//var templates = [boxTemplate, sphereTemplate, capsuleTemplate, cylinderTemplate];
var templates = [sphereTemplate];

// disable the templates because we don't want them to be visible
// we'll just use them to clone other Entities
templates.forEach(function (template) {
    template.enabled = false;
});

drawMatrix();

function drawMatrix() {
    var line;
    for ( var x = 0; x < 19; x++ ) {
        line = new pc.fw.Entity();
        application.context.systems.model.addComponent(line, {
            type: "box"
        });
        line.model.material = black;
        line.setLocalScale(0.04, 0.01, 9);
        line.setLocalPosition( -9/2 + x/2, 0.51, 0);
        application.context.root.addChild(line);
    }

    for ( var y = 0; y < 19; y++ ) {
        line = new pc.fw.Entity();
        application.context.systems.model.addComponent(line, {
            type: "box"
        });
        line.model.material = black;
        line.setLocalScale(9, 0.01, 0.04);
        line.setLocalPosition( 0, 0.51, -9/2+y/2);
        application.context.root.addChild(line);
    }
}

// ***********    Update Function   *******************

// initialize variables for our update function
var timer = 0;
var count = 200;

// Set an update function on the application's update event
application.on("update", function (dt) {
    camera.update(dt);
    // create a falling box every 0.2 seconds
    if (count > 0) {
        timer -= dt;
        if (timer <= 0) {
            count--;
            timer = 0.1;
            
            // Clone a random template and position it above the floor
            var template = templates[Math.floor(pc.math.random(0, templates.length))];
            var clone = template.clone();
            // enable the clone because the template is disabled
            clone.enabled = true;
            clone.model.material = count % 2 ? black : white;
            
            application.context.root.addChild(clone);
            
            clone.setLocalPosition(pc.math.random(-1,1), 10, pc.math.random(-1,1));
            
            // when we manually change the position of an Entity with a dynamic rigidbody
            // we need to call syncEntityToBody() so that the rigidbody will get the position
            // and rotation of the Entity.
            clone.rigidbody.syncEntityToBody();
        }
    }
    
});
