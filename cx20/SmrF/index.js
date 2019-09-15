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

        var positions = [
            new GLBoost.Vector3( 0.0,  0.5, 0.0),
            new GLBoost.Vector3(-0.5, -0.5, 0.0),
            new GLBoost.Vector3( 0.5, -0.5, 0.0)
        ];

        var colors = [
            new GLBoost.Vector3(0.0, 0.0, 1.0),
            new GLBoost.Vector3(0.0, 0.0, 1.0),
            new GLBoost.Vector3(0.0, 0.0, 1.0)
        ];

        var geometry = glBoostContext.createGeometry();
        var material = glBoostContext.createClassicMaterial();
        geometry.materials = [material];
        geometry.setVerticesData({
            position: positions,
            color: colors
        });
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
