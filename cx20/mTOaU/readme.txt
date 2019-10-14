[Three.js] 物理演算で板を破壊してみるテスト

＜対応した点＞
・ボールでドミノを破壊できるよう対応（Convex object breaking example をベースに改造）
・ライブラリを Three.js r79→r80 に変更
・物理演算ライブラリは lo-th さんの Ammo Lab にあった圧縮版 ammo.z を使用

＜対応できていない点＞
・マシンスペックが低いとボールの速度が遅いせいか上手く割れないようです。

＜参考＞
■ Convex object breaking example
http://threejs.org/examples/webgl_physics_convex_break.html

■ lo-th/Ammo.lab
https://github.com/lo-th/Ammo.lab
https://github.com/lo-th/Ammo.lab/tree/gh-pages/z
