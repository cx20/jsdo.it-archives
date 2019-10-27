[WebGL] lightgl.js で３次元リサージュ図形を描いてみるテスト

lightgl.js は、WebGL API の冗長な記述をうまく吸収してくれる為 2D Canvas のような手軽さで 3D 描画が行えるようです。

＜対応した点＞
・lightgl.js の OpenGL immediate mode を使用して３次元リサージュ図形を描くよう対応
　設定例）
　x = sin(ω1t + α)
　y = sin(ω2t + β)
　z = sin(ω3t + γ)

＜参考＞
■ evanw/lightgl.js
https://github.com/evanw/lightgl.js/

■ [簡易版] WebGL で３次元リサージュ図形に色を付けてみるテスト
http://jsdo.it/cx20/2UUa

■ [WebGL] lightgl.js で３次元リサージュ図形を描いてみるテスト（VBO 編）
http://jsdo.it/cx20/Y4sl

■ リサジュー曲線によるスクリーンセーバーの作成
http://www.math.ryukoku.ac.jp/~tsutomu/undergraduate/2005/05yuki.pdf
