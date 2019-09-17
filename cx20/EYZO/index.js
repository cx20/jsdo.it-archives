// forked from cx20's "Babylon.js で３次元リサージュ図形を描いてみるテスト" http://jsdo.it/cx20/vMor
// forked from cx20's "Babylon.js でリサージュ図形を描いてみるテスト" http://jsdo.it/cx20/3WmL
// forked from cx20's "Babylon.js v2.0 を試してみるテスト" http://jsdo.it/cx20/whLL
// forked from cx20's "Babylon.js で立方体を表示するテスト" http://jsdo.it/cx20/fdPS

let MAX = 360;
let R = 100;

let alpha = Math.PI/4;
let beta  = Math.PI/3;
let gamma = 0; // Math.PI/2;

let theta = 0.0;
let mesh;

let A1 = 50, f1 = 2, p1 = 1/16, d1 = 0.02;
let A2 = 50, f2 = 2, p2 = 3 / 2, d2 = 0.0315;
let A3 = 50, f3 = 2, p3 = 13 / 15, d3 = 0.02;
let A4 = 50, f4 = 2, p4 = 1, d4 = 0.02;

let createScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -300), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let positions = [];
    let colors = [];
    let indices = [];
    let idx = 0;
    let color = new BABYLON.Color4(0, 0, 0, 1);
    for ( let t = 0; t <= 200; t += 0.01 ) {
        positions.push(0, 0, 0);
        BABYLON.ColorCurves.fromHSBToRef((t/200 * 360 | 0), 80, 50, color);
        colors.push(color.r, color.g, color.b, 1);
        indices.push(idx++);
    }

    let mesh = new BABYLON.Mesh("mesh", scene);
    let vertexData = new BABYLON.VertexData();
    
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.colors = colors;
    
    vertexData.applyToMesh(mesh, true); // Mesh を更新可能として作成する

    let material = new BABYLON.ShaderMaterial("material", scene, {
        vertexElement: "vs",
        fragmentElement: "fs",
    }, {
        attributes: ["position", "color"],
        uniforms: ["worldViewProjection"]
    });
    material.fillMode = BABYLON.Material.LineStripDrawMode;
    mesh.material = material;
    mesh.material.backFaceCulling = false;
    
    scene.registerBeforeRender(function () {
        randomHarmonograph();
    });
                         
    function randomHarmonograph() {
        f1 = (f1 + Math.random() / 40) % 10;
        f2 = (f2 + Math.random() / 40) % 10;
        f3 = (f3 + Math.random() / 40) % 10;
        f4 = (f4 + Math.random() / 40) % 10;
        p1 += (Math.PI*2 * 0.5 / 360);
        
        drawHarmonograph();
    }
    
    function drawHarmonograph()
    {
        let positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        for (let i = 0; i < positions.length; i += 3) {
            let t = i / 200;
            let x = A1 * Math.sin(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.sin(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
            let y = A3 * Math.sin(f3 * t + Math.PI * p3) * Math.exp(-d3 * t) + A4 * Math.sin(f4 * t + Math.PI * p4) * Math.exp(-d4 * t);
            let z = A1 * Math.cos(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.cos(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
    
            positions[i+0] = x;
            positions[i+1] = y;
            positions[i+2] = z;
        }
        //mesh.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
        mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);  // updateVerticesData() を使用する場合は Mesh を更新可能に設定する必要がある
    }
    
    return scene;
};

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = createScene( engine );

engine.runRenderLoop(function () {
    scene.render();
});
