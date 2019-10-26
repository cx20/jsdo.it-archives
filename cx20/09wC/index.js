// forked from cx20's "消しゴムを落下させてみるテスト (WebGL拡張 + Oimo.js)" http://jsdo.it/cx20/GUz8
// forked from cx20's "消しゴムを落下させてみるテスト (WebGL2 + Oimo.js)" http://jsdo.it/cx20/rIbm
// forked from cx20's "forked: Waterfall  (WebGL2 + Oimo.js)" http://jsdo.it/cx20/mxCK
// forked from gaziya's "Waterfall  (WebGL2 + Oimo.js)" http://jsdo.it/gaziya/nY3Z

var gl = canvas.getContext("experimental-webgl");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.7, 0.7, 0.7, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
var ext = gl.getExtension("ANGLE_instanced_arrays");

var p1 = gl.createProgram();
var type = [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER];
var src = [vs.text, fs.text];
for (var i = 0; i < 2; i++) {
    var shader = gl.createShader(type[i]);
    gl.shaderSource(shader, src[i]);
    gl.compileShader(shader);
    console.log(gl.getShaderInfoLog(shader));
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {alert(gl.getShaderInfoLog(shader));}
    gl.attachShader(p1, shader);
    gl.deleteShader(shader);
}
gl.linkProgram(p1);
gl.useProgram(p1);
var perspective = function (fovy, aspect, near, far) {
    var top = near * Math.tan(fovy * Math.PI / 360.0);
    var right = top * aspect;
    var u = right * 2;
    var v = top * 2;
    var w = far - near;
    return new Float32Array([
        near * 2 / u, 0, 0, 0,
        0, near * 2 / v, 0, 0,
        0, 0, -(far + near) / w, -1,
        0, 0, -(far * near * 2) / w, 0
    ]);
};
gl.uniformMatrix4fv(
    gl.getUniformLocation(p1, "pMatrix"),
    false,
    perspective(45, canvas.width / canvas.height, 0.1, 100.0)
);

/*
var w = 1.0;
var h = 0.2;
var d = 0.5;
*/
var w = 2;
var h = 2;
var d = 0.4;

