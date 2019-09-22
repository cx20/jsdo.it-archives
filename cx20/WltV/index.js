// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）" http://jsdo.it/cx20/KVOj
// forked from cx20's "[WebGL] QTEK を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var positions = [
    [-0.5, -0.5, 0.0],
    [ 0.5, -0.5, 0.0],
    [ 0.0,  0.5, 0.0]
];

var app = clay.application.create('#main', {
    init: function (app) {
        // Create a orthographic camera
        var camera = app.createCamera(null, null, 'orthographic');
        // Create a empty geometry and set the triangle vertices
        var geometry = new clay.StaticGeometry();
        geometry.attributes.position.fromArray(positions);

        var mesh = app.createMesh(geometry, {
            // Use basic shader that only show color
            shader: 'clay.basic'
        });
        mesh.material.set('color', 'blue');
    },

    loop: function () {}
});