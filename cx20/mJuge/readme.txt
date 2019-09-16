[WebGL] Babylon.js を試してみるテスト（その２）

＜対応した点＞
・組み込みシェーダでなく RawShaderMaterial() を用いて自前のシェーダを使うよう対応。
・色設定用の頂点バッファを追加。

＜対応できていない点＞
・Babylon.js が gl.TRIANGLES での描画にしか対応していない（gl.TRIANGLE_STRIP に対応していない？）ようだった為、
　三角形×２つで四角形として描画するよう対応。

＜参考＞
■ BabylonJS/Babylon.js
https://github.com/BabylonJS/Babylon.js

■ Babylon.js
http://www.babylonjs.com/
