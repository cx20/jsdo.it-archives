// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/WltV
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）" http://jsdo.it/cx20/KVOj
// forked from cx20's "[WebGL] QTEK を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var app = clay.application.create('#main', {
    init: function (app) {
        // Create a orthographic camera
        var camera = app.createCamera(null, null, 'perspective');
        camera.position.set(0, 0, 4);
        // Create geometry
        var geometry = new clay.geometry.Plane();
        geometry.generateTangents();
        geometry.attributes.color.fromArray([
            [1.0, 0.0, 0.0, 1.0], // v0
            [0.0, 1.0, 0.0, 1.0], // v1
            [0.0, 0.0, 1.0, 1.0], // v2
            [1.0, 1.0, 0.0, 1.0]  // v3
        ]);
        var mesh = app.createMesh(geometry, {
            // Use basic shader that only show color
            shader: 'clay.basic'
        });
        // Enable vertex color in both vertex and fragment shader.
        mesh.material.define('both', 'VERTEX_COLOR');
    },

    loop: function () {}
});

window.onresize = function () {
    app.resize()
};
