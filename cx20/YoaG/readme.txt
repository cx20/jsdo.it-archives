[WebGL] WebGL Utils を試してみるテスト（その３）

WebGL Utils は gl-matrix.js でもお馴染みの Tojiro さんによる、軽量かつ標準的な WebGL Utilities です。

＜対応した点＞
・行列演算ライブラリとして glMatrix.js v2.3.1 を使用するよう対応。
・初期加処理にて深度テストを有効化するよう修正。
　gl.enable(gl.DEPTH_TEST);
・立方体に色を付けるよう対応。

＜参考＞
■ WebGL Utils
https://github.com/toji/webgl-utils

■ toji/gl-matrix
https://github.com/toji/gl-matrix

■ WebGL 軽量ライブラリ比較
http://qiita.com/cx20/items/0fa19c96aa6470d98807
