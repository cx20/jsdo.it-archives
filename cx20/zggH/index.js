// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（instanced arrays 編）" http://jsdo.it/cx20/bbGE
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.TRIANGLES 編）" http://jsdo.it/cx20/kFIQ
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.LINES 編）（その５）" http://jsdo.it/cx20/42ylm
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.LINES 編）（その４）" http://jsdo.it/cx20/jF8j
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.LINES 編）（その３）" http://jsdo.it/cx20/5AAc
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.LINES 編）（その２）" http://jsdo.it/cx20/l4q0
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.LINES 編）" http://jsdo.it/cx20/3xw9
// forked from cx20's "[簡易版] WebGL でドット絵を描いてみるテスト（gl.POINTS 編）" http://jsdo.it/cx20/ciEf
// forked from cx20's "[簡易版] WebGL で点をプロットしてみるテスト" http://jsdo.it/cx20/puXG
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

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
var data = [];
var color = [];
var indices = [];
var instanceCount = 0;
var ext;

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
    ext = gl.getExtension('ANGLE_instanced_arrays');
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
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "color");
    aLoc[2] = gl.getAttribLocation(p, "instancePosition");
    aLoc[3] = gl.getAttribLocation(p, "instanceColor");
    uLoc[0] = gl.getUniformLocation(p, 'matAxisX');
    uLoc[1] = gl.getUniformLocation(p, 'matAxisY');
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
    gl.enableVertexAttribArray(aLoc[2]);
    gl.enableVertexAttribArray(aLoc[3]);
}

function initBuffers() {
    var DOT_SIZE1 = 1/16 * 1/16 * 1.5;
    var DOT_SIZE2 = 1/16 * 1.0 * 1.5;
    for ( var i = dataSet.length - 1; i > 0; i-- ) {
        var x = (i % 16) * DOT_SIZE1 - 0.5* DOT_SIZE1;
        var y = (16 - Math.floor(i / 16)) * DOT_SIZE1 - 0.5* DOT_SIZE1;
        var rgb = getRgbColor(dataSet[i]);
        if ( dataSet[i] != "無" ) {
            var last = data.length/3;

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
            data = data.concat( [x + 0.0,           y + 0.0,           0.0           ] ); // v0
            data = data.concat( [x + 0.0,           y + DOT_SIZE1*0.8, 0.0           ] ); // v1
            data = data.concat( [x + DOT_SIZE1*0.8, y + DOT_SIZE1*0.8, 0.0           ] ); // v2
            data = data.concat( [x + DOT_SIZE1*0.8, y + 0.0,           0.0           ] ); // v3
            
            data = data.concat( [x + 0.0,           y + 0.0,           -DOT_SIZE1*0.8*5] ); // v4
            data = data.concat( [x + 0.0,           y + DOT_SIZE1*0.8, -DOT_SIZE1*0.8*5] ); // v5
            data = data.concat( [x + DOT_SIZE1*0.8, y + DOT_SIZE1*0.8, -DOT_SIZE1*0.8*5] ); // v6
            data = data.concat( [x + DOT_SIZE1*0.8, y + 0.0,           -DOT_SIZE1*0.8*5] ); // v7
            
            // 頂点座標のインデックス
            indices = indices.concat( 
                [last + 0, last + 1, last + 2], // v0-v1-v2 
                [last + 2, last + 3, last + 0], // v2-v3-v0

                [last + 0, last + 4, last + 5], // v0-v4-v5
                [last + 5, last + 1, last + 0], // v5-v1-v0

                [last + 1, last + 5, last + 6], // v1-v5-v6
                [last + 6, last + 2, last + 1], // v6-v2-v1

                [last + 2, last + 6, last + 7], // v2-v6-v7
                [last + 7, last + 3, last + 2], // v7-v3-v2

                [last + 0, last + 4, last + 7], // v0-v4-v7
                [last + 7, last + 3, last + 0], // v7-v3-v0

                [last + 4, last + 5, last + 6], // v4-v5-v6
                [last + 6, last + 7, last + 4] // v6-v7-v4
             );
            
            // 頂点色
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] ); // v0
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] ); // v1
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] ); // v2
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] ); // v3

            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] ); // v4
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] ); // v5
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] ); // v6
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] ); // v7
        }
    }

    // 各インスタンスに適用するデータ
    var instancePositions = [];
    var instanceColors = [];
    var offsetPosition = 3;
    var offsetColor = 4

    var pos = 0;
    for(var i = 0; i < dataSet.length; i++ ) {
        var x = (i % 16)*DOT_SIZE2 - 0.5 * 1.5;
        var y = (16 - Math.floor(i / 16))*DOT_SIZE2 - 0.5 * 1.5;
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instancePositions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[2], 3, gl.FLOAT, false, 0, 0);
    ext.vertexAttribDivisorANGLE(aLoc[2], 1)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instanceColors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[3], 4, gl.FLOAT, false, 0, 0);
    ext.vertexAttribDivisorANGLE(aLoc[3], 1) // 第二引数はインスタンスをインクリメントする単位

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
    
    ext.drawElementsInstancedANGLE(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0, instanceCount);
    gl.flush();
    pos++;
}

initWebGL();
initShaders();
initBuffers();
animate();
