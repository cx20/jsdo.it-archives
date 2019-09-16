// forked from cx20's "[WebGL] GLBoost でリサージュ図形を描いてみるテスト（調整中）" http://jsdo.it/cx20/WO1O
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// https://gist.github.com/mjackson/5311256
function hslToRgb(h, s, l) {
    var r, g, b;
    
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return [ r * 255, g * 255, b * 255 ];
}

function init() 
{
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById("world");
    let glBoostContext = new GLBoost.GLBoostMiddleContext(canvas);
    let renderer = glBoostContext.createRenderer({ canvas: canvas, clearColor: {red:0, green:0, blue:0, alpha:1}});
    renderer.resize(width, height);
    
    let scene = glBoostContext.createScene();
    
    let directionalLight1 = glBoostContext.createDirectionalLight(new GLBoost.Vector3(1.5, 1.5, 1.5), new GLBoost.Vector3(-45, -45, 0));
    scene.addChild( directionalLight1 );
    
    let camera = glBoostContext.createPerspectiveCamera({
        eye: new GLBoost.Vector3(0.0, 50, 200),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 1000.0
    });
    camera.cameraController = glBoostContext.createCameraController();
    scene.addChild(camera);

    const MAX = 360;
 
    const R = 100;
    
    let alpha = Math.PI/4;
    let beta  = Math.PI/3;
    let gamma = 0; // Math.PI/2;
    
    let theta = 0.0;

    let A1 = 50, f1 = 2, p1 = 1/16, d1 = 0.02;
    let A2 = 50, f2 = 2, p2 = 3 / 2, d2 = 0.0315;
    let A3 = 50, f3 = 2, p3 = 13 / 15, d3 = 0.02;
    let A4 = 50, f4 = 2, p4 = 1, d4 = 0.02;
    
    let positions = [];
    let colors = [];
    let indices= [];
    let i = 0;
    for ( let t = 0; t <= MAX; t += 0.1 ) {
        let x = 0;
        let y = 0;
        let z = 0;
        positions.push([x, y, z]);
        let rgb = hslToRgb((t/MAX * 360 | 0) / 360.0, 0.80, 0.50);
        colors.push([rgb[0]/255, rgb[1]/255, rgb[2]/255]);
        indices.push(i);
        i++;
    }

    let geometry = glBoostContext.createGeometry();
    geometry.setVerticesData({
        position: positions,
        color: colors
    }, null, GLBoost.LINE_STRIP);
    let mesh = glBoostContext.createMesh(geometry);
    
    scene.addChild(mesh);
    
    expression = glBoostContext.createExpressionAndRenderPasses(1);
    expression.renderPasses[0].scene = scene;
    expression.prepareToRender();
 
    let angle = 0;
    let axis = new GLBoost.Vector3(0, 1, 0);

    renderer.doConvenientRenderLoop(expression, function() {
        randomHarmonograph();
    });                                    

    function randomHarmonograph() {
        f1 = (f1 + Math.random() / 40) % 10;
        f2 = (f2 + Math.random() / 40) % 10;
        f3 = (f3 + Math.random() / 40) % 10;
        f4 = (f4 + Math.random() / 40) % 10;
        p1 += (Math.PI*2 * 0.5 / 360);
        
        drawHarmonograph();
    }
    
    function drawHarmonograph()
    {
        for (let i = 0; i < positions.length; i++) {
            let t = i / 200;
            let x = A1 * Math.sin(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.sin(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
            let y = A3 * Math.sin(f3 * t + Math.PI * p3) * Math.exp(-d3 * t) + A4 * Math.sin(f4 * t + Math.PI * p4) * Math.exp(-d4 * t);
            let z = A1 * Math.cos(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.cos(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
    
            positions[i][0] = x;
            positions[i][1] = y;
            positions[i][2] = z;
        }

        geometry.updateVerticesData({
            position: positions,
        });
    }
}


init();
