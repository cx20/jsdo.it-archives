[WebGL] GLBoost を試してみるテスト（standalone編）（その３）

GLBoost は @emadurandal さんが鋭意開発中の玄人向けのWebGLライブラリです。
今後仕様変更が入る可能性があります。本サンプルを使用される場合はご注意ください。

＜対応した点＞
・GLBoost のみで立方体を描くよう対応。
・ライブラリ組み込みの行列演算関数を用いて立方体を回転させるよう対応。
・箱が閉じるよう CULL_FACE を無効化

＜変更履歴＞
・2018/11/27 ライブラリを最新化。v0.0.4 に変更。
・2017/01/21 ライブラリを r1 に変更。render と camera の仕様変更に対応。また頂点データを配列で指定するよう変更。
　変更前）scene.prepareForRender()
　変更後）expression.prepareToRender()
　変更前）glBoostContext.createCamera()
　変更後）glBoostContext.createPerspectiveCamera()
・2016/06/30 ライブラリを最新化。メソッド名の変更に対応。
　変更前）var geometry = new GLBoost.Geometry();
　変更後）var geometry = glBoostContext.createGeometry();
・2016/03/20 ライブラリを最新化。WebGL Insight Chrome 拡張に対応。
・2016/01/30 ライブラリを最新化。既定のカリングを無効化。
・2016/01/17 ライブラリを最新化。
・2015/12/20 GLBoost 最新化。Mesh の仕様変更に伴う対応。
・2015/12/12 新規作成

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost
■ [WebGL] GLBoost を試してみるテスト（phina.js編）（その３）
http://jsdo.it/cx20/aODs
■ [WebGL] GLBoost を試してみるテスト（tmlib.js編）（その３）
http://jsdo.it/cx20/wKvY
■ [簡易版] WebGL で立方体に色を付けてみるテスト
http://jsdo.it/cx20/FPzz
■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807
