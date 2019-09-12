[WebGL] Grimoire.js で Oimo.js でモデルを落下させてみるテスト

＜対応した点＞
・キューブを glTF モデルに変更
・物理演算の剛体とモデルの位置のズレを調整。
　gr("#main")("object.LOD3sp").setAttribute('position', "-0.2, -0.8, 0");

＜参考＞
■ GLBoost + Oimo.js でモデルを落下させてみるテスト（改2）
http://jsdo.it/cx20/Kx37

■ WebGLと3D物理演算ライブラリの組み合わせを試してみる
http://qiita.com/cx20/items/3ebed669fb9c9e797935
