[WebGL] Three.js glTF Exporter を使ってみるテスト（その３改4）（調整中）

＜対応した点＞
・CubeGeometry → BoxBufferGeometry を使うよう対応
・サイズが縮小されていることを確認

＜Geometryの種類とファイルサイズ＞
CubeGeometry/glTF形式     ：928 KB
CubeGeometry/glb形式      ：694 KB
BoxBufferGeometry/glTF形式：502 KB
BoxBufferGeometry/glb形式 ：370 KB

＜参考＞
■ GLTFExporter generates unnecessary attributes
https://github.com/mrdoob/three.js/issues/15649
