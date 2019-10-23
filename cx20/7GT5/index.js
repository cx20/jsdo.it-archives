// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト" http://jsdo.it/cx20/7lgA

var demo = new CANNON.Demo();

// A compound shape consisting of a number of boxes.
demo.addScene("GOGOGO", function () {
    var world = setupWorld(demo);

    // Create the compound shape
    var compoundShape = new CANNON.Compound();
    var s = 1.5;

    // We can add the same shape several times to position child shapes within the Compound.
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(1.8, 0.3, 0.3)), new CANNON.Vec3(0.0, 1.5, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.3, 1.5, 0.3)), new CANNON.Vec3(1.5, 0.0, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(1.8, 0.3, 0.3)), new CANNON.Vec3(0.0,-1.5, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.2, 0.6, 0.3)), new CANNON.Vec3(2.0, 1.5, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.2, 0.6, 0.3)), new CANNON.Vec3(2.5, 1.5, 0.0));

    // Now create a RigidBody for our Compound
    var interval;
    var mass = 10;
    var size = 1;
    var bodies = [];
    var i = 0;
    interval = setInterval(function(){
        // Sphere
        i++;
        var body = new CANNON.RigidBody(mass, compoundShape);
        body.position.set(2*size*Math.sin(i),2*size*Math.cos(i),7*2*size);
        world.add(body);
        demo.addVisual(body);
        bodies.push(body);
/*
        if(bodies.length > 50){
            var b = bodies.shift();
            demo.removeVisual(b);
            world.remove(b);
        }
*/
        if ( i > 50 ) {
            clearInterval(interval);
        }
    },200);
});

function setupWorld(demo) {
    var world = demo.getWorld();
    world.gravity.set(0, 0, -30);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    // ground plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.RigidBody(0, groundShape);
    groundBody.position.set(0, 0, -10);
    world.add(groundBody);
    demo.addVisual(groundBody);

    var bodyShape = new CANNON.Box(new CANNON.Vec3(10, 0.5, 0.5));
    var mass = 10;
    var body = new CANNON.RigidBody(0, bodyShape);
    body.position.set(0, 0, 2);
    world.add(body);
    demo.addVisual(body);
      
    return world;
};

demo.start();