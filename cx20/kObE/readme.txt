[WebGL] regl を試してみるテスト（その２）

regl は require を用いた WebGL ライブラリのようです。
jsdo.it では require は使用できない為、本サンプルは regl を単一のライブラリとして使用したサンプルになります。

＜対応した点＞
・regl を用いて四角形を描くよう対応。
・色設定用の頂点バッファを追加。
・GLSL のシェーダに色設定用変数を追加
　＜頂点シェーダ＞
　attribute vec4 color
　varying vec4 vColor;
　＜フラグメントシェーダ＞
　varying vec4 vColor;
 
＜参考＞
■ regl-project/regl
https://github.com/regl-project/regl
■ regl.party
http://regl.party/
■ WebGL にも関数型プログラミングがやってくる？ 新しい実装の形を提案する WebGL 対応ライブラリ regl
https://webgl.souhonzan.org/entry/?v=0673
■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
