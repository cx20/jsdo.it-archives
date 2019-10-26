// forked from cx20's "forked: WebGL 2 Instancing" http://jsdo.it/cx20/9OoF
// forked from cx20's "[簡易版] WebGL 2.0 を試してみるテスト" http://jsdo.it/cx20/tYEN
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

var gl;
var ext;
var canvas;

var firstRenderInterval;
var startTime;
var lastTimeStamp;
var lastFpsTimeStamp;
var framesPerSecond = 0;
var frameCount = 0;
var timeFactor = 0;

var hudScope;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (gl !== null) {
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    }
}

function loadTextures() {
    textures.colorMapDay = loadTexture("../../assets/f/a/y/7/fay7g.jpg"); // plutomap1k.jpg
    textures.colorMapNight = loadTexture("../../assets/o/s/6/t/os6tk.jpg"); // plutonight1k.jpg
}

function setMatrixUniforms() {
    
    mat4.perspective(pMatrix, (90 + (Math.sin(shaderDegreeTimer * rad_to_deg * 0.015)) * 15) * deg_to_rad, gl.viewportWidth/gl.viewportHeight, 1, 1024);
    mat4.identity(mvMatrix);
    mat4.rotate(mvMatrix, mvMatrix, rotation, [0, 0, 1]);
    mat4.translate(mvMatrix, mvMatrix, [0, 0, -3]);
    
    mat3.fromMat4(uNormalMatrix, mvMatrix);
    mat3.invert(uNormalMatrix, uNormalMatrix);
    mat3.transpose(uNormalMatrix, uNormalMatrix);
    
    gl.useProgram(shaders.planet);
    gl.uniformMatrix4fv(shaders.planet.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaders.planet.mvMatrixUniform, false, mvMatrix);
    gl.uniformMatrix3fv(shaders.planet.normalMatrixUniform, false, uNormalMatrix);
}

function webGLStart() {
    canvas = document.getElementById("rendercanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl = getWebGLContext(canvas, "experimental-webgl", true);
    ext = gl.getExtension("ANGLE_instanced_arrays");
    
    initScene();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    
    startTime = window.webkitAnimationStartTime || window.mozAnimationStartTime || new Date().getTime();
    lastTimeStamp = startTime;
    lastFpsTimeStamp = startTime;
    
    firstRenderInterval = setInterval(render, 150);
}

function initScene() {
    loadShaders();
    
    generateSphere(0.35, 32);
    generateInstancingBuffers(20, 1);
    
    loadTextures();
    
    gl.uniform1i(gl.getUniformLocation(shaders.planet, "uColorMapDay"), 0);
    gl.uniform1i(gl.getUniformLocation(shaders.planet, "uColorMapNight"), 1);
}


function renderScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    setMatrixUniforms();
    
    // Bind day and night planet color map
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures.colorMapDay);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textures.colorMapNight);
    
    gl.useProgram(shaders.planet);
    
    gl.uniform1f(gl.getUniformLocation(shaders.planet, "cos_time_0_2PI"), Math.sin(shaderDegreeTimer));
    gl.uniform1f(gl.getUniformLocation(shaders.planet, "sin_time_0_2PI"), Math.cos(shaderDegreeTimer));
    gl.uniform1f(gl.getUniformLocation(shaders.planet, "season"), 0.5);
    
    gl.enableVertexAttribArray(shaders.planet.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaders.planet.normalAttribute);
    gl.enableVertexAttribArray(shaders.planet.texcoordAttribute);
    gl.enableVertexAttribArray(shaders.planet.colorLocation);
    gl.enableVertexAttribArray(shaders.planet.offsetLocation);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoords);
    gl.vertexAttribPointer(shaders.planet.texcoordAttribute, buffers.textureCoords.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normals);
    gl.vertexAttribPointer(shaders.planet.normalAttribute, buffers.normals.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertices);
    gl.vertexAttribPointer(shaders.planet.vertexPositionAttribute, buffers.vertices.itemSize, gl.FLOAT, false, 0, 0);
    
    // Instanced position data
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.instancingOffsets);
    gl.vertexAttribPointer(shaders.planet.offsetLocation, 3, gl.FLOAT, false, 12, 0);
    // gl.vertexAttribDivisor sets the vertex attribute increment per instance
    //gl.vertexAttribDivisor(shaders.planet.offsetLocation, 1);
    ext.vertexAttribDivisorANGLE(shaders.planet.offsetLocation, 1);
    
    // Instanced color data
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.instancingColors);
    gl.vertexAttribPointer(shaders.planet.colorLocation, 4, gl.FLOAT, false, 16, 0);
    //gl.vertexAttribDivisor(shaders.planet.colorLocation, 1);
    ext.vertexAttribDivisorANGLE(shaders.planet.colorLocation, 1);
    
    // Render our planet mesh instanceCount times with one single command
    //gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, buffers.vertices.numItems, instanceCount);
    ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, buffers.vertices.numItems, instanceCount);
}

function render() {
    clearInterval(firstRenderInterval);
    
    time = window.webkitAnimationStartTime || window.mozAnimationStartTime || new Date().getTime();
    
    if(time - lastFpsTimeStamp >= 1000) {
        framesPerSecond = frameCount;
        frameCount = 0;
        lastFpsTimeStamp = time;
        hudScope.$apply('fps = "' + framesPerSecond + ' fps"');
    }
    
    requestAnimationFrame(render);
    renderScene();
    
    timeFactor = (time - lastTimeStamp) * 0.1;
    
    ++frameCount;
    lastTimeStamp = time;
    
    shaderDegreeTimer -= timeFactor * 0.005;
    if (shaderDegreeTimer > 360) {
        shaderDegreeTimer -= 360;
    }
    
    rotation += timeFactor * 0.0005;
    if (rotation > 360) {
        rotation -= 360;
    }
}

angular.module("hud", []).
controller("hudController", function($scope){
    $scope.fps = "0 fps";
});
angular.bootstrap(document.getElementById("hud"), ["hud"]);
hudScope = angular.element(document.getElementById("hud")).scope();

webGLStart();

window.addEventListener('resize', resizeCanvas, false);
