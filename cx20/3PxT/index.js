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
    material.update()
    return material;
}

// create a few materials for our objects
var white = createMaterial(new pc.Color(1,1,1));
var red = createMaterial(new pc.Color(1,0,0));
var green = createMaterial(new pc.Color(0,1,0));
var blue = createMaterial(new pc.Color(0,0,1));
var yellow = createMaterial(new pc.Color(1,1,0));

// ***********    Create our floor   *******************

var floor = new pc.fw.Entity();

// add a 'box' model
application.context.systems.model.addComponent(floor, {
    type: "box",
});

// make the floor white
floor.model.material = white;

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

// Create an Entity with a camera component
var camera = new pc.fw.Entity();
application.context.systems.camera.addComponent(camera, {
    clearColor: new pc.Color(0.5, 0.5, 0.8),
    farClip: 50
});

// add the camera to the hierarchy
application.context.root.addChild(camera);

// Move the camera a little further away
camera.translate(0, 10, 15);
camera.lookAt(0, 0, 0);

// ***********    Create templates    *******************
var boxTemplate = new pc.fw.Entity();
application.context.systems.model.addComponent(boxTemplate, {
    type: "box",
    castShadows: true,
    enabled: false
});

application.context.systems.rigidbody.addComponent(boxTemplate, {
    type: "dynamic",
    mass: 50,
    restitution: 0.5
});

application.context.systems.collision.addComponent(boxTemplate, {
    type: "box",
    halfExtents: new pc.Vec3( 0.5, 0.5, 0.05)
});

boxTemplate.setLocalScale( 1.0, 1.0, 0.2 );

//-------------------------------------------
var part0 = new pc.fw.Entity();
application.context.systems.model.addComponent(part0, { type: "box", castShadows: true });
part0.setLocalScale( 1.0, 0.2, 1.0 );
part0.setLocalPosition( 0.0, 0.5, 0.0 );
boxTemplate.addChild( part0 );
//-------------------------------------------
var part1 = new pc.fw.Entity();
application.context.systems.model.addComponent(part1, { type: "box", castShadows: true });
part1.setLocalScale( 0.2, 1.0, 1.0 );
part1.setLocalPosition( 0.5, 0.0, 0.0 );
boxTemplate.addChild( part1 );
//-------------------------------------------
var part2 = new pc.fw.Entity();
application.context.systems.model.addComponent(part2, { type: "box", castShadows: true });
part2.setLocalScale( 1.0, 0.2, 1.0 );
part2.setLocalPosition( 0.0, -0.5, 0.0 );
boxTemplate.addChild( part2 );
//-------------------------------------------
var part3 = new pc.fw.Entity();
application.context.systems.model.addComponent(part3, { type: "box", castShadows: true });
part3.setLocalScale( 0.2, 0.4, 1.0 );
part3.setLocalPosition( 0.7, 0.5, 0.0 );
boxTemplate.addChild( part3 );
//-------------------------------------------
var part4 = new pc.fw.Entity();
application.context.systems.model.addComponent(part4, { type: "box", castShadows: true });
part4.setLocalScale( 0.2, 0.4, 1.0 );
part4.setLocalPosition( 0.95, 0.5, 0.0 );
boxTemplate.addChild( part4 );
//-------------------------------------------

// add all the templates to an array so that
// we can randomly spawn them
//var templates = [boxTemplate, sphereTemplate, capsuleTemplate, cylinderTemplate];
var templates = [boxTemplate];

// disable the templates because we don't want them to be visible
// we'll just use them to clone other Entities
templates.forEach(function (template) {
    template.enabled = false;
});

// ***********    Update Function   *******************

// initialize variables for our update function
var timer = 0;
var count = 40;

// Set an update function on the application's update event
application.on("update", function (dt) {
    // create a falling box every 0.2 seconds
    if (count > 0) {
        timer -= dt;
        if (timer <= 0) {
            count--;
            timer = 0.2;
            
            // Clone a random template and position it above the floor
            var template = templates[Math.floor(pc.math.random(0, templates.length))];
            var clone = template.clone();
            // enable the clone because the template is disabled
            clone.enabled = true;
            
            application.context.root.addChild(clone);
            
            clone.setLocalPosition(pc.math.random(-1,1), 10, pc.math.random(-1,1));
            
            // when we manually change the position of an Entity with a dynamic rigidbody
            // we need to call syncEntityToBody() so that the rigidbody will get the position
            // and rotation of the Entity.
            clone.rigidbody.syncEntityToBody();
        }
    }
    
});
