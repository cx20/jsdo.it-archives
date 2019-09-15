GLBoost + Oimo.js で箱をランダムに落下させてみるテスト（その２）

＜対応した点＞
・カメラの向きを下向きに変更
　＜変更前＞
　eye: 　 new GLBoost.Vector3(0, 100, 400),
　center: new GLBoost.Vector3(0.0, 0.0, 0.0),
　up: 　　new GLBoost.Vector3(0.0, 1.0, 0.0)
　＜変更後＞
　eye: 　 new GLBoost.Vector3(0, 300, 0),
　center: new GLBoost.Vector3(0.0, 0.0, 0.0),
　up: 　　new GLBoost.Vector3(1.0, 0.0, 0.0) // Upベクトルはカメラの方向と直角になるよう設定する

＜参考＞
■ 月のクレーターにボールを落下させてみるテスト
http://jsdo.it/cx20/gsO2
