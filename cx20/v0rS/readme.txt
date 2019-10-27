[WebGL] lightgl.js でローマ曲面を描いてみるテスト

kjunichi さんのサンプルを参考に lightgl.js でローマ曲面を実装してみました。

＜対応した点＞
・lightgl.js の OpenGL immediate mode を使用してローマ曲面を描くよう対応
　x = sin(u) * cos(u) * sin(v) * sin(v)
　y = sin(u) * sin(v) * cos(v)
　z = cos(u) * sin(v) * cos(v)

＜参考＞
■ Three.jsでローマ曲面を描画した
http://jsdo.it/kjunichi/ocRI

■ 射影平面 - シュタイナーのローマン曲面 - 趣味の三次元コンピュータ・グラフィックス
http://d.hatena.ne.jp/silver_dragon/20120603/1338747795

■ Maxima の計算事例
http://fe.math.kobe-u.ac.jp/MathLibre-doc/ponpoko/MaximaSomeExamples.pdf
