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

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");
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
    uLoc[0] = gl.getUniformLocation(p, 'mvpMatrix');
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
}

function initBuffers() {
    var DOT_SIZE = 1/16 * 2;
    for ( var i = 0; i < 256; i++ ) {
        var x = (i % 16) * DOT_SIZE - 0.5;
        var y = (16 - Math.floor(i / 16)) * DOT_SIZE - 0.5;
        var rgb = getRgbColor(dataSet[i]);
        if ( dataSet[i] != "無" ) {
            var last = data.length/3;
            data = data.concat( [x + 0.0,          y + 0.0,          0.0] );
            data = data.concat( [x + 0.0,          y + DOT_SIZE*0.8, 0.0] );
            data = data.concat( [x + DOT_SIZE*0.8, y + DOT_SIZE*0.8, 0.0] );
            data = data.concat( [x + DOT_SIZE*0.8, y + 0.0,          0.0] );
            indices = indices.concat( 
                [last + 0, last + 1], 
                [last + 1, last + 2], 
                [last + 2, last + 3], 
                [last + 3, last + 0] );
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] );
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] );
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] );
            color = color.concat( [rgb[0], rgb[1], rgb[2], 1.0] );
        }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

/*
    // 変換行列を用意
    var mvpMatrix = [
        1.0, 0.0, 0.0, 0.5,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(mvpMatrix));
*/
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var pos = 0;
function render() {
    pos = pos % indices.length;
    
    var x = data[indices[pos] * 3];
    var y = data[indices[pos] * 3 + 1];
    
    // 変換行列を用意
    var mvpMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
         -x,  -y, 0.0, 1.0
    ];
    gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(mvpMatrix));

    gl.drawElements(gl.LINES, pos, gl.UNSIGNED_SHORT, 0);
    gl.flush();
    pos++;
}

initWebGL();
initShaders();
initBuffers();
animate();
