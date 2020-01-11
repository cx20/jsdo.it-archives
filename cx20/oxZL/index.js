// forked from cx20's "three.js で glTF 形式のデータを表示してみるテスト（その１）" http://jsdo.it/cx20/2qm8N
// forked from cx20's "three.js で OBJ 形式のデータを表示してみるテスト（その１）" http://jsdo.it/cx20/wGMY
// forked from cx20's "three.js で Blender のデータを表示してみるテスト" http://jsdo.it/cx20/2CXI
// forked from 【WebGL特集】第4回：Blenderでモデル出力 http://mox-motion.com/blog/webgl04-2/

init();

function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
    });
    renderer.setSize(width, height);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 500);

    const controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -2.0;

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);

    const duckGeometry = new THREE.Geometry();
    const loader = new THREE.GLTFLoader();
    const url = "https://rawcdn.githack.com/cx20/gltf-test/be9c59a9/sampleModels/Duck/glTF/Duck.gltf";
    loader.load(url, (object) => {
        if (object) {
            let duckVerticesArray = object.scene.children[0].children[0].geometry.attributes.position.array;
            for (let i = 0; i < duckVerticesArray.length; i += 3) {
                duckGeometry.vertices.push(new THREE.Vector3(
                    duckVerticesArray[i + 0],
                    duckVerticesArray[i + 1],
                    duckVerticesArray[i + 2],
                ));
            }
        }
    });

    const SIZE = 5000;
    const LENGTH = 80000;
    const geometry = new THREE.Geometry();
    for (let i = 0; i < LENGTH; i++) {
        geometry.vertices.push(new THREE.Vector3(
            SIZE * (Math.random() - 0.5),
            SIZE * (Math.random() - 0.5),
            SIZE * (Math.random() - 0.5),
        ));
    }
    const material = new THREE.PointsMaterial({
        size: 5,
        color: 0x0eff7d,
        map: new THREE.TextureLoader().load('../../assets/A/M/5/s/AM5sP.png'), // snow.png
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
    });
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
                
    setTimeout(function() {
        for (let i = 0; i < duckGeometry.vertices.length; i++) {
            TweenMax.to(geometry.vertices[i], 1, {
                x: duckGeometry.vertices[i].x,
                y: duckGeometry.vertices[i].y,
                z: duckGeometry.vertices[i].z,
            }, 0);
        }
    }, 1000);

    animate();

    function animate() {
        controls.update();
        render();
        requestAnimationFrame(animate);
    }
    
    function render() {
        geometry.verticesNeedUpdate = true;
        renderer.render(scene, camera);
    }
}

