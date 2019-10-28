[WebGL] Processing.js でローマ曲面を描いてみるテスト

lightgl.js で作ったサンプルを Processing.js 用に移植してみました。

＜対応した点＞
・Processing.js の WebGL 機能を使用してローマ曲面を描くよう対応
　x = sin(u) * cos(u) * sin(v) * sin(v)
　y = sin(u) * sin(v) * cos(v)
　z = cos(u) * sin(v) * cos(v)

＜参考＞
■ Three.jsでローマ曲面を描画した
http://jsdo.it/kjunichi/ocRI

■ [WebGL] lightgl.js でローマ曲面を描いてみるテスト
http://jsdo.it/cx20/v0rS

■ 射影平面 - シュタイナーのローマン曲面 - 趣味の三次元コンピュータ・グラフィックス
http://d.hatena.ne.jp/silver_dragon/20120603/1338747795

■ Maxima の計算事例
http://fe.math.kobe-u.ac.jp/MathLibre-doc/ponpoko/MaximaSomeExamples.pdf

■ パラメトリック曲面を描くのに適した WebGL ライブラリについて
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
