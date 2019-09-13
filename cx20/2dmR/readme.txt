Three.js + Oimo.js で円柱形のお菓子を落下させてみるテスト（その２）

表面がつるつるで飴っぽく見えた為、適当にの表面に凹凸を追加してみた。

＜対応した点＞
・MeshLambertMaterial() → MeshPhongMaterial() に変更
・bump テクスチャを用いて表面に凹凸を追加
（bump テクスチャは適当にノイズを追加した画像ファイル）
