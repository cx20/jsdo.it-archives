[簡易版] WebGL でハーモノグラフみたいな何かを描いてみるテスト
※ 初期化処理やエラー処理を省いた簡易版のコードになります。ご注意ください。

＜対応した点＞
・GLSL の頂点シェーダを用いて座標を計算させるよう対応。
・リサージュ図形からハーモノグラフに変更
　x = A1 * sin(f1 * t + p1) * exp(-d1 * t) + A2 * sin(f2 * t + p2) * exp(-d2 * t)
　y = A3 * sin(f3 * t + p3) * exp(-d3 * t) + A4 * sin(f4 * t + p4) * exp(-d4 * t)

＜参考＞
■ ハーモノグラフ
http://jsdo.it/cx20/634i

■ Animated Harmonograph
http://hernan.amiune.com/labs/harmonograph/animated-harmonograph.html

■ Three.js でハーモノグラフを書いてみるテスト（その３）
http://jsdo.it/cx20/6BUb

■ GLSL でハーモノグラフを描いてみるテスト
http://jsdo.it/cx20/3NOQ
