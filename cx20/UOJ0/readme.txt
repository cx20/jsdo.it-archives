[WebGL] Grimoire.js で Draco 形式のファイルを読み込んでみるテスト

Draco 形式は Google の提唱する新しい 3D Mesh の圧縮形式です。

＜対応した点＞
・頂点データを Draco 形式で用意するよう対応。
・index の数が 16bit の上限を超えたため、OES_element_index_uint 拡張を使用するよう変更。

表示モデル：
(25143) Itokawa - 3D Asteroid Catalogue
https://space.frieger.com/asteroids/asteroids/25143-Itokawa
Itokawa (Hayabusa, 200k poly) (OBJ 6.6 MB)
https://space.frieger.com/asteroids/data/asteroids/models/i/25143_Itokawa_200k.obj
→ Draco 形式に変換して使用（6.6MB → 212KB）

＜変更履歴＞
2017/07/09 grimoire-preset-basic.js v1.8.6 → v1.10.16 に変更。スクリプトタグに記載したシェーダをマテリアル名で参照するよう対応。
2017/03/20 初版作成

＜参考＞
■ google/draco
https://github.com/google/draco#javascript-decoder-api

■ three.js webgl - loaders - Draco loader
https://storage.googleapis.com/demos.webmproject.org/draco/draco_loader_throw.html

■ [簡易版] WebGL で小惑星に光を当ててみるテスト（その３）
http://jsdo.it/cx20/kWuS

■ three.js で Draco 形式のデータを表示してみるテスト（改）
http://jsdo.it/cx20/y3XD

■ GLBoost で Draco 形式のデータを表示してみるテスト（調整中）
http://jsdo.it/cx20/M6uB
