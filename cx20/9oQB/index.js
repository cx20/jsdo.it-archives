// forked from cx20's "[簡易版] WebGL でフォントをプロットしてみるテスト（その２）" http://jsdo.it/cx20/vI7h
// forked from cx20's "[簡易版] WebGL でフォントをプロットしてみるテスト" http://jsdo.it/cx20/il5V
// forked from cx20's "[簡易版] WebGL で点をプロットしてみるテスト" http://jsdo.it/cx20/puXG
// forked from cx20's "[簡易版] WebGL で四角形を描いてみるテスト" http://jsdo.it/cx20/vwnxi
// forked from cx20's "[簡易版 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC
var X_START_POS = -15;
var Y_START_POS = -15;

var c, gl;
var aLoc = [];
var uLoc = [];
var data = [];
var color = [];
var indices = [];
var dataBuffer;
var colorBuffer;

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
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
    uLoc[0] = gl.getUniformLocation(p, 'matAxisY');
}

function initBuffers() {
	dataBuffer = gl.createBuffer();
	colorBuffer = gl.createBuffer();
}

function loadData() {
    data = [];
    color = [];
    var dataSet = simplexFontArray[Math.floor(Math.random() * simplexFontArray.length)];
    var scale = 1/24;
    var x0 = -1;
    var y0 = -1;
    for ( var i = 2; i < dataSet.length; i += 2 ) {
        var x = dataSet[i];
        var y = dataSet[i+1];
        if ( x >= 0 && y >= 0 ) {
            if ( x0 == -1 && y0 == -1 ) {
                data.push( (x + X_START_POS) * scale, (y + Y_START_POS) * scale, 0.0 );
                data.push( (x + X_START_POS) * scale, (y + Y_START_POS) * scale, 0.1 );
                data.push( (x + X_START_POS) * scale, (y + Y_START_POS) * scale, 0.0 );
                data.push( (x + X_START_POS) * scale, (y + Y_START_POS) * scale, 0.1 );
                color.push( (x + X_START_POS) * scale + 0.5, (y + Y_START_POS) * scale + 0.5, 0.5, 1.0 );
                color.push( (x + X_START_POS) * scale + 0.5, (y + Y_START_POS) * scale + 0.5, 0.6, 1.0 );
                color.push( (x + X_START_POS) * scale + 0.5, (y + Y_START_POS) * scale + 0.5, 0.5, 1.0 );
                color.push( (x + X_START_POS) * scale + 0.5, (y + Y_START_POS) * scale + 0.5, 0.6, 1.0 );
            } else {
                data.push( (x0 + X_START_POS) * scale, (y0 + Y_START_POS) * scale, 0.0 );
                data.push( (x + X_START_POS) * scale, (y + Y_START_POS) * scale, 0.0 );
                data.push( (x0 + X_START_POS) * scale, (y0 + Y_START_POS) * scale, 0.1 );
                data.push( (x + X_START_POS) * scale, (y + Y_START_POS) * scale, 0.1 );
                data.push( (x0 + X_START_POS) * scale, (y0 + Y_START_POS) * scale, 0.0 );
                data.push( (x0 + X_START_POS) * scale, (y0 + Y_START_POS) * scale, 0.1 );
                data.push( (x + X_START_POS) * scale, (y + Y_START_POS) * scale, 0.0 );
                data.push( (x + X_START_POS) * scale, (y + Y_START_POS) * scale, 0.1 );
                color.push( (x0 + X_START_POS) * scale + 0.5, (y0 + Y_START_POS) * scale + 0.5, 0.5, 1.0 );
                color.push( (x + X_START_POS) * scale + 0.5, (y + Y_START_POS) * scale + 0.5, 0.5, 1.0 );
                color.push( (x0 + X_START_POS) * scale + 0.5, (y0 + Y_START_POS) * scale + 0.5, 0.6, 1.0 );
                color.push( (x + X_START_POS) * scale + 0.5, (y + Y_START_POS) * scale + 0.5, 0.6, 1.0 );
                color.push( (x0 + X_START_POS) * scale + 0.5, (y0 + Y_START_POS) * scale + 0.5, 0.5, 1.0 );
                color.push( (x0 + X_START_POS) * scale + 0.5, (y0 + Y_START_POS) * scale + 0.5, 0.6, 1.0 );
                color.push( (x + X_START_POS) * scale + 0.5, (y + Y_START_POS) * scale + 0.5, 0.5, 1.0 );
                color.push( (x + X_START_POS) * scale + 0.5, (y + Y_START_POS) * scale + 0.5, 0.6, 1.0 );
            }
        }
        x0 = x;
        y0 = y;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 4, gl.FLOAT, false, 0, 0);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

var pos = 0;
var rad = 0;
function render() {
    if (pos == 0) {
        loadData();
    }
    rad += Math.PI * 1.0 / 180.0;

    var c = Math.cos(rad);
    var s = Math.sin(rad);

    // 変換行列を用意
    // y軸で回転
    var matAxisY = [
          c, 0.0,   s, 0.0,
        0.0, 1.0, 0.0, 0.0,
         -s, 0.0,   c, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    gl.uniformMatrix4fv(uLoc[0], false, new Float32Array(matAxisY));

    //gl.drawArrays(gl.LINES, 0, data.length / 3);
    //gl.drawArrays(gl.POINTS, 0, data.length / 3);
    //gl.drawArrays(gl.LINES, 0, pos);
    gl.drawArrays(gl.LINES, 0, pos);
    gl.drawArrays(gl.POINTS, 0, pos);
    gl.flush();
    pos++;
    if (pos >= (data.length / 3)) {
        pos = 0;
    }
}


function convertHersheyToSimplex(hershey) {
    var simplex = [];
    var R = 82;
    
    // "MWOMOV RUMUV ROQUQ"
    // The left position is 'M' - 'R' = -5
    // The right position is 'W' - 'R' = 5
    // The first coordinate is "OM" = (-3,-5)
    // The second coordinate is "OV" = (-3,4)
    // Raise the pen " R"
    // Move to "UM" = (3,-5)
    // Draw to "UV" = (3,4)
    // Raise the pen " R"
    // Move to "OQ" = (-3,-1)
    // Draw to "UQ" = (3,-1)
    // Drawing this out on a piece of paper will reveal it represents an 'H'.
    //
    var vertex = Math.floor(hershey.length / 2);
    var left = hershey[0].charCodeAt(0) - R; // left position
    var right = hershey[1].charCodeAt(0) - R; // right position
    var width = right - left;
    simplex.push( vertex, width );
    for ( var i = 2; i < hershey.length; i += 2) {
        var xChar = hershey[i+0];
        var yChar = hershey[i+1];
        var x = xChar.charCodeAt(0) - R - left; // convert to absolute coordinates from relative coordinates
        var y = 32 - (yChar.charCodeAt(0) - R + 15);
        if ( xChar == " " && yChar == "R" ) {
            x = y = -1;
        }
        simplex.push(x, y);
    }
    return simplex;
}

function convertHersheyToSimplexFontArray(hersheyFontArray) {
    var fontArray = [];
    for ( key in hersheyFontArray ) {
        var simplex = convertHersheyToSimplex(hersheyFontArray[key][1]);
        fontArray.push( simplex );
    }
    return fontArray;
}

//var simplexFontArray = convertHersheyToSimplexFontArray(hersheyFontArray);
var simplexFontArray = convertHersheyToSimplexFontArray(japaneseFontArray);

initWebGL();
initShaders();
initBuffers();
animate();
