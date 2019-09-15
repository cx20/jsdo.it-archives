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
        var positions = [
            new GLBoost.Vector3( 0.0,  0.5, 0.0),
            new GLBoost.Vector3(-0.5, -0.5, 0.0),
            new GLBoost.Vector3( 0.5, -0.5, 0.0)
        ];
        
        var colors = [
            new GLBoost.Vector3(0.0, 0.0, 1.0),
            new GLBoost.Vector3(0.0, 0.0, 1.0),
            new GLBoost.Vector3(0.0, 0.0, 1.0),
        ];
        
        var geometry = new GLBoost.Geometry('#world');
        geometry.setVerticesData({
            position: positions,
            color: colors
        });
        var mesh = tm.webgl.MeshElement(geometry, null, '#world');
        
        this.add( mesh );
        
        this.prepareForRender();
    }
});
