[WebGL] WebGLU を試してみるテスト（その２）

＜対応した点＞
・四角形の頂点バッファに個別に色を設定するよう対応。

＜対応していない点＞
・シェーダはライブラリに組み込みのものを使用しています。
・ライブラリ既定の描画処理は drawArrays() でなく drawElements() が用いられるようです。

＜参考＞
■ OneGeek/WebGLU
https://github.com/OneGeek/WebGLU
