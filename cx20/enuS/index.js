// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var canvas = document.getElementById("application-canvas");

// Start and init Application
var app = new pc.Application(canvas);
app.start();
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// Create camera
var camera = new pc.Entity();
camera.addComponent("camera", { clearColor: new pc.Color(1.0, 1.0, 1.0) });
app.root.addChild(camera);
camera.setPosition(0, 0, 3); 

// Create light
var light = new pc.Entity();
light.addComponent('light');  
light.rotate(45, 0, 0);
app.root.addChild(light);
app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);   

// Create cone
var cone = new pc.Entity();
cone.addComponent("model", { type: "cone" });
app.root.addChild(cone);
cone.rotate(-10, 0, 0);
cone.translate(0, 0, 0);

// Create cone's material
var coneMaterial = new pc.PhongMaterial();
coneMaterial.diffuse.set(0.0, 0.0, 1.0);
coneMaterial.update();
cone.model.model.meshInstances[0].material = coneMaterial;