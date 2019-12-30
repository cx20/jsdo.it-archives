three.js で Draco 形式のデータを表示してみるテスト（改）

Draco 形式は Google の提唱する新しい 3D Mesh の圧縮形式です。

＜対応した点＞
・モデルを複製しないよう対応。

表示モデル：
(25143) Itokawa - 3D Asteroid Catalogue
https://space.frieger.com/asteroids/asteroids/25143-Itokawa
Itokawa (Hayabusa, 200k poly) (OBJ 6.6 MB)
https://space.frieger.com/asteroids/data/asteroids/models/i/25143_Itokawa_200k.obj
→ Draco 形式に変換して使用（6.6MB → 212KB）

＜参考＞
■ google/draco
https://github.com/google/draco#threejs-renderer-example
■ three.js webgl - loaders - Draco loader
https://storage.googleapis.com/demos.webmproject.org/draco/draco_loader_throw.html
