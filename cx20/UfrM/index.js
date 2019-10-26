// forked from cx20's "forked: WebGL 2 Samples - draw_instanced" http://jsdo.it/cx20/en7l
// forked from cx20's "[簡易版] WebGL 2.0 を試してみるテスト" http://jsdo.it/cx20/tYEN
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

(function () {
    'use strict';
    
    var canvas = document.createElement('canvas');
    canvas.width = Math.min(window.innerWidth, window.innerHeight);
    canvas.height = canvas.width;
    document.body.appendChild(canvas);
    
    var gl = canvas.getContext( 'webgl2', { antialias: false } );
    var isWebGL2 = !!gl;
    if(!isWebGL2) {
        console.log('WebGL 2 is not available.');
        return;
    }
    
    // -- Init program
    var program = createProgram(gl, getShaderSource('vs'), getShaderSource('fs'));
    var mvMatrixLocation = gl.getUniformLocation(program, 'mvMatrix');
    var pMatrixLocation = gl.getUniformLocation(program, 'pMatrix');
    var diffuseLocation = gl.getUniformLocation(program, 'diffuse');
    var displacementMapLocation = gl.getUniformLocation(program, 'displacementMap');
    
    var vertexPosBuffer = gl.createBuffer();
    var vertexTexPosBuffer = gl.createBuffer();
    var vertexNormalBuffer = gl.createBuffer();
    var vertexElementBuffer = gl.createBuffer();
    var vertexArray = gl.createVertexArray();
    var numIndices;
    var texture;
    
    // -- Load obj then render
    // plane.obj
    var objURL = '../../assets/2/4/7/z/247z3.obj';
    loadObj(objURL, function(mesh) {
        numIndices = mesh.indices.length;
        
        // -- Initialize buffer
        var positions = new Float32Array(mesh.vertices);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        var uv = new Float32Array(mesh.textures);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexPosBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        var normals = new Float32Array(mesh.vertexNormals);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        var indices = new Uint16Array(mesh.indices);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexElementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        
        // -- Initialize vertex array
        gl.bindVertexArray(vertexArray);
        var vertexPosLocation = 0; // set with GLSL layout qualifier
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
        gl.vertexAttribPointer(vertexPosLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPosLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        var vertexTexPosLocation = 1; // set with GLSL layout qualifier
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexPosBuffer);
        gl.vertexAttribPointer(vertexTexPosLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexTexPosLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        var vertexNormalLocation = 2; // set with GLSL layout qualifier
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
        gl.vertexAttribPointer(vertexNormalLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexNormalLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexElementBuffer);
        
        gl.bindVertexArray(null);
        
        // -- Init Texture
        // fuji.png
        var imageUrl = '../../assets/s/N/1/X/sN1XL.png';
        loadImage(imageUrl, function(image) {
            // -- Init 2D Texture
            texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            
            // -- Allocate storage for the texture
            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, 192, 192);
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
            
            requestAnimationFrame(render);
        });
    });
    
    // -- Initialize render variables
    var orientation = [0.0, 0.0, 0.0];
    
    var modelMatrix = mat4.create([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    
    var viewMatrix = mat4.lookAt(
        [4, 3, 100],
        [0, 0.0, 0],
        [0, 1, 0]
    );
    
    var mvMatrix = mat4.multiply(viewMatrix, modelMatrix);
    var perspectiveMatrix = mat4.perspective(0.45, 1, 1, 1000.0);
    
    // -- Mouse Behaviour
    
    var mouseDown = false;
    var lastMouseX = 0;
    var lastMouseY = 0;
    
    canvas.onmousedown = function(event) {
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    };
    
    canvas.onmouseup = function(event) {
        mouseDown = false;
    };
    
    canvas.onmousemove = function(event) {
        var newX = event.clientX;
        var newY = event.clientY;
        
        var deltaX = newX - lastMouseX;
        var deltaY = newY - lastMouseY;
        
        var m = mat4.identity();
        mat4.rotateX(m, deltaX / 100.0, m);
        mat4.rotateY(m, deltaY / 100.0, m);
        
        mat4.multiply(mvMatrix, m, mvMatrix);
        lastMouseX = newX;
        lastMouseY = newY;
    };
    
    function render() {
        // -- Render
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        gl.enable(gl.DEPTH_TEST);
        // gl.enable(gl.CULL_FACE);
        // gl.cullFace(gl.BACK);
        
        orientation[0] = 0.00020; // yaw
        orientation[1] = 0.00010; // pitch
        orientation[2] = 0.00005; // roll
        
        mvMatrix = mat4.rotateX(mvMatrix, orientation[0] * Math.PI);
        mvMatrix = mat4.rotateY(mvMatrix, orientation[1] * Math.PI);
        mvMatrix = mat4.rotateZ(mvMatrix, orientation[2] * Math.PI);
        
        gl.bindVertexArray(vertexArray);
        gl.useProgram(program);
        gl.uniformMatrix4fv(mvMatrixLocation, false, mvMatrix);
        gl.uniformMatrix4fv(pMatrixLocation, false, perspectiveMatrix);
        gl.uniform1i(diffuseLocation, 0);
        gl.uniform1i(displacementMapLocation, 0);
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        gl.drawElements(gl.TRIANGLES, numIndices, gl.UNSIGNED_SHORT, 0);
        
        requestAnimationFrame(render);
    }
    
    document.onunload = function() {
        // Delete WebGL resources
        gl.deleteBuffer(vertexPosBuffer);
        gl.deleteBuffer(vertexTexBuffer);
        gl.deleteBuffer(vertexNormalBuffer);
        gl.deleteBuffer(vertexElementBuffer);
        gl.deleteBuffer(indexBuffer);
        gl.deleteTexture(texture);
        gl.deleteProgram(program);
        gl.deleteVertexArray(vertexArray);
    };

})();