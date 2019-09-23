// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/suPw
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/qKm5
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その８）（調整中）" http://jsdo.it/cx20/Eblx
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その７）（調整中）" http://jsdo.it/cx20/ogoH
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その６）（調整中）" http://jsdo.it/cx20/4GIJ
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その５）（調整中）" http://jsdo.it/cx20/2xCG
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その４）" http://jsdo.it/cx20/mz7B
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その３）" http://jsdo.it/cx20/mPEP
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その２）" http://jsdo.it/cx20/iuML
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト" http://jsdo.it/cx20/8NE5
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その４）" http://jsdo.it/cx20/g28w
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その３）" http://jsdo.it/cx20/czeo
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）（その２）" http://jsdo.it/cx20/6Cd9
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（組み込み関数編）" http://jsdo.it/cx20/WltV
// forked from cx20's "[WebGL] ClayGL を試してみるテスト（VBO編）" http://jsdo.it/cx20/KVOj
// forked from cx20's "[WebGL] QTEK を試してみるテスト（VBO編）" http://jsdo.it/cx20/ICwE
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

//var url = "https://cdn.rawgit.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
//var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
//var url = "https://cdn.rawgit.com/cx20/jsdo-static-contents/76dfc928/models/gltf/2.0/EmaSimpleSkin_blender/glTF/EmaSimpleSkin_blender.gltf";
//var url = "https://cdn.rawgit.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf";
//var url = "http://jsrun.it/assets/U/j/F/1/UjF1i";
//var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
//var url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
//var url = "https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf";
//var url = "https://cdn.rawgit.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/scene.gltf";
//var url = "https://cdn.rawgit.com/mrdoob/rome-gltf/784089b4/files/models/life_soup/quadruped_fox.gltf";
var url = "https://cdn.rawgit.com/pissang/claygl/c4f45119/example/assets/models/SambaDancing/SambaDancing.gltf";

var app = clay.application.create('#main', {
    graphic: {
        shadow: true
    },

    init: function (app) {
        // Create camera
        this._camera = app.createCamera([0, 50, 400], [0, 100, 0]);

        // Create light
        //app.createDirectionalLight([1, 1, 1]);
        app.createDirectionalLight([-1, -1, -1]);
        app.createAmbientLight("#fff", 0.5);

        // Use orbit control
        this._control = new clay.plugin.OrbitControl({
            // The target or orbit control. Usually is a camera.
            target: this._camera,
            // The HTMLDomElement where we need to addEventListener.
            domElement: app.container,
        });
        this._control.autoRotateSpeed = 20;

        // Create a room.
        var cube = app.createCube({
            roughness: 1,
            color: [0.3, 0.3, 0.3]
        });
        // Cube not cast shadow to reduce the bounding box of scene and increse the shadow resolution.
        cube.castShadow = false;
        cube.scale.set(400, 5, 400);
        cube.position.y = -5;

        // Load specified model. return a load promise to make sure the look will be start after model loaded.
        return app.loadModel(url).then((function (result) {
            this._gltfModel = result.rootNode;
        }).bind(this));
    },
    loop: function (app) {
        this._control.autoRotate = true;
        this._control.update(app.frameTime);
    }
});

window.onresize = function () {
    app.resize()
};
