Three.js + ammo.js でドット絵を落下させてみるテスト

＜対応した点＞
・立方体をドット絵になるよう配置。

＜更新履歴＞
2017/07/16 ammo.js の仕様変更対応。Ammo().then(function(Ammo) {}) を追加
2015/11/28 タイトルの「（失敗）」を削除。
　Three.jsのバージョンを「r60」→「r73」に変更。ammo.js の URL を変更。
　回転が粗ぶっていた為、反発係数を1→0.6に変更。
　ammo.js のクォータニオンを three.js のオイラー角に変換していた箇所を修正。
2014/07/05 初版

＜参考＞
■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
http://qiita.com/cx20/items/3ebed669fb9c9e797935

＜ドット絵を落下させてみるシリーズ＞
■ Three.js + Oimo.js でドット絵を落下させるテスト
http://jsdo.it/cx20/voHQ
■ Three.js + Cannon.js でドット絵を落下させてみるテスト
http://jsdo.it/cx20/7Zay
■ Three.js + ammo.js でドット絵を落下させてみるテスト
http://jsdo.it/cx20/k77l
■ CubicVR.js + ammo.jsでドット絵を落下させるテスト
http://jsdo.it/cx20/cjyn
■ Babylon.js で Cannon.js を使ってみるテスト
http://jsdo.it/cx20/2Pre
