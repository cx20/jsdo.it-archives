[WebGL] GLBoost を試してみるテスト（組み込み関数編）

＜対応した点＞
・極力コードを簡素化するよう対応。
・色指定を配列でなくmaterialで行うよう変更。
・メソッド名の変更に対応。
　変更前）var geometry = new GLBoost.Geometry();
　変更後）var geometry = glBoostContext.createGeometry();

＜対応できていない点＞
・あまりシンプルではない為、もう少し簡素化する仕組みが必要と思われる。

＜変更履歴＞
・2018/11/27 ライブラリを最新化。v0.0.4 に変更。
・2017/09/20 ライブラリを最新化。r2 に変更。
・2016/06/30 ライブラリを最新化。メソッド名の変更に対応。
・2016/03/20 新規作成。

＜参考＞
■ emadurandal/GLBoost
https://github.com/emadurandal/GLBoost