// 将棋の駒の座標データを用意
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
    -0.5 * w,  -0.5 * h,  0.7 * d, // v0
     0.5 * w,  -0.5 * h,  0.7 * d, // v1
     0.35 * w,  0.5 * h,  0.4 * d, // v2
    -0.35 * w,  0.5 * h,  0.4 * d, // v3
    // Back face
    -0.5 * w,  -0.5 * h, -0.7 * d, // v4
     0.5 * w,  -0.5 * h, -0.7 * d, // v5
     0.35 * w,  0.5 * h, -0.4 * d, // v6
    -0.35 * w,  0.5 * h, -0.4 * d, // v7
    // Top face
     0.35 * w,  0.5 * h,  0.4 * d, // v2
    -0.35 * w,  0.5 * h,  0.4 * d, // v3
    -0.35 * w,  0.5 * h, -0.4 * d, // v7
     0.35 * w,  0.5 * h, -0.4 * d, // v6
    // Bottom face
    -0.5 * w,  -0.5 * h,  0.7 * d, // v0
     0.5 * w,  -0.5 * h,  0.7 * d, // v1
     0.5 * w,  -0.5 * h, -0.7 * d, // v5
    -0.5 * w,  -0.5 * h, -0.7 * d, // v4
    // Right face
     0.5 * w,  -0.5 * h,  0.7 * d, // v1
     0.35 * w,  0.5 * h,  0.4 * d, // v2
     0.35 * w,  0.5 * h, -0.4 * d, // v6
     0.5 * w,  -0.5 * h, -0.7 * d, // v5
    // Left face
    -0.5 * w,  -0.5 * h,  0.7 * d, // v0
    -0.35 * w,  0.5 * h,  0.4 * d, // v3
    -0.35 * w,  0.5 * h, -0.4 * d, // v7
    -0.5 * w,  -0.5 * h, -0.7 * d, // v4
    // Front2 face
    -0.35 * w,  0.5 * h,  0.4 * d,  // v3
     0.35 * w,  0.5 * h,  0.4 * d,  // v2
     0.0 * w,   0.6 * h,  0.35 * d, // v8
    // Back2 face
    -0.35 * w,  0.5 * h, -0.4 * d,  // v7
     0.35 * w,  0.5 * h, -0.4 * d,  // v6
     0.0 * w,   0.6 * h, -0.35 * d, // v9
    // Right2 Face
     0.35 * w,  0.5 * h,  0.4 * d,  // v2
     0.35 * w,  0.5 * h, -0.4 * d,  // v6
     0.0 * w,   0.6 * h, -0.35 * d, // v9
     0.0 * w,   0.6 * h,  0.35 * d, // v8
    // Left2 Face
    -0.35 * w,  0.5 * h,  0.4 * d,  // v3
    -0.35 * w,  0.5 * h, -0.4 * d,  // v7
     0.0 * w,   0.6 * h, -0.35 * d, // v9
     0.0 * w,   0.6 * h,  0.35 * d  // v8
]);
var normal = new Float32Array([
    // Front face
    0, -1,  0,  
    0, -1,  0,  
    0, -1,  0,  
    0, -1,  0,
    // Back face
    0,  1,  0,  
    0,  1,  0,  
    0,  1,  0,  
    0,  1,  0,
    // Top face
    0,  0, -1,  
    0,  0, -1,  
    0,  0, -1,  
    0,  0, -1,
    // Bottom face
    0,  0,  1,  
    0,  0,  1,  
    0,  0,  1,  
    0,  0,  1,
    // Right face
    -1,  0,  0, 
    -1,  0,  0, 
    -1,  0,  0, 
    -1,  0,  0,
    // Left face
    1,  0,  0,  
    1,  0,  0,  
    1,  0,  0, 
    1,  0,  0, 
    // Front2 face
    0, -1,  0,  
    0, -1,  0,  
    0, -1,  0,  
    // Back2 face
    0,  1,  0,  
    0,  1,  0,  
    0,  1,  0,  
    // Right2 Face
    0,  0, -1,  
    0,  0, -1,  
    0,  0, -1,  
    0,  0, -1,  
    // Left2 Face
    0,  0, -1,  
    0,  0, -1,  
    0,  0, -1,  
    0,  0, -1  
]);

// テクスチャ座標データを用意
//  (0, 1)               (1, 1)
//   t +----+----+----+----+
//     | ① | ② | ③ |    |
//     +----+----+----+----+
//     | ④ | ⑤ | ⑥ |    |
//     +----+----+----+----+ -> s
//  (0, 0)               (1, 0)
//
var textureCoords = new Float32Array([
    // Front face
    0.5,  0.5, // v0
    0.75, 0.5, // v1
    0.75, 1.0, // v2
    0.5,  1.0, // v3

    // Back face
    0.25, 0.5, // v4
    0.5,  0.5, // v5
    0.5,  1.0, // v6
    0.25, 1.0, // v7

    // Top face
    0.75, 0.5, // v2
    0.5,  0.5, // v3
    0.5,  0.0, // v7
    0.75, 0.0, // v6

    // Bottom face
    0.0,  0.5, // v0
    0.25, 0.5, // v1
    0.25, 1.0, // v5
    0.0,  1.0, // v4

    // Right face
    0.0,  0.5, // v1
    0.0,  0.0, // v2
    0.25, 0.0, // v6
    0.25, 0.5, // v5

    // Left face
    0.5,  0.5, // v0
    0.5,  0.0, // v3
    0.25, 0.0, // v7
    0.25, 0.5, // v4

    // Front2 face
    0.75,  0.0, // v3
    1.0,   0.0, // v2
    1.0,   0.5, // v8
    // Back2 face
    0.75,  0.0, // v7
    1.0,   0.0, // v6
    1.0,   0.5, // v9
    // Right2 Face
    0.75,  0.0, // v2
    1.0,   0.0, // v6
    1.0,   0.5, // v9
    0.75,  0.5, // v8
    // Left2 Face
    0.75,  0.0, // v3
    1.0,   0.0, // v7
    1.0,   0.0, // v9
    0.75,  0.5  // v8
]);

