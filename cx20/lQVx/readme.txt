[WebGL] lightgl.js で球体を描いてみるテスト

＜対応した点＞
・lightgl.js の OpenGL immediate mode を使用して球体を描くよう対応。
・座標計算は球座標の公式を使用。

　■ 極座標系 - Wikipedia
　http://ja.wikipedia.org/wiki/%E6%A5%B5%E5%BA%A7%E6%A8%99%E7%B3%BB
　
　　x = r sinθcosφ
　　y = r sinθsinφ
　　z = r cosθ

＜参考＞
■ [簡易版] WebGL で球体を描いてみるテスト
http://jsdo.it/cx20/gIb0
