// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その２０）（調整中）" http://jsdo.it/cx20/i6aB
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１９）（調整中）" http://jsdo.it/cx20/KRPsI
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１８）（調整中）" http://jsdo.it/cx20/sOAI
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１７）（調整中）" http://jsdo.it/cx20/KYD4
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１６）（調整中）" http://jsdo.it/cx20/oVSn
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１５）（調整中）" http://jsdo.it/cx20/Sqzq
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１４）（調整中）" http://jsdo.it/cx20/ETNa
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１３）（調整中）" http://jsdo.it/cx20/YGu9
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１１）（調整中）" http://jsdo.it/cx20/o8ny
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１１）" http://jsdo.it/cx20/weSF
// forked from cx20's "[WebGL] Ashes で glTF 2.0形式のデータを表示してみるテスト（その１０）（調整中）" http://jsdo.it/cx20/c2TU
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

//let { Asset, EntityMgr, Camera, vec3, quat, Screen, OrbitControl, MeshRenderer, Filter, Shader, Material, QuadMesh } = Ashes;
let { Asset, EntityMgr, System, ComponentSystem, Camera, vec3, mat4, quat, Screen, OrbitControl, MeshRenderer, Shader, Material, Mesh, Accessor, bufferView } = Ashes;

let CDN = 'https://but0n.github.io/Ashes/'
Material.SHADER_PATH = CDN + Material.SHADER_PATH;

let scale = 0.01;

//let gltf = 'https://cx20.github.io/gltf-test/tutorialModels/Triangle/glTF/Triangle.gltf';
//let gltf = 'https://rawcdn.githack.com/cx20/gltf-test/a9cda755ff1c6656c5b3797b8747153e9e630947/tutorialModels/TextureSettingsTest/glTF/TextureSettingsTest.gltf';
//let gltf = 'https://cdn.rawgit.com/cx20/jsdo-static-contents/c51a03cbff72037e33aa2cc0b7fe7cac4e4bdea8/models/gltf/2.0/EmaSimpleSkin/glTF/EmaSimpleSkin.gltf'; // COLLADA2GLTF 変換結果
//let gltf = 'https://cdn.rawgit.com/cx20/gltf-test/9fb5f39992bdd548e17fb18b256c41b14fb8840e/sampleModels/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf';
//let gltf = 'https://cdn.rawgit.com/cx20/jsdo-static-contents/94bb7090/models/gltf/2.0/VoxelCorgi/glTF_merge/VoxelCorgi.gltf';
//let gltf = 'https://cdn.rawgit.com/KhronosGroup/glTF-Sample-Models/c89c1709fbfd67a11aa7e540ab4ecb795763b627/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf';
//let gltf = 'https://raw.githubusercontent.com/shrekshao/minimal-gltf-loader/store-drone-model/glTFs/glTF_version_2/buster_drone/scene.gltf';
//let gltf = 'https://cdn.rawgit.com/KhronosGroup/glTF-Blender-Exporter/0e23c773bf27dad67d2c25f060370d6fa012d87d/polly/project_polly.gltf';
//let gltf = 'https://cdn.rawgit.com/cx20/jsdo-static-contents/8a3e977a/models/gltf/2.0/BearOnBalloons/scene.gltf';
//let gltf = 'https://cdn.rawgit.com/mrdoob/rome-gltf/784089b4/files/models/life_soup/quadruped_fox.gltf';
//let gltf = 'https://cdn.rawgit.com/pissang/claygl/c4f45119/example/assets/models/SambaDancing/SambaDancing.gltf';
//let gltf = 'https://cdn.rawgit.com/cx20/gltf-test/e63efa65/tutorialModels/FlightHelmet/glTF/FlightHelmet.gltf';
//let gltf = 'https://cdn.rawgit.com/ft-lab/ft-lab.github.io/c56ef016/gltf/grass/rocks_trees_ao.glb';
//let gltf = 'https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/PrimaryIonDrive.glb';
//let gltf = 'https://rawcdn.githack.com/mrdoob/three.js/dev/examples/models/gltf/LittlestTokyo.glb';
//let gltf = 'https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_05.glb';
//let gltf = 'https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_10.glb';
//let gltf = 'https://ft-lab.github.io/gltf/yunomi/Yunomi_normal_20.glb';
//let gltf = 'https://cdn.rawgit.com/bghgary/glTF-Asset-Generator/a66119b3/Output/Material/Material_07.gltf';
//let gltf = 'https://rawcdn.githack.com/mrdoob/three.js/r97/examples/models/gltf/BotSkinned/glTF-MaterialsUnlit/Bot_Skinned.gltf';
//let gltf = 'https://cdn.rawgit.com/cx20/gltf-test/7af4f399/tutorialModels/SpecGlossVsMetalRough/glTF/SpecGlossVsMetalRough.gltf';
//let gltf = 'https://cdn.rawgit.com/cx20/jsdo-static-contents/33ab7250/models/gltf/2.0/Itokawa/glTF-Draco/Itokawa.glb';
let gltf = 'https://rawcdn.githack.com/BabylonJS/Exporters/9bc140006be149687be045f60b4a25cdb45ce4fc/Maya/Samples/glTF 2.0/T-Rex/trex_running.gltf';

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

    let entity1 = scene.appendChild(EntityMgr.create('entity1'));
    EntityMgr.addComponent(entity1, root);
    vec3.set(entity1.components.Transform.translate, 0.0, -2.5, 0);
    EntityMgr.addComponent(entity1, new RotateComponent(true));
    
    scene.appendChild(gltfroot);

}

class RotateComponent {
    angle = 0;
    useQuaternion = false;
    constructor(useQuaternion = false) {
        this.useQuaternion = useQuaternion;
    }
}

class RotateSystem extends ComponentSystem {
    group = [];
    depends = [
        RotateComponent.name,
    ];
    onUpdate() {
        for(let {components} of this.group) {
            let rotateComp = components.RotateComponent;
            let trans = components.Transform;
            if ( rotateComp.useQuaternion ) {
                // use quaternion
                //quat.rotateX(trans.quaternion, trans.quaternion, 0.01);
                quat.rotateY(trans.quaternion, trans.quaternion, 0.01);
                //quat.rotateZ(trans.quaternion, trans.quaternion, 0.01);
            } else {
                // use euler
                rotateComp.angle++;
                quat.fromEuler(trans.quaternion, rotateComp.angle, rotateComp.angle, rotateComp.angle);
            }
        }
    };
}

System.registSystem(new RotateSystem());

main();
