[WebGL] Grimoire.js + glTF + パレットテスト（その１）

＜対応した点＞
・obj2gltf にて作成した glTF ファイルを表示するよう対応。

＜変換手順＞
1. MagicaVoxel デフォルトのモデルを表示
2. パレットとしてデフォルトのパレット（青色）を使用
3. MagicaVoxel で obj 形式でファイル出力
3. obj ファイルの .mtl を編集
　 .tga → .png に変更
4. paint.net でテクスチャファイルの形式を変換
　 .tga → .png にて保存
5. obj2gltf にて .obj → .gltf に変換

＜変更履歴＞
2017/03/12 grimoirejs-preset-basic＠1.9.7 + grimoirejs-gltf＠1.8.8。テクスチャのリサイズの問題解消。
2017/03/11 grimoirejs-preset-basic＠1.9.6 + grimoirejs-gltf＠1.8.8。テクスチャのリサイズの問題あり。

＜参考＞
■ MagicaVoxel - Home
https://voxel.codeplex.com/
■ paint.net - 窓の杜ライブラリ
http://forest.watch.impress.co.jp/library/software/paintdotnet/
■ AnalyticalGraphicsInc/obj2gltf
https://github.com/AnalyticalGraphicsInc/obj2gltf
