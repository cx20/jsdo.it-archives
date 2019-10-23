// forked from cx20's "CubicVR.js で立方体を表示するテスト" http://jsdo.it/cx20/kKwJ

function webGLStart(gl, canvas) {
    
    var poolWidth = 64,
        poolHeight = 64;
    
    var bufferA = new Float32Array(poolWidth * poolHeight);
    var bufferB = new Float32Array(poolWidth * poolHeight);
    var srcBuffer = bufferA,
        dstBuffer = bufferB,
        tmp, landscapeMesh;
    
    function processPool() {
        var hfBuffer = landscape.getHeightField().getFloat32Buffer();
        
        for (var i = poolWidth; i < poolWidth * poolHeight; i++) {
            if (i % poolWidth === 0 || (i + 1) % poolWidth === 0 || i > (poolWidth * (poolHeight - 1))) {
                dstBuffer[i] = srcBuffer[i] = 0;
                continue;
            }
            
            hfBuffer[i] = dstBuffer[i] = (((srcBuffer[i - 1] + srcBuffer[i + 1] + srcBuffer[i + poolWidth] + srcBuffer[i - poolWidth]) / 2.0) - dstBuffer[i]) * 0.98;
        }
        
        
        tmp = srcBuffer;
        srcBuffer = dstBuffer;
        dstBuffer = tmp;
        tmp = null;
        
        landscapeMesh.update();
    }
    
    
    function add_sqrt_wave(x, y, sz, h) {
        for (var i = parseInt(Math.floor(x),10) - sz; i < parseInt(Math.ceil(x),10) + sz; i++) {
            var dx = i-x, dy;
            
            for (var j = parseInt(Math.floor(y),10) - sz; j < parseInt(Math.ceil(y),10) + sz; j++) {
                if (i <= 0 || i >= poolWidth || j <= 0 || j >= poolHeight) continue;
                dy = j - y;
                srcBuffer[j * poolWidth + i] += h * ((1.0 - Math.sqrt(dx * dx + dy * dy) / (sz)) / 2.0);
            }
        }
    }
    
    
    function add_blocker(x, y, w, h) {
        for (var i = x - w; i < x + w; i++) {
            var dx = i - x, dy;
            
            for (var j = y - h; j < y + h; j++) {
                srcBuffer[j * poolWidth + i] = dstBuffer[j * poolWidth + i] = 0;
            }
        }
    }
    
    
    
    // Generate a grass material for the landscape
    var landscapeMaterial = new CubicVR.Material({
        textures: {
            color: "water.jpg",    // "../images/water.jpg",
            envsphere: "fract_reflections.jpg" // "../images/fract_reflections.jpg"
        },
        envAmount: 0.4,
        specular: [0.8, 0.8, 1.0]
    });
    
    // Generate a size 400 landscape with 92 divisions in the X and Z axis, apply landscapeMaterial to faces.
    var landscape = new CubicVR.Landscape(50, poolWidth, poolHeight, landscapeMaterial);
    
    // Generate a planar UVMapper for the landscape material.
    var landscapeUV = new CubicVR.UVMapper({
        projectionMode: "planar",
        projectionAxis: "y",
        scale: [10, 10, 10]
    });
    
    landscapeMesh = landscape.getMesh();
    
    // Apply the UVMapper coordinates to the landscape
    landscapeUV.apply(landscapeMesh, landscapeMaterial);
    
    // Compile the heightfield mesh and prepare it for rendering
    landscapeMesh.prepare();
    
    // New scene with our canvas dimensions and default camera with FOV 80
    var scene = new CubicVR.Scene({
        camera: {
            width: canvas.width,
            height: canvas.height,
            position: [0, 20, -35],
            target: [0, 0, 0]
        },
        light: {
            type: "point",
            position: [0, 20, 0],
            distance: 100
        }
    });
    
    scene.bindSceneObject(landscape);
    
    // Add our scene to the window resize list
    CubicVR.addResizeable(scene);
    
    // Start our main drawing loop, it provides a timer and the gl context as parameters
    CubicVR.MainLoop(function(timer, gl) {
        processPool();
        scene.render();
    });
    
    // initialize a mouse view controller
    var mvc = new CubicVR.MouseViewController(canvas, scene.camera);
    
    mvc.setEvents({
        mouseMove: function(ctx, mpos, mdelta, keyState) {
            if (ctx.mdown) {
                ctx.orbitView(mdelta);
                if (scene.camera.position[1]<0) {
                    scene.camera.position[1] = 0;
                }
            } else {
                var far_pos = scene.camera.unProject(mpos[0], mpos[1], 400);
                var intersect = CubicVR.vec3.linePlaneIntersect([0, 1, 0], [0, 0, 0], scene.camera.position, far_pos);
                var spacebr = keyState[CubicVR.keyboard.SPACE];
                
                add_sqrt_wave(
                    (intersect[0] / landscape.getHeightField().size + 0.5) * poolWidth, 
                    (intersect[2] / landscape.getHeightField().size + 0.5) * poolHeight, 
                        spacebr?10:6,  spacebr? 1.0 : 0.5);
            }
        },
        mouseWheel: function(ctx, mpos, wheelDelta, keyState) {
            ctx.zoomView(wheelDelta * 2);
        }
    });
}
