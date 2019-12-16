webgl-debug.js で Babylon.js のサンプルをトレースしてみるテスト

＜対応した点＞
・Khronos の WebGL 用ヘルパーライブラリを使ってトレースするよう対応。
　本サンプルの実行結果はコンソール出力されます。

＜コンソール出力結果＞
BJS - [01:45:07]: Babylon.js engine (v2.6-alpha) launched
gl.depthMask(true)
gl.enable(gl.DEPTH_TEST)
gl.depthFunc(gl.LEQUAL)
gl.disable(gl.STENCIL_TEST)
gl.stencilMask(255)
gl.stencilFunc(gl.ALWAYS, 1, 255)
gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE)
gl.disable(gl.BLEND)
gl.clearColor(1, 1, 1, undefined)
gl.clearDepth(1)
gl.clearStencil(0)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)
gl.viewport(0, 0, 465, 465)
gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource([object WebGLShader], precision highp float;

attribute vec3 position;

void main() {
　  gl_Position = vec4(position, 1.0);
}
)
gl.compileShader([object WebGLShader])
