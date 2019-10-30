[WebGL] A-Frame で glTF 2.0形式のデータを表示してみるテスト（その１３）（調整中）

＜対応した点＞
・ft-lab さんの glTF サンプルを Three.js を使用して表示するよう対応。

＜使用モデル＞
■ ft-lab プロジェクトファイル置き場
https://ft-lab.github.io/gltf.html

ファイル名：rocks_trees_ao.glb
形状名：Rocks and trees and grass
説明：
　木と岩と草のシーン。
　複数のテクスチャイメージと形状を使用。
　頂点カラーを使用。
　マテリアルとしてDoubleSidedを使用。
　拡散反射のマッピングレイヤで「アルファ透明」を使用(glTFのALPHA_MASK/alpha cutoffを使用)。

＜他ライブラリ比較＞
■ [WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１３）（調整中）
http://jsdo.it/cx20/Wrcg
