// forked from gaziya's "Domino  (WebGL2 + Oimo.js)" http://jsdo.it/gaziya/46vq
var gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
gl.clearColor(0.05, 0.05, 0.1, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

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
/*
var w = 1.0;
var h = 0.2;
var d = 0.5;
*/
/*
	var position = new Float32Array([
    -w, -h, -d, -w, -h,  d,  w, -h,  d,  w, -h, -d,
    -w,  h, -d, -w,  h,  d,  w,  h,  d,  w,  h, -d,
    -w, -h, -d, -w,  h, -d,  w,  h, -d,  w, -h, -d,
    -w, -h,  d, -w,  h,  d,  w,  h,  d,  w, -h,  d,
    -w, -h, -d, -w, -h,  d, -w,  h,  d, -w,  h, -d,
     w, -h, -d,  w, -h,  d,  w,  h,  d,  w,  h, -d ]);
*/
// 消しゴムの座標データを用意
//             1.0 y 
//              ^  -1.0 
//              | / z
//              |/       x
// -1.0 -----------------> +1.0
//            / |
//      +1.0 /  |
//           -1.0
// 
//         [7]------[6]
//        / |      / |
//      [3]------[2] |
//       |  |     |  |
//       | [4]----|-[5]
//       |/       |/
//      [0]------[1]
//
var position = new Float32Array([
        // Front face
        -w, -h,  d, // v0
         w, -h,  d, // v1
         w,  h,  d, // v2
        -w,  h,  d, // v3
        // Back face
        -w, -h, -d, // v4
         w, -h, -d, // v5
         w,  h, -d, // v6
        -w,  h, -d, // v7
        // Top face
         w,  h,  d, // v2
        -w,  h,  d, // v3
        -w,  h, -d, // v7
         w,  h, -d, // v6
        // Bottom face
        -w, -h,  d, // v0
         w, -h,  d, // v1
         w, -h, -d, // v5
        -w, -h, -d, // v4
         // Right face
         w, -h,  d, // v1
         w,  h,  d, // v2
         w,  h, -d, // v6
         w, -h, -d, // v5
         // Left face
        -w, -h,  d, // v0
        -w,  h,  d, // v3
        -w,  h, -d, // v7
        -w, -h, -d  // v4
]);
var normal = new Float32Array([
    0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,
    0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,
    0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,
    0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0,  1,
    -1,  0,  0, -1,  0,  0, -1,  0,  0, -1,  0,  0,
    1,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  0 ]);

//         [7]------------[6]
//        / |            / |
//      [3]------------[2] |
//       | [4]----------|-[5]
//       |/             |/
//      [0]------------[1]
/*
var textureCoords = new Float32Array([
    // Front face
    0.5,  1.0, // v0
    0.75, 1.0, // v1
    0.75, 0.5, // v2
    0.5,  0.5, // v3

    // Back face
    0.25, 1.0, // v4
    0.5,  1.0, // v5
    0.5,  0.5, // v6
    0.25, 0.5, // v7

    // Top face
    0.75, 0.5, // v2
    0.5,  0.5, // v3
    0.5,  0.0, // v7
    0.75, 0.0, // v6

    // Bottom face
    0.0,  1.0, // v0
    0.25, 1.0, // v1
    0.25, 0.5, // v5
    0.0,  0.5, // v4

    // Right face
    0.0,  0.5, // v1
    0.0,  0.0, // v2
    0.25, 0.0, // v6
    0.25, 0.5, // v5

    // Left face
    0.5,  0.5, // v0
    0.5,  0.0, // v3
    0.25, 0.0, // v7
    0.25, 0.5  // v4
]);
*/
//         [7]-------[6]
//        / |       / |
//      [3]-------[2] |
//       |  |      |  |
//       |  |      |  |
//       |  |      |  |
//       | [4]-----|-[5]
//       |/        |/
//      [0]-------[1]
//
var textureCoords = new Float32Array([
    // Front face
    0.25, 1.0, // v0
    0.25, 0.5, // v1
    0.0,  0.5, // v2
    0.0,  1.0, // v3

    // Back face
    0.75, 0.0, // v4
    0.75, 0.5, // v5
    0.5,  0.5, // v6
    0.5,  0.0, // v7

    // Top face
    0.25, 0.5, // v2
    0.0,  0.5, // v3
    0.0,  0.0, // v7
    0.25, 0.0, // v6

    // Bottom face
    0.5,  0.5, // v0
    0.25, 0.5, // v1
    0.25, 0.0, // v5
    0.5,  0.0, // v4

    // Right face
    0.75, 0.5, // v1
    0.5,  0.5, // v2
    0.5,  1.0, // v6
    0.75, 1.0, // v5

    // Left face
    0.5,  0.5, // v0
    0.25, 0.5, // v3
    0.25, 1.0, // v7
    0.5,  1.0  // v4
]);

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
var strides = [3, 3, 2];
var vertices = [position, normal, textureCoords];
for (var i = 0; i < strides.length; i++) {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, vertices[i], gl.STATIC_DRAW);
    gl.enableVertexAttribArray(idx);
    gl.vertexAttribPointer(idx, strides[i], gl.FLOAT, false, 0, 0);
    idx++;
}

var number = 450;
var posStride = 3;
var quatStride = 4;
var posBuffer =  gl.createBuffer();
var quatBuffer =  gl.createBuffer();
var posArray = new Float32Array(number * posStride);
var quatArray = new Float32Array(number * quatStride);

for (var i = 0; i < 2; i++) {
    gl.bindBuffer(gl.ARRAY_BUFFER, [posBuffer, quatBuffer][i]);
    gl.bufferData(gl.ARRAY_BUFFER, [posArray, quatBuffer][i], gl.STATIC_DRAW);
    gl.enableVertexAttribArray(idx);
    gl.vertexAttribPointer(idx, [posStride, quatStride][i], gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(idx, 1);
    idx++;
}

var img = new Image();
var texture;
img.onload = function(){
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
};
img.src = "/assets/7/5/o/P/75oPt.png"; // 512x256.png

// physics
var world = new OIMO.World();
world.gravity.y *= 0.2;

var ground = new OIMO.Body({size:[100, 0.2, 100], pos:[0, -0.1, 0], world:world});
var bodys = [];
for (var i = 0; i < number; i++) {
    var theta = i / number * 2 * Math.PI * 5;
    var radius = i * 0.035 + 25;
    bodys[i] = new OIMO.Body({type:'box', size:[w * 2, h * 2, d * 2],
        pos:[radius * Math.cos(theta), h, radius * Math.sin(theta)],
        rot:[0, -theta * 180 / Math.PI, 0],
        move:true, world:world});
}

bodys[0].resetRotation(10, 0, 0); //trigger
bodys[number - 1].resetRotation(-10, 0, 0); //trigger

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
 