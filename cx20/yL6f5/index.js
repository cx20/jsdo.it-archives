// forked from cx20's "[WebGL] CZPG.js を試してみるテスト" http://jsdo.it/cx20/eG4v
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

    const renderer = new CZPG.Renderer('c').setSize('100%', '100%').clear(1.0, 1.0, 1.0, 1.0);
    const context = renderer.context;

    // 正方形の座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //        [0]------[1]
    //         |      / |
    //         |    /   |
    //         |  /     |
    //        [2]------[3]
    //
    const positions = [ 
        -0.5, 0.5, 0.0, // v0
         0.5, 0.5, 0.0, // v1 
        -0.5,-0.5, 0.0, // v2
         0.5,-0.5, 0.0  // v3
    ];
    const colors = [
         1.0, 0.0, 0.0, 1.0, // v0
         0.0, 1.0, 0.0, 1.0, // v1
         0.0, 0.0, 1.0, 1.0, // v2
         1.0, 1.0, 0.0, 1.0  // v3
    ];
    const indices = [
        2, 1, 0, // v2-v1-v0
        2, 3, 1  // v2-v3-v1
    ];
    const attribArrays = {
        indices: { data: indices },
    };
    attribArrays['position'] = { data: positions, numComponents: 3 };
    attribArrays['color'] = { data: colors, numComponents: 4 };
    var mesh = new CZPG.Mesh('quad', attribArrays);
    var model = new CZPG.Model(mesh);
    var shader = new CZPG.Shader(context, 'vs', 'fs');

    shader.renderModel(model); 
