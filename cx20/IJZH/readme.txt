webgl-debug.js で WebGL 2.0 のサンプルをトレースしてみるテスト

＜対応した点＞
・Khronos の WebGL 用ヘルパーライブラリを使ってトレースするよう対応。
　本サンプルの実行結果はコンソール出力されます。

＜コンソール出力結果＞
gl.createProgram()
gl.createShader(gl.VERTEX_SHADER)
gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource([object WebGLShader], #version 300 es
in　vec3 position;

void main() {
　　gl_Position = vec4(position, 1.0);
}
)
gl.shaderSource([object WebGLShader], #version 300 es
precision mediump float;
out vec4 fragColor;

void main() {
　　fragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
gl.compileShader([object WebGLShader])
gl.compileShader([object WebGLShader])
gl.getShaderInfoLog([object WebGLShader])
gl.getShaderInfoLog([object WebGLShader])
gl.attachShader([object WebGLProgram], [object WebGLShader])
gl.attachShader([object WebGLProgram], [object WebGLShader])
gl.linkProgram([object WebGLProgram])
gl.useProgram([object WebGLProgram])
gl.getAttribLocation([object WebGLProgram], position)
gl.enableVertexAttribArray(0)
gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, [object WebGLBuffer])
gl.bufferData(gl.ARRAY_BUFFER, 0,0.5,0,-0.5,-0.5,0,0.5,-0.5,0, gl.STATIC_DRAW)
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
gl.drawArrays(gl.TRIANGLES, 0, 3)
gl.flush()
