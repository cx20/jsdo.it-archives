// forked from cx20's "[WebGL] xeogl を試してみるテスト（その４）" http://jsdo.it/cx20/WlfJ
// forked from cx20's "[WebGL] xeogl を試してみるテスト（その３）" http://jsdo.it/cx20/W5Mu
// forked from cx20's "[WebGL] xeogl を試してみるテスト（その２）" http://jsdo.it/cx20/syca
// forked from cx20's "[WebGL] xeogl を試してみるテスト" http://jsdo.it/cx20/A7bW
// forked from cx20's "[WebGL] xeoEngine を試してみるテスト" http://jsdo.it/cx20/MKkV
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var geometry = new xeogl.BoxGeometry({
    xSize: 1,
    ySize: 1,
    zSize: 1
});

var material = new xeogl.PhongMaterial({
    //diffuse: [0.0, 0.0, 1.0]
    //diffuseMap: new xeogl.Texture({src:"/assets/A/k/w/j/AkwjW.jpg"}) // frog.jpg
    diffuseMap: new xeogl.Texture({src:"../../assets/0/C/Q/t/0CQtN.png"}) // test2.png
});

var mesh = new xeogl.Mesh({
    geometry: geometry,
    material: material
});

mesh.scene.camera.view.eye = [0.0, 0.0, 5.0];

mesh.scene.on("tick", function () {
    mesh.scene.camera.orbitYaw(1.0);
    mesh.scene.camera.orbitPitch(1.0);
});
