webgl-debug.js で GLBoost のサンプルをトレースしてみるテスト

＜対応した点＞
・Khronos の WebGL 用ヘルパーライブラリを使ってトレースするよう対応。
　本サンプルの実行結果はコンソール出力されます。

＜コンソール出力結果＞
gl.getExtension(OES_vertex_array_object)
gl.getExtension(WEBGL_draw_buffers)
gl.getExtension(EXT_texture_filter_anisotropic)
gl.getExtension(OES_element_index_uint)
gl.getExtension(WEBGL_depth_texture)
gl.createVertexArrayOES()
gl.bindVertexArrayOES([object WebGLVertexArrayObjectOES])
gl.createBuffer()
gl.bindVertexArrayOES([object WebGLVertexArrayObjectOES])
gl.getParameter(/*UNKNOWN WebGL ENUM*/ 0x8824)
gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource([object WebGLShader], precision highp float;
//                                                            VSDefine_VertexWorldShaderSource //
attribute vec3 aVertex_position;
varying vec4 position;
uniform mat4 worldMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
//                                                            VSDefine_VertexWorldShadowShaderSource //
uniform mat4 depthPVMatrix[1];
varying vec4 v_shadowCoord[1];
//                                                            VSDefine_DecalShaderSource //
attribute vec4 aVertex_color;
varying vec4 color;

void main(void) {
//                                                            VSTransform_VertexWorldShaderSource //
　gl_Position = worldMatrix * vec4(aVertex_position, 1.0);
　position = worldMatrix * vec4(aVertex_position, 1.0);
//                                                            VSTransform_VertexWorldShadowShaderSource //