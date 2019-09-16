// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

GLBoost.TARGET_WEBGL_VERSION = 1;
var SCREEN_WIDTH  = 465;
var SCREEN_HEIGHT = 465;

phina.globalize();

phina.define('MainScene', {
    superClass: 'DisplayScene',

    init: function(options) {
        this.superInit();

        var layer = phina.display.GLBoostLayer({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
        }).addChildTo(this);
        
        var glBoostContext = layer.glBoostContext;

        // 正方形の座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        //        [0]------[1]
        //         |        |
        //         |        |
        //         |        |
        //        [2]------[3]
        //
        var positions = [
            new GLBoost.Vector3(-0.5,  0.5, 0.0), // v0
            new GLBoost.Vector3( 0.5,  0.5, 0.0), // v1
            new GLBoost.Vector3(-0.5, -0.5, 0.0), // v2
            new GLBoost.Vector3( 0.5, -0.5, 0.0)  // v3
        ];

        var colors = [
            new GLBoost.Vector3(1.0, 0.0, 0.0),  // v0
            new GLBoost.Vector3(0.0, 1.0, 0.0),  // v1
            new GLBoost.Vector3(0.0, 0.0, 1.0),  // v2
            new GLBoost.Vector3(1.0, 1.0, 0.0)   // v3
        ];
        
        var indices = [
            0, 2, 1,
            2, 3, 1
        ];

        var geometry = glBoostContext.createGeometry();
        var material = glBoostContext.createClassicMaterial();
        geometry.materials = [material];
        geometry.setVerticesData({
            position: positions,
            color: colors,
        }, [indices], GLBoost.TRIANGLE_STRIP)
        var mesh = glBoostContext.createMesh(geometry);
        
        layer.scene.addChild(mesh);

        layer.scene.prepareForRender();
    }
});

phina.main(function() {
    var app = GameApp({
        startLabel: 'main',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    });

    app.run();
});
