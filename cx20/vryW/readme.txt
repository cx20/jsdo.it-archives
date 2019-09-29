[WebGL] three.js を試してみるテスト（BufferGeometry編）（その２）

＜対応した点＞
・組み込みシェーダでなく RawShaderMaterial() を用いて自前のシェーダを使うよう対応。
・色設定用の頂点バッファを追加。

＜対応できていない点＞
・他のサンプルと同様に gl.TRIANGLE_STRIP で四角形を描画しようと試みたが
　three.js が gl.TRIANGLES での描画にしか対応していないようだった為、
　三角形×２つで四角形として描画するよう対応。

＜参考＞
■ mrdoob/three.js
https://github.com/mrdoob/three.js/

■ BufferGeometry
http://threejs.org/docs/#Reference/Core/BufferGeometry

■ three.js webgl - raw shader
http://threejs.org/examples/#webgl_buffergeometry_rawshader
