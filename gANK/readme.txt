[WebGL] Grimoire.js + glTF ファイルを試してみるテスト（その８）（改）（調整中）

＜対応した点＞
・obj2gltf にて作成した glTF ファイルを表示するよう対応。

＜変換手順＞
1. MagicaVoxel 形式のハロウィンかぼちゃを表示
2. パレットとしてデフォルトのパレット（青色）を使用
3. MagicaVoxel で obj 形式でファイル出力
3. obj ファイルの .mtl を編集
　 .tga → .png に変更
4. paint.net でテクスチャファイルの形式を変換
　 .tga → .png にて保存
5. obj2gltf にて .obj → .gltf に変換

＜使用モデル＞
■ Q-BLOCK Create 3D Pixel Art Online
http://kyucon.com/qblock/#/34778
■ Three.jsとvox.js でMagicaVoxel作成ハロウィンのかぼちゃを表示してみるテスト
http://jsdo.it/siouxcitizen/MVdy

＜参考＞
■ MagicaVoxel - Home
https://voxel.codeplex.com/
■ paint.net - 窓の杜ライブラリ
http://forest.watch.impress.co.jp/library/software/paintdotnet/
■ AnalyticalGraphicsInc/obj2gltf
https://github.com/AnalyticalGraphicsInc/obj2gltf
