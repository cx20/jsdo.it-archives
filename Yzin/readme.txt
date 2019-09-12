[WebGL] Grimoire.js で Cannon.js を試してみるテスト（その３）

＜対応した点＞
・ドット絵になるよう箱を配置
・Grimoire.js + Oimo.js のサンプルを Cannon.js を使用するよう移植

＜変更履歴＞
2017/12/30 grimoire-preset-basic.js v1.10.18 → v1.11.20 に変更。色の指定を albedo で行うよう変更。
2017/07/16 grimoire-preset-basic.js v1.8.8 → v1.10.18 に変更。
　　　　　・Component に attributes が必須となった為 CannonScene に attributes を追加
　　　　　・transform.localPosition/loalRotation/localScale → transform.position/rotation/scale に変更
2017/04/08 初版作成

＜参考＞
■ [WebGL] Grimoire.js で Oimo.js を試してみるテスト（その３）
http://jsdo.it/cx20/G2wl

■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
http://qiita.com/cx20/items/3ebed669fb9c9e797935
