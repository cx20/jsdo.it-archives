// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト（その２）" http://jsdo.it/cx20/aeZe
// forked from cx20's "[WebGL] GLBoost + vox.js を試してみるテスト" http://jsdo.it/cx20/2Nrf
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その３）" http://jsdo.it/cx20/Elgc
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）（その２）" http://jsdo.it/cx20/Uvah
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（standalone編）" http://jsdo.it/cx20/KXXM
// forked from cx20's "[WebGL] GLBoost を試してみるテスト（phina.js編）" http://jsdo.it/cx20/SmrF
// forked from cx20's "[WebGL] GLBoost を試してみるテスト" http://jsdo.it/cx20/SWec
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

"use strict";

var stats = new Stats();
stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

var DOT_SIZE = 0.1;
var canvas = document.getElementById("world");

var renderer = new GLBoost.Renderer({ canvas: canvas, clearColor: {red:0, green:0, blue:0, alpha:1}});

var scene = new GLBoost.Scene();

class MyCustomShaderSource {
    VSDefine_MyCustomShaderSource(in_, out_, f, lights) {
        var shaderText = '';
        shaderText += `uniform float time;\n`;
        return shaderText;
    }

    VSTransform_MyCustomShaderSource(existCamera_f, f, lights) {
        var shaderText = '';
        shaderText += '  gl_Position.x = gl_Position.x + sin(time + gl_Position.y) * 2.0;\n';
        return shaderText;
    }
    FSShade_MyCustomShaderSource(f, gl, lights) {
        var shaderText = '';
        //shaderText += '  rt1 = vec4(1.0 - rt1.x, 1.0 - rt1.y, 1.0 - rt1.z, 1.0);\n';
        shaderText += '  rt1 = vec4(rt1.x, rt1.y, rt1.z, 1.0);\n';
        return shaderText;
    }
    prepare_MyCustomShaderSource(gl, shaderProgram, vertexAttribs, existCamera_f, lights) {
        var vertexAttribsAsResult = [];
        shaderProgram.time = gl.getUniformLocation(shaderProgram, 'time');
        return vertexAttribsAsResult;
    }
}

class MyCustomShader extends GLBoost.HalfLambertShader {
    constructor(canvas) {
        super(canvas);
        MyCustomShader.mixin(MyCustomShaderSource);
        this._time = 0;
    }
    setUniforms(gl, glslProgram, material) {
        super.setUniforms(gl, glslProgram, material);
        gl.uniform1f(glslProgram.time, this._time);
    }
    increaseTime(delta) {
        this._time += delta;
    }
}

var directionalLight1 = new GLBoost.DirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), new GLBoost.Vector3(1, 1,1), canvas);
scene.add( directionalLight1 );

var directionalLight2 = new GLBoost.DirectionalLight(new GLBoost.Vector3(1.0, 1.0, 1.0), new GLBoost.Vector3(-1, -1, -1), canvas);
scene.add( directionalLight2 );

var parser = new vox.Parser();
// adobe.vox
//parser.parse("/assets/Y/L/j/y/YLjy3").then(function(voxelData) {
// mario.vox
parser.parse("../../assets/m/S/B/J/mSBJ6.vox").then(function(voxelData) {
    var w = DOT_SIZE*0.8;
    var cubeGeometry = new GLBoost.Cube(new GLBoost.Vector3(w, w, w), new GLBoost.Vector4(1, 1, 1, 1), canvas);
    //var shader = new GLBoost.PhongShader(canvas);
    //var shader = new GLBoost.LambertShader(canvas);
    var shader = new MyCustomShader(canvas);
    
    var material = new GLBoost.ClassicMaterial(canvas);
    var colorHash = [];
    // 色情報を事前にハッシュテーブルに格納
    for (var i = 0; i < voxelData.voxels.length; i++) {
        var voxel = voxelData.voxels[i];
        colorHash[voxel.colorIndex] = voxel.colorIndex;
    }
    // 色毎にドットを描画
    for (var key in colorHash) {
        var c = voxelData.palette[colorHash[key]];
        material = new GLBoost.ClassicMaterial(canvas);
        material.shader = shader;
        material.baseColor = new GLBoost.Vector4(c.r / 255, c.g / 255, c.b / 255, 1.0);
        for (var j = 0; j < voxelData.voxels.length; j++) {
            var voxel = voxelData.voxels[j];
            
            // 対象となる色の場合のみドットを描画
            if (colorHash[key] == voxel.colorIndex) {
                var cube = new GLBoost.Mesh(cubeGeometry, material);
                cube.translate = new GLBoost.Vector3(
                    voxel.x * DOT_SIZE - voxelData.size.x * DOT_SIZE / 2,
                    voxel.y * DOT_SIZE - voxelData.size.y * DOT_SIZE / 2,
                    voxel.z * DOT_SIZE - voxelData.size.z * DOT_SIZE / 2
                );
                scene.add(cube);
            }
        }
    }

    
    var camera = new GLBoost.Camera({
        eye: new GLBoost.Vector3(0.0, 0.0, 3.0),
        center: new GLBoost.Vector3(0.0, 0.0, 0.0),
        up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
        fovy: 45.0,
        aspect: 1.0,
        zNear: 0.1,
        zFar: 10.0
    });

    scene.add( camera );

    scene.prepareForRender();
    
    var render = function (){
        renderer.clearCanvas();
        renderer.draw(scene);
        var rotateMatrixX = GLBoost.Matrix33.rotateX(-0.02);
        var rotateMatrixY = GLBoost.Matrix33.rotateY(-0.02);
        var rotatedVector = rotateMatrixX.multiplyVector(camera.eye);
        rotatedVector = rotateMatrixY.multiplyVector(rotatedVector);
        camera.eye = rotatedVector;

        //var myCustomShader = cubeGeometry._materials[0].shader;
        //myCustomShader.increaseTime(0.16);
        //myCustomShader.dirty = true;

        stats.update();

        requestAnimationFrame(render);
    };

    render();

});
