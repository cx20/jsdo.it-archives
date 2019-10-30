[WebGL] A-Frame で glTF 2.0形式のデータを表示してみるテスト（その３）

A-Frame は WebVR に対応したタグベースの WebGL フレームワークです。レンダリングには three.js が使用されています。

＜対応した点＞
・COLLADA2GLTF で変換した glTF モデルを A-Frame で表示するよう対応。

＜参考＞
■ aframevr/aframe
https://github.com/aframevr/aframe

■ gltf-model - A-Frame
https://github.com/aframevr/aframe/blob/master/docs/components/gltf-model.md

> Using animations
> <a-entity gltf-model="#monster" animation-mixer></a-entity>
