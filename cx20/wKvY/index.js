// forked from cx20's "[WebGL] GLBoost を試してみるテスト（その２）（未完成）" http://jsdo.it/cx20/UFoi
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（未完成）" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

/*
 * constant
 */
var SCREEN_WIDTH    = 465;              // 画面幅
var SCREEN_HEIGHT   = 465;              // 画面高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // 画面中央X座標値
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // 画面中央Y座標値

GLBoost.TARGET_WEBGL_VERSION = 1;

/*
 * main
 */
tm.main(function() {
    // アプリケーション
    var app = tm.webgl.WebGLApp("#world");
    app.replaceScene(MainScene());
    
    // 初期設定値を更新（暫定対応）
    var renderer = app.getRenderer();
    renderer._gl.clearColor(1.0, 1.0, 1.0, 1.0);
    
    // 実行
    app.run();
});


/*
 * scene
 */
var MainScene = tm.createClass({
    // three.js 用シーンを継承
    superClass: tm.webgl.Scene,
    
    init: function() {
        this.superInit();
        
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
        
        var geometry = new GLBoost.Geometry('#world');
        geometry.setVerticesData({
            position: positions,
            color: colors
        }, [indices], GLBoost.TRIANGLE_STRIP);
        var mesh = tm.webgl.MeshElement(geometry, null, '#world');

        this.add( mesh );
        
        var camera = tm.webgl.CameraElement({
            eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
            center: new GLBoost.Vector3(0.0, 0.0, 0.0),
            up: new GLBoost.Vector3(0.0, 1.0, 0.0)
        }, {
            fovy: 45.0,
            aspect: 1.0,
            zNear: 0.1,
            zFar: 10.0
        });
        
        this.add(camera);        
        this.prepareForRender();
        
        setInterval(function(){
            var rotateMatrixX = GLBoost.Matrix33.rotateX(-0.02);
            var rotateMatrixY = GLBoost.Matrix33.rotateY(-0.02);
            var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
            rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
            camera.eye = rotatedVector;
        }, 34);
    }
});
