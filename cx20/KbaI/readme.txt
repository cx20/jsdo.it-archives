[WebGL] PicoGL.js を試してみるテスト（その３）

＜対応した点＞
・初期加処理にて深度テストを有効化するよう修正。
　これをしないと、描画した順番で色が表示されてしまい後ろに表示されるべき面が表に表示されたりする。
　.depthTest();
・立方体に色を付けるよう対応。

＜参考＞
■ tsherif/picogl.js
https://github.com/tsherif/picogl.js

■ PicoGL.js
https://tsherif.github.io/picogl.js/

■ [簡易版] WebGL で立方体に色を付けてみるテスト
http://jsdo.it/cx20/FPzz

■ 各種 WebGL ライブラリで基本図形を表示してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
