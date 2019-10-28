[WebGL] Processing.js でハーモノグラフを描いてみるテスト

lightgl.js で作ったサンプルを Processing.js 用に移植してみました。

＜対応した点＞
・リサージュ図形からハーモノグラフに変更
　x = A1 * sin(f1 * t + p1) * exp(-d1 * t) + A2 * sin(f2 * t + p2) * exp(-d2 * t)
　y = A3 * sin(f3 * t + p3) * exp(-d3 * t) + A4 * sin(f4 * t + p4) * exp(-d4 * t)

＜参考＞
■ Animated Harmonograph
http://hernan.amiune.com/labs/harmonograph/animated-harmonograph.html

■ [WebGL] lightgl.js でハーモノグラフを描いてみるテスト
http://jsdo.it/cx20/ry8D

■ [簡易版] WebGL でハーモノグラフみたいな何かを描いてみるテスト
http://jsdo.it/cx20/synR

■ ハーモノグラフ（HTML5 Canvas）
http://jsdo.it/cx20/634i
