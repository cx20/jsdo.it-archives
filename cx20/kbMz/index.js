// forked from cx20's "[WebGL] SpiderGL を試してみるテスト" http://jsdo.it/cx20/jKwi
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
				position : 0,
				color : 1
			}
		});

		// 正方形の座標データを用意
		//             1.0 y 
		//              ^  -1.0 
		//              | / z
		//              |/       x
		// -1.0 -----------------> +1.0
		//            / |
		//      +1.0 /  |
		//           -1.0
		// 
		//        [0]------[1]
		//         |        |
		//         |        |
		//         |        |
		//        [2]------[3]
		//
		var squareVertices = [
			-0.5, 0.5, 0.0, // v0
			 0.5, 0.5, 0.0, // v1 
			-0.5,-0.5, 0.0, // v2
			 0.5,-0.5, 0.0  // v3
		];

		this.squareVertexPositionBuffer = new SglVertexBuffer(gl, {
			data : new Float32Array(squareVertices),
			usage : gl.STATIC_DRAW
		});

		var squareColors = [
			1.0, 0.0, 0.0, 1.0, // v0
			0.0, 1.0, 0.0, 1.0, // v1
			0.0, 0.0, 1.0, 1.0, // v2
			1.0, 1.0, 0.0, 1.0  // v3
		];

		this.squareVertexColorBuffer = new SglVertexBuffer(gl, {
			data  : new Float32Array(squareColors), 
			usage : gl.STATIC_DRAW 
		});
	},
	
	onDraw : function () {
		var gl = this.ui.gl;
        
		this.shaderProgram.bind();
        
		this.squareVertexPositionBuffer.vertexAttribPointer({
			index      : 0,
			size       : 3,
			glType     : gl.FLOAT,
			normalized : false,
			stride     : 0,
			offset     : 0
		});
        
		this.squareVertexColorBuffer.vertexAttribPointer({
			index     : 1, 
			size      : 4, 
			glType    : gl.FLOAT, 
			normalized: false, 
			stride    : 0, 
			offset    : 0, 
			enable    : true 
		});
			
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
};

sglHandleCanvasOnLoad("c", new CanvasHandler());
