// forked from cx20's "[簡易版] WebGL 2.0 で立体ドット絵を描いてみるテスト（gl.TRIANGLES編）" http://jsdo.it/cx20/5qny
// forked from cx20's "[簡易版] WebGL 2.0 で立体ドット絵を描いてみるテスト（gl.LINES 編）" http://jsdo.it/cx20/fe6J
// forked from cx20's "[簡易版] WebGL 2.0 でドット絵を描いてみるテスト（gl.LINES 編）" http://jsdo.it/cx20/p9w5z
// forked from cx20's "[簡易版] WebGL 2.0 でドット絵を描いてみるテスト（gl.POINTS 編）" http://jsdo.it/cx20/pEUk
// forked from cx20's "[簡易版] WebGL 2.0 を試してみるテスト" http://jsdo.it/cx20/tYEN
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "×":[0x00/0xFF, 0x00/0xFF, 0x00/0xFF],
        "無":[0x00/0xFF, 0x00/0xFF, 0x00/0xFF],
        "白":[0xff/0xFF, 0xff/0xFF, 0xff/0xFF],
        "肌":[0xff/0xFF, 0xcc/0xFF, 0xcc/0xFF],
        "茶":[0x80/0xFF, 0x00/0xFF, 0x00/0xFF],
        "赤":[0xff/0xFF, 0x00/0xFF, 0x00/0xFF],
        "黄":[0xff/0xFF, 0xff/0xFF, 0x00/0xFF],
        "緑":[0x00/0xFF, 0xff/0xFF, 0x00/0xFF],
        "水":[0x00/0xFF, 0xff/0xFF, 0xff/0xFF],
        "青":[0x00/0xFF, 0x00/0xFF, 0xff/0xFF],
        "紫":[0x80/0xFF, 0x00/0xFF, 0x80/0xFF]
    };
    return colorHash[ c ];
}

var c, gl;
var aLoc = [];
var uLoc = [];
var position = [];
var color = [];
var indices = [];
var instanceCount = 0;
var ext;

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("webgl2") || c.getContext("experimental-webgl2");
    resizeCanvas();
    window.addEventListener("resize", function(){
        resizeCanvas();
    });
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    //gl.viewport(0, 0, c.width, c.heihgt);
    gl.viewport(window.innerWidth/2 - c.height/2, 0, c.height, c.height); // TODO: Temporarily adjusted to square for full screen display
}

function initShaders() {
    var p = gl.createProgram();
    var v = document.getElementById("vs").textContent;
    var f = document.getElementById("fs").textContent;
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);
    console.log(gl.getShaderInfoLog(vs));
    console.log(gl.getShaderInfoLog(fs));
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "instancePosition");
    aLoc[2] = gl.getAttribLocation(p, "color");
    uLoc[0] = gl.getUniformLocation(p, 'matAxisX');
    uLoc[1] = gl.getUniformLocation(p, 'matAxisY');
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
    gl.enableVertexAttribArray(aLoc[2]);
}

function initBuffers() {
    var DOT_SIZE = 1/16;

    // 立方体の描画順
    // 
    //     [5]------[6]
    //    / |      / |
    //  [1]------[2] |
    //   |  |     |  |
    //   | [4]----|-[7]
    //   |/       |/
    //  [0]------[3]
    //

    // 頂点座標
    position = [
        0.0,          0.0,          0.0          , // v0
        0.0,          DOT_SIZE*0.9, 0.0          , // v1
        DOT_SIZE*0.9, DOT_SIZE*0.9, 0.0          , // v2
        DOT_SIZE*0.9, 0.0,          0.0          , // v3
        
        0.0,          0.0,          -DOT_SIZE*0.9, // v4
        0.0,          DOT_SIZE*0.9, -DOT_SIZE*0.9, // v5
        DOT_SIZE*0.9, DOT_SIZE*0.9, -DOT_SIZE*0.9, // v6
        DOT_SIZE*0.9, 0.0,          -DOT_SIZE*0.9  // v7
    ];
        
    // 頂点座標のインデックス
    indices = [
        0, 1, 2, // v0-v1-v2 
        2, 3, 0, // v2-v3-v0

        0, 4, 5, // v0-v4-v5
        5, 1, 0, // v5-v1-v0

        1, 5, 6, // v1-v5-v6
        6, 2, 1, // v6-v2-v1

        2, 6, 7, // v2-v6-v7
        7, 3, 2, // v7-v3-v2

        0, 4, 7, // v0-v4-v7
        7, 3, 0, // v7-v3-v0

        4, 5, 6, // v4-v5-v6
        6, 7, 4  // v6-v7-v4
    ];

    // 各インスタンスに適用するデータ
    var instancePositions = [];
    var instanceColors = [];
    var offsetPosition = 3;
    var offsetColor = 4

    var pos = 0;
    for(var i = 0; i < dataSet.length; i++ ) {
        var x = (i % 16)*DOT_SIZE - 0.5;
        var y = (16 - Math.floor(i / 16))*DOT_SIZE - 0.5;
        var z = 0;
        if ( dataSet[i] != "無" ) {
            instancePositions[pos * offsetPosition]     = x;
            instancePositions[pos * offsetPosition + 1] = y;
            instancePositions[pos * offsetPosition + 2] = z;
            var rgb = getRgbColor( dataSet[i] );
            instanceColors[pos * offsetColor]     = rgb[0];
            instanceColors[pos * offsetColor + 1] = rgb[1];
            instanceColors[pos * offsetColor + 2] = rgb[2];
            instanceColors[pos * offsetColor + 3] = 1.0;
            pos++;
        }
    }
    instanceCount = pos; // カウントした個数をセット

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instancePositions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 3, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(aLoc[1], 1)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceColors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[2], 4, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(aLoc[2], 1) // 第二引数はインスタンスをインクリメントする単位

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var pos = 0;
function render() {
    var rad = Math.PI * pos/180;
    var c = Math.cos(rad);
    var s = Math.sin(rad);

    // x軸で回転
    var matAxisX = [
        1.0, 0.0, 0.0, 0.0,
        0.0,   c,  -s, 0.0,
        0.0,   s,   c, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];

    // y軸で回転
    var matAxisY = [
          c, 0.0,   s, 0.0,
        0.0, 1.0, 0.0, 0.0,
         -s, 0.0,   c, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(matAxisX));
    gl.uniformMatrix4fv(uLoc[1], false, new Float32Array(matAxisY));
    
    gl.drawElementsInstanced(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0, instanceCount);
    gl.flush();
    pos++;
}

initWebGL();
initShaders();
initBuffers();
animate();
