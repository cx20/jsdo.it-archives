[WebGL] lightgl.js を試してみるテスト（VBO 編）（その３）

＜対応した点＞
・初期化処理にて深度テストを有効化するよう修正。
　これをしないと、描画した順番で色が表示されてしまい後ろに表示されるべき面が表に表示されたりする。
　gl.enable(gl.DEPTH_TEST);
・立方体に色を付けるよう対応。

＜参考＞
■ evanw/lightgl.js
https://github.com/evanw/lightgl.js/

■ [WebGL] lightgl.js を試してみるテスト（OpenGL immediate mode 編）（その３）
http://jsdo.it/cx20/elUj

■ WebGL 軽量ライブラリを比較してみる - Qiita
http://qiita.com/cx20/items/0fa19c96aa6470d98807
