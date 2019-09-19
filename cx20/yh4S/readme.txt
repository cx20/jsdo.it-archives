[WebGL] PlayCanvas + glTF ファイルを試してみるテスト

＜対応した点＞
・PlayCanvas + glTF Loader を用いて glTF 2.0 形式のモデルを読み込むよう対応。

＜対応できていない点＞
・glTF-Embedded（リソースが Data URI形式）の場合は読み込めるが、リソースが別ファイルだと読み込めない模様。

＜参考＞
■ playcanvas/playcanvas-gltf
https://github.com/playcanvas/playcanvas-gltf
