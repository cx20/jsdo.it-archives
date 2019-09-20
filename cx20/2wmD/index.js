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
camera.setPosition(0, 0, 3.0); 

// Create light
var light = new pc.Entity();
light.addComponent('light');  
light.rotate(45, 0, 0);
app.root.addChild(light);
app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);   

// Create plane
var plane = new pc.Entity();
plane.addComponent("model", { type: "plane" });
app.root.addChild(plane);
plane.rotate(90, 0, 0);

// Create plane's material
function getTexture (imageFile) {
    var texture = new pc.gfx.Texture(app.graphicsDevice);
    
    var img = new Image();
    img.onload = function () {
        texture.minFilter = pc.gfx.FILTER_LINEAR;
        texture.magFilter = pc.gfx.FILTER_LINEAR;
        texture.addressU = pc.gfx.ADDRESS_CLAMP_TO_EDGE;
        texture.addressV = pc.gfx.ADDRESS_CLAMP_TO_EDGE;
        texture.setSource(img);
    };
    img.src = imageFile;
    return texture;
}

var time = 0;
var diffuseTexture = getTexture("../../assets/A/k/w/j/AkwjW.jpg");  // frog.jpg
var heightTexture = getTexture("../../assets/A/k/w/j/AkwjW.jpg");  // frog.jpg

var model = plane.model.model;
var gd = app.graphicsDevice;

var vertexShader = document.getElementById("vs").textContent;
var fragmentShader = document.getElementById("fs").textContent;

// A shader definition used to create a new shader.
var shaderDefinition = {
    attributes: {
        aPosition: pc.SEMANTIC_POSITION,
        aUv0: pc.SEMANTIC_TEXCOORD0
    },
    vshader: vertexShader,
    fshader: fragmentShader
};

// Create the shader from the definition
var shader = new pc.Shader(gd, shaderDefinition);

// Create a new material and set the shader
material = new pc.Material();
material.setShader(shader);

// Set the initial time parameter
material.setParameter('uTime', 0);

// Set the diffuse texture
material.setParameter('uDiffuseMap', diffuseTexture);

// Use the "clouds" texture as the height map property
material.setParameter('uHeightMap', heightTexture);

// Replace the material on the model with our new material
model.meshInstances[0].material = material;

var timer = 0;
app.on("update", function (deltaTime) {
    timer += deltaTime;
    // code executed on every frame
    //plane.rotate(1, 1, 1);
    
    // t 0->1->0のbounce値
    var t = (timer % 2);
    if (t > 1) {
        t = 1 - (t - 1);
    }

    material.setParameter('uTime', t);
});
