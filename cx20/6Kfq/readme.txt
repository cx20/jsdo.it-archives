forked: WebGL拡張 + Instancing

＜対応した点＞
・WebGL2 → WebGL1 + 拡張機能で動作するよう調整
　＜WebGL2 コード抜粋＞
　var gl = getWebGLContext(canvas, "webgl2", true);
　gl.vertexAttribDivisor(shaders.planet.offsetLocation, 1);
　gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, ...);
　
　＜WebGL1 + 拡張機能 コード抜粋＞
　var gl = getWebGLContext(canvas, "webgl", true);
　var ext = gl.getExtension("ANGLE_instanced_arrays");
　ext.vertexAttribDivisorANGLE(shaders.planet.offsetLocation, 1);
　ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, ...);

＜参考＞
■ forked: Waterfall (WebGL拡張 + Oimo.js)
http://jsdo.it/cx20/wqui
■ Suikafall (WebGL拡張 + Oimo.js)
http://jsdo.it/cx20/c6JP
■ Blockfall (WebGL拡張 + Oimo.js)
http://jsdo.it/cx20/A58k
■ Teapotfall (WebGL拡張 + Oimo.js)
http://jsdo.it/cx20/uKB1
