[WebGL] Grimoire.js + ammo.js でドミノっぽくドット絵を作るテスト

＜対応した点＞
・ボールをドミノに変更
・grimoire-forward-shading.js を使用し light を適用するよう対応

＜変更履歴＞
2017/07/16 grimoire-preset-basic.js v1.8.8 → v1.10.18 に変更。
　　　　　・Component に attributes が必須となった為 AmmoScene に attributes を追加
　　　　　・transform.localPosition/loalRotation/localScale → transform.position/rotation/scale に変更
　　　　　・ammo.js の仕様変更対応。Ammo().then(function(Ammo) {}) を追加
2017/04/08 初版作成

＜参考＞
■ 【忙しい人向け】JavaScriptで3D物理エンジン動かしてみる (three.js + ammo.js)
http://qiita.com/daxanya1/items/79be9e0591b98196c376

■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
http://qiita.com/cx20/items/3ebed669fb9c9e797935

■ [WebGL] Grimoire.js + Oimo.js でドミノっぽくドット絵を作るテスト
http://jsdo.it/cx20/U4pp
