// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）（その２）" http://jsdo.it/cx20/Sxek
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

        // 立方体の座標データを用意
        //             1.0 y 
        //              ^  -1.0 
        //              | / z
        //              |/       x
        // -1.0 -----------------> +1.0
        //            / |
        //      +1.0 /  |
        //           -1.0
        // 
        //         [7]------[6]
        //        / |      / |
        //      [3]------[2] |
        //       |  |     |  |
        //       | [4]----|-[5]
        //       |/       |/
        //      [0]------[1]
        //
        var positions = [
            // Front face
            new GLBoost.Vector3(-0.5, -0.5,  0.5), // v0
            new GLBoost.Vector3( 0.5, -0.5,  0.5), // v1
            new GLBoost.Vector3( 0.5,  0.5,  0.5), // v2
            new GLBoost.Vector3(-0.5,  0.5,  0.5), // v3
            // Back face
            new GLBoost.Vector3(-0.5, -0.5, -0.5), // v4
            new GLBoost.Vector3( 0.5, -0.5, -0.5), // v5
            new GLBoost.Vector3( 0.5,  0.5, -0.5), // v6
            new GLBoost.Vector3(-0.5,  0.5, -0.5), // v7
            // Top face
            new GLBoost.Vector3( 0.5,  0.5,  0.5), // v2
            new GLBoost.Vector3(-0.5,  0.5,  0.5), // v3
            new GLBoost.Vector3(-0.5,  0.5, -0.5), // v7
            new GLBoost.Vector3( 0.5,  0.5, -0.5), // v6
            // Bottom face
            new GLBoost.Vector3(-0.5, -0.5,  0.5), // v0
            new GLBoost.Vector3( 0.5, -0.5,  0.5), // v1
            new GLBoost.Vector3( 0.5, -0.5, -0.5), // v5
            new GLBoost.Vector3(-0.5, -0.5, -0.5), // v4
            // Right face
            new GLBoost.Vector3( 0.5, -0.5,  0.5), // v1
            new GLBoost.Vector3( 0.5,  0.5,  0.5), // v2
            new GLBoost.Vector3( 0.5,  0.5, -0.5), // v6
            new GLBoost.Vector3( 0.5, -0.5, -0.5), // v5
            // Left face
            new GLBoost.Vector3(-0.5, -0.5,  0.5), // v0
            new GLBoost.Vector3(-0.5,  0.5,  0.5), // v3
            new GLBoost.Vector3(-0.5,  0.5, -0.5), // v7
            new GLBoost.Vector3(-0.5, -0.5, -0.5)  // v4
        ];

        var colors = [
            new GLBoost.Vector3(1.0, 0.0, 0.0, 1.0), // Front face
            new GLBoost.Vector3(1.0, 0.0, 0.0, 1.0), // Front face
            new GLBoost.Vector3(1.0, 0.0, 0.0, 1.0), // Front face
            new GLBoost.Vector3(1.0, 0.0, 0.0, 1.0), // Front face
            
            new GLBoost.Vector3(1.0, 1.0, 0.0, 1.0), // Back face
            new GLBoost.Vector3(1.0, 1.0, 0.0, 1.0), // Back face
            new GLBoost.Vector3(1.0, 1.0, 0.0, 1.0), // Back face
            new GLBoost.Vector3(1.0, 1.0, 0.0, 1.0), // Back face
            
            new GLBoost.Vector3(0.0, 1.0, 0.0, 1.0), // Top face
            new GLBoost.Vector3(0.0, 1.0, 0.0, 1.0), // Top face
            new GLBoost.Vector3(0.0, 1.0, 0.0, 1.0), // Top face
            new GLBoost.Vector3(0.0, 1.0, 0.0, 1.0), // Top face
            
            new GLBoost.Vector3(1.0, 0.5, 0.5, 1.0), // Bottom face
            new GLBoost.Vector3(1.0, 0.5, 0.5, 1.0), // Bottom face
            new GLBoost.Vector3(1.0, 0.5, 0.5, 1.0), // Bottom face
            new GLBoost.Vector3(1.0, 0.5, 0.5, 1.0), // Bottom face
            
            new GLBoost.Vector3(1.0, 0.0, 1.0, 1.0), // Right face
            new GLBoost.Vector3(1.0, 0.0, 1.0, 1.0), // Right face
            new GLBoost.Vector3(1.0, 0.0, 1.0, 1.0), // Right face
            new GLBoost.Vector3(1.0, 0.0, 1.0, 1.0), // Right face
            
            new GLBoost.Vector3(0.0, 0.0, 1.0, 1.0),  // Left face
            new GLBoost.Vector3(0.0, 0.0, 1.0, 1.0),  // Left face
            new GLBoost.Vector3(0.0, 0.0, 1.0, 1.0),  // Left face
            new GLBoost.Vector3(0.0, 0.0, 1.0, 1.0)   // Left face
        ];

        var indices = [
             0,  1,  2,    0,  2 , 3,  // Front face
             4,  5,  6,    4,  6 , 7,  // Back face
             8,  9, 10,    8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15,  // Bottom face
            16, 17, 18,   16, 18, 19,  // Right face
            20, 21, 22,   20, 22, 23   // Left face
        ];

        var geometry = glBoostContext.createGeometry();
        var material = glBoostContext.createClassicMaterial();
        geometry.materials = [material];
        geometry.setVerticesData({
            position: positions,
            color: colors
        }, [indices], GLBoost.TRIANGLES);
        var mesh = glBoostContext.createMesh(geometry);

        layer.scene.addChild(mesh);

        var camera = glBoostContext.createCamera({
            eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
            center: new GLBoost.Vector3(0.0, 0.0, 0.0),
            up: new GLBoost.Vector3(0.0, 1.0, 0.0)
        }, {
            fovy: 45.0,
            aspect: 1.0,
            zNear: 0.1,
            zFar: 10.0
        });
        layer.scene.addChild(camera);

        layer.scene.prepareForRender();

        layer.update = function() {

            var rotateMatrixX = GLBoost.Matrix33.rotateX(-1);
            var rotateMatrixY = GLBoost.Matrix33.rotateY(-1);
            var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
            rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
            camera.eye = rotatedVector;
        };
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
