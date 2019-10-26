// forked from cx20's "forked: WebGL 2 Samples - texture_lod" http://jsdo.it/cx20/MQlg
// forked from cx20's "forked: WebGL 2 Samples - texture_vertex" http://jsdo.it/cx20/UfrM
// forked from cx20's "forked: WebGL 2 Samples - draw_instanced" http://jsdo.it/cx20/en7l
// forked from cx20's "[簡易版] WebGL 2.0 を試してみるテスト" http://jsdo.it/cx20/tYEN
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

(function () {
    'use strict';

    var canvas = document.createElement('canvas');
    canvas.height = window.innerHeight;
    canvas.width = canvas.height * 64 / 64;
    document.body.appendChild(canvas);

    var gl = canvas.getContext( 'webgl2', { antialias: false } );
    var isWebGL2 = !!gl;
    if(!isWebGL2) {
        console.log('WebGL 2 is not available.');
        return;
    }

    // -- Init program
    var program = createProgram(gl, getShaderSource('vs'), getShaderSource('fs'));
    var mvpLocation = gl.getUniformLocation(program, 'MVP');
    var diffuseLocation = gl.getUniformLocation(program, 'diffuse');
    var layerLocation = gl.getUniformLocation(program, 'layer');

    // -- Init buffers
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

    var texCoords = new Float32Array([
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0,
        1.0, 0.0,
        0.0, 0.0,
        0.0, 1.0
    ]);
    var vertexTexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // -- Init VertexArray
    var vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);

    var vertexPosLocation = 0; // set with GLSL layout qualifier
    gl.enableVertexAttribArray(vertexPosLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.vertexAttribPointer(vertexPosLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexTexLocation = 4; // set with GLSL layout qualifier
    gl.enableVertexAttribArray(vertexTexLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexBuffer);
    gl.vertexAttribPointer(vertexTexLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindVertexArray(null);
    
    var texture = gl.createTexture();
    // run2.png
    loadImage('../../assets/A/E/H/p/AEHpj.png', function(image){
        var NUM_IMAGES = 20;
        var IMAGE_SIZE = {
            width: 64,
            height: 64
        };
        // use canvas to get the pixel data array of the image
        var canvas = document.createElement('canvas');
        canvas.width = IMAGE_SIZE.width;
        canvas.height = IMAGE_SIZE.height * NUM_IMAGES;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        var imageData = ctx.getImageData(0, 0, IMAGE_SIZE.width, IMAGE_SIZE.height * NUM_IMAGES);
        var pixels = new Uint8Array(imageData.data.buffer);
        
        // -- Init Texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage3D(
            gl.TEXTURE_2D_ARRAY,
            0,
            gl.RGBA,
            IMAGE_SIZE.width,
            IMAGE_SIZE.height,
            NUM_IMAGES,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixels
        );
        
        gl.useProgram(program);
        gl.bindVertexArray(vertexArray);
        
        var matrix = new Float32Array([
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
        gl.uniformMatrix4fv(mvpLocation, false, matrix);
        gl.uniform1i(diffuseLocation, 0);
        
        var frame = 0;
        (function render() {
            // -- Render
            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform1i(layerLocation, frame);
            
            frame = (frame + 1) % NUM_IMAGES;
            
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            
            setTimeout( function(){
                requestAnimationFrame(render);
            }, 50);
        })();
    });
    
    // If you have a long-running page, and need to delete WebGL resources, use:
    //
    // gl.deleteBuffer(vertexPosBuffer);
    // gl.deleteBuffer(vertexTexBuffer);
    // gl.deleteTexture(texture);
    // gl.deleteProgram(program);
    // gl.deleteVertexArray(vertexArray);
})();