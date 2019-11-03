// forked from cx20's "[簡易版] 30行で WebGL を試してみるテスト" http://jsdo.it/cx20/oaQC

SpiderGL.openNamespace();

function CanvasHandler() {
}

CanvasHandler.prototype = {
	onInitialize : function () {
		var gl = this.ui.gl;
		var vsSource = document.getElementById("vs").textContent;
		var fsSource = document.getElementById("fs").textContent;
		
		var vShader   = new SglVertexShader   (gl, {source: vsSource});
		var fShader   = new SglFragmentShader (gl, {source: fsSource});

		this.shaderProgram = new SglProgram(gl, {
			shaders  : [vShader, fShader],
			attributes : {
				position : 0
			}
		});

		var triangleVertices = [
			 0.0,  0.5,  0.0,  // v0
			-0.5, -0.5,  0.0,  // v1
			 0.5, -0.5,  0.0   // v2
		];

		this.triangleVertexPositionBuffer = new SglVertexBuffer(gl, {
			data : new Float32Array(triangleVertices),
			usage : gl.STATIC_DRAW
		});
	},
	
	onDraw : function () {
		var gl = this.ui.gl;
        
		this.shaderProgram.bind();
        
		this.triangleVertexPositionBuffer.vertexAttribPointer({
			index      : 0,
			size       : 3,
			glType     : gl.FLOAT,
			normalized : false,
			stride     : 0,
			offset     : 0
		});
        
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}
};

sglHandleCanvasOnLoad("c", new CanvasHandler());