var indeces = new Int16Array([
     0,  1,  2,    0,  2 , 3,  // Front face
     4,  5,  6,    4,  6 , 7,  // Back face
     8,  9, 10,    8, 10, 11,  // Top face
    12, 13, 14,   12, 14, 15,  // Bottom face
    16, 17, 18,   16, 18, 19,  // Right face
    20, 21, 22,   20, 22, 23,  // Left face
    24, 25, 26,                // Front2 face
    27, 28, 29,                // Back2 face
    30, 31, 32,   30, 32, 33,  // Right2 face
    34, 35, 36,   34, 36, 37   // Left2 face
]);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indeces, gl.STATIC_DRAW);
var indexCount = indeces.length;

var strides = [3, 3, 2];
var vertices = [position, normal, textureCoords];
for (var i = 0; i < strides.length; i++) {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, vertices[i], gl.STATIC_DRAW);
    gl.vertexAttribPointer(i, strides[i], gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(i);
}

var max = 300;
var posStride = 3;
var rotStride = 4;
var posBuffer =  gl.createBuffer();
var rotBuffer =  gl.createBuffer();
var posArray = new Float32Array(max * posStride);
var rotArray = new Float32Array(max * rotStride);

var idx = strides.length;
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER,  posArray, gl.STATIC_DRAW);
gl.enableVertexAttribArray(idx);
gl.vertexAttribPointer(idx, posStride, gl.FLOAT, false, 0, 0);
//gl.vertexAttribDivisor(idx, 1);
ext.vertexAttribDivisorANGLE(idx, 1)

idx++;
gl.bindBuffer(gl.ARRAY_BUFFER, rotBuffer);
gl.bufferData(gl.ARRAY_BUFFER,  rotArray, gl.STATIC_DRAW);
gl.enableVertexAttribArray(idx);
gl.vertexAttribPointer(idx, rotStride, gl.FLOAT, false, 0, 0);
//gl.vertexAttribDivisor(idx, 1);
ext.vertexAttribDivisorANGLE(idx, 1)

var img = new Image();
var texture;
img.onload = function(){
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
};
img.src = "../../assets/o/v/g/u/ovguM.png";

// physics
var world = new OIMO.World();
world.gravity = new OIMO.Vec3(0, -0.98, 0);

var genPosition = function () {
    var p = new OIMO.Vec3(Math.random() - 0.5, Math.random() + 1 , Math.random() - 0.5);
    p = new OIMO.Vec3().scale(p, 15);
    return p;
};

var ground = new OIMO.Body({size:[13, 0.1, 13], pos:[0, -10, 0], world:world});
var bodys = [];
for (var i = 0; i < max; i++) {
    var p = genPosition();
    //bodys[i] = new OIMO.Body({type:'box', size:[w*2, h*2, d*2], pos:[p.x, p.y, p.z], move:true, world:world});
    bodys[i] = new OIMO.Body({type:'box', size:[w*1, h*1, d*1], pos:[p.x, p.y, p.z], move:true, world:world});
}

var data2buf = function () {
    var pIdx = 0;
    var qIdx = 0;
    for (var i = 0; i < max; i++) {
        var p = bodys[i].body.getPosition();
        posArray[pIdx++] = p.x; 
        posArray[pIdx++] = p.y; 
        posArray[pIdx++] = p.z; 
        var q = bodys[i].body.getQuaternion();
        rotArray[qIdx++] = q.x; 
        rotArray[qIdx++] = q.y; 
        rotArray[qIdx++] = q.z; 
        rotArray[qIdx++] = q.w; 
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, posArray, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, rotBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rotArray, gl.STATIC_DRAW);
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
        fps1 = 0;
    }
    fps1++;   

    world.step();
    for (var i = 0; i < max; i++) {
        var pos  = bodys[i].body.getPosition();
        if (pos.y < -15) {
            var p = genPosition();
            bodys[i].resetPosition(p.x, p.y, p.z);
        }
    }
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
        fps0 = 0;
    }
    fps0++;
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(p1);
    //gl.drawElementsInstanced(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0, max);
    ext.drawElementsInstancedANGLE(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0, max);

    requestAnimationFrame(arguments.callee);
})();
