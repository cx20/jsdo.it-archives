// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/6Hqp
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/aoCy
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その１３）（調整中）" http://jsdo.it/cx20/aO8b
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その１２）（調整中）" http://jsdo.it/cx20/O0B3
// forked from cx20's "[WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その１１）（調整中）" http://jsdo.it/cx20/6KEi
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

//var url = "https://cdn.rawgit.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb";
//var url = "https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb";
//var url = "https://cdn.rawgit.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb";
var url = "https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb";
var scale = 20.0;

var app = clay.application.create('#main', {
    graphic: {
        shadow: true
    },

    init: function (app) {
        // Create camera
        //this._camera = app.createCamera([0, 10, 10], [0, 0, 0]);
        this._camera = app.createCamera([0, 3, 5], [0, 0, 0]);

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

        // Load specified model. return a load promise to make sure the look will be start after model loaded.
        return app.loadModel(url).then((function (result) {
            this._gltfModel = result.rootNode;
            this._gltfModel.position.set(0.0, 0.0, 0);
            this._gltfModel.scale.set(scale, scale, scale);
        }).bind(this));
    },
    loop: function (app) {
        //this._control.autoRotate = true;
        this._control.autoRotate = false;
        this._control.update(app.frameTime);
    }
});

window.onresize = function () {
    app.resize()
};
