// forked from cx20's "[WebVR] A-Frame で WebVR を試してみるテスト（その３）（調整中）" http://jsdo.it/cx20/0ZUL
// forked from cx20's "[WebVR] A-Frame で WebVR を試してみるテスト（その２）（調整中）" http://jsdo.it/cx20/yzbu
// forked from cx20's "[WebVR] A-Frame で WebVR を試してみるテスト（調整中）" http://jsdo.it/cx20/6X3S
// forked from cx20's "[WebGL] A-Frame を試してみるテスト（その４）" http://jsdo.it/cx20/k7B2
// forked from cx20's "[WebGL] A-Frame を試してみるテスト（その３）" http://jsdo.it/cx20/qgOl
// forked from cx20's "[WebGL] A-Frame を試してみるテスト（その２）" http://jsdo.it/cx20/OclK
// forked from cx20's "[WebGL] A-Frame を試してみるテスト" http://jsdo.it/cx20/AOwl
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

const dataSet = [
    {id:"#basketball-texture", imageFile:"../../assets/3/O/Z/o/3OZoF.jpg", scale:1.0}, // Basketball.jpg
    {id:"#beachBall-texture",  imageFile:"../../assets/2/y/4/W/2y4Wl.jpg", scale:0.9}, // BeachBall.jpg
    {id:"#football-texture",   imageFile:"../../assets/r/x/X/q/rxXqY.jpg", scale:1.0}, // Football.jpg
    {id:"#softball-texture",   imageFile:"../../assets/i/M/6/F/iM6FW.jpg", scale:0.3}, // Softball.jpg
    {id:"#tennisBall-texture", imageFile:"../../assets/f/M/F/x/fMFxB.jpg", scale:0.3}, // TennisBall.jpg
];

let scene = document.querySelector("a-scene");
let meshes = [];
const max = 200;

for ( let i = 0; i < max; i++ ) {
    let x = -50/100 + Math.random();
    let y = 200/100 + Math.random();
    let z = -50/100 + Math.random() - 2;
    
    let mesh = document.createElement("a-sphere");
    let pos = Math.floor(Math.random() * dataSet.length);
    let item = dataSet[pos];
    let id = item.id;
    let scale = item.scale;
    
    mesh.setAttribute("position", `${x} ${y} ${z}`);
    mesh.setAttribute("dynamic-body", "");
    mesh.setAttribute("radius", 0.1 * scale);
    mesh.setAttribute("material", `src: ${id};`);
    
    meshes.push(mesh);
    scene.appendChild(mesh);
}

let t = 0;
function render() {
    t += 0.01;
    requestAnimationFrame(render);

    for ( let i = 0; i < max; i++ ) {
        let mesh = meshes[i];
        let position = mesh.getAttribute("position");
        
        if (position.y < -1) {
            let x = -50/100 + Math.random();
            let y = 200/100 + Math.random();
            let z = -50/100 + Math.random() - 2;
            mesh.body.position.set(x, y, z);
            mesh.body.velocity.set(0, 0, 0);
        }
    }
}

render();

