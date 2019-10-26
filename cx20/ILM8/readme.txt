Blockfall (WebGL拡張 + Oimo.js)（その２）

＜対応した点＞
・真上から見下ろすよう変更
　＜変更前＞
　mat4 vMatrix = lookAt(
　　　vec3(0.0, 0.0, 40.0), // eye
　　　vec3(0.0),　　　　　　// center
　　　vec3(0.0, 1.0, 0.0)　 // up
　);
　＜変更後＞
　mat4 vMatrix = lookAt(
　　　vec3(0.0, 30.0, 0.0), // eye
　　　vec3(0.0),　　　　　　// center
　　　vec3(1.0, 0.0, 0.0)　 // up
　);

＜対応できていない点＞
・iPhone / Mac だと正しく表示されないようです。

＜参考＞
■ GLBoost + Oimo.js で箱をランダムに落下させてみるテスト（その２）
http://jsdo.it/cx20/Ili6
