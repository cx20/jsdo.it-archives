// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/czeo
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/6Cd9
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/WltV
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）" http://jsdo.it/cx20/KVOj
// forked from cx20's "[WebGL] QTEK を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var app = clay.application.create('#main', {
    init: function (app) {
        // Create a orthographic camera
        var camera = app.createCamera(null, null, 'perspective');
        camera.position.set(0, 0, 5);
        // Create geometry
        var geometry = new clay.geometry.Cube();
        geometry.generateTangents();
        
        var shader = clay.shader.library.get('clay.standard', 'diffuseMap');
        var material = new clay.Material({
            shader: shader
        })
        this._mesh = app.createMesh(geometry, material);
        var diffuse = new clay.Texture2D;
        diffuse.load("../../assets/A/k/w/j/AkwjW.jpg");
        material.set('diffuseMap', diffuse);
        
        app.createAmbientLight("#fff", 1.0);
    },
    loop: function () {
        this._mesh.rotation.rotateX(Math.PI/300);
        this._mesh.rotation.rotateY(Math.PI/300);
    }
});