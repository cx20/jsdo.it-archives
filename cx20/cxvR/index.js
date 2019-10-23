// forked from cx20's "Three.js + Cannon.js で Height Field サンプルを試してみるテスト（その２）" http://jsdo.it/cx20/l4PY
// forked from cx20's "Three.js + Cannon.js で Height Field サンプルを試してみるテスト" http://jsdo.it/cx20/psoJ
// forked from cx20's "Three.js + Cannon.js でSPH サンプルを試してみるテスト（その２）" http://jsdo.it/cx20/jLfg
// forked from cx20's "Three.js + Cannon.js でSPH サンプルを試してみるテスト" http://jsdo.it/cx20/yRDN
// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト（その２）" http://jsdo.it/cx20/7GT5
// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト" http://jsdo.it/cx20/7lgA

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
		"無":"#000000",
		"白":"#ffffff",
		"肌":"#ffcccc",
		"茶":"#800000",
		"赤":"#ff0000",
		"黄":"#ffff00",
		"緑":"#00ff00",
		"水":"#00ffff",
		"青":"#0000ff",
		"紫":"#800080"
	};
	return colorHash[ c ];
}

// Set to true to create convexes instead. Will prove that performance is much better with a real heightfield.
var mock = false;

var demo = new CANNON.Demo();

demo.addScene("Heightfield", function () {
    
    var world = demo.getWorld();
    world.gravity.set(0, 0, -10);
    world.broadphase = new CANNON.NaiveBroadphase();
    
    var matrix = [];
    var sizeX = 16,
        sizeY = 16;
    
    var simplexNoise = new SimplexNoise;
    for (var i = 0; i < sizeX; i++) {
        matrix.push([]);
        for (var j = 0; j < sizeY; j++) {
            //var height = Math.cos(i/sizeX * Math.PI * 2)*Math.cos(j/sizeY * Math.PI * 2) + 2;
            var height = simplexNoise.noise( i/4.0, j/5.0 ) + 2;
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
    
    for(var i = 0; i < sizeX - 1; i++){
        for (var j = 0; j < sizeY - 1; j++) {
            if(i===0 || i >= sizeX-2 || j===0 || j >= sizeY-2)
                continue;
            var sphereShape = new CANNON.Sphere(0.3);
            var sphereBody = new CANNON.Body({ mass: mass });
            sphereBody.addShape(sphereShape);
            sphereBody.position.set(0.25 + i, 0.25 + j, 3);
            sphereBody.position.vadd(hfBody.position, sphereBody.position);
            world.add(sphereBody);
            var pos = (15 - i) + j * 16;
            if ( dataSet[pos] != "無" ) {
                demo.addVisual(sphereBody, dataSet[pos]);
            }
        }
    }
    
    if(mock){
        for(var i = 0; i < sizeX - 1; i++){
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
