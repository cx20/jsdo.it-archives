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

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("webgl2") || c.getContext("experimental-webgl2");
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
    aLoc[1] = gl.getAttribLocation(p, "color");
    uLoc[0] = gl.getUniformLocation(p, 'matAxisX');
    uLoc[1] = gl.getUniformLocation(p, 'matAxisY');
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
}

function initBuffers() {
    var DOT_SIZE = 1/16 * 1.2;
    for ( var i = dataSet.length - 1; i > 0; i-- ) {
        var x = (i % 16) * DOT_SIZE - 0.5;
        var y = (16 - Math.floor(i / 16)) * DOT_SIZE - 0.5;
        var rgb = getRgbColor(dataSet[i]);
        if ( dataSet[i] != "無" ) {
            var last = position.length/3;

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
            position = position.concat( [x + 0.0,          y + 0.0,          0.0          ] ); // v0
            position = position.concat( [x + 0.0,          y + DOT_SIZE*0.8, 0.0          ] ); // v1
            position = position.concat( [x + DOT_SIZE*0.8, y + DOT_SIZE*0.8, 0.0          ] ); // v2
            position = position.concat( [x + DOT_SIZE*0.8, y + 0.0,          0.0          ] ); // v3
            
            position = position.concat( [x + 0.0,          y + 0.0,          -DOT_SIZE*0.8] ); // v4
            position = position.concat( [x + 0.0,          y + DOT_SIZE*0.8, -DOT_SIZE*0.8] ); // v5
            position = position.concat( [x + DOT_SIZE*0.8, y + DOT_SIZE*0.8, -DOT_SIZE*0.8] ); // v6
            position = position.concat( [x + DOT_SIZE*0.8, y + 0.0,          -DOT_SIZE*0.8] ); // v7
            
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

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var pos = 0;
function render() {
    pos = pos % indices.length;
    
    var rad = Math.PI * 30/180;
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
    
    gl.drawElements(gl.TRIANGLES, pos, gl.UNSIGNED_SHORT, 0);
    gl.flush();
    pos += 36; // 1箱ずつ描画する
}

initWebGL();
initShaders();
initBuffers();
animate();
