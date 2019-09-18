[WebGL] Babylon.js で PBR を試してみるテスト（その２改）（調整中）

＜対応した点＞
・Babylon.js の PBRMetallicRoughnessMaterial で PBR テクスチャを使用するよう対応。
・複数のテクスチャ（Occlusion / Roughness / Metallic）を１枚に合成して使うよう対応。

＜対応できていない点＞
・テクスチャの向きが three.js の時と異なる。

＜参考＞
■ Brick Wall 02 - Free PBR Texture from cgbookcase.com
https://www.cgbookcase.com/textures/brick-wall-02
■ three.js使いこなし - three.jsの物理ベースレンダリング - CodeGrid.
https://app.codegrid.net/entry/threejs-1
■ Art Pipeline for glTF
https://www.khronos.org/blog/art-pipeline-for-gltf

＜他ライブラリ比較＞
■ [WebGL] three.jsで PBR を試してみるテスト（調整中）
http://jsdo.it/cx20/ujl9
■ [WebGL] Babylon.js で PBR を試してみるテスト（その２改）（調整中）
http://jsdo.it/cx20/O60f
■ [WebGL] GLBoost で PBR を試してみるテスト（その２改）（調整中）
http://jsdo.it/cx20/yMD9
