webgl-debug.js で Three.js のサンプルをトレースしてみるテスト

＜対応した点＞
・Khronos の WebGL 用ヘルパーライブラリを使ってトレースするよう対応。
　本サンプルの実行結果はコンソール出力されます。

＜コンソール出力結果＞
gl.createProgram()
gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource([object WebGLShader], 
attribute vec3 position;

void main() {
　  gl_Position = vec4(position, 1.0);
}
)
gl.compileShader([object WebGLShader])
gl.getShaderParameter([object WebGLShader], gl.COMPILE_STATUS)
gl.getShaderInfoLog([object WebGLShader])
gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource([object WebGLShader], 
precision mediump float;

void main() {
　  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
)
gl.compileShader([object WebGLShader])
gl.getShaderParameter([object WebGLShader], gl.COMPILE_STATUS)
gl.getShaderInfoLog([object WebGLShader])