[WebGL] GLBoost を試してみるテスト（組み込み関数編）（その４）

＜対応した点＞
・GLBoost.Cube() で立方体を作成し、material でテクスチャを設定するよう対応。
・メソッド名の変更に対応。
　変更前）var geometry = new GLBoost.Geometry();
　変更後）var geometry = glBoostContext.createGeometry();

＜変更履歴＞
・2018/11/27 ライブラリを最新化。v0.0.4 に変更。
・2016/06/30 ライブラリを最新化。メソッド名の変更に対応。
・2016/03/20 新規作成。

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost
