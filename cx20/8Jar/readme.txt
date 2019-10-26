forked: Waterfall  (WebGL拡張 + Oimo.js)

＜対応した点＞
・WebGL2 サンプルを WebGL1 + 拡張機能で動作するよう調整。
　
　＜WebGL2 コード抜粋＞
　var gl = canvas.getContext("webgl2");
　gl.vertexAttribDivisor(idx, 1);
　gl.drawElementsInstanced(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0, max);

　＜WebGL1 + 拡張機能 コード抜粋＞
　var gl = canvas.getContext("webgl");
　var ext = gl.getExtension("ANGLE_instanced_arrays");
　ext.vertexAttribDivisorANGLE(idx, 1)
　ext.drawElementsInstancedANGLE(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0, max);

＜参考＞
■ forked: Waterfall (WebGL拡張 + Oimo.js)
http://jsdo.it/cx20/wqui

■ [簡易版] WebGL でドット絵を描いてみるテスト（instanced arrays 編）
http://jsdo.it/cx20/bbGE

■ WebGL: インスタンシング(instanced arrays) - wgld.org
http://wgld.org/d/webgl/w075.html
