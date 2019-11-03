// forked from cx20's "[WebGL] SpiderGL を試してみるテスト（その３）" http://jsdo.it/cx20/ymPN
// forked from cx20's "[WebGL] SpiderGL を試してみるテスト（その２）" http://jsdo.it/cx20/kbMz
// forked from cx20's "[WebGL] SpiderGL を試してみるテスト" http://jsdo.it/cx20/jKwi
// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

SpiderGL.openNamespace();

function CanvasHandler() {
}

CanvasHandler.prototype = {
    onInitialize : function () {
        var gl    = this.ui.gl;
        
        var vsSource = document.getElementById("vs").textContent;
        var fsSource = document.getElementById("fs").textContent;

        var vShader = new SglVertexShader   (gl, {source: vsSource});
        var fShader = new SglFragmentShader (gl, {source: fsSource});

        this.shaderProgram = new SglProgram(gl, {
            autoLink : true,
            shaders  : [vShader, fShader],
            attributes : {
                position : 0,
                texcoord : 1
            },
            uniforms : {
                uModelViewProjectionMatrix: SglMat4.identity(),
                texture : 0
            }
        });

        // 立方体の座標データを用意
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
        var cubeVertices = [
            // Front face
            -0.5, -0.5,  0.5, // v0
             0.5, -0.5,  0.5, // v1
             0.5,  0.5,  0.5, // v2
            -0.5,  0.5,  0.5, // v3
            // Back face
            -0.5, -0.5, -0.5, // v4
             0.5, -0.5, -0.5, // v5
             0.5,  0.5, -0.5, // v6
            -0.5,  0.5, -0.5, // v7
            // Top face
             0.5,  0.5,  0.5, // v2
            -0.5,  0.5,  0.5, // v3
            -0.5,  0.5, -0.5, // v7
             0.5,  0.5, -0.5, // v6
            // Bottom face
            -0.5, -0.5,  0.5, // v0
             0.5, -0.5,  0.5, // v1
             0.5, -0.5, -0.5, // v5
            -0.5, -0.5, -0.5, // v4
             // Right face
             0.5, -0.5,  0.5, // v1
             0.5,  0.5,  0.5, // v2
             0.5,  0.5, -0.5, // v6
             0.5, -0.5, -0.5, // v5
             // Left face
            -0.5, -0.5,  0.5, // v0
            -0.5,  0.5,  0.5, // v3
            -0.5,  0.5, -0.5, // v7
            -0.5, -0.5, -0.5  // v4
        ];
        this.cubeVertexPositionBuffer = new SglVertexBuffer(gl, {
            data : new Float32Array(cubeVertices),
            usage : gl.STATIC_DRAW
        });

        var cubeTextureCoords = [
            // Front face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Back face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Top face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Bottom face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Right face
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            // Left face
            1, 0,
            0, 0,
            0, 1,
            1, 1
        ];
        this.cubeVertexTexCoordBuffer = new SglVertexBuffer(gl, {
            data : new Float32Array(cubeTextureCoords),
            usage : gl.STATIC_DRAW
        });

        var cubeIndicesTriangles = [
             0,  1,  2,    0,  2 , 3,  // Front face
             4,  5,  6,    4,  6 , 7,  // Back face
             8,  9, 10,    8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15,  // Bottom face
            16, 17, 18,   16, 18, 19,  // Right face
            20, 21, 22,   20, 22, 23   // Left face
        ];

        this.cubeVertexIndexBufferT = new SglIndexBuffer(gl, {
            data : new Uint16Array(cubeIndicesTriangles),
            usage : gl.STATIC_DRAW
        });

        this.cubeVertexIndexBufferT.numItems = 36;

        this.primitives            = gl.TRIANGLES;
        this.cubeVertexIndexBuffer = this.cubeVertexIndexBufferT;

        this.texture = new SglTexture2D(gl, "../../assets/A/k/w/j/AkwjW.jpg", {  // frog.jpg
            onSuccess : function () {
                ui.postDrawEvent();
            }
        });

        this.angle                 = -45.0;
        this.rate                  =  60.0;
        this.ui.animateRate        =  60.0;

        this.xform    = new SglTransformationStack();
    },

    onAnimate : function (dt) {
        this.angle += 90.0 * dt;
        this.ui.postDrawEvent();
    },

    onDraw : function () {

        var gl       = this.ui.gl;
        var w        = this.ui.width;
        var h        = this.ui.height;
        var xform    = this.xform;

        gl.enable(gl.DEPTH_TEST);

        this.shaderProgram.bind();

        xform.projection.loadIdentity();
        xform.projection.perspective(sglDegToRad(45.0), w/h, 0.1, 100.0);

        xform.view.loadIdentity();
        xform.view.lookAt([0.0, 2.0, 2.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

        xform.model.loadIdentity();
        xform.model.rotate(sglDegToRad(this.angle), [1.0, 1.0, 1.0]);
        xform.model.scale([1.0, 1.0, 1.0]);

        this.shaderProgram.setUniforms({
            uModelViewProjectionMatrix : xform.modelViewProjectionMatrix
        });

        this.cubeVertexPositionBuffer.vertexAttribPointer({
            index      : 0,
            size       : 3,
            glType     : gl.FLOAT,
            normalized : false,
            stride     : 0,
            offset     : 0,
            enable     : true
        });

        this.cubeVertexTexCoordBuffer.vertexAttribPointer({
            index      : 1,
            size       : 2,
            glType     : gl.FLOAT,
            normalized : false,
            stride     : 0,
            offset     : 0,
            enable     : true
        });

        this.texture.bind();

        this.cubeVertexIndexBuffer.drawElements({
            glMode : this.primitives,
            count  : this.cubeVertexIndexBuffer.numItems,
            glType : gl.UNSIGNED_SHORT,
            offset : 0
        });
    }
};

sglHandleCanvasOnLoad("c", new CanvasHandler());
