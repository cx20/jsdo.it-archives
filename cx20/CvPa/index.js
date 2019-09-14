// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その９）（調整中）" http://jsdo.it/cx20/wPO4
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その８）" http://jsdo.it/cx20/q0Sv
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その７）" http://jsdo.it/cx20/e9nK
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その６）" http://jsdo.it/cx20/iXfF
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その５）（調整中）" http://jsdo.it/cx20/YY6E
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その４）" http://jsdo.it/cx20/0TWC
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その３）（調整中）" http://jsdo.it/cx20/kSsC
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その２）" http://jsdo.it/cx20/oTeI
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト" http://jsdo.it/cx20/QTUX
// forked from cx20's "[WebGL] Ashes を試してみるテスト（その４）" http://jsdo.it/cx20/wp46
// forked from cx20's "[WebGL] Ashes を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/GCxHp
// forked from cx20's "[WebGL] Ashes を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/uJua
// forked from cx20's "[WebGL] Ashes を試してみるテスト（調整中）" http://jsdo.it/cx20/uG69
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

let { Asset, EntityMgr, Camera, vec3, quat, Screen, OrbitControl, MeshRenderer, Filter, Shader, Material, QuadMesh } = Ashes;

let CDN = 'https://but0n.github.io/Ashes/'
Material.SHADER_PATH = CDN + Material.SHADER_PATH;

let scale = 0.5;

//let gltf = 'https://cx20.github.io/gltf-test/tutorialModels/Triangle/glTF/Triangle.gltf';
//let gltf = 'https://rawcdn.githack.com/cx20/gltf-test/a9cda755ff1c6656c5b3797b8747153e9e630947/tutorialModels/TextureSettingsTest/glTF/TextureSettingsTest.gltf';
//let gltf = 'https://cdn.rawgit.com/cx20/jsdo-static-contents/c51a03cbff72037e33aa2cc0b7fe7cac4e4bdea8/models/gltf/2.0/EmaSimpleSkin/glTF/EmaSimpleSkin.gltf'; // COLLADA2GLTF 変換結果
//let gltf = 'https://cdn.rawgit.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf';
//let gltf = 'https://cdn.rawgit.com/cx20/jsdo-static-contents/94bb7090/models/gltf/2.0/VoxelCorgi/glTF_merge/VoxelCorgi.gltf';
//let gltf = 'https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf';
//let gltf = 'https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf';
//let gltf = 'https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf';
let gltf = 'https://cdn.rawgit.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/scene.gltf';

async function main() {

    let screen = new Screen('#screen');

    screen.bgColor = [0.5, 0.5, 0.5, 1.0];


    let skybox = await Asset.loadCubemap(CDN + 'res/envmap/GoldenGateBridge2/');

    let scene = EntityMgr.create('root - (Click each bar which has yellow border to toggle visible)');

    // Camera
    let mainCamera = EntityMgr.create('camera');
    let cam = EntityMgr.addComponent(mainCamera, new Camera(screen.width / screen.height));

    // Set default position
    let cameraTrans = mainCamera.components.Transform;
    vec3.set(cameraTrans.translate, 0, 0, 5);

    // Add it to scene
    scene.appendChild(mainCamera);

    // Attach controler
    EntityMgr.addComponent(mainCamera, new OrbitControl(screen, mainCamera));

    document.querySelector('body').appendChild(scene);

    // Load a gltf model
    let gltfroot = await Asset.loadGLTF(gltf, screen, skybox);

    let root = gltfroot.components.Transform;
    vec3.scale(root.scale, root.scale, scale);
    
    scene.appendChild(gltfroot);

}

main();
