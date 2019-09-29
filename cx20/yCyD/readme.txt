[WebGL] three.js を試してみるテスト（BufferGeometry編）

three.js は Mr.doob 氏による WebGL 対応の 3D 描画ライブラリです。
WebGL の厚いラッパークラスと思っている方が多そうですが、意外と低レベルなプログラミングも出来たりします。

＜対応した点＞
・THREE.BufferGeometry() を用いて生の頂点バッファを用いるよう対応。
・組み込みシェーダでなく RawShaderMaterial() を用いて自前のシェーダを使うよう対応。

＜参考＞
■ mrdoob/three.js
https://github.com/mrdoob/three.js/

■ BufferGeometry
http://threejs.org/docs/#Reference/Core/BufferGeometry

■ three.js webgl - raw shader
http://threejs.org/examples/#webgl_buffergeometry_rawshader

■ three.jsによる HTML5 3Dグラフィックス　下
http://www.cutt.co.jp/book/978-4-87783-331-2.html

> P90～106 8.4 バッファリング
