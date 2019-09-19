// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト（その３）" http://jsdo.it/cx20/cNue
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト（その２）" http://jsdo.it/cx20/wsZw
// forked from cx20's "[WebGL] PlayCanvas Engine を試してみるテスト" http://jsdo.it/cx20/enuS
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
camera.setPosition(0, 0, 3.5); 

// Create light
var light = new pc.Entity();
light.addComponent('light');  
light.rotate(45, 0, 0);
app.root.addChild(light);
app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);   

// Create cube
var box = new pc.Entity();
box.addComponent("model", { type: "box" });
app.root.addChild(box);
box.rotate(0, 0, 0);

// Create cube's material
var boxMaterial = new pc.PhongMaterial();
//boxMaterial.diffuse.set(0.0, 0.0, 1.0);
boxMaterial.diffuseMap = getTexture();
boxMaterial.update();
box.model.model.meshInstances[0].material = boxMaterial;

function getTexture () {
    var texture = new pc.gfx.Texture(app.graphicsDevice);
    
    var img = new Image();
    img.onload = function () {
        texture.minFilter = pc.gfx.FILTER_LINEAR;
        texture.magFilter = pc.gfx.FILTER_LINEAR;
        texture.addressU = pc.gfx.ADDRESS_CLAMP_TO_EDGE;
        texture.addressV = pc.gfx.ADDRESS_CLAMP_TO_EDGE;
        texture.setSource(img);
    };
    img.src = "../../assets/A/k/w/j/AkwjW.jpg";  // frog.jpg
    return texture;
}

var timer = 0;
app.on("update", function (deltaTime) {
    timer += deltaTime;
    // code executed on every frame
    box.rotate(1, 1, 1);
});
