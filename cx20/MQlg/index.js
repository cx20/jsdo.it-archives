// forked from cx20's "forked: WebGL 2 Samples - texture_vertex" http://jsdo.it/cx20/UfrM
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
    
    // -- Mouse Behaviour
    var scale = 1.0;
    var mouseDown = false;
    var lastMouseY = 0;
    window.onmousedown = function(event) {
        mouseDown = true;
        lastMouseY = event.clientY;
    };
    window.onmouseup = function(event) {
        mouseDown = false;  
    };
    window.onmousemove = function(event) {
        if(!mouseDown) {
            return;
        }
        var newY = event.clientY;
        
        var deltaY = newY - lastMouseY;
        
        scale += deltaY / 100;
        
        lastMouseY = newY;
    };
    
    // -- Divide viewport
    var windowSize = {
        x: canvas.width,
        y: canvas.height
    };
    
    var Corners = {
        TOP_LEFT: 0,
        TOP_RIGHT: 1,
        BOTTOM_RIGHT: 2,
        BOTTOM_LEFT: 3,
        MAX: 4
    };
    
    var viewport = new Array(Corners.MAX);
    
    viewport[Corners.BOTTOM_LEFT] = {
        x: 0,
        y: 0,
        z: windowSize.x / 2,
        w: windowSize.y / 2
    };
    
    viewport[Corners.BOTTOM_RIGHT] = {
        x: windowSize.x / 2,
        y: 0,
        z: windowSize.x / 2,
        w: windowSize.y / 2
    };
    
    viewport[Corners.TOP_RIGHT] = {
        x: windowSize.x / 2,
        y: windowSize.y / 2,
        z: windowSize.x / 2,
        w: windowSize.y / 2
    };
    
    viewport[Corners.TOP_LEFT] = {
        x: 0,
        y: windowSize.y / 2,
        z: windowSize.x / 2,
        w: windowSize.y / 2
    };
    
    // -- Initialize program
    var program = createProgram(gl, getShaderSource('vs'), getShaderSource('fs'));
    
    var uniformMvpLocation = gl.getUniformLocation(program, "mvp");
    var uniformDiffuseLocation = gl.getUniformLocation(program, "diffuse");
    var uniformLodBiasLocation = gl.getUniformLocation(program, "lodBias");
    
    // -- Initialize buffer
    var positions = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        1.0,  1.0,
        1.0,  1.0,
        -1.0,  1.0,
        -1.0, -1.0
    ]);
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    var texcoords = new Float32Array([
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0,
        1.0, 0.0,
        0.0, 0.0,
        0.0, 1.0
    ]);
    var vertexTexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    // -- Initialize vertex array
    var vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);
    
    var vertexPosLocation = 0; // set with GLSL layout qualifier
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.vertexAttribPointer(vertexPosLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPosLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    var vertexTexLocation = 4; // set with GLSL layout qualifier
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexBuffer);
    gl.vertexAttribPointer(vertexTexLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexTexLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    gl.bindVertexArray(null);
    
    // -- Load texture then render
    var imageUrl = '../../assets/h/s/W/8/hsW8H.jpg'; // frog.jpg
    var textures = new Array(Corners.MAX);
    loadImage(imageUrl, function(image) {
        // -- Initialize Texture
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        
        textures[Corners.TOP_LEFT] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textures[Corners.TOP_LEFT]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_LOD, 0.0);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAX_LOD, 0.0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        
        textures[Corners.TOP_RIGHT] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textures[Corners.TOP_RIGHT]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_LOD, 3.0);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAX_LOD, 3.0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        
        textures[Corners.BOTTOM_LEFT] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textures[Corners.BOTTOM_LEFT]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_LOD, 0.0);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAX_LOD, 10.0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        
        textures[Corners.BOTTOM_RIGHT] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textures[Corners.BOTTOM_RIGHT]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_LOD, 0.0);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAX_LOD, 10.0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        
        render();
    });
    
    function render() {
        // Clear color buffer
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        // Bind program
        gl.useProgram(program);
        
        var matrix = new Float32Array([
            scale, 0.0, 0.0, 0.0,
            0.0, scale, 0.0, 0.0,
            0.0, 0.0, scale, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
        gl.uniformMatrix4fv(uniformMvpLocation, false, matrix);
        gl.uniform1i(uniformDiffuseLocation, 0);
        
        gl.activeTexture(gl.TEXTURE0);
        
        gl.bindVertexArray(vertexArray);
        
        var lodBiasArray = [0.0, 0.0, 3.5, 4.0];
        for (var i = 0; i < Corners.MAX; ++i) {
            gl.viewport(viewport[i].x, viewport[i].y, viewport[i].z, viewport[i].w);
            gl.uniform1f(uniformLodBiasLocation, lodBiasArray[i]);
            gl.bindTexture(gl.TEXTURE_2D, textures[i]);
            gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, 1);
        }
        
        requestAnimationFrame(render);
    }
    
    window.onunload = function() {
        // -- Delete WebGL resources
        gl.deleteBuffer(vertexPosBuffer);
        gl.deleteBuffer(vertexTexBuffer);
        for (var j = 0; j < textures.length; ++j) {
            gl.deleteTexture(textures[j]);
        }
        gl.deleteVertexArray(vertexArray);
        gl.deleteProgram(program);
    };

})();