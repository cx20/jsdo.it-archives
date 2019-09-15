[WebGL] GLBoost + LiquidFun を試してみるテスト（その３改）

GLBoost は emadurandal が開発中の WebGL ライブラリです。開発初期である為、今後仕様変更があるかもしれないとのことです。

＜対応した点＞
・GLBoost を最新版に変更。
　色がつかないのはライブラリ側の問題だったようです。

＜参考＞
■ ParticleクラスのupdateVertexDataで、colorを指定していない場合、1,1,1,1が適用されてしまう問題
https://github.com/emadurandal/GLBoost/issues/49
