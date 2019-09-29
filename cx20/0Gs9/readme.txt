[WebGL] three.js を試してみるテスト（InstancedBuffer編）

r72 より WebGL 拡張の ANGLE_instanced_arrays のサポートが追加されているようです。

＜対応した点＞
・three.js r71→r72 に変更
・THREE.BufferGeometry() → THREE.InstancedBufferGeometry() に変更

＜対応できていない点＞
・ほぼサンプルのコピーです。コードの意味はまだ理解出来できていません。

＜参考＞
■ mrdoob / three.js
https://github.com/mrdoob/three.js/

■ three.js webgl - indexed instancing (single box), dynamic updates
http://threejs.org/examples/webgl_buffergeometry_instancing_dynamic.html

■ [簡易版] WebGL でドット絵を描いてみるテスト（instanced arrays 編）
http://jsdo.it/cx20/bbGE

■ WebGL: インスタンシング(instanced arrays) - wgld.org
http://wgld.org/d/webgl/w075.html
