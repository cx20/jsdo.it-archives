// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト" http://jsdo.it/cx20/7lgA
var demo = new CANNON.Demo();

// A compound shape consisting of a number of boxes.
demo.addScene("DODODO", function () {
    var world = setupWorld(demo);

    // Create the compound shape
    var compoundShape = new CANNON.Compound();
    var s = 1.5;

    // We can add the same shape several times to position child shapes within the Compound.
/*
    // 「ゴゴゴ」
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(1.8, 0.3, 0.3)), new CANNON.Vec3(0.0, 1.5, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.3, 1.5, 0.3)), new CANNON.Vec3(1.5, 0.0, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(1.8, 0.3, 0.3)), new CANNON.Vec3(0.0,-1.5, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.2, 0.6, 0.3)), new CANNON.Vec3(2.0, 1.5, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.2, 0.6, 0.3)), new CANNON.Vec3(2.5, 1.5, 0.0));
*/
    // 「ドドド」
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.3, 1.8, 0.3)), new CANNON.Vec3(0.0, 0.0, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.9, 0.3, 0.3)), new CANNON.Vec3(0.9, 0.0, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.2, 0.6, 0.3)), new CANNON.Vec3(2.0, 1.5, 0.0));
    compoundShape.addChild(new CANNON.Box(new CANNON.Vec3(0.2, 0.6, 0.3)), new CANNON.Vec3(2.5, 1.5, 0.0));
    
    // Now create a RigidBody for our Compound
    var interval;
    var mass = 10;
    var size = 1;
    var bodies = [];
    var i = 0;
    interval = setInterval(function(){
        i++;
        var body = new CANNON.RigidBody(mass, compoundShape);
        // 表示位置
        body.position.set(2 * size * Math.sin(i), 2 * size * Math.cos(i), 7 * 2 * size);
        // 角度調整
        body.quaternion.set(0, 1, 1, 0.2);
        world.add(body);
        demo.addVisual(body);
        bodies.push(body);

        // 限度数を超えた場合古いオブジェクトを削除する
        if(bodies.length > 20){
            var b = bodies.shift();
            demo.removeVisual(b);
            world.remove(b);
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
    world.add(groundBody);
    demo.addVisual(groundBody);

    return world;
};

demo.start();