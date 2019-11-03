[WebGL] regl を試してみるテスト（その３）

regl は require を用いた WebGL ライブラリのようです。
jsdo.it では require は使用できない為、本サンプルは regl を単一のライブラリとして使用したサンプルになります。

＜対応した点＞
・立方体に色を付けるよう対応。
・行列演算ライブラリを使用するよう対応。

＜対応できていない点＞
・サイズ変更を position を *2.0 することで行っている。mat4.scale を使用するよう変更したい。

＜参考＞
■ regl-project/regl
https://github.com/regl-project/regl
■ regl.party
http://regl.party/
■ stackgl/gl-mat4
https://github.com/stackgl/gl-mat4
■ WebGL にも関数型プログラミングがやってくる？ 新しい実装の形を提案する WebGL 対応ライブラリ regl
https://webgl.souhonzan.org/entry/?v=0673
■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
