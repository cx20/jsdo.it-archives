const triangleComputeShader = /* wgsl */`
struct Params {
    progress: f32,
    time: f32,
    triangleCount: u32,
    rotationSpeed: f32,
}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> triangleData: array<f32>;
@group(0) @binding(2) var<storage, read_write> outputPositions: array<f32>;
@group(0) @binding(3) var<storage, read_write> outputColors: array<f32>;

const PI: f32 = 3.14159265359;

fn easeOutElastic(x: f32) -> f32 {
    let c4 = (2.0 * PI) / 3.0;
    if (x <= 0.0) { return 0.0; }
    if (x >= 1.0) { return 1.0; }
    return pow(2.0, -10.0 * x) * sin((x * 10.0 - 0.75) * c4) + 1.0;
}

fn rotatePoint(p: vec3<f32>, angles: vec3<f32>) -> vec3<f32> {
    let cx = cos(angles.x); let sx = sin(angles.x);
    let cy = cos(angles.y); let sy = sin(angles.y);
    let cz = cos(angles.z); let sz = sin(angles.z);
    
    var r = vec3<f32>(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
    r = vec3<f32>(r.x * cy + r.z * sy, r.y, -r.x * sy + r.z * cy);
    r = vec3<f32>(r.x * cz - r.y * sz, r.x * sz + r.y * cz, r.z);
    return r;
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let triIdx = gid.x;
    if (triIdx >= params.triangleCount) { return; }
    
    // STRIDE = 32: 9 pos + 6 start/rot + 9 colors + 2 delay/speed + 6 padding
    let offset = triIdx * 32u;
    
    let targetV0 = vec3<f32>(triangleData[offset], triangleData[offset+1u], triangleData[offset+2u]);
    let targetV1 = vec3<f32>(triangleData[offset+3u], triangleData[offset+4u], triangleData[offset+5u]);
    let targetV2 = vec3<f32>(triangleData[offset+6u], triangleData[offset+7u], triangleData[offset+8u]);
    let startCenter = vec3<f32>(triangleData[offset+9u], triangleData[offset+10u], triangleData[offset+11u]);
    let startRotation = vec3<f32>(triangleData[offset+12u], triangleData[offset+13u], triangleData[offset+14u]);
    
    let color0 = vec3<f32>(triangleData[offset+15u], triangleData[offset+16u], triangleData[offset+17u]);
    let color1 = vec3<f32>(triangleData[offset+18u], triangleData[offset+19u], triangleData[offset+20u]);
    let color2 = vec3<f32>(triangleData[offset+21u], triangleData[offset+22u], triangleData[offset+23u]);
    
    let delay = triangleData[offset+24u];
    let speed = triangleData[offset+25u];
    
    let targetCenter = (targetV0 + targetV1 + targetV2) / 3.0;
    let localV0 = targetV0 - targetCenter;
    let localV1 = targetV1 - targetCenter;
    let localV2 = targetV2 - targetCenter;
    
    var rawProgress = clamp((params.progress - delay) * speed, 0.0, 1.0);
    let easedProgress = easeOutElastic(rawProgress);
    
    let currentCenter = mix(startCenter, targetCenter, easedProgress);
    let rotAmount = (1.0 - easedProgress) * params.rotationSpeed;
    let timeRot = vec3<f32>(params.time * 1.5, params.time * 2.0, params.time) * (1.0 - easedProgress);
    let currentRot = startRotation * rotAmount + timeRot;
    let scale = 0.3 + 0.7 * easedProgress;
    
    let v0 = rotatePoint(localV0 * scale, currentRot) + currentCenter;
    let v1 = rotatePoint(localV1 * scale, currentRot) + currentCenter;
    let v2 = rotatePoint(localV2 * scale, currentRot) + currentCenter;
    
    let posOut = triIdx * 9u;
    outputPositions[posOut] = v0.x;
    outputPositions[posOut+1u] = v0.y;
    outputPositions[posOut+2u] = v0.z;
    outputPositions[posOut+3u] = v1.x;
    outputPositions[posOut+4u] = v1.y;
    outputPositions[posOut+5u] = v1.z;
    outputPositions[posOut+6u] = v2.x;
    outputPositions[posOut+7u] = v2.y;
    outputPositions[posOut+8u] = v2.z;
    
    let sparkle = sin(params.time * 10.0 + f32(triIdx) * 0.1) * 0.15 * (1.0 - easedProgress);
    
    let colOut = triIdx * 12u;
    outputColors[colOut] = clamp(color0.x + sparkle, 0.0, 1.0);
    outputColors[colOut + 1u] = clamp(color0.y + sparkle, 0.0, 1.0);
    outputColors[colOut + 2u] = clamp(color0.z + sparkle, 0.0, 1.0);
    outputColors[colOut + 3u] = 1.0;
    outputColors[colOut + 4u] = clamp(color1.x + sparkle, 0.0, 1.0);
    outputColors[colOut + 5u] = clamp(color1.y + sparkle, 0.0, 1.0);
    outputColors[colOut + 6u] = clamp(color1.z + sparkle, 0.0, 1.0);
    outputColors[colOut + 7u] = 1.0;
    outputColors[colOut + 8u] = clamp(color2.x + sparkle, 0.0, 1.0);
    outputColors[colOut + 9u] = clamp(color2.y + sparkle, 0.0, 1.0);
    outputColors[colOut + 10u] = clamp(color2.z + sparkle, 0.0, 1.0);
    outputColors[colOut + 11u] = 1.0;
}
`;

