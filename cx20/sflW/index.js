// forked from cx20's "[簡易版] WebGL 2.0 を試してみるテスト" http://jsdo.it/cx20/tYEN
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var AppSettings = function() {
    this.useTransformFeedback = WGLUUrl.getBool("useTransformFeedback", true);
    this.useInstancing = WGLUUrl.getBool("useInstancing", true);
    this.instanceRows = WGLUUrl.getInt("instanceRows", 25);
    this.instanceColumns = WGLUUrl.getInt("instanceColumns", 25);
    this.variantCount = WGLUUrl.getInt("variantCount", 3);
};

var settings = new AppSettings();

var stats = new Stats();
document.body.appendChild( stats.domElement );

var webglCanvas = document.getElementById("webgl-canvas");
var gl = webglCanvas.getContext("webgl2");
if (!gl) {
    console.error("No WebGL 2 support.");
}

gl.clearColor(0.1, 0.2, 0.3, 1.0);
gl.clearDepth(1.0);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

var projMat = mat4.create();
var modelMat = mat4.create();

var camera = new WGLUCamera.OrbitCamera(webglCanvas);
camera.maxDistance = 25;
camera.minDistance = 2;
camera.minOrbitX = 0;
camera.distanceStep = 0.01;
camera.setDistance(18);
camera.setCenter([0, 0, 0]);
camera.orbit(-0.2, 0.3);

function onResize() {
    webglCanvas.width = webglCanvas.offsetWidth * window.devicePixelRatio;
    webglCanvas.height = webglCanvas.offsetHeight * window.devicePixelRatio;
    gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
    mat4.perspective(projMat, 45, webglCanvas.width/webglCanvas.height, 1.0, 4096.0);
}
window.addEventListener('resize', onResize, false);
onResize();

var model = new SkinnedModel(gl);
var variants = [];

function resetInstances() {
    variants = [];
    for(var i = 0; i < settings.variantCount; ++i) {
        variants.push({
            skeleton: model.skeleton.clone(),
            bakedModel: model.createBakedModel(),
            offsets: [],
            offsetBuffer: null
        });
    }
    
    for (var y = 0; y < settings.instanceRows; ++y) {
        for (var x = 0; x < settings.instanceColumns; ++x) {
            var variant = variants[Math.floor(Math.random() * settings.variantCount)];
            var px = x - (settings.instanceColumns / 2.0) + (Math.random() * 0.5);
            var py = y - (settings.instanceRows / 2.0) + (Math.random() * 0.5);
            variant.offsets.push(vec3.fromValues(px, py, 0.0));
        }
    }
    
    for(var i = 0; i < settings.variantCount; ++i) {
        var variant = variants[i];
        var offsets = variant.offsets;
        var offsetArray = new Float32Array(offsets.length * 3);
        for (var j = 0; j < offsets.length; ++j) {
            offsetArray[j * 3] = offsets[j][0];
            offsetArray[(j * 3) + 1] = offsets[j][1];
            offsetArray[(j * 3) + 2] = offsets[j][2];
        }
        
        variant.offsetBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, variant.offsetBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, offsetArray, gl.STATIC_DRAW);
    }
}

//model.load("media/models/main_player_lorez", function(model) {
model.load2(
    "../../assets/4/J/t/V/4JtVa.wglvert",  // .wglvert
    "../../assets/A/8/m/m/A8mm8.wglmodel",  // .wglmodel
    function(model) {
    resetInstances();
});

var anim = new SkeletalAnimation();
var animationStart = 0;
//anim.load("media/animations/run_forward");
anim.load("../../assets/0/T/K/Q/0TKQp.json");

var settingsGui = new dat.GUI();
settingsGui.add(settings, 'useTransformFeedback');
settingsGui.add(settings, 'useInstancing');
settingsGui.add(settings, 'instanceRows').min(1).onFinishChange(resetInstances);
settingsGui.add(settings, 'instanceColumns').min(1).onFinishChange(resetInstances);
settingsGui.add(settings, 'variantCount', 1, 9).step(1).onFinishChange(resetInstances);

function onAnimationFrame(t) {
    window.requestAnimationFrame(onAnimationFrame);
    stats.begin();
    
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    
    camera.update(t);
    
    if (model.complete) {
        if (anim.complete) {
            if (animationStart == 0) {
                animationStart = t;
            }
            
            var frameTime = 1000 / anim.frameRate;
            var frameId = (t - animationStart) / frameTime;
            while (frameId >= anim.frameCount) {
                frameId -= anim.frameCount;
                animationStart += frameTime * anim.frameCount;
            }
            
            frameId = Math.floor(frameId);
            
            // Update the animations
            var frameOffset = Math.floor(anim.frameCount / variants.length);
            for (var i = 0; i < variants.length; ++i) {
                anim.evaluate((frameId + i*frameOffset) % anim.frameCount, variants[i].skeleton);
            }
        }
        
        var viewMat = this.camera.getViewMat();
        
        if (settings.useTransformFeedback) {
            for (var i = 0; i < variants.length; ++i) {
                variants[i].bakedModel.bake(variants[i].skeleton);
            }
        }
        
        for (var i = 0; i < variants.length; ++i) {
            var variant = variants[i];
            if (settings.useInstancing) {
                mat4.identity(modelMat);
                if (settings.useTransformFeedback) {
                    variant.bakedModel.drawInstanced(modelMat, viewMat, projMat, variant.offsetBuffer, variant.offsets.length);
                } else {
                    model.drawInstanced(modelMat, viewMat, projMat, variant.skeleton, variant.offsetBuffer, variant.offsets.length);
                }
            } else {
                for (var j = 0; j < variant.offsets.length; ++j) {
                    mat4.identity(modelMat);
                    mat4.translate(modelMat, modelMat, variant.offsets[j]);
                    if (settings.useTransformFeedback) {
                        variant.bakedModel.draw(modelMat, viewMat, projMat);
                    } else {
                        model.draw(modelMat, viewMat, projMat, variant.skeleton);
                    }
                }
            }
        }
    }
    
    stats.end();
}
window.requestAnimationFrame(onAnimationFrame);
