// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/6Cd9
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/WltV
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）" http://jsdo.it/cx20/KVOj
// forked from cx20's "[WebGL] QTEK を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var colors = [
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [0.0, 0.0, 1.0, 1.0], // Left face
    [0.0, 0.0, 1.0, 1.0], // Left face
    [0.0, 0.0, 1.0, 1.0], // Left face
    [0.0, 0.0, 1.0, 1.0]  // Left face
];

var app = clay.application.create('#main', {
    init: function (app) {
        // Create a orthographic camera
        var camera = app.createCamera(null, null, 'perspective');
        camera.position.set(0, 0, 5);
        // Create geometry
        var geometry = new clay.geometry.Cube();
        geometry.generateTangents();
        geometry.attributes.color.fromArray(colors);
        this._mesh = app.createMesh(geometry, {
            // Use basic shader that only show color
            shader: 'clay.basic'
        });
        // Enable vertex color in both vertex and fragment shader.
        this._mesh.material.define('both', 'VERTEX_COLOR');
    },
    loop: function () {
        this._mesh.rotation.rotateX(Math.PI/300);
        this._mesh.rotation.rotateY(Math.PI/300);
    }
});