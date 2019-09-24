[WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その１０）（調整中）

＜対応しようとした点＞
・rome-gltf のサンプルを Hilo3d で表示するよう対応

＜対応できていない点＞
・ポリゴンの裏表が逆な気が。モデル側（Blender Exporter）の問題？
　本サンプルでは強制的にステータスを変更することで、対応しています。
　material.cullFace = false

＜参考＞
■ mrdoob/rome-gltf
https://github.com/mrdoob/rome-gltf

＜他ライブラリ比較＞
■ [WebGL] three.js で glTF 2.0形式のデータを表示してみるテスト（その１０）（調整中）
http://jsdo.it/cx20/mrOD
■ [WebGL] Babylon.js + glTF2FileLoader を試してみるテスト（その１０）（調整中）
http://jsdo.it/cx20/Wij6
■ [WebGL] Cesium.js で glTF 2.0形式のデータを表示してみるテスト（その１０）（調整中）
http://jsdo.it/cx20/6z4e
■ [WebGL] Grimoire.js で glTF 2.0形式のデータを表示してみるテスト（その１０）（調整中）
http://jsdo.it/cx20/0Ilj
■ [WebGL] ClayGL で glTF 2.0 モデルを表示してみるテスト（その１０）（調整中）
http://jsdo.it/cx20/suPw
■ [WebGL] QTEK で glTF 2.0 モデルを表示してみるテスト（その１０）（調整中）
http://jsdo.it/cx20/0HWS
■ [WebGL] Hilo3d で glTF 2.0 モデルを表示してみるテスト（その１０）（調整中）
http://jsdo.it/cx20/QP9W
■ [WebGL] PlayCanvas で glTF 2.0 モデルを表示してみるテスト（その１０）（調整中）
http://jsdo.it/cx20/mdUF
