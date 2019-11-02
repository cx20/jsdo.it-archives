// forked from gaziya's "Domino  (WebGL2 + Oimo.js)" http://jsdo.it/gaziya/46vq

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
        "無":[0xDC/0xFF, 0xAA/0xFF, 0x6B/0xFF],    // 段ボール色
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

var gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
gl.clearColor(0.05, 0.05, 0.1, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

resizeCanvas();
window.addEventListener("resize", function(){
    resizeCanvas();
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //gl.viewport(0, 0, canvas.width, canvas.heihgt);
    gl.viewport(window.innerWidth/2 - canvas.height/2, 0, canvas.height, canvas.height); // TODO: Temporarily adjusted to square for full screen display
}

var p1 = gl.createProgram();
for (var i = 0; i < 2; i++) {
    var shader = gl.createShader([gl.VERTEX_SHADER, gl.FRAGMENT_SHADER][i]);
    gl.shaderSource(shader, [vs.text, fs.text][i]);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {alert(gl.getShaderInfoLog(shader));}
    gl.attachShader(p1, shader);
    gl.deleteShader(shader);
}
gl.linkProgram(p1);
gl.useProgram(p1);
var perspective = function (fovy, aspect, near, far) {
    var v =  1 / Math.tan(fovy * Math.PI / 360.0);
    var u = v / aspect;
    var w = near - far;
    return new Float32Array([
        u, 0, 0, 0,
        0, v, 0, 0,
        0, 0, (near + far) / w, -1,
        0, 0, near * far * 2 / w, 0
    ]);
};
gl.uniformMatrix4fv(gl.getUniformLocation(p1, "pMatrix"), false,
    perspective(45, canvas.width / canvas.height, 0.1, 200));

var w = 1;
var h = 2;
var d = 0.3;
var position = new Float32Array([
    -w, -h, -d, -w, -h,  d,  w, -h,  d,  w, -h, -d,
    -w,  h, -d, -w,  h,  d,  w,  h,  d,  w,  h, -d,
    -w, -h, -d, -w,  h, -d,  w,  h, -d,  w, -h, -d,
    -w, -h,  d, -w,  h,  d,  w,  h,  d,  w, -h,  d,
    -w, -h, -d, -w, -h,  d, -w,  h,  d, -w,  h, -d,
     w, -h, -d,  w, -h,  d,  w,  h,  d,  w,  h, -d ]);
var normal = new Float32Array([
    0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,
    0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,
    0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,
    0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,
    -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0,
    1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0 ]);
var indeces = new Int16Array([
    0,  2,  1,  0,  3,  2,
    4,  5,  6,  4,  6,  7,
    8,  9, 10,  8, 10, 11,
    12, 15, 14, 12, 14, 13,
    16, 17, 18, 16, 18, 19,
    20, 23, 22, 20, 22, 21 ]);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indeces, gl.STATIC_DRAW);
var indexCount = indeces.length;

var idx = 0;
for (var i = 0; i < 2; i++) {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, [position, normal][i], gl.STATIC_DRAW);
    gl.enableVertexAttribArray(idx);
    gl.vertexAttribPointer(idx, [3, 3][i], gl.FLOAT, false, 0, 0);
    idx++;
}

//var number = 450;
var number = 256;
var posStride = 3;
var quatStride = 4;
var colStride = 3;
var posBuffer =  gl.createBuffer();
var quatBuffer =  gl.createBuffer();
var colBuffer =  gl.createBuffer();
var posArray = new Float32Array(number * posStride);
var quatArray = new Float32Array(number * quatStride);
var colArray = new Float32Array(number * colStride);

for (var i = 0; i < 3; i++) {
    gl.bindBuffer(gl.ARRAY_BUFFER, [posBuffer, quatBuffer, colBuffer][i]);
    gl.bufferData(gl.ARRAY_BUFFER, [posArray, quatBuffer, colBuffer][i], gl.STATIC_DRAW);
    gl.enableVertexAttribArray(idx);
    gl.vertexAttribPointer(idx, [posStride, quatStride, colStride][i], gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(idx, 1);
    idx++;
}

// physics
var world = new OIMO.World();
world.gravity.y *= 0.2;

var ground = new OIMO.Body({size:[100, 0.2, 100], pos:[0, -0.1, 0], world:world});
var bodys = [];
for (var i = 0; i < number; i++) {
    //var theta = i / number * 2 * Math.PI * 5;
    var theta = 0;
    var radius = i * 0.035 + 25;
    var x = (Math.floor(i / 16) - 8 )* 3;
    var y = h;
    var z = (8 - (i % 16)) * 3;
    bodys[i] = new OIMO.Body({type:'box', size:[w * 2, h * 2, d * 2],
        pos:[x, y, z],
        rot:[0, -theta * 180 / Math.PI, 0],
        move:true, world:world});
}

for ( var i = 0; i < 16; i++ ) {
    bodys[i * 16].resetRotation(-10, 0, 0); //trigger
}

for ( var i = 0; i < number; i++ ) {
    var c = dataSet[i];
    var color = getRgbColor(c);
    colArray[i * colStride + 0] = color[0];
    colArray[i * colStride + 1] = color[1];
    colArray[i * colStride + 2] = color[2];
}
gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colArray, gl.STATIC_DRAW);

var data2buf = function () {
    var pIdx = 0;
    var qIdx = 0;
    for (var i = 0; i < number; i++) {
        var p = bodys[i].body.getPosition();
        posArray[pIdx++] = p.x; 
        posArray[pIdx++] = p.y; 
        posArray[pIdx++] = p.z; 
        var q = bodys[i].body.getQuaternion();
        quatArray[qIdx++] = q.x; 
        quatArray[qIdx++] = q.y; 
        quatArray[qIdx++] = q.z; 
        quatArray[qIdx++] = q.w; 
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, posArray, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, quatBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quatArray, gl.STATIC_DRAW);
};
data2buf();

var time1;
var prevTime1 = Date.now();
var fps1 = 0;
setInterval(function () {
    time1 = Date.now();
    if (time1 - 1000 > prevTime1) {
        prevTime1 = time1;
        div1.innerHTML = "Physics / Second : " + fps1; 
        fps1 = -1;
    }
    fps1++;   

    world.step();
    data2buf();
}, 1000 / 60);

var time0;
var prevTime0 = Date.now();
var fps0 = 0;
(function () {
    time0 = Date.now();
    if (time0 - 1000 > prevTime0) {
        prevTime0 = time0;
        div0.innerHTML = "Frames / Second : " + fps0; 
        fps0 = -1;
    }
    fps0++;
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(p1);
    gl.drawElementsInstanced(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0, number);
    
    requestAnimationFrame(arguments.callee);
})();
 