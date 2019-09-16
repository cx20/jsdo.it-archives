// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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
        eye: new GLBoost.Vector3(0.0, 0.5, 1),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: width/height,
        zNear: 0.001,
        zFar: 1000.0
    });
    camera.cameraController = glBoostContext.createCameraController();
    scene.addChild(camera);

    // 正弦波×余弦波の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //             [3]
    //         [4]     [2]
    //      [5]            [1]
    //      *                *
    //     [6]              [0]
    //      *                *
    //      [7]            [11]
    //         [8]     [10]
    //             [9]
    //
    const MAX = 360;
    const R = 0.5;
    const A = 100.0;
    const B = 99.0;
    const C = 1.0;
    const alpha = Math.PI/4;
    const beta  = Math.PI/3;
    const gamma = 0; // Math.PI/2;

    let positions = [];
    let colors = [];
    let indices= [];
    let i = 0;
    for ( let t = 0; t <= MAX; t += 0.1 ) {
/*
        let x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
        let y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
        let z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
*/
        let x = R * Math.sin(2 * Math.PI * t / MAX * A + alpha);
        let y = R * Math.sin(2 * Math.PI * t / MAX * B + beta);
        let z = R * Math.sin(2 * Math.PI * t / MAX * C + gamma);
        positions.push([x, y, z]);
        colors.push([x + 0.5, y + 0.5, z + 0.5, 1.0]);
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
        mesh.quaternion = GLBoost.Quaternion.axisAngle(axis, GLBoost.MathUtil.radianToDegree(angle));
        angle += 0.02;
     });                                    
}


init();
