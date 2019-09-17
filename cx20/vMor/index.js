// forked from cx20's "Babylon.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/3WmL
// forked from cx20's "Babylon.js v2.0 を試してみるテスト" http://jsdo.it/cx20/whLL
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

var MAX = 360;
var R = 20;
var A = 100.0;
var B = 99.0;
var C = 1.0;
var alpha = Math.PI/4;
var beta  = Math.PI/3;
var gamma = 0; // Math.PI/2;
var theta = 0.0;

var createScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(20, 20, 100));
    camera.attachControl(canvas);
    camera.maxZ = 200;
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var points = [];
    for ( var i = 0; i <= MAX; i += 0.1 ) {
        var x = R * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        var y = R * Math.sin(2 * Math.PI * i / MAX * B + beta);
        var z = R * Math.sin(2 * Math.PI * i / MAX * C + gamma);
        points.push(new BABYLON.Vector3(x, y, z));
    }

    var mesh = BABYLON.Mesh.CreateLines("mesh", points, scene, true);
    mesh.color = new BABYLON.Color3(1, 1, 0);

    scene.registerBeforeRender(function () {
/*
        scene.activeCamera.alpha += 0.03; // Y 軸回転
        scene.activeCamera.beta  += 0.03; // X 軸回転（何故か3.14以上にインクリメントできない。。。）
*/
        mesh.rotation.x = theta;
        mesh.rotation.y = theta;
        theta += 0.03;
    });
    
    return scene;
};

var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene( engine );
engine.runRenderLoop(function () {
    scene.render();
});
