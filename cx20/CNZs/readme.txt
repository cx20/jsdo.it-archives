[WebGL] Three.js glTF Exporter を使ってみるテスト（その２改3）

＜対応した点＞
・出力する対象から POSITION 以外の属性（NORMAL / TEXTURE）を除去するよう対応。

＜対応できていない点＞
・POSITION 以外の属性（NORMAL / TEXTURE）を除去した場合、ファイルのエクスポートは可能だが画面が表示されない。

＜Geometryの種類とファイルサイズ＞
CubeGeometry/glTF形式 ：561 KB （Draco圧縮：未サポート）
CubeGeometry/glb形式 ：419 KB（Draco圧縮：未サポート）
BoxBufferGeometry/glTF形式：305 KB（Draco圧縮：18 KB）
BoxBufferGeometry/glb形式 ：225 KB（Draco圧縮：9 KB）
BoxBufferGeometry属性除去対応/glTF形式：135 KB（Draco圧縮：13 KB）
BoxBufferGeometry属性除去対応/glb形式 ：98 KB（Draco圧縮：6 KB）

