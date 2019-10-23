// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト（その２）" http://jsdo.it/cx20/7GT5
// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト" http://jsdo.it/cx20/7lgA

// Set to true to create convexes instead. Will prove that performance is much better with a real heightfield.
var mock = false;

var demo = new CANNON.Demo();

demo.addScene("Heightfield", function() {

    var world = demo.getWorld();
    world.gravity.set(0, 0, -10);
    world.broadphase = new CANNON.NaiveBroadphase();

    var matrix = [];
    var sizeX = 16 * 2,
        sizeY = 16 * 2;

    var simplexNoise = new SimplexNoise;
    for (var i = 0; i < sizeX; i++) {
        matrix.push([]);
        for (var j = 0; j < sizeY; j++) {
            var height = simplexNoise.noise(i / 7.0, j / 8.0) * 2 + 3;
            if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeY - 1)
                height = 3;
            matrix[i].push(height);
        }
    }

    var hfShape = new CANNON.Heightfield(matrix, {
        elementSize: 1
    });
    var hfBody = new CANNON.Body({
        mass: 0
    });
    hfBody.addShape(hfShape);
    hfBody.position.set(-sizeX * hfShape.elementSize / 2, -20, -10);
    if (!mock) {
        world.add(hfBody);
        demo.addVisual(hfBody);
    }

    // Now create a RigidBody for our Compound
    var interval;
    var mass = 10;
    var size = 1;
    var bodies = [];
    var i = 0;


    interval = setInterval(function() {
        i++;
        var body = new CANNON.Body({
            mass: mass
        });

        // We can add the same shape several times to position child shapes within the Compound.
        body.addShape(new CANNON.Box(new CANNON.Vec3(1.8, 0.3, 0.3)), new CANNON.Vec3(0.0, 1.5, 0.0));
        body.addShape(new CANNON.Box(new CANNON.Vec3(0.3, 1.5, 0.3)), new CANNON.Vec3(1.5, 0.0, 0.0));
        body.addShape(new CANNON.Box(new CANNON.Vec3(1.8, 0.3, 0.3)), new CANNON.Vec3(0.0, -1.5, 0.0));
        body.addShape(new CANNON.Box(new CANNON.Vec3(0.2, 0.6, 0.3)), new CANNON.Vec3(2.0, 1.5, 0.0));
        body.addShape(new CANNON.Box(new CANNON.Vec3(0.2, 0.6, 0.3)), new CANNON.Vec3(2.5, 1.5, 0.0));
        // 表示位置
        body.position.set(2 * size * Math.sin(i), 2 * size * Math.cos(i) - 10, 7 * 2 * size);
        // 角度調整
        body.quaternion.set(0, 1, 1, 0.2);
        world.add(body);
        demo.addVisual(body);
        bodies.push(body);

        // 限度数を超えた場合古いオブジェクトを削除する
        if (bodies.length > 30) {
            var b = bodies.shift();
            demo.removeVisual(b);
            world.remove(b);
        }
    }, 200);
});

demo.start();