// 馬のVoxelデータ（16×16×4）
var dataSet = [
    [
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","茶","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","茶","--","--","--","--","茶","--","--","--","--","--",
    "--","--","--","--","--","茶","茶","--","--","茶","茶","茶","--","--","--","--",
    "--","--","--","--","--","--","茶","茶","茶","茶","茶","茶","--","--","--","--",
    "--","--","--","--","--","茶","茶","茶","茶","茶","茶","茶","--","--","--","--",
    "--","--","--","--","茶","茶","茶","--","--","--","茶","茶","--","--","--","--",
    "--","--","--","茶","--","--","--","--","--","--","茶","茶","--","--","--","--",
    "--","--","茶","--","--","--","--","--","--","--","--","茶","--","茶","黒","--",
    "--","茶","--","--","--","--","--","--","--","--","--","茶","茶","茶","--","--",
    "黒","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--"
    ],
    [
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","茶","茶","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","茶","茶","黒","茶","--","--","--","--","--","--","--","--","--","--",
    "--","白","茶","茶","茶","茶","--","--","--","--","茶","茶","--","--","--","--",
    "--","白","白","--","茶","茶","茶","--","--","茶","茶","茶","茶","茶","--","--",
    "--","白","白","--","--","茶","茶","茶","茶","茶","茶","茶","茶","--","茶","--",
    "--","--","--","--","--","茶","茶","茶","茶","茶","茶","茶","--","--","茶","--",
    "--","--","--","--","茶","茶","茶","茶","茶","茶","茶","--","--","--","--","--",
    "--","--","--","茶","茶","茶","茶","茶","茶","茶","茶","--","--","--","--","--",
    "--","--","--","茶","--","--","--","--","--","--","--","茶","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","茶","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--"
    ],
    [
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","茶","茶","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","茶","茶","黒","茶","--","--","--","--","--","--","--","--","--","--",
    "--","白","茶","茶","茶","茶","--","--","--","--","茶","茶","--","茶","--","--",
    "--","白","白","--","茶","茶","茶","--","--","茶","茶","茶","茶","茶","茶","--",
    "--","白","白","--","--","茶","茶","茶","茶","茶","茶","茶","茶","--","茶","--",
    "--","--","--","--","--","茶","茶","茶","茶","茶","茶","茶","--","--","茶","--",
    "--","--","--","--","茶","茶","茶","茶","茶","茶","茶","茶","--","--","--","--",
    "--","--","--","茶","茶","茶","茶","茶","茶","茶","茶","茶","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","茶","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--"
    ],
    [
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","茶","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--",
    "--","--","--","--","--","茶","--","--","--","--","茶","--","--","--","--","--",
    "--","--","--","--","--","--","茶","--","--","茶","茶","茶","--","--","--","--",
    "--","--","--","--","--","--","茶","茶","茶","茶","茶","--","--","--","--","--",
    "--","--","--","--","--","茶","茶","茶","茶","茶","茶","--","--","--","--","--",
    "--","--","--","--","茶","茶","--","--","--","--","茶","茶","--","--","--","--",
    "--","--","--","茶","--","--","--","--","--","--","--","茶","--","--","--","--",
    "--","--","--","茶","--","--","--","--","--","--","--","茶","--","--","--","--",
    "--","--","--","--","茶","--","--","--","--","--","茶","--","--","--","--","--",
    "--","--","--","--","茶","黒","--","--","--","--","茶","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","黒","--","--","--","--","--","--",
    "--","--","--","--","--","--","--","--","--","--","--","--","--","--","--","--"
    ],
];

