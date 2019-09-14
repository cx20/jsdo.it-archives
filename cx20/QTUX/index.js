// forked from cx20's "[WebGL] Ashes を試してみるテスト（その４）" http://jsdo.it/cx20/wp46
// forked from cx20's "[WebGL] Ashes を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/GCxHp
// forked from cx20's "[WebGL] Ashes を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/uJua
// forked from cx20's "[WebGL] Ashes を試してみるテスト（調整中）" http://jsdo.it/cx20/uG69
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

let { Asset, EntityMgr, Camera, vec3, quat, Screen, OrbitControl, MeshRenderer, Filter, Shader, Material, QuadMesh } = Ashes;

let CDN = 'https://but0n.github.io/Ashes/'
Material.SHADER_PATH = CDN + Material.SHADER_PATH;


// DamagedHelmet
//let gltf = CDN + 'gltfsamples/DamagedHelmet.glb';
let gltf = 'https://cx20.github.io/gltf-test/tutorialModels/Triangle/glTF/Triangle.gltf';

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
    scene.appendChild(gltfroot);

}

main();
