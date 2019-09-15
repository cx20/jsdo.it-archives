[WebGL] GLBoost を試してみるテスト（phina.js編）

GLBoost は @emadurandal さんが開発中の玄人向けのWebGLライブラリです。
WebGL 1.0/2.0 対応の他、WebGL 拡張を生かした高速化対応がされているようです。

＜対応した点＞
・phina.js + GLBoost を用いて三角形を描くよう対応。
・メソッド名の変更に対応。
　変更前）var geometry = new GLBoost.Geometry();
　変更後）var geometry = glBoostContext.createGeometry();

＜変更履歴＞
2016/06/30 ライブラリを最新化。メソッド名の変更に対応。
2016/01/30 ライブラリを最新化。既定のカリングを無効化。
2016/01/17 ライブラリを最新版に差し替え。mesh → mesh / geometry に機能分割。
2015/12/12 初版作成

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost

■ [WebGL] GLBoost を試してみるテスト（tmlib.js編）
http://jsdo.it/cx20/SWec

■ [簡易版] 30行で WebGL を試してみるテスト
http://jsdo.it/cx20/oaQC

■ 各種 WebGL ライブラリで基本図形を表示してみる
http://qiita.com/cx20/items/0fa19c96aa6470d98807
