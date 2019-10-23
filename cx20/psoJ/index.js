// forked from cx20's "Three.js + Cannon.js でSPH サンプルを試してみるテスト（その２）" http://jsdo.it/cx20/jLfg
// forked from cx20's "Three.js + Cannon.js でSPH サンプルを試してみるテスト" http://jsdo.it/cx20/yRDN
// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト（その２）" http://jsdo.it/cx20/7GT5
// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト" http://jsdo.it/cx20/7lgA

// Set to true to create convexes instead. Will prove that performance is much better with a real heightfield.
var mock = false;

var demo = new CANNON.Demo();

demo.addScene("Heightfield", function () {
    
    var world = demo.getWorld();
    world.gravity.set(0, 0, -10);
    world.broadphase = new CANNON.NaiveBroadphase();
    
    var matrix = [];
    var sizeX = 15,
        sizeY = 15;
    
    for (var i = 0; i < sizeX; i++) {
        matrix.push([]);
        for (var j = 0; j < sizeY; j++) {
            var height = Math.cos(i/sizeX * Math.PI * 2)*Math.cos(j/sizeY * Math.PI * 2) + 2;
            if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1)
                height = 3;
            matrix[i].push(height);
        }
    }
    
    var hfShape = new CANNON.Heightfield(matrix, {
        elementSize: 1
    });
    var hfBody = new CANNON.Body({ mass: 0 });
    hfBody.addShape(hfShape);
    hfBody.position.set(-sizeX * hfShape.elementSize / 2, -20, -10);
    if(!mock){
        world.add(hfBody);
        demo.addVisual(hfBody);
    }
    
    var mass = 1;
    
    for(var i=0; i<sizeX - 1; i++){
        for (var j = 0; j < sizeY - 1; j++) {
            if(i===0 || i >= sizeX-2 || j===0 || j >= sizeY-2)
                continue;
            var sphereShape = new CANNON.Sphere(0.1);
            var sphereBody = new CANNON.Body({ mass: mass });
            sphereBody.addShape(sphereShape);
            sphereBody.position.set(0.25 + i, 0.25 + j, 3);
            sphereBody.position.vadd(hfBody.position, sphereBody.position);
            world.add(sphereBody);
            demo.addVisual(sphereBody);
        }
    }
    
    if(mock){
        for(var i=0; i<sizeX - 1; i++){
            for (var j = 0; j < sizeY - 1; j++) {
                for (var k = 0; k < 2; k++) {
                    hfShape.getConvexTrianglePillar(i, j, !!k);
                    var convexBody = new CANNON.Body({ mass: 0 });
                    convexBody.addShape(hfShape.pillarConvex);
                    hfBody.pointToWorldFrame(hfShape.pillarOffset, convexBody.position);
                    world.add(convexBody);
                    demo.addVisual(convexBody);
                }
            }
        }
    }
});

demo.start();