// 色の定義
var colors = {
    "茶": { r: 0.6, g: 0.3, b: 0.1 },
    "黒": { r: 0.1, g: 0.1, b: 0.1 },
    "白": { r: 0.95, g: 0.95, b: 0.95 }
};

async function init() {
    const canvas = document.querySelector("#renderCanvas");
    const engine = new BABYLON.WebGPUEngine(canvas);
    await engine.initAsync();

    var createScene = async function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.05);

        if (!engine.getCaps().supportComputeShaders) {
            console.error("Compute shaders not supported");
            var ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");
            var t = new BABYLON.GUI.TextBlock();
            t.text = "WebGPU required\nPlease set engine to 'webgpu'";
            t.color = "red";
            t.fontSize = 24;
            ui.addControl(t);
            return scene;
        }

        // Camera
        var camera = new BABYLON.ArcRotateCamera("cam", -Math.PI / 1.3, Math.PI / 2.5, 30, new BABYLON.Vector3(8, 8, 2), scene);
        camera.attachControl(canvas, true);
        camera.wheelDeltaPercentage = 0.01;

        // Skybox
        var cubeTexture = new BABYLON.CubeTexture(
            "https://rawcdn.githack.com/cx20/gltf-test/c479d543/textures/cube/skybox/",
            scene,
            ["px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg"]
        );
        scene.createDefaultSkybox(cubeTexture, true, 10000);

        // Lights
        new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
        var dirLight = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(-1, -2, -1), scene);
        dirLight.intensity = 0.5;

        // Voxelから三角形を生成
        // 各ボックスは6面×2三角形=12三角形
        var triangles = [];
        
        // ボックスの頂点オフセット（単位キューブ）
        var cubeVertices = [
            [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], // 前面
            [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]  // 後面
        ];
        
        // 各面の三角形（頂点インデックス）
        var cubeFaces = [
            // 前面 (Z-)
            [[0, 1, 2], [0, 2, 3]],
            // 後面 (Z+)
            [[5, 4, 7], [5, 7, 6]],
            // 上面 (Y+)
            [[3, 2, 6], [3, 6, 7]],
            // 下面 (Y-)
            [[4, 5, 1], [4, 1, 0]],
            // 右面 (X+)
            [[1, 5, 6], [1, 6, 2]],
            // 左面 (X-)
            [[4, 0, 3], [4, 3, 7]]
        ];

        // Voxelデータをパース
        for (var z = 0; z < dataSet.length; z++) {
            var slice = dataSet[z];
            for (var row = 0; row < 16; row++) {
                for (var col = 0; col < 16; col++) {
                    var index = row * 16 + col;
                    var cell = slice[index];
                    
                    if (cell !== "--" && colors[cell]) {
                        var x = col;
                        var y = 15 - row; // 上下反転
                        var color = colors[cell];
                        
                        // 各面の三角形を追加
                        for (var face = 0; face < cubeFaces.length; face++) {
                            for (var tri = 0; tri < 2; tri++) {
                                var indices = cubeFaces[face][tri];
                                var v0 = cubeVertices[indices[0]];
                                var v1 = cubeVertices[indices[1]];
                                var v2 = cubeVertices[indices[2]];
                                
                                triangles.push({
                                    v0: [x + v0[0], y + v0[1], z + v0[2]],
                                    v1: [x + v1[0], y + v1[1], z + v1[2]],
                                    v2: [x + v2[0], y + v2[1], z + v2[2]],
                                    color: color
                                });
                            }
                        }
                    }
                }
            }
        }

        var triangleCount = triangles.length;
        var vertexCount = triangleCount * 3;
        console.log("Triangles:", triangleCount, "Vertices:", vertexCount);

        // 三角形データを準備
        var STRIDE = 32;
        var triangleData = new Float32Array(triangleCount * STRIDE);
        var initialPositions = new Float32Array(vertexCount * 3);
        var initialColors = new Float32Array(vertexCount * 4);

        for (var i = 0; i < triangleCount; i++) {
            var tri = triangles[i];
            var off = i * STRIDE;

            // Target positions (0-8)
            triangleData[off + 0] = tri.v0[0];
            triangleData[off + 1] = tri.v0[1];
            triangleData[off + 2] = tri.v0[2];
            triangleData[off + 3] = tri.v1[0];
            triangleData[off + 4] = tri.v1[1];
            triangleData[off + 5] = tri.v1[2];
            triangleData[off + 6] = tri.v2[0];
            triangleData[off + 7] = tri.v2[1];
            triangleData[off + 8] = tri.v2[2];

            // Random start position (9-11)
            var theta = Math.random() * Math.PI * 2;
            var phi = Math.acos(2 * Math.random() - 1);
            var r = 20 + Math.random() * 15;
            var startX = 8 + r * Math.sin(phi) * Math.cos(theta);
            var startY = 8 + r * Math.sin(phi) * Math.sin(theta);
            var startZ = 2 + r * Math.cos(phi);

            triangleData[off + 9] = startX;
            triangleData[off + 10] = startY;
            triangleData[off + 11] = startZ;

            // Random rotation (12-14)
            triangleData[off + 12] = Math.random() * Math.PI * 2;
            triangleData[off + 13] = Math.random() * Math.PI * 2;
            triangleData[off + 14] = Math.random() * Math.PI * 2;

            // Colors (15-23)
            triangleData[off + 15] = tri.color.r;
            triangleData[off + 16] = tri.color.g;
            triangleData[off + 17] = tri.color.b;
            triangleData[off + 18] = tri.color.r;
            triangleData[off + 19] = tri.color.g;
            triangleData[off + 20] = tri.color.b;
            triangleData[off + 21] = tri.color.r;
            triangleData[off + 22] = tri.color.g;
            triangleData[off + 23] = tri.color.b;

            // Delay and speed (24-25)
            triangleData[off + 24] = Math.random() * 0.3;
            triangleData[off + 25] = 1.2 + Math.random() * 0.6;

            // Initial positions
            var pOff = i * 9;
            initialPositions[pOff + 0] = startX;
            initialPositions[pOff + 1] = startY;
            initialPositions[pOff + 2] = startZ;
            initialPositions[pOff + 3] = startX;
            initialPositions[pOff + 4] = startY;
            initialPositions[pOff + 5] = startZ;
            initialPositions[pOff + 6] = startX;
            initialPositions[pOff + 7] = startY;
            initialPositions[pOff + 8] = startZ;

            // Initial colors
            var cOff = i * 12;
            initialColors[cOff + 0] = tri.color.r;
            initialColors[cOff + 1] = tri.color.g;
            initialColors[cOff + 2] = tri.color.b;
            initialColors[cOff + 3] = 1.0;
            initialColors[cOff + 4] = tri.color.r;
            initialColors[cOff + 5] = tri.color.g;
            initialColors[cOff + 6] = tri.color.b;
            initialColors[cOff + 7] = 1.0;
            initialColors[cOff + 8] = tri.color.r;
            initialColors[cOff + 9] = tri.color.g;
            initialColors[cOff + 10] = tri.color.b;
            initialColors[cOff + 11] = 1.0;
        }

        console.log("Data prepared");

        // Create mesh
        var mesh = new BABYLON.Mesh("voxelMesh", scene);
        
        var vertexData = new BABYLON.VertexData();
        vertexData.positions = initialPositions;
        vertexData.colors = initialColors;
        
        var meshIndices = [];
        for (var i = 0; i < vertexCount; i++) {
            meshIndices.push(i);
        }
        vertexData.indices = meshIndices;
        vertexData.applyToMesh(mesh, false);

        var material = new BABYLON.StandardMaterial("mat", scene);
        material.backFaceCulling = false;
        material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        mesh.material = material;

        // Create buffers
        var paramsUBO = new BABYLON.UniformBuffer(engine, undefined, undefined, "Params");
        paramsUBO.addUniform("progress", 1);
        paramsUBO.addUniform("time", 1);
        paramsUBO.addUniform("triangleCount", 1);
        paramsUBO.addUniform("rotationSpeed", 1);

        var triangleBuffer = new BABYLON.StorageBuffer(engine, triangleData.byteLength);
        triangleBuffer.update(triangleData);

        var outputPosBuffer = new BABYLON.StorageBuffer(
            engine, 
            vertexCount * 3 * 4,
            BABYLON.Constants.BUFFER_CREATIONFLAG_VERTEX | BABYLON.Constants.BUFFER_CREATIONFLAG_WRITE
        );
        var outputColorBuffer = new BABYLON.StorageBuffer(
            engine, 
            vertexCount * 4 * 4,
            BABYLON.Constants.BUFFER_CREATIONFLAG_VERTEX | BABYLON.Constants.BUFFER_CREATIONFLAG_WRITE
        );

        // Create compute shader
        var computeShader = new BABYLON.ComputeShader(
            "voxelAssembly",
            engine,
            { computeSource: triangleComputeShader },
            {
                bindingsMapping: {
                    "params": { group: 0, binding: 0 },
                    "triangleData": { group: 0, binding: 1 },
                    "outputPositions": { group: 0, binding: 2 },
                    "outputColors": { group: 0, binding: 3 }
                }
            }
        );

        computeShader.setUniformBuffer("params", paramsUBO);
        computeShader.setStorageBuffer("triangleData", triangleBuffer);
        computeShader.setStorageBuffer("outputPositions", outputPosBuffer);
        computeShader.setStorageBuffer("outputColors", outputColorBuffer);

        // Link vertex buffers
        var positionVertexBuffer = new BABYLON.VertexBuffer(
            engine,
            outputPosBuffer.getBuffer(),
            BABYLON.VertexBuffer.PositionKind,
            false,
            false,
            3
        );

        var colorVertexBuffer = new BABYLON.VertexBuffer(
            engine,
            outputColorBuffer.getBuffer(),
            BABYLON.VertexBuffer.ColorKind,
            false,
            false,
            4
        );

        mesh.setVerticesBuffer(positionVertexBuffer);
        mesh.setVerticesBuffer(colorVertexBuffer);

        // Animation state
        var progress = 0;
        var time = 0;
        var direction = 1;

        // Initial dispatch
        paramsUBO.updateFloat("progress", 0);
        paramsUBO.updateFloat("time", 0);
        paramsUBO.updateUInt("triangleCount", triangleCount);
        paramsUBO.updateFloat("rotationSpeed", 3.0);
        paramsUBO.update();

        computeShader.dispatch(Math.ceil(triangleCount / 64));

        // Animation loop
        scene.onBeforeRenderObservable.add(function () {
            time += 0.016;
            progress += 0.005 * direction;

            if (progress >= 1.3) {
                direction = -1;
            } else if (progress <= -0.3) {
                direction = 1;
            }

            paramsUBO.updateFloat("progress", progress);
            paramsUBO.updateFloat("time", time);
            paramsUBO.update();

            computeShader.dispatch(Math.ceil(triangleCount / 64));
        });

        console.log("Animation started");

        return scene;
    };

    const scene = await createScene();

    engine.runRenderLoop(() => {
        scene.render();
    });

}

init();