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
plane.addComponent("script");
plane.script.create("customShader");

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

var diffuseMap;
var heightMap;
app.assets.loadFromUrl("../../assets/A/k/w/j/AkwjW.jpg", "texture", function (err, asset) {
    diffuseMap = asset;
    heightMap = asset;
});
var vs_resource = document.getElementById("vs").textContent;
var fs_resource = document.getElementById("fs").textContent;

var CustomShader = pc.createScript('customShader');

// TODO: Investigate how to load assets dynamically
/*
CustomShader.attributes.add('vs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Vertex Shader'
});

CustomShader.attributes.add('fs', {
    type: 'asset',
    assetType: 'shader',
    title: 'Fragment Shader'
});

CustomShader.attributes.add('diffuseMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Diffuse Map'
});

CustomShader.attributes.add('heightMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Height Map'
});
*/

// initialize code called once per entity
CustomShader.prototype.initialize = function() {
    this.time = 0;

    var app = this.app;
    var model = this.entity.model.model;
    var gd = app.graphicsDevice;

    //var diffuseTexture = this.diffuseMap.resource;
    //var heightTexture = this.heightMap.resource;
    var diffuseTexture = diffuseMap.resource;
    var heightTexture = heightMap.resource;

    //var vertexShader = this.vs.resource;
    //var fragmentShader = "precision " + gd.precision + " float;\n";
    //fragmentShader = fragmentShader + this.fs.resource;
    var vertexShader = vs_resource;
    var fragmentShader = "precision " + gd.precision + " float;\n";
    fragmentShader = fragmentShader + fs_resource;

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
    this.shader = new pc.Shader(gd, shaderDefinition);

    // Create a new material and set the shader
    this.material = new pc.Material();
    this.material.setShader(this.shader);

    // Set the initial time parameter
    this.material.setParameter('uTime', 0);

    // Set the diffuse texture
    this.material.setParameter('uDiffuseMap', diffuseTexture);

    // Use the "clouds" texture as the height map property
    this.material.setParameter('uHeightMap', heightTexture);

    // Replace the material on the model with our new material
    model.meshInstances[0].material = this.material;
};

// update code called every frame
CustomShader.prototype.update = function(dt) {
    this.time += dt;

    // Bounce value of t 0->1->0
    var t = (this.time % 2);
    if (t > 1) {
        t = 1 - (t - 1);
    }

    // Update the time value in the material
    this.material.setParameter('uTime', t);
};

