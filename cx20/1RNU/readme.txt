Three.js + Oimo.js で消しゴムを落下させてみるテスト

＜対応した点＞
・THREE.MeshFaceMaterial() を用いて、各面に異なるテクスチャを貼るよう対応。
・THREE.BufferGeometry() を用いると、各面に異なるテクスチャを指定しても、
　最初のテクスチャが適用されるようだったので、THREE.BoxGeometry() で構築するよう変更。

＜参考＞
■ Cubeの各面に異なるマテリアルを使うときはTHREE.jsのバージョンに注意! - not good but great
http://naoyashiga.hatenablog.com/entry/2013/10/10/225740

■ Three.jsを使って画像を描画 - mwSoft
http://www.mwsoft.jp/programming/webgl/image.html
