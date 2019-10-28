[WebGL] Processing.js で３次元リサージュ図形を描いてみるテスト

lightgl.js で作ったサンプルを Processing.js 用に移植してみました。

＜対応した点＞
・Processing.js の WebGL 機能を使用して３次元リサージュ図形を描くよう対応
　設定例）
　x = sin(ω1t + α)
　y = sin(ω2t + β)
　z = sin(ω3t + γ)

＜参考＞
■ [WebGL] lightgl.js で３次元リサージュ図形を描いてみるテスト
http://jsdo.it/cx20/5RXU

■ [簡易版] WebGL で３次元リサージュ図形に色を付けてみるテスト
http://jsdo.it/cx20/2UUa

■ Babylon.js で３次元リサージュ図形を描いてみるテスト
http://jsdo.it/cx20/vMor

■ パラメトリック曲面を描くのに適した WebGL ライブラリについて
http://qiita.com/cx20/items/e983572d5dde2fa9a85b
