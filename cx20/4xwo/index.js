// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その４）（VBO編）" http://jsdo.it/cx20/swSy
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その３）（VBO編）" http://jsdo.it/cx20/YiRx
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（その２）（VBO編）" http://jsdo.it/cx20/e3YN
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト（VBO編）" http://jsdo.it/cx20/iUdQ
// forked from cx20's "[WebGL] Grimoire.js を試してみるテスト" http://jsdo.it/cx20/4ZEB
// forked from cx20's "[WebGL] jThree を試してみるテスト" http://jsdo.it/cx20/Go5s

const Vector3 = gr.lib.math.Vector3;
const Quaternion = gr.lib.math.Quaternion;

gr(function () {
    var $$ = gr("#main");

    var world = new CANNON.World();

    var lastGravityVector = [
        [0],
        [-9.82],
        [0],
        [1]
    ];
    world.gravity.set(lastGravityVector[0][0], lastGravityVector[1][0], lastGravityVector[2][0]);

    var planes = [];
    for (let i = 0; i < 6; i++) {
        planes[i] = new CANNON.Body({
            mass: 0, // mass == 0 makes the body static
        });
        var planeShape = new CANNON.Plane();
        planes[i].addShape(planeShape);
    }
    planes.forEach(function (v, i) {
        switch (i) {
        case 0:
            v.position = new CANNON.Vec3(5, 0, 0);
            v.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
            break;
        case 1:
            v.position = new CANNON.Vec3(-5, 0, 0);
            v.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
            break;
        case 2:
            v.position = new CANNON.Vec3(0, 5, 0);
            v.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
            break;
        case 3:
            v.position = new CANNON.Vec3(0, -5, 0);
            v.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
            break;
        case 4:
            v.position = new CANNON.Vec3(0, 0, 5);
            v.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI);
            break;
        case 5:
            v.position = new CANNON.Vec3(0, 0, -5);
            break;
        }
        world.addBody(v);
    });

    var balls = [];
    for (let i = 0; i < 3; i++) {
        var radius = 1;
        balls[i] = new CANNON.Body({
            mass: 1.2,
            position: new CANNON.Vec3(0, 0, 0),
            shape: new CANNON.Sphere(radius),
        });
        switch (i) {
        case 0:
            balls[i].position = new CANNON.Vec3(3, 0, 0);
            break;
        case 1:
            balls[i].position = new CANNON.Vec3(0, 3, 0);
            break;
        case 2:
            balls[i].position = new CANNON.Vec3(0, 0, 3);
            break;
        }
        world.addBody(balls[i]);
    }

    var fixedTimeStep = 1.0 / 60.0; // seconds
    var maxSubSteps = 3;

    var lastTime;
    var lastCameraEularAngles;
    physics();

    function physics(time) {
        if (lastTime !== undefined) {
            var dt = (time - lastTime) / 1000;
            world.step(fixedTimeStep, dt, maxSubSteps);
        }
        balls.forEach(function (v, i) {
            $$("#sphere" + i).setAttribute("position", v.position.x + "," + v.position.y + "," + v.position.z);
        });
        lastTime = time;

        var camera = $$("#camera").get(0);
        var t = camera.getComponent("Transform");
        var d = t.up.negateThis().multiplyWith(9.82);
        world.gravity.set(d.X, d.Y, d.Z);
        requestAnimationFrame(physics);
    }
});