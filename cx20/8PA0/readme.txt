[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その２）

＜対応した点＞
・四角形を GLBoost.Plane() で作成するよう対応。
・updateVerticesData() を用いて頂点毎に色指定を行うよう対応。
・メソッド名の変更に対応。
　変更前）var geometry = new GLBoost.Geometry();
　変更後）var geometry = glBoostContext.createGeometry();

＜変更履歴＞
・2018/11/27 ライブラリを最新化。v0.0.4 に変更。
・2017/09/20 ライブラリを最新化。r2。createCamera → createPerspectiveCamera
・2016/06/30 ライブラリを最新化。メソッド名の変更に対応。
・2016/03/20 新規作成。

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost
