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

//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-WebGL-PBR/817404a4/models/Triangle/glTF/Triangle.gltf";
//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/7268f989/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf";
//var url = "https://rawcdn.githack.com/cx20/jsdo-static-contents/76dfc928/models/gltf/2.0/EmaSimpleSkin_blender/glTF/EmaSimpleSkin_blender.gltf";
//var url = "https://rawcdn.githack.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf";
//var url = "http://jsrun.it/assets/U/j/F/1/UjF1i";
//var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf";
//var url = "https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf";
var url = "https://rawcdn.githack.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf";

var app = clay.application.create('#main', {
    graphic: {
        // Enable shadow
        shadow: true,
        //tonemapping: true,
        linear: true
    },
    init: function (app) {
        // Create camera
/*
        this._camera = app.createCamera([0, 0.5, 2], [0, 0, 0]);
*/
        // Create light
        //app.createDirectionalLight([1, 1, 1]);
        app.createDirectionalLight([-1, -1, -1]);
        app.createAmbientLight("#fff", 1.0);

/*
        // Skybox need a cubemap texture.
        app.loadTextureCube({
            px: '../../assets/j/r/q/8/jrq8Z.jpg',    // px.jpg
            nx: '../../assets/b/A/n/h/bAnhv.jpg',    // nx.jpg
            py: '../../assets/k/F/t/6/kFt6K.jpg',    // py.jpg
            ny: '../../assets/l/6/9/p/l69pi.jpg',    // ny.jpg
            pz: '../../assets/k/2/t/g/k2tgI.jpg',    // pz.jpg
            nz: '../../assets/l/O/u/H/lOuHI.jpg'     // nz.jpg
        }).then(function (cubemap) {
            var skybox = new clay.plugin.Skybox({
                // Attach skybox to the scene.
                scene: app.scene,
                // Use the cubemap as environment
                environmentMap: cubemap
            });
        });
*/
        // pisa.hdr
        //app.createAmbientCubemapLight('http://jsrun.it/assets/w/O/a/o/wOaoO', 1, 0.3, 1).then(function (result) {
        // uffizi-large.hdr
        app.createAmbientCubemapLight('http://examples.claygl.xyz/assets/textures/hdr/uffizi-large.hdr', 1, 0.3, 1).then(function (result) {
            var skybox = new clay.plugin.Skybox({
                scene: app.scene,
                environmentMap: result.specular.cubemap
            });
            // Use high lod to show the `rough` skybox
            skybox.material.set('lod', 3);
        });
        // Load specified model. return a load promise to make sure the look will be start after model loaded.
        return app.loadModel(url).then((function (result) {
            this._gltfModel = result.rootNode;
            app.scene.setMainCamera(result.cameras[1]);
        }).bind(this));
    },
    loop: function (app) {
    }
});

window.onresize = function () {
    app.resize()
};
