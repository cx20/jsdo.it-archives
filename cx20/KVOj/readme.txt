[WebGL] ClayGL を試してみるテスト（VBO編）

ClayGL は pissang 氏による WebGL 対応の 3D 描画ライブラリです。
QTEK から改名されたようです。

＜対応した点＞
・geometry.attributes.position.fromArray() を用いて生の頂点バッファを用いるよう対応。
・組み込みシェーダでなく new clay.Shader() を用いて自前のシェーダを使うよう対応。

＜参考＞
■ pissang/claygl
https://github.com/pissang/claygl
■ ClayGL
http://claygl.xyz/

■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807
