GLBoost + Oimo.js で箱をランダムに落下させてみるテスト（その３）

＜対応した点＞
・カメラを上から見下ろすのではなく、下から見上げるよう変更。
　＜変更前＞
　eye: 　 new GLBoost.Vector3(0, 300, 0),
　center: new GLBoost.Vector3(0.0, 0.0, 0.0),
　up: 　　new GLBoost.Vector3(1.0, 0.0, 0.0)
　＜変更後＞
　eye: 　 new GLBoost.Vector3(0, 0, 0),
　center: new GLBoost.Vector3(0.0, 300.0, 0.0), // eye と center の座標を入れ替え
　up: 　　new GLBoost.Vector3(1.0, 0.0, 0.0)
