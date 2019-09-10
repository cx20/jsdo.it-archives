Three.js + Oimo.js で箱に色々入れてみるテスト（その２）

＜対応した点＞
・反発係数（restitution）を「0.2」→「5.0」に変更
　var config = [
　　　1, // シェイプの密度（density）
　　　0.4, // シェイプの摩擦係数（friction）
　　　5.0, // シェイプの反発係数（restitution）
　　　1, // シェイプが属する衝突グループのビット
　　　all // シェイプが衝突する衝突グループのビット
　];

＜参考＞
■ Three.js + Oimo.js で坂道にボールを転がしてみるテスト（その７）
http://jsdo.it/cx20/jlGD